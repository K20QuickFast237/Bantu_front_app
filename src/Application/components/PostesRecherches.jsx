// PostesRecherches.jsx
import React from 'react';
import { Edit, Briefcase, MapPin, FileText, Calendar } from 'lucide-react'; // Importez les icônes nécessaires

const PostesRecherches = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8 border border-gray-200">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-800">Poste.s recherché.s</h2>
        <button className="flex items-center px-3 py-1.5 rounded-md text-blue-600 border border-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 text-sm">
          <Edit size={16} className="mr-1" /> {/* Icône de crayon */}
          Modifier
        </button>
      </div>

      {/* Content Section */}
      <div className="space-y-6"> {/* Espacement vertical entre les groupes de critères */}

        {/* Métiers recherchés */}
        <div className="flex items-start">
          <p className="w-56 text-gray-700 text-sm mt-1">Les Métiers Les Plus Représentatifs De Votre Poste</p>
          <div className="flex flex-wrap gap-2 flex-grow">
            {/* Les "tags" sont des boutons stylisés ici */}
            <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-md flex items-center">
              Graphiste
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-md flex items-center">
              Développeur web full stack
            </span>
          </div>
        </div>

        {/* Lieux recherchés */}
        <div className="flex items-start">
          <p className="w-56 text-gray-700 text-sm mt-1">Les Lieux Où Vous Recherchez Un Poste</p>
          <div className="flex flex-wrap gap-2 flex-grow">
            <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-md flex items-center">
              <MapPin size={14} className="mr-1 text-emerald-700" /> {/* Icône de localisation */}
              Douala
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-md flex items-center">
              <MapPin size={14} className="mr-1 text-emerald-700" />
              Douala
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-md flex items-center">
              <MapPin size={14} className="mr-1 text-emerald-700" />
              Douala
            </span>
          </div>
        </div>

        {/* Type de Contrat */}
        <div className="flex items-start">
          <p className="w-56 text-gray-700 text-sm mt-1">Type De Contrat</p>
          <div className="flex flex-wrap gap-2 flex-grow">
            <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-md flex items-center">
              <FileText size={14} className="mr-1 text-emerald-700" /> {/* Icône de document */}
              CDI
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-md flex items-center">
              <FileText size={14} className="mr-1 text-emerald-700" />
              Freelance
            </span>
          </div>
        </div>

        {/* Niveau D'expérience */}
        <div className="flex items-start">
          <p className="w-56 text-gray-700 text-sm mt-1">Niveau D'expérience</p>
          <div className="flex flex-wrap gap-2 flex-grow">
            <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-md flex items-center">
              <Calendar size={14} className="mr-1 text-emerald-700" /> {/* Icône de calendrier */}
              3-5 Ans
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostesRecherches;