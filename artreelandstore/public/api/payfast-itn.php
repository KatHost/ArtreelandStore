<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

try {
    $config = load_app_config();
    $notification = $_POST;

    if (!verify_payfast_notification($notification, $config)) {
        error_log('Rejected invalid or incomplete PayFast notification.');
        http_response_code(400);
        exit('Invalid notification');
    }

    $orderId = (string) ($notification['m_payment_id'] ?? '');
    if (!preg_match('/^[a-f0-9]{32}$/', $orderId)) {
        http_response_code(400);
        exit('Invalid order');
    }

    $database = database_connection($config);
    $database->beginTransaction();
    $statement = $database->prepare(
        'SELECT amount, order_data, payment_status
         FROM artreeland_orders
         WHERE order_id = :order_id
         FOR UPDATE'
    );
    $statement->execute(['order_id' => $orderId]);
    $order = $statement->fetch();

    if (
        !$order
        || !isset($notification['amount_gross'])
        || (int) round((float) $notification['amount_gross'] * 100)
            !== (int) round((float) $order['amount'] * 100)
    ) {
        $database->rollBack();
        error_log('PayFast notification order or total did not match.');
        http_response_code(400);
        exit('Order mismatch');
    }

    if ($order['payment_status'] === 'pending') {
        $paymentStatus = ($notification['payment_status'] ?? '') === 'COMPLETE'
            ? 'paid'
            : 'failed';

        if ($paymentStatus === 'failed') {
            $orderData = json_decode($order['order_data'], true);
            if (!is_array($orderData)) {
                throw new RuntimeException('Stored order data is invalid.');
            }
            release_order_stock($database, $orderData);
        }

        $statement = $database->prepare(
            'UPDATE artreeland_orders
             SET payment_status = :payment_status
             WHERE order_id = :order_id AND payment_status = "pending"'
        );
        $statement->execute([
            'payment_status' => $paymentStatus,
            'order_id' => $orderId,
        ]);
    }

    $database->commit();
    http_response_code(200);
    echo 'OK';
} catch (Throwable $error) {
    if (isset($database) && $database instanceof PDO && $database->inTransaction()) {
        $database->rollBack();
    }
    error_log('PayFast notification processing failed: ' . $error->getMessage());
    http_response_code(500);
    echo 'Notification processing failed';
}
