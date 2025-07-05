// AutresRessources.jsx
import React from 'react';
import { Download, Link, Linkedin, Globe, Github } from 'lucide-react'; 
import { motion } from 'framer-motion';

const AutresRessources = () => {
  // Données d'exemple pour les ressources
  const ressourcesData = {
    cv: { name: "Cv_TADZONG MBIPE Abraham.pdf", url: "#" }, // '#' pour l'exemple, remplacer par le vrai lien
    siteInternet: "Non renseigné",
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
        viewport={{ once: true, amount: 0.1 }} // Anime une seule fois lorsque 30% de l'élément est visible
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
      <div className="flex justify-between items-center mb-6  pb-4">
        <h2 className="text-xl font-semibold text-blue-800" >Autres Ressources</h2> {/* Couleur bleue pour le titre */}
        {/* Pas de bouton "Modifier" ici selon l'image */}
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-sm text-gray-700"> {/* Ajustement des colonnes et des gaps */}
        {/* CV Row */}
        <div className="flex items-center">
          <p className="w-24 text-gray-700 font-medium mr-4">Cv</p> {/* Largeur fixe pour aligner */}
          <div className="flex items-center bg-emerald-50 text-emerald-800 px-3 py-1 rounded-md text-xs mr-2 border border-emerald-200">
            {/* Utilisez 'Link' comme icône générale pour le CV si 'File' n'est pas dispo et qu'il faut un visuel de lien */}
            <Link size={14} className="mr-1 text-emerald-700" />
            {ressourcesData.cv.name}
          </div>
          <a href={ressourcesData.cv.url} download className="text-gray-500 hover:text-gray-700">
            <Download size={20} /> {/* Icône de téléchargement */}
          </a>
        </div>

        {/* Site Internet / Portofolio Row */}
        <div className="flex items-center col-span-2"> {/* Prend 2 colonnes si le layout est en grille */}
          <p className="w-24 text-gray-700 font-medium mr-4">Site internet / Portofolio</p>
          <span>{ressourcesData.siteInternet}</span>
        </div>

        {/* LinkedIn Row */}
        <div className="flex items-center col-span-2">
          <p className="w-24 text-gray-700 font-medium mr-4">LinkedIn</p>
          <a href={ressourcesData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {ressourcesData.linkedin}
          </a>
        </div>

        {/* Behance Row */}
        <div className="flex items-center col-span-2">
          <p className="w-24 text-gray-700 font-medium mr-4">Behance</p>
          <a href={ressourcesData.behance} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {ressourcesData.behance}
          </a>
        </div>

        {/* GitHub Row */}
        <div className="flex items-center col-span-2">
          <p className="w-24 text-gray-700 font-medium mr-4">GitHub</p>
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