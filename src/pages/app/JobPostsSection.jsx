import React, { useState, useEffect } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import BantulinkLoader from "@/components/ui/BantulinkLoader";

const JobPostsSection = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({ titre_poste: "", remuneration_min: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 🔹 Charger les offres
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

  // 🔹 Ouvrir la modale d'édition
  const handleUpdate = (job) => {
    setSelectedJob(job);
    setFormData({
      titre_poste: job.titre_poste || "",
      remuneration_min: job.remuneration_min || "",
    });
    setOpenDialog(true);
  };

  // 🔹 Soumettre la mise à jour
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

  // 🔹 Ouvrir la modale de confirmation avant suppression
  const confirmDelete = (job) => {
    setSelectedJob(job);
    setIsDeleteModalOpen(true);
  };

  // 🔹 Supprimer après confirmation
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

  if (loading) return <BantulinkLoader />;

  return (
    <main className="flex-1 p-5 overflow-auto">
      <div className="space-y-3">
        {jobPosts.map((job) => (
          <div
            key={job.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transform hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-2.5 h-2.5 rounded-full ${job.statusColor}`}></div>
              <div>
                <h4 className="font-medium text-sm text-gray-900">{job.titre_poste}</h4>
                <p className="text-xs text-gray-600">{job.company}</p>
                <p className="text-xs text-gray-500">
                  Posté il y a {job.postedDays} jours • {job.applicants} candidats
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="hover:scale-105 transition-transform"
                onClick={() => handleViewApplications(job)}
              >
                <Eye className="w-3.5 h-3.5 mr-1.5" />
                Voir candidatures
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:scale-105 transition-transform text-blue-600 border-blue-200"
                onClick={() => handleUpdate(job)}
              >
                <Pencil className="w-3.5 h-3.5 mr-1.5" />
                Modifier
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:scale-105 transition-transform text-red-600 border-red-200"
                onClick={() => confirmDelete(job)}
              >
                <Trash className="w-3.5 h-3.5 mr-1.5" />
                Supprimer
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔸 Modal de mise à jour */}
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

      {/* 🔸 Modal de confirmation de suppression */}
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
