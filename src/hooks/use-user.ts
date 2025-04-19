import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: UserResponse;
}

export const useUser = () => {
  const [dataUser, setDataUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get<ApiResponse>("/auth/profile");
        if (res.data.success) {
          setDataUser(res.data.data);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { dataUser, loading, error };
};
