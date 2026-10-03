// src/components/CategoryBar.jsx
// ============================================================================
// CATEGORY BAR COMPONENT
// ============================================================================
// This component displays the iconic horizontal strip of shopping categories.
// Clicking on any category navigates the user to /products?category=<CategoryName>
//
// How data flows:
// 1. Imports 'categories' array from products.js
// 2. Uses Array.map() to render a clickable card for each category
// 3. Uses React Router's Link to set the URL query parameter

import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/products";

export default function CategoryBar({ activeCategory = "all" }) {
  return (
    <div className="category-bar-wrapper">
      <div className="category-bar-container">
        {categories.map((cat) => {
          // If category is "all", link to /products without parameter
          const targetUrl =
            cat.id === "all"
              ? "/products"
              : `/products?category=${encodeURIComponent(cat.id)}`;

          const isSelected = activeCategory === cat.id;

          return (
            <Link
              key={cat.id}
              to={targetUrl}
              className={`category-item ${isSelected ? "active-category" : ""}`}
            >
              <div className="category-icon-circle">{cat.icon}</div>
              <span className="category-name">{cat.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
