import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      alert("Please fill all fields!");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "users/register",
        { firstname, lastname, email, password }
      );

      console.log("Registration Response:", response.data);

      alert(response.data.message || "Registered successfully!");

      // Redirect to login page after registration
      navigate("/login");

    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Registration failed! Check console for details.");
    }
  };

  return (
    <div className="w-screen h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex justify-center items-center">
      <form
        onSubmit={handleRegister}
        className="backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[400px] flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>

        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />

        <button
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded-lg transition-transform duration-150 ease-in-out hover:brightness-90 hover:scale-105 hover:shadow-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
}
