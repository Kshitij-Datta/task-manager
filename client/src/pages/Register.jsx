import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = { name, email, password };
      const response = await api.post("/auth/register", data);
      console.log("Server response: ", response.data);

      const user = await api.get("/auth/me");
      setUser(user.data.user);

      if (user.data.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Registration failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 font-sans p-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/20 border border-white/30 p-10 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white drop-shadow-sm">
            Create Account
          </h1>
          <p className="text-cyan-100 mt-2">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/80 placeholder-gray-600 text-gray-800 shadow-sm transition-all"
          />
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/80 placeholder-gray-600 text-gray-800 shadow-sm transition-all"
          />
          <input
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/50 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/80 placeholder-gray-600 text-gray-800 shadow-sm transition-all"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-3.5 bg-white/20 hover:bg-white/30 text-white font-bold text-lg rounded-xl border border-white/50 transition-all duration-200 shadow-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-cyan-100 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-white hover:underline drop-shadow-sm"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
