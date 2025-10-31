import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

      toast.success(`Candidature ${newStatus === 'preselectionne' ? 'présélectionnée' : 'rejetée'} avec succès.`);
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
    setInviteLoading(true);
    try {
      await api.post(`/candidatures/${id}/inviter`, {
        date_entretien: interviewDate,
      });
      toast.success("Invitation à l'entretien envoyée avec succès !");
      setIsInviteModalOpen(false);
      setInterviewDate('');
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
      nom: particulier?.nom || 'N/A',
      prenom: particulier?.prenom || null,
      email: particulier?.email || 'N/A',
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
                            Candidature | {offre?.titre_poste || ''} | {nomComplet}
                        </h1>
                        <p className="text-gray-700">
                            Date de candidature : {application.created_at ? application.created_at.slice(0, 10).split('-').reverse().join('/') : ''}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setIsInviteModalOpen(true)}
                    >
                        <Calendar className="w-4 h-4 mr-2" />
                        Inviter à un entretien
                    </Button>
                    <Button
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={() => handleStatusChange("preselectionne")}
                        disabled={statusChangeLoading.preselect || application.statut === 'preselectionne'}
                    >
                        {statusChangeLoading.preselect ? 'Chargement...' : 'Présélectionner'}
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => handleStatusChange("rejete")}
                        disabled={statusChangeLoading.reject || application.statut === 'rejete'}
                    >
                        {statusChangeLoading.reject ? 'Chargement...' : 'Rejeter'}
                    </Button>
                </div>
            </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Informations personnelles</h2>
            <div className="space-y-4">
                <div>
                    <span className="font-bold text-gray-900">Nom : </span>
                    <span className="text-gray-700">{infos.nom}</span>
                </div>
                {infos.prenom && infos.prenom !== 'N/A' && (
                    <div>
                        <span className="font-bold text-gray-900">Prénom : </span>
                        <span className="text-gray-700">{infos.prenom}</span>
                    </div>
                )}
                <div>
                    <span className="font-bold text-gray-900">Adresse : </span>
                    <span className="text-gray-700">{infos.adresse}</span>
                </div>
                <div>
                    <span className="font-bold text-gray-900">Email : </span>
                    <span className="text-gray-700">{infos.email}</span>
                </div>
                <div>
                    <span className="font-bold text-gray-900">Téléphone : </span>
                    <span className="text-gray-700">{infos.telephone}</span>
                </div>
            </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Profil candidat</h2>
            <div className="flex gap-8">
                {cv_genere ? (
                    <button
                      onClick={() => navigate(`/profil_candidat_by_recruteur/${particulier?.user_id}`)}
                      className="text-green-600 hover:text-green-700 font-medium underline flex items-center gap-2"
                    >
                        <User className="w-4 h-4" />
                        Voir le profil du candidat
                    </button>
                ) : cv_url ? (
                    <>
                        <a href={`/storage/${cv_url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium underline flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Prévisualiser le CV
                        </a>
                        <a href={`/storage/${cv_url}`} download className="text-green-600 hover:text-green-700 font-medium underline flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Télécharger le CV
                        </a>
                    </>
                ) : <p className="text-gray-500">Aucun CV ou profil BantuLink fourni.</p>}
            </div>
        </div>

        {/* Modal d'invitation à l'entretien */}
        <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>Inviter à un entretien</DialogTitle>
                  <DialogDescription>
                      Sélectionnez une date et une heure pour l'entretien avec <strong>{nomComplet}</strong>.
                  </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                  <label htmlFor="interviewDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Date et heure de l'entretien
                  </label>
                  <Input
                      id="interviewDate"
                      type="datetime-local"
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                  />
              </div>
              <DialogFooter>
                  <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>Annuler</Button>
                  <Button onClick={handleSendInvitation} disabled={inviteLoading}>{inviteLoading ? 'Envoi...' : 'Confirmer l\'invitation'}</Button>
              </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  );
};

export default JobApplicationDetail;
