// src/pages/Products.jsx
// ============================================================================
// PRODUCTS CATALOGUE PAGE
// ============================================================================
// Features:
// 1. Live Search (filters products by name or category, case-insensitive)
// 2. Category Filter (All, Mobiles, Electronics, Fashion, Home, etc.)
// 3. Sorting (Default, Price: Low to High, Price: High to Low, Rating: High to Low)
// 4. URL Sync: reads ?category=... and ?search=... from React Router search params!
// 5. Empty State: Displays "No products found" if no products match the criteria.

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/products";

export default function Products() {
  // React Router hook to read and write URL query parameters (e.g. ?category=Fashion&search=shirt)
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial query params from the URL
  const queryCategory = searchParams.get("category") || "all";
  const querySearch = searchParams.get("search") || "";

  // Local state for filters and sorting
  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [searchTerm, setSearchTerm] = useState(querySearch);
  const [sortBy, setSortBy] = useState("default");

  // Keep state in sync if URL query parameters change (e.g. user clicked category in navbar)
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "all");
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  // Update URL search parameters when category or search term changes
  const updateFilters = (newCategory, newSearch) => {
    const params = {};
    if (newCategory && newCategory !== "all") params.category = newCategory;
    if (newSearch && newSearch.trim() !== "") params.search = newSearch.trim();
    setSearchParams(params);
  };

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    updateFilters(catId, searchTerm);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    updateFilters(selectedCategory, term);
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSearchTerm("");
    setSortBy("default");
    setSearchParams({});
  };

  // Compute filtered & sorted products
  // Beginner note: useMemo prevents re-calculating unless products, category, search, or sort changes!
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by Category
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 2. Filter by Search keyword (case-insensitive in name OR category)
    if (searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase().trim();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(lower) ||
          product.category.toLowerCase().includes(lower) ||
          product.description.toLowerCase().includes(lower)
      );
    }

    // 3. Apply Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price); // Lowest price first
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price); // Highest price first
    } else if (sortBy === "rating-desc") {
      result.sort((a, b) => b.rating - a.rating); // Highest rating first
    }

    return result;
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div className="products-page-container">
      {/* Page Header & Search Bar */}
      <div className="products-page-header">
        <div>
          <h1 className="products-page-title">All Products</h1>
          <p className="products-page-subtitle">
            Showing {filteredProducts.length} of {products.length} items available
          </p>
        </div>

        {/* In-page quick search box */}
        <div className="inpage-search-wrapper">
          <input
            type="text"
            className="inpage-search-input"
            placeholder="Filter by name, brand or type..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button
              className="clear-search-btn"
              onClick={() => {
                setSearchTerm("");
                updateFilters(selectedCategory, "");
              }}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Control Bar: Categories Filter & Sorting */}
      <div className="products-controls-bar">
        {/* Category Pills */}
        <div className="category-pills-scroll">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-pill-btn ${
                selectedCategory.toLowerCase() === cat.id.toLowerCase()
                  ? "active-pill"
                  : ""
              }`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div className="sort-controls-wrapper">
          <label htmlFor="sort-select" className="sort-label">
            Sort By:
          </label>
          <select
            id="sort-select"
            className="sort-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Featured / Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Customer Rating: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state-card">
          <div className="empty-state-icon">🔍</div>
          <h2>No products found</h2>
          <p>
            We couldn't find any products matching your selected category or
            search keyword "{searchTerm}".
          </p>
          <button className="btn-primary-action" onClick={handleResetFilters}>
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
