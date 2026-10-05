import { Link } from "react-router-dom";
const categories = [
    {
        name: "MEN",
        subtitle: "Streetwear essentials",
        image: "/images/model-men.png",
        category: "Men",
    },
    {
        name: "WOMEN",
        subtitle: "Made to stand out",
        image: "/images/women-blue-track-set.png",
        category: "Women",
    },
    {
        name: "FOOTWEAR",
        subtitle: "Find your next pair",
        image: "/images/retro-runner-detail.png",
        category: "Shoes",
    },
    {
        name: "ACCESSORIES",
        subtitle: "The finishing touch",
        image: "/images/accessories-flatlay.png",
        category: "Accessories",
    },
];

export default function Categories() {
    return (
        <section className="section categories-section" id="brands">

            <div className="container-custom">

                <div className="section-header">
                    <div>
                        <p className="eyebrow">EXPLORE THE COLLECTION</p>

                        <h2 className="section-heading">
                            SHOP BY CATEGORY
                        </h2>

                        <p className="section-subtitle">
                            Find your style. Build your identity.
                        </p>
                    </div>

                    <Link to="/shop" className="text-link">
                        View all collections →
                    </Link>
                </div>

                <div className="categories-grid">

                    {categories.map((category) => (
                        <Link
                            to={`/shop?category=${encodeURIComponent(category.category)}`}
                            className="category-card"
                            key={category.name}
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                loading="lazy"
                            />

                            <div className="category-overlay">
                                <span>{category.subtitle}</span>

                                <h3>{category.name}</h3>

                                <span className="category-arrow">
                                    ↗
                                </span>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        </section>
    );
}