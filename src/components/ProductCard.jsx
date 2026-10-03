// src/components/ProductCard.jsx
// ============================================================================
// PRODUCT CARD COMPONENT (Highly Reusable)
// ============================================================================
// This component renders a single product card used throughout the website:
// - On the Home page (Featured Deals, Electronics, Fashion)
// - On the Products listing page
//
// Key Concepts:
// 1. Receives a single 'product' object as a prop: { id, name, price, rating, ... }
// 2. Wrapped in a React Router <Link> to navigate to /product/:id
// 3. IMPORTANT: The "Add to Cart" button uses e.stopPropagation() and e.preventDefault()
//    so clicking "Add to Cart" DOES NOT trigger navigation to the details page!

import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Handle clicking "Add to Cart" without triggering the card's Link click
  const handleAddToCart = (e) => {
    e.preventDefault(); // Stop default link click navigation
    e.stopPropagation(); // Stop event bubbling to parent Link
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <article className="product-card">
        {/* Product Image Container */}
        <div className="product-image-box">
          <img
            src={product.image}
            alt={product.name}
            className="product-card-img"
            loading="lazy"
          />
          {product.discount > 0 && (
            <span className="product-discount-tag">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info">
          <span className="product-category-label">{product.category}</span>
          <h3 className="product-name" title={product.name}>
            {product.name}
          </h3>

          {/* Rating Badge */}
          <div className="product-rating-row">
            <span className="rating-badge">
              {product.rating} <span className="star-icon">★</span>
            </span>
            {product.ratingCount && (
              <span className="rating-count">
                ({product.ratingCount.toLocaleString("en-IN")})
              </span>
            )}
          </div>

          {/* Price Details */}
          <div className="product-price-row">
            <span className="current-price">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice > product.price && (
              <span className="original-price">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            className="card-add-btn"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </article>
    </Link>
  );
}
