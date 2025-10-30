import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Ajout

// Importation des images
// import imgHero2 from '../../assets/imgHero2.png'; // Remplacé par le carrousel
// import fleche from '../../assets/fleche.png';
import graffiti from '../../assets/graphitti.png';
import ProfilesIcon from '../../assets/Profiles.png';
import BuyIcon from '../../assets/Buy.png';
import SellIcon from '../../assets/Sell.png';
// Ajout : imports des nouvelles images locales pour le carrousel
import slide1 from '../../assets/slide1.jpg';
import slide2 from '../../assets/slide2.jpg';
import slide3 from '../../assets/slide3.jpg';
import slide4 from '../../assets/slide4.jpg';
import slide5 from '../../assets/slide5.jpg';

const HeroSection = () => {
  const { t } = useTranslation(); // Ajout
  // Variants pour les animations
  const itemVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Images pour le carrousel (remplacées par les imports locaux)
  const carouselImages = [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5,
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 4000); // Change d'image toutes les 4 secondes
    return () => clearInterval(timer);
  }, [carouselImages.length]);

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
            dangerouslySetInnerHTML={{ __html: t('hero.title') }} // Pour gérer les <br/> et <span>
          />

          {/* Sous-titre */}
          <motion.p
            className="text-gray-600 font-light max-w-lg mb-8"
            variants={itemVariants}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Bouton Candidat */}
          <motion.div variants={itemVariants}>
            <Link
              to="/candidatProfil"
              className="inline-block w-fit animate-pulse px-8 py-3 bg-gray-800 text-white text-lg font-semibold rounded-full shadow-lg
                         hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-400"
            >
              {t('hero.candidate')}
            </Link>
          </motion.div>

          {/* Cartes: Recruteur, Vendeur, Acheteur */}
          <motion.div 
            className="flex flex-wrap gap-4 pt-12"
            variants={itemVariants}
          >
            {/* Recruteur */}
            <Link
              to="/dashboard"
              className="items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4 mb-5
                         text-base font-medium text-gray-800 shadow-sm hover:shadow-md
                         transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-purple-200 flex items-center justify-center mb-3 rounded-full flex-shrink-0">
                <img src={ProfilesIcon} alt="Recruteur Icon" className="w-7 h-7" />
              </div>
              {t('hero.recruiter')}
            </Link>

            {/* Vendeur */}
            <Link
              to="/candidatProfil"
              className="items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4 mb-5
                         text-base font-medium text-gray-800 shadow-sm hover:shadow-md
                         transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-yellow-100 flex items-center justify-center mb-3 rounded-full flex-shrink-0">
                <img src={SellIcon} alt="Vendeur Icon" className="w-7 h-6" />
              </div>
              {t('hero.seller')}
            </Link>

            {/* Acheteur */}
            <Link
              to="/candidatProfil"
              className="items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4 mb-5
                         text-base font-medium text-gray-800 shadow-sm hover:shadow-md
                         transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-blue-100 flex items-center justify-center mb-3 rounded-full flex-shrink-0">
                <img src={BuyIcon} alt="Acheteur Icon" className="w-7 h-7" />
              </div>
              {t('hero.buyer')}
            </Link>
          </motion.div>
        </motion.div>

        {/* Colonne droite: image téléphone + flèche */}
        <div className="relative w-full h-full hidden lg:flex justify-center items-center">
          {/* SVG pour la forme de vague */}
          <svg width="0" height="0">
            <defs>
              <clipPath id="waveClip" clipPathUnits="objectBoundingBox">
                <path d="M 0.25 0 L 1 0 L 1 1 L 0.25 1 L 0 0.5 Z" />
              </clipPath>
            </defs>
          </svg>

          <motion.div
            className="w-[500px] h-[600px] xl:w-[540px] xl:h-[650px] relative shadow-2xl"
            style={{ clipPath: 'url(#waveClip)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          >
            {/* Carrousel d'images à l'intérieur */}
            <motion.div
              className="w-full h-full"
              animate={{ x: `-${currentImageIndex * 100}%` }}
              transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }}
            >
              <div className="flex w-max h-full">
                {carouselImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Slide ${index + 1}`} // La largeur de l'image doit correspondre à la largeur du conteneur
                    className="w-[500px] xl:w-[540px] h-full object-cover"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
    </section>
  );
};

export default HeroSection;