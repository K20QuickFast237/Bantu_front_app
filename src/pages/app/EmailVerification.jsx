import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../services/api';
// Assurez-vous que le chemin est correct en fonction de votre structure de projet
import EmailSecureIcon from '../../assets/emailsecure.png'; // Renommage pour être plus descriptif
import { useTranslation } from 'react-i18next';

const EmailVerification = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { email, token, signature} = location.state || {};
    const [code, setCode] = useState(['', '', '', '', '', '']); // Array pour chaque chiffre du code
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef([]); // Références pour chaque input afin de gérer le focus

    const handleChange = (e, index) => {
        const value = e.target.value;
        // Permet seulement un chiffre par input
        if (value.length > 1) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Passer au champ suivant si un chiffre est saisi et qu'il n'est pas le dernier
        if (value && index < code.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Retour arrière : efface le champ actuel et passe au précédent
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            e.preventDefault(); // Empêche le comportement par défaut de backspace
            inputRefs.current[index - 1]?.focus();
            const newCode = [...code];
            newCode[index - 1] = ''; // Efface le champ précédent
            setCode(newCode);
        }
    };

    const handleVerifyEmail = async () => {
        const fullCode = code.join('');
        if (fullCode.length !== 6) {
            toast.error(t('emailVerification.enter6Digits'));
            return;
        }
        setIsLoading(true);
        try {
            await api.post(`/email/verify/${token}?signature=${signature}`, { code: fullCode });
            toast.success(t('emailVerification.success'));
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || t('emailVerification.invalidCode'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        setIsLoading(true);
        try {
            await api.post('/resend-verification-email', { email: email });
            toast.success(t('emailVerification.resendSuccess'));
        } catch (error) {
            toast.error(error.response?.data?.message || t('emailVerification.resendError'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangeEmail = () => {
        // Redirige vers la page d'inscription pour changer l'email
        navigate('/register');
    };


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <img src={EmailSecureIcon} alt={t('emailVerification.iconAlt')} className="mx-auto h-16 w-16 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('emailVerification.title')}</h2>
                    <p className="text-gray-600">{t('emailVerification.subtitle')}</p>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    {t('emailVerification.sentCode')}
                    <span className="font-semibold">{email}</span>
                </p>

                {/* Champs de saisie du code */}
                <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={el => inputRefs.current[index] = el}
                            className="w-10 h-12 sm:w-12 sm:h-14 text-center text-2xl font-bold text-gray-800
                                       border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1
                                       focus:ring-green-500 outline-none transition-all duration-200
                                       bg-gray-100 placeholder-gray-400"
                            aria-label={t('emailVerification.digitLabel', { index: index + 1 })}
                        />
                    ))}
                </div>

                {/* Lien "Email incorrect ?" */}
                <p className="text-gray-500 mb-6 text-sm">
                    <span className="font-semibold">{t('emailVerification.wrongEmail')} ?</span>{' '}
                    <button
                        onClick={handleChangeEmail}
                        className="text-green-600 hover:text-green-700 font-medium underline focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        {t('emailVerification.changeHere')}
                    </button>
                </p>

                {/* Bouton de vérification */}
                <button
                    onClick={handleVerifyEmail}
                    disabled={isLoading}
                    className="w-full bg-[#10B981] hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg
                               shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105
                               focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mb-4
                               disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                >
                    {isLoading ? t('emailVerification.verifying') : t('emailVerification.verify')}
                </button>

                {/* Lien "Renvoyer le code" */}
                <button
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="text-gray-500 text-sm hover:text-gray-700 transition-colors duration-200
                               focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                    {t('emailVerification.resend')}
                </button>
            </div>
        </div>
    );
};

export default EmailVerification;