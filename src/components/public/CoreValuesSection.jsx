import React from 'react';
import v1Image from '../../assets/v1.png'; 
import v2Image from '../../assets/v2.png'; 
import v3Image from '../../assets/v3.png'; 
import v4Image from '../../assets/v4.png'; // Icône Sécurité 2
import demicercleImage from '../../assets/demicercle.png'; // Image du demi-cercle
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Ajout

const CoreValuesSection = () => {
  const { t } = useTranslation(); // Hook i18n
  // Ajustement des couleurs pour qu'elles correspondent précisément à la maquette
  const valeurs = [
    {
      id: 1,
      title: t('coreValues.security.title'),
      description: t('coreValues.security.description'),
      image: v1Image, // Utilisation de l'import d'image
      // Couleurs spécifiques pour le fond des hexagones pour 'Sécurité' (bleu clair/blanc)
      bgColor: "bg-[#E0F7FA]", // Couleur de fond extérieure plus claire
      iconBg: "bg-white"        // Couleur de fond intérieure blanche
    },
    {
      id: 2,
      title: t('coreValues.innovation.title'),
      description: t('coreValues.innovation.description'),
      image: v2Image, // Utilisation de l'import d'image
      // Couleurs spécifiques pour le fond des hexagones pour 'Innovation' (vert très clair/blanc)
      bgColor: "bg-[#E8F5E9]", // Couleur de fond extérieure plus claire
      iconBg: "bg-white"        // Couleur de fond intérieure blanche
    },
    {
      id: 3,
      title: t('coreValues.inclusion.title'),
      description: t('coreValues.inclusion.description'),
      image: v3Image, // Utilisation de l'import d'image
      // Couleurs spécifiques pour le fond des hexagones pour 'Inclusion' (jaune clair/blanc)
      bgColor: "bg-[#FFF8E1]", // Couleur de fond extérieure plus claire
      iconBg: "bg-white"        // Couleur de fond intérieure blanche
    },
    {
      id: 4,
      title: t('coreValues.excellence.title'),
      description: t('coreValues.excellence.description'),
      image: v4Image, // Utilisation de l'import d'image
      // Couleurs spécifiques pour le fond des hexagones pour 'Excellence' (rose clair/blanc)
      bgColor: "bg-[#FCE4EC]", // Couleur de fond extérieure plus claire
      iconBg: "bg-white"        // Couleur de fond intérieure blanche
    }
  ];

  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('coreValues.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
          {valeurs.map((valeur, index) => (
            <motion.div
              key={valeur.id}
              className={`group relative overflow-hidden rounded-2xl p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${valeur.bgColor}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Fond hexagonal avec image */}
              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent rounded-2xl"></div>
                <img 
                  src={valeur.image} 
                  alt={valeur.title}
                  className="relative z-10 w-16 h-16 md:w-20 md:h-20 object-contain ${valeur.iconBg}"
                />
              </div>

              {/* Titre */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center group-hover:text-blue-600 transition-colors duration-300">
                {valeur.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm md:text-base leading-relaxed text-center group-hover:text-gray-700 transition-colors duration-300">
                {valeur.description}
              </p>

              {/* Bordure animée */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/50 pointer-events-none"></div>

              {/* Barre de progression animée */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-red-400 mx-auto mb-4 rounded-full group-hover:w-20 group-hover:h-0.75 group-hover:shadow-[0_0_8px_rgba(0,191,255,0.4)] transition-all duration-400"></div>
              
              {/* Indicateur holographique */}
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse group-hover:bg-red-400 transition-colors duration-200"
                         style={{ animationDelay: `${i * 0.15}s` }}></div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scanlines effet global */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
             style={{
               background: `repeating-linear-gradient(
                 0deg,
                 transparent,
                 transparent 1.5px,
                 rgba(0,191,255,0.02) 1.5px,
                 rgba(0,191,255,0.02) 3px
               )`
             }}>
        </div>
      </div>
      </motion.section>
    </section>
  );
};

export default CoreValuesSection;