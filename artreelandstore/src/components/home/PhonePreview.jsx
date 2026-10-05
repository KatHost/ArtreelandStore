import {
    ArrowRight,
    Heart,
    Menu,
    Search,
    ShoppingBag,
    Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

import products from "../../data/product";

export default function PhonePreview() {
    const featuredProducts = products.filter(
        (product) => product.featured
    ).slice(0, 2);

    return (
        <aside className="phone-preview" aria-label="Mobile site preview">
            <div className="phone-preview-side-button" />
            <div className="phone-preview-screen">
                <div className="phone-status-bar">
                    <span>9:41</span>
                    <span>●●● ▰</span>
                </div>

                <div className="phone-site-header">
                    <Link to="/" className="phone-logo">
                        ARTRƎELAND
                    </Link>
                    <div className="phone-header-actions">
                        <Link to="/shop" aria-label="Search products">
                            <Search />
                        </Link>
                        <Link to="/wishlist" aria-label="Wishlist">
                            <Heart />
                        </Link>
                        <Link to="/cart" aria-label="Shopping bag">
                            <ShoppingBag />
                        </Link>
                        <Menu aria-hidden="true" />
                    </div>
                </div>

                <div className="phone-mini-hero">
                    <span>THE NEW COLLECTION</span>
                    <h2>
                        MORE THAN
                        <br />
                        JUST FASHION.
                    </h2>
                    <p>Street culture, art and everyday footwear.</p>
                    <Link to="/shop">
                        SHOP NOW <ArrowRight />
                    </Link>
                    <div className="phone-mini-dots">01&nbsp;&nbsp; 02&nbsp;&nbsp; 03</div>
                </div>

                <div className="phone-mini-benefits">
                    <div>
                        <Truck />
                        <span>
                            <strong>Free shipping</strong>
                            <small>On orders R1,500+</small>
                        </span>
                    </div>
                    <div>
                        <Heart />
                        <span>
                            <strong>Curated pairs</strong>
                            <small>Find your next favourite</small>
                        </span>
                    </div>
                </div>

                <div className="phone-mini-products">
                    <div className="phone-mini-products-heading">
                        <span>FEATURED PRODUCTS</span>
                        <Link to="/shop">View all →</Link>
                    </div>
                    <h3>Best Sellers</h3>
                    <div className="phone-mini-product-grid">
                        {featuredProducts.map((product) => (
                            <Link
                                className="phone-mini-product"
                                to={`/product/${product.id}`}
                                key={product.id}
                            >
                                <img src={product.images[0]} alt={product.name} />
                                <strong>{product.name}</strong>
                                <span>R{Number(product.price).toLocaleString("en-ZA")}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="phone-mini-brands">
                    {["Nike", "adidas", "Jordan", "New Balance"].map((brand) => (
                        <Link
                            to={`/shop?brand=${encodeURIComponent(brand)}`}
                            key={brand}
                        >
                            {brand}
                        </Link>
                    ))}
                </div>

                <Link to="/shop" className="phone-mini-shop-link">
                    Explore all sneakers <ArrowRight />
                </Link>

                <div className="phone-home-indicator" />
            </div>
        </aside>
    );
}
