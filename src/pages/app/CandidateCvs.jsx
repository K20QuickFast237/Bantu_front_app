import React from 'react';
import { FileText } from 'lucide-react';

const CandidateCvs = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
    <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
    <h3 className="font-semibold text-lg text-gray-800">Mes CVs</h3>
    <p className="text-gray-500 mt-2">Gérez vos CVs ici pour postuler plus rapidement.</p>
    <button className="mt-4 bg-[#009739] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#007a2f] transition-colors">
      Ajouter un CV
    </button>
  </div>
);

export default CandidateCvs;