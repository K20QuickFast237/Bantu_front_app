import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Ajout

const NotreHistoire = () => {
  const { t } = useTranslation(); // Ajout
  return (
    <section className="py-9 bg-gray-100 mt-[-60px]">
      <motion.section
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }} // Anime une seule fois lorsque 30% de l'élément est visible
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
          {t('history.title')}
        </h2>

        {/* Ligne du temps */}
        <div className="relative border-t-2 border-gray-300 mx-auto w-full max-w-5xl">
          {/* Points de la ligne du temps */}
          <div className="flex justify-between -mt-3.5"> {/* Ajustement pour positionner les points sur la ligne */}
            {/* Point 2024 */}
            <div className="relative text-center">
              <div className="w-5 h-5 bg-gray-700 rounded-full mx-auto shadow-md"></div>
              <p className="mt-4 text-lg font-semibold text-gray-800">{t('history.timeline.2024.month')}</p>
              <div className="mt-3 py-2 px-4 rounded-md inline-block text-sm font-medium" style={{ backgroundColor: '#FFDEDE', color: '#B00020' }}> {/* Couleur spécifique pour Mai */}
                {t('history.timeline.2024.month')}
              </div>
              <p className="mt-4 text-gray-600 text-left max-w-xs mx-auto leading-relaxed">
                {t('history.timeline.2024.desc')}
              </p>
            </div>

            {/* Point 2025 */}
            <div className="relative text-center">
              <div className="w-5 h-5 bg-gray-700 rounded-full mx-auto shadow-md"></div>
              <p className="mt-4 text-lg font-semibold text-gray-800">{t('history.timeline.2025.month')}</p>
              <div className="mt-3 py-2 px-4 rounded-md inline-block text-sm font-medium" style={{ backgroundColor: '#E0FFE0', color: '#008000' }}> {/* Couleur spécifique pour Juin */}
                {t('history.timeline.2025.month')}
              </div>
              <p className="mt-4 text-gray-600 text-left max-w-xs mx-auto leading-relaxed">
                {t('history.timeline.2025.desc')}
              </p>
            </div>

            {/* Point Aujourd'hui */}
            <div className="relative text-center">
              <div className="w-5 h-5 bg-gray-700 rounded-full mx-auto shadow-md"></div>
              <p className="mt-4 text-lg font-semibold text-gray-800">{t('history.timeline.today.month')}</p>
              <div className="mt-3 py-2 px-4 rounded-md inline-block text-sm font-medium" style={{ backgroundColor: '#E0F8FF', color: '#007FFF' }}> {/* Couleur spécifique pour Juillet */}
                {t('history.timeline.today.month')}
              </div>
              <p className="mt-4 text-left text-gray-600 max-w-xs mx-auto leading-relaxed">
                {t('history.timeline.today.desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
      </motion.section>
    </section>
  );
};

export default NotreHistoire;