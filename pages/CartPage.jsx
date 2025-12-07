
// src/pages/CartPage.jsx
import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateQuantity } from "../pages/utils/cart.js";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(getCart());
  }, []);

  function handleRemove(id) {
    const updated = removeFromCart(id);
    setItems(updated);
  }

  function handleQtyChange(id, type) {
    const updatedCart = getCart().map((item) => {
      if (item.productId === id) {
        let newQty = item.quantity;

        if (type === "inc") newQty++;
        if (type === "dec" && newQty > 1) newQty--;

        return { ...item, quantity: newQty };
      }
      return item;
    });

    localStorage.setItem("cart_v1", JSON.stringify(updatedCart));
    setItems(updatedCart);
  }

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 font-sans">

      {/* Title */}
      <h2 className="text-4xl font-extrabold mb-10 text-gray-900 text-center tracking-wide">
        Shopping Cart
      </h2>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-2xl shadow-sm">
          <p className="text-gray-600 text-lg mb-4">
            Your cart is empty.
          </p>
          <button
            onClick={() => navigate("/product")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition shadow-md"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-6 mb-32">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col sm:flex-row gap-6 bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-xl border shadow-sm"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mt-2 text-lg font-medium">
                    Rs. {item.price}
                  </p>

                  {/* Quantity Selector */}
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-gray-700 font-medium">Quantity:</span>

                    <div className="flex items-center border rounded-lg shadow-sm">
                      <button
                        onClick={() => handleQtyChange(item.productId, "dec")}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l-lg"
                      >
                        -
                      </button>

                      <div className="px-4 py-1 bg-white text-gray-800 font-semibold">
                        {item.quantity}
                      </div>

                      <button
                        onClick={() => handleQtyChange(item.productId, "inc")}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition shadow-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Bottom Summary */}
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-xl p-5 border-t border-gray-200">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

              {/* Clear Cart */}
              <button
                onClick={() => {
                  localStorage.removeItem("cart_v1");
                  setItems([]);
                }}
                // className="text-red-600 font-medium hover:underline"
                className="px-6 py-3 border text-red-600 border-gray-300 rounded-xl hover:underline bg-gray-50 transition shadow-sm "
              >
                Clear Cart
              </button>

              {/* Total */}
              <div className="text-2xl font-bold text-gray-900">
                Total: Rs. {totalPrice.toFixed(2)}
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={()=>navigate(-1)}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition shadow-sm"
                >
                  Continue Shopping
                </button>

                <button
                  onClick={() => navigate("/checkout")}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md transition font-medium"
                >
                  Proceed to Checkout
                </button>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
}


