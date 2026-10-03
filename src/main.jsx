// src/main.jsx
// ============================================================================
// APPLICATION ENTRY POINT
// ============================================================================
// Here we mount the React application into index.html's <div id="root"></div>
// We wrap our entire app with:
// 1. <BrowserRouter>: Enables client-side page routing with React Router
// 2. <CartProvider>: Gives all pages and components access to our shopping cart

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
