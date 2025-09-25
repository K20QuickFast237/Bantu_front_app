import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // FIX : État pour token exposé
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction de login qui reçoit le token
  const login = (userData, tokenParam) => { // Renommé pour clarté
    sessionStorage.setItem('token', tokenParam);
    sessionStorage.setItem('user', JSON.stringify(userData)); // Persiste user data localement
    api.defaults.headers.common['Authorization'] = `Bearer ${tokenParam}`;
    setToken(tokenParam); // FIX : Set token en état
    setUser(userData);
    setIsAuthenticated(true);
    console.log('Login réussi - Token set:', tokenParam ? 'Oui' : 'Non', 'User:', userData);
  }

  // Fonction pour déconnecter l'utilisateur
  const logout = async () => {
    try {
      await api.post('/logout');
    } catch(error) {
      console.error("Erreur lors de la déconnexion API, mais déconnexion locale quand même.", error);
    } finally {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user'); // Nettoie user data
      delete api.defaults.headers.common['Authorization'];
      setToken(null); // FIX : Reset token en état
      setUser(null);
      setIsAuthenticated(false);
      console.log('Logout exécuté - Token reset');
    }
  }

  // Effet pour vérifier l'authentification au chargement de l'app
  useEffect(() => {
    const verifyAuth = async (retryCount = 0) => {
      const storedToken = sessionStorage.getItem('token');
      console.log('Token trouvé au chargement:', storedToken ? storedToken.substring(0, 20) + '...' : 'Aucun');
      if (storedToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        setToken(storedToken); // FIX : Set token en état dès le début
        try {
          // Fetch /user pour données fraîches
          const response = await api.get('/user');
          // Unwrap la structure { data: { ... } } du backend
          const apiUser = response.data.data || response.data;
          console.log('Réponse GET /user réussie (unwrapped):', apiUser);

          const userPayload = {
            nom: apiUser.nom,
            prenom: apiUser.prenom,
            email: apiUser.email,
            role: apiUser.role
          };

          sessionStorage.setItem('user', JSON.stringify(userPayload)); // Mise à jour locale
          setUser(userPayload);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Échec de la vérification du token (tentative " + (retryCount + 1) + "):", error.response?.status, error.response?.data?.message || error.message);
          
          if (error.response?.status === 401) {
            // Token invalide → logout
            logout();
          } else if (retryCount < 1) {
            // Retry 1x pour erreurs non-401 (ex. réseau temporaire)
            console.log('Retry GET /user...');
            setTimeout(() => verifyAuth(retryCount + 1), 1000);
            return;
          } else {
            // Fallback sur user data locale si fetch échoue
            const storedUser = sessionStorage.getItem('user');
            if (storedUser) {
              const userPayload = JSON.parse(storedUser);
              console.log('Fallback sur user data locale:', userPayload);
              setUser(userPayload);
              setIsAuthenticated(true);
            } else {
              console.warn('Aucune user data locale, isAuthenticated=false');
              setIsAuthenticated(false);
            }
          }
        }
      } else {
        console.log('Pas de token, isAuthenticated reste false');
      }
      setIsLoading(false);
    };

    verifyAuth();
  }, []);

  const value = {
    user,
    token, // FIX : Exposé pour les composants
    isAuthenticated,
    isLoading,
    login, 
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};