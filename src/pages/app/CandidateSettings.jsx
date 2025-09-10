import React from 'react';

const CandidateSettings = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h3 className="font-semibold text-lg text-gray-800 mb-6">Paramètres du compte</h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom complet</label>
        <input type="text" defaultValue="Jospin Duclair" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
        <input type="email" defaultValue="jospin.d@example.com" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed" disabled />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Titre du profil</label>
        <input type="text" defaultValue="Développeur Full-Stack | React, Node.js" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
      </div>
      <div className="pt-4">
        <button className="bg-[#009739] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#007a2f] transition-colors">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  </div>
);

export default CandidateSettings;