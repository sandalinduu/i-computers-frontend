// // src/pages/admin/AdminUpdateProductPage.jsx
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import uploadFile from "../utils/mediaUpload.js"; // your Supabase uploader

// export default function AdminUpdateProductPage() {
//   const { id } = useParams(); // this is productId
//   const location = useLocation();
//   const navigate = useNavigate();

//   const product = location.state;

//   const [productId, setProductId] = useState(product?.productId || "");
//   const [name, setName] = useState(product?.name || "");
//   const [altName, setAltName] = useState(product?.altName?.join(",") || "");
//   const [description, setDescription] = useState(product?.description || "");
//   const [price, setPrice] = useState(product?.price || "");
//   const [labelledPrice, setLabelledPrice] = useState(
//     product?.labelledPrice || ""
//   );
//   const [category, setCategory] = useState(product?.category || "");
//   const [brand, setBrand] = useState(product?.brand || "");
//   const [stock, setStock] = useState(product?.stock || "");
//   const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
//   const [isAvailable, setIsAvailable] = useState(
//     typeof product?.isAvailable === "boolean" ? product.isAvailable : true
//   );

//   const [file, setFile] = useState(null); // new image file
//   const [uploading, setUploading] = useState(false);

//   const token = localStorage.getItem("token");

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setUploading(true);

//     try {
//       let finalImageUrl = imageUrl; // default: old image

//       // If user uploads a new file → upload to Supabase
//       if (file) {
//         const uploaded = await uploadFile(file);
//         if (!uploaded) {
//           alert("❌ Image upload failed.");
//           setUploading(false);
//           return;
//         }
//         finalImageUrl = uploaded;
//       }

//       const updatedData = {
//         productId,
//         name,
//         altName: altName ? altName.split(",") : [],
//         description,
//         price,
//         labelledPrice,
//         category,
//         brand,
//         stock,
//         isAvailable,            // <-- availability included
//         imageUrl: finalImageUrl, // final image
//       };

//       await axios.put(
//         `http://localhost:3000/api/products/${id}`,
//         updatedData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("✅ Product updated successfully!");
//       navigate("/admin/products");
//     } catch (error) {
//       console.error("❌ Update error:", error);
//       alert(error.response?.data?.message || "Failed to update product");
//     } finally {
//       setUploading(false);
//     }
//   }

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Update Product</h2>

//       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//         <input
//           placeholder="Product ID"
//           className="border p-2"
//           value={productId}
//           onChange={(e) => setProductId(e.target.value)}
//         />

//         <input
//           placeholder="Product Name"
//           className="border p-2"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           placeholder="Alternative Names (comma separated)"
//           className="border p-2"
//           value={altName}
//           onChange={(e) => setAltName(e.target.value)}
//         />

//         <input
//           placeholder="Brand"
//           className="border p-2"
//           value={brand}
//           onChange={(e) => setBrand(e.target.value)}
//         />

//         <input
//           placeholder="Category"
//           className="border p-2"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         />

//         <input
//           placeholder="Price"
//           type="number"
//           className="border p-2"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />

//         <input
//           placeholder="Label Price"
//           type="number"
//           className="border p-2"
//           value={labelledPrice}
//           onChange={(e) => setLabelledPrice(e.target.value)}
//         />

//         <input
//           placeholder="Stock"
//           type="number"
//           className="border p-2"
//           value={stock}
//           onChange={(e) => setStock(e.target.value)}
//         />

//         <textarea
//           placeholder="Description"
//           className="border p-2 col-span-2"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         {/* CURRENT IMAGE PREVIEW */}
//         <div className="col-span-2">
//           <p className="font-medium mb-1">Current Image:</p>
//           {imageUrl ? (
//             <img
//               src={imageUrl}
//               alt={name}
//               className="w-32 h-32 object-cover border rounded"
//             />
//           ) : (
//             <div className="w-32 h-32 bg-gray-100 border rounded flex items-center justify-center">
//               <span className="text-gray-400 text-sm">No image</span>
//             </div>
//           )}
//         </div>

//         {/* UPLOAD NEW IMAGE */}
//         <div className="col-span-2 flex flex-col gap-2">
//           <label className="font-medium">Upload New Image (optional)</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//           {file && <p className="text-green-600">Selected: {file.name}</p>}
//         </div>

