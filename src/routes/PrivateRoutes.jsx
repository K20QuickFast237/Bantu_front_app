import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import BantulinkLoader from "@/components/ui/BantulinkLoader";

const PrivateRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div><BantulinkLoader/></div>; 
  }

  // FIX: Si isAuthenticated true, affiche <Outlet /> même si user null (fallback dans composants)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;