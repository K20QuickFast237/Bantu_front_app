import React from 'react';
import personnesImage from '../assets/personnes.png'; // Assurez-vous que le chemin est correct
import compagnyImage from '../assets/compagny.png';   // Assurez-vous que le chemin est correct
import { motion } from 'framer-motion';

const AboutSection = () => {
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
              alt="Notre Équipe" 
              className="w-full max-w-lg h-auto" 
            />
          </div>

          {/* Contenu "Qui sommes-nous ?" - Côté droit */}
          <div className="lg:w-1/2 bg-[#D1FAE5] rounded-lg p-6 md:p-8 shadow-md">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              Qui sommes-nous ?
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Bantulink n'est pas qu'une simple plateforme numérique. C'est la révolution technologique qui 
              transforme l'Afrique francophone en connectant les talents aux opportunités et en démocratisant 
              le commerce électronique.
            </p>
            <ul className="space-y-1">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Révolution numérique en Afrique francophone.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Connexion de talents aux opportunités.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-700">Démocratisation du commerce électronique.</span>
              </li>
            </ul>
            <button className="mt-8 px-6 py-3 bg-gray-800 text-white font-semibold rounded-3xl hover:bg-gray-700 transition-colors duration-200">
              Découvrir Nos Projets
            </button>
          </div>
        </div>

        {/* Section inférieure : Mission et Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Blocs Mission et Vision - Côté gauche (sur desktop) */}
          <div className="flex flex-col gap-8 lg:order-1"> {/* order-1 pour être à gauche sur lg */}
            <div className="bg-[#D1FAE5] rounded-lg p-6 md:p-8 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Notre Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                Connecter les talents avec les opportunités et simplifier le commerce en ligne pour tous les africains francophones.
                Nous créons des ponts numériques entre employeurs et candidats, vendeurs et acheteurs.
              </p>
            </div>
            <div className="bg-[#1C2F6B] text-white rounded-lg p-6 md:p-8 shadow-md"> {/* Couleur de fond spécifique */}
              <h3 className="text-xl font-bold mb-4">Notre Vision</h3>
              <p className="leading-relaxed">
                Devenir la super application de référence en Afrique francophone, facilitant l'emploi et le commerce pour des
                millions d'utilisateurs d'ici 2027.
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