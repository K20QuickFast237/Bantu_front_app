import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Lock } from 'lucide-react';
import { useFormik } from 'formik';
import { validationRegisterSchema } from '../../schemas';
import PageWrapper from '../../components/public/PageWrapper';
import { ClipLoader } from "react-spinners";
import { registerUser } from '../../services/auth';
import toast from 'react-hot-toast';
import api from '@/services/api';
import { useTranslation } from 'react-i18next'; // Ajout

import Header from '../../components/public/Header';
import Footer from '../../components/public/Footer';

import personnesImage from '../../assets/personnes.png';
import googleLogo from '../../assets/google.png';      
import appleLogo from '../../assets/apple.png';        
import facebookLogo from '../../assets/facebook.png';      

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      <div className="min-h-screen flex bg-gray-50 font-sans py-20 md:pt-24">
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
              <h2 className="text-3xl font-extrabold text-white mb-8 text-center">
                {t('register.title')}
              </h2>

              <form className="space-y-6" onSubmit={handleSubmit} noValidate autoComplete='off'>
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-300">
                    {t('register.name')}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                      <div className="bg-orange-500 rounded-md p-1.5 flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-white" aria-hidden="true" />
                      </div>
                    </div>
                    <input
                      id="nom"
                      name="nom"
                      value={values.nom}
                      onChange={handleChange}
                      type="text"
                      autoComplete="family-name"
                      required
                      className={"block w-full pl-12 pr-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white" + (errors.nom && touched.nom ? ' border-red-500 focus:ring-red-500 focus:border-red-500' : '')}
                      placeholder={t('register.namePlaceholder') || "Entrez votre nom"}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.nom && touched.nom && <div className="text-red-500">{errors.nom}</div>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    {t('register.email')}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                      <div className="bg-orange-500 rounded-md p-1.5 flex items-center justify-center">
                        <Mail className="h-4 w-4 text-white" aria-hidden="true" />
                      </div>
                    </div>
                    <input
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      type="email"
                      autoComplete="email"
                      required
                      className={"block w-full pl-12 pr-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white" + (errors.email && touched.email ? ' border-red-500 focus:ring-red-500 focus:border-red-500' : '')}
                      placeholder={t('register.emailPlaceholder') || "Entrez votre adresse email"}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    {t('register.password')}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                      <div className="bg-orange-500 rounded-md p-1.5 flex items-center justify-center">
                        <Lock className="h-4 w-4 text-white" aria-hidden="true" />
                      </div>
                    </div>
                    <input
                      id="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      type="password"
                      autoComplete="new-password"
                      required
                      className={"block w-full pl-12 pr-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white" + (errors.password && touched.password ? ' border-red-500 focus:ring-red-500 focus:border-red-500' : '')}
                      placeholder={t('register.passwordPlaceholder') || "Entrez votre mot de passe"}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.password && touched.password && <div className="text-red-500">{errors.password}</div>}
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">
                    {t('register.confirmPassword')}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                      <div className="bg-orange-500 rounded-md p-1.5 flex items-center justify-center">
                        <Lock className="h-4 w-4 text-white" aria-hidden="true" />
                      </div>
                    </div>
                    <input
                      id="password_confirmation"
                      name="password_confirmation"
                      value={values.password_confirmation}
                      onChange={handleChange}
                      type="password"
                      autoComplete="new-password"
                      required
                      className={"block w-full pl-12 pr-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white" + (errors.password_confirmation && touched.password_confirmation ? ' border-red-500 focus:ring-red-500 focus:border-red-500 ' : '')}
                      placeholder={t('register.confirmPasswordPlaceholder') || "Confirmez votre mot de passe"}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.password_confirmation && touched.password_confirmation && <div className="text-red-500">{errors.password_confirmation}</div>}
                </div>

                <div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition-colors duration-200"
                  >
                    {isSubmitting ? <ClipLoader size={22} color="#fff" /> : t('register.register')}
                  </button>
                </div>
              </form>

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

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
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
              </div>

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
      <Footer />
    </PageWrapper>
  );
};

export default Register;