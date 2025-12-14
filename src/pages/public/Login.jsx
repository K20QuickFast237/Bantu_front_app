import React, { useState } from 'react'; // Import de useState
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'; // Ajout de Eye et EyeOff
import LoginForm from '../../components/public/LoginForm';
import api from '../../services/api';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next'; // Ajout

// Imports images et composants inchangés
import personnesImage from '../../assets/personnes.png';
import facebookLogo from '../../assets/facebook.png';
import PageWrapper from '../../components/public/PageWrapper';
import Header from '../../components/public/Header';
import Footer from '../../components/public/Footer';

const Login = () => {
  const { t } = useTranslation(); // Hook i18n
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // État pour le mot de passe
  const location = useLocation();
  const from = location.state?.from?.pathname || '/WhatDoYouWantToDo';

  // Login handled in `LoginForm` component

  return (
    <PageWrapper>
      <Header />
      <div className="min-h-screen flex bg-gray-50 font-sans">
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-white p-8 relative">
          <img src={personnesImage} alt="Illustration de personnes travaillant ensemble" className="max-w-full h-auto object-contain" />
        </div>

        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:py-24 lg:px-16 bg-blue-950">
          <div className="mx-auto w-full max-w-md">
            <div className="mt-10">
              <div className="mt-10">
                <div className="mx-auto w-full max-w-md">
                  <LoginForm 
                  onSuccess={(user, token) => {
                    sessionStorage.setItem('token', token);
                    setTimeout(() => navigate(from, { replace: true }), 300);
                  }}
                  textColor='white' />
                </div>
                <p className="mt-6 text-center text-sm text-gray-400">
                  {t('login.notRegistered')} {' '}
                  <a href="/register" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                    {t('login.signUp')}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;