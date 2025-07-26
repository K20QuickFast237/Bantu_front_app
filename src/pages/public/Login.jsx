import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Importation des icônes de Lucide React
import { Mail, Lock } from 'lucide-react';
// Importation de Formik
import { useFormik } from 'formik';
import { validationLoginSchema } from '../../schemas';

// Importation des images depuis le dossier assets
import personnesImage from '../../assets/personnes.png';
import appleLogo from '../../assets/apple.png';
import facebookLogo from '../../assets/facebook.png';
import PageWrapper from '../../components/public/PageWrapper';

// Nouveaux imports pour l'authentification
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Utilisation du contexte d'authentification

  const onSubmit = async (values, actions) => {
    try {
      // Appel à l'API via l'instance centralisée api
      const response = await api.post('/login', values);
      const { user, token } = response.data;

      // Mise à jour de l'état global de l'application via le contexte
      login(user, token);

      actions.resetForm();
      navigate('/WhatDoYouWantToDo');
    } catch (err) {
      console.error("Erreur de connexion:", err.response?.data || err.message);
      // TODO: Afficher une erreur à l'utilisateur (ex: avec un toast)
    } 
  };

  const {values, handleBlur, errors, isSubmitting, touched, handleChange, handleSubmit} = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationLoginSchema,
    onSubmit,
  });

  const handleGoogleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;

    try {
      // Envoi du token d'ID Google à votre backend
      const response = await api.post('/google-login', {
        JWT_ID_Token: idToken,
      });

      const { user, token } = response.data;

      // Mettre à jour le contexte d'authentification
      login(user, token);

      // Rediriger l'utilisateur
      navigate('/WhatDoYouWantToDo');
    } catch (error) {
      console.error("Erreur lors de la connexion avec Google:", error.response?.data || error.message);
    }
  };

  const handleGoogleError = () => {
    console.log('Login Failed');
  };

  return (
    <PageWrapper>

    
    <div className="min-h-screen flex bg-gray-50 font-sans"> 

      {/* Section gauche : Illustration avec l'image personnes.png */}
      {/* Cachée sur mobile, affichée en mode flex sur les écrans larges (lg) */}
      {/* Le fond de cette section est blanc pur. */}
      {/* Le bouton "Retour" est placé ici, en haut à gauche de ce panneau. */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-white p-8 relative"> 
        {/* Flèche de retour : Positionnée de manière absolue en haut à gauche de ce panneau BLANC. */}
        <div className="absolute top-8 left-8"> 
          <a href="/" className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200 group"> 
            {/* Icône de flèche SVG */}
            <svg className="h-5 w-5 mr-2 transform -rotate-180 group-hover:rotate-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
            Retour
          </a>
        </div>
        <img 
          src={personnesImage} 
          alt="Illustration de personnes travaillant ensemble" 
          className="max-w-full h-auto object-contain" 
        />
      </div>

      {/* Section droite : Formulaire de connexion */}
      {/* bg-blue-950 pour le fond bleu très profond. */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:py-24 lg:px-16 bg-blue-950"> 
        <div className="mx-auto w-full max-w-md">
          <div className="mt-10"> {/* Marge supérieure pour le contenu du formulaire */}
            {/* Titre "Se connecter" : Centré, texte blanc, très gras et grande taille. */}
            <h2 className="text-3xl font-extrabold text-white mb-8 text-center"> 
              Se connecter
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate autoComplete='off'>
              {/* Champ Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  {/* Icône de mail DANS un carré orange, icône blanche. */}
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
                    placeholder="Entrez votre adresse email"
                    onBlur={handleBlur}
                  />
                </div>
                {errors.email && touched.email && (
                  <div className="text-red-500">{errors.email}</div>
                )}
              </div>

              {/* Champ Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Mot de passe
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  {/* Icône de cadenas DANS un carré orange, icône blanche. */}
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
                    autoComplete="current-password"
                    required
                    className={"block w-full pl-12 pr-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white" + (errors.password && touched.password ? ' border-red-500 focus:ring-red-500 focus:border-red-500' : '')} 
                    placeholder="Entrez votre mot de passe"
                    onBlur={handleBlur}
                  />
                </div>
                {errors.password && touched.password && (
                  <div className="text-red-500">{errors.password}</div>
                )}
              </div>

              {/* Section "Se souvenir de moi" et "Mot de passe oublié ?" */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded" // Case à cocher orange
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Se souvenir de moi
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgotpassword1">
                    <span className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200 cursor-pointer">
                      Mot de passe oublié ?
                    </span>
                  </Link>
                </div>
              </div>

              {/* Bouton Se connecter : Grand bouton orange vif, texte blanc. */}
              <div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition-colors duration-200" 
                >
                  Se connecter
                </button>
              </div>
            </form>

            {/* Séparateur "Continuer avec" : Ligne horizontale fine avec texte au milieu. */}
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-700" /> 
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-blue-950 text-gray-400"> 
                  Continuer avec
                </span>
              </div>
            </div>

            {/* Boutons de connexion sociale : Disposés sur 3 colonnes sur les écrans moyens et plus. */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"> 
              {/* Google Button */}
              <div>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  width={'1/3'} // Pour que le bouton prenne toute la largeur de la colonne de la grille
                />
              </div>
              {/* Apple Button */}
              <div>
                <button className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-200 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <img src={appleLogo} alt="Apple logo" className="h-5 w-5 mr-3" /> 
                  Apple
                </button>
              </div>
              {/* Facebook Button */}
              <div>
                <button className="w-full inline-flex justify-center items-center py-2 px-4 border border-blue-700 rounded-md shadow-sm bg-blue-700 text-sm font-medium text-white hover:bg-blue-800 transition-colors duration-200">
                  <img src={facebookLogo} alt="Facebook logo" className="h-5 w-5 mr-3" /> 
                  Facebook
                </button>
              </div>
            </div>

            {/* Lien "Pas encore inscrit ?" : Texte gris clair, avec le lien "S'inscrire" en bleu-violet. */}
            {/* Le href "/register" est bien configuré. */}
            <p className="mt-6 text-center text-sm text-gray-400">
              Pas encore inscrit ?{' '}
              <a href="/register" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                S'inscrire
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

    </PageWrapper>
  );
};

export default Login;