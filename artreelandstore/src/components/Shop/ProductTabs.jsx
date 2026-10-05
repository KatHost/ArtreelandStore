import { useState } from "react";

export default function ProductTabs({ product }) {
    const [activeTab, setActiveTab] = useState("description");

    const tabs = [
        { id: "description", label: "Description" },
        { id: "specifications", label: "Specifications" },
        { id: "reviews", label: "Reviews" },
    ];

    return (
        <section className="product-tabs">

            <div className="product-tab-buttons">
                {tabs.map((tab) => (
                    <button
                        type="button"
                        key={tab.id}
                        className={
                            activeTab === tab.id ? "active" : ""
                        }
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="product-tab-content">

                {activeTab === "description" && (
                    <p>{product.description}</p>
                )}

                {activeTab === "specifications" && (
                    <div className="product-specifications">
                        {Object.entries(
                            product.specifications || {}
                        ).map(([key, value]) => (
                            <div key={key}>
                                <span>{key}</span>
                                <strong>{value}</strong>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "reviews" && (
                    <div>
                        {product.reviews > 0 ? (
                            <>
                                <h3>{product.rating} out of 5</h3>
                                <p>Based on {product.reviews} customer reviews.</p>
                            </>
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </div>
                )}

            </div>
        </section>
    );
}