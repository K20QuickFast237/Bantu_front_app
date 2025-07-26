import React from 'react';
import v1Image from '../../assets/v1.png'; 
import v2Image from '../../assets/v2.png'; 
import v3Image from '../../assets/v3.png'; 
import v4Image from '../../assets/v4.png'; // Icône Sécurité 2
import demicercleImage from '../../assets/demicercle.png'; // Image du demi-cercle
import { motion } from 'framer-motion';

const CoreValuesSection = () => {
  // Ajustement des couleurs pour qu'elles correspondent précisément à la maquette
  const valeurs = [
    {
      id: 1,
      title: "Sécurité",
      description: "La sécurité n'est pas une option chez BantuLink, c'est notre priorité absolue. Dans un environnement numérique où la confiance est fragile, nous avons choisi d'investir massivement dans les technologies de sécurité les plus avancées.",
      image: v1Image, // Utilisation de l'import d'image
      // Couleurs spécifiques pour le fond des hexagones pour 'Sécurité' (bleu clair/blanc)
      bgColor: "bg-[#E0F7FA]", // Couleur de fond extérieure plus claire
      iconBg: "bg-white"        // Couleur de fond intérieure blanche
    },
    {
      id: 2,
      title: "Innovation",
      description: "L'innovation est dans notre ADN. Nous ne nous contentons pas de suivre les tendances technologiques mondiales : nous les anticipons et les adaptons aux besoins spécifiques de l'Afrique francophone.",
      image: v2Image, // Utilisation de l'import d'image
      // Couleurs spécifiques pour le fond des hexagones pour 'Innovation' (vert très clair/blanc)
      bgColor: "bg-[#E8F5E9]", // Couleur de fond extérieure plus claire
      iconBg: "bg-white"        // Couleur de fond intérieure blanche
    },
    {
      id: 3,
      title: "Inclusion",
      description: "L'inclusion n'est pas un concept marketing chez BantuLink : Nous construisons une plateforme où chaque Africain francophone, quel que soit son niveau éducatif, ses ressources, peut accéder aux opportunités numériques.",
      image: v3Image, // Utilisation de l'import d'image
      // Couleurs spécifiques pour le fond des hexagones pour 'Inclusion' (jaune très clair/blanc)
      bgColor: "bg-[#FFFDE7]", // Couleur de fond extérieure plus claire
      iconBg: "bg-white"        // Couleur de fond intérieure blanche
    },
    {
      id: 4,
      title: "Sécurité", // Titre répété comme sur la maquette
      description: "La sécurité n'est pas une option chez BantuLink, c'est notre priorité absolue. Dans un environnement numérique où la confiance est fragile, nous avons choisi d'investir massivement dans les technologies de sécurité les plus avancées.",
      image: v4Image, // Utilisation de l'import d'image
      // Couleurs spécifiques pour le fond des hexagones pour la deuxième 'Sécurité' (rose très clair/blanc)
      bgColor: "bg-[#FCE4EC]", // Couleur de fond extérieure plus claire
      iconBg: "bg-white"        // Couleur de fond intérieure blanche
    }
  ];

  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden"> {/* Léger fond gris pour correspondre au visuel */}
      
      {/* Demi-cercle décoratif en haut à droite avec l'image */}
      <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }} // Anime une seule fois lorsque 30% de l'élément est visible
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
      <div 
        className="absolute top-0 right-0 w-80 h-80 opacity-60" // Ajustement de la taille et de l'opacité
        style={{ 
          transform: 'translate(40%, -40%)', // Décalage pour simuler le demi-cercle visible
          zIndex: 0 
        }}
      >
        <img 
          src={demicercleImage} 
          alt="Décoration Demi-cercle" 
          className="w-full h-full object-contain" // Utilisation de l'image
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Titre de la section avec les lignes décoratives */}
        <div className="flex items-center justify-center mb-16">
          <hr className="w-16 h-1 bg-red-600 border-0 rounded-full mx-4" /> {/* Ligne gauche */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center whitespace-nowrap">
            Nos valeurs fondamentales
          </h2>
          <hr className="w-16 h-1 bg-red-600 border-0 rounded-full mx-4" /> {/* Ligne droite */}
        </div>

        {/* Grille des cartes de valeurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 bg-gray-900 p-6 rounded-2xl">
  {valeurs.map((valeur, index) => (
    <div 
      key={valeur.id} 
      className="group relative overflow-hidden"
      style={{ 
        animationDelay: `${index * 0.2}s`,
        animation: 'glitchIn 0.8s ease-out forwards'
      }}
    >
      {/* Carte cyberpunk */}
      <div className="relative bg-blue-800/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 h-full transform transition-all duration-400 hover:scale-[1.01] hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-500/20">
        
        {/* Grille de fond futuriste */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-400"
             style={{
               backgroundImage: `linear-gradient(rgba(0,191,255,0.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(0,191,255,0.1) 1px, transparent 1px)`,
               backgroundSize: '16px 16px'
             }}>
        </div>
        
        {/* Effets lumineux */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
        <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-transparent via-red-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600"></div>
        
        {/* Contenu de la carte */}
        <div className="relative z-10 flex flex-col h-full">
          
          {/* Icône futuriste */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Hexagone principal */}
              <div className={`${valeur.bgColor} w-24 h-24 flex items-center justify-center transform group-hover:rotate-180 transition-all duration-600`}
                   style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                <div className={`${valeur.iconBg} w-16 h-16 flex items-center justify-center transform group-hover:-rotate-180 transition-all duration-600`}
                     style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                  <img 
                    src={valeur.image}
                    alt={valeur.title}
                    className="w-10 h-10 object-contain filter brightness-110 contrast-110 saturate-150 group-hover:drop-shadow-[0_0_6px_rgba(0,191,255,0.5)] transition-all duration-200"
                  />
                </div>
              </div>
              
              {/* Anneaux lumineux */}
              <div className="absolute inset-0 border-1.5 border-green-400/30 rounded-full animate-pulse group-hover:border-green-300/60 transition-colors duration-200"></div>
              <div className="absolute inset-0 border border-yellow-400/20 rounded-full scale-110 animate-pulse group-hover:border-yellow-300/40 transition-colors duration-400"></div>
            </div>
          </div>
          
          {/* Contenu textuel cyberpunk */}
          <div className="text-center flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-200 drop-shadow-[0_0_8px_rgba(0,191,255,0.2)]">
                {valeur.title}
              </h3>
              
              {/* Ligne énergétique */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-red-400 mx-auto mb-4 rounded-full group-hover:w-20 group-hover:h-0.75 group-hover:shadow-[0_0_8px_rgba(0,191,255,0.4)] transition-all duration-400"></div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed font-medium group-hover:text-gray-300 transition-colors duration-200">
              {valeur.description}
            </p>
          </div>
          
          {/* Indicateur holographique */}
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse group-hover:bg-red-400 transition-colors duration-200"
                     style={{ animationDelay: `${i * 0.15}s` }}></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scanlines effet */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-400 pointer-events-none"
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
    </div>
  ))}
</div>

<style jsx>{`
  @keyframes glitchIn {
    0% {
      opacity: 0;
      transform: translateX(40px) rotateY(-70deg);
    }
    50% {
      opacity: 0.4;
      transform: translateX(-8px) rotateY(8deg);
    }
    100% {
      opacity: 1;
      transform: translateX(0) rotateY(0deg);
    }
  }
`}</style>


      </div>
      </motion.section>
    </section>
  );
};

export default CoreValuesSection;