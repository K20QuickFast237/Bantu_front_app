import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";

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

const JobPostsSection = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({ titre_poste: "", remuneration_min: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen]= useState(false);

  // Fetch API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/mesoffres"); // change backend URL
        console.log(res.data.data);
        setJobPosts(res.data.data); // s'assurer que res.data est un tableau
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Delete job
  const handleDelete = async (id) => {
    try {
      await api.delete(`/offres/${id}`);
      setJobPosts(jobPosts.filter((job) => job.id !== id));
    } catch (err) {
      console.error(err);
    }
    setIsDeleteModalOpen(true);
  };

  // Open modal for update
  const handleUpdate = (job) => {
    setSelectedJob(job);
    setFormData({
      titre_poste: job.titre_poste || "Développeur Laravel Senior",
      remuneration_min: job.remuneration_min || 3500,
    });
    setOpenDialog(true);
  };

  // Submit update
  const submitUpdate = async () => {
    try {
      await api.put(`/mesoffres/${selectedJob.id}`, formData);
      setJobPosts(
        jobPosts.map((job) => (job.id === selectedJob.id ? { ...job, ...formData } : job))
      );
      setOpenDialog(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className="flex-1 p-5 overflow-auto">
      <h2 className="text-lg font-semibold mb-4">My Job Posts</h2>
      <div className="space-y-3">
        {jobPosts.map((job) => (
          <div
            key={job.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-transform transform hover:scale-[1.02]"
          >
            <div>
              <h4 className="font-medium text-sm text-gray-900">{job.titre_poste}</h4>
              <p className="text-xs text-gray-600">{job.company}</p>
              <p className="text-xs text-gray-500">
                Rémunération: {job.remuneration_min} € • Status: {job.status}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" onClick={() => handleUpdate(job)}>
                <Edit className="w-3.5 h-3.5 mr-1.5" /> Update
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleDelete(job.id)}>
                <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal ShadCN */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Job</DialogTitle>
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
                onChange={(e) => setFormData({ ...formData, remuneration_min: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button onClick={submitUpdate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal suppression */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Êtes-vous sûr de vouloir supprimer ?</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. L'offre sera définitivement supprimée.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button
                type="button"
                className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 text-sm transition-colors"
              >
                Annuler
              </button>
            </DialogClose>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm flex items-center justify-center transition-colors disabled:bg-red-300"
            >
              Supprimer
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default JobPostsSection;
