// src/pages/Cart.jsx
// ============================================================================
// SHOPPING CART PAGE
// ============================================================================
// Features:
// 1. Lists all items added to the cart
// 2. Quantity controls (+ and -) with min limit of 1
// 3. Remove item button
// 4. Flipkart-style "Price Details" summary breakdown
// 5. Checkout button that displays the required demo notice:
//    "Checkout functionality is not available in this frontend demo."
// 6. Empty state with "Continue Shopping" button

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    totalOriginalPrice,
    totalSavings,
  } = useCart();

  // State to toggle the checkout notice modal/banner
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // If cart is empty, render clean empty state
  if (cart.length === 0) {
    return (
      <div className="cart-page-container">
        <div className="empty-cart-card">
          <div className="empty-cart-graphic">🛒</div>
          <h2 className="empty-cart-title">Your cart is empty!</h2>
          <p className="empty-cart-desc">
            Explore our wide range of products and discover great deals across electronics, fashion, and more.
          </p>
          <Link to="/products" className="btn-continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h1 className="cart-main-heading">Shopping Cart ({totalItems} items)</h1>

      <div className="cart-layout-grid">
        {/* LEFT COLUMN: List of Cart Items */}
        <div className="cart-items-column">
          <div className="cart-items-card">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-row">
                {/* Product Image */}
                <div className="cart-item-image-box">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-thumbnail"
                    />
                  </Link>

                  {/* Quantity Controls: [ - ] [ qty ] [ + ] */}
                  <div className="cart-qty-controls">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                      title="Decrease Quantity"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-value-display">{item.quantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                      title="Increase Quantity"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Product Details & Actions */}
                <div className="cart-item-details">
                  <span className="cart-item-category">{item.category}</span>
                  <Link to={`/product/${item.id}`} className="cart-item-title-link">
                    <h3 className="cart-item-title">{item.name}</h3>
                  </Link>

                  <div className="cart-item-pricing">
                    <span className="cart-item-price">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                    {item.originalPrice > item.price && (
                      <>
                        <span className="cart-item-original-price">
                          ₹{(item.originalPrice * item.quantity).toLocaleString("en-IN")}
                        </span>
                        <span className="cart-item-discount">
                          {item.discount}% Off
                        </span>
                      </>
                    )}
                    <span className="cart-item-unit-price">
                      (₹{item.price.toLocaleString("en-IN")} each)
                    </span>
                  </div>

                  <p className="cart-item-delivery">
                    🚚 Delivery in <strong>2–3 Days</strong> | <span className="free-tag">Free</span>
                  </p>

                  <div className="cart-item-actions">
                    <button
                      type="button"
                      className="btn-remove-item"
                      onClick={() => removeFromCart(item.id)}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Bottom Bar */}
          <div className="cart-bottom-actions">
            <Link to="/products" className="btn-back-to-shop">
              ← Continue Shopping
            </Link>
            <button
              type="button"
              className="btn-place-order"
              onClick={() => setShowCheckoutModal(true)}
            >
              Place Order ({totalItems})
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Flipkart-style Price Details Card */}
        <div className="cart-summary-column">
          <div className="price-details-card">
            <h2 className="price-details-header">PRICE DETAILS</h2>

            <div className="price-breakdown">
              <div className="price-row">
                <span>Price ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
                <span>₹{totalOriginalPrice.toLocaleString("en-IN")}</span>
              </div>

              <div className="price-row green-text">
                <span>Discount</span>
                <span>− ₹{totalSavings.toLocaleString("en-IN")}</span>
              </div>

              <div className="price-row">
                <span>Delivery Charges</span>
                <span className="green-text">FREE</span>
              </div>

              <div className="price-row-divider"></div>

              <div className="price-total-row">
                <strong>Total Amount</strong>
                <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
              </div>

              <div className="savings-badge">
                🎉 You will save ₹{totalSavings.toLocaleString("en-IN")} on this order
              </div>
            </div>

            <button
              type="button"
              className="btn-place-order-full"
              onClick={() => setShowCheckoutModal(true)}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>

          {/* Safe & Secure Guarantee Badge */}
          <div className="safe-checkout-guarantee">
            <span>🛡️</span>
            <span>Safe and Secure Payments. 100% Authentic Products.</span>
          </div>
        </div>
      </div>

      {/* CHECKOUT DEMO MODAL */}
      {showCheckoutModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowCheckoutModal(false)}
        >
          <div
            className="modal-box checkout-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Order Demo Notice</h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowCheckoutModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-graphic">🛍️</div>
              <h4>Order Summary</h4>
              <p className="checkout-demo-text">
                <strong>Total Items:</strong> {totalItems} items<br />
                <strong>Grand Total:</strong> ₹{totalPrice.toLocaleString("en-IN")}
              </p>
              <div className="checkout-alert-box">
                Checkout functionality is not available in this frontend demo.
              </div>
              <p className="checkout-subtext">
                This project was created to demonstrate React state management, components,
                props, React Router, and localStorage persistence for a beginner learner!
              </p>
              <button
                className="btn-primary-action"
                onClick={() => setShowCheckoutModal(false)}
              >
                Close & Return to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
