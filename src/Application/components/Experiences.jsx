// Experiences.jsx
import React from 'react';
import { Edit, Trash2, PlusCircle } from 'lucide-react'; // Importez les icônes nécessaires
import { motion } from 'framer-motion';

const Experiences = () => {
  // Données d'exemple pour les expériences pour faciliter la reproduction
  // En réalité, ces données viendraient d'un état ou de props
  const experiencesData = [
    {
      id: 1,
      title: "Développeur Web",
      entreprise: "ATOM TECH",
      localisation: "Douala, Cameroun",
      typeContrat: "Freelance",
      date: "Jan 2010 - Avr 2022",
      description: "************",
      competences: "************"
    },
    {
      id: 2,
      title: "Graphiste",
      entreprise: "Sublime Prod",
      localisation: "Douala, Cameroun",
      typeContrat: "Freelance",
      date: "Jan 2010 - Avr 2022",
      description: "************",
      competences: "Photoshop, Illustrator"
    },
    {
      id: 3,
      title: "Graphiste",
      entreprise: "ATOM TECH",
      localisation: "Douala, Cameroun",
      typeContrat: "Freelance",
      date: "Jan 2010 - Avr 2022",
      description: "************",
      competences: "************"
    },
    {
      id: 4,
      title: "Développeur Web",
      entreprise: "ATOM TECH",
      localisation: "Douala, Cameroun",
      typeContrat: "Freelance",
      date: "Jan 2010 - Avr 2022",
      description: "************",
      competences: "React Js"
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-[95%] mx-auto my-8 border border-gray-200">

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }} // Anime une seule fois lorsque 30% de l'élément est visible
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-400 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-blue-800">Expériences</h2>
          <p className="text-sm text-gray-500">Vos Expériences</p>
        </div>
        <button className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600
                   hover:text-white hover:bg-blue-600 animate-pulse font-medium text-sm">
          <PlusCircle size={16} className="mr-1" /> {/* Icône de plus */}
          Ajouter
        </button>
      </div>

      {/* Experiences List */}
      <div className="space-y-6"> {/* Espacement entre chaque bloc d'expérience */}
        {experiencesData.map((exp) => (
          <div key={exp.id} className="flex justify-between items-start  pb-4 last:border-b-0 last:pb-0"> {/* Ajout de border-b pour chaque exp sauf la dernière */}
            {/* Left side: Title and Details */}
            <div className="flex items-start flex-grow">
              {/* Green dot */}
              <div className="w-3 h-3 rounded-full mr-3 mt-2" style={{ backgroundColor: '#10B981' }}></div>
              <div >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{exp.title}</h3>
                <div className="grid grid-cols-2 border-l-1 border-[#10B981] -ml-4 pl-4 gap-y-1 gap-x-4 text-sm text-gray-700">
                  <p><span className="font-medium text-gray-600">Entreprise</span></p>
                  <p>{exp.entreprise}</p>
                  <p><span className="font-medium text-gray-600">Localisation</span></p>
                  <p>{exp.localisation}</p>
                  <p><span className="font-medium text-gray-600">Type De Contrat</span></p>
                  <p>{exp.typeContrat}</p>
                  <p><span className="font-medium text-gray-600">Date</span></p>
                  <p>{exp.date}</p>
                  <p><span className="font-medium text-gray-600">Description, Missions</span></p>
                  <p>{exp.description}</p>
                  <p><span className="font-medium text-gray-600">Compétences</span></p>
                  <p>{exp.competences}</p>
                </div>
              </div>
            </div>

            {/* Right side: Actions (Modifier, Delete) */}
            <div className="flex items-center space-x-2">
              <button className="flex items-center px-2 py-1 rounded-md text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 text-xs">
                <Edit size={14} className="mr-1" />
                Modifier
              </button>
              <button className="flex items-center px-2 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 text-xs">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
      </motion.section>
    </div>
  );
};

export default Experiences;