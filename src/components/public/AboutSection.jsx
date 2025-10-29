import React from 'react';
import personnesImage from '../../assets/personnes.png'; // Assurez-vous que le chemin est correct
import compagnyImage from '../../assets/compagny.png';   // Assurez-vous que le chemin est correct
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Ajout

const AboutSection = () => {
  const { t } = useTranslation(); // Hook i18n

  return (
    <section className="py-16 bg-white">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }} // Anime une seule fois lorsque 30% de l'élément est visible
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section supérieure : Qui sommes-nous ? */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
          {/* Image des personnes - Côté gauche */}
          <div className="lg:w-1/2 flex justify-center lg:justify-start">
            <img 
              src={personnesImage} 
              alt={t('about.whoWeAre.title')} 
              className="w-full max-w-lg h-auto" 
            />
          </div>

          {/* Contenu "Qui sommes-nous ?" - Côté droit */}
          <div className="lg:w-1/2 bg-[#D1FAE5] rounded-lg p-6 md:p-8 shadow-md">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              {t('about.whoWeAre.title')}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('about.whoWeAre.description')}
            </p>
          </div>
        </div>

        {/* Section inférieure : Mission et Vision */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Blocs Mission et Vision - Côté gauche (sur desktop) */}
          <div className="flex flex-col gap-8 lg:order-1"> {/* order-1 pour être à gauche sur lg */}
            <div className="bg-[#D1FAE5] rounded-lg p-6 md:p-8 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t('about.mission.title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.mission.description')}
              </p>
            </div>
            <div className="bg-[#1C2F6B] text-white rounded-lg p-6 md:p-8 shadow-md"> {/* Couleur de fond spécifique */}
              <h3 className="text-xl font-bold mb-4">{t('about.vision.title')}</h3>
              <p className="leading-relaxed">
                {t('about.vision.description')}
              </p>
            </div>
          </div>

          {/* Image de l'entreprise - Côté droit (sur desktop) */}
          <div className="lg:order-2 flex justify-center lg:justify-end"> {/* order-2 pour être à droite sur lg */}
            <img 
              src={compagnyImage} 
              alt="Notre Entreprise" 
              className="w-full max-w-lg h-auto" 
            />
          </div>
        </div>
      </div>
      </motion.section>
    </section>
  );
};

export default AboutSection;