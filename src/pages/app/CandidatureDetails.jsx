import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '@/services/api';
import { toast } from 'sonner';
import BantulinkLoader from '@/components/ui/BantulinkLoader';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Download, User, Eye, Calendar } from 'lucide-react';
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
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusChangeLoading, setStatusChangeLoading] = useState({ preselect: false, reject: false });
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewMode, setInterviewMode] = useState('presentiel'); // 'presentiel' ou 'visio'
  const [interviewLocation, setInterviewLocation] = useState('');
  const [interviewLink, setInterviewLink] = useState('');
  const [inviteLoading, setInviteLoading] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await api.get(`/candidatures/${id}`);
        setApplication(response.data);
      } catch (error) {
        toast.error(error.message || "Erreur lors du chargement de la candidature.");
        navigate('/job-application');
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, [id, navigate]);

  const handleStatusChange = async (newStatus) => {
    if (!application) return;

    const loadingKey = newStatus === 'preselectionne' ? 'preselect' : 'reject';
    setStatusChangeLoading(prev => ({ ...prev, [loadingKey]: true }));

    try {
      await api.put(`/candidatures/${application.id}/status`, {
        statut: newStatus,
        note_ia: application.note_ia || 0
      });

      toast.success(newStatus === 'preselectionne' ? t('pages.candidatureDetail.successPreselect') : t('pages.candidatureDetail.successReject'));
      setApplication(prev => ({ ...prev, statut: newStatus }));

    } catch (error) {
      toast.error(error.message || "Erreur lors de la mise à jour du statut.");
    } finally {
      setStatusChangeLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  const handleSendInvitation = async () => {
    if (!interviewDate) {
      toast.error("Veuillez sélectionner une date pour l'entretien.");
      return;
    }
    if (interviewMode === 'presentiel' && !interviewLocation.trim()) {
      toast.error("Veuillez préciser le lieu de l'entretien.");
      return;
    }
    if (interviewMode === 'visio' && !interviewLink.trim()) {
      toast.error("Veuillez fournir le lien pour la visioconférence.");
      return;
    }

    setInviteLoading(true);
    try {
      await api.post(`/candidatures/${id}/inviter`, {
        date_entretien: interviewDate,
        mode_entretien: interviewMode,
        lieu_entretien: interviewMode === 'presentiel' ? interviewLocation : null,
        lien_visio: interviewMode === 'visio' ? interviewLink : null,
      });
      toast.success(t('pages.candidatureDetail.successInvite'));
      setIsInviteModalOpen(false);
      // Réinitialiser les champs
      setInterviewDate('');
      setInterviewMode('presentiel');
      setInterviewLocation('');
      setInterviewLink('');
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de l'envoi de l'invitation.");
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
        <p>Candidature non trouvée.</p>
        <Button onClick={() => navigate('/job-application')} className="mt-4" variant="outline">Retour à la liste</Button>
      </div>
    );
  }

  const { particulier, offre, cv_url, cv_genere } = application;
  console.log(particulier);
  const infos = {
      nom: particulier?.user?.nom || 'N/A',
      prenom: particulier?.user?.prenom || null,
      email: particulier?.user?.email || 'N/A',
      telephone: particulier?.telephone ||'N/A',
      adresse: particulier?.adresse ||'N/A',
  };
  const nomComplet = infos.prenom ? `${infos.nom} ${infos.prenom}` : infos.nom;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-orange-50 p-6 mb-8">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/job-application')}
                        className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                        aria-label="Retour à la liste"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-green-600 mb-2">
                            {t('pages.candidatureDetail.title')} | {offre?.titre_poste || ''} | {nomComplet}
                        </h1>
                        <p className="text-gray-700">
                            {t('pages.candidatureDetail.date')} {application.created_at ? application.created_at.slice(0, 10).split('-').reverse().join('/') : ''}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setIsInviteModalOpen(true)}
                    >
                        <Calendar className="w-4 h-4 mr-2" />
                        {t('pages.candidatureDetail.invite')}
                    </Button>
                    <Button
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={() => handleStatusChange("preselectionne")}
                        disabled={statusChangeLoading.preselect || application.statut === 'preselectionne'}
                    >
                        {statusChangeLoading.preselect ? t('common.loading') : t('pages.candidatureDetail.preselect')}
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => handleStatusChange("rejete")}
                        disabled={statusChangeLoading.reject || application.statut === 'rejete'}
                    >
                        {statusChangeLoading.reject ? t('common.loading') : t('pages.candidatureDetail.reject')}
                    </Button>
                </div>
            </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{t('pages.candidatureDetail.personalInfo')}</h2>
            <div className="space-y-4">
                <div>
                    <span className="font-bold text-gray-900">{t('pages.candidatureDetail.name')} </span>
                    <span className="text-gray-700">{infos.nom}</span>
                </div>
                {infos.prenom && infos.prenom !== 'N/A' && (
                    <div>
                        <span className="font-bold text-gray-900">{t('pages.candidatureDetail.firstname')} </span>
                        <span className="text-gray-700">{infos.prenom}</span>
                    </div>
                )}
                <div>
                    <span className="font-bold text-gray-900">{t('pages.candidatureDetail.address')} </span>
                    <span className="text-gray-700">{infos.adresse}</span>
                </div>
                <div>
                    <span className="font-bold text-gray-900">{t('pages.candidatureDetail.email')} </span>
                    <span className="text-gray-700">{infos.email}</span>
                </div>
                <div>
                    <span className="font-bold text-gray-900">{t('pages.candidatureDetail.phone')} </span>
                    <span className="text-gray-700">{infos.telephone}</span>
                </div>
            </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('pages.candidatureDetail.candidateProfile')}</h2>
            <div className="flex gap-8">
                {cv_genere ? (
                    <button
                      onClick={() => navigate(`/profil_candidat_by_recruteur/${particulier?.user_id}`)}
                      className="text-green-600 hover:text-green-700 font-medium underline flex items-center gap-2"
                    >
                        <User className="w-4 h-4" />
                        {t('pages.candidatureDetail.viewProfile')}
                    </button>
                ) : cv_url ? (
                    <>
                        <a href={`${cv_url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium underline flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            {t('pages.candidatureDetail.previewCV')}
                        </a>
                        <a href={`${cv_url}`} download className="text-green-600 hover:text-green-700 font-medium underline flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            {t('pages.candidatureDetail.downloadCV')}
                        </a>
                    </>
                ) : <p className="text-gray-500">{t('pages.candidatureDetail.noCV')}</p>}
            </div>
        </div>

        {/* Modal d'invitation à l'entretien */}
        <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
          <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                  <DialogTitle>{t('pages.candidatureDetail.inviteModalTitle')}</DialogTitle>
                  <DialogDescription>
                      <span dangerouslySetInnerHTML={{ __html: t('pages.candidatureDetail.inviteModalDesc', { name: nomComplet }) }} />
                  </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                  {/* Mode d'entretien */}
                  <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">{t('pages.candidatureDetail.interviewMode')}</label>
                      <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name="interviewMode" value="presentiel" checked={interviewMode === 'presentiel'} onChange={(e) => setInterviewMode(e.target.value)} className="form-radio text-orange-500" />
                              <span>{t('pages.candidatureDetail.faceToFace')}</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name="interviewMode" value="visio" checked={interviewMode === 'visio'} onChange={(e) => setInterviewMode(e.target.value)} className="form-radio text-orange-500" />
                              <span>{t('pages.candidatureDetail.video')}</span>
                          </label>
                      </div>
                  </div>

                  {/* Champ conditionnel pour le lieu */}
                  {interviewMode === 'presentiel' && (
                      <div>
                          <label htmlFor="interviewLocation" className="block text-sm font-medium text-gray-700 mb-1">{t('pages.candidatureDetail.location')}</label>
                          <Input id="interviewLocation" placeholder={t('pages.candidatureDetail.locationPlaceholder')} value={interviewLocation} onChange={(e) => setInterviewLocation(e.target.value)} />
                      </div>
                  )}

                  {/* Champ conditionnel pour le lien visio */}
                  {interviewMode === 'visio' && (
                      <div>
                          <label htmlFor="interviewLink" className="block text-sm font-medium text-gray-700 mb-1">{t('pages.candidatureDetail.videoLink')}</label>
                          <Input id="interviewLink" placeholder={t('pages.candidatureDetail.videoLinkPlaceholder')} value={interviewLink} onChange={(e) => setInterviewLink(e.target.value)} />
                      </div>
                  )}

                  {/* Date et heure */}
                  <div>
                      <label htmlFor="interviewDate" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('pages.candidatureDetail.dateTime')}
                      </label>
                      <Input
                          id="interviewDate"
                          type="datetime-local"
                          value={interviewDate}
                          onChange={(e) => setInterviewDate(e.target.value)}
                      />
                  </div>
              </div>
              <DialogFooter>
                  <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>{t('common.cancel')}</Button>
                  <Button onClick={handleSendInvitation} disabled={inviteLoading}>{inviteLoading ? t('pages.candidatureDetail.sending') : t('pages.candidatureDetail.confirmInvite')}</Button>
              </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  );
};

export default JobApplicationDetail;
