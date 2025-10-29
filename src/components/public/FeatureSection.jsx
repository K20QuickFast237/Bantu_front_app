import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import SearchIcon from '../../assets/Search.png';
import AmericaIcon from '../../assets/America.png';
import ChatIcon from '../../assets/Chat.png';
import OnlineStoreIcon from '../../assets/Online Store.png';
import SecurityLockIcon from '../../assets/Security Lock.png';
import GraffittiRedIcon from '../../assets/Grafitti.png';
import GraffittiBlueIcon from '../../assets/graphe.png';
import imggroupe from '../../assets/groupe.png';
import { motion } from 'framer-motion'; 
import { useTranslation } from 'react-i18next'; // Ajout

const FeatureSection = () => {
  const { t } = useTranslation(); // Hook i18n

  return (
    <>
    <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }} // Anime une seule fois lorsque 30% de l'élément est visible
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
      <section className='bg-gradient-to-br w-full h-auto from-purple-300 via-white to-white py-12 sm:py-16 px-4 sm:px-13 font-sans text-gray-800'>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-16 sm:mb-30 text-gray-900">
          {t('features.title')}
          <div className="w-10 h-1 bg-blue-500 mx-auto mt-3 rounded"></div>
        </h2>

        <img src={GraffittiBlueIcon} alt="Decorative lines" className="h-12 sm:h-17 w-auto mt-[-80px] sm:mt-[-100px] " />

        {/* BantuHire */}
        <div className='flex flex-col sm:flex-row mx-4 sm:mx-11 w-full mb-12 sm:mb-20'>
          <div className='w-full sm:w-1/3 block mb-8 sm:mb-0'>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
              {t('features.bantuHire.title')}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t('features.bantuHire.description')}
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li className="flex items-center">
                <img src={SearchIcon} alt="Search Icon" className="w-5 h-5 mr-3" />
                {t('features.bantuHire.features.0')}
              </li>
              <li className="flex items-center">
                <img src={AmericaIcon} alt="America Icon" className="w-5 h-5 mr-3" />
                {t('features.bantuHire.features.1')}
              </li>
              <li className="flex items-center">
                <img src={ChatIcon} alt="Chat Icon" className="w-5 h-5 mr-3" />
                {t('features.bantuHire.features.2')}
              </li>
            </ul>
          </div>
          <div className='w-full sm:w-2/3'>
            <img 
              src={OnlineStoreIcon} 
              alt="BantuHire Illustration" 
              className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg" 
            />
          </div>
        </div>

        {/* BantuMarket */}
        <div className='flex flex-col sm:flex-row-reverse mx-4 sm:mx-11 w-full mb-12 sm:mb-20'>
          <div className='w-full sm:w-1/3 block mb-8 sm:mb-0'>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
              {t('features.bantuMarket.title')}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t('features.bantuMarket.description')}
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li className="flex items-center">
                <img src={SecurityLockIcon} alt="Security Icon" className="w-5 h-5 mr-3" />
                {t('features.bantuMarket.features.0')}
              </li>
              <li className="flex items-center">
                <img src={ChatIcon} alt="Chat Icon" className="w-5 h-5 mr-3" />
                {t('features.bantuMarket.features.1')}
              </li>
              <li className="flex items-center">
                <img src={SearchIcon} alt="Search Icon" className="w-5 h-5 mr-3" />
                {t('features.bantuMarket.features.2')}
              </li>
            </ul>
          </div>
          <div className='w-full sm:w-2/3'>
            <img 
              src={SecurityLockIcon} 
              alt="BantuMarket Illustration" 
              className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg" 
            />
          </div>
        </div>

        {/* Section Communauté */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Colonne de gauche: Image du groupe et du téléphone */}
          <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
            <img
              src={imggroupe}
              alt="Community services illustration"
              className="w-full max-w-md sm:max-w-lg h-auto object-contain"
            />
          </div>

          {/* Colonne de droite: Texte et bouton */}
          <div className="w-full lg:w-1/2 flex flex-col items-start lg:pl-16 relative">
            <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 lg:translate-x-0">
              <img src={GraffittiRedIcon} alt="Decorative lines" className="h-8 sm:h-10 w-auto rotate-90" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
              {t('features.community.title')}
            </h2>
            <p className="text-gray-600 font-light text-base sm:text-lg max-w-lg mb-8 sm:mb-10">
              {t('features.community.description')}
            </p>
            <Link
              to="/rejoindre-communaute"
              className="inline-block px-8 sm:px-10 py-2 sm:py-3 bg-gray-800 text-white text-base sm:text-lg font-semibold rounded-full shadow-lg
                        hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              {t('features.community.button')}
            </Link>
          </div>
        </div>
      </section>
      </motion.section>
    </>
  );
};

export default FeatureSection;