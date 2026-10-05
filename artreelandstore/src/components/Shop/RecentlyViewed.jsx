import ProductCard from "./ProductCard";

export default function RecentlyViewed({ products = [] }) {
    if (!products.length) return null;

    return (
        <section className="section">

            <div className="container-custom">

                <h2 className="section-heading mb-4">
                    RECENTLY VIEWED
                </h2>

                <div className="row g-4">
                    {products.map((product) => (
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