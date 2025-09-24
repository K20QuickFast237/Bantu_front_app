import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Assurez-vous d'avoir 'react-icons' installé

const Test = () => {
  const [skills, setSkills] = useState([
    'Photoshop', 'Illustrator', 'Gestion de projet', 'Photoshop',
    'Photoshop', 'Illustrator', 'Gestion de projet', 'Photoshop'
  ]);
  const [newSkill, setNewSkill] = useState('');

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() !== '' && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Ajouter une compétence</h2>
      
      <form onSubmit={handleAddSkill}>
        {/* Compétence Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Compétence <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder=""
          />
        </div>
        
        {/* Liste des Compétences existantes */}
        <div className="flex flex-wrap gap-2 mb-6">
          {skills.map((skill, index) => (
            <span 
              key={index} 
              className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
            >
              {skill}
              <FaTimes 
                className="ml-2 cursor-pointer text-red-500" 
                onClick={() => handleRemoveSkill(skill)} 
              />
            </span>
          ))}
        </div>
        
        {/* Bouton Enregistrer */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Test;