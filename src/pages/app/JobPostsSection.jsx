import React, { useState, useEffect } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import api from "@/services/api";
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
    window.location.href = `/dashboard_candidature_spec/${job.id}`;
  };

  if (loading) return <BantulinkLoader />;

  return (
    <main className="flex-1 p-5 overflow-auto">
      <h2 className="text-2xl font-bold mb-2">Vos offres d'emploi</h2>
      <p className="text-gray-500 mb-6 text-sm">Last login: Today at 9:30 AM</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {jobPosts.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl shadow border border-gray-200 p-5 flex flex-col space-y-3"
          >
            <h3 className="font-bold text-lg mb-1">{job.titre_poste}</h3>
            <div className="text-sm text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Date de publication :</span>
                <span>{job.date_publication ? job.date_publication.split('-').reverse().join('/') : 'Non Spécifié'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Deadline :</span>
                <span>{job.date_limite_soumission ? job.date_limite_soumission.split('-').reverse().join('/') : 'Non Spécifié'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏲️</span>
                <span>{job.type_contrat === "cdi" ? "Temps plein" : "Temps partiel"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💰</span>
                <span>Salaire : {job.remuneration_min ? `${job.remuneration_min} - ${job.remuneration_max || ''}` : "Non Spécifié"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📄</span>
                <span>Type de contra : {job.type_contrat ? job.type_contrat.toUpperCase() : "Non Spécifié"}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white px-4"
                onClick={() => handleViewApplications(job)}
              >
                Afficher
              </Button>
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4"
                onClick={() => handleUpdate(job)}
              >
                Modifier
              </Button>
              <Button
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white px-4"
                onClick={() => confirmDelete(job)}
              >
                <Trash className="w-4 h-4 mr-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>

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
