import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/app/Header';
import GroupeImage from '../../assets/groupe.png';
import Icon1 from '../../assets/icon1.png'; // Postuler
import Icon2 from '../../assets/icon2.png'; // Recruter
import Icon3 from '../../assets/icon3.png'; // Acheter
import Icon4 from '../../assets/icon4.png'; // Vendre
import { useAuth } from '@/hooks/useAuth';
import HeaderProfil from '@/components/app/HeaderProfil';
import { useTranslation } from 'react-i18next';

const WhatDoYouWantToDo = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { professionnel, token } = useAuth();
    console.log(professionnel);

    // Fonction pour gérer le clic sur une carte
    const handleActionClick = (action) => {
        console.log(`Action sélectionnée : ${action}`);

        // Redirection vers les pages appropriées selon l'action
        switch (action) {
            case t('whatToDo.apply'):
                navigate('/CandidatProfil');
                break;
            case t('whatToDo.recruit'):
                if (professionnel && Object.keys(professionnel).length > 0) {
                    // S'il est défini et non vide
                    navigate('/dashboard');
                } else {
                    // Sinon on l'envoie s'inscrire
                    navigate('/inscriptionEntreprise');
                }
                break;
            case t('whatToDo.buy'):
                window.location.href = `${import.meta.env.VITE_MARKETPLACE_URL}/dashboard/buyer?token=${token}`;
                break;
            case t('whatToDo.sell'):
                window.location.href = `${import.meta.env.VITE_MARKETPLACE_URL}/dashboard/seller?token=${token}`;
                break;
            default:
                console.log('Action non reconnue');
        }
    };

    const actionCards = [
        { icon: Icon1, text: t('whatToDo.apply'), alt: t('whatToDo.applyAlt') },
        { icon: Icon2, text: t('whatToDo.recruit'), alt: t('whatToDo.recruitAlt') },
        { icon: Icon3, text: t('whatToDo.buy'), alt: t('whatToDo.buyAlt') },
        { icon: Icon4, text: t('whatToDo.sell'), alt: t('whatToDo.sellAlt') },
    ];

    return (

        <>
            <HeaderProfil />
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-yellow-50 to-blue-50">
                <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center  justify-between p-8">
                    {/* Section Gauche : Titre et Image */}
                    <div className="flex flex-col items-center lg:items-start lg:w-1/2 mb-10 lg:mb-0">
                        <h1 className="text-3xl lg:text-4xl font-bold text-blue-900 leading-tight mb-8 text-center lg:text-left">
                            {t('whatToDo.title')}
                        </h1>
                        <div className="w-full max-w-md lg:max-w-none">
                            <img
                                src={GroupeImage}
                                alt={t('whatToDo.imageAlt')}
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>

                    {/* Section Droite : Cartes d'actions */}
                    <div className="lg:w-1/2 grid grid-cols-2 gap-4 sm:gap-6 justify-items-center">
                        {actionCards.map((card, index) => (
                            <button
                                key={index}
                                onClick={() => handleActionClick(card.text)}
                                className="bg-gray-100 rounded-xl shadow-md flex flex-col items-center justify-center
                                       p-6 sm:p-8 w-full h-40 sm:h-48 cursor-pointer
                                       hover:bg-gray-200 hover:shadow-lg transition-all duration-200
                                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                aria-label={`Action: ${card.text}`}
                            >
                                <img
                                    src={card.icon}
                                    alt={card.alt}
                                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-2 sm:mb-4"
                                />
                                <span className="text-gray-800 text-lg sm:text-xl font-semibold">
                                    {card.text}
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