import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '@/services/api';
import BantulinkLoader from '@/components/ui/BantulinkLoader';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Eye, Pencil, Trash, Share2 } from 'lucide-react';
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
import { toast } from 'sonner';

const JobPostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [updateFormData, setUpdateFormData] = useState({ titre_poste: "", remuneration_min: "" });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/offres/${id}`);
                console.log(res.data);
                setJob(res.data);
            } catch (err) {
                toast.error("Erreur lors du chargement de l'offre.");
                navigate('/job-post');
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id, navigate]);

    const handleUpdate = () => {
        setUpdateFormData({
            titre_poste: job.titre_poste || "",
            remuneration_min: job.remuneration_min || "",
        });
        setOpenUpdateDialog(true);
    };

    const submitUpdate = async () => {
        try {
            const res = await api.put(`/offres/${job.id}`, updateFormData);
            setJob(prev => ({ ...prev, ...updateFormData }));
            setOpenUpdateDialog(false);
            toast.success(t('pages.jobPostDetail.updateSuccess'));
        } catch (err) {
            toast.error("Erreur lors de la mise à jour.");
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await api.delete(`/offres/${job.id}`);
            toast.success(t('pages.jobPostDetail.deleteSuccess'));
            setIsDeleteModalOpen(false);
            navigate('/job-post');
        } catch (err) {
            toast.error("Erreur lors de la suppression.");
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><BantulinkLoader /></div>;
    if (!job) return <div className="text-center py-10">Offre non trouvée.</div>;

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Button onClick={() => navigate('/job-post')} variant="ghost" className="mb-6">
          <ChevronLeft size={20} className="mr-2" />
          {t('pages.jobPostDetail.backToList')}
        </Button>

        <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.titre_poste || "Titre non disponible"}</h1>
                        <p className="text-gray-600 text-sm">
                            {t('pages.jobPostDetail.publishedOn')} {job.date_publication ? new Date(job.date_publication).toLocaleDateString('fr-FR') : 'N/A'} | 
                            {t('pages.jobPostDetail.deadline')} {job.date_limite_soumission ? new Date(job.date_limite_soumission).toLocaleDateString('fr-FR') : 'N/A'}
                        </p>
                    </div>
                    <button className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold cursor-pointer">
                        <Share2 size={18} />
                        <span>{t('pages.jobPostDetail.share')}</span>
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <p className="text-gray-600 text-xs font-semibold mb-1">{t('pages.jobPostDetail.contractType')}</p>
                        <p className="text-gray-900 font-semibold">{job.type_contrat || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 text-xs font-semibold mb-1">{t('pages.jobPostDetail.location')}</p>
                        <p className="text-gray-900 font-semibold">{`${job.ville || ''}, ${job.pays || ''}`}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link to={`/dashboard_candidature_spec/${job.id}`}>
                        <Button className="bg-green-600 hover:bg-green-700">
                            <Eye size={16} className="mr-2" />
                            {t('pages.jobPostDetail.viewApplications')} ({job.candidatures_count || 0})
                        </Button>
                    </Link>
                    <Button variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50 hover:text-orange-600" onClick={handleUpdate}>
                        <Pencil size={16} className="mr-2" />
                        {t('pages.jobPostDetail.edit')}
                    </Button>
                    <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>
                        <Trash size={16} className="mr-2" />
                        {t('pages.jobPostDetail.delete')}
                    </Button>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-2xl font-bold text-orange-500 mb-4">{t('pages.jobPostDetail.description')}</h2>
                <div className="text-gray-700 leading-relaxed prose" dangerouslySetInnerHTML={{ __html: job.description_poste || "Aucune description." }} />
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-2xl font-bold text-orange-500 mb-4">{t('pages.jobPostDetail.missions')}</h2>
                <div className="text-gray-700 leading-relaxed prose" dangerouslySetInnerHTML={{ __html: job.responsabilites || "Aucune mission spécifiée." }} />
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-2xl font-bold text-orange-500 mb-4">{t('pages.jobPostDetail.profile')}</h2>
                <div className="text-gray-700 leading-relaxed prose" dangerouslySetInnerHTML={{ __html: job.exigences || "Aucun profil spécifié." }} />
            </div>
        </div>

        {/* Modal de mise à jour */}
        <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
            <DialogContent>
                <DialogHeader><DialogTitle>{t('pages.jobPostDetail.editModalTitle')}</DialogTitle></DialogHeader>
                <div className="space-y-4 mt-2">
                    <div>
                        <label className="block mb-1 text-sm font-medium">{t('pages.jobPostDetail.jobTitle')}</label>
                        <Input value={updateFormData.titre_poste} onChange={(e) => setUpdateFormData({ ...updateFormData, titre_poste: e.target.value })} />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">{t('pages.jobPostDetail.minSalary')}</label>
                        <Input type="number" value={updateFormData.remuneration_min} onChange={(e) => setUpdateFormData({ ...updateFormData, remuneration_min: e.target.value })} />
                    </div>
                </div>
                <DialogFooter className="mt-4 flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setOpenUpdateDialog(false)}>{t('pages.jobPostDetail.cancel')}</Button>
                    <Button onClick={submitUpdate}>{t('pages.jobPostDetail.save')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* Modal de confirmation de suppression */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('pages.jobPostDetail.confirmDeleteTitle')}</DialogTitle>
                    <DialogDescription>
                        <span dangerouslySetInnerHTML={{ __html: t('pages.jobPostDetail.confirmDeleteDesc', { title: job?.titre_poste }) }} />
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">{t('pages.jobPostDetail.cancel')}</Button></DialogClose>
                    <Button variant="destructive" onClick={handleConfirmDelete}>{t('pages.jobPostDetail.delete')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>
    );
};

export default JobPostDetail;