import { Link } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

import products from "../../data/product";

const categories = [...new Set(products.map((product) => product.category))];

export default function MobileMenu({ open, onClose }) {
    const [categoriesOpen, setCategoriesOpen] = useState(false);

    if (!open) return null;

    const links = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Login", path: "/login" },
    ];

    return (
        <div className="mobile-menu-overlay">
            <div className="mobile-menu">
                <div className="mobile-menu-header">
                    <Link to="/" onClick={onClose}>
                        ARTRƎELAND
                    </Link>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close menu"
                    >
                        <X />
                    </button>
                </div>

                <nav className="mobile-menu-links">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={onClose}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <button
                        type="button"
                        className="mobile-menu-category-toggle"
                        aria-expanded={categoriesOpen}
                        onClick={() =>
                            setCategoriesOpen((isOpen) => !isOpen)
                        }
                    >
                        Categories
                        <ChevronDown size={20} aria-hidden="true" />
                    </button>

                    {categoriesOpen && (
                        <div className="mobile-menu-category-list">
                            {categories.map((category) => (
                                <Link
                                    key={category}
                                    to={`/shop?category=${encodeURIComponent(category)}`}
                                    onClick={onClose}
                                >
                                    {category}
                                </Link>
                            ))}
                            <Link to="/shop" onClick={onClose}>
                                Shop all
                            </Link>
                        </div>
                    )}
                </nav>

                <p className="mobile-menu-bottom">
                    STYLE WITHOUT LIMITS.
                </p>
            </div>
        </div>
    );
}