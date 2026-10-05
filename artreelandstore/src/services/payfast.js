const API_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/+$/, "");

const allowedPaymentHosts = new Set([
    "sandbox.payfast.co.za",
    "www.payfast.co.za",
]);

export async function beginPayFastCheckout(order) {
    const response = await fetch(`${API_URL}/create-payment.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(
            result.message || "We could not start your payment. Please try again."
        );
    }

    if (typeof result.paymentUrl !== "string") {
        throw new Error("The payment service returned an invalid response.");
    }
    const paymentUrl = new URL(result.paymentUrl);
    if (
        paymentUrl.protocol !== "https:"
        || !allowedPaymentHosts.has(paymentUrl.hostname)
        || !result.paymentData
        || typeof result.paymentData !== "object"
    ) {
        throw new Error("The payment service returned an invalid response.");
    }

    const form = document.createElement("form");
    form.method = "POST";
    form.action = paymentUrl.href;
    form.hidden = true;

    for (const [name, value] of Object.entries(result.paymentData)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = String(value);
        form.append(input);
    }

    document.body.append(form);
    form.submit();
}

export async function getPayFastOrderStatus(orderId, signal) {
    const response = await fetch(
        `${API_URL}/order-status.php?order=${encodeURIComponent(orderId)}`,
        { signal }
    );
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(result.message || "Order status is temporarily unavailable.");
    }

    if (!["pending", "paid", "failed", "cancelled"].includes(result.status)) {
        throw new Error("The order status response was invalid.");
    }

    return result.status;
}
