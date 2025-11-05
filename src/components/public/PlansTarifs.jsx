import React from 'react';
import { Check } from 'lucide-react'; 
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Ajout

const PlansTarifs = () => {
  const { t } = useTranslation(); // Hook i18n

  return (
    <motion.section
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }} // Anime une seule fois lorsque 30% de l'élément est visible
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      >
    <section className="bg-white  sm:pt-18 sm:pb-6 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Titre et sous-titre */}
      
      <div className="text-center mb-16 max-w-3xl">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          {t('pricing.plans.title')}
        </h2>
        <p className="text-lg text-gray-600">
          {t('pricing.plans.subtitle')}
        </p>
      </div>

      {/* Cartes des tarifs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 max-w-7xl w-full">

        {/* Carte Basique */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col justify-between items-center text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('pricing.plans.basic.name')}</h3>
          <p className="text-4xl font-extrabold text-gray-900 mb-4">{t('pricing.plans.basic.price')}</p>
          <p className="text-sm text-gray-500 mb-8 max-w-xs">
            {t('pricing.plans.basic.description')}
          </p>

          <ul className="text-left text-gray-700 space-y-3 mb-10 w-full px-4">
            {t('pricing.plans.basic.features', { returnObjects: true }).map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" /> {feature}
              </li>
            ))}
          </ul>

          <button className="w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            {t('pricing.plans.basic.button')}
          </button>
        </div>

        {/* Carte Pro - Le plus populaire */}
        <div className="relative bg-white rounded-2xl shadow-xl border border-blue-500 p-8 flex flex-col justify-between items-center text-center transform scale-105">
          {/* Tag "Le plus populaire" */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow-md whitespace-nowrap">
            {t('pricing.plans.pro.popular')}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('pricing.plans.pro.name')}</h3>
          <p className="text-4xl font-extrabold text-gray-900 mb-1">{t('pricing.plans.pro.price')}<span className="text-base font-medium text-gray-500">{t('pricing.plans.pro.period')}</span></p>
          <p className="text-sm text-gray-500 mb-8 max-w-xs">
            {t('pricing.plans.pro.description')}
          </p>

          <ul className="text-left text-gray-700 space-y-3 mb-10 w-full px-4">
            {t('pricing.plans.pro.features', { returnObjects: true }).map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" /> {feature}
              </li>
            ))}
          </ul>

          <button className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
            {t('pricing.plans.pro.button')}
          </button>
        </div>

        {/* Carte Entreprise */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col justify-between items-center text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('pricing.plans.enterprise.name')}</h3>
          <p className="text-4xl font-extrabold text-gray-900 mb-4">{t('pricing.plans.enterprise.price')}</p>
          <p className="text-sm text-gray-500 mb-8 max-w-xs">
            {t('pricing.plans.enterprise.description')}
          </p>

          <ul className="text-left text-gray-700 space-y-3 mb-10 w-full px-4">
            {t('pricing.plans.enterprise.features', { returnObjects: true }).map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" /> {feature}
              </li>
            ))}
          </ul>

          <button className="w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            {t('pricing.plans.enterprise.button')}
          </button>
        </div>

      </div>
    </section>
    </motion.section>
  );
};

export default PlansTarifs;