

// src/pages/CheckoutPage.jsx
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { getCart, cartTotal } from "../pages/utils/cart.js";

export default function CheckoutPage() {
  const location = useLocation();

  // SINGLE direct checkout product (Buy Now)
  const directProduct = location.state?.directProduct || null;

  // If no direct product → load whole cart
  const items = directProduct ? [directProduct] : getCart();

  const total = directProduct ? directProduct.price : cartTotal();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // Handle Submit
  const handleConfirmOrder = async () => {
    if (!name || !email || !address) {
      alert("Name, Email, and Address are required!");
      return;
    }

    const orderData = {
      name,
      email,
      phone,
      address,
      notes,
      total,
      items
    };

    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Order placed successfully!");
        console.log("Order response:", data);
      } else {
        alert("Failed to place order.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };
console.log(items);
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          fontSize: "28px",
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Checkout
      </h2>

      {items.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            padding: "30px",
            background: "#f5f5f5",
            borderRadius: "10px",
          }}
        >
          No items to checkout.
        </p>
      ) : (
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "20px",
            background: "#fff",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          {/* Item List */}
          {items.map((item) => (
            <div
              key={item.productId}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
                paddingBottom: "20px",
                borderBottom: "1px solid #eee",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: "20px",
                  border: "1px solid #ddd",
                }}
              />

              <div style={{ flexGrow: 1 }}>
                <p style={{ fontSize: "18px", fontWeight: "600" }}>
                  {item.name}
                </p>

                <p style={{ fontSize: "16px", color: "#444" }}>
                  Rs. {item.price}
                </p>

                {!directProduct && (
                  <p style={{ fontSize: "14px", color: "#666" }}>
                    Quantity: {item.quantity}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Total */}
          <div
            style={{
              textAlign: "right",
              marginTop: "10px",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Total: Rs. {total}
          </div>

          {/* ---------------------------------- */}
          {/* Checkout Form */}
          {/* ---------------------------------- */}
          <div style={{ marginTop: "30px" }}>
            <h3 style={{ marginBottom: "10px", fontSize: "22px", fontWeight: "600" }}>
              Your Details
            </h3>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Phone Number (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />

            <textarea
              placeholder="Shipping Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ ...inputStyle, height: "90px" }}
            />

            <textarea
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ ...inputStyle, height: "70px" }}
            />
          </div>

          {/* Confirm Order Button */}
          <button
            style={buttonStyle}
            onClick={handleConfirmOrder}
            onMouseOver={(e) => (e.target.style.background = "#1B5E20")}
            onMouseOut={(e) => (e.target.style.background = "#2E7D32")}
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}

// Input styling
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
};

// Button styling
const buttonStyle = {
  width: "100%",
  padding: "14px 0",
  marginTop: "25px",
  background: "#2E7D32",
  color: "white",
  fontSize: "18px",
  fontWeight: "600",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "0.3s",
};
