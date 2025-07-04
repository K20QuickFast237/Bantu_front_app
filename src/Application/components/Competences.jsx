
import React from 'react';
import { Edit } from 'lucide-react';
import { motion } from 'framer-motion';

const Competences = () => {
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

  const columns = [[], [], []];
  competencesData.forEach((competence, index) => {
    columns[index % 3].push(competence);
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-[95%] mx-auto my-8 border border-gray-200">

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }} // Anime une seule fois lorsque 30% de l'élément est visible
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
      {/* Header Section - Identique aux précédents, mais sans bouton "Modifier" ici */}
      <div className="flex justify-between items-center mb-4 pb-4">
        <h2 className="text-xl font-semibold text-blue-800">Compétences</h2>
        
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
      </motion.section>
    </div>
  );
};

export default Competences;