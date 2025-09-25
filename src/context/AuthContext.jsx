import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialement false
  const [isLoading, setIsLoading] = useState(true); // Nouvel état de chargement

  // Fonction de login qui recoit le token
  const login = (userData, token) => {
    sessionStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
    setIsAuthenticated(true);
    console.log('Login réussi:', userData); // Debug
  }

  // Fonction pour deconnecter l'utilisateur
  const logout = async () => {
    try {
      await api.post('/logout');
    } catch(error) {
      console.error("Erreur lors de la déconnexion API, mais déconnexion locale quand même.", error);
    } finally {
      sessionStorage.removeItem('token'); // Supprimer le token
      delete api.defaults.headers.common['Authorization']; // Supprimer l'en-tête Axios
      setUser(null);
      setIsAuthenticated(false);
      console.log('Logout exécuté'); // Debug
    }
  }

    // Effet pour vérifier l'authentification au chargement de l'app
   useEffect(() => {
    const verifyAuth = async () => {
      const token = sessionStorage.getItem('token');
      console.log('Token trouvé au chargement:', token ? token.substring(0, 20) + '...' : 'Aucun'); // Debug
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          // Utilisons la route /session/user qui renvoie une structure de données complète et cohérente.
          const response = await api.get('/user');
          const apiUser = response.data;
          console.log('Réponse GET /user réussie:', apiUser); // Debug

          // Préparer les objets pour le contexte à partir de la réponse
          const userPayload = {
            nom: apiUser.nom,
            prenom: apiUser.prenom,
            email: apiUser.email,
            role: apiUser.role
          };

          // Mettre à jour l'état du contexte
          setUser(userPayload);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Échec de la vérification du token:", error.response?.status, error.response?.data?.message || error.message); // Debug détaillé
          // FIX: Ne pas auto-logout sur toutes erreurs ; seulement si 401 (Unauthorized)
          if (error.response?.status === 401) {
            logout(); // Token invalide → logout
          } else {
            // Autres erreurs (ex. 500) : Garde isAuthenticated=true mais log
            console.warn('Erreur non critique sur /user, continuation sans user data');
            setIsAuthenticated(true); // Permet d'afficher la page avec fallback
          }
        }
      } else {
        console.log('Pas de token, isAuthenticated reste false'); // Debug
      }
      setIsLoading(false);
    };

    verifyAuth();
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading, // Exposer l'état de chargement
    login, 
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};