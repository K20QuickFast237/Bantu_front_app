import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Lock, Eye, EyeOff } from 'lucide-react'; // Ajout de Eye et EyeOff
import { useFormik } from 'formik';
import { validationRegisterSchema } from '../../schemas';
import PageWrapper from '../../components/public/PageWrapper';
import { ClipLoader } from "react-spinners";
import { registerUser } from '../../services/auth';
import toast from 'react-hot-toast';
import api from '@/services/api';
import { useTranslation } from 'react-i18next'; // Ajout

import Header from '../../components/public/Header';

import personnesImage from '../../assets/personnes.png';
import RegisterForm from '../../components/public/RegisterForm';
// import googleLogo from '../../assets/google.png';      
// import appleLogo from '../../assets/apple.png';        
// import facebookLogo from '../../assets/facebook.png';      

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // État pour le mot de passe
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // État pour la confirmation

  const onSubmit = async (values, actions) => {
    try {
      const response = await api.post('/register', values);
      console.log(response.data);
      toast.success(t('register.success') || "Inscription réussie !", {
        description: t('register.successDesc') || "Un code de verification vous a ete envoye par mail, verifier votre boite courriel",
        duration: 3000,
      });
      setTimeout(() => {
        actions.resetForm();
        navigate('/EmailVerification', { state: { email: values.email, token: response.data.token, signature: response.data.signature } });
      }, 1000);
    } catch (err) {
      toast.error(t('register.error') || "Erreur lors de l'inscription", {
        description: `${err.message}` || t('register.errorDesc') || "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        duration: 5000,
      });
    }
  };

  const { values, handleBlur, errors, isSubmitting, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      nom: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: validationRegisterSchema,
    onSubmit,
  });

  return (
    <PageWrapper>
      <Header />
      <div className="min-h-screen flex bg-gray-50 font-sans">
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-white px-8"> 
          <img
            src={personnesImage}
            alt="Illustration de personnes travaillant ensemble"
            className="max-w-full h-auto object-contain"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:py-24 lg:px-16 bg-blue-950">
          <div className="mx-auto w-full max-w-md">
            <div className="">
              <RegisterForm textColor="white" onSuccess={(values, data) => {
                // navigate to email verification after successful registration
                setTimeout(() => {
                  navigate('/EmailVerification', { state: { email: values.email, token: data.token, signature: data.signature } });
                }, 300);
              }} />

              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-blue-950 text-gray-400">
                    {t('register.continueWith')}
                  </span>
                </div>
              </div>

              {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <button className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-200 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <img src={googleLogo} alt="Google logo" className="h-5 w-5 mr-3" />
                    Google
                  </button>
                </div>
                <div>
                  <button className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-200 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <img src={appleLogo} alt="Apple logo" className="h-5 w-5 mr-3" />
                    Apple
                  </button>
                </div>
                <div>
                  <button className="w-full inline-flex justify-center items-center py-2 px-4 border border-blue-700 rounded-md shadow-sm bg-blue-700 text-sm font-medium text-white hover:bg-blue-800 transition-colors duration-200">
                    <img src={facebookLogo} alt="Facebook logo" className="h-5 w-5 mr-3" />
                    Facebook
                  </button>
                </div>
              </div> */}

              <p className="mt-6 text-center text-sm text-gray-400">
                {t('register.alreadyRegistered')} {' '}
                <a href="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                  {t('register.login')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Register;