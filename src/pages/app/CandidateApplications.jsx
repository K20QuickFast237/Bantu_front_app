import React from 'react';
import { Users } from 'lucide-react';

const CandidateApplications = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
    <Users className="w-12 h-12 mx-auto text-gray-300 mb-4" />
    <h3 className="font-semibold text-lg text-gray-800">Mes Candidatures</h3>
    <p className="text-gray-500 mt-2">Vous n'avez postulé à aucune offre pour le moment.</p>
  </div>
);

export default CandidateApplications;