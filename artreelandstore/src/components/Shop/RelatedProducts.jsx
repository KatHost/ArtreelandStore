import { Link } from "react-router-dom";

import products from "../../data/product";
import ProductCard from "./ProductCard";

export default function RelatedProducts({ product }) {
    const relatedProducts = products
        .filter(
            (item) =>
                item.id !== product.id &&
                item.category === product.category
        )
        .slice(0, 4);

    if (!relatedProducts.length) return null;

    return (
        <section className="section">

            <div className="container-custom">

                <div className="section-header">
                    <h2 className="section-heading">
                        YOU MAY ALSO LIKE
                    </h2>

                    <Link to="/shop" className="text-link">
                        View all →
                    </Link>
                </div>

                <div className="row g-4">
                    {relatedProducts.map((item) => (
                        <div
                            className="col-6 col-lg-3"
                            key={item.id}
                        >
                            <ProductCard product={item} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}