import { Link } from "react-router-dom";

import {
    Heart,
    ShoppingBag,
    Star,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const {
        toggleWishlist,
        isInWishlist,
    } = useWishlist();

    const wishlisted = isInWishlist(product.id);

    const handleAddToCart = () => {
        addToCart(product, 1, product.size?.[0] || null);
    };

    return (
        <article className="product-card">

            <div className="product-image-wrapper">

                <Link to={`/product/${product.id}`}>
                    <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className={`product-image${product.imageFit === "contain" ? " product-image--contain" : ""}`}
                        loading="lazy"
                    />
                </Link>

                {product.oldPrice > product.price && (
                    <span className="product-badge">
                        SALE
                    </span>
                )}

                {product.newArrival && (
                    <span className="product-new-badge">
                        NEW
                    </span>
                )}

                <div className="product-actions">

                    <button
                        type="button"
                        className="product-icon-button"
                        onClick={() => toggleWishlist(product)}
                        aria-label={
                            wishlisted
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                        }
                    >
                        <Heart
                            size={18}
                            fill={wishlisted ? "currentColor" : "none"}
                            color={wishlisted ? "#2457ff" : "currentColor"}
                        />
                    </button>

                    <button
                        type="button"
                        className="product-icon-button"
                        onClick={handleAddToCart}
                        aria-label="Add to cart"
                    >
                        <ShoppingBag size={18} />
                    </button>

                </div>
            </div>

            <div className="product-info">

                <span className="product-category">
                    {product.brand} · {product.category}
                </span>

                <Link to={`/product/${product.id}`}>
                    <h3 className="product-name">
                        {product.name}
                    </h3>
                </Link>

                {product.reviews > 0 && (
                    <div className="product-rating">
                        <span>
                            <Star size={13} fill="currentColor" />
                        </span>

                        {product.rating} ({product.reviews})
                    </div>
                )}

                {product.size?.length > 0 && (
                    <div className="product-card-fit-sizes">
                        {product.specifications?.fit && (
                            <p>
                                <span>Fit</span>
                                {product.specifications.fit}
                            </p>
                        )}
                        <p>
                            <span>Sizes</span>
                            {product.size.join(" · ")}
                        </p>
                    </div>
                )}

                <div className="mt-2">
                    <span className="product-price">
                        R{Number(product.price).toFixed(2)}
                    </span>

                    {product.oldPrice > product.price && (
                        <span className="product-old-price">
                            R{Number(product.oldPrice).toFixed(2)}
                        </span>
                    )}
                </div>

            </div>
        </article>
    );
}   