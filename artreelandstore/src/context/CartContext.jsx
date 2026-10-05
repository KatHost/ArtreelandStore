/* eslint-disable react-refresh/only-export-components */

import {
    createContext,
    useContext,
    useCallback,
    useEffect,
    useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem("artreeland-cart");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            "artreeland-cart",
            JSON.stringify(cartItems)
        );
    }, [cartItems]);

    const addToCart = (product, quantity = 1, size = null) => {
        setCartItems((previous) => {
            const existing = previous.find(
                (item) =>
                    item.id === product.id &&
                    item.selectedSize === size
            );

            if (existing) {
                return previous.map((item) =>
                    item.id === product.id &&
                        item.selectedSize === size
                        ? {
                            ...item,
                            quantity: Math.min(
                                Math.max(1, Number(product.stock) || 1),
                                item.quantity + quantity
                            ),
                        }
                        : item
                );
            }

            return [
                ...previous,
                {
                    ...product,
                    quantity: Math.min(
                        Math.max(1, Number(product.stock) || 1),
                        Math.max(1, Number(quantity) || 1)
                    ),
                    selectedSize: size,
                },
            ];
        });
    };

    const removeFromCart = (id, size = null) => {
        setCartItems((previous) =>
            previous.filter(
                (item) =>
                    !(
                        item.id === id &&
                        item.selectedSize === size
                    )
            )
        );
    };

    const updateQuantity = (id, quantity, size = null) => {
        setCartItems((previous) =>
            previous.map((item) =>
                item.id === id && item.selectedSize === size
                    ? {
                        ...item,
                        quantity: Math.min(
                            Math.max(1, Number(item.stock) || 1),
                            Math.max(1, Number(quantity) || 1)
                        ),
                    }
                    : item
            )
        );
    };

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
}   