import { HashRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

export default function App() {
    return (
        <HashRouter>
            <CartProvider>
                <WishlistProvider>
                    <AppRoutes />
                </WishlistProvider>
            </CartProvider>
        </HashRouter>
    );
}