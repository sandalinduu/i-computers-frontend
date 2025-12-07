


// src/pages/admin/AdminProductPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

const AdminProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (error) {
      console.log("❌ Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      setDeletingId(selectedProduct._id);
      await axios.delete(
        `http://localhost:3000/api/products/${selectedProduct._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts((prev) =>
        prev.filter((p) => p._id !== selectedProduct._id)
      );

      setShowModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("❌ Error deleting product:", error);
      alert(error.response?.data?.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };
    console.log("Product images:", products.map(p => p.imageUrl));
  return (
    
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h2 className="text-2xl font-bold text-gray-800">Admin Product Panel</h2>

        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg shadow flex items-center gap-2"
        >
          ➕ Add Product
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">All Products</h3>

        {loading ? (
          <p className="text-center text-gray-500 italic py-4">Loading products...</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">

              <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                <tr>
                  {[
                    "Image",
                    "Product ID",
                    "Name",
                    "Price",
                    "Category",
                    "Brand",
                    "Stock",
                    "Availability",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 font-semibold text-gray-700 text-center"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {products.length > 0 ? (
                  products.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition">

                      <td className="px-4 py-2 text-center">
                        <img
                        
                          src={
  Array.isArray(item.imageUrls) && item.imageUrls.length > 0
    ? item.imageUrls[0]
    : "/no-image.png"
}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-md border"
                        />
                      </td>

                      <td className="px-4 py-2 text-center font-medium text-gray-700">
                        {item.productId}
                      </td>

                      <td className="px-4 py-2 text-center">{item.name}</td>

                      <td className="px-4 py-2 text-center">Rs {item.price}</td>

                      <td className="px-4 py-2 text-center">{item.category}</td>

                      <td className="px-4 py-2 text-center">{item.brand}</td>

                      <td className="px-4 py-2 text-center">{item.stock}</td>

                      <td className="px-4 py-2 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-white text-sm ${
                            item.isAvailable ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {item.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>

                      <td className="px-4 py-2 text-center flex items-center gap-2 justify-center">

                        {/* EDIT BUTTON */}
                        <button
                          onClick={() => navigate(`/admin/update-product/${item.productId}`, { state: item })}
                          className="px-3 py-1 rounded-lg text-white bg-green-600 hover:bg-green-700"
                        >
                          Edit
                        </button>

                        {/* DELETE BUTTON */}
                        <button
                          onClick={() => openDeleteModal(item)}
                          disabled={deletingId === item._id}
                          className={`px-3 py-1 rounded-lg text-white ${
                            deletingId === item._id
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          {deletingId === item._id ? "Deleting..." : "Delete"}
                        </button>

                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center italic py-4 text-gray-500">
                      No products found...
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <DeleteConfirmModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        productName={selectedProduct?.name}
      />
    </div>
  );
};

export default AdminProductPage;






