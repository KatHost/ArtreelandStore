import { Link } from "react-router-dom";

import {
    Instagram,
    Facebook,
    ArrowUpRight,
} from "lucide-react";

export default function Footer() {
    return (
        <footer className="footer">

            <div className="container-custom">

                <div className="footer-grid">

                    <div>
                        <Link to="/" className="footer-logo">
                            ARTR<span>Ǝ</span>ELAND
                        </Link>

                        <p className="footer-description">
                            A modern fashion and lifestyle destination.
                            Express yourself through timeless essentials
                            and contemporary streetwear.
                        </p>

                        <div className="footer-socials">
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                                <Instagram />
                            </a>

                            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                                <Facebook />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer-heading">Explore</h4>

                        <div className="footer-links">
                            <Link to="/shop">Shop All</Link>
                            <Link to="/shop">New Arrivals</Link>
                            <Link to="/shop">Collections</Link>
                            <Link to="/about">Our Story</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer-heading">Customer Care</h4>

                        <div className="footer-links">
                            <Link to="/contact">Contact Us</Link>
                            <Link to="/cart">Shopping Cart</Link>
                            <Link to="/wishlist">Wishlist</Link>
                            <Link to="/checkout">Checkout</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer-heading">Discover</h4>

                        <div className="footer-links">
                            <Link to="/about">About ARTRƎELAND</Link>
                            <Link to="/register">Create Account</Link>
                            <Link to="/login">Sign In</Link>
                        </div>
                    </div>

                </div>

                <div className="footer-bottom">
                    <span>
                        © {new Date().getFullYear()} ARTRƎELAND.
                        All rights reserved.
                    </span>

                    <span>
                        Designed for self-expression.
                        <ArrowUpRight size={14} />
                    </span>
                </div>

            </div>
        </footer>
    );
}