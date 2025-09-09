import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LinkedInCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userStr = params.get('user');
    const state = params.get('state');
    const error = params.get('error');
    const errorDescription = params.get('error_description');
    const storedState = localStorage.getItem('linkedin_oauth_state');

    // Vérifie l'erreur
    if (error) {
      console.error(`Erreur LinkedIn OAuth: ${error} - ${errorDescription}`);
      // TODO: Afficher un toast ou message à l'utilisateur
      navigate('/login');
      return;
    }

    // Vérifie le state CSRF
    if (state !== storedState) {
      console.error('Erreur CSRF: state mismatch');
      navigate('/login');
      return;
    }

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        localStorage.setItem('authToken', token);
        login(user, token);
        localStorage.removeItem('linkedin_oauth_state'); // Nettoie
        navigate('/WhatDoYouWantToDo');
      } catch (error) {
        console.error('Erreur lors du parsing user:', error);
        navigate('/login');
      }
    } else {
      console.error('Token ou user manquant dans les query params');
      navigate('/login');
    }
  }, [navigate, login]);

  return <div>Authentification en cours...</div>;
};

export default LinkedInCallback;