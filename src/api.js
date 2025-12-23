import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8001";

const api = axios.create({
  baseURL,
});

// Attach Authorization header from localStorage token (if present)
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore (e.g., SSR or restricted environment)
  }
  return config;
});

export default api;
