// Competences.jsx
import React from 'react';
// Pas d'icônes spécifiques dans le header de cette section, mais la laisser pour cohérence
import { Edit } from 'lucide-react';

const Competences = () => {
  // Exemple de données pour les compétences
  // En réalité, ces données viendraient d'un état ou de props
  const competencesData = [
    "Adobe Premiere Pro", "Laravel", "React Js",
    "Adobe Premiere Pro", "Laravel", "React Js",
    "Adobe Premiere Pro", "Laravel", "React Js",
    "Adobe Premiere Pro", "Laravel", "React Js",
    "Adobe Premiere Pro", "Laravel", "React Js",
    "Adobe Premiere Pro", "Laravel", "React Js",
    "Adobe Premiere Pro", "Laravel", "React Js",
    "Adobe Premiere Pro", "Laravel", "React Js",
    "Adobe Premiere Pro", "Laravel", "React Js",
    "Adobe Premiere Pro", "Laravel", "React Js",
    "Adobe Premiere Pro", "Laravel", "React Js",
    "Adobe Premiere Pro", "Laravel", "React Js",
    "Adobe Premiere Pro", "Laravel", "React Js",
    "Adobe Premiere Pro", "Laravel", "React Js",
    "Adobe Premiere Pro", "Laravel", "React Js",
  ];

  // Regroupement des compétences en 3 colonnes pour le rendu
  const columns = [[], [], []];
  competencesData.forEach((competence, index) => {
    columns[index % 3].push(competence);
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8 border border-gray-200">
      {/* Header Section - Identique aux précédents, mais sans bouton "Modifier" ici */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-800">Compétences</h2>
        {/* Le bouton "Modifier" est absent dans l'image pour cette section, donc on le retire */}
        {/* Vous pouvez le rajouter si vous le souhaitez */}
        {/* <button className="flex items-center px-3 py-1.5 rounded-md text-blue-600 border border-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 text-sm">
          <Edit size={16} className="mr-1" />
          Modifier
        </button> */}
      </div>

      {/* Content Section - Displaying competencies in 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-6 text-sm text-gray-700">
        {columns.map((column, colIndex) => (
          <ul key={colIndex} className="space-y-2"> {/* space-y-2 pour l'espacement vertical entre les items de chaque colonne */}
            {column.map((competence, itemIndex) => (
              <li key={itemIndex} className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#FF8C00' }}></span> {/* Petit point orange */}
                {competence}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Competences;