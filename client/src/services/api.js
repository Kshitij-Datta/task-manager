import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL || "https://task-manager-m2sy.onrender.com";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default api;
