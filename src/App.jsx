// src/App.jsx
// ============================================================================
// APP COMPONENT: Main Routing & Global Layout
// ============================================================================
// Key Concepts:
// 1. BrowserRouter wraps the application (configured in main.jsx)
// 2. <Routes> and <Route> define our client-side page paths
// 3. Navbar and Footer are placed outside <Routes> so they appear on every page!
// 4. ScrollToTop ensures the window scrolls up whenever the route changes

import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

// Helper component that resets window scroll on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="app-wrapper">
      {/* Scroll to top whenever URL changes */}
      <ScrollToTop />

      {/* Global Navbar */}
      <Navbar />

      {/* Dynamic Route Pages */}
      <main className="main-content-area">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          {/* Fallback for any undefined path */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
