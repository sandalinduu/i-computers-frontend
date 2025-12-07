
// src/pages/ProductOverviewPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { addToCart } from "../pages/utils/cart.js";

export default function ProductOverviewPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/api/products/${id}`)
      .then((res) => {
        if (!res.data.isAvailable) setProduct(null);
        else setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center p-10">Loading...</p>;

  if (!product)
    return (
      <p className="text-center text-red-600 font-medium p-10">
        This product is not available.
      </p>
    );

  // IMAGE HANDLING
  const images =
    product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls
      : product.imageUrl
      ? [product.imageUrl]
      : [];

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
    }
  };

  // ⭐ ADD TO CART — works with cart.js
  const handleAddToCart = () => {
    addToCart(
      {
        productId: product.productId,
        name: product.name,
        price: product.price,
        labelledPrice: product.labelledPrice,
        image: images[0],
        imageUrls: images,
      },
      qty
    );

    window.dispatchEvent(new Event("storage")); // updates navbar count
    alert("🛒 Added to cart!");
  };

  // ⭐ BUY NOW — DIRECT CHECKOUT (NO CART)
  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        directProduct: {
          productId: product.productId,
          name: product.name,
          price: product.price,
          image: images[0],
          quantity: qty,
        },
      },
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* IMAGE CAROUSEL */}
      <div className="relative w-full h-80 overflow-hidden rounded-xl shadow-lg mb-6 bg-gray-100">
        {images.length > 0 ? (
          <img
            src={images[currentIndex]}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        {images.length > 1 && (
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/60"
          >
            ❮
          </button>
        )}

        {images.length > 1 && (
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/60"
          >
            ❯
          </button>
        )}
      </div>

      {/* IMAGE DOTS */}
      <div className="flex justify-center gap-2 mb-6">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentIndex === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>

      {/* NAME */}
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

      {/* PRICE */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl font-semibold text-green-700">
          Rs. {product.price}
        </span>

        {product.labelledPrice && product.labelledPrice > product.price && (
          <>
            <span className="line-through text-gray-500 text-lg">
              Rs. {product.labelledPrice}
            </span>
            <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
              {Math.round(
                ((product.labelledPrice - product.price) /
                  product.labelledPrice) *
                  100
              )}
              % OFF
            </span>
          </>
        )}
      </div>

      {/* DESCRIPTION */}
      <p className="text-gray-700 leading-relaxed mb-4">
        {product.description}
      </p>

      <p className="text-sm text-gray-500 mb-6">
        Product ID: <span className="font-medium">{product.productId}</span>
      </p>

      {/* QUANTITY + BUTTONS */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center border rounded overflow-hidden">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3"
          >
            -
          </button>
          <input
            value={qty}
            onChange={(e) =>
              setQty(Math.max(1, Number(e.target.value || 1)))
            }
            className="w-12 text-center"
          />
          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-3"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg shadow"
        >
          🛒 Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
        >
          ⚡ Buy Now
        </button>
      </div>
    </div>
  );
}
