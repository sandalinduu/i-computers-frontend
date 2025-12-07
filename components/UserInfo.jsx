// import { Link } from "react-router-dom";

// export default function UserCorner() {
//   const token = localStorage.getItem("token");

//   // If NOT logged in → show Login + Register
//   if (!token) {
//     return (
//       <div className="flex items-center gap-3">
//         <Link
//           to="/login"
//           className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
//         >
//           Login
//         </Link>

//         <Link
//           to="/register"
//           className="px-3 py-1 bg-gray-700 text-white rounded-md text-sm"
//         >
//           Register
//         </Link>
//       </div>
//     );
//   }

//   // If logged in → decode name from token
//   let firstname = "";

//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     firstname = payload.name || "User";
//   } catch (e) {
//     firstname = "User";
//   }
//   return (
//     <div className="flex items-center gap-2">
//       <img
//         src="/profile.jpg"
//         alt="User"
//         className="w-8 h-8 rounded-full border"
//       />

//       <p className="text-sm font-semibold">Hello, {firstname}</p>
      
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserInfo() {
  const [user, setUser] = useState(null); // store user details
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return; // no token → no need to call backend

    // Fetch user details
    fetch("http://localhost:3000/api/users", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data); // save user info
        console.log("Fetched user:", data); // show full user in console
      })
      .catch(err => console.log("User fetch error:", err));
  }, [token]);

  // ------------------
  // If NOT LOGGED IN
  // ------------------
  if (!token) {
    return (
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="px-3 py-1 bg-blue-600 text-white rounded-md"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-3 py-1 bg-gray-700 text-white rounded-md"
        >
          Register
        </Link>
      </div>
    );
  }

  // ------------------
  // WHILE WAITING FOR USER DATA
  // ------------------
  if (!user) {
    return (
      <div className="text-gray-600">Loading...</div>
    );
  }

  // ------------------
  // LOGGED IN (show profile)
  // ------------------
  return (
    <div className="flex items-center gap-3">
      <img
        src={user.profileImage || "defaul,jpg.webp"} // fallback image
        alt="profile"
        className="w-10 h-10 rounded-full object-cover"
      />
      <p className="text-gray-800 font-medium">
        Hello, {user.firstname}
      </p>
    </div>
  );
}
