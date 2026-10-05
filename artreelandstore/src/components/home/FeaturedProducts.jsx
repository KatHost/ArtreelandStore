import { Link } from "react-router-dom";

import products from "../../data/product";
import ProductCard from "../shop/ProductCard";

export default function FeaturedProducts() {
    const featuredProducts = products.filter(
        (product) => product.featured
    );

    return (
        <section className="section featured-section">

            <div className="container-custom">

                <div className="section-header">
                    <div>
                        <p className="eyebrow">FEATURED PRODUCTS</p>

                        <h2 className="section-heading">
                            BEST SELLERS
                        </h2>
                    </div>

                    <Link to="/shop" className="text-link">
                        View all →
                    </Link>
                </div>

                <div className="featured-carousel" aria-label="Best sellers">
                    <div className="featured-carousel-track">
                        {[false, true].map((isDuplicate) => (
                            <div
                                className="featured-carousel-group"
                                aria-hidden={isDuplicate || undefined}
                                inert={isDuplicate || undefined}
                                key={isDuplicate ? "duplicate" : "original"}
                            >
                                {featuredProducts.slice(0, 4).map((product) => (
                                    <div
                                        className="featured-carousel-item"
                                        key={product.id}
                                    >
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}