import React, { useState, useEffect } from "react";
import { Eye, Pencil, Trash, Share2, Edit2, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import api from "@/services/api"; // Assurez-vous que le chemin est correct
import BantulinkLoader from "@/components/ui/BantulinkLoader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const JobPostsSection = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({ titre_poste: "", remuneration_min: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [view, setView] = useState("list"); // 'list' or 'detail'
  const [viewingJob, setViewingJob] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [filteredJobPosts, setFilteredJobPosts] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/mesoffres");
        setJobPosts(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = jobPosts.filter((job) => {
      const searchTermMatch =
        !filters.searchTerm ||
        job.titre_poste.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const statusMatch =
        !filters.status || job.statut === filters.status;

      const jobDate = new Date(job.date_publication);
      const startDateMatch =
        !filters.startDate || jobDate >= new Date(filters.startDate);
      const endDateMatch =
        !filters.endDate || jobDate <= new Date(filters.endDate);

      return searchTermMatch && statusMatch && startDateMatch && endDateMatch;
    });
    setFilteredJobPosts(filtered);
  }, [filters, jobPosts]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };


  const handleUpdate = (job) => {
    setSelectedJob(job);
    setFormData({
      titre_poste: job.titre_poste || "",
      remuneration_min: job.remuneration_min || "",
    });
    setOpenDialog(true);
  };

  const submitUpdate = async () => {
    try {
      await api.put(`/offres/${selectedJob.id}`, formData);
      setJobPosts(
        jobPosts.map((job) =>
          job.id === selectedJob.id ? { ...job, ...formData } : job
        )
      );
      setOpenDialog(false);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = (job) => {
    setSelectedJob(job);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/offres/${selectedJob.id}`);
      setJobPosts(jobPosts.filter((job) => job.id !== selectedJob.id));
      setIsDeleteModalOpen(false);
      setSelectedJob(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Pour le bouton "Afficher"
  const handleViewApplications = (job) => {
    setViewingJob(job);
    setView("detail");
  };

  const handleBackToList = () => {
    setViewingJob(null);
    setView("list");
  };

  if (loading) return <BantulinkLoader />;

  const renderListView = () => (
    <>
      <h2 className="text-2xl font-bold mb-2">Vos offres d'emploi</h2>
      <p className="text-gray-500 mb-6 text-sm">
        Gérez vos offres d'emploi publiées.
      </p>

      {/* Section des filtres */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="searchTerm" className="text-sm font-medium text-gray-700 block mb-1">Rechercher par nom</label>
            <Input
              id="searchTerm"
              name="searchTerm"
              type="text"
              placeholder="Titre du poste..."
              value={filters.searchTerm}
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label htmlFor="status" className="text-sm font-medium text-gray-700 block mb-1">Statut</label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">Tous</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>
          <div>
            <label htmlFor="startDate" className="text-sm font-medium text-gray-700 block mb-1">Date de publication (début)</label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label htmlFor="endDate" className="text-sm font-medium text-gray-700 block mb-1">Date de publication (fin)</label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      {/* Bouton Créer une offre */}
      <div className="flex justify-end mb-6">
        <Link to="/createJob">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded">
            Créer une offre d'emploi
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto border border-gray-300 rounded">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Titre du poste</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Publication</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Deadline</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Statut</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Candidatures</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobPosts.map((job, idx) => (
              <tr key={job.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 text-green-600 font-medium">
                  {job.titre_poste}
                </td>
                <td className="px-6 py-4 text-gray-700">{job.date_publication ? new Date(job.date_publication).toLocaleDateString('fr-FR') : 'N/A'}</td>
                <td className="px-6 py-4 text-gray-700">{job.date_limite_soumission ? new Date(job.date_limite_soumission).toLocaleDateString('fr-FR') : 'N/A'}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${job.statut === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-gray-700 capitalize">{job.statut || 'N/A'}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700 font-medium">
                  {job.candidatures || '0'} candidatures
                </td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-green-500 border-green-500 hover:bg-green-50 hover:text-green-600" onClick={() => handleViewApplications(job)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50 hover:text-orange-600" onClick={() => handleUpdate(job)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => confirmDelete(job)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderDetailView = () => {
    if (!viewingJob) {
      return (
        <div className="text-center py-10">
          <p>Aucune offre sélectionnée.</p>
          <Button onClick={handleBackToList} className="mt-4">Retour à la liste</Button>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Button onClick={handleBackToList}>Retour à la liste</Button>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{viewingJob.titre_poste || "Titre non disponible"}</h1>
              <p className="text-gray-600 text-sm">
                Publié le : {viewingJob.date_publication ? new Date(viewingJob.date_publication).toLocaleDateString('fr-FR') : 'N/A'} | 
                Deadline : {viewingJob.date_limite_soumission ? new Date(viewingJob.date_limite_soumission).toLocaleDateString('fr-FR') : 'N/A'}
              </p>
            </div>
            <button className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold cursor-pointer">
              <Share2 size={18} />
              <span>Partager</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="mb-4">
                <p className="text-gray-600 text-xs font-semibold mb-1">Type de contrat</p>
                <p className="text-gray-900 font-semibold">{viewingJob.type_contrat || 'N/A'}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 text-xs font-semibold mb-1">Salaire</p>
                <p className="text-gray-900 font-semibold">
                  {viewingJob.remuneration_min ? `${viewingJob.remuneration_min} - ${viewingJob.remuneration_max || ''}` : "Non spécifié"}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 text-xs font-semibold mb-1">Expérience</p>
                <p className="text-gray-900 font-semibold">{viewingJob.experience || 'N/A'}</p>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <p className="text-gray-600 text-xs font-semibold mb-1">Lieu</p>
                <p className="text-gray-900 font-semibold">{`${viewingJob.ville || ''}, ${viewingJob.pays || ''}`}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 text-xs font-semibold mb-1">Télétravail</p>
                <p className="text-gray-900 font-semibold">{viewingJob.teletravail ? 'Autorisé' : 'Non autorisé'}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 text-xs font-semibold mb-1">Niveau d'études</p>
                <p className="text-gray-900 font-semibold">{viewingJob.niveau_etudes || 'N/A'}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to={`/dashboard_candidature_spec/${viewingJob.id}`}>
              <Button className="bg-green-600 hover:bg-green-700">
                <Eye size={16} className="mr-2" />
                Voir les candidatures ({viewingJob.candidatures || 0})
              </Button>
            </Link>
            <Button variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50 hover:text-orange-600" onClick={() => handleUpdate(viewingJob)}>
              <Pencil size={16} className="mr-2" />
              Modifier
            </Button>
            <Button variant="destructive" onClick={() => confirmDelete(viewingJob)}>
              <Trash size={16} className="mr-2" />
              Supprimer
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Description de l'offre</h2>
          <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: viewingJob.description_poste || "Aucune description." }} />
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Missions de l'employé</h2>
          <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: viewingJob.responsabilites || "Aucune mission spécifiée." }} />
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Profil recherché</h2>
          <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: viewingJob.exigences_poste || "Aucun profil spécifié." }} />
        </div>
        <div className="flex gap-3">
          <Link to={`/dashboard_candidature_spec/${viewingJob.id}`}>
            <Button className="bg-green-600 hover:bg-green-700">
              <Eye size={16} className="mr-2" />
              Voir les candidatures ({viewingJob.candidatures || 0})
            </Button>
          </Link>
          <Button variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50 hover:text-orange-600" onClick={() => handleUpdate(viewingJob)}>
            <Pencil size={16} className="mr-2" />
            Modifier
          </Button>
          <Button variant="destructive" onClick={() => confirmDelete(viewingJob)}>
            <Trash size={16} className="mr-2" />
            Supprimer
          </Button>
        </div>
      </div>
    </div>
    );
  };

  return (
    <main className="flex-1 p-5 overflow-auto">
      <AnimatePresence mode="wait">
        {view === "list" ? (
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
      {/* Modal de mise à jour */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier une offre</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="block mb-1 text-sm font-medium">Titre du poste</label>
              <Input
                value={formData.titre_poste}
                onChange={(e) => setFormData({ ...formData, titre_poste: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Rémunération min</label>
              <Input
                type="number"
                value={formData.remuneration_min}
                onChange={(e) =>
                  setFormData({ ...formData, remuneration_min: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Annuler
            </Button>
            <Button onClick={submitUpdate}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmation de suppression */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. L’offre{" "}
              <strong>{selectedJob?.titre_poste}</strong> sera définitivement supprimée.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default JobPostsSection;
