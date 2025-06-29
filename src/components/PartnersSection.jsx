import React from 'react';
import tnkImage from '../assets/tnk.png';
import { motion } from 'framer-motion';

const PartnersSection = () => {
  return (
    <section className="bg-[#252B42] rounded-3xl text-white py-10"> {/* Couleur de fond fidèle à l'image */}
      <motion.section
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }} // Anime une seule fois lorsque 30% de l'élément est visible
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section TNK SYNERGIES LTD */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
          {/* Image TNK - Côté gauche */}
          <div className="lg:w-1/2 flex justify-center lg:justify-start">
            <img 
              src={tnkImage} 
              alt="TNK Synergies" 
              className="w-full max-w-xl h-auto rounded-lg shadow-lg" // max-w pour ne pas être trop grand, arrondi et ombre légère
            />
          </div>

          {/* Contenu TNK SYNERGIES LTD - Côté droit */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-2xl md:text-2xl font-bold text-white mb-4 leading-tight">
              TNK SYNERGIES LTD : l'entreprise qui révolutionne l'Afrique numérique
            </h2>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              TNK SYNERGIES LTD n'est pas une entreprise technologique comme les autres. Fondée en 2024 par une équipe
              d'entrepreneurs africains expérimentés, notre société s'est donnée pour mission de créer les solutions numériques qui
              manquent à l'Afrique francophone.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>Site web :</strong> <a href="https://www.tnksynergies.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-300">www.tnksynergies.com</a></p>
              <p><strong>LinkedIn :</strong> TNK SYNERGIES LTD (5000+ followers)</p>
              <p><strong>Facebook :</strong> @TNKSynergies (10K+ likes)</p>
              <p><strong>Instagram :</strong> @tnk_synergies (8K+ followers)</p>
            </div>
          </div>
        </div>

        {/* Section Nos différents partenaires */}
        <div className="pt-5 border-t border-white"> {/* Séparateur et padding supérieur */}
          <h2 className="text-xl md:text-4xl font-semibold text-center text-white mb-12">
            Nos différents partenaires
          </h2>
          <div className="flex flex-col md:flex-row justify-around items-center gap-12">
            <p className=" font-semibold">TNK Synergies</p>
            <p className=" font-semibold">Apple</p>
            <p className=" font-semibold">Microsoft</p>
          </div>
        </div>

      </div>
      </motion.section>
    </section>
  );
};

export default PartnersSection;