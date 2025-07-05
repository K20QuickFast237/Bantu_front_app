import api from './api';

export const registerUser = async (data) => {
  const response = await api.post('/register', data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post('/login', data);
  return response.data;
};

export const sendPasswordResetLink = async (email) => {
  const res = await api.post('/forgot-password', { email });
  return res.data;
};

