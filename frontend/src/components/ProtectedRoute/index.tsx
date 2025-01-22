"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Usando alias @/
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
