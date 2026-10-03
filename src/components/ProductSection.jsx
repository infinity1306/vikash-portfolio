// src/components/ProductSection.jsx
// ============================================================================
// PRODUCT SECTION COMPONENT
// ============================================================================
// Displays a curated row or section of products on the Home page.
// Features:
// - Section Title and Subtitle
// - "View All" button linking to /products or filtered category
// - Reuses the exact same <ProductCard /> component to prevent code duplication!

import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function ProductSection({
  title,
  subtitle,
  categoryFilter,
  products = [],
  viewAllLink = "/products"
}) {
  if (!products || products.length === 0) return null;

  return (
    <section className="product-section-card">
      <div className="section-header">
        <div className="section-header-text">
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
        <Link to={viewAllLink} className="section-view-all-btn">
          View All →
        </Link>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
