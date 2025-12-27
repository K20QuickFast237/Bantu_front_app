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
import HeaderProfils from '@/components/app/HeaderProfils';

const WhatDoYouWantToDo = () => {
    const { t } = useTranslation(); // Hook de traduction
    const navigate = useNavigate();
    const { professionnel, token, user } = useAuth();
    const [showSellerForm, setShowSellerForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleActionClick = async (actionId) => {
        // La logique utilise maintenant l'ID constant, pas le texte traduit
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
            case 'freelance':
                window.location.href = `${import.meta.env.VITE_FREELANCE_URL}/dashboard?token=${token}`;
                break;
            case 'buy':
                await handleBuyClick();
            case 'sell':
                await handleSellerClick();
                break;
            default:
                console.log('Action non reconnue');
        }
    };

    const handleBuyClick = async () => {
        try {
            setIsLoading(true);
            
            if (!user?.id) {
                toast.error(t('errors.no_user_id') || 'Utilisateur non identifié');
                return;
            }

            // 1. Récupérer les rôles actuels
            // Dans handleBuyClick et handleSellerClick
            const response = await api.get(`/user/${user.id}/roles`);

            // Vérifie si response.data est un tableau, sinon utilise un tableau vide
            const roles = Array.isArray(response.data) ? response.data : [];

            // Maintenant .some() ne plantera plus jamais
            const hasRole = roles.some((r) => {
                const name = (r?.name || '').toString().toLowerCase();
                return name === 'acheteur' || name === 'buyer';
            });
            if (hasRole) {
                // Si déjà acheteur, redirection directe
                window.location.href = `${import.meta.env.VITE_MARKETPLACE_URL}/dashboard/buyer?token=${token}`;
            } else {
                // 2. Assigner le rôle si manquant (Appel API vers votre backend)
                // Note: Adaptez l'URL '/user/assign-role' selon votre API réelle
                await api.post(`/profile/acheteur`, { 
                    id: user.id, 
                    role: 'Acheteur' 
                });
                
                toast.success(t('actions.role_assigned') || 'Profil acheteur activé');
                
                // 3. Rediriger vers le dashboard acheteur
                window.location.href = `${import.meta.env.VITE_MARKETPLACE_URL}/dashboard/buyer?token=${token}`;
            }
        } catch (error) {
            console.error('Erreur lors du traitement achat:', error);
            toast.error(t('errors.action_failed') || 'Impossible d’accéder à l’espace achat');
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
            const roles = response.data || [];
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
        { id: 'apply', icon: Icon1, label: 'actions.apply' },
        { id: 'recruit', icon: Icon2, label: 'actions.recruit' },
        { id: 'freelance', icon: Icon5, label: 'actions.freelance' },
        { id: 'buy', icon: Icon3, label: 'actions.buy' },
        { id: 'sell', icon: Icon4, label: 'actions.sell' },
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

                    {/* Section Droite */}
                    <div className="lg:w-1/2 grid grid-cols-2 gap-4 sm:gap-6 justify-items-center">
                        {actionCards.map((card) => (
                            <button
                                key={card.id}
                                onClick={() => handleActionClick(card.id)}
                                disabled={isLoading && card.id === 'sell'}
                                className="bg-gray-100 rounded-xl shadow-md flex flex-col items-center justify-center
                                         p-6 sm:p-8 w-full h-40 sm:h-48 cursor-pointer
                                         hover:bg-gray-200 hover:shadow-lg transition-all duration-200
                                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                         disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label={t('actions.alt_icon', { name: t(card.label) })}
                            >
                                <img
                                    src={card.icon}
                                    alt="" // Alt géré par l'aria-label du bouton
                                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-2 sm:mb-4"
                                />
                                <span className="text-gray-800 text-lg sm:text-xl font-semibold">
                                    {isLoading && card.id === 'sell' ? t('common.loading') : t(card.label)}
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