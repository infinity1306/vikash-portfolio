// src/components/Navbar.jsx
// ============================================================================
// NAVBAR COMPONENT
// ============================================================================
// This component stays at the top of every page.
// Features:
// 1. ShopKart brand logo with "Explore Plus" tagline
// 2. Search input that redirects to /products?search=<keyword>
// 3. Link to browse all products
// 4. Login button (triggers a friendly beginner demo modal)
// 5. Cart icon showing dynamic total items: Cart (3)

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  // Local state for the search input box
  const [searchQuery, setSearchQuery] = useState("");

  // State to toggle the demo login modal
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Hook to navigate programmatically to another route
  const navigate = useNavigate();

  // Read totalItems from our shared CartContext
  const { totalItems } = useCart();

  // Handler for form submit when user presses Enter or clicks Search icon
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to /products with search query param
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* BRAND LOGO */}
        <Link to="/" className="navbar-brand">
          <div className="brand-title">
            <span className="brand-name">ShopKart</span>
            <span className="brand-icon">⚡</span>
          </div>
          <div className="brand-tagline">
            <span>Explore</span> <span className="brand-plus">Plus+</span>
          </div>
        </Link>

        {/* SEARCH BAR */}
        <form className="navbar-search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search for products, brands and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search products"
          />
          <button type="submit" className="navbar-search-btn" title="Search">
            <svg
              className="search-svg-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>

        {/* NAVIGATION ACTIONS */}
        <nav className="navbar-actions">
          {/* All Products Link */}
          <Link to="/products" className="navbar-link">
            <span>All Products</span>
          </Link>

          {/* Login Button */}
          <button
            type="button"
            className="navbar-login-btn"
            onClick={() => setShowLoginModal(true)}
          >
            Login
          </button>

          {/* Cart Button with Count Badge */}
          <Link to="/cart" className="navbar-cart-btn" aria-label="Shopping Cart">
            <span className="cart-svg-wrapper">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {totalItems > 0 && (
                <span className="cart-badge-counter">{totalItems}</span>
              )}
            </span>
            <span className="cart-text">Cart ({totalItems})</span>
          </Link>
        </nav>
      </div>

      {/* DEMO LOGIN MODAL */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()} // Prevent clicking inside modal from closing it
          >
            <div className="modal-header">
              <h3>ShopKart Login</h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowLoginModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-graphic">👋</div>
              <h4>Welcome to ShopKart</h4>
              <p>
                This is a beginner-friendly frontend React educational project.
                Real user authentication is not implemented to keep things simple!
              </p>
              <div className="modal-input-group">
                <label>Mobile Number or Email</label>
                <input
                  type="text"
                  placeholder="Enter email / 10-digit mobile"
                  defaultValue="learner@reactexample.com"
                  readOnly
                />
              </div>
              <button
                className="btn-primary-action"
                onClick={() => setShowLoginModal(false)}
              >
                Got It, Continue Exploring!
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
