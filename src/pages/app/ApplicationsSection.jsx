import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { toast } from 'sonner';
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import BantulinkLoader from '@/components/ui/BantulinkLoader';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Download, Mail, Phone, Linkedin, User, Briefcase, Star, GraduationCap, FileText, MessageSquare } from 'lucide-react';

const ApplicationsSection = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [offersList, setOffersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list' or 'detail'
  const [detailLoading, setDetailLoading] = useState(false);
  const [statusChangeLoading, setStatusChangeLoading] = useState({ preselect: false, reject: false });
  const [selectedApplication, setSelectedApplication] = useState(null);

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
        console.log(applicationsResponse.data);
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

  const handleShowDetails = async (application) => {
    setDetailLoading(true);
    setView('detail');
    setSelectedApplication(null); // Clear previous data
    try {
      // Comme demandé, utilisation de PUT pour récupérer les détails.
      const response = await api.put(`/candidatures/${application.id}`);
      setSelectedApplication(response.data);
    } catch (error) {
      toast.error(error.message || "Erreur lors du chargement des détails de la candidature.");
      setView('list'); // Revenir à la liste en cas d'erreur
    } finally {
      setDetailLoading(false);
    }
  };

  const handleBackToList = () => {
    setSelectedApplication(null);
    setView('list');
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedApplication) return;

    const loadingKey = newStatus === 'preselectionne' ? 'preselect' : 'reject';
    setStatusChangeLoading(prev => ({ ...prev, [loadingKey]: true }));

    try {
      await api.put(`/candidatures/${selectedApplication.id}/status`, {
        statut: newStatus,
        note_ia: selectedApplication.note_ia || 0 // Utilise la note_ia de l'API, ou 0 par défaut
      });

      toast.success(`Candidature ${newStatus === 'preselectionne' ? 'présélectionnée' : 'rejetée'} avec succès.`);

      // Mettre à jour l'état local pour un retour visuel immédiat
      const updatedApplication = { ...selectedApplication, statut: newStatus };
      setSelectedApplication(updatedApplication);

      // Mettre à jour la liste principale des candidatures
      setApplications(prev => prev.map(app => app.id === updatedApplication.id ? updatedApplication : app));

    } catch (error) {
      toast.error(error.message || "Erreur lors de la mise à jour du statut.");
    } finally {
      setStatusChangeLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  const handleStartConversation = async (candidateId) => {
    if (!candidateId) {
      toast.error("Impossible de trouver l'identifiant du candidat.");
      return;
    }
    try {
      // Cette route crée une conversation si elle n'existe pas, ou la retourne si elle existe.
      const response = await api.post('/conversations', { user_id: candidateId });
      const conversationId = response.data.id; // Assumant que l'API retourne l'ID de la conversation

      // Rediriger vers la messagerie avec la conversation sélectionnée
      navigate('/dashboard_recruteur', { state: { section: 'messages', conversationId: conversationId } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de la création de la conversation.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const renderDetailView = () => {
    if (detailLoading) {
      return (
        <div className="flex justify-center items-center h-full min-h-[500px]">
          <BantulinkLoader />
        </div>
      );
    }

    if (!selectedApplication) {
      return (
        <div className="text-center py-10">
          <p>Aucune candidature sélectionnée.</p>
          <Button onClick={handleBackToList} className="mt-4" variant="outline">Retour à la liste</Button>
        </div>
      );
    }

    const candidate = selectedApplication.particulier || {};
    const offer = selectedApplication.offre_emploi || selectedApplication.offre || {};
    const experiences = candidate.experiences || [];
    const competences = candidate.competences || [];
    const formations = candidate.formations || [];
    const autresRessources = candidate.autres_ressources || [];

    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Candidature | {offer.titre_poste || 'N/A'} | {offer.entreprise || 'N/A'} ||{candidate.nom} {candidate.prenom}</h1>
          <p className="text-gray-600 text-sm">Date de candidature : 10/9/2025</p>
        </div>
        <Button onClick={handleBackToList} variant="ghost" className="mb-6">
          <ChevronLeft size={20} className="mr-2" /> Retour à la liste
        </Button>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                {candidate.photo ? (
                  <img src={candidate.photo} alt={`${candidate.nom} ${candidate.prenom}`} className="w-32 h-32 rounded-full object-cover" />
                ) : (
                  <User size={64} className="text-gray-400" />
                )}
              </div>
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{candidate.nom} {candidate.prenom}</h1>
              <p className="text-md text-gray-600 mb-4">{candidate.titre_profil || 'Titre du profil non renseigné'}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2"><Mail size={14} className="text-gray-400" /> {candidate.email || 'N/A'}</div>
                <div className="flex items-center gap-2"><Phone size={14} className="text-gray-400" /> {candidate.telephone || 'N/A'}</div>
                <div className="flex items-center gap-2"><User size={14} className="text-gray-400" /> {candidate.genre || 'N/A'}</div>
                {candidate.linkedin && <div className="flex items-center gap-2"><Linkedin size={14} className="text-gray-400" /> <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Profil LinkedIn</a></div>}
              </div>
              <div className="mt-6 flex gap-3">
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleStatusChange('preselectionne')}
                  disabled={statusChangeLoading.preselect || selectedApplication.statut === 'preselectionne'}
                >
                  {statusChangeLoading.preselect ? 'Chargement...' : 'Présélectionner'}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleStatusChange('rejete')}
                  disabled={statusChangeLoading.reject || selectedApplication.statut === 'rejete'}
                >
                  {statusChangeLoading.reject ? 'Chargement...' : 'Rejeter'}
                </Button>
                {selectedApplication.statut === 'preselectionne' && (
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleStartConversation(candidate.user_id)}
                  >
                    <MessageSquare size={16} className="mr-2" /> Contacter
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {candidate.resume && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-bold text-orange-500 mb-3">Résumé du Profil</h2>
            <p className="text-gray-700 leading-relaxed">{candidate.resume}</p>
          </div>
        )}

        {experiences.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-bold text-orange-500 mb-4 flex items-center gap-2"><Briefcase size={20} /> Expériences</h2>
            <div className="space-y-6">
              {experiences.map(exp => (
                <div key={exp.id} className="pl-4 border-l-2 border-orange-500">
                  <h3 className="font-semibold text-gray-800">{exp.titre_poste}</h3>
                  <p className="text-sm text-gray-600">{exp.entreprise} • {exp.lieu}</p>
                  <p className="text-xs text-gray-500">{formatDate(exp.date_debut)} - {exp.en_cours ? 'Aujourd\'hui' : formatDate(exp.date_fin)}</p>
                  <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {competences.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-bold text-orange-500 mb-4 flex items-center gap-2"><Star size={20} /> Compétences</h2>
            <div className="flex flex-wrap gap-2">
              {competences.map(comp => (
                <span key={comp.id} className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">{comp.nom}</span>
              ))}
            </div>
          </div>
        )}

        {formations.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-bold text-orange-500 mb-4 flex items-center gap-2"><GraduationCap size={20} /> Diplômes & Formations</h2>
            <div className="space-y-6">
              {formations.map(form => (
                <div key={form.id} className="pl-4 border-l-2 border-orange-500">
                  <h3 className="font-semibold text-gray-800">{form.diplome}</h3>
                  <p className="text-sm text-gray-600">{form.etablissement}</p>
                  <p className="text-xs text-gray-500">{formatDate(form.date_debut)} - {formatDate(form.date_fin)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {autresRessources.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-bold text-orange-500 mb-4 flex items-center gap-2"><FileText size={20} /> Autres Ressources</h2>
            <div className="space-y-3">
              {autresRessources.map(res => (
                <div key={res.id} className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">{res.nom_document}:</span>
                  <a href={res.url_document} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center gap-2">
                    <span>{res.url_document.split('/').pop()}</span>
                    <Download size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderListView = () => (
    <>
      <h2 className="text-2xl font-bold mb-2">Gestion des candidatures</h2>
      <p className="text-gray-500 mb-6 text-sm">
        Filtrez et consultez toutes les candidatures reçues pour vos offres.
      </p>

      {/* Filter Section */}
      <div className="bg-gray-50 p-4 rounded-lg border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end cursor-pointer">
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
                      <Button variant="link" className="text-blue-600 p-0 h-auto cursor-pointer" onClick={() => handleShowDetails(candidate)}>Afficher</Button>
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
    </>
  );

  return (
    <main className="flex-1 p-5 overflow-auto">
      <AnimatePresence mode="wait">
        {view === 'list' ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderListView()}
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderDetailView()}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ApplicationsSection;