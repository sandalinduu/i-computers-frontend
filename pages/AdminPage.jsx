
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import AdminProductPage from "./Admin/AdminProductPage.jsx";
import AdminAddProductPage from "./Admin/AdminAddProductPage.jsx";
import AdminUpdateProductPage from "./Admin/AdminUpdateProductPage.jsx";
import AdminOrdersPage from "./Admin/AdminOrdersPage.jsx";
import ViewOrderInfo from "../components/ViewOrderInfo.jsx";

export default function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Protect admin route
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId"); // Optional but good

    navigate("/login");
  };

  const menuItems = [
    { path: "/admin", label: "Orders" },
    { path: "/admin/products", label: "Products" },
    { path: "/admin/users", label: "Users" },
    { path: "/admin/reviews", label: "Reviews" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col p-5 space-y-4 fixed md:static h-full">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Admin Panel</h3>

        {/* Navigation */}
        <nav className="space-y-3 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded-lg font-medium transition ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 ml-64 md:ml-0 p-6 overflow-y-scroll">
        <div className="bg-white p-6 rounded-lg shadow text-gray-800 text-2xl font-semibold">
          <Routes>
            <Route path="/" element={<AdminOrdersPage/>} />
            <Route path="/order-info" element={<ViewOrderInfo/>} />
            <Route path="/products" element={<AdminProductPage />} />
            <Route path="/add-product" element={<AdminAddProductPage />} />
            <Route path="/update-product/:id" element={<AdminUpdateProductPage />} />
            <Route path="/users" element={<h1>Users</h1>} />
            <Route path="/reviews" element={<h1>Reviews</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
