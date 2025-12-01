// axios instance (no dummy calls)
// Replace REPLACE_WITH_BACKEND_URL with your backend base URL, e.g. http://localhost:8080
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export default api;
