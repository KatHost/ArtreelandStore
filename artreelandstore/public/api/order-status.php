<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['message' => 'Method not allowed.'], 405);
}

$orderId = (string) ($_GET['order'] ?? '');
if (!preg_match('/^[a-f0-9]{32}$/', $orderId)) {
    json_response(['message' => 'Order could not be found.'], 404);
}

try {
    $config = load_app_config();
    $database = database_connection($config);
    expire_pending_orders($database);
    $statement = $database->prepare(
        'SELECT payment_status FROM artreeland_orders WHERE order_id = :order_id'
    );
    $statement->execute(['order_id' => $orderId]);
    $order = $statement->fetch();

    if (!$order) {
        json_response(['message' => 'Order could not be found.'], 404);
    }

    json_response(['status' => $order['payment_status']]);
} catch (Throwable $error) {
    error_log('Order status lookup failed: ' . $error->getMessage());
    json_response(['message' => 'Order status is temporarily unavailable.'], 500);
}
