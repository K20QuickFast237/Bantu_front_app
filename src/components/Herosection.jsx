import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Importation des images
import imgHero from '../assets/imgHero.png';
import fleche from '../assets/fleche.png';
import graffiti from '../assets/graphitti.png';
import ProfilesIcon from '../assets/Profiles.png';
import BuyIcon from '../assets/Buy.png';
import SellIcon from '../assets/Sell.png';

const HeroSection = () => {
  // Variants pour les animations
  const itemVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    // Section principale avec le fond dégradé et le débordement masqué
    <section
      className="relative min-h-screen pt-24 pb-0 overflow-hidden px-7
                 bg-gradient-to-br from-[#eeeffa] via-[#fff] to-[#f5f5f5]"
    >
      
      {/* Conteneur principal du contenu, centré et divisé en 2 colonnes sur grand écran */}
      <div
        className="relative z-10 max-w-10xl mx-auto px-6 grid lg:grid-cols-[60%_40%] gap-12 lg:gap-0 h-full"
      >
        {/* Colonne de gauche: Texte et CTA */}
        <motion.div 
          className="flex flex-col justify-center py-12 lg:py-0"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {/* image décorative */}
          <motion.div 
            className="w-[67%] mb-[-15px] flex justify-end"
            variants={itemVariants}
            transition={{ delay: 0.2 }}
          >
            <div className="text-left">
              <img
                src={graffiti}
                alt="Decorative elements"
                className="h-16 w-auto animate-fade-in-down"
              />
            </div>
          </motion.div>

          {/* Titre principal */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4"
            variants={itemVariants}
          >
            Une Seule App,<br />
            Deux Mondes :<br />
            <span className="text-gray-900 bg-clip-text ">
              Recrutement & E-Commerce Réunis.
            </span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            className="text-gray-600 font-light max-w-lg mb-8"
            variants={itemVariants}
          >
            Trouvez Un Emploi, Recrutez, Vendez Ou Achetez En Toute Sécurité Avec BantuLink.
          </motion.p>

          {/* Bouton Candidat */}
          <motion.div variants={itemVariants}>
            <Link
              to="/candidat"
              className="inline-block w-fit animate-pulse px-8 py-3 bg-gray-800 text-white text-lg font-semibold rounded-full shadow-lg
                         hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-400"
            >
              Je Suis Un Candidat
            </Link>
          </motion.div>

          {/* Cartes: Recruteur, Vendeur, Acheteur */}
          <motion.div 
            className="flex flex-wrap gap-4 pt-12"
            variants={itemVariants}
          >
            {/* Recruteur */}
            <Link
              to="/recruteur"
              className="items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4 mb-5
                         text-base font-medium text-gray-800 shadow-sm hover:shadow-md
                         transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-purple-200 flex items-center justify-center mb-3 rounded-full flex-shrink-0">
                <img src={ProfilesIcon} alt="Recruteur Icon" className="w-7 h-7" />
              </div>
              Je suis un Recruteur
            </Link>

            {/* Vendeur */}
            <Link
              to="/vendeur"
              className="items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4 mb-5
                         text-base font-medium text-gray-800 shadow-sm hover:shadow-md
                         transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-yellow-100 flex items-center justify-center mb-3 rounded-full flex-shrink-0">
                <img src={SellIcon} alt="Vendeur Icon" className="w-7 h-6" />
              </div>
              Je suis un Vendeur
            </Link>

            {/* Acheteur */}
            <Link
              to="/acheteur"
              className="items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4 mb-5
                         text-base font-medium text-gray-800 shadow-sm hover:shadow-md
                         transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-blue-100 flex items-center justify-center mb-3 rounded-full flex-shrink-0">
                <img src={BuyIcon} alt="Acheteur Icon" className="w-7 h-7" />
              </div>
              Je suis un Acheteur
            </Link>
          </motion.div>
        </motion.div>

        {/* Colonne droite: image téléphone + flèche */}
        <div className="relative w-full h-full flex justify-end items-end">
          <div
            // Modification pour que le bas touche la fin de la section
            // Suppression de la classe translate-y négative
            className="absolute right-0 bottom-0
                       w-[320px] h-[320px] md:w-[450px] md:h-[450px] lg:w-[650px] lg:h-[650px] xl:w-[750px] xl:h-[750px]
                       bg-contain bg-no-repeat bg-right-bottom z-10 animate-fade-in-right animation-delay-800
                       transform-gpu" // REMPLACÉ lg:-translate-y-48 par transform-gpu seul
            style={{ backgroundImage: `url(${imgHero})` }}
          >
            {/* fleche.png par-dessus imgHero (la div de fond) */}
            <img
              src={fleche}
              alt="Decorative arrow"
              className="absolute top-36 right-[-115px] w-full h-[80%] object-contain animate-bounce-slow"
              style={{ animationDelay: '1000ms' }}
            />
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default HeroSection;