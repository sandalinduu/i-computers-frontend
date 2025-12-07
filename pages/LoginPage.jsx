import { use, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // ✅ navigation hook

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "users/login",
        { email, password }
      );

      console.log("Backend Response:", response.data);

      const token = response.data.token;
      const userRole = response.data.role;

      // ✅ Save token & role to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);

      // ✅ Role Based Redirect
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Login failed! Check console for details.");
    }
  };

 const googlelogin = useGoogleLogin({
		onSuccess: (response) => { 
			
			axios.post(import.meta.env.VITE_BACKEND_URL + "users/google-login", {
				token: response.access_token,
			}).then((res) => {
				localStorage.setItem("token", res.data.token);
				if (res.data.role == "admin") {
					navigate("/admin");
				} else {
					navigate("/");
				}
				toast.success("Login successful!.");
				setIsLoading(false);
			}).catch((err) => {
				console.log(err);
			});
			setIsLoading(false);
		 },
		onError: () => { toast.error("Google Login Failed"); },
		onNonOAuthError: () => { toast.error("Google Login Failed"); },
	})

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
          className="bg-secondary text-white px-4 py-2 rounded-lg transition-transform duration-150 ease-in-out hover:brightness-90 hover:scale-105 hover:shadow-lg"
        >
          Login
        </button>
        <button
            type="button"
            onClick={googlelogin}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-transform duration-150 ease-in-out hover:bg-gray-100 hover:scale-105 hover:shadow-lg"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            Login with Google
          </button>
      </form>
    </div>
  );
}
