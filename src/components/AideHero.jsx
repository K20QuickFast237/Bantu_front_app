import React from 'react';
// Importez l'image de fond. Ajustez le chemin si nécessaire.
import AideBg from '../assets/aide1.png'; 
import { motion } from 'framer-motion';

const AideHero = () => {
  return (
    <section className="flex justify-center items-center pt-20 ">
      {/* Conteneur principal avec image de fond et superposition de couleur */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }} // Anime une seule fois lorsque 30% de l'élément est visible
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
      <div
        className="relative rounded-3xl w-full max-w-6xl h-[550px] sm:h-[600px] 
        flex flex-col items-center justify-center text-center overflow-hidden shadow-xl px-48"
        style={{
          backgroundImage: `url(${AideBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // La couleur de fond est laissée ici si l'image aide1.png n'a pas déjà l'effet désiré
          // Si l'image inclut déjà l'opacité et la teinte, cette couleur peut être retirée.
          backgroundColor: '#959CC8', 
        }}
      >
        {/* Contenu - Assurez-vous qu'il est au-dessus de l'overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl">
          {/* Tag "Support disponible 24/7" */}
          <div className="bg-[#B9E6FF] text-[#1E90FF] text-xs font-semibold py-1.5 px-4 rounded-full mb-6 shadow-md whitespace-nowrap">
            Support disponible 24/7
          </div>

          {/* Titre */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#36D18C] leading-tight mb-4 ">
            Centre d'aide BantuLink
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-700 opacity-90 max-w-2xl mb-10 px-4">
            Trouvez des réponses à vos questions et obtenez le soutien dont vous avez
            besoin. Nous sommes ici pour vous aider à réussir dans votre parcours.
          </p>

          {/* Barre de recherche - CORRECTION MAJEURE */}
          <div className="relative w-full max-w-xl mb-8 shadow-md rounded-2xl overflow-hidden border border-gray-200"> {/* Conteneur blanc avec ombre et bordure */}
            <input
              type="text"
              placeholder="Recherchez un sujet ou un mot-clé..."
              className="w-full py-5 pl-6 pr-32 text-gray-800 placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                         bg-white rounded-2xl" // Assurez-vous que l'input a un fond blanc et les mêmes arrondis
            />
            <button className="absolute inset-y-0 top-2 bottom-2 right-2 bg-blue-600 text-white font-semibold 
                               py-2 px-4 sm:px-8 rounded-2xl transition duration-300 ease-in-out 
                               hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
              Rechercher
            </button>
          </div>

          {/* Recherches populaires */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white opacity-90 px-4">
            <span className="font-medium text-gray-600">Recherches populaires :</span>
            <a href="#" className="underline font-medium text-xs text-blue-500 hover:text-blue-800 transition-colors">Réinitialisation du mot de passe</a>
            <a href="#" className="underline font-medium text-xs text-blue-500 hover:text-blue-800 transition-colors">Problèmes de paiement</a>
            <a href="#" className="underline font-medium text-xs text-blue-500 hover:text-blue-800 transition-colors">Candidatures</a>
          </div>
        </div>
      </div>
      </motion.section>
    </section>
  );
};

export default AideHero;