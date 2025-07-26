import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));

  useEffect(() => {
    if (token && !user) {
      // Idéalement, vous devriez avoir une route /me pour récupérer les infos utilisateur
      // En attendant, on peut décoder le token ou stocker les infos user au login.
      // Pour cet exemple, nous supposerons que les infos user sont stockées au login.
    }
  }, [token, user]);

  const login = (userData, authToken) => {
    localStorage.setItem('authToken', authToken);
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setToken(null);
  };

  const value = { user, token, login, logout, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
