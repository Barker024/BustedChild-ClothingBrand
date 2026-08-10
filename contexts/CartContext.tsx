"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface CartItem {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];

  addToCart: (item: CartItem) => void;

  removeFromCart: (
    id: number,
    size: string
  ) => void;

  updateQuantity: (
    id: number,
    size: string,
    quantity: number
  ) => void;

  clearCart: () => void;

  hasLoadedCart: boolean;

  cartCount: number;

  total: number;

  // Drawer State
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hasLoadedCart, setHasLoadedCart] = useState(false);

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  // Load cart
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        localStorage.removeItem("cart");
      }
    }
    setHasLoadedCart(true);
  }, []);

  // Save cart
  useEffect(() => {
    if (hasLoadedCart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, hasLoadedCart]);

  // Drawer controls
  const openCart = () =>
    setIsCartOpen(true);

  const closeCart = () =>
    setIsCartOpen(false);

  const toggleCart = () =>
    setIsCartOpen((prev) => !prev);

  // Add product
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (product) =>
          product.id === item.id &&
          product.size === item.size
      );

      if (existing) {
        return prev.map((product) =>
          product.id === item.id &&
          product.size === item.size
            ? {
                ...product,
                quantity:
                  product.quantity +
                  item.quantity,
              }
            : product
        );
      }

      return [...prev, item];
    });

    // Automatically open drawer
    openCart();
  };

  // Remove product
  const removeFromCart = (
    id: number,
    size: string
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size
          )
      )
    );
  };

  // Update quantity
  const updateQuantity = (
    id: number,
    size: string,
    quantity: number
  ) => {
    if (quantity < 1) {
      removeFromCart(id, size);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id &&
        item.size === size
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Total items
  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Total price
  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        hasLoadedCart,
        cartCount,
        total,

        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
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
      "useCart must be used inside CartProvider."
    );
  }

  return context;
}
