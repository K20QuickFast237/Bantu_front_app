import { createContext, useState, useEffect, useContext } from 'react';
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
    }
  }

    // Effet pour vérifier l'authentification au chargement de l'app
   useEffect(() => {
    const verifyAuth = async () => {
      const token = sessionStorage.getItem('token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          // Utilisons la route /session/user qui renvoie une structure de données complète et cohérente.
          const response = await api.get('/user');
          const apiUser = response.data;

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
          console.error("Échec de la vérification du token, déconnexion.", error);
          logout(); // La fonction logout nettoie le token et l'état
        }
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
