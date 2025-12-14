import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useFormik } from 'formik';
import { validationLoginSchema } from '@/schemas';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/hooks/useAuth';
import { ClipLoader } from 'react-spinners';
import api from '@/services/api';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export default function LoginForm({ onSuccess, textColor = 'black' }) {
    const { t } = useTranslation();
    const { refreshAuth } = useAuth();
    const isWhite = textColor === 'white';
    const [showPassword, setShowPassword] = useState(false);

    const handleLoginSuccess = async (apiUser, token, formActions = null) => {
        toast.success(t('login.success') || "Connexion réussie !", { duration: 3000 });
        sessionStorage.setItem('token', token);
        await refreshAuth();
        if (formActions) formActions.resetForm();
        if (typeof onSuccess === 'function') onSuccess(apiUser, token);
    };

    const onSubmit = async (values, actions) => {
        try {
            const response = await api.post('/login', values);
            const { user: apiUser, token } = response.data;
            await handleLoginSuccess(apiUser, token, actions);
        } catch (err) {
            toast.error(t('login.error') || "Erreur de connexion", {
                description: `${err.response?.data?.message}` || t('login.invalid') || "Email ou mot de passe incorrect. Veuillez réessayer.",
                duration: 5000,
            });
        }
    };

    const { values, handleBlur, errors, isSubmitting, touched, handleChange, handleSubmit } = useFormik({
        initialValues: { email: '', password: '' },
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
            const response = await api.post('/google-login', { JWT_ID_Token: idToken });
            const { user: apiUser, token } = response.data;
            await handleLoginSuccess(apiUser, token);
        } catch (error) {
            toast.error(t('login.error'), {
                description: `${error.response?.data?.message}` || t('login.googleError') || "Une erreur est survenue lors de la connexion avec Google.",
                duration: 3000,
            });
        }
    };

    const handleGoogleError = () => {
        toast.error(t('login.googleError'), { duration: 3000 });
    };

    return (
        <div>
            <h2 className={`text-2xl font-extrabold mb-6 ${isWhite ? 'text-white' : 'text-gray-900'}`}>{t('login.title')}</h2>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate autoComplete="off">
                <div>
                    <label htmlFor="email" className={`block text-sm font-medium ${isWhite ? 'text-white' : 'text-gray-700'}`}>{t('login.email')}</label>
                    <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className={`h-5 w-5 ${isWhite ? 'text-gray-400' : 'text-gray-400'}`} aria-hidden="true" />
                        </div>
                        <input
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            type="email"
                            autoComplete="email"
                            required
                            className={`block w-full pl-10 pr-3 py-2.5 border bg-white ${isWhite ? 'text-gray-900 placeholder-gray-400' : 'text-gray-900 placeholder-gray-400'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder={t('login.emailPlaceholder') || "Entrez votre adresse email"}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
                </div>

                <div>
                    <label htmlFor="password" className={`block text-sm font-medium ${isWhite ? 'text-white' : 'text-gray-700'}`}>{t('login.password')}</label>
                    <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className={`h-5 w-5 ${isWhite ? 'text-gray-400' : 'text-gray-400'}`} aria-hidden="true" />
                        </div>
                        <input
                            id="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                            className={`block w-full pl-10 pr-3 py-2.5 border bg-white ${isWhite ? 'text-gray-900 placeholder-gray-400' : 'text-gray-900 placeholder-gray-400'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder={t('login.passwordPlaceholder') || "Entrez votre mot de passe"}
                            onBlur={handleBlur}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                        </div>
                    </div>
                    {errors.password && touched.password && <div className="text-red-500">{errors.password}</div>}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded" />
                        <label htmlFor="remember-me" className={`ml-2 block text-sm ${isWhite ? 'text-white' : 'text-gray-700'}`}>{t('login.rememberMe')}</label>
                    </div>
                    <div className="text-sm">
                        <a href="/forgotpassword1" className={`font-medium ${isWhite ? 'text-indigo-600 hover:text-indigo-500 underline' : 'text-indigo-600 hover:text-indigo-500'} transition-colors duration-200 cursor-pointer`}>{t('login.forgotPassword')}</a>
                    </div>
                </div>

                <div>
                    <button disabled={isSubmitting} type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200">
                        {isSubmitting ? <ClipLoader size={22} color="#fff" /> : t('login.connect')}
                    </button>
                </div>
            </form>

            <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className={`w-full border-t ${isWhite ? 'border-gray-700' : 'border-gray-200'}`} />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className={`px-2 ${isWhite ? 'bg-blue-950 text-white' : 'bg-white text-gray-500'}`}>{t('login.continueWith')}</span>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
                <button onClick={handleLinkedInLogin} className="w-full inline-flex justify-center cursor-pointer items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm bg-[#0077B5] text-sm font-medium text-white hover:bg-[#00669c] transition-colors duration-200">
                    <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.761 0-.971.784-1.76 1.75-1.76s1.75.789 1.75 1.76c0 .971-.784 1.761-1.75 1.761zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.767 7 2.476v6.759z" /></svg>
                    LinkedIn
                </button>
            </div>
        </div>
    );
}
