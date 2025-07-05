// DiplomesFormations.jsx
import React from 'react';
import { Edit, Trash2, PlusCircle } from 'lucide-react'; 
import { motion } from 'framer-motion';

const DiplomesFormations = () => {
  // Données d'exemple pour les diplômes et formations
  // En réalité, ces données viendraient d'un état ou de props
  const diplomesFormationsData = [
    {
      id: 1,
      nom: "Nom", // Le libellé "Nom" est répété dans l'image
      ecoleOuOrganisme: "ATOM TECH",
      niveau: "Douala, Cameroun", // Semble être la ville dans l'image
      type: "Freelance", // Le type de diplôme/formation ou de contrat
      date: "Jan 2010 - Avr 2022",
      description: "************",
      competences: "************"
    },
    {
      id: 2,
      nom: "Nom",
      ecoleOuOrganisme: "Sublime Prod",
      niveau: "Douala, Cameroun",
      type: "Freelance",
      date: "Jan 2010 - Avr 2022",
      description: "************",
      competences: "Photoshop, Illustrator"
    },
    {
      id: 3,
      nom: "Nom",
      ecoleOuOrganisme: "ATOM TECH",
      niveau: "Douala, Cameroun",
      type: "Freelance",
      date: "Jan 2010 - Avr 2022",
      description: "************",
      competences: "************"
    },
    {
      id: 4,
      nom: "Nom",
      ecoleOuOrganisme: "ATOM TECH",
      niveau: "Douala, Cameroun",
      type: "Freelance",
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
        viewport={{ once: true, amount: 0.1 }} 
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-400 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-blue-800">Diplômes & Formations</h2>
        </div>
        <button className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600
           hover:text-white hover:bg-blue-600 animate-pulse font-medium text-sm">
          <PlusCircle size={16} className="mr-1" />
          Ajouter
        </button>
      </div>

      {/* Diplomas & Formations List */}
      <div className="space-y-6"> {/* Espacement entre chaque bloc d'expérience */}
        {diplomesFormationsData.map((item) => (
          <div key={item.id} className="flex justify-between items-start pb-4  last:border-b-0 last:pb-0">
            {/* Left side: Title and Details */}
            <div className="flex items-start flex-grow">
              {/* Green dot */}
              <div className="w-2 h-2 rounded-full mr-3 mt-2" style={{ backgroundColor: '#10B981' }}></div>
              <div>
                {/* Le nom du diplôme/formation n'est pas le plus grand dans l'image, c'est "Nom" */}
                {/* On reproduit les libellés et valeurs comme dans l'image */}
                <div className="grid grid-cols-2 border-l-1 border-[#10B981] -ml-4 pl-4 gap-y-1 gap-x-4 text-sm text-gray-700">
                  <p><span className="font-medium text-gray-600">Nom</span></p>
                  <p>{item.nom}</p> {/* La valeur "Nom" ou le vrai nom du diplôme */}
                  <p><span className="font-medium text-gray-600">École Ou Organisme</span></p>
                  <p>{item.ecoleOuOrganisme}</p>
                  <p><span className="font-medium text-gray-600">Niveau</span></p>
                  <p>{item.niveau}</p>
                  <p><span className="font-medium text-gray-600">Date</span></p>
                  <p>{item.date}</p>
                  <p><span className="font-medium text-gray-600">Description</span></p>
                  <p>{item.description}</p>
                  <p><span className="font-medium text-gray-600">Compétences</span></p>
                  <p>{item.competences}</p>
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

export default DiplomesFormations;