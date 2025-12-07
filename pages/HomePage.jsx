import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";

import ProductPage from "./ProductPage.jsx";
import ProductOverviewPage from "./productOverview.jsx";

import CartPage from "./CartPage.jsx";
import Checkout from "./Checkout.jsx";
// import Test from "../components/Text.jsx";

export default function HomePage() {
  return (
    <div>
      <Header />

      <div >
        <Routes>
          <Route path="/" element={<h1>Homnnnne</h1>} />
          <Route path="/product" element={<ProductPage/>} />
          <Route path="/products/:id" element={<ProductOverviewPage/>} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/*" element={<h1>Page not found</h1>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/checkout" element={<Checkout/>} />

        </Routes>
      </div>
    </div>
  );
}
