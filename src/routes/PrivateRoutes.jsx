import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Optionnel : Affichez un spinner ou un écran de chargement pendant la vérification
    return <div>Chargement...</div>; 
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;