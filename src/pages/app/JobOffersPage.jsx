import React, { useEffect, useState } from 'react';
// Importation de motion et ArrowLeft nécessaire pour la flèche animée
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from "lucide-react"; 
import { decodeId } from '@/obfuscate';
import { encodeId } from '@/obfuscate';

import HeaderProfil from "../../components/app/HeaderProfil";
import Footer from '@/components/public/Footer';
import PageWrapper from '@/components/public/PageWrapper';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import ProfileCompletionModal from '@/components/app/ProfileCompletionModal';
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Building2,
  FileText,
} from "lucide-react";
import BantulinkLoader from '@/components/ui/BantulinkLoader';

const JobOfferPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const decodedId = decodeId(id);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const { particulier, user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/offres/${decodedId}`); // ✅ API dynamique
        console.log(response.data);
        setJob(response.data);
      } catch (error) {
        console.error("Erreur lors du fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [decodedId]);

  const handleApplyClick = () => {
    // Vérifie si l'objet 'particulier' existe et n'est pas vide.
    if (!particulier || Object.keys(particulier).length === 0) {
      toast.info("Veuillez compléter votre profil pour postuler.");
      setProfileModalOpen(true);
    } else {
      navigate(`/jobApplicationform/${encodeId(job.id)}`);
    }
  };

  const onProfileComplete = () => {
    navigate(`/jobApplicationform/${job.id}`);
  };

  const handleSaveOffer = async () => {
    if (!user) {
      toast.info("Veuillez vous connecter pour sauvegarder une offre.");
      navigate('/login');
      return;
    }

    if (!job || !job.id) {
      toast.error("Impossible de trouver l'identifiant de l'offre.");
      return;
    }

    setIsSaving(true);
    try {
      await api.post('/favoris/ajouter', {
        offre_emploi_id: job.id
      });
      toast.success("Offre sauvegardée avec succès !");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erreur lors de la sauvegarde de l'offre.";
      // Gère le cas où l'offre est déjà en favoris (conflit)
      toast.error(errorMessage, { description: error.response?.status === 409 ? "Cette offre est peut-être déjà dans vos favoris." : "" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <PageWrapper>
        <ProfileCompletionModal
          isOpen={isProfileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          onComplete={onProfileComplete}
        />
        <HeaderProfil />
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <BantulinkLoader />
          </div>
        ) : (
          <div className="min-h-screen bg-gray-100 font-sans relative pt-10">
            
            {/* Remplacement du bouton 'retour' par la flèche animée */}
            <button 
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 md:left-10 z-20"
              aria-label="Retour à la page précédente"
            >
              <motion.div
                  className="p-2 cursor-pointer transition-colors"
                  // Animation au survol: petite échelle et décalage vers la gauche
                  whileHover={{ scale: 1.2, x: -5 }} 
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                  {/* Icône ArrowLeft (avec trait) en bleu gras, sans arrière-plan */}
                  <ArrowLeft className="w-8 h-8 text-green-500 drop-shadow-md" />
              </motion.div>
          </button>
          {/* Fin du remplacement */}

          {/* Fixed Footer for mobile */}
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg lg:hidden z-50">
            <div className="flex justify-center gap-4">
              <button onClick={handleApplyClick} className="flex items-center cursor-pointer justify-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors">
                Postuler
              </button>
              <button onClick={handleSaveOffer} disabled={isSaving} className="flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 shadow-md hover:bg-gray-50 transition-colors disabled:bg-gray-200">
                {isSaving && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </div>
          </div>

          <div className="mx-auto bg-white rounded-lg my-8 p-6 md:mx-10 lg:mx-10">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Left Column */}
              <div className="lg:w-2/3">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 pb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white border border-gray-300 flex items-center justify-center mr-3 text-sm font-semibold text-gray-800 rounded">
                      {job.employeur?.logo ? (
                        <img src={job.employeur.logo} alt="Logo" className="w-10 h-10 object-contain" />
                      ) : "Logo"}
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">{job.employeur?.nom_entreprise}</h1>
                  </div>
                  <button className="flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors">
                    Partager
                  </button>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">{job.titre_poste}</h2>

                {/* Dates */}
                <div className="text-gray-600 text-sm mb-6">
                  <p>Date de publication : {job.date_publication}</p>
                  <p>Date limite de soumission : {job.date_limite_soumission}</p>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-gray-700 mb-8">
                  <div>
                    <p className="font-semibold text-gray-800">Type de contrat</p>
                    <p>{job.type_contrat?.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Lieu</p>
                    <p>{job.ville}, {job.pays}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Rémunération</p>
                    <p>{job.remuneration_min} - {job.remuneration_max} XAF</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Fonction</p>
                    <p>{job.fonction}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Statut</p>
                    <p>{job.statut}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Experience</p>
                    <p>{job.experience_requise}</p>
                  </div>
                </div>

                {/* Boutons desktop */}
                <div className="hidden lg:flex gap-4 mb-10">
                  <button onClick={handleApplyClick} className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors">
                    Postuler
                  </button>
                  <button onClick={handleSaveOffer} disabled={isSaving} className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 shadow-md hover:bg-gray-50 transition-colors disabled:bg-gray-200 flex items-center">
                    {isSaving && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                    {isSaving ? 'Sauvegarde...' : 'Sauvegardar'}
                  </button>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-orange-500 text-xl font-bold mb-4">Description du poste</h3>
                  <p className="text-gray-700 leading-relaxed">{job.description_poste}</p>
                </div>

                {/* Responsabilités */}
                {job.responsabilites && (
                  <div className="mb-8">
                    <h3 className="text-orange-500 text-xl font-bold mb-4">Responsabilités</h3>
                    <p className="text-gray-700 leading-relaxed">{job.responsabilites}</p>
                  </div>
                )}

                {/* Exigences */}
                {job.exigences && (
                  <div className="mb-8">
                    <h3 className="text-orange-500 text-xl font-bold mb-4">Exigences</h3>
                    <p className="text-gray-700 leading-relaxed">{job.exigences}</p>
                  </div>
                )}

                {/* Documents requis */}
                {job.documents_requis && (
                  <div className="mb-8">
                    <h3 className="text-orange-500 text-xl font-bold mb-4">Documents requis</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      {JSON.parse(job.documents_requis).map((doc, i) => (
                        <li key={i}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Instructions candidature */}
                {job.instructions_candidature && (
                  <div className="mb-8">
                    <h3 className="text-orange-500 text-xl font-bold mb-4">Instructions pour postuler</h3>
                    <p className="text-gray-700 leading-relaxed">{job.instructions_candidature}</p>
                    <p className="text-gray-700 leading-relaxed">Envoyer à : <a href={`mailto:${job.email_candidature}`} className="text-green-600 underline">{job.email_candidature}</a></p>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="lg:w-1/3">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm sticky top-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">À propos de l'entreprise</h3>

                  <div className="flex items-center mb-4">
                    <Building2 className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-lg font-bold text-gray-900">{job.employeur?.nom_entreprise}</span>
                  </div>

                  <p className="flex items-center text-gray-700 text-sm leading-relaxed mb-4">
                    <FileText className="w-5 h-5 text-gray-500 mr-2" />
                    {job.employeur?.description_entreprise}
                  </p>

                  <p className="flex items-center text-gray-700 text-sm leading-relaxed mb-2">
                    <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                    {job.employeur?.adresse}, {job.ville}, {job.pays}
                  </p>

                  <p className="flex items-center text-gray-700 text-sm leading-relaxed mb-2">
                    <Mail className="w-5 h-5 text-gray-500 mr-2" />
                    {job.employeur?.email_pro}
                  </p>

                  <p className="flex items-center text-gray-700 text-sm leading-relaxed mb-2">
                    <Phone className="w-5 h-5 text-gray-500 mr-2" />
                    {job.employeur?.telephone_pro}
                  </p>

                  <a href={job.employeur?.site_web} target="_blank" rel="noreferrer"
                    className="flex items-center text-green-600 underline">
                    <Globe className="w-5 h-5 mr-2" />
                    {job.employeur?.site_web}
                  </a>
                </div>

              </div>
            </div>

            {/* Bottom buttons */}
            <div className="flex justify-center gap-4 mt-8 py-4 border-t border-gray-200">
              <button onClick={handleApplyClick} className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors">
                Postuler
              </button>
              <button onClick={handleSaveOffer} disabled={isSaving} className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 shadow-md hover:bg-gray-50 transition-colors disabled:bg-gray-200 flex items-center">
                {isSaving && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        </div>
        )}
        <Footer />
      </PageWrapper>
    </>
  );
};

export default JobOfferPage;
