import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import BantulinkLoader from '@/components/ui/BantulinkLoader';
import { Button } from '@/components/ui/button';

const ApplicationsSection = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [offersList, setOffersList] = useState([]);
  const [loading, setLoading] = useState(true);
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

        const offersData = offersResponse.data?.data || [];
        setOffersList(offersData.map(o => ({
          id: o.id,
          titre_poste: o.titre_poste
        })));

      } catch (error) {
        setApplications([]);
        setFilteredApplications([]);
        setOffersList([]);
        toast.error(error.message || "Erreur lors du chargement des données.");
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

  return (
    <main className="flex-1 p-5 overflow-auto">
      <h2 className="text-2xl font-bold mb-2">Gestion des candidatures</h2>
      <p className="text-gray-500 mb-6 text-sm">
        Filtrez et consultez toutes les candidatures reçues pour vos offres.
      </p>

      {/* Filter Section */}
      <div className="bg-gray-50 p-4 rounded-lg border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Du</label>
              <input type="date" name="fromDate" value={filters.fromDate} onChange={handleFilterChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Au</label>
              <input type="date" name="toDate" value={filters.toDate} onChange={handleFilterChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Offres</label>
            <select name="offer" value={filters.offer} onChange={handleFilterChange} className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option value="">Toutes les offres</option>
              {offersList.map(offer => (
                <option key={offer.id} value={offer.id}>{offer.titre_poste}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select name="status" value={filters.status} onChange={handleFilterChange} className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option value="">Tous les statuts</option>
              {Object.entries(statusOptions).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>
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
                      {candidate.particulier?.nom || ''} {candidate.particulier?.prenom || ''}
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
                      <Link to={`/candidature_detail/${candidate.id}`}>
                        <Button variant="link" className="text-blue-600 p-0 h-auto">Afficher</Button>
                      </Link>
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

export default ApplicationsSection;