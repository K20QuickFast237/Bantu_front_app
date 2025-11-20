import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase, Store, Search, MessageSquare, Video, BadgeCheck, Megaphone, MessagesSquare } from 'lucide-react';
import imggroupe from '../../assets/groupe.png';
import GraffittiRedIcon from '../../assets/graphe.png';

const FeatureSection = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('hire'); // 'hire' ou 'market'

  const featuresData = {
    hire: [
      {
        icon: Search,
        title: t('career.smartSearch.title'),
        desc: t('career.smartSearch.desc'),
      },
      {
        icon: MessageSquare,
        title: t('career.realTimeChat.title'),
        desc: t('career.realTimeChat.desc'),
      },
      {
        icon: Video,
        title: t('career.videoInterviews.title'),
        desc: t('career.videoInterviews.desc'),
      },
      {
        icon: BadgeCheck,
        title: t('career.skillCertifications.title'),
        desc: t('career.skillCertifications.desc'),
      },
    ],
    market: [
      {
        icon: Store,
        title: t('business.onlineStore.title'),
        desc: t('business.onlineStore.description'),
      },
      {
        icon: Megaphone,
        title: t('business.promotion.title'),
        desc: t('business.promotion.description'),
      },
      {
        icon: MessagesSquare,
        title: t('business.chat.title'),
        desc: t('business.chat.description'),
      },
      {
        icon: MessagesSquare,
        title: t('business.chat.title'),
        desc: t('business.chat.description'),
      },
    ],
  };

  const FeatureCard = ({ icon: Icon, title, desc, index }) => (
    <motion.div
      className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-start"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );

  return (
    <>
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de la section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Une plateforme, des possibilités infinies
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les outils conçus pour votre carrière et votre business, accessibles en un clic.
          </p>
        </div>

        {/* Sélecteur d'onglets */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center bg-gray-100 p-1 rounded-xl space-x-1">
            <button
              onClick={() => setActiveTab('hire')}
              className="relative px-6 py-2.5 text-sm font-semibold rounded-lg"
            >
              <span className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${activeTab === 'hire' ? 'text-white' : 'text-gray-600'}`}>
                <Briefcase className="w-5 h-5" />
                BantuHire
              </span>
              {activeTab === 'hire' && (
                <motion.div
                  className="absolute inset-0 bg-blue-600 rounded-lg"
                  layoutId="active-pill"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('market')}
              className="relative px-6 py-2.5 text-sm font-semibold rounded-lg"
            >
              <span className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${activeTab === 'market' ? 'text-white' : 'text-gray-600'}`}>
                <Store className="w-5 h-5" />
                BantuMarket
              </span>
              {activeTab === 'market' && (
                <motion.div
                  className="absolute inset-0 bg-blue-600 rounded-lg"
                  layoutId="active-pill"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Grille des fonctionnalités */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {featuresData[activeTab].map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>

    <section className="bg-gray-50 px-4 sm:px-7 font-sans text-gray-800 pb-16 sm:pb-24">
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
    </>
  );
};

export default FeatureSection;