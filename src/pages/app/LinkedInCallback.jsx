import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

const LinkedInCallback = () => {
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
            const errorDescription = searchParams.get('error_description') || "L'utilisateur a annulé l'autorisation.";
            setError(errorDescription);
            toast.error(`Erreur LinkedIn: ${errorDescription}`);
            setTimeout(() => navigate('/login', { replace: true }), 3000);
            return;
        }

        if (!code) {
            setError("Aucun code d'autorisation LinkedIn trouvé.");
            toast.error("Une erreur est survenue, le code d'autorisation est manquant.");
            setTimeout(() => navigate('/login', { replace: true }), 3000);
            return;
        }

        try {
            // Envoyer le code au backend
            const response = await api.get(`/linkedin-login-callback?code=${code}`);
            const { user: apiUser, token } = response.data;

            login(apiUser, token);
            toast.success('Connexion via LinkedIn réussie !');
            navigate('/WhatDoYouWantToDo', { replace: true });
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Une erreur est survenue lors de la connexion avec LinkedIn.";
            setError(errorMessage);
            toast.error(errorMessage);
            setTimeout(() => navigate('/login', { replace: true }), 3000);
        }
    }, [location, navigate, login]);

    useEffect(() => {
        processLinkedInCode();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-gray-800">
                    {error ? 'Erreur de connexion' : 'Finalisation de la connexion LinkedIn...'}
                </h1>
                <p className="text-gray-600 mt-2">
                    {error ? error : 'Veuillez patienter, nous vous redirigeons.'}
                </p>
            </div>
        </div>
    );
};

export default LinkedInCallback;