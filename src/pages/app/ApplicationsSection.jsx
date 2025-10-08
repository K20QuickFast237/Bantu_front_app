import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { toast } from 'sonner';

const COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-red-500',
  'bg-orange-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-yellow-500',
  'bg-teal-500'
];

function getInitials(nom, prenom) {
  if (prenom && nom) return (prenom[0] + nom[0]).toUpperCase();
  if (nom) return nom[0]?.toUpperCase() || '';
  return '';
}

function getColorFromIndex(index) {
  return COLORS[index % COLORS.length];
}

function formatTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // seconds
  if (diff < 60) return 'À l\'instant';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} j ago`;
  return date.toLocaleDateString();
}

const ApplicationsSection = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await api.get('/candidatures');
        setApplications(response.data || []);
      } catch (error) {
        setApplications([]);
        toast.error(error.message || "Erreur lors du chargement des candidatures.");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  return (
    <main className="flex-1 p-5 overflow-auto">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex flex-row items-center justify-between p-5">
          <h3 className="text-base font-semibold leading-none tracking-tight">Applications</h3>
        </div>
        <div className="p-5 pt-0 space-y-3">
          {loading ? (
            <div className="text-center text-gray-400 py-6">Chargement...</div>
          ) : applications.length === 0 ? (
            <div className="text-center text-gray-400 py-6">Aucune candidature trouvée.</div>
          ) : (
            applications.map((application, index) => {
              // Récupération des infos du candidat
              const info = application.informations || application.particulier || {};
              const nom = info.nom || '';
              const prenom = info.prenom || '';
              // Poste
              const poste = application.offre?.titre_poste || 'Poste inconnu';
              // Statut
              const statut = application.statut || '';
              // Date
              const date = application.created_at || application.date_candidature;

              return (
                <div
                  key={application.id || index}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transform hover:scale-105 transition-all"
                >
                  <div className={`relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full ${getColorFromIndex(index)}`}>
                    <div className="flex h-full w-full items-center justify-center rounded-full font-medium text-white text-xs">
                      {getInitials(nom, prenom)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">
                      {prenom} {nom}
                    </p>
                    <p className="text-xs text-gray-600">
                      {poste}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTime(date)}
                    </p>
                    <p className="text-xs text-orange-600 font-semibold">
                      {statut}
                    </p>
                  </div>
                  <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 h-7 px-2 text-xs hover:scale-105">
                    View
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
};

export default ApplicationsSection;