import { useEffect, type ReactNode } from "react";
import { api } from "../api";
import type { Response } from "../types/response.type";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        await api.get<Response>("/api/auth/me");
      } catch (err) {
        navigate("/login");
      }
    };
    fetch();
  }, []);
  return children;
};

export default ProtectedRoute;
