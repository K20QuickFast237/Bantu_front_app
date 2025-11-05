import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { toast } from 'sonner';
import BantulinkLoader from '@/components/ui/BantulinkLoader';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Download, User, Eye, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const JobApplicationDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusChangeLoading, setStatusChangeLoading] = useState({ preselect: false, reject: false });
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [interviewDate, setInterviewDate] = useState('');
  const [inviteLoading, setInviteLoading] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await api.get(`/candidatures/${id}`);
        setApplication(response.data);
      } catch (error) {
        toast.error(error.message || t('applicationDetails.errorLoadingApplication'));
        navigate('/job-application');
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, [id, navigate, t]);

  const handleStatusChange = async (newStatus) => {
    if (!application) return;

    const loadingKey = newStatus === 'preselectionne' ? 'preselect' : 'reject';
    setStatusChangeLoading(prev => ({ ...prev, [loadingKey]: true }));

    try {
      await api.put(`/candidatures/${application.id}/status`, {
        statut: newStatus,
        note_ia: application.note_ia || 0
      });

      toast.success(`${t('applicationDetails.application')} ${newStatus === 'preselectionne' ? t('applicationDetails.preselected') : t('applicationDetails.rejected')} ${t('applicationDetails.successfully')}`);
      setApplication(prev => ({ ...prev, statut: newStatus }));

    } catch (error) {
      toast.error(error.message || t('applicationDetails.errorUpdatingStatus'));
    } finally {
      setStatusChangeLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  const handleSendInvitation = async () => {
    if (!interviewDate) {
      toast.error(t('applicationDetails.selectDateAndTime'));
      return;
    }

    setInviteLoading(true);
    try {
      await api.post(`/candidatures/${application.id}/invite`, {
        date_entretien: interviewDate
      });
      toast.success(t('applicationDetails.invitationSent'));
      setIsInviteModalOpen(false);
      setInterviewDate('');
    } catch (error) {
      toast.error(error.response?.data?.message || t('applicationDetails.errorSendingInvitation'));
    } finally {
      setInviteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[500px]">
        <BantulinkLoader />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center py-10">
        <p>{t('applicationDetails.applicationNotFound')}</p>
        <Button onClick={() => navigate('/job-application')} className="mt-4" variant="outline">{t('applicationDetails.backToList')}</Button>
      </div>
    );
  }

  const { particulier, offre, cv_url, cv_genere } = application;
  console.log(particulier);
  const infos = {
      nom: particulier?.nom || t('applicationDetails.notProvided'),
      prenom: particulier?.prenom || null,
      email: particulier?.email || t('applicationDetails.notProvided'),
      telephone: particulier?.telephone || t('applicationDetails.notProvided'),
      adresse: particulier?.adresse || t('applicationDetails.notProvided'),
  };
  const nomComplet = infos.prenom ? `${infos.nom} ${infos.prenom}` : infos.nom;

  const candidateStatut = application.statut === 'preselectionne' ? t('applicationDetails.preselected') : application.statut === 'rejete' ? t('applicationDetails.rejected') : t('applicationDetails.pending');

  const formattedDate = application.created_at ? application.created_at.slice(0, 10).split('-').reverse().join('/') : '';

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-orange-50 p-6 mb-8">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/job-application')}
                        className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                        aria-label={t('applicationDetails.backToList')}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-green-600 mb-2">
                            {t('applicationDetails.application')} | {offre?.titre_poste || ''} | {nomComplet}
                        </h1>
                        <p className="text-gray-700">
                            {t('applicationDetails.applicationDate')} : {formattedDate}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                            <span>{t('applicationDetails.status')} :</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${application.statut === 'preselectionne' ? 'bg-green-100 text-green-800' : application.statut === 'rejete' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {candidateStatut}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setIsInviteModalOpen(true)}
                        disabled={application.statut !== 'preselectionne'}
                    >
                        <Calendar className="w-4 h-4 mr-2" />
                        {t('applicationDetails.inviteInterview')}
                    </Button>
                    <Button
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={() => handleStatusChange("preselectionne")}
                        disabled={statusChangeLoading.preselect || application.statut === 'preselectionne'}
                    >
                        {statusChangeLoading.preselect ? t('applicationDetails.loading') : t('applicationDetails.preselect')}
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => handleStatusChange("rejete")}
                        disabled={statusChangeLoading.reject || application.statut === 'rejete'}
                    >
                        {statusChangeLoading.reject ? t('applicationDetails.loading') : t('applicationDetails.reject')}
                    </Button>
                </div>
            </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{t('applicationDetails.personalInfo')}</h2>
            <div className="space-y-4">
                <div>
                    <span className="font-bold text-gray-900">{t('applicationDetails.name')} : </span>
                    <span className="text-gray-700">{infos.nom}</span>
                </div>
                {infos.prenom && infos.prenom !== t('applicationDetails.notProvided') && (
                    <div>
                        <span className="font-bold text-gray-900">{t('applicationDetails.firstname')} : </span>
                        <span className="text-gray-700">{infos.prenom}</span>
                    </div>
                )}
                <div>
                    <span className="font-bold text-gray-900">{t('applicationDetails.address')} : </span>
                    <span className="text-gray-700">{infos.adresse}</span>
                </div>
                <div>
                    <span className="font-bold text-gray-900">{t('applicationDetails.email')} : </span>
                    <span className="text-gray-700">{infos.email}</span>
                </div>
                <div>
                    <span className="font-bold text-gray-900">{t('applicationDetails.phone')} : </span>
                    <span className="text-gray-700">{infos.telephone}</span>
                </div>
            </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('applicationDetails.cvSection')}</h2>
            <div className="flex gap-8">
                {cv_genere ? (
                    <button
                      onClick={() => navigate(`/profil_candidat_by_recruteur/${particulier?.user_id}`)}
                      className="text-green-600 hover:text-green-700 font-medium underline flex items-center gap-2"
                    >
                        <User className="w-4 h-4" />
                        {t('applicationDetails.viewCandidateProfile')}
                    </button>
                ) : cv_url ? (
                    <>
                        <a href={`/storage/${cv_url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium underline flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            {t('applicationDetails.previewCv')}
                        </a>
                        <a href={`/storage/${cv_url}`} download className="text-green-600 hover:text-green-700 font-medium underline flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            {t('applicationDetails.downloadCv')}
                        </a>
                    </>
                ) : <p className="text-gray-500">{t('applicationDetails.noCvOrProfile')}</p>}
            </div>
        </div>

        {/* Modal d'invitation à l'entretien */}
        <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>{t('applicationDetails.inviteToInterview')}</DialogTitle>
                  <DialogDescription>
                      {t('applicationDetails.selectDateTimeForInterview')} <strong>{nomComplet}</strong>.
                  </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                  <label htmlFor="interviewDate" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('applicationDetails.interviewDateTime')}
                  </label>
                  <Input
                      id="interviewDate"
                      type="datetime-local"
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                  />
              </div>
              <DialogFooter>
                  <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>{t('applicationDetails.cancel')}</Button>
                  <Button onClick={handleSendInvitation} disabled={inviteLoading}>{inviteLoading ? t('applicationDetails.sending') : t('applicationDetails.confirmInvitation')}</Button>
              </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  );
};

export default JobApplicationDetail;