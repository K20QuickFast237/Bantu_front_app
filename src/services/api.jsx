import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vps-8d77be49.vps.ovh.net/api',
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token'); // FIX: Utilise sessionStorage et 'token' comme dans AuthContext
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Token ajouté aux headers:', token.substring(0, 20) + '...'); // Debug: Vérifie si token set
  } else {
    console.log('Aucun token trouvé dans sessionStorage'); // Debug
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;