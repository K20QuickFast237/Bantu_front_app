import React from 'react';
import { ChevronRight } from 'lucide-react'; // Icône pour la flèche droite

// Sous-composant pour chaque carte de sujet d'aide
const TopicCard = ({ title, category, categoryColor, views }) => {
  return (
    <div className="bg-gray-100 rounded-xl border border-gray-100 px-6 py-4 flex flex-col justify-between 
                  transition-all duration-300 ease-in-out hover:shadow-lg hover:border-gray-200 cursor-pointer h-full">
      {/* Contenu supérieur de la carte (titre et flèche) */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm text-left font-semibold text-gray-900 leading-snug pr-4"> {/* pr-4 pour espace avant la flèche */}
          {title}
        </h3>
        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" /> {/* Icône de la flèche */}
      </div>

      {/* Contenu inférieur (catégorie et vues) */}
      <div className="flex justify-between items-start text-sm mt-auto"> {/* mt-auto pousse au bas */}
        <div className="flex items-center">
          
          <span className="text-orange-600 text-xs font-medium">
            {category}
          </span>
        </div>
        <span className="text-gray-500">
          {views}
        </span>
      </div>
    </div>
  );
};

const PopularHelpTopics = () => {
  const topics = [
    {
      title: 'Comment réinitialiser mon mot de passe ?',
      category: 'Compte et Connexion',
      categoryColor: '#4A90E2', // Bleu clair comme sur l'image pour cette catégorie
      views: '2.3k vues',
    },
    {
      title: 'Méthodes de paiement acceptées',
      category: 'Commandes et paiements',
      categoryColor: '#F5A623', // Orange clair comme sur l'image pour cette catégorie
      views: '1.8k vues',
    },
    {
      title: 'Comment postuler pour des emplois',
      category: 'Emplois et candidatures',
      categoryColor: '#7ED321', // Vert clair comme sur l'image pour cette catégorie
      views: '3.1k vues',
    },
    {
      title: 'Signaler du contenu inapproprié',
      category: 'Litiges et support client',
      categoryColor: '#D0021B', // Rouge clair comme sur l'image pour cette catégorie
      views: '1.2k vues',
    },
    {
      title: 'Processus de vérification de compte',
      category: 'Compte et Connexion',
      categoryColor: '#4A90E2', // Bleu clair
      views: '2.7k vues',
    },
    {
      title: 'Politique et processus de remboursement',
      category: 'Commandes et paiements',
      categoryColor: '#F5A623', // Orange clair
      views: '1.9k vues',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          Sujets D'aide Populaires
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
          Accès rapide aux sujets d'aide et solutions les plus recherchés de
          notre communauté.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Grille 2x3 ou 3x2 */}
          {topics.map((topic, index) => (
            <TopicCard
              key={index}
              title={topic.title}
              category={topic.category}
              categoryColor={topic.categoryColor}
              views={topic.views}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularHelpTopics;