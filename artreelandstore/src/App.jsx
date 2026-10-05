import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

export default function App() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <CartProvider>
                <WishlistProvider>
                    <AppRoutes />
                </WishlistProvider>
            </CartProvider>
        </BrowserRouter>
    );
}