import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

const PrivateRoutes = () => {
  const { isAuthenticated } = useContext(AuthProvider);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
