import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next'; 
import { Briefcase, ShoppingCart } from 'lucide-react';
import slide1 from '../../assets/slide1.jpg';
import slide2 from '../../assets/slide2.jpg';
import slide3 from '../../assets/slide3.jpg';
import slide4 from '../../assets/slide4.jpg';
import slide5 from '../../assets/slide5.jpg';

const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
    }, 4000); 
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <section
      className="relative py-20 md:py-32 flex items-center justify-start text-left text-white overflow-hidden"
    >
      {/* Carrousel en arrière-plan */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${carouselImages[currentImageIndex]})` }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
        {/* Overlay pour la lisibilité */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
      </div>

      {/* Contenu */}
      <motion.div
        className="relative z-10 flex flex-col items-start px-4 sm:px-8 lg:px-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Titre principal */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
          style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}
          dangerouslySetInnerHTML={{ __html: t('hero.title') }} // Pour gérer les <br/> et <span>
        />

        {/* Sous-titre */}
        <motion.p
          className="text-lg md:text-xl font-light max-w-2xl mb-10"
          style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)' }}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Nouveaux boutons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            onClick={() => navigate('/hirehome')}
            className="flex items-center justify-center gap-3 px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg border border-blue-400 hover:bg-blue-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Briefcase className="w-5 h-5" />
            {t('hero.hireButton')}
          </motion.button>
          <motion.button
            onClick={() => window.location.href = import.meta.env.VITE_MARKETPLACE_URL}
            className="flex items-center justify-center gap-3 px-8 py-3 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-lg shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="w-5 h-5" />
            {t('hero.marketButton')}
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;