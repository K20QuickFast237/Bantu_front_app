import React, { useEffect, useState } from 'react';
// Importation de motion et ArrowLeft nécessaire pour la flèche animée
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from "lucide-react"; 

import HeaderProfil from "../../components/app/HeaderProfil";
import Footer from '@/components/public/Footer';
import PageWrapper from '@/components/public/PageWrapper';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
  Users
} from "lucide-react";
import BantulinkLoader from '@/components/ui/BantulinkLoader';
import { useTranslation } from 'react-i18next';

const JobOfferPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const { particulier, user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/offres/${id}`); // ✅ API dynamique
        console.log(response.data);
        setJob(response.data);
      } catch (error) {
        console.error("Erreur lors du fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApplyClick = () => {
    // Vérifie si l'objet 'particulier' existe et n'est pas vide.
    if (!particulier || Object.keys(particulier).length === 0) {
      toast.info(t('jobOfferPage.completeProfile'));
      setProfileModalOpen(true);
    } else {
      navigate(`/jobApplicationform/${job.id}`);
    }
  };

  const onProfileComplete = () => {
    navigate(`/jobApplicationform/${job.id}`);
  };

  const handleSaveOffer = async () => {
    if (!user) {
      toast.info(t('jobOfferPage.loginToSave'));
      navigate('/login');
      return;
    }

    if (!job || !job.id) {
      toast.error(t('jobOfferPage.noJobId'));
      return;
    }

    setIsSaving(true);
    try {
      await api.post('/favoris/ajouter', {
        offre_emploi_id: job.id
      });
      toast.success(t('jobOfferPage.savedSuccess'));
    } catch (error) {
      const errorMessage = error.response?.data?.message || t('jobOfferPage.saveError');
      // Gère le cas où l'offre est déjà en favoris (conflit)
      toast.error(errorMessage, { description: error.response?.status === 409 ? t('jobOfferPage.alreadySaved') : "" });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <HeaderProfil />
        <div className="flex justify-center items-center min-h-screen">
          <BantulinkLoader />
        </div>
        <Footer />
      </PageWrapper>
    );
  }

  if (!job) {
    return (
      <PageWrapper>
        <HeaderProfil />
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-gray-500">{t('jobOfferPage.jobNotFound')}</p>
        </div>
        <Footer />
      </PageWrapper>
    );
  }

  return (
    <>
      <PageWrapper>
        <HeaderProfil />
        {loading ? (
          <BantulinkLoader />
        ) : (
          <div className="bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Breadcrumb */}
                <nav className="flex mb-6" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2">
                    <li>
                      <div className="flex items-center">
                        <Link to="/jobs" className="text-gray-500 hover:text-gray-700">
                          <ArrowLeft className="h-5 w-5" />
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <svg className="flex-shrink-0 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <Link to="/jobs" className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">{t('jobOfferPage.jobs')}</Link>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <span className="ml-2 text-sm font-medium text-gray-500">{job.titre_poste}</span>
                      </div>
                    </li>
                  </ol>
                </nav>

                {/* Job Details */}
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left Column */}
                  <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.titre_poste}</h1>
                      <div className="flex items-center text-gray-600 mb-6">
                        <div className="flex items-center">
                          <Users className="w-5 h-5 mr-2" />
                          <span>{t('jobOfferPage.teamSize', { size: job.taille_equipe })}</span>
                        </div>
                        <div className="flex items-center ml-6">
                          <MapPin className="w-5 h-5 mr-2" />
                          <span>{job.ville}, {job.pays}</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold text-gray-900 mb-2">{t('jobOfferPage.salary')}</h3>
                        <p className="text-2xl font-bold text-green-600">
                          {job.remuneration_min} - {job.remuneration_max} {t('jobOfferPage.currency')}
                        </p>
                      </div>

                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <h2 className="text-2xl font-bold text-orange-500 mb-4">{t('jobOfferPage.description')}</h2>
                        <div className="text-gray-700 leading-relaxed prose" dangerouslySetInnerHTML={{ __html: job.description_poste || t('jobOfferPage.noDescription') }} />
                      </div>
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <h2 className="text-2xl font-bold text-orange-500 mb-4">{t('jobOfferPage.responsibilities')}</h2>
                        <div className="text-gray-700 leading-relaxed prose" dangerouslySetInnerHTML={{ __html: job.responsabilites || t('jobOfferPage.noResponsibilities') }} />
                      </div>
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <h2 className="text-2xl font-bold text-orange-500 mb-4">{t('jobOfferPage.requirements')}</h2>
                        <div className="text-gray-700 leading-relaxed prose" dangerouslySetInnerHTML={{ __html: job.exigences_poste || t('jobOfferPage.noRequirements') }} />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:w-full">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm sticky top-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">{t('jobOfferPage.aboutCompany')}</h3>

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
                    {t('jobOfferPage.apply')}
                  </button>
                  <button onClick={handleSaveOffer} disabled={isSaving} className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 shadow-md hover:bg-gray-50 transition-colors disabled:bg-gray-200 flex items-center">
                    {isSaving && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                    {isSaving ? t('jobOfferPage.saving') : t('jobOfferPage.save')}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
        <Footer />
      </PageWrapper>
      <ProfileCompletionModal
        isOpen={isProfileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onProfileComplete={onProfileComplete}
      />
    </>
  );
};

export default JobOfferPage;