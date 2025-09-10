import React from 'react';
import { Briefcase, Search } from 'lucide-react';

const CandidateJobs = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
    <Briefcase className="w-12 h-12 mx-auto text-gray-300 mb-4" />
    <h3 className="font-semibold text-lg text-gray-800">Offres d'emploi</h3>
    <p className="text-gray-500 mt-2">Recherchez et filtrez parmi des milliers d'offres d'emploi.</p>
     <div className="relative mt-4 max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher une offre..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
  </div>
);

export default CandidateJobs;