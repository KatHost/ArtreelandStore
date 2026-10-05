<?php

declare(strict_types=1);

function json_response(array $payload, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function load_app_config(): array
{
    $path = __DIR__ . '/config.local.php';

    if (!is_file($path)) {
        json_response(['message' => 'Checkout is not configured yet.'], 503);
    }

    $config = require $path;
    if (
        !is_array($config)
        || !is_array($config['database'] ?? null)
        || !is_array($config['payfast'] ?? null)
    ) {
        json_response(['message' => 'Checkout configuration is invalid.'], 503);
    }

    $required = [
        $config['site_url'] ?? null,
        $config['database']['host'] ?? null,
        $config['database']['name'] ?? null,
        $config['database']['username'] ?? null,
        $config['database']['password'] ?? null,
        $config['payfast']['merchant_id'] ?? null,
        $config['payfast']['merchant_key'] ?? null,
        $config['payfast']['passphrase'] ?? null,
    ];

    if (in_array(null, $required, true) || in_array('', $required, true)) {
        json_response(['message' => 'Checkout is not configured yet.'], 503);
    }

    foreach (
        [
            'database' => ['name', 'username', 'password'],
            'payfast' => ['merchant_id', 'merchant_key', 'passphrase'],
        ] as $section => $keys
    ) {
        foreach ($keys as $key) {
            $value = (string) $config[$section][$key];
            if (
                str_starts_with($value, 'SET_THIS_IN_CPANEL')
                || str_starts_with($value, 'CPANEL_')
            ) {
                json_response(['message' => 'Checkout is not configured yet.'], 503);
            }
        }
    }

    $site = parse_url($config['site_url']);
    if (
        filter_var($config['site_url'], FILTER_VALIDATE_URL) === false
        || ($site['scheme'] ?? '') !== 'https'
        || !in_array($config['payfast']['mode'] ?? '', ['sandbox', 'live'], true)
    ) {
        json_response(['message' => 'Checkout configuration is invalid.'], 503);
    }

    return $config;
}

function database_connection(array $config): PDO
{
    $database = $config['database'];
    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=utf8mb4',
        $database['host'],
        $database['name']
    );

    return new PDO(
        $dsn,
        $database['username'],
        $database['password'],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
}

function release_order_stock(PDO $database, array $orderData): void
{
    $items = $orderData['items'] ?? [];
    $statement = $database->prepare(
        'UPDATE artreeland_inventory
         SET stock = stock + :quantity
         WHERE product_id = :product_id'
    );

    foreach ($items as $item) {
        $statement->execute([
            'quantity' => (int) $item['quantity'],
            'product_id' => (int) $item['id'],
        ]);
    }
}

function expire_pending_orders(PDO $database): void
{
    $database->beginTransaction();
    try {
        $orders = $database->query(
            'SELECT order_id, order_data
             FROM artreeland_orders
             WHERE payment_status = "pending"
               AND created_at < DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 30 MINUTE)
             FOR UPDATE'
        )->fetchAll();

        foreach ($orders as $order) {
            $orderData = json_decode($order['order_data'], true);
            if (!is_array($orderData)) {
                throw new RuntimeException('Stored order data is invalid.');
            }

            release_order_stock($database, $orderData);
            $statement = $database->prepare(
                'UPDATE artreeland_orders
                 SET payment_status = "failed"
                 WHERE order_id = :order_id AND payment_status = "pending"'
            );
            $statement->execute(['order_id' => $order['order_id']]);
        }

        $database->commit();
    } catch (Throwable $error) {
        if ($database->inTransaction()) {
            $database->rollBack();
        }
        throw $error;
    }
}

function payfast_base_url(array $config): string
{
    return $config['payfast']['mode'] === 'live'
        ? 'https://www.payfast.co.za'
        : 'https://sandbox.payfast.co.za';
}

function payfast_payment_signature(array $data, string $passphrase): string
{
    $fieldOrder = [
        'merchant_id',
        'merchant_key',
        'return_url',
        'cancel_url',
        'notify_url',
        'notify_method',
        'name_first',
        'name_last',
        'email_address',
        'cell_number',
        'm_payment_id',
        'amount',
        'item_name',
        'item_description',
        'custom_int1',
        'custom_int2',
        'custom_int3',
        'custom_int4',
        'custom_int5',
        'custom_str1',
        'custom_str2',
        'custom_str3',
        'custom_str4',
        'custom_str5',
        'email_confirmation',
        'confirmation_address',
        'currency',
        'payment_method',
        'subscription_type',
        'passphrase',
        'billing_date',
        'recurring_amount',
        'frequency',
        'cycles',
        'subscription_notify_email',
        'subscription_notify_webhook',
        'subscription_notify_buyer',
    ];

    $parts = [];
    foreach ($fieldOrder as $field) {
        $value = $field === 'passphrase'
            ? urlencode(trim($passphrase))
            : trim((string) ($data[$field] ?? ''));

        if ($value !== '') {
            $parts[] = $field . '=' . urlencode($value);
        }
    }

    return md5(implode('&', $parts));
}

function payfast_notification_signature(array $data, string $passphrase): string
{
    $parts = [];

    foreach ($data as $field => $value) {
        if ($field === 'signature') {
            break;
        }
        $parts[] = $field . '=' . urlencode((string) $value);
    }

    if ($passphrase !== '') {
        $parts[] = 'passphrase=' . urlencode($passphrase);
    }

    return md5(implode('&', $parts));
}

function payfast_notification_payload(array $data): string
{
    $parts = [];
    foreach ($data as $field => $value) {
        if ($field === 'signature') {
            break;
        }
        $parts[] = $field . '=' . urlencode((string) $value);
    }

    return implode('&', $parts);
}

function verify_payfast_notification(array $data, array $config): bool
{
    $providedSignature = (string) ($data['signature'] ?? '');
    if (
        $providedSignature === ''
        || !hash_equals(
            payfast_notification_signature($data, $config['payfast']['passphrase']),
            $providedSignature
        )
        || !hash_equals(
            (string) $config['payfast']['merchant_id'],
            (string) ($data['merchant_id'] ?? '')
        )
    ) {
        return false;
    }

    $payfastHosts = [
        'www.payfast.co.za',
        'sandbox.payfast.co.za',
        'w1w.payfast.co.za',
        'w2w.payfast.co.za',
    ];
    $allowedIps = [];
    foreach ($payfastHosts as $host) {
        $resolvedIps = gethostbynamel($host);
        if (is_array($resolvedIps)) {
            $allowedIps = array_merge($allowedIps, $resolvedIps);
        }
    }

    if (!in_array($_SERVER['REMOTE_ADDR'] ?? '', array_unique($allowedIps), true)) {
        return false;
    }

    $ch = curl_init(payfast_base_url($config) . '/eng/query/validate');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => payfast_notification_payload($data),
        CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2,
    ]);

    $response = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || $status !== 200) {
        error_log('PayFast ITN validation request failed: ' . $error);
        return false;
    }

    return trim($response) === 'VALID';
}
