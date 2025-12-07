// src/components/CartIcon.jsx
import React, { useEffect, useState } from "react";
import { cartCount } from "../pages/utils/cart.js";

export default function CartIcon() {
  const [count, setCount] = useState(cartCount());

  // update count when localStorage changes
  useEffect(() => {
    const onStorage = () => setCount(cartCount());
    window.addEventListener("storage", onStorage);

    // simple polling (optional)
    const interval = setInterval(() => setCount(cartCount()), 800);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <div className="relative inline-flex items-center px-3 py-1">
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4"
        />
      </svg>

      {count > 0 && (
        <span className="absolute -top-2 -right-0 bg-red-600 text-white text-xs px-2 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}
