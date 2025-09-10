import React from 'react';
import { MessageCircle, FileText } from 'lucide-react';

const recommendedJobs = [
  {
    title: 'RESPONSABLE COMMERCIAL ET MARKETING',
    company: 'CHAPCHAPCAR CAMEROUN',
    location: 'Yaoundé, Centre, Cameroun',
    type: 'CDI'
  },
  {
    title: 'OFFRE DE STAGE ÉDITION 2025',
    company: 'Nachtigal Hydro Power Company (NHPC)',
    location: 'Lieu Non spécifié, Cameroun',
    type: 'Stage'
  },
  {
    title: 'AGENT GESTIONNAIRE DE COMPTE E-COMMERCE',
    company: 'Qazam',
    location: 'Douala, Littoral, Cameroun',
    type: 'CDI'
  }
];

const CandidateFeed = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">Offres recommandées pour vous</h3>
        {/* Le contenu de FeedView a été déplacé ici */}
      </div>
    </div>
  );
};

export default CandidateFeed;