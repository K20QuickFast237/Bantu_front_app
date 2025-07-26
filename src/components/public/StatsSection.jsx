import React from 'react';
import { motion } from 'framer-motion';

const StatsSection = () => {
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
    // Section principale avec fond bleu, padding adaptatif et police Inter
    <section className="bg-[#2196F3] py-12 px-4 sm:px-6 md:px-8 lg:px-11 font-['Inter'] text-white">
      {/* Conteneur principal centré, avec une grille responsive */}
      <motion.section
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }} // Anime une seule fois lorsque 30% de l'élément est visible
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-x-8 text-center">

        {/* Utilisateurs Actifs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center border-b pb-4 sm:border-b-0 sm:pb-0 md:border-l md:border-opacity-30 border-white" // Ajout de bordure bottom sur mobile, border-left sur md+
          initial="hidden"
          animate="visible"
          variants={statItemVariants}
          transition={{ delay: 0.1 }}
        >
          <span className="text-4xl md:text-5xl font-bold mb-1 sm:mb-0 sm:mr-1">10K+</span>
          <span className="text-lg text-center sm:text-left sm:ml-1 font-light">Utilisateurs Actifs</span>
        </motion.div>

        {/* Prestataires Certifiés */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center border-b pb-4 sm:border-b-0 sm:pb-0 md:border-l md:border-opacity-30 border-white" // Bordure sur mobile et desktop
          initial="hidden"
          animate="visible"
          variants={statItemVariants}
          transition={{ delay: 0.2 }}
        >
          <span className="text-4xl sm:ml-2 md:text-5xl font-bold mb-1 sm:mb-0 sm:mr-1">2K+</span>
          <span className="text-lg text-center sm:text-left sm:ml-2 font-light">Prestataires Certifiés</span>
        </motion.div>

        {/* Entreprises Inscrites */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center border-b pb-4 sm:border-b-0 sm:pb-0 md:border-l md:border-opacity-30 border-white" // Bordure sur mobile et desktop
          initial="hidden"
          animate="visible"
          variants={statItemVariants}
          transition={{ delay: 0.3 }}
        >
          <span className="text-4xl sm:ml-2 md:text-5xl font-bold mb-1 sm:mb-0 sm:mr-1">1,5K+</span>
          <span className="text-lg text-center sm:text-left sm:ml-1 font-light">Entreprises Inscrites</span>
        </motion.div>

        {/* Satisfaction Client */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center md:border-l md:border-opacity-30 border-white" // Pas de bordure bottom ici
          initial="hidden"
          animate="visible"
          variants={statItemVariants}
          transition={{ delay: 0.4 }}
        >
          <span className="text-4xl sm:ml-2 md:text-5xl font-bold mb-1 sm:mb-0 sm:mr-1">98%</span>
          <span className="text-lg text-center sm:text-left sm:ml-1 font-light">De Satisfaction Client</span>
        </motion.div>

      </div>
      </motion.section>
    </section>
  );
};

export default StatsSection;


