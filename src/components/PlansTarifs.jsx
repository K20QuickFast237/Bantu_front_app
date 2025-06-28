import React from 'react';
import { Check } from 'lucide-react'; // Importez l'icône Check de Lucide React

const PlansTarifs = () => {
  return (
    <section className="bg-white  sm:pt-18 sm:pb-6 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Titre et sous-titre */}
      <div className="text-center mb-16 max-w-3xl">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Plans Flexibles Pour Chaque Utilisateur
        </h2>
        <p className="text-lg text-gray-600">
          Que vous soyez recruteur, freelance, vendeur ou acheteur, choisissez le plan qui correspond à vos besoins.
        </p>
      </div>

      {/* Cartes des tarifs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 max-w-7xl w-full">

        {/* Carte Basique */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col justify-between items-center text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Basique</h3>
          <p className="text-4xl font-extrabold text-gray-900 mb-4">Gratuit</p>
          <p className="text-sm text-gray-500 mb-8 max-w-xs">
            Parfait pour commencer avec les fonctionnalités de base en matière de mise en réseau.
          </p>

          <ul className="text-left text-gray-700 space-y-3 mb-10 w-full px-4">
            <li className="flex items-center">
              <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" /> Jusqu'à 50 connexions
            </li>
            <li className="flex items-center">
              <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" /> Fonctionnalités de profil de base
            </li>
            <li className="flex items-center">
              <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" /> Accès communautaire
            </li>
            <li className="flex items-center">
              <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" /> Support par e-mail
            </li>
          </ul>

          <button className="w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            Commencer
          </button>
        </div>

        {/* Carte Pro - Le plus populaire */}
        <div className="relative bg-white rounded-2xl shadow-xl border border-blue-500 p-8 flex flex-col justify-between items-center text-center transform scale-105">
          {/* Tag "Le plus populaire" */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow-md whitespace-nowrap">
            Le plus populaire
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
          <p className="text-4xl font-extrabold text-gray-900 mb-1">$9.99<span className="text-base font-medium text-gray-500">/mois</span></p>
          <p className="text-sm text-gray-500 mb-8 max-w-xs">
            Idéal pour les professionnels et les entreprises en croissance
          </p>

          <ul className="text-left text-gray-700 space-y-3 mb-10 w-full px-4">
            <li className="flex items-center">
              <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" /> Connexions illimitées
            </li>
            <li className="flex items-center">
              <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" /> Fonctionnalités avancées du profil
            </li>
            <li className="flex items-center">
              <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" /> Correspondance prioritaire
            </li>
            <li className="flex items-center">
              <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" /> Tableau de bord analytique
            </li>
            <li className="flex items-center">
              <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" /> Support prioritaire
            </li>
          </ul>

          <button className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
            S'abonner
          </button>
        </div>

        {/* Carte Entreprise */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col justify-between items-center text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Entreprise</h3>
          <p className="text-4xl font-extrabold text-gray-900 mb-4">Personnalisé</p>
          <p className="text-sm text-gray-500 mb-8 max-w-xs">
            Solutions sur mesure pour les grandes organisations et les équipes
          </p>

          <ul className="text-left text-gray-700 space-y-3 mb-10 w-full px-4">
            <li className="flex items-center">
              <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" /> Tout dans Pro
            </li>
            <li className="flex items-center">
              <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" /> Gestion d'équipe
            </li>
            <li className="flex items-center">
              <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" /> Intégrations personnalisées
            </li>
            <li className="flex items-center">
              <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" /> Support dédié
            </li>
            <li className="flex items-center">
              <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" /> Garantie SLA
            </li>
          </ul>

          <button className="w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            Contactez les ventes
          </button>
        </div>

      </div>
    </section>
  );
};

export default PlansTarifs;