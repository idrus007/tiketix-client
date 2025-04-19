import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthRedirect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hasShownToast = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token");
    const role = searchParams.get("role");
    const message = searchParams.get("message");

    if (token && role) {
      // Simpan token ke cookie (expires dalam 1 hari)
      document.cookie = `token=${token}; path=/; max-age=86400;`;
      document.cookie = `role=${role}; path=/; max-age=86400;`;

      // Tampilkan toast kalau ada message
      if (message && !hasShownToast.current) {
        hasShownToast.current = true;
        toast.success(decodeURIComponent(message), {
          duration: 3000,
          position: "top-right",
        });
      }

      // Arahkan ke dashboard sesuai role
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      navigate("/auth/sign-in");
    }
  }, [navigate, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center text-center">
      <p>Redirecting...</p>
    </div>
  );
};

export default OAuthRedirect;
