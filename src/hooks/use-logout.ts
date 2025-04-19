// hooks/useLogout.ts
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate(); // Menggunakan useNavigate untuk pengalihan

  const logout = () => {
    // Hapus cookie token
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Hapus cookie role
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Redirect ke halaman login setelah logout
    navigate("/");
  };

  return { logout };
};
