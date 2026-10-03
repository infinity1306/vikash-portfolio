// src/pages/Home.jsx
// ============================================================================
// HOME PAGE
// ============================================================================
// Structure:
// 1. Category Bar (quick links to product categories)
// 2. Hero Banner (promotional carousel)
// 3. Featured / Best Deals Section
// 4. Electronics Section
// 5. Fashion Section
// 6. Home & Appliances Section
//
// Beginner Concept:
// We import our mock `products` array and use Array.filter() to extract
// subsets of products for each section. Then we pass those products into
// the reusable <ProductSection /> component!

import React from "react";
import CategoryBar from "../components/CategoryBar";
import HeroBanner from "../components/HeroBanner";
import ProductSection from "../components/ProductSection";
import { products } from "../data/products";

export default function Home() {
  // Filter subsets of products to show in different sections
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const electronicsProducts = products.filter((p) => p.category === "Electronics").slice(0, 4);
  const fashionProducts = products.filter((p) => p.category === "Fashion").slice(0, 4);
  const appliancesProducts = products.filter(
    (p) => p.category === "Appliances" || p.category === "Home"
  ).slice(0, 4);

  return (
    <div className="home-page">
      {/* 1. Category Bar */}
      <CategoryBar />

      {/* 2. Hero Promotional Carousel */}
      <HeroBanner />

      {/* Main Content Container */}
      <div className="home-sections-container">
        {/* 3. Featured Products / Best Deals */}
        <ProductSection
          title="⚡ Best Deals of the Day"
          subtitle="Handpicked top discounts on best-selling items"
          products={featuredProducts}
          viewAllLink="/products"
        />

        {/* 4. Electronics Showcase */}
        <ProductSection
          title="🎧 Best of Electronics & Audio"
          subtitle="Noise cancelling headphones, smartwatches & accessories"
          products={electronicsProducts}
          viewAllLink="/products?category=Electronics"
        />

        {/* 5. Fashion Showcase */}
        <ProductSection
          title="👕 Trending in Fashion & Footwear"
          subtitle="Upgrade your wardrobe with latest denim, ethnic wear & sneakers"
          products={fashionProducts}
          viewAllLink="/products?category=Fashion"
        />

        {/* 6. Home & Appliances */}
        <ProductSection
          title="🏠 Home & Kitchen Appliances"
          subtitle="Air fryers, mixer grinders & premium memory foam pillows"
          products={appliancesProducts}
          viewAllLink="/products?category=Appliances"
        />
      </div>
    </div>
  );
}
