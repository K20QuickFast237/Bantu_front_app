import React from 'react';
import Fleche2Icon from '../assets/fleche2.png'; // La flèche bleue
import GraffitiRedIcon from '../assets/Grafitti.png'; // Les marques rouges

const FAQ = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between">
        {/* Section de gauche : Question pour Bantulink et formulaire */}
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 relative">
          <img
            src={GraffitiRedIcon}
            alt="Decorative graffiti lines"
            className="absolute top-[-40px] right-44 w-16 h-auto rotate-12" // Position et taille ajustées
          />
          <h2 className="text-4xl font-bold text-gray-900 mb-4 relative z-10">
            J'ai Une Question<br />Pour Bantulink
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Si vous avez des questions, nous y répondrons.
          </p>
          <div className="flex flex-row items-center w-full max-w-sm border border-gray-300 rounded-full overflow-hidden p-1 bg-white shadow-sm">
      <input
        type="email"
        placeholder="Enter Votre Email"
        className="flex-grow p-2 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
        
      />
      <button className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-200 focus:outline-none">
        S'inscrire
      </button>
    </div>
        </div>

        {/* Section de droite : Questions/Réponses fréquentes */}
        <div className="w-full lg:w-1/2 lg:pl-16">
          <h3 className="text-xl font-semibold text-gray-800 mb-8">
            Peut-Être Que Votre Question A Reçu <br /> Une Réponse, Vérifiez-La
          </h3>
          <div className="space-y-6">
            {[
              "C'est Quoi Bantulink ?",
              "Quels Sont Les Services Que Vous Proposez ?",
              "Comment Y Accéder ?",
            ].map((question, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                <p className="text-gray-700 text-lg">{question}</p>
                <img
                  src={Fleche2Icon}
                  alt="Arrow icon"
                  className="w-6 h-6 ml-4 flex-shrink-0" // Ajustez la taille selon l'image
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;