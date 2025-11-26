import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Ajout

const StatsSection = () => {
  const { t } = useTranslation(); // Ajout
  // Variants pour l'animation des éléments statistiques
  const statItemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120, // Plus de raideur pour une apparition rapide
        damping: 14,    // Moins d'amortissement pour un petit rebond
      },
    },
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Stat 1 */}
          <motion.div
            className="text-center"
            variants={statItemVariants}
          >
            <p className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2">10K+</p>
            <p className="text-base text-gray-600">{t('stats.users')}</p>
          </motion.div>
          {/* Stat 2 */}
          <motion.div
            className="text-center"
            variants={statItemVariants}
          >
            <p className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2">2K+</p>
            <p className="text-base text-gray-600">{t('stats.providers')}</p>
          </motion.div>
          {/* Stat 3 */}
          <motion.div
            className="text-center"
            variants={statItemVariants}
          >
            <p className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2">1,5K+</p>
            <p className="text-base text-gray-600">{t('stats.companies')}</p>
          </motion.div>
          {/* Stat 4 */}
        <motion.div
            className="text-center"
            variants={statItemVariants}
          >
            <p className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2">98%</p>
            <p className="text-base text-gray-600">{t('stats.satisfaction')}</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;