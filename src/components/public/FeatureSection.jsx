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
import { useTranslation } from 'react-i18next';

const FeatureSection = () => {
  const { t } = useTranslation();

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
            <p className="text-gray-600 font-light max-w-sm">
              {t('features.bantuHire.description')}
            </p>
          </div>

          <div className='w-full sm:w-1/5'>
            <div className="flex flex-col items-start text-left">
              <div className="w-12 sm:w-16 h-12 sm:h-16 mb-4 flex items-center justify-center">
                <img src={SearchIcon} alt="Search icon" className="w-8 sm:w-auto h-8 sm:h-auto" />
              </div>
              <h4 className="text-base sm:text-lg font-bold mb-2 text-gray-900">{t('features.bantuHire.simplifiedSearch.title')}</h4>
              <p className="text-gray-600 text-sm font-light">
                {t('features.bantuHire.simplifiedSearch.description')}
              </p>
            </div>
          </div>

          <div className='w-full sm:w-1/4 sm:ml-5 mt-6 sm:mt-0'>
            <div className="flex flex-col items-start text-left">
              <div className="w-12 sm:w-16 h-12 sm:h-16 mb-4 flex items-center justify-center">
                <img src={AmericaIcon} alt="America icon" className="w-8 sm:w-auto h-8 sm:h-auto" />
              </div>
              <h4 className="text-base sm:text-lg font-bold mb-2 text-gray-900">{t('features.bantuHire.networking.title')}</h4>
              <p className="text-gray-600 text-sm font-light">
                {t('features.bantuHire.networking.description')}
              </p>
            </div>
          </div>

          <div className='w-full sm:w-1/5 sm:ml-5 mt-6 sm:mt-0'>
            <div className="flex flex-col items-start text-left">
              <div className="w-12 sm:w-16 h-12 sm:h-16 mb-4 flex items-center justify-center">
                <img src={ChatIcon} alt="Chat icon" className="w-8 sm:w-auto h-8 sm:h-auto" />
              </div>
              <h4 className="text-base sm:text-lg font-bold mb-2 text-gray-900">{t('features.bantuHire.directMessaging.title')}</h4>
              <p className="text-gray-600 text-sm font-light">
                {t('features.bantuHire.directMessaging.description')}
              </p>
            </div>
          </div>
        </div>

        <img src={GraffittiRedIcon} alt="Decorative lines" className="h-12 sm:h-17 w-auto mt-[-30px] sm:mt-[-40px] mx-auto sm:ml-80" />

        {/* BantuMarket */}
        <div className='flex flex-col sm:flex-row mx-4 sm:mx-11 w-full mt-[-10px]'>
          <div className='w-full sm:w-1/3 block mb-8 sm:mb-0'>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
              {t('features.bantuMarket.title')}
            </h3>
            <p className="text-gray-600 font-light max-w-sm">
              {t('features.bantuMarket.description')}
            </p>
          </div>

          <div className='w-full sm:w-1/5'>
            <div className="flex flex-col items-start text-left">
              <div className="w-12 sm:w-16 h-12 sm:h-16 mb-4 flex items-center justify-center">
                <img src={OnlineStoreIcon} alt="Online store icon" className="w-8 sm:w-auto h- zenith-8 sm:h-auto" />
              </div>
              <h4 className="text-base sm:text-lg font-bold mb-2 text-gray-900">{t('features.bantuMarket.customShop.title')}</h4>
              <p className="text-gray-600 text-sm font-light">
                {t('features.bantuMarket.customShop.description')}
              </p>
            </div>
          </div>

          <div className='w-full sm:w-1/4 sm:ml-5 mt-6 sm:mt-0'>
            <div className="flex flex-col items-start text-left">
              <div className="w-12 sm:w-16 h-12 sm:h-16 mb-4 flex items-center justify-center">
                <img src={SecurityLockIcon} alt="Security lock icon" className="w-8 sm:w-auto h-8 sm:h-auto" />
              </div>
              <h4 className="text-base sm:text-lg font-bold mb-2 text-gray-900">{t('features.bantuMarket.securePayment.title')}</h4>
              <p className="text-gray-600 text-sm font-light">
                {t('features.bantuMarket.securePayment.description')}
              </p>
            </div>
          </div>

          <div className='w-full sm:w-1/5 sm:ml-5 mt-6 sm:mt-0'>
            <div className="flex flex-col items-start text-left">
              <div className="w-12 sm:w-16 h-12 sm:h-16 mb-4 flex items-center justify-center">
                <img src={ChatIcon} alt="Chat icon" className="w-8 sm:w-auto h-8 sm:h-auto" />
              </div>
              <h4 className="text-base sm:text-lg font-bold mb-2 text-gray-900">{t('features.bantuMarket.clientChat.title')}</h4>
              <p className="text-gray-600 text-sm font-light">
                {t('features.bantuMarket.clientChat.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 sm:px-7 font-sans text-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between">
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