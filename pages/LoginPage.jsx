


import { useState } from "react";

export default function Login() {
  // Step 1: Create state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Step 2: Create login function
  const handleLogin = (e) => {
    e.preventDefault(); // stop page refresh

    console.log( email,password);
    

    // Step 3: You can send these values to your backend later
    if (email === "" || password === "") {
      alert("Please fill all fields!");
    } else {
      alert(`Logged in with ${email}`);
      // later you can call your API here
      // example: axios.post('/api/login', { email, password })
    }
  };

  // Step 4: Return the UI
  return (
    <div className="w-screen h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[400px] flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />

        <button
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded-lg  hover:bg-transparent border-accent"
        >
          Login
        </button>
      </form>
    </div>
  );
}
