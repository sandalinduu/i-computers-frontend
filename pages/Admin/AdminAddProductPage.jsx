


import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import uploadFile from "../utils/mediaUpload.js"; // Supabase upload utility

export default function AddProductPage() {
  const navigate = useNavigate();

  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altName, setAltName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [labelledPrice, setLabelledPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [files, setFiles] = useState([]); // ⭐ Multiple image files
  const [isAvailable, setIsAvailable] = useState(true);
  const [uploading, setUploading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!files.length) {
      alert("❌ Please select at least one image!");
      return;
    }

    setUploading(true);

    try {
      // ⭐ 1️⃣ Upload all selected images to Supabase
      const imageUrls = [];

      for (let i = 0; i < files.length; i++) {
        const uploadedUrl = await uploadFile(files[i]);
        imageUrls.push(uploadedUrl);
      }

      // ⭐ 2️⃣ Prepare product data
      const token = localStorage.getItem("token");
      const data = {
        productId,
        name,
        altName: altName.split(","),
        description,
        price,
        labelledPrice,
        category,
        brand,
        stock,
        isAvailable,
        imageUrls, // ⭐ SEND ARRAY OF URLS
      };

      // ⭐ 3️⃣ Save product
      await axios.post("http://localhost:3000/api/products", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Product added successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert("❌ Failed to add product");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        <input
          placeholder="Product ID"
          className="border p-2"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        <input
          placeholder="Product Name"
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Alternative Names (comma)"
          className="border p-2"
          value={altName}
          onChange={(e) => setAltName(e.target.value)}
        />

        <input
          placeholder="Brand"
          className="border p-2"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <input
          placeholder="Category"
          className="border p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          placeholder="Price"
          type="number"
          className="border p-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Label Price"
          type="number"
          className="border p-2"
          value={labelledPrice}
          onChange={(e) => setLabelledPrice(e.target.value)}
        />

        <input
          placeholder="Stock"
          type="number"
          className="border p-2"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border p-2 col-span-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* ⭐ Availability Checkbox */}
        <div className="col-span-2 flex items-center gap-3">
          <input
            id="isAvailable"
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="isAvailable" className="font-medium">
            Available
          </label>
        </div>

        {/* ⭐ Multiple Images Upload */}
        <div className="col-span-2 flex flex-col gap-3">
          <label className="font-semibold">Upload Images (You can select many):</label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles([...e.target.files])}
          />

          {/* Preview selected files */}
          {files.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-2">
              {Array.from(files).map((file, i) => (
                <p key={i} className="text-sm text-gray-600">
                  📷 {file.name}
                </p>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white py-2 col-span-2 rounded"
        >
          {uploading ? "Uploading..." : "Add Product ✅"}
        </button>
      </form>
    </div>
  );
}


