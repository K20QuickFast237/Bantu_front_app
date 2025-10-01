import React from 'react';
import CompanyBg from '../../assets/assets_application/Recherche_entreprise.png';
import BantulinkLogo from '../../assets/assets_application/BantuLinkLogo.png';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate
import { ArrowLeft } from 'lucide-react'; // Import de l'icône de flèche

const HeroCompany = () => {
  const navigate = useNavigate(); // Initialisation du hook
  const { professionnel } = useAuth();

  const handleGoBack = () => {
    navigate('/dashboardEntreprise'); // Fonction de redirection
  };

  return (
    <div className="relative w-full">

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Main Hero Section */}
        <div className="relative w-full pt-20 pb-10 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${CompanyBg})` }}
          ></div>

          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Bouton de retour */}
          <div className="absolute top-4 left-4 z-20">
            <button
              onClick={handleGoBack}
              className="flex items-center text-white bg-gray-800/50 hover:bg-gray-700/70 backdrop-blur-sm rounded-full py-2 px-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour
            </button>
          </div>

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
        <div className="relative -mt-14 z-20 px-6 sm:px-8 md:px-10">
          <div className="flex items-center">
            {/* Logo - Half inside, half outside */}
            <div className="bg-gray-200 p-6 mr-4">
              <img src={BantulinkLogo} alt="Bantulink Logo" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
            </div>

            {/* Company Info */}
            <div className='mt-15'>
              <p className="text-[#10B981] text-xl sm:text-2xl font-bold">{professionnel.nom_entreprise}</p>
              <p className="text-gray-700 text-base sm:text-lg">{professionnel.email_pro}</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HeroCompany;