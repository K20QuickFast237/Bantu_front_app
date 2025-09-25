import React, { useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useFormik } from 'formik';
import { validationLoginSchema } from '../../schemas';

// Importation des images depuis le dossier assets
import personnesImage from '../../assets/personnes.png';
import facebookLogo from '../../assets/facebook.png';
import PageWrapper from '../../components/public/PageWrapper';

// Nouveaux imports pour l'authentification
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Utilisation du contexte d'authentification

    const onSubmit = async (values, actions) => {
        try {
            // Appel à l'API via l'instance centralisée api
            const response = await api.post('/login', values);
            const { user: apiUser, token } = response.data;

            const userPayload = {
                nom: apiUser.nom,
                prenom: apiUser.prenom,
                email: apiUser.email,
                role: apiUser.role
            }
            
            toast.success("Connexion réussie !", {
                duration: 3000,
            });
            setTimeout(() => {
                login(userPayload, token);
                actions.resetForm();
                navigate('/WhatDoYouWantToDo', { replace: true});
            }, 1000);
        } catch (err) {
            toast.error("Erreur de connexion", {
                description: `${err.response.data.message}` || "Email ou mot de passe incorrect. Veuillez réessayer.",
                duration: 5000,
            });
        }
    };

    const { values, handleBlur, errors, isSubmitting, touched, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationLoginSchema,
        onSubmit,
    });

    const handleLinkedInLogin = async () => {
        const backendLinkedInUrl = `${api.defaults.baseURL}/linkedin-login`;
        window.location.href = backendLinkedInUrl;
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        const idToken = credentialResponse.credential;

        try {
            // Envoi du token d'ID Google à votre backend
            const response = await api.post('/google-login', {
                JWT_ID_Token: idToken,
            });

            console.log(response.data);
            const { user: apiUser, token } = response.data;

            const userPayload = {
                nom: apiUser.nom,
                prenom: apiUser.prenom,
                email: apiUser.email,
                role: apiUser.role
            }

             toast.success("Connexion réussie !", {
                duration: 3000,
            });
            setTimeout(() => {
                login(userPayload, token);
                navigate('/WhatDoYouWantToDo', { replace: true});
            }, 1000);
        } catch (error) {
            toast.error("Erreur de connexion", {
                description: `${error.response?.data?.message}` || "Une erreur est survenue lors de la connexion avec Google.",
                duration: 5000,
            });        
        }
    };

    const handleGoogleError = () => {
        console.log('Login Failed');
    };

    return (
        <PageWrapper>
            <div className="min-h-screen flex bg-gray-50 font-sans">

                {/* Section gauche : Illustration avec l'image personnes.png */}
                <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-white p-8 relative">
                    <div className="absolute top-8 left-8">
                        <a href="/" className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200 group">
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
                <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:py-24 lg:px-16 bg-blue-950">
                    <div className="mx-auto w-full max-w-md">
                        <div className="mt-10">
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
                                            className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
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

                                {/* Bouton Se connecter */}
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

                            {/* Séparateur "Continuer avec" */}
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

                            {/* Boutons de connexion sociale */}
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {/* Google Button */}
                                <div>
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={handleGoogleError}
                                    />
                                </div>
                                {/* LinkedIn Button (anciennement Apple) */}
                                 <div>
                                    <button onClick={handleLinkedInLogin} className="w-full cursor-pointer inline-flex justify-center items-center py-2 px-4 border border-blue-600 rounded-md shadow-sm bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-colors duration-200">
                                        <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.761 0-.971.784-1.76 1.75-1.76s1.75.789 1.75 1.76c0 .971-.784 1.761-1.75 1.761zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.767 7 2.476v6.759z" />
                                        </svg>
                                        LinkedIn
                                    </button>
                                </div>                                
                                {/* Facebook Button */}
                                <div>
                                    <button className="w-full cursor-pointer inline-flex justify-center items-center py-2 px-4 border border-blue-700 rounded-md shadow-sm bg-blue-700 text-sm font-medium text-white hover:bg-blue-800 transition-colors duration-200">
                                        <img src={facebookLogo} alt="Facebook logo" className="h-5 w-5 mr-3" />
                                        Facebook
                                    </button>
                                </div>
                            </div>

                            {/* Lien "Pas encore inscrit ?" */}
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