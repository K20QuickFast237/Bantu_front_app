import React from 'react';
import { motion } from 'framer-motion';

const CTATarif = () => {
  return (
    <section className="flex justify-center pb-6 ">
      {/* Ajustement des couleurs de dégradé, padding et taille de police */}

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }} // Anime une seule fois lorsque 30% de l'élément est visible
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
      <div className="bg-gradient-to-r from-[rgb(68,88,217)] to-[#ee7752] w-full max-w-6xl mx-10 rounded-lg py-14 px-8 sm:px-12 md:px-16 flex flex-col items-center text-center shadow-lg">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight mb-7">
          Besoin d'une solution sur mesure pour vous ?
        </h2>
        <p className="font-light  sm:text-sm text-white opacity-90 max-w-3xl mb-12">
          Contactez notre équipe pour discuter des fonctionnalités d'entreprise, des intégrations personnalisées et des options de tarification en volume adaptées à votre organisation.
        </p>
        <button className="bg-white text-blue-700 font-bold py-4 px-10 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
          Contactez-nous
        </button>
      </div>
      </motion.section>
    </section>
  );
};

export default CTATarif;