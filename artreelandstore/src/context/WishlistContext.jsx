/* eslint-disable react-refresh/only-export-components */

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
    const [wishlistItems, setWishlistItems] = useState(() => {
        try {
            const saved = localStorage.getItem(
                "artreeland-wishlist"
            );

            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            "artreeland-wishlist",
            JSON.stringify(wishlistItems)
        );
    }, [wishlistItems]);

    const addToWishlist = (product) => {
        setWishlistItems((previous) => {
            if (
                previous.some((item) => item.id === product.id)
            ) {
                return previous;
            }

            return [...previous, product];
        });
    };

    const removeFromWishlist = (id) => {
        setWishlistItems((previous) =>
            previous.filter((item) => item.id !== id)
        );
    };

    const toggleWishlist = (product) => {
        const exists = wishlistItems.some(
            (item) => item.id === product.id
        );

        if (exists) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const isInWishlist = (id) =>
        wishlistItems.some((item) => item.id === id);

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
                isInWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}
export function useWishlist() {
    const context = useContext(WishlistContext);

    if (!context) {
        throw new Error(
            "useWishlist must be used inside WishlistProvider"
        );
    }

    return context;
}