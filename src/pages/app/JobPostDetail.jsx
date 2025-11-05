import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
import { useTranslation } from 'react-i18next';

const JobPostDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
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
                setJob(res.data);
            } catch (err) {
                toast.error(t('jobPostDetail.loadError'));
                navigate('/job-post');
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id, navigate, t]);

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
            toast.success(t('jobPostDetail.updateSuccess'));
        } catch (err) {
            toast.error(t('jobPostDetail.updateError'));
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await api.delete(`/offres/${job.id}`);
            toast.success(t('jobPostDetail.deleteSuccess'));
            setIsDeleteModalOpen(false);
            navigate('/job-post');
        } catch (err) {
            toast.error(t('jobPostDetail.deleteError'));
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><BantulinkLoader /></div>;
    if (!job) return <div className="text-center py-10">{t('jobPostDetail.notFound')}</div>;

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Button onClick={() => navigate('/job-post')} variant="ghost" className="mb-6">
          <ChevronLeft size={20} className="mr-2" />
          {t('jobPostDetail.backToList')}
        </Button>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{job.titre_poste}</h1>
                <p className="text-gray-600 mt-2">{job.ville}, {job.pays}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleUpdate}>
                  <Pencil className="mr-2 h-4 w-4" />
                  {t('jobPostDetail.edit')}
                </Button>
                <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>
                  <Trash className="mr-2 h-4 w-4" />
                  {t('jobPostDetail.delete')}
                </Button>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  {t('jobPostDetail.share')}
                </Button>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500">{t('jobPostDetail.type')}</p>
                <p className="text-lg font-semibold">{job.type_contrat}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{t('jobPostDetail.salary')}</p>
                <p className="text-lg font-semibold">{job.remuneration_min} - {job.remuneration_max} FCFA</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-orange-500 mb-4">{t('jobPostDetail.description')}</h2>
                <div className="text-gray-700 leading-relaxed prose" dangerouslySetInnerHTML={{ __html: job.description_poste || t('jobPostDetail.noDescription') }} />
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-orange-500 mb-4">{t('jobPostDetail.responsibilities')}</h2>
                <div className="text-gray-700 leading-relaxed prose" dangerouslySetInnerHTML={{ __html: job.responsabilites || t('jobPostDetail.noResponsibilities') }} />
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-orange-500 mb-4">{t('jobPostDetail.requirements')}</h2>
                <div className="text-gray-700 leading-relaxed prose" dangerouslySetInnerHTML={{ __html: job.exigences_poste || t('jobPostDetail.noRequirements') }} />
            </div>
          </div>

          {/* Modal de mise à jour */}
          <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
              <DialogContent>
                  <DialogHeader><DialogTitle>{t('jobPostDetail.editOffer')}</DialogTitle></DialogHeader>
                  <div className="space-y-4 mt-2">
                      <div>
                          <label className="block mb-1 text-sm font-medium">{t('jobPostDetail.jobTitle')}</label>
                          <Input value={updateFormData.titre_poste} onChange={(e) => setUpdateFormData({ ...updateFormData, titre_poste: e.target.value })} />
                      </div>
                      <div>
                          <label className="block mb-1 text-sm font-medium">{t('jobPostDetail.minSalary')}</label>
                          <Input type="number" value={updateFormData.remuneration_min} onChange={(e) => setUpdateFormData({ ...updateFormData, remuneration_min: e.target.value })} />
                      </div>
                  </div>
                  <DialogFooter className="mt-4 flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setOpenUpdateDialog(false)}>{t('jobPostDetail.cancel')}</Button>
                      <Button onClick={submitUpdate}>{t('jobPostDetail.save')}</Button>
                  </DialogFooter>
              </DialogContent>
          </Dialog>

          {/* Modal de confirmation de suppression */}
          <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>{t('jobPostDetail.confirmDelete')}</DialogTitle>
                      <DialogDescription>
                          {t('jobPostDetail.deleteWarning')} <strong>{job?.titre_poste}</strong> {t('jobPostDetail.permanentDelete')}.
                      </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                      <DialogClose asChild><Button variant="outline">{t('jobPostDetail.cancel')}</Button></DialogClose>
                      <Button variant="destructive" onClick={handleConfirmDelete}>{t('jobPostDetail.delete')}</Button>
                  </DialogFooter>
              </DialogContent>
          </Dialog>
        </div>
      </div>
    );
};

export default JobPostDetail;