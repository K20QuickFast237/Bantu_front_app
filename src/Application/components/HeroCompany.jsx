import React from 'react';
import CompanyBg from '../../assets/assets_application/Recherche_entreprise.png';
import BantulinkLogo from '../../assets/assets_application/BantulinkLogo.png';
import { motion } from 'framer-motion';

const HeroCompany = () => {
  return (
    <div className="relative w-full">

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }} // Anime une seule fois lorsque 30% de l'élément est visible
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
      {/* Main Hero Section */}
      <div className="relative w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${CompanyBg})` }}
        ></div>

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col justify-center h-full">
          {/* Top Text */}
          <div className="text-center text-white mb-8">
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight">
              Créez des offres d'emplois facilement
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight">
              et rapidement
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section - Positioned to overlap */}
      <div className="relative -mt-10 z-20 px-6 sm:px-8 md:px-10">
        <div className="flex items-center">
          {/* Logo - Half inside, half outside */}
          <div className="bg-gray-200 p-2 rounded-lg mr-4">
            <img src={BantulinkLogo} alt="Bantulink Logo" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
          </div>

          {/* Company Info */}
          <div>
            <p className="text-green-400 text-xl sm:text-2xl font-bold">ATOM TECH</p>
            <p className="text-gray-700 text-base sm:text-lg">contact@atomtechpro.com</p>
          </div>
        </div>
      </div>
      </motion.section>
    </div>
  );
};

export default HeroCompany;