import React from 'react';
import v1Image from '../assets/v1.png'; 
import v2Image from '../assets/v2.png'; 
import v3Image from '../assets/v3.png'; 
import v4Image from '../assets/v4.png'; // Icône Sécurité 2
import demicercleImage from '../assets/demicercle.png'; // Image du demi-cercle

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"> {/* Ajustement du gap pour l'espacement des cartes */}
          {valeurs.map((valeur) => (
            <div 
              key={valeur.id}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-start text-left transform hover:scale-105 transition-transform duration-300" // p-8 pour plus de padding, rounded-xl pour plus d'arrondi, shadow-lg pour une ombre plus prononcée
            >
              {/* Icône hexagonale avec les couleurs de fond spécifiques */}
              <div className="flex justify-center mb-6 w-full"> {/* w-full pour centrer l'hexagone */}
                <div 
                  className={`${valeur.bgColor} w-24 h-24 flex items-center justify-center`} // Taille ajustée pour l'hexagone extérieur
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                  }}
                >
                  <div 
                    className={`${valeur.iconBg} w-16 h-16 flex items-center justify-center`} // Taille ajustée pour l'hexagone intérieur
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                  >
                    <img 
                      src={valeur.image} // Utilisation de l'import direct
                      alt={valeur.title}
                      className="w-10 h-10 object-contain" // Taille de l'icône à l'intérieur de l'hexagone
                    />
                  </div>
                </div>
              </div>

              {/* Contenu de la carte */}
              <div className="text-center w-full"> {/* w-full pour centrer le contenu textuel */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {valeur.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {valeur.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;