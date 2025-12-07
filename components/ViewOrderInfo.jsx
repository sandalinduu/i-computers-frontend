



// // src/pages/admin/ViewOrderInfo.jsx
// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";

// export default function ViewOrderInfo() {
//   const { state } = useLocation();
//   const order = state;

//   const [status, setStatus] = useState(order.status);
//   const [notes, setNotes] = useState(order.notes);

//   const originalStatus = order.status;
//   const originalNotes = order.notes;

//   const [isChanged, setIsChanged] = useState(false);

//   // Track changes
//   useEffect(() => {
//     setIsChanged(status !== originalStatus || notes !== originalNotes);
//   }, [status, notes]);

//   const saveChanges = async () => {
//     try {
//       const token = localStorage.getItem("token"); // Add auth token if needed

//       const response = await fetch(
//         `http://localhost:3000/api/orders/${order.orderId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // optional, if backend requires auth
//           },
//           body: JSON.stringify({ status, notes }),
//         }
//       );

//       const result = await response.json();
//       alert(result.message);
//     } catch (error) {
//       console.error("Error updating order:", error);
//       alert("Failed to update order");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
//       <h2 className="text-2xl font-bold mb-4">Order: {order.orderId}</h2>

//       {/* Status */}
//       <div className="mb-4">
//         <label className="block font-medium mb-2 text-gray-700">Status</label>
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="pending">Pending</option>
//           <option value="processing">Processing</option>
//           <option value="shipped">Shipped</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//       </div>

//       {/* Notes */}
//       <div className="mb-4">
//         <label className="block font-medium mb-2 text-gray-700">Additional Notes</label>
//         <textarea
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//           rows={4}
//           className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Save Changes Button */}
//       {isChanged && (
//         <button
//           onClick={saveChanges}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded shadow transition"
//         >
//           Save Changes
//         </button>
//       )}
//     </div>
//   );
// }



import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function ViewOrderInfo() {
    const { state } = useLocation();
    const order = state;

    const [status, setStatus] = useState(order.status);
    const [notes, setNotes] = useState(order.notes || "");
    const [isChanged, setIsChanged] = useState(false);

    const originalStatus = order.status;
    const originalNotes = order.notes || "";

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        checkIfChanged(newStatus, notes);
    };

    const handleNotesChange = (e) => {
        const newNotes = e.target.value;
        setNotes(newNotes);
        checkIfChanged(status, newNotes);
    };

    const checkIfChanged = (newStatus, newNotes) => {
        if (newStatus !== originalStatus || newNotes !== originalNotes) {
            setIsChanged(true);
        } else {
            setIsChanged(false);
        }
    };

    const saveChanges = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(
                `http://localhost:3000/api/orders/${order.orderId}`,
                { status, notes },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            alert("Order updated successfully!");
            setIsChanged(false);
        } catch (error) {
            console.error("Error updating order:", error);
            alert("Failed to update order");
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Order Details</h1>

            {/* CUSTOMER DETAILS */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-3">Customer Information</h2>
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Email:</strong> {order.email}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Address:</strong> {order.address}</p>
            </div>

            {/* ORDER ITEMS */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-3">Ordered Items</h2>

                <table className="w-full border-collapse">
    <thead>
        <tr className="bg-gray-100">
            <th className="border p-2">Image</th>
            <th className="border p-2">Item</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Total</th>
        </tr>
    </thead>

    <tbody>
        {order.items.map((item, index) => (
            <tr key={index} className="text-center">
                
                {/* PRODUCT IMAGE */}
                <td className="border p-2">
                    <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                    />
                </td>

                <td className="border p-2">{item.name}</td>
                <td className="border p-2">Rs {item.price}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">Rs {item.price * item.quantity}</td>
            </tr>
        ))}
    </tbody>
</table>

                <p className="text-right font-bold mt-4 text-lg">
                    Total: Rs {order.total}
                </p>
            </div>

            {/* STATUS + NOTES */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-3">Order Management</h2>

                <label className="font-bold">Status</label>
                <select
                    value={status}
                    onChange={handleStatusChange}
                    className="block w-full border p-2 rounded mb-4"
                >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                <label className="font-bold">Admin Notes</label>
                <textarea
                    value={notes}
                    onChange={handleNotesChange}
                    className="block w-full border p-2 rounded h-24"
                ></textarea>

                {isChanged && (
                    <button
                        onClick={saveChanges}
                        className="mt-4 bg-blue-600 text-white px-5 py-2 rounded"
                    >
                        Save Changes
                    </button>
                )}
            </div>
        </div>
    );
}
