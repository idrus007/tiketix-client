import { Outlet, Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

// Fungsi untuk mendapatkan cookie
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

// Middleware Proteksi Rute
export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();
  const token = getCookie("token");
  const role = getCookie("role");

  // Jika tidak ada token, redirect ke login
  if (!token) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  // Jika role sesuai dengan yang diizinkan, tampilkan halaman
  if (role && allowedRoles.includes(role)) {
    return <Outlet />;
  }

  // Jika role tidak diizinkan, redirect sesuai role
  if (role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (role === "user") {
    return <Navigate to="/dashboard" replace />;
  }

  // Jika role tidak dikenali, tetap di halaman sekarang
  return <Navigate to={location.pathname} replace />;
};
