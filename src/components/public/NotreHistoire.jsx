import React from 'react';
import { motion } from 'framer-motion';

const NotreHistoire = () => {
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
          Notre Histoire
        </h2>

        {/* Ligne du temps */}
        <div className="relative border-t-2 border-gray-300 mx-auto w-full max-w-5xl">
          {/* Points de la ligne du temps */}
          <div className="flex justify-between -mt-3.5"> {/* Ajustement pour positionner les points sur la ligne */}
            {/* Point 2024 */}
            <div className="relative text-center">
              <div className="w-5 h-5 bg-gray-700 rounded-full mx-auto shadow-md"></div>
              <p className="mt-4 text-lg font-semibold text-gray-800">2024</p>
              <div className="mt-3 py-2 px-4 rounded-md inline-block text-sm font-medium" style={{ backgroundColor: '#FFDEDE', color: '#B00020' }}> {/* Couleur spécifique pour Mai */}
                Mai
              </div>
              <p className="mt-4 text-gray-600 text-left max-w-xs mx-auto leading-relaxed">
                Tout commence par un constat partagé par l'équipe de TNK SYNERGIES LTD : l'idée de BantuLink naît de cette observation : créer une super-application qui résout ces deux défis simultanément, avec une approche 100% africaine,
              </p>
            </div>

            {/* Point 2025 */}
            <div className="relative text-center">
              <div className="w-5 h-5 bg-gray-700 rounded-full mx-auto shadow-md"></div>
              <p className="mt-4 text-lg font-semibold text-gray-800">2025</p>
              <div className="mt-3 py-2 px-4 rounded-md inline-block text-sm font-medium" style={{ backgroundColor: '#E0FFE0', color: '#008000' }}> {/* Couleur spécifique pour Juin */}
                Juin
              </div>
              <p className="mt-4 text-gray-600 text-left max-w-xs mx-auto leading-relaxed">
                2025 marque le début du développement technique de BantuLink. Notre équipe de 15 développeurs expérimentés, basée à Douala travaille en mode agile pour créer une plateforme robuste, sécurisée et intuitive.
              </p>
            </div>

            {/* Point Aujourd'hui */}
            <div className="relative text-center">
              <div className="w-5 h-5 bg-gray-700 rounded-full mx-auto shadow-md"></div>
              <p className="mt-4 text-lg font-semibold text-gray-800">Aujourd'hui</p>
              <div className="mt-3 py-2 px-4 rounded-md inline-block text-sm font-medium" style={{ backgroundColor: '#E0F8FF', color: '#007FFF' }}> {/* Couleur spécifique pour Juillet */}
                Juillet
              </div>
              <p className="mt-4 text-left text-gray-600 max-w-xs mx-auto leading-relaxed">
                Chaque ligne de code est pensée pour l'utilisateur africain: interfaces multilingues (français/anglais).
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