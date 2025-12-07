// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminOrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   const token = localStorage.getItem("token"); // get token from login

//   axios
//     .get("http://localhost:3000/api/orders", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((res) => {
//       setOrders(res.data);
//       setLoading(false);
//     })
//     .catch((err) => {
//       console.error("Error loading orders:", err);
//       setLoading(false);
//     });
// }, []);

//   if (loading) return <p className="text-center p-10">Loading orders...</p>;
  

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">All Orders</h1>

//       <div className="space-y-4">
//         {orders.map((order) => (
//           <div
//             key={order.orderId}
//             className="border rounded-lg p-4 shadow-sm bg-white"
//           >
//             {/* Header */}
//             <div className="flex justify-between items-center">
//               <h2 className="font-semibold text-lg">Order: {order.orderId}</h2>
//               <span
//                 className={`px-3 py-1 rounded text-white ${
//                   order.status === "pending"
//                     ? "bg-yellow-500"
//                     : order.status === "completed"
//                     ? "bg-green-600"
//                     : "bg-red-600"
//                 }`}
//               >
//                 {order.status}
//               </span>
//             </div>

//             {/* Customer Info */}
//             <p className="text-sm">Name: {order.name}</p>
//             <p className="text-sm">Email: {order.email}</p>
//             <p className="text-sm">Phone: {order.phone}</p>
//             <p className="text-sm mb-2">Address: {order.address}</p>

//             {/* Items */}
//             <div className="mt-2">
//               <h3 className="font-medium mb-1">Items:</h3>
//               <ul className="space-y-2">
//                 {order.items.map((item, index) => (
//                   <li
//                     key={index}
//                     className="border p-2 rounded flex items-center gap-3"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-12 h-12 object-cover rounded"
//                     />
//                     <div>
//                       <p className="font-medium">{item.name}</p>
//                       <p className="text-sm">
//                         {item.quantity} × Rs {item.price}
//                       </p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Total */}
//             <p className="mt-3 font-bold text-lg">Total: Rs {order.total}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center p-10">Loading orders...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-sm rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Customer</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Total</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="hover:bg-gray-50">
                <td className="p-3 border">{order.orderId}</td>
                <td className="p-3 border">{order.name}</td>
                <td className="p-3 border">{order.email}</td>
                <td className="p-3 border">{order.phone}</td>
                <td className="p-3 border font-semibold">Rs {order.total}</td>
                <td className="p-3 border">
                  <span
                    className={`px-3 py-1 rounded text-white ${
                      order.status === "pending"
                        ? "bg-yellow-500"
                        : order.status === "completed"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3 border text-center">
                  <button onClick={() => navigate("/admin/order-info", { state: order })}
                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
                     View More

                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
