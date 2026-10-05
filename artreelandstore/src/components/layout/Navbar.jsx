import { useEffect, useState } from "react";

import {
    Menu,
    X,
    ShoppingBag,
    Heart,
    UserRound,
    Search,
    ChevronDown,
} from "lucide-react";

import {
    Link,
    NavLink,
    useLocation,
    useNavigate,
} from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import products from "../../data/product";

import MobileMenu from "./MobileMenu";

const categories = [...new Set(products.map((product) => product.category))];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);

    const { cartCount } = useCart();
    const { wishlistItems } = useWishlist();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== "/" || location.hash !== "#brands") {
            return undefined;
        }

        const frame = requestAnimationFrame(() => {
            document.getElementById("brands")?.scrollIntoView({
                behavior: "smooth",
            });
        });

        return () => cancelAnimationFrame(frame);
    }, [location.pathname, location.hash]);

    const links = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <>
            <header className="navbar-wrapper">
                <div className="container-custom navbar-content">

                    <button
                        className="navbar-menu-button"
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X /> : <Menu />}
                    </button>

                    <Link to="/" className="navbar-logo">
                        ARTR<span>Ǝ</span>ELAND
                    </Link>

                    <nav className="desktop-navigation">
                        {links.map((link) =>
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end={link.path === "/"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                                onClick={() => setCategoriesOpen(false)}
                            >
                                {link.name}
                            </NavLink>
                        )}

                        <div className="nav-category-menu">
                            <button
                                type="button"
                                className="nav-link nav-category-toggle"
                                aria-expanded={categoriesOpen}
                                aria-haspopup="true"
                                onClick={() =>
                                    setCategoriesOpen((isOpen) => !isOpen)
                                }
                            >
                                Categories
                                <ChevronDown size={15} aria-hidden="true" />
                            </button>

                            <div
                                className={`nav-category-dropdown${categoriesOpen ? " is-open" : ""}`}
                            >
                                {categories.map((category) => (
                                    <Link
                                        key={category}
                                        to={`/shop?category=${encodeURIComponent(category)}`}
                                        onClick={() => setCategoriesOpen(false)}
                                    >
                                        {category}
                                    </Link>
                                ))}
                                <Link
                                    to="/shop"
                                    onClick={() => setCategoriesOpen(false)}
                                >
                                    Shop all
                                </Link>
                            </div>
                        </div>
                    </nav>

                    <div className="navbar-actions">

                        <button
                            type="button"
                            onClick={() => navigate("/shop")}
                            aria-label="Search products"
                        >
                            <Search />
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            aria-label="Account"
                            className="desktop-account"
                        >
                            <UserRound />
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/wishlist")}
                            aria-label="Wishlist"
                            className="navbar-count-button"
                        >
                            <Heart />

                            {wishlistItems.length > 0 && (
                                <span className="navbar-count">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/cart")}
                            aria-label="Shopping cart"
                            className="navbar-count-button"
                        >
                            <ShoppingBag />

                            {cartCount > 0 && (
                                <span className="navbar-count">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                    </div>
                </div>
            </header>

            <MobileMenu
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
            />
        </>
    );
}