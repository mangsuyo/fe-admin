import { Navigate } from "react-router-dom";

import { JSX } from "react";
import { useAuthStore } from "../store/useAuthStore";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
