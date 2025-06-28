import React from 'react';
import { MessageSquare, Mail, Clock, CheckCircle, Zap } from 'lucide-react'; // Icônes de Lucide React

// Sous-composant pour les petits blocs d'information du bas
const InfoBlock = ({ icon: Icon, iconBgColor, iconColor, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center px-4">
      {/* Conteneur de l'icône */}
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4 relative"
        style={{ backgroundColor: iconBgColor }} // Couleur de fond du cercle de l'icône
      >
        <Icon className="w-8 h-8" style={{ color: iconColor }} strokeWidth={1.75} /> {/* Icône */}
        {/* Ombre de l'icône - si nécessaire, ajuster avec un pseudo-élément ou un filtre */}
        {/* Pour l'instant, on se base sur l'ombre générée par le cercle lui-même ou le composant icon */}
      </div>

      <h3 className="text-base font-semibold text-gray-900 mb-1">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">
        {description}
      </p>
    </div>
  );
};

const HelpContactSection = () => {
  return (
    <section className="flex justify-center bg-gray-50 items-center py-16 ">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-lg
       p-8 sm:py-12 md:p-16 w-full max-w-5xl text-center">
        
        {/* Titre et description de la section */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
          Besoin D'aide ?
        </h2>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto mb-12">
          Vous ne trouvez pas ce que vous cherchez ? Notre équipe de support dédiée est prête à
          vous aider avec toutes les questions ou préoccupations que vous pourriez avoir.
        </p>

        {/* Boutons de contact */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          {/* Bouton "Démarrer un chat en direct" */}
          <button 
            className="flex items-center justify-center py-3 px-6 rounded-lg text-white font-semibold shadow-md
                       transition duration-300 ease-in-out hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            style={{ 
              background: 'linear-gradient(to right, #4A90E2, #6B8EFA)', // Dégradé bleu
              boxShadow: '0 4px 10px rgba(74, 144, 226, 0.4)' // Ombre bleue
            }}
          >
            <MessageSquare className="w-5 h-5 mr-2" /> Démarrer un chat en direct
          </button>

          {/* Bouton "Email Support" */}
          <button 
            className="flex items-center justify-center py-3 px-6 rounded-lg text-white font-semibold shadow-md
                       transition duration-300 ease-in-out hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            style={{ 
              background: 'linear-gradient(to right, #FF8C00, #FFA500)', // Dégradé orange
              boxShadow: '0 4px 10px rgba(255, 140, 0, 0.4)' // Ombre orange
            }}
          >
            <Mail className="w-5 h-5 mr-2" /> Email Support
          </button>
        </div>

        {/* Blocs d'informations (Réponse rapide, Support expert, Disponible 24/7) */}
        <div className="flex flex-col sm:flex-row justify-center items-start gap-8 md:gap-12">
          <InfoBlock 
            icon={Clock} 
            iconBgColor="rgba(204, 219, 255, 0.3)" // Très léger bleu transparent
            iconColor="#4A90E2" // Bleu de l'icône
            title="Réponse rapide" 
            description="Temps de réponse moyen inférieur à 2 heures" 
          />
          <InfoBlock 
            icon={CheckCircle} // Icône CheckCircle comme substitut pour l'icône avec le "check"
            iconBgColor="rgba(255, 236, 179, 0.3)" // Très léger orange transparent
            iconColor="#F5A623" // Orange de l'icône
            title="Support expert" 
            description="Équipe compétente prête à aider" 
          />
          <InfoBlock 
            icon={Zap} // Icône Zap (éclair) comme substitut pour l'icône d'énergie
            iconBgColor="rgba(215, 255, 215, 0.3)" // Très léger vert transparent (pour l'icône verte)
            iconColor="#7ED321" // Vert de l'icône
            title="Disponible 24/7" 
            description="Assistance 24 heures sur 24" 
          />
        </div>

      </div>
    </section>
  );
};

export default HelpContactSection;