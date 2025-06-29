import React from 'react';
import { User, ShoppingCart, Briefcase, Clock } from 'lucide-react'; // Icônes de Lucide React
import { motion } from 'framer-motion';

// Sous-composant pour chaque carte de catégorie afin de simplifier le code
const CategoryCard = ({ icon: Icon, bgColor, iconColor, title, description }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 px-6 py-6 flex flex-col items-center text-center 
                  transition-all duration-300 ease-in-out hover:shadow-lg hover:border-gray-200 cursor-pointer">
      {/* Conteneur de l'icône avec le dégradé de fond */}
      <div className="relative w-20 h-20 rounded-full flex items-center justify-center mb-6 overflow-hidden"
           style={{ background: bgColor }}>
        <Icon className="w-10 h-10" style={{ color: iconColor }} strokeWidth={1.75} /> {/* Couleur de l'icône */}
      </div>

      <h3 className="text-sm font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-xs leading-relaxed mb-4">
        {description}
      </p>
      <a href="#" className="flex items-center text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors">
        Explorer les sujets <ArrowRight className="w-4 h-4 ml-1" />
      </a>
    </div>
  );
};

// Icône ArrowRight de Lucide React pour le lien "Explorer les sujets"
const ArrowRight = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);


const BrowseByCategory = () => {
  const categories = [
    {
      icon: User,
      bgColor: 'linear-gradient(135deg, #E6F0FF 0%, #CCD9FF 100%)', // Bleu clair
      iconColor: '#4A90E2', // Bleu de l'icône
      title: 'Compte & Connexion',
      description: 'Gérez les paramètres de votre compte, la récupération de mot de passe et les problèmes de connexion.',
    },
    {
      icon: ShoppingCart,
      bgColor: 'linear-gradient(135deg, #FFF0E6 0%, #FFD9CC 100%)', // Orange clair
      iconColor: '#F5A623', // Orange de l'icône
      title: 'Commandes & Paiements',
      description: 'Suivre les commandes, les méthodes de paiement, les questions de facturation et les remboursements',
    },
    {
      icon: Briefcase,
      bgColor: 'linear-gradient(135deg, #E6FFE6 0%, #CCFFCC 100%)', // Vert clair
      iconColor: '#7ED321', // Vert de l'icône
      title: 'Emplois & Candidatures',
      description: 'Trouvez de l\'aide avec les annonces d\'emploi, les candidatures et les processus de recrutement.',
    },
    {
      icon: Clock, // Remplacée par Clock car Lucide n'a pas exactement l'icône 'timer' ou 'alert' visible sur l'image
      bgColor: 'linear-gradient(135deg, #FFEBE6 0%, #FFCCCC 100%)', // Rouge clair
      iconColor: '#D0021B', // Rouge de l'icône
      title: 'Litiges & Support Client',
      description: 'Signalez des problèmes, résolvez des litiges et obtenez de l\'assistance pour le support client.',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }} // Anime une seule fois lorsque 30% de l'élément est visible
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          Parcourir Par Catégorie
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
          Choisissez une catégorie ci-dessous pour trouver des sujets d'aide spécifiques et
          des questions fréquemment posées adaptées à vos besoins.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              bgColor={category.bgColor}
              iconColor={category.iconColor}
              title={category.title}
              description={category.description}
            />
          ))}
        </div>
      </div>
      </motion.section>
    </section>
  );
};

export default BrowseByCategory;