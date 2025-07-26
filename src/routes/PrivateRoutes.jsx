import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = () => {
  // On récupère le token depuis notre contexte d'authentification via le hook.
  const { token } = useAuth();

  // C'est la vérification la plus simple et la plus fiable.
  // `!!token` convertit la chaîne de caractères (ou null) en un booléen.
  const isAuthenticated = !!token;

  // Si l'utilisateur est authentifié, on affiche le contenu de la route enfant (la page protégée).
  // Si l'utilisateur n'est pas authentifié, on le redirige vers la page de connexion.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
