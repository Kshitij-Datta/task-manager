import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { email, password };
      const response = await api.post("/auth/login", data);
      console.log("Server response: ", response.data);

      const user = await api.get("/auth/me");
      setUser(user.data.user);

      if (user.data.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 font-sans p-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/20 border border-white/30 p-10 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white drop-shadow-sm">
            Welcome Back
          </h1>
          <p className="text-purple-100 mt-2">Login to manage your tasks</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            required
            placeholder="Registered Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/80 placeholder-gray-600 text-gray-800 shadow-sm transition-all"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/80 placeholder-gray-600 text-gray-800 shadow-sm transition-all"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-3.5 bg-white/20 hover:bg-white/30 text-white font-bold text-lg rounded-xl border border-white/50 transition-all duration-200 shadow-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-purple-100 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-white hover:underline drop-shadow-sm"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
