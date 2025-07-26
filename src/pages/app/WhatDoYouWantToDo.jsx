import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/app/Header';
import GroupeImage from '../../assets/groupe.png';
import Icon1 from '../../assets/icon1.png'; // Postuler
import Icon2 from '../../assets/icon2.png'; // Recruter
import Icon3 from '../../assets/icon3.png'; // Acheter
import Icon4 from '../../assets/icon4.png'; // Vendre

const WhatDoYouWantToDo = () => {
    const navigate = useNavigate();

    // Fonction pour gérer le clic sur une carte
    const handleActionClick = (action) => {
        console.log(`Action sélectionnée : ${action}`);
        
        // Redirection vers les pages appropriées selon l'action
        switch (action) {
            case 'Postuler':
                navigate('/postuler');
                break;
            case 'Recruter':
                navigate('/recruter');
                break;
            case 'Acheter':
                navigate('/acheter');
                break;
            case 'Vendre':
                navigate('/vendre');
                break;
            default:
                console.log('Action non reconnue');
        }
    };

    const actionCards = [
        { icon: Icon1, text: 'Postuler', alt: 'Icône Postuler' },
        { icon: Icon2, text: 'Recruter', alt: 'Icône Recruter' },
        { icon: Icon3, text: 'Acheter', alt: 'Icône Acheter' },
        { icon: Icon4, text: 'Vendre', alt: 'Icône Vendre' },
    ];

    return (
       
       <>
       <Header />
        <div className="min-h-screen flex items-center mt-10 justify-center p-4 bg-gradient-to-br from-yellow-50 to-blue-50">
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between p-8">
                {/* Section Gauche : Titre et Image */}
                <div className="flex flex-col items-center lg:items-start lg:w-1/2 mb-10 lg:mb-0">
                    <h1 className="text-3xl lg:text-4xl font-bold text-blue-900 leading-tight mb-8 text-center lg:text-left">
                        Que voulez-vous faire ?
                    </h1>
                    <div className="w-full max-w-md lg:max-w-none">
                        <img
                            src={GroupeImage}
                            alt="Illustration de groupe de personnes interagissant via un téléphone"
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