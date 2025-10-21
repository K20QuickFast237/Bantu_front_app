import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { toast } from 'sonner';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // FIX : État pour token exposé
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction de login qui reçoit le token
  const login = (userData, token) => { // Renommé pour clarté
    sessionStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
    setIsAuthenticated(true);
  }

  // Fonction pour déconnecter l'utilisateur
  const logout = async () => {
    try {
      await api.post('/logout');
      toast.success('Vous avez été déconnecté avec succès.');
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
    const verifyAuth = async (retryCount = 0) => {
      const storedToken = sessionStorage.getItem('token');
      if (storedToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        setToken(storedToken); // FIX : Set token en état dès le début
        try {
          // Fetch /user pour données fraîches
          const response = await api.get('/user');
          console.log(response);
          const apiUser = response.data.data || response.data;
          console.log(response.data.data.profilCompleted);
          setUser(apiUser);
          setIsAuthenticated(true);
        } catch (error) {
          logout();
        }
      }
      setIsLoading(false);
    };

    verifyAuth();
  }, []);

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    // Exposition directe pour plus de praticité
    particulier: user?.particulier || null,
    professionnel: user?.professionnel || null,
    profilCompleted: user?.profilCompleted || false,
    role: user?.role || null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
