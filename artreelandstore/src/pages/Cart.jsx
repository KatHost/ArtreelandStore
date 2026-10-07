import { Link } from "react-router-dom";
import { Trash2, Minus, Plus } from "lucide-react";

import { useCart } from "../context/CartContext";
import { publicAsset } from "../utils/publicAsset";

export default function Cart() {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        cartTotal,
    } = useCart();

    const shipping = cartTotal >= 1500 || cartTotal === 0 ? 0 : 99;

    const total = cartTotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="container-custom empty-page">

                <h1 className="page-title">YOUR CART IS EMPTY</h1>

                <p>Discover something you love.</p>

                <Link to="/shop" className="btn-primary-custom">
                    CONTINUE SHOPPING
                </Link>

            </div>
        );
    }

    return (
        <div className="container-custom cart-page">

            <h1 className="page-title mb-4">
                YOUR SHOPPING BAG
            </h1>

            <div className="cart-layout">

                <div className="cart-items">

                    {cartItems.map((item) => (
                        <div
                            className="cart-item"
                            key={`${item.id}-${item.selectedSize}`}
                        >

                            <img
                                src={publicAsset(item.images?.[0] || "")}
                                alt={item.name}
                            />

                            <div className="cart-item-info">

                                <h3>{item.name}</h3>

                                <p>Size: {item.selectedSize || "One Size"}</p>

                                <strong>
                                    R{Number(item.price).toFixed(2)}
                                </strong>

                                <div className="cart-quantity">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateQuantity(
                                                item.id,
                                                item.quantity - 1,
                                                item.selectedSize
                                            )
                                        }
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus size={15} />
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateQuantity(
                                                item.id,
                                                item.quantity + 1,
                                                item.selectedSize
                                            )
                                        }
                                        aria-label="Increase quantity"
                                    >
                                        <Plus size={15} />
                                    </button>

                                </div>

                            </div>

                            <button
                                type="button"
                                className="cart-remove"
                                onClick={() =>
                                    removeFromCart(
                                        item.id,
                                        item.selectedSize
                                    )
                                }
                                aria-label="Remove product"
                            >
                                <Trash2 />
                            </button>

                        </div>
                    ))}

                </div>

                <aside className="cart-summary">

                    <h2>ORDER SUMMARY</h2>

                    <div>
                        <span>Subtotal</span>
                        <strong>R{cartTotal.toFixed(2)}</strong>
                    </div>

                    <div>
                        <span>Delivery</span>
                        <strong>
                            {shipping === 0
                                ? "FREE"
                                : `R${shipping.toFixed(2)}`}
                        </strong>
                    </div>

                    <div className="cart-total">
                        <span>Total</span>
                        <strong>R{total.toFixed(2)}</strong>
                    </div>

                    <p className="cart-shipping-note">
                        {cartTotal >= 1500
                            ? "You qualify for free delivery."
                            : "Spend R1,500 to qualify for free delivery."}
                    </p>

                    <Link
                        to="/checkout"
                        className="btn-primary-custom cart-checkout-button"
                    >
                        PROCEED TO CHECKOUT
                    </Link>

                    <Link to="/shop" className="continue-shopping">
                        Continue Shopping
                    </Link>

                </aside>

            </div>
        </div>
    );
}