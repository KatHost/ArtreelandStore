<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['message' => 'Method not allowed.'], 405);
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 65536) {
    json_response(['message' => 'Checkout request is too large.'], 413);
}

$request = json_decode(file_get_contents('php://input'), true);
if (!is_array($request)) {
    json_response(['message' => 'Checkout details are invalid.'], 400);
}

function required_text(array $source, string $key, int $maxLength): string
{
    if (!isset($source[$key]) || !is_string($source[$key])) {
        throw new InvalidArgumentException('Please check your delivery details and try again.');
    }

    $value = trim($source[$key]);
    if ($value === '' || strlen($value) > $maxLength * 4) {
        throw new InvalidArgumentException('Please check your delivery details and try again.');
    }
    return $value;
}

$shipping = $request['shipping'] ?? null;
$items = $request['items'] ?? null;
$delivery = $request['delivery'] ?? '';

if (!is_array($shipping) || !is_array($items) || count($items) < 1 || count($items) > 20) {
    json_response(['message' => 'Your order details are invalid.'], 400);
}

try {
    $customer = [
        'firstName' => required_text($shipping, 'firstName', 80),
        'lastName' => required_text($shipping, 'lastName', 80),
        'email' => required_text($shipping, 'email', 254),
        'phone' => required_text($shipping, 'phone', 30),
        'address' => required_text($shipping, 'address', 200),
        'city' => required_text($shipping, 'city', 100),
        'province' => required_text($shipping, 'province', 40),
        'postalCode' => required_text($shipping, 'postalCode', 10),
    ];

    if (
        filter_var($customer['email'], FILTER_VALIDATE_EMAIL) === false
        || !preg_match('/^[0-9+\s()-]{7,30}$/', $customer['phone'])
        || !preg_match('/^\d{4}$/', $customer['postalCode'])
        || !in_array(
            $customer['province'],
            [
                'Eastern Cape',
                'Free State',
                'Gauteng',
                'KwaZulu-Natal',
                'Limpopo',
                'Mpumalanga',
                'North West',
                'Northern Cape',
                'Western Cape',
            ],
            true
        )
        || !in_array($delivery, ['standard', 'express'], true)
    ) {
        json_response(['message' => 'Please check your delivery details and try again.'], 400);
    }

    $catalogPath = __DIR__ . '/../data/catalog.json';
    $catalogContents = is_file($catalogPath) ? file_get_contents($catalogPath) : false;
    $catalog = is_string($catalogContents) ? json_decode($catalogContents, true) : null;

    if (!is_array($catalog)) {
        throw new RuntimeException('The checkout product catalogue could not be loaded.');
    }

    $catalogById = [];
    foreach ($catalog as $product) {
        if (isset($product['id'])) {
            $catalogById[(int) $product['id']] = $product;
        }
    }

    $config = load_app_config();
    $database = database_connection($config);
    expire_pending_orders($database);

    $orderItems = [];
    $subtotalCents = 0;
    $database->beginTransaction();

    foreach ($items as $item) {
        if (!is_array($item)) {
            throw new DomainException(
                'A product, size, or quantity in your bag is no longer available.'
            );
        }

        $id = filter_var($item['id'] ?? null, FILTER_VALIDATE_INT);
        $quantity = filter_var($item['quantity'] ?? null, FILTER_VALIDATE_INT);
        $size = trim((string) ($item['selectedSize'] ?? ''));
        $catalogProduct = $id === false ? null : ($catalogById[$id] ?? null);
        $inventoryStatement = $database->prepare(
            'SELECT product_name, price, stock
             FROM artreeland_inventory
             WHERE product_id = :product_id
             FOR UPDATE'
        );
        $inventoryStatement->execute(['product_id' => $id === false ? 0 : $id]);
        $product = $inventoryStatement->fetch();

        if (
            !is_array($product)
            || !is_array($catalogProduct)
            || $quantity === false
            || $quantity < 1
            || $quantity > 10
            || $quantity > (int) $product['stock']
            || !in_array($size, $catalogProduct['size'], true)
        ) {
            throw new DomainException(
                'A product, size, or quantity in your bag is no longer available.'
            );
        }

        $unitCents = (int) round((float) $product['price'] * 100);
        $subtotalCents += $unitCents * $quantity;
        $orderItems[] = [
            'id' => $id,
            'name' => (string) $product['product_name'],
            'selectedSize' => $size,
            'quantity' => $quantity,
            'unitPrice' => number_format($unitCents / 100, 2, '.', ''),
        ];

        $reserveStatement = $database->prepare(
            'UPDATE artreeland_inventory
             SET stock = stock - :quantity
             WHERE product_id = :product_id AND stock >= :quantity'
        );
        $reserveStatement->execute([
            'quantity' => $quantity,
            'product_id' => $id,
        ]);
        if ($reserveStatement->rowCount() !== 1) {
            throw new RuntimeException('Inventory changed while the order was being placed.');
        }
    }

    $deliveryCents = $subtotalCents >= 150000
        ? 0
        : ($delivery === 'express' ? 14900 : 9900);
    $totalCents = $subtotalCents + $deliveryCents;
    $orderId = bin2hex(random_bytes(16));

    $orderData = json_encode(
        [
            'customer' => $customer,
            'items' => $orderItems,
            'delivery' => $delivery,
            'deliveryAmount' => number_format($deliveryCents / 100, 2, '.', ''),
        ],
        JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR
    );

    $statement = $database->prepare(
        'INSERT INTO artreeland_orders (order_id, payment_status, amount, order_data)
         VALUES (:order_id, "pending", :amount, :order_data)'
    );
    $statement->execute([
        'order_id' => $orderId,
        'amount' => number_format($totalCents / 100, 2, '.', ''),
        'order_data' => $orderData,
    ]);
    $database->commit();

    $baseUrl = rtrim($config['site_url'], '/');
    $paymentData = [
        'merchant_id' => $config['payfast']['merchant_id'],
        'merchant_key' => $config['payfast']['merchant_key'],
        'return_url' => $baseUrl . '/order-status?order=' . $orderId,
        'cancel_url' => $baseUrl . '/api/cancel-payment.php?order=' . $orderId,
        'notify_url' => $baseUrl . '/api/payfast-itn.php',
        'name_first' => $customer['firstName'],
        'name_last' => $customer['lastName'],
        'email_address' => $customer['email'],
        'm_payment_id' => $orderId,
        'amount' => number_format($totalCents / 100, 2, '.', ''),
        'currency' => 'ZAR',
        'email_confirmation' => '1',
        'item_name' => 'ARTRƎELAND order ' . substr($orderId, 0, 8),
        'item_description' => count($orderItems) . ' item(s), delivery to ' . $customer['city'],
        'custom_str1' => $orderId,
    ];
    $paymentData['signature'] = payfast_payment_signature(
        $paymentData,
        $config['payfast']['passphrase']
    );

    json_response([
        'paymentUrl' => payfast_base_url($config) . '/eng/process',
        'paymentData' => $paymentData,
    ]);
} catch (InvalidArgumentException $error) {
    if (isset($database) && $database instanceof PDO && $database->inTransaction()) {
        $database->rollBack();
    }
    json_response(['message' => $error->getMessage()], 400);
} catch (DomainException $error) {
    if (isset($database) && $database instanceof PDO && $database->inTransaction()) {
        $database->rollBack();
    }
    json_response(['message' => $error->getMessage()], 409);
} catch (Throwable $error) {
    if (isset($database) && $database instanceof PDO && $database->inTransaction()) {
        $database->rollBack();
    }
    error_log('Checkout initialization failed: ' . $error->getMessage());
    json_response(['message' => 'We could not start your payment. Please try again.'], 500);
}
