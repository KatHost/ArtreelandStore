import { Routes, Route } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import TopBar from "../components/layout/TopBar";
import WhatsAppButton from "../components/layout/WhatsAppButton";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Checkout from "../pages/Checkout";
import OrderStatus from "../pages/OrderStatus";

export default function AppRoutes() {
    return (
        <>
            <TopBar />
            <Navbar />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-status" element={<OrderStatus />} />

                    <Route
                        path="*"
                        element={
                            <div className="container py-5 text-center">
                                <h1>404</h1>
                                <p>Page not found.</p>
                            </div>
                        }
                    />
                </Routes>
            </main>

            <WhatsAppButton />
            <Footer />
        </>
    );
}   