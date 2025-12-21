import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8001";

const api = axios.create({
  baseURL,
});

export default api;
