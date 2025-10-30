// AutresRessources.jsx
import React from 'react';
import { Download, Link, Linkedin, Globe, Github } from 'lucide-react'; 
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Ajout

const AutresRessources = () => {
  const { t } = useTranslation(); // Hook i18n

  // Données d'exemple pour les ressources
  const ressourcesData = {
    siteInternet: t('profile.otherResources.notProvided'),
    linkedin: "https://www.linkedin.com/in/atomabraham/",
    behance: "https://www.behance.net/abrahamtadzong",
    github: "https://github.com/atomabraham",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-[95%] mx-auto my-8 border border-gray-200">
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
      <div className="flex justify-between items-center mb-6  pb-4">
        <h2 className="text-xl font-semibold text-blue-800" >{t('profile.otherResources.title')}</h2>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-sm text-gray-700">
        {/* Site Internet / Portofolio Row */}
        <div className="flex items-center col-span-2">
          <p className="w-24 text-gray-700 font-medium mr-4">{t('profile.otherResources.website')}</p>
          <span>{ressourcesData.siteInternet}</span>
        </div>

        {/* LinkedIn Row */}
        <div className="flex items-center col-span-2">
          <p className="w-24 text-gray-700 font-medium mr-4">{t('profile.otherResources.linkedin')}</p>
          <a href={ressourcesData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {ressourcesData.linkedin}
          </a>
        </div>

        {/* Behance Row */}
        <div className="flex items-center col-span-2">
          <p className="w-24 text-gray-700 font-medium mr-4">{t('profile.otherResources.behance')}</p>
          <a href={ressourcesData.behance} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {ressourcesData.behance}
          </a>
        </div>

        {/* GitHub Row */}
        <div className="flex items-center col-span-2">
          <p className="w-24 text-gray-700 font-medium mr-4">{t('profile.otherResources.github')}</p>
          <a href={ressourcesData.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {ressourcesData.github}
          </a>
        </div>
      </div>
      </motion.section>
    </div>
  );
};

export default AutresRessources;