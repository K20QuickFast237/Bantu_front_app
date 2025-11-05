import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const LinkedInCallback = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const hasProcessed = useRef(false);

    const processLinkedInCode = useCallback(async () => {
        if (hasProcessed.current) return;
        hasProcessed.current = true;
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        const errorParam = searchParams.get('error');

        if (errorParam) {
            const errorDescription = searchParams.get('error_description') || t('linkedinCallback.userCanceled');
            setError(errorDescription);
            toast.error(`${t('linkedinCallback.linkedinError')}: ${errorDescription}`);
            setTimeout(() => navigate('/login', { replace: true }), 3000);
            return;
        }

        if (!code) {
            setError(t('linkedinCallback.noCode'));
            toast.error(t('linkedinCallback.missingCodeError'));
            setTimeout(() => navigate('/login', { replace: true }), 3000);
            return;
        }

        try {
            // Envoyer le code au backend
            const response = await api.get(`/linkedin-login-callback?code=${code}`);
            const { user: apiUser, token } = response.data;

            login(apiUser, token);
            toast.success(t('linkedinCallback.success'));
            navigate('/WhatDoYouWantToDo', { replace: true });
        } catch (err) {
            const errorMessage = err.response?.data?.message || t('linkedinCallback.connectionError');
            setError(errorMessage);
            toast.error(errorMessage);
            setTimeout(() => navigate('/login', { replace: true }), 3000);
        }
    }, [location, navigate, login, t]);

    useEffect(() => {
        processLinkedInCode();
    }, [processLinkedInCode]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-gray-800">
                    {error ? t('linkedinCallback.errorTitle') : t('linkedinCallback.processingTitle')}
                </h1>
                <p className="text-gray-600 mt-2">
                    {error ? error : t('linkedinCallback.waitRedirect')}
                </p>
            </div>
        </div>
    );
};

export default LinkedInCallback;