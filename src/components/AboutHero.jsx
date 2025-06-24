import React from 'react';
import aboutHeroImage from '../assets/aboutHero.png'; // Importe l'image depuis le dossier assets

const AboutHero = () => {
  return (
    <section 
      className="relative w-full h-80 md:h-96 flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `url(${aboutHeroImage})`, // Utilise la variable importée pour l'image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay avec dégradé et opacité pour que le texte soit lisible, comme sur l'image */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div> 
      <div className="absolute inset-0 bg-black opacity-30"></div> {/* Assombrit légèrement l'image */}

      {/* Contenu de la section hero */}
      <div className="relative z-10 p-4">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wide">
          A PROPOS
        </h1>
      </div>
    </section>
  );
};

export default AboutHero;