import axios from "axios";

const BASE_URL = "http://localhost:3001/api/";
const api = axios.create({
  baseURL: BASE_URL,
});
api.interceptors.request.use(
  (config) => {
    const { headers } = config;
    const token = localStorage.getItem("token");
    if (token) {
      headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
export default api;
