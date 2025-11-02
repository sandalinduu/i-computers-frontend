
import { Link } from "react-router-dom";
import logo from "../src/assets/react.svg"; // change to your actual logo path

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-xl font-semibold text-gray-800">My Website</h1>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
          <Link to="/product" className="text-gray-600 hover:text-blue-600">Product</Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
          
        </div>
      </div>
    </header>
  );
}
