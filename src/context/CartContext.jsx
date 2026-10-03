// src/context/CartContext.jsx
// ============================================================================
// CART CONTEXT: Simple, Beginner-Friendly State Management
// ============================================================================
// Why do we use React Context here?
// In an e-commerce website, multiple components need access to the shopping cart:
// 1. Navbar needs to display total item count: "Cart (3)"
// 2. ProductCard and ProductDetails need an "Add to Cart" function
// 3. Cart page needs to read all items, change quantities, and calculate totals
//
// Instead of passing "cart" and "setCart" as props through dozens of components
// (called "prop drilling"), React Context allows ANY component to directly
// read the cart and call cart functions!

import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create the Context object
const CartContext = createContext();

// Storage key used for browser localStorage
const STORAGE_KEY = "shopkart_cart_items";

// 2. Create the Provider Component
// This component wraps our app so all children have access to the cart state.
export function CartProvider({ children }) {
  // Load saved cart from localStorage on first render, or default to an empty array []
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Could not load cart from localStorage", error);
      return [];
    }
  });

  // Simple state for a quick "Added to cart" feedback notification
  const [toastMessage, setToastMessage] = useState(null);

  // Show a brief toast message that auto-dismisses after 2.5 seconds
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Whenever the 'cart' state changes, save it to browser localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Could not save cart to localStorage", error);
    }
  }, [cart]);

  // FUNCTION: Add a product to the cart
  // Rule: If product already exists in cart, increase its quantity by 1.
  // If it's a new product, add it with quantity: 1.
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if item is already in cart
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Increase quantity of existing product
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new product with initial quantity of 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    showToast(`"${product.name.slice(0, 25)}..." added to your cart!`);
  };

  // FUNCTION: Remove a product completely from cart by its ID
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    showToast("Item removed from cart.");
  };

  // FUNCTION: Increase or decrease quantity
  // delta can be +1 (increase) or -1 (decrease)
  // Rule: Prevent quantity from going below 1!
  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          // Ensure quantity stays at least 1
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  // FUNCTION: Clear entire cart (e.g. after mock checkout)
  const clearCart = () => {
    setCart([]);
  };

  // HELPER CALCULATIONS: Total items and total price
  // Array.reduce() is a standard JavaScript array method to calculate a single total
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalOriginalPrice = cart.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );

  const totalSavings = totalOriginalPrice - totalPrice;

  // The value object contains all data and functions we want to share
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    totalOriginalPrice,
    totalSavings,
    toastMessage,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      {/* Visual Toast Notification displayed when user adds an item */}
      {toastMessage && (
        <div className="cart-toast" role="status" aria-live="polite">
          <span className="toast-icon">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </CartContext.Provider>
  );
}

// 3. Custom Hook: useCart()
// Makes it easy for components to use the context:
// const { cart, addToCart } = useCart();
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
