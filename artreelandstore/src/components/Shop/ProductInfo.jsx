import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductInfo({ product }) {
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState(
        product.size?.[0] || ""
    );
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState("");

    const { addToCart } = useCart();

    const {
        toggleWishlist,
        isInWishlist,
    } = useWishlist();

    const wishlisted = isInWishlist(product.id);
    const stock = Math.max(0, Number(product.stock) || 0);

    const addProductToCart = () => {
        if (!selectedSize) {
            setMessage("Please select a size before adding this item.");
            return;
        }

        addToCart(product, quantity, selectedSize);
        setMessage(`${product.name} added to your bag.`);
        return true;
    };

    const handleBuyNow = () => {
        if (addProductToCart()) {
            navigate("/checkout");
        }
    };

    return (
        <div className="product-detail-info">

            <p className="eyebrow">
                {product.brand} · {product.category}
            </p>

            <h1 className="page-title">
                {product.name}
            </h1>

            {product.reviews > 0 && (
                <div className="product-detail-rating">
                    <Star size={16} fill="#f0a500" color="#f0a500" />
                    {product.rating} / 5
                    <span>({product.reviews} reviews)</span>
                </div>
            )}

            <div className="product-detail-price">
                R{Number(product.price).toFixed(2)}

                {product.oldPrice > product.price && (
                    <span>
                        R{Number(product.oldPrice).toFixed(2)}
                    </span>
                )}
            </div>

            <p className="product-detail-description">
                {product.description}
            </p>

            <div className="product-size-section">
                <h4>Select Size</h4>

                <div className="product-size-options">
                    {product.size?.map((size) => (
                        <button
                            type="button"
                            key={size}
                            className={
                                selectedSize === size
                                    ? "size-button selected"
                                    : "size-button"
                            }
                            onClick={() => setSelectedSize(size)}
                            aria-pressed={selectedSize === size}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <p className={`stock-status${stock === 0 ? " stock-status--unavailable" : ""}`}>
                {stock > 0
                    ? `${stock} ${stock === 1 ? "item" : "items"} available`
                    : "Out of stock"}
            </p>

            {stock > 0 && (
                <div className="product-quantity">
                    <span>Quantity</span>
                    <div className="cart-quantity" aria-label="Quantity">
                        <button
                            type="button"
                            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                            disabled={quantity <= 1}
                            aria-label="Decrease quantity"
                        >
                            <Minus size={15} />
                        </button>
                        <output aria-live="polite">{quantity}</output>
                        <button
                            type="button"
                            onClick={() => setQuantity((value) => Math.min(stock, value + 1))}
                            disabled={quantity >= stock}
                            aria-label="Increase quantity"
                        >
                            <Plus size={15} />
                        </button>
                    </div>
                </div>
            )}

            <div className="product-detail-actions">

                <button
                    type="button"
                    className="btn-primary-custom"
                    onClick={addProductToCart}
                    disabled={stock <= 0}
                >
                    <ShoppingBag size={18} />
                    ADD TO CART
                </button>

                <button
                    type="button"
                    className="btn-outline-custom product-buy-now"
                    onClick={handleBuyNow}
                    disabled={stock <= 0}
                >
                    BUY NOW
                </button>

                <button
                    type="button"
                    className="product-wishlist-detail"
                    onClick={() => toggleWishlist(product)}
                    aria-label="Toggle wishlist"
                >
                    <Heart
                        fill={wishlisted ? "currentColor" : "none"}
                    />
                </button>

            </div>

            {message && (
                <p className="product-cart-feedback" role="status">
                    {message}
                </p>
            )}

            <div className="product-specifications">
                <h4>Product Details</h4>

                {Object.entries(product.specifications || {}).map(
                    ([key, value]) => (
                        <div key={key}>
                            <span>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </span>

                            <strong>{value}</strong>
                        </div>
                    )
                )}
            </div>

        </div>
    );
}   