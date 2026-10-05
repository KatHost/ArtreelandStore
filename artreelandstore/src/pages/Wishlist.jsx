import { Link } from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/shop/ProductCard";

export default function Wishlist() {
    const { wishlistItems } = useWishlist();

    return (
        <div className="container-custom wishlist-page">

            <p className="eyebrow">YOUR PERSONAL COLLECTION</p>

            <h1 className="page-title mb-4">
                YOUR WISHLIST
            </h1>

            {wishlistItems.length === 0 ? (
                <div className="empty-page">

                    <h2>No saved products yet.</h2>

                    <p>
                        Save your favourite products here.
                    </p>

                    <Link to="/shop" className="btn-primary-custom">
                        EXPLORE COLLECTION
                    </Link>

                </div>
            ) : (
                <div className="row g-4">

                    {wishlistItems.map((product) => (
                        <div
                            className="col-6 col-lg-3"
                            key={product.id}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}