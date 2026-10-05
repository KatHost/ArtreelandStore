import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { getPayFastOrderStatus } from "../services/payfast";

export default function OrderStatus() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order") || "";
    const cancelledByReturn = searchParams.get("cancelled") === "1";
    const validOrderId = /^[a-f0-9]{32}$/.test(orderId);
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState("");
    const [retry, setRetry] = useState(0);
    const { clearCart } = useCart();

    useEffect(() => {
        if (!validOrderId || cancelledByReturn) {
            return undefined;
        }

        const controller = new AbortController();
        let attempts = 0;
        let timer;

        const refreshStatus = async () => {
            try {
                const currentStatus = await getPayFastOrderStatus(
                    orderId,
                    controller.signal
                );

                if (controller.signal.aborted) {
                    return;
                }

                setStatus(currentStatus);
                setError("");
                if (currentStatus === "paid") {
                    clearCart();
                    return;
                }
                if (
                    currentStatus === "failed"
                    || currentStatus === "cancelled"
                    || attempts >= 14
                ) {
                    return;
                }
                attempts += 1;
                timer = window.setTimeout(refreshStatus, 2500);
            } catch (requestError) {
                if (controller.signal.aborted) {
                    return;
                }
                setError(requestError.message);
                setStatus("error");
            }
        };

        refreshStatus();
        return () => {
            controller.abort();
            window.clearTimeout(timer);
        };
    }, [cancelledByReturn, clearCart, orderId, retry, validOrderId]);

    const displayStatus = cancelledByReturn
        ? "cancelled"
        : validOrderId
            ? status
            : "invalid";

    const content = {
        loading: {
            title: "CONFIRMING YOUR PAYMENT",
            description: "PayFast is confirming your payment. This may take a moment.",
        },
        paid: {
            title: "ORDER CONFIRMED",
            description: "Your payment was confirmed. Thank you for shopping with ARTRƎELAND.",
        },
        pending: {
            title: "PAYMENT PROCESSING",
            description: "Your payment has not been confirmed yet. Keep this page open while we check again.",
        },
        failed: {
            title: "PAYMENT NOT COMPLETED",
            description: "No completed payment was received. Your bag is still saved so you can try again.",
        },
        cancelled: {
            title: "PAYMENT CANCELLED",
            description: "Your payment was cancelled. Your bag is still saved if you would like to try again.",
        },
        error: {
            title: "WE COULDN'T CHECK THE ORDER",
            description: error,
        },
        invalid: {
            title: "ORDER NOT FOUND",
            description: "This order link is invalid or incomplete.",
        },
    }[displayStatus];

    return (
        <section className="container-custom order-status-page" aria-live="polite">
            <p className="eyebrow">PAYFAST CHECKOUT</p>
            <h1 className="page-title">{content.title}</h1>
            <p>{content.description}</p>
            {validOrderId && (
                <p className="order-status-reference">
                    Order reference: {orderId.slice(0, 8).toUpperCase()}
                </p>
            )}

            {displayStatus === "pending" && (
                <p className="order-status-note">
                    If you have already completed payment, allow a little time for the secure
                    payment notification to arrive.
                </p>
            )}

            {displayStatus === "error" && (
                <button
                    type="button"
                    className="btn-outline-custom"
                    onClick={() => setRetry((current) => current + 1)}
                >
                    CHECK AGAIN
                </button>
            )}

            <div className="order-status-actions">
                {(displayStatus === "paid" || displayStatus === "invalid") && (
                    <Link to="/shop" className="btn-primary-custom">
                        {displayStatus === "paid" ? "CONTINUE SHOPPING" : "RETURN TO SHOP"}
                    </Link>
                )}
                {["cancelled", "failed", "error"].includes(displayStatus) && (
                    <Link to="/checkout" className="btn-primary-custom">
                        RETURN TO CHECKOUT
                    </Link>
                )}
                {displayStatus === "pending" && (
                    <Link to="/shop" className="btn-outline-custom">
                        CONTINUE SHOPPING
                    </Link>
                )}
            </div>
        </section>
    );
}
