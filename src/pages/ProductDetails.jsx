// src/pages/ProductDetails.jsx
// ============================================================================
// PRODUCT DETAILS PAGE
// ============================================================================
// URL Route: /product/:id
//
// Key Concepts for Beginners:
// 1. useParams() hook reads the :id parameter from the current URL
// 2. We use Array.find() to locate the matching product from our products array
// 3. Left column displays large product image + Add to Cart and Buy Now buttons
// 4. Right column displays price, discounts, ratings, warranty info, and specs
// 5. "Buy Now" adds the product to cart and immediately navigates to /cart

import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Local state for quantity selector on the details page
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Find product by id (convert id string from URL into a number)
  const product = products.find((item) => item.id === parseInt(id, 10));

  // If no matching product exists (e.g. invalid ID in URL)
  if (!product) {
    return (
      <div className="empty-state-card" style={{ margin: "40px auto" }}>
        <div className="empty-state-icon">⚠️</div>
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist or has been moved.</p>
        <Link to="/products" className="btn-primary-action">
          Browse All Products
        </Link>
      </div>
    );
  }

  // Handler: Add to cart with current selected quantity
  const handleAddToCart = () => {
    for (let i = 0; i < selectedQuantity; i++) {
      addToCart(product);
    }
  };

  // Handler: Buy Now (add to cart and navigate immediately to /cart)
  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="product-details-container">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-separator">›</span>
        <Link to="/products">Products</Link>
        <span className="breadcrumb-separator">›</span>
        <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">{product.name}</span>
      </nav>

      {/* Main Details Card (2-column layout) */}
      <div className="product-details-card">
        {/* Left Column: Image and Action Buttons */}
        <div className="details-image-column">
          <div className="details-image-wrapper">
            <img
              src={product.image}
              alt={product.name}
              className="details-main-image"
            />
            {product.discount > 0 && (
              <span className="details-discount-badge">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="details-action-buttons">
            <button
              type="button"
              className="btn-add-to-cart"
              onClick={handleAddToCart}
            >
              <span className="btn-icon">🛒</span> Add to Cart
            </button>
            <button
              type="button"
              className="btn-buy-now"
              onClick={handleBuyNow}
            >
              <span className="btn-icon">⚡</span> Buy Now
            </button>
          </div>
        </div>

        {/* Right Column: Product Information */}
        <div className="details-info-column">
          {/* Category Tag */}
          <span className="details-category-pill">{product.category}</span>

          {/* Title */}
          <h1 className="details-title">{product.name}</h1>

          {/* Rating Badge */}
          <div className="details-rating-row">
            <span className="rating-badge rating-badge-large">
              {product.rating} <span className="star-icon">★</span>
            </span>
            <span className="details-ratings-count">
              {product.ratingCount
                ? `${product.ratingCount.toLocaleString("en-IN")} Ratings & Reviews`
                : "Highly Rated Product"}
            </span>
            <span className="assured-badge">✓ ShopKart Assured</span>
          </div>

          {/* Special Price Header */}
          <div className="details-price-container">
            <div className="details-price-row">
              <span className="details-price">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="details-original-price">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="details-discount-percent">
                    {product.discount}% off
                  </span>
                </>
              )}
            </div>
            <p className="details-tax-text">Inclusive of all taxes</p>
          </div>

          {/* Stock & Delivery Status */}
          <div className="details-stock-section">
            <div className="stock-indicator">
              <span className="stock-dot"></span>
              <strong>{product.inStock ? "In Stock" : "Currently Unavailable"}</strong>
            </div>
            <p className="delivery-text">
              🚚 <strong>FREE Delivery</strong> available on this order. Delivered in 2–4 business days.
            </p>
          </div>

          {/* Quantity Selector on Details Page */}
          <div className="details-qty-selector">
            <label htmlFor="qty-select"><strong>Quantity:</strong></label>
            <select
              id="qty-select"
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(Number(e.target.value))}
              className="qty-dropdown"
            >
              {[1, 2, 3, 4, 5].map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          {/* Offers & Highlights */}
          <div className="details-offers-box">
            <h3 className="offers-title">Available Offers</h3>
            <ul className="offers-list">
              <li>
                🏷️ <strong>Bank Offer:</strong> 10% instant discount on HDFC & SBI Credit Cards on orders above ₹1,500.
              </li>
              <li>
                🏷️ <strong>Special Price:</strong> Get extra 5% off (price inclusive of cashback/coupon).
              </li>
              <li>
                🏷️ <strong>Partner Offer:</strong> Sign up for ShopKart Pay Later and get free shipping on all orders.
              </li>
            </ul>
          </div>

          {/* Description */}
          <div className="details-description-box">
            <h3 className="section-subheading">Product Description</h3>
            <p className="description-content">{product.description}</p>
          </div>

          {/* Trust Highlights */}
          <div className="details-highlights-grid">
            <div className="highlight-card">
              <span className="highlight-icon">🔄</span>
              <span>7-Day Replacement</span>
            </div>
            <div className="highlight-card">
              <span className="highlight-icon">🛡️</span>
              <span>1 Year Warranty</span>
            </div>
            <div className="highlight-card">
              <span className="highlight-icon">💳</span>
              <span>Cash on Delivery</span>
            </div>
            <div className="highlight-card">
              <span className="highlight-icon">⭐</span>
              <span>Top Rated Merchant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