//         {/* AVAILABILITY */}
//         <div className="col-span-2 flex items-center gap-3">
//           <input
//             id="isAvailable"
//             type="checkbox"
//             checked={isAvailable}
//             onChange={(e) => setIsAvailable(e.target.checked)}
//             className="w-4 h-4"
//           />
//           <label htmlFor="isAvailable" className="font-medium">
//             Available
//           </label>
//         </div>

//         <button
//           type="submit"
//           disabled={uploading}
//           className="bg-green-600 text-white py-2 col-span-2 rounded"
//         >
//           {uploading ? "Updating..." : "Update Product"}
//         </button>
//       </form>
//     </div>
//   );
// }



// src/pages/admin/AdminUpdateProductPage.jsx
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import uploadFile from "../utils/mediaUpload.js";

export default function AdminUpdateProductPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state;

  const [productId, setProductId] = useState(product?.productId || "");
  const [name, setName] = useState(product?.name || "");
  const [altName, setAltName] = useState(product?.altName?.join(",") || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [labelledPrice, setLabelledPrice] = useState(product?.labelledPrice || "");
  const [category, setCategory] = useState(product?.category || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [stock, setStock] = useState(product?.stock || "");
  
  // NOW USING MULTIPLE IMAGES
  const [imageUrls, setImageUrls] = useState(product?.imageUrls || []);
  
  const [newFiles, setNewFiles] = useState([]); // multiple new images
  const [uploading, setUploading] = useState(false);
  
  const [isAvailable, setIsAvailable] = useState(
    typeof product?.isAvailable === "boolean" ? product.isAvailable : true
  );

  const token = localStorage.getItem("token");

  async function handleSubmit(e) {
    e.preventDefault();
    setUploading(true);

    try {
      let finalUrls = [...imageUrls]; // default → old images

      // If new files selected → upload and override
      if (newFiles.length > 0) {
        const uploadedUrls = [];
        for (const file of newFiles) {
          const url = await uploadFile(file);
          if (url) uploadedUrls.push(url);
        }

        if (uploadedUrls.length === 0) {
          alert("❌ Image upload failed.");
          setUploading(false);
          return;
        }

        finalUrls = uploadedUrls; // replace old images
      }

      const updatedData = {
        productId,
        name,
        altName: altName ? altName.split(",") : [],
        description,
        price,
        labelledPrice,
        category,
        brand,
        stock,
        isAvailable,
        imageUrls: finalUrls, // ARRAY ✔
      };

      await axios.put(
        `http://localhost:3000/api/products/${id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Product updated successfully!");
      navigate("/admin/products");

    } catch (error) {
      console.error("❌ Update error:", error);
      alert(error.response?.data?.message || "Failed to update product");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Update Product</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        {/* BASIC INPUTS — same as before */}
        <input className="border p-2" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
        <input className="border p-2" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border p-2" placeholder="Alternative Names (comma separated)" value={altName} onChange={(e) => setAltName(e.target.value)} />
        <input className="border p-2" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
        <input className="border p-2" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input className="border p-2" type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input className="border p-2" type="number" placeholder="Label Price" value={labelledPrice} onChange={(e) => setLabelledPrice(e.target.value)} />
        <input className="border p-2" type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />

        <textarea
          placeholder="Description"
          className="border p-2 col-span-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* CURRENT IMAGES */}
        <div className="col-span-2">
          <p className="font-medium mb-1">Current Images:</p>

          <div className="flex flex-wrap gap-4">
            {imageUrls?.length > 0 ? (
              imageUrls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={name}
                  className="w-24 h-24 object-cover border rounded"
                />
              ))
            ) : (
              <span className="text-gray-400">No images</span>
            )}
          </div>
        </div>

        {/* UPLOAD NEW FILES */}
        <div className="col-span-2 flex flex-col gap-2">
          <label className="font-medium">Upload New Images (optional)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setNewFiles([...e.target.files])}
          />
          {newFiles.length > 0 && (
            <p className="text-green-600">{newFiles.length} files selected</p>
          )}
        </div>

        {/* Availability */}
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

        <button
          type="submit"
          disabled={uploading}
          className="bg-green-600 text-white py-2 col-span-2 rounded"
        >
          {uploading ? "Updating..." : "Update Product"}
        </button>

      </form>
    </div>
  );
}
