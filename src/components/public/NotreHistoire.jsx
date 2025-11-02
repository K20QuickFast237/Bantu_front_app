import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const NotreHistoire = () => {
  const { t } = useTranslation();

  return (
    <section className="py-9 bg-gray-100 mt-[-60px]">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            {t('history.title')}
          </h2>

          {/* Ligne du temps */}
          <div className="relative border-t-2 border-gray-300 mx-auto w-full max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-start -mt-3.5 space-y-12 md:space-y-0">
              
              {/* Étape 1 */}
              <div className="relative flex flex-col items-center md:items-start text-center md:text-left md:w-1/3">
                <div className="w-5 h-5 bg-gray-700 rounded-full shadow-md"></div>
                <div
                  className="mt-6 py-2 px-4 rounded-md inline-block text-sm font-semibold"
                  style={{ backgroundColor: '#FFDEDE', color: '#B00020' }}
                >
                  {t('history.timeline.2024.month')}
                </div>
                <p className="mt-4 text-gray-600 text-left max-w-xs leading-relaxed">
                  {t('history.timeline.2024.desc')}
                </p>
              </div>

              {/* Étape 2 */}
              <div className="relative flex flex-col items-center md:items-start text-center md:text-left md:w-1/3">
                <div className="w-5 h-5 bg-gray-700 rounded-full shadow-md"></div>
                <div
                  className="mt-6 py-2 px-4 rounded-md inline-block text-sm font-semibold"
                  style={{ backgroundColor: '#E0FFE0', color: '#008000' }}
                >
                  {t('history.timeline.2025.month')}
                </div>
                <p className="mt-4 text-gray-600 text-left max-w-xs leading-relaxed">
                  {t('history.timeline.2025.desc')}
                </p>
              </div>

              {/* Étape 3 */}
              <div className="relative flex flex-col items-center md:items-start text-center md:text-left md:w-1/3">
                <div className="w-5 h-5 bg-gray-700 rounded-full shadow-md"></div>
                <div
                  className="mt-6 py-2 px-4 rounded-md inline-block text-sm font-semibold"
                  style={{ backgroundColor: '#E0F8FF', color: '#007FFF' }}
                >
                  {t('history.timeline.today.month')}
                </div>
                <p className="mt-4 text-gray-600 text-left max-w-xs leading-relaxed">
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
