import { useState } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { beginPayFastCheckout } from "../services/payfast";
import { publicAsset } from "../utils/publicAsset";

const PAYMENTS_ENABLED = import.meta.env.VITE_PAYMENTS_ENABLED !== "false";

export default function Checkout() {
    const { cartItems, cartTotal } = useCart();

    const [step, setStep] = useState(1);

    const [shipping, setShipping] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
    });

    const [delivery, setDelivery] = useState("standard");

    const [message, setMessage] = useState("");
    const [processing, setProcessing] = useState(false);

    const deliveryCost = delivery === "express" ? 149 : 99;

    const finalDelivery =
        cartTotal >= 1500 ? 0 : deliveryCost;

    const total = cartTotal + finalDelivery;

    const handleShippingSubmit = (event) => {
        event.preventDefault();
        setStep(2);
    };

    const handleOrderSubmit = async () => {
        if (processing) {
            return;
        }

        setMessage("");
        setProcessing(true);

        try {
            await beginPayFastCheckout({
                items: cartItems.map((item) => ({
                    id: item.id,
                    quantity: item.quantity,
                    selectedSize: item.selectedSize,
                })),
                shipping,
                delivery,
            });
        } catch (error) {
            setMessage(error.message);
            setProcessing(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container-custom empty-page">
                <h1>YOUR CART IS EMPTY</h1>

                <Link to="/shop" className="btn-primary-custom">
                    RETURN TO SHOP
                </Link>
            </div>
        );
    }

    if (!PAYMENTS_ENABLED) {
        return (
            <main className="container-custom checkout-page checkout-unavailable">
                <p className="eyebrow">CHECKOUT</p>
                <h1 className="page-title">ONLINE PAYMENT UNAVAILABLE</h1>
                <section className="checkout-summary">
                    <p>
                        This GitHub Pages storefront is a static site and cannot
                        securely process payments. Your cart is saved, but no
                        shipping or payment details have been collected.
                    </p>
                    <p>
                        Please contact ARTRƎELAND to place an order while secure
                        checkout is being hosted on a PHP-enabled server.
                    </p>
                    <Link to="/contact" className="btn-primary-custom">
                        CONTACT ARTRƎELAND
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <div className="container-custom checkout-page">

            <p className="eyebrow">SECURE CHECKOUT</p>

            <h1 className="page-title">
                CHECKOUT
            </h1>

            <div className="checkout-steps">

                {[
                    "Shipping",
                    "Delivery",
                    "Payment",
                    "Review",
                ].map((name, index) => (
                    <div
                        key={name}
                        className={
                            step === index + 1
                                ? "checkout-step active"
                                : step > index + 1
                                    ? "checkout-step completed"
                                    : "checkout-step"
                        }
                    >
                        <span>{index + 1}</span>
                        {name}
                    </div>
                ))}

            </div>

            <div className="checkout-layout">

                <section className="checkout-main">

                    {step === 1 && (
                        <form
                            className="checkout-panel"
                            onSubmit={handleShippingSubmit}
                        >
                            <h2>SHIPPING ADDRESS</h2>

                            <div className="checkout-form-grid">

                                <label>
                                    First Name

                                    <input
                                        className="form-control-custom"
                                        required
                                        value={shipping.firstName}
                                        onChange={(event) =>
                                            setShipping({
                                                ...shipping,
                                                firstName: event.target.value,
                                            })
                                        }
                                    />
                                </label>

                                <label>
                                    Last Name

                                    <input
                                        className="form-control-custom"
                                        required
                                        value={shipping.lastName}
                                        onChange={(event) =>
                                            setShipping({
                                                ...shipping,
                                                lastName: event.target.value,
                                            })
                                        }
                                    />
                                </label>

                                <label>
                                    Email Address

                                    <input
                                        type="email"
                                        className="form-control-custom"
                                        required
                                        value={shipping.email}
                                        onChange={(event) =>
                                            setShipping({
                                                ...shipping,
                                                email: event.target.value,
                                            })
                                        }
                                    />
                                </label>

                                <label>
                                    Phone Number

                                    <input
                                        type="tel"
                                        className="form-control-custom"
                                        required
                                        autoComplete="tel"
                                        value={shipping.phone}
                                        onChange={(event) =>
                                            setShipping({
                                                ...shipping,
                                                phone: event.target.value,
                                            })
                                        }
                                    />
                                </label>

                                <label className="full-width">
                                    Street Address

                                    <input
                                        className="form-control-custom"
                                        required
                                        autoComplete="street-address"
                                        value={shipping.address}
                                        onChange={(event) =>
                                            setShipping({
                                                ...shipping,
                                                address: event.target.value,
                                            })
                                        }
                                    />
                                </label>

                                <label>
                                    City

                                    <input
                                        className="form-control-custom"
                                        required
                                        autoComplete="address-level2"
                                        value={shipping.city}
                                        onChange={(event) =>
                                            setShipping({
                                                ...shipping,
                                                city: event.target.value,
                                            })
                                        }
                                    />
                                </label>

                                <label>
                                    Province

                                    <select
                                        className="form-control-custom"
                                        required
                                        autoComplete="address-level1"
                                        value={shipping.province}
                                        onChange={(event) =>
                                            setShipping({
                                                ...shipping,
                                                province: event.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Select Province</option>
                                        <option>Gauteng</option>
                                        <option>Western Cape</option>
                                        <option>KwaZulu-Natal</option>
                                        <option>Eastern Cape</option>
                                        <option>Free State</option>
                                        <option>Limpopo</option>
                                        <option>Mpumalanga</option>
                                        <option>North West</option>
                                        <option>Northern Cape</option>
                                    </select>
                                </label>

                                <label>
                                    Postal Code

                                    <input
                                        className="form-control-custom"
                                        required
                                        inputMode="numeric"
                                        pattern="[0-9]{4}"
                                        maxLength={4}
                                        autoComplete="postal-code"
                                        value={shipping.postalCode}
                                        onChange={(event) =>
                                            setShipping({
                                                ...shipping,
                                                postalCode: event.target.value,
                                            })
                                        }
                                    />
                                </label>

                            </div>

                            <button
                                type="submit"
                                className="btn-primary-custom mt-4"
                            >
                                CONTINUE TO DELIVERY
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <div className="checkout-panel">

                            <h2>DELIVERY OPTIONS</h2>

                            <label className="delivery-option">
                                <input
                                    type="radio"
                                    name="delivery"
                                    value="standard"
                                    checked={delivery === "standard"}
                                    onChange={(event) =>
                                        setDelivery(event.target.value)
                                    }
                                />

                                <div>
                                    <strong>Standard Delivery</strong>
                                    <p>Estimated 3–5 business days</p>
                                </div>

                                <strong>
                                    {finalDelivery === 0 ? "FREE" : "R99"}
                                </strong>
                            </label>

                            <label className="delivery-option">
                                <input
                                    type="radio"
                                    name="delivery"
                                    value="express"
                                    checked={delivery === "express"}
                                    onChange={(event) =>
                                        setDelivery(event.target.value)
                                    }
                                />

                                <div>
                                    <strong>Express Delivery</strong>
                                    <p>Estimated 1–2 business days</p>
                                </div>

                                <strong>
                                    {finalDelivery === 0 ? "FREE" : "R149"}
                                </strong>
                            </label>

                            <div className="checkout-navigation">
                                <button
                                    type="button"
                                    className="btn-outline-custom"
                                    onClick={() => setStep(1)}
                                >
                                    BACK
                                </button>

                                <button
                                    type="button"
                                    className="btn-primary-custom"
                                    onClick={() => setStep(3)}
                                >
                                    CONTINUE TO PAYMENT
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="checkout-panel">

                            <h2>PAYMENT METHOD</h2>

                            <div className="payment-option">
                                <div>
                                    <strong>PayFast secure checkout</strong>
                                    <p>
                                        You will be redirected to PayFast to complete your payment
                                        securely. Your card details are never stored by ARTRƎELAND.
                                    </p>
                                </div>
                            </div>

                            <div className="checkout-navigation">
                                <button
                                    type="button"
                                    className="btn-outline-custom"
                                    onClick={() => setStep(2)}
                                >
                                    BACK
                                </button>

                                <button
                                    type="button"
                                    className="btn-primary-custom"
                                    onClick={() => setStep(4)}
                                >
                                    REVIEW ORDER
                                </button>
                            </div>

                        </div>
                    )}

                    {step === 4 && (
                        <div className="checkout-panel">

                            <h2>REVIEW YOUR ORDER</h2>

                            <h3>Delivery Details</h3>

                            <p>
                                {shipping.firstName} {shipping.lastName}
                            </p>

                            <p>{shipping.address}</p>

                            <p>
                                {shipping.city}, {shipping.province}
                            </p>

                            <p>{shipping.postalCode}</p>
                            <p>{shipping.email} · {shipping.phone}</p>

                            <hr />

                            <h3>Payment</h3>

                            <p>PAYFAST SECURE HOSTED PAYMENT</p>
                            <p>
                                Delivery: {delivery === "express" ? "Express" : "Standard"}
                            </p>

                            <hr />

                            <h3>Items</h3>

                            {cartItems.map((item) => (
                                <div
                                    className="checkout-review-item"
                                    key={`${item.id}-${item.selectedSize}`}
                                >
                                    <span>
                                        {item.name} × {item.quantity}
                                    </span>

                                    <strong>
                                        R{(
                                            item.price * item.quantity
                                        ).toFixed(2)}
                                    </strong>
                                </div>
                            ))}

                            <div className="checkout-navigation">
                                <button
                                    type="button"
                                    className="btn-outline-custom"
                                    onClick={() => setStep(3)}
                                >
                                    BACK
                                </button>

                                <button
                                    type="button"
                                    className="btn-primary-custom"
                                    onClick={handleOrderSubmit}
                                    disabled={processing}
                                >
                                    {processing ? "REDIRECTING TO PAYFAST..." : "PAY SECURELY WITH PAYFAST"}
                                </button>
                            </div>

                            {message && (
                                <p className="form-status" role="status">
                                    {message}
                                </p>
                            )}

                        </div>
                    )}

                </section>

                <aside className="checkout-summary">

                    <h2>YOUR ORDER</h2>

                    {cartItems.map((item) => (
                        <div
                            className="checkout-summary-item"
                            key={`${item.id}-${item.selectedSize}`}
                        >
                            <img
                                src={publicAsset(item.images?.[0] || "")}
                                alt={item.name}
                            />

                            <div>
                                <strong>{item.name}</strong>

                                <p>
                                    Qty: {item.quantity} · {item.selectedSize}
                                </p>
                            </div>

                            <strong>
                                R{(
                                    item.price * item.quantity
                                ).toFixed(2)}
                            </strong>
                        </div>
                    ))}

                    <div className="summary-line">
                        <span>Subtotal</span>
                        <strong>R{cartTotal.toFixed(2)}</strong>
                    </div>

                    <div className="summary-line">
                        <span>Delivery</span>
                        <strong>
                            R{finalDelivery.toFixed(2)}
                        </strong>
                    </div>

                    <div className="summary-line summary-total">
                        <span>Total</span>
                        <strong>R{total.toFixed(2)}</strong>
                    </div>

                    <p className="checkout-security">
                        Payments are securely handled by PayFast. ARTRƎELAND
                        does not receive or store your card details.
                    </p>

                </aside>

            </div>

        </div>
    );
}