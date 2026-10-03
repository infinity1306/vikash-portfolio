// src/components/Footer.jsx
// ============================================================================
// FOOTER COMPONENT
// ============================================================================
// Standard e-commerce footer containing company information, customer policies,
// trust badges, and learning project disclaimers.

import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Trust Badges Strip */}
      <div className="footer-trust-strip">
        <div className="trust-item">
          <span className="trust-icon">✨</span>
          <div>
            <strong>100% Genuine</strong>
            <p>Direct from verified sellers</p>
          </div>
        </div>
        <div className="trust-item">
          <span className="trust-icon">🔄</span>
          <div>
            <strong>7-Day Easy Returns</strong>
            <p>Hassle-free replacement policy</p>
          </div>
        </div>
        <div className="trust-item">
          <span className="trust-icon">🚚</span>
          <div>
            <strong>Fast & Free Delivery</strong>
            <p>On orders above ₹499</p>
          </div>
        </div>
        <div className="trust-item">
          <span className="trust-icon">🛡️</span>
          <div>
            <strong>Safe & Secure</strong>
            <p>Simulated frontend demo checkout</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-links-container">
        <div className="footer-col">
          <h4 className="footer-heading">ABOUT SHOPKART</h4>
          <ul>
            <li><Link to="/products">About Us</Link></li>
            <li><Link to="/products">Careers</Link></li>
            <li><Link to="/products">ShopKart Stories</Link></li>
            <li><Link to="/products">Press & Media</Link></li>
            <li><Link to="/products">Corporate Information</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">HELP & SUPPORT</h4>
          <ul>
            <li><Link to="/cart">Track Orders</Link></li>
            <li><Link to="/products">Shipping & Returns</Link></li>
            <li><Link to="/products">Cancellations</Link></li>
            <li><Link to="/products">FAQ & Help Center</Link></li>
            <li><Link to="/products">Report an Issue</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">CONSUMER POLICY</h4>
          <ul>
            <li><Link to="/products">Terms of Use</Link></li>
            <li><Link to="/products">Security Policy</Link></li>
            <li><Link to="/products">Privacy Practices</Link></li>
            <li><Link to="/products">Grievance Redressal</Link></li>
            <li><Link to="/products">EPR Compliance</Link></li>
          </ul>
        </div>

        <div className="footer-col footer-col-address">
          <h4 className="footer-heading">REGISTERED OFFICE ADDRESS</h4>
          <p className="footer-address-text">
            ShopKart Internet Private Limited,<br />
            Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103, Karnataka, India<br />
            CIN: U51109KA2012PTC066107
          </p>
          <div className="footer-social-icons">
            <span title="Twitter / X">🐦</span>
            <span title="Facebook">📘</span>
            <span title="YouTube">📺</span>
            <span title="Instagram">📸</span>
          </div>
        </div>
      </div>

      {/* Copyright Strip */}
      <div className="footer-bottom-strip">
        <p>
          © 2026 ShopKart. Built as an educational React learning project. Inspired by familiar e-commerce patterns.
        </p>
      </div>
    </footer>
  );
}
