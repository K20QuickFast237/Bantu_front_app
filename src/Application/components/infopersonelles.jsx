// Profil.jsx
import React from 'react';
import { Camera, Mail, Phone, Linkedin, User, Edit, Search } from 'lucide-react'; // Importez les icônes nécessaires

const Infopersonelles = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8 border border-gray-200">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-800">Informations Personnelles</h2>
        <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm">
          <Edit size={16} className="mr-1" /> {/* Icône de crayon */}
          Modifier
        </button>
      </div>

      {/* Main Profile Section */}
      <div className="flex items-start mb-6">
        {/* Profile Picture Placeholder */}
        <div className="relative w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center mr-6 overflow-hidden border border-gray-300">
          <User size={60} className="text-gray-500" /> {/* Icône d'utilisateur générique */}
          <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow border border-gray-300">
            <Camera size={16} className="text-gray-500" /> {/* Icône de caméra */}
          </div>
        </div>

        {/* Profile Details */}
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">ABRAHAM TADZONG MBIPE</h3>
          <p className="text-sm text-gray-600 mb-4">Concepteur Et Développeur D'application</p>

          {/* Completion Bar */}
          <div className="flex items-center mb-4">
            <span className="text-green-600 font-bold mr-2">50%</span>
            <div className="flex-grow bg-gray-200 rounded-full h-2.5 mr-4">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: '50%' }}
              ></div>
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-semibold mr-1">Vous Êtes :</span>
              <span className="flex items-center text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                En recherche active
              </span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-gray-700 text-sm">
            <div className="flex items-center">
              <Mail size={16} className="mr-2 text-gray-500" />
              <span>tadzongmbipeabraham@gmail.com</span>
            </div>
            <div className="flex items-center">
              <Phone size={16} className="mr-2 text-gray-500" />
              <span>+237 674 882 527</span>
            </div>
            <div className="flex items-center">
              <User size={16} className="mr-2 text-gray-500" />
              <span>Homme</span>
            </div>
            <div className="flex items-center">
              <Linkedin size={16} className="mr-2 text-gray-500" />
              <a href="http://linkedin.com/in/atomabraham" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                http://linkedin.com/in/atomabraham
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-4 gap-4 pt-6 border-t border-gray-200">
        {/* Stat Card 1 */}
        <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
          <p className="text-3xl font-bold text-gray-800 mb-1">0</p>
          <p className="text-sm text-gray-600">consultation<br/>de votre profil</p>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
          <p className="text-3xl font-bold text-gray-800 mb-1">+15%</p>
          <p className="text-sm text-gray-600">Offres consultés<br/>ces 15 derniers jours</p>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
          <p className="text-3xl font-bold text-gray-800 mb-1">0</p>
          <p className="text-sm text-gray-600">ajout aux favoris<br/>des recruteurs</p>
        </div>

        {/* Stat Card 4 - View all stats */}
        <div className="flex items-center justify-center p-4 rounded-lg border border-gray-200 bg-gray-50">
          <a href="#" className="text-blue-600 hover:underline text-center text-sm">
            Voir toutes les<br/>statistiques 
          </a>
        </div>
      </div>
    </div>
  );
};

export default Infopersonelles;