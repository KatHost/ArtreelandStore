import { Link } from "react-router-dom";

import products from "../../data/product";
import ProductCard from "../shop/ProductCard";

export default function NewArrivals() {
    const newProducts = products
        .filter(
            (product) =>
                product.newArrival && product.brand === "ARTRƎELAND"
        )
        .slice(-4)
        .reverse();

    return (
        <section className="section new-arrivals-section">

            <div className="container-custom">

                <div className="section-header">
                    <div>
                        <p className="eyebrow">JUST DROPPED</p>

                        <h2 className="section-heading">
                            New Arrivals
                        </h2>
                    </div>

                    <Link to="/shop" className="text-link">
                        View All →
                    </Link>
                </div>

                <div className="row g-4">

                    {newProducts.slice(0, 4).map((product) => (
                        <div
                            className="col-6 col-lg-3"
                            key={product.id}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}