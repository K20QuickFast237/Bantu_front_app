import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Importé
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import { toast } from 'sonner';

import GroupeImage from '../../assets/groupe.png';
import Icon1 from '../../assets/icon1.png'; 
import Icon2 from '../../assets/icon2.png'; 
import Icon3 from '../../assets/icon3.png'; 
import Icon4 from '../../assets/icon4.png'; 
import Icon5 from '../../assets/icon5.png'; 
import Icon6 from '../../assets/icon6.png'; 
import HeaderProfils from '@/components/app/HeaderProfils';

const WhatDoYouWantToDo = () => {
    const { t } = useTranslation(); // Hook de traduction
    const navigate = useNavigate();
    const { professionnel, token, user } = useAuth();
    const [showSellerForm, setShowSellerForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleActionClick = async (actionId) => {
        switch (actionId) {
            case 'apply':
                navigate('/CandidatProfil');
                break;
            case 'recruit':
                if (professionnel && Object.keys(professionnel).length > 0) {
                    navigate('/dashboard');
                } else {
                    navigate('/inscriptionEntreprise');
                }
                break;
            case 'find_provider':
                window.location.href = `${import.meta.env.VITE_FREELANCE_URL}/search?token=${token}`;
                break;
            case 'be_provider':
                handleFreelanceRedirect(user, token, setIsLoading);
                break;
            case 'buy':
                await handleBuyerClick();
                break; // Ajout du break manquant
            case 'sell':
                await handleSellerClick();
                break;
            default:
                console.log('Action non reconnue');
        }
    };

    const handleFreelanceRedirect = async (user, token, setIsLoading) => {
        try {
            setIsLoading(true);

            // 1. Vérification de l'utilisateur
            if (!user?.id) {
                toast.error(t('errors.no_user_id') || 'Utilisateur non identifié');
                return;
            }

            // 2. Vérification des rôles via l'API
            const response = await api.get(`/user/${user.id}/roles`);
            const roles = Array.isArray(response.data)
                ? response.data
                : Array.isArray(response.data?.roles)
                    ? response.data.roles
                    : Array.isArray(response.data?.data)
                    ? response.data.data
                    : [];

            // const roles = response.data || [];
            
            // 3. Logique de recherche du rôle
            const hasFreelancer = roles.some((r) => {
                const name = (r?.name || '').toString().toLowerCase();
                return name === 'freelancer' || name === 'prestataire' || name === 'provider';
            });
            
            // 4. Redirection conditionnelle
            if (hasFreelancer) {
                // Déjà prestataire -> Dashboard
                window.location.href = `${import.meta.env.VITE_FREELANCE_URL}/dashboard?token=${token}`;
            } else {
                // Pas encore prestataire -> Formulaire d'inscription
                window.location.href = `${import.meta.env.VITE_FREELANCE_URL}/become-provider?token=${token}`;
            }
        } catch (error) {
            console.error('Erreur redirection freelance:', error);
            toast.error(t('errors.role_check_failed') || 'Erreur de connexion au service freelance');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBuyerClick = async () => {
        try {
            setIsLoading(true);
            
            // 1. Sécurité : Vérifier l'ID utilisateur
            if (!user?.id) {
                toast.error(t('errors.no_user_id') || 'Utilisateur non identifié');
                return;
            }

            // 2. Récupérer les rôles depuis le backend
            const response = await api.get(`/user/${user.id}/roles`);
            // const roles = response.data || [];

            const roles = Array.isArray(response.data)
                ? response.data
                : Array.isArray(response.data?.roles)
                    ? response.data.roles
                    : Array.isArray(response.data?.data)
                    ? response.data.data
                    : [];

            
            // 3. Vérification du rôle (Correction : comparaison en minuscules)
            const hasAcheteur = roles.some((r) => {
                const name = (r?.name || '').toString().toLowerCase().trim();
                return name === 'acheteur' || name === 'buyer';
            });

            console.log('Rôles détectés:', roles, 'Est Acheteur:', hasAcheteur);
            
            if (hasAcheteur) {
                // CAS 1 : Déjà acheteur -> Direction Dashboard Marketplace
                window.location.href = `${import.meta.env.VITE_MARKETPLACE_URL}/dashboard/buyer?token=${token}`;
            } else {
                // CAS 2 : Pas encore acheteur -> Attribution automatique du rôle
                try {
                    await api.post(`/user/${user.id}/role`, { id: 12, user_id: user.id});
                    toast.success(t('success.role_assigned') || 'Rôle acheteur attribué avec succès');
                    window.location.href = `${import.meta.env.VITE_MARKETPLACE_URL}/dashboard/buyer?token=${token}`;
                } catch (error) {
                    console.error("Erreur lors de l'attribution du rôle acheteur:", error);
                    // window.location.href = `${import.meta.env.VITE_MARKETPLACE_URL}/auth/onboarding-buyer?token=${token}`;
                }
            }

        } catch (error) {
            console.error('Erreur lors de la vérification du rôle:', error);
            toast.error(t('errors.role_check_failed') || 'Erreur lors de la vérification de votre rôle');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSellerClick = async () => {
        try {
            setIsLoading(true);
            
            // Vérifier que l'utilisateur est identifié
            if (!user?.id) {
                toast.error(t('errors.no_user_id') || 'Utilisateur non identifié');
                setIsLoading(false);
                return;
            }

            // Récupérer les rôles de l'utilisateur côté backend
            const response = await api.get(`/user/${user.id}/roles`);
            // const roles = response.data || [];

            const roles = Array.isArray(response.data)
                ? response.data
                : Array.isArray(response.data?.roles)
                    ? response.data.roles
                    : Array.isArray(response.data?.data)
                    ? response.data.data
                    : [];

            
            // Rechercher le rôle "Vendeur" (insensible à la casse). Accepte aussi "seller".
            const hasVendeur = roles.some((r) => {
                const name = (r?.name || '').toString().toLowerCase();
                return name === 'vendeur' || name === 'seller';
            });
            
            if (hasVendeur) {
                window.location.href = `${import.meta.env.VITE_MARKETPLACE_URL}/dashboard/seller?token=${token}`;
            } else {
                window.location.href = `${import.meta.env.VITE_MARKETPLACE_URL}/auth?token=${token}`;
            }
        } catch (error) {
            console.error('Erreur lors de la vérification du rôle:', error);
            toast.error(t('errors.role_check_failed') || 'Erreur lors de la vérification de votre rôle');
        } finally {
            setIsLoading(false);
        }
    };

    // On utilise un "id" pour la logique et une clé "label" pour la traduction
    const actionCards = [
        { id: 'apply', icon: Icon1, label: 'actions.apply' },      // Postuler à un emploi
        { id: 'recruit', icon: Icon2, label: 'actions.recruit' },  // Recruter du personnel
        { id: 'find_provider', icon: Icon6, label: 'actions.find_provider' }, // Nouveau
        { id: 'be_provider', icon: Icon5, label: 'actions.be_provider' },       // Nouveau
        { id: 'buy', icon: Icon3, label: 'actions.buy' },          // Acheter des produits
        { id: 'sell', icon: Icon4, label: 'actions.sell' },        // Vendre des produits
    ];

    return (
        <>
            <HeaderProfils />
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-yellow-50 to-blue-50">
                <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between p-8">
                    
                    {/* Section Gauche */}
                    <div className="flex flex-col items-center lg:items-start lg:w-1/2 mb-10 lg:mb-0">
                        <h1 className="text-3xl lg:text-4xl font-bold text-blue-900 leading-tight mb-8 text-center lg:text-left">
                            {t('actions.title')}
                        </h1>
                        <div className="w-full max-w-md lg:max-w-none">
                            <img
                                src={GroupeImage}
                                alt={t('actions.illustration_alt')}
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>

                    {/* Section Droite modifiée pour 6 cartes */}
                    <div className="lg:w-1/2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 sm:gap-6 justify-items-center">
                        {actionCards.map((card) => (
                            <button
                                key={card.id}
                                onClick={() => handleActionClick(card.id)}
                                disabled={isLoading && (card.id === 'sell' || card.id === 'buy')}
                                className="bg-gray-100 rounded-xl shadow-md flex flex-col items-center justify-center
                                        p-4 sm:p-6 w-full h-40 sm:h-48 cursor-pointer
                                        hover:bg-gray-200 hover:shadow-lg transition-all duration-200
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                        disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label={card.label.includes('.') ? t(card.label) : card.label}
                            >
                                <img
                                    src={card.icon}
                                    alt=""
                                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain mb-2"
                                />
                                <span className="text-gray-800 text-sm sm:text-base font-semibold text-center leading-tight">
                                    {isLoading && (card.id === 'sell' || card.id === 'buy') 
                                        ? t('common.loading') 
                                        : (card.label.includes('.') ? t(card.label) : card.label)
                                    }
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            
        </>
    );
};

export default WhatDoYouWantToDo;