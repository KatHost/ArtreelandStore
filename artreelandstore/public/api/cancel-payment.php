<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    exit('Method not allowed');
}

$orderId = (string) ($_GET['order'] ?? '');
if (!preg_match('/^[a-f0-9]{32}$/', $orderId)) {
    http_response_code(400);
    exit('Invalid order');
}

try {
    $config = load_app_config();
    $database = database_connection($config);
    $database->beginTransaction();

    $statement = $database->prepare(
        'SELECT payment_status, order_data
         FROM artreeland_orders
         WHERE order_id = :order_id
         FOR UPDATE'
    );
    $statement->execute(['order_id' => $orderId]);
    $order = $statement->fetch();

    if ($order && $order['payment_status'] === 'pending') {
        $orderData = json_decode($order['order_data'], true);
        if (!is_array($orderData)) {
            throw new RuntimeException('Stored order data is invalid.');
        }

        release_order_stock($database, $orderData);
        $statement = $database->prepare(
            'UPDATE artreeland_orders
             SET payment_status = "cancelled"
             WHERE order_id = :order_id AND payment_status = "pending"'
        );
        $statement->execute(['order_id' => $orderId]);
        $database->commit();
        header(
            'Location: ' . rtrim($config['site_url'], '/')
                . '/order-status?order=' . $orderId . '&cancelled=1',
            true,
            303
        );
        exit;
    }

    $database->commit();
    header(
        'Location: ' . rtrim($config['site_url'], '/')
            . '/order-status?order=' . $orderId,
        true,
        303
    );
    exit;
} catch (Throwable $error) {
    if (isset($database) && $database instanceof PDO && $database->inTransaction()) {
        $database->rollBack();
    }
    error_log('Payment cancellation handling failed: ' . $error->getMessage());
    http_response_code(500);
    echo 'We could not update the cancelled order.';
}
