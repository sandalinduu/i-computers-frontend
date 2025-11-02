import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Text from "../components/Text.jsx";
import Test from "../components/Text.jsx";

export default function HomePage() {
  return (
    <div>
      <Header />

      <div >
        <Routes>
          <Route path="/" element={<h1>Homnnnne</h1>} />
          <Route path="/product" element={<Test/>} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/*" element={<h1>Page not found</h1>} />
        </Routes>
      </div>
    </div>
  );
}
