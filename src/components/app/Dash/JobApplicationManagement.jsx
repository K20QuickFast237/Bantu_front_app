import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BantulinkLoader from '@/components/ui/BantulinkLoader';
import { Button } from '@/components/ui/button';


const JobApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [offersList, setOffersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    offer: '',
    status: ''
  });

  const statusOptions = {
    'en_revision': { label: 'En révision', color: 'bg-yellow-500' },
    'preselectionne': { label: 'Présélectionné', color: 'bg-blue-500' },
    'invitation_entretien': { label: 'Invitation à l\'entretien', color: 'bg-purple-500' },
    'rejete': { label: 'Rejeté', color: 'bg-red-500' },
    'embauche': { label: 'Embauché', color: 'bg-green-500' },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [applicationsResponse, offersResponse] = await Promise.all([
          api.get('/candidatures'),
          api.get('/mesoffres')
        ]);
        const appsData = applicationsResponse.data || [];
        setApplications(appsData);
        setFilteredApplications(appsData);

        const offersData = offersResponse?.data || [];
        setOffersList(offersData.map(o => ({
          id: o.id,
          titre_poste: o.titre_poste
        })));

      } catch (error) {
        setApplications([]);
        setFilteredApplications([]);
        setOffersList([]);
        toast.error("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = applications;

    if (filters.offer) {
      filtered = filtered.filter(c => c.offre && String(c.offre.id) === filters.offer);
    }
    if (filters.status) {
      filtered = filtered.filter(c => c.statut === filters.status);
    }
    if (filters.fromDate) {
      filtered = filtered.filter(c => c.created_at && c.created_at.slice(0, 10) >= filters.fromDate);
    }
    if (filters.toDate) {
      filtered = filtered.filter(c => c.created_at && c.created_at.slice(0, 10) <= filters.toDate);
    }
    setFilteredApplications(filtered);
  }, [filters, applications]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      fromDate: '',
      toDate: '',
      offer: '',
      status: ''
    });
    setFilteredApplications(applications);
  };

  return (
    <main className="flex-1 p-5 overflow-auto">
      {/* Hero Section */}
      <div className="bg-[#FFF3EB] px-4 sm:px-8 pb-8 pt-12 relative">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-[#10B981] text-2xl md:text-3xl font-bold">Mes Candidatures</h1>
          <p className="text-sm md:text-base font-semibold mt-1">
            Filtrez et consultez toutes les candidatures reçues pour vos offres.
          </p>
        </motion.div>
      </div>
      {/* Filter Section */}
      <div className="bg-orange-50 p-6 rounded-lg mb-8">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Du</label>
            <input type="date" name="fromDate" value={filters.fromDate} onChange={handleFilterChange} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Au</label>
            <input type="date" name="toDate" value={filters.toDate} onChange={handleFilterChange} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Offres</label>
            <select name="offer" value={filters.offer} onChange={handleFilterChange} className="w-full border border-gray-300 rounded px-3 py-2 appearance-none bg-white cursor-pointer">
              <option value="">Toutes les offres</option>
              {offersList.map(offer => (
                <option key={offer.id} value={offer.id}>{offer.titre_poste}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
            <select name="status" value={filters.status} onChange={handleFilterChange} className="w-full border border-gray-300 rounded px-3 py-2 appearance-none bg-white cursor-pointer">
              <option value="">Tous les statuts</option>
              {Object.entries(statusOptions).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded" onClick={handleReset} type="button">
            Tout afficher
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
          Configurer l'envoi des mails
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-auto">
          Exporter les données
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-300 rounded">
        {loading ? (
          <div className="text-center py-10"><BantulinkLoader /></div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="px-6 py-3 text-left font-semibold text-gray-700 w-16"></th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Nom du candidat</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Offre d'emploi</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Adresse</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Statut</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((candidate, idx) => (
                  <tr key={candidate.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 text-gray-700 font-medium">{idx + 1}</td>
                    <td className="px-6 py-4 text-green-600 font-medium">
                      {candidate.particulier?.user?.nom || ''} {candidate.particulier?.user?.prenom || ''}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {candidate.offre?.titre_poste || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {candidate.particulier?.adresse || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${statusOptions[candidate.statut]?.color || 'bg-gray-400'}`}></div>
                        <span className="text-gray-700 capitalize">{statusOptions[candidate.statut]?.label || candidate.statut || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="link" className="text-blue-600 p-0 h-auto cursor-pointer" onClick={() => navigate(`/job-application/${candidate.id}`)}>Afficher</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-10">Aucune candidature trouvée.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};

export default JobApplicationManagement;