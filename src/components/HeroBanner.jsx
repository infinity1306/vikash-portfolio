// src/components/HeroBanner.jsx
// ============================================================================
// HERO BANNER COMPONENT
// ============================================================================
// Shows a rotating promotional banner on the Homepage.
//
// Beginner Concept:
// We use a simple `useState` (currentSlide) and an array of banner objects.
// When user clicks 'Prev' or 'Next', we update `currentSlide` to cycle through.
// We also use `useEffect` with `setInterval` to automatically rotate banners.

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const banners = [
  {
    id: 1,
    badge: "🔥 BIG SAVING DAYS",
    title: "India's Biggest Electronics Fest",
    subtitle: "Up to 70% Off on Headphones, Smartwatches & Accessories",
    ctaText: "Shop Electronics",
    category: "Electronics",
    bgColor: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    badge: "⚡ MEGA DEALS",
    title: "Upgrade to 5G Smartphones",
    subtitle: "Latest releases from Realme, Samsung & Nothing with No-Cost EMI",
    ctaText: "Explore Mobiles",
    category: "Mobiles",
    bgColor: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    badge: "✨ SEASON SPECIAL",
    title: "Trending Styles & Footwear",
    subtitle: "Min 50% Off on Premium Cotton Shirts, Kurtas & Puma Running Shoes",
    ctaText: "Shop Fashion",
    category: "Fashion",
    bgColor: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds using useEffect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    // Clean up timer when component unmounts to prevent memory leaks
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const current = banners[currentSlide];

  return (
    <div className="hero-banner-wrapper">
      <div
        className="hero-banner-card"
        style={{ background: current.bgColor }}
      >
        <div className="hero-content">
          <span className="hero-badge">{current.badge}</span>
          <h1 className="hero-title">{current.title}</h1>
          <p className="hero-subtitle">{current.subtitle}</p>
          <div className="hero-cta-row">
            <Link
              to={`/products?category=${encodeURIComponent(current.category)}`}
              className="hero-cta-btn"
            >
              {current.ctaText} →
            </Link>
            <Link to="/products" className="hero-secondary-btn">
              View All Offers
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src={current.image}
            alt={current.title}
            className="hero-banner-image"
          />
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          className="carousel-arrow prev-arrow"
          onClick={handlePrev}
          aria-label="Previous Slide"
        >
          ‹
        </button>
        <button
          className="carousel-arrow next-arrow"
          onClick={handleNext}
          aria-label="Next Slide"
        >
          ›
        </button>

        {/* Carousel Dots */}
        <div className="carousel-dots">
          {banners.map((b, idx) => (
            <button
              key={b.id}
              className={`carousel-dot ${idx === currentSlide ? "active-dot" : ""}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
