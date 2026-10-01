import { createContext, useContext, useState } from "react";

const StoreContext = createContext(null);
const clearCart = () => setCart([]);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]); // [{ id, qty }]
  const [wishlist, setWishlist] = useState([]); // [id]

  const addToCart = (id, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { id, qty }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty } : item)));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const isWishlisted = (id) => wishlist.includes(id);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const value = {
    cart,
    wishlist,
    addToCart,
    updateQty,
    removeFromCart,
    toggleWishlist,
    isWishlisted,
    cartCount,
    wishlistCount: wishlist.length,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}