import axios, { InternalAxiosRequestConfig } from "axios";

// Fungsi untuk mendapatkan nilai cookie berdasarkan nama
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

// Ambil base URL dari environment variable
const baseUrl = import.meta.env.VITE_API_SERVER_URL;

if (!baseUrl) {
  throw new Error("VITE_API_SERVER_URL is not defined in .env");
}

// Buat instance Axios dengan base URL
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tambahkan interceptor untuk menyertakan token dari cookie ke header Authorization
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getCookie("token"); // Ganti 'token' jika cookie berbeda
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
