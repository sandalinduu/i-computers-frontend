

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const images = Array.isArray(product.imageUrls)
    ? product.imageUrls
    : [product.imageUrl];

  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);

  // Image slideshow on hover
  useEffect(() => {
    if (!hover || images.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [hover, images.length]);

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden relative hover:shadow-xl transition duration-300 cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setIndex(0); // Reset to first image when mouse leaves
      }}
    >
      {/* IMAGE */}
      <img
        src={images[index]}
        alt={product.name}
        className="w-full h-56 object-cover transition-all duration-500"
      />

      <div className="p-14">
        {/* NAME */}
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          {product.name}
        </h2>

        {/* PRICES */}
        <div className="flex items-center gap-3 mt-1">
          {product.labelledPrice && (
            <span className="text-sm text-gray-400 line-through">
              Rs. {product.labelledPrice}
            </span>
          )}
          <span className="text-lg font-bold text-green-700">
            Rs. {product.price}
          </span>
        </div>
      </div>

      {/* HOVER BUTTON → appears only on hover */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-[80%] transition-all duration-300 ${
          hover ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <Link
          to={`/products/${product.productId}`}
          className="block bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700"
        >
          See More
        </Link>
      </div>
    </div>
  );
}



