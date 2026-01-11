import HeaderProfil from '@/components/app/HeaderProfil';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import BantulinkLoader from '@/components/ui/BantulinkLoader';
import { toast } from 'sonner';
import {
  Building2,
  FileText,
  UploadCloud,
  Trash2,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { decodeId } from '@/obfuscate';

const JobApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { particulier } = useAuth();
  const { t } = useTranslation();
  const decodedId = decodeId(id);
  const [job, setJob] = useState(null);
  const [applicationMethod, setApplicationMethod] = useState('bantuHire');
  const [coverLetter, setCoverLetter] = useState('');
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [loading, setLoading] = useState(true);
  const maxCharacters = 2000;

  const otherRequiredDocs = job?.documents_requis?.filter(
    doc => doc.toLowerCase() !== 'cv' && doc.toLowerCase() !== 'lettre de motivation'
  ) || [];


  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/offres/${decodedId}`);
        let jobData = res.data;
        if (
          typeof jobData.documents_requis === "string" &&
          jobData.documents_requis.startsWith("[")
        ) {
          try {
            jobData.documents_requis = JSON.parse(jobData.documents_requis);
          } catch (e) {
            jobData.documents_requis = [];
          }
        }
        setJob(jobData);
      } catch (error) {
        toast.error("Impossible de charger les informations de l'offre.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [decodedId]);

  const handleFileChange = (docName, file) => {
    setUploadedDocs(prev => ({
      ...prev,
      [docName]: file
    }));
  };

  const handleSubmitApplication = async () => {
    if (!particulier) {
      toast.error(t('pages.jobApplicationForm.completeProfile'));
      return;
    }
    setLoading(true); // Déjà présent, mais on le garde pour la soumission
    const formData = new FormData();
    formData.append('offre_id', job.id);

    try {
      if (applicationMethod === 'bantuHire') {
        formData.append('cv_genere', 'true');
        formData.append('motivation_text', coverLetter);

        // Gestion des autres documents (hors CV et lettre de motivation)
        otherRequiredDocs.forEach((docName, index) => {
          if (uploadedDocs[docName]) {
            formData.append(`doc_titre${index + 1}`, docName);
            formData.append(`doc${index + 1}`, uploadedDocs[docName]);
          } else {
            toast.error(t('pages.jobApplicationForm.missingDoc', { doc: docName }));
            throw new Error(`Document manquant: ${docName}`);
          }
        });
      } else {
        // Méthode "mon CV"
        if (uploadedDocs['CV']) {
          formData.append('cv_file', uploadedDocs['CV']);
        } else {
          toast.error(t('pages.jobApplicationForm.missingCV'));
          throw new Error("CV manquant");
        }

        // Gestion des autres documents requis
        let docIndex = 1;
        otherRequiredDocs.forEach(docName => {
          if (uploadedDocs[docName]) {
            formData.append(`doc_titre${docIndex}`, docName);
            formData.append(`doc${docIndex}`, uploadedDocs[docName]);
            docIndex++;
          } else {
            toast.error(t('pages.jobApplicationForm.missingDoc', { doc: docName }));
            throw new Error(`Document manquant: ${docName}`); // This was already correct
          }
        });
      }

      await api.post('/candidatures', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success(t('pages.jobApplicationForm.success'));
      navigate('/mesCandidatures');
    } catch (error) {
      if (!error.message.startsWith("Document manquant") && !error.message.startsWith("CV manquant")) {
        toast.error(error.response?.data?.message || "Erreur lors de l'envoi de la candidature.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && !job) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BantulinkLoader />
      </div>
    );
  }
  
  return (
    <>
      <HeaderProfil />
      <div className="min-h-screen bg-gray-100 font-sans">
        <div className="container mx-auto py-10 px-4">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Colonne de gauche : Formulaire */}
            <div className="lg:w-2/3 space-y-6">
              {/* Carte d'en-tête de l'offre */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 border flex items-center justify-center mr-4 rounded-md">
                    {job?.employeur?.logo ? <img src={job?.employeur?.logo} alt="Logo" className="w-full h-full object-contain" /> : <Building2 className="w-6 h-6 text-gray-400" />}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{job?.titre_poste}</h1>
                    <p className="text-gray-600">{job?.employeur?.nom_entreprise}</p>
                  </div>
                </div>
                <div className="text-gray-500 text-xs">
                  <span>{t('pages.jobApplicationForm.publishedOn')} {job?.date_publication}</span> | <span>{t('pages.jobApplicationForm.deadline')} {job?.date_limite_soumission}</span>
                </div>
              </div>

              {/* Carte de sélection de la méthode */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">{t('pages.jobApplicationForm.howToApply')}</h3>
                <div className="space-y-4">
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${applicationMethod === 'bantuHire' ? 'bg-green-50 border-green-500' : 'border-gray-300 hover:border-green-400'}`}>
                    <input
                      type="radio"
                      name="applicationMethod"
                      value="bantuHire"
                      checked={applicationMethod === 'bantuHire'}
                      onChange={(e) => setApplicationMethod(e.target.value)}
                      className="form-radio h-5 w-5 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <span className="ml-3 font-medium text-gray-800">{t('pages.jobApplicationForm.withBantuHire')}</span>
                  </label>
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${applicationMethod === 'myCv' ? 'bg-orange-50 border-orange-500' : 'border-gray-300 hover:border-orange-400'}`}>
                    <input
                      type="radio"
                      name="applicationMethod"
                      value="myCv"
                      checked={applicationMethod === 'myCv'}
                      onChange={(e) => setApplicationMethod(e.target.value)}
                      className="form-radio h-5 w-5 text-orange-500 border-gray-300 focus:ring-orange-500"
                    />
                    <span className="ml-3 font-medium text-gray-800">{t('pages.jobApplicationForm.withMyCV')}</span>
                  </label>
                </div>
              </div>

              {/* Contenu dynamique selon la méthode */}
            {applicationMethod === 'bantuHire' ? (
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">{t('pages.jobApplicationForm.coverLetter')}</h3>
                <textarea
                  className="w-full h-48 p-3 text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none resize-none transition-colors"
                  placeholder={t('pages.jobApplicationForm.coverLetterPlaceholder')}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  maxLength={maxCharacters}
                  rows={10}
                />
                <div className="text-right text-gray-500 text-xs mt-2">
                  {coverLetter.length}/{maxCharacters} {t('pages.jobApplicationForm.chars')}
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">{t('pages.jobApplicationForm.uploadCV')}</h3>
                {Array.isArray(job.documents_requis) && job.documents_requis.some(d => d.toLowerCase() === 'cv') ? (
                  <FileUploadItem docName="CV" uploadedFile={uploadedDocs['CV']} onFileChange={handleFileChange} t={t} />
                ) : (
                  <p className="text-gray-500 text-sm">{t('pages.jobApplicationForm.cvNotRequired')}</p>
                )}
              </div>
            )}

            {/* Section pour les autres documents requis */}
            {otherRequiredDocs.length > 0 && (
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">{t('pages.jobApplicationForm.otherDocs')}</h3>
                <div className="space-y-4">
                  {otherRequiredDocs.map((docName, idx) => (
                    <FileUploadItem key={idx} docName={docName} uploadedFile={uploadedDocs[docName]} onFileChange={handleFileChange} t={t} />
                  ))}
                </div>
              </div>
            )}

            {/* Bouton de soumission */}
            <div className="flex justify-center mt-6">
              <button
                className="w-full lg:w-auto px-8 py-3 bg-orange-500 text-white text-base font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors flex items-center justify-center disabled:bg-gray-400"
                onClick={handleSubmitApplication}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5 mr-3" /> : <FileText className="h-5 w-5 mr-3" />}
                {loading ? t('pages.jobApplicationForm.sending') : t('pages.jobApplicationForm.sendApplication')}
              </button>
            </div>
          </div>

          {/* Colonne de droite : Infos entreprise */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{t('pages.jobApplicationForm.aboutCompany')}</h3>
              <div className="flex items-center mb-4">
                <Building2 className="w-5 h-5 text-gray-500 mr-3" />
                <span className="text-base font-bold text-gray-800">{job?.employeur?.nom_entreprise}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {job?.employeur?.description_entreprise || t('pages.jobApplicationForm.noDesc')}
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

const FileUploadItem = ({ docName, uploadedFile, onFileChange, t }) => {
  const handleRemove = () => {
    onFileChange(docName, null);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <p className="font-medium text-gray-800">{t('pages.jobApplicationForm.attach', { doc: docName })} <span className="text-red-500">*</span></p>
        {uploadedFile && (
          <button onClick={handleRemove} className="text-red-500 hover:text-red-700">
            <Trash2 size={16} />
          </button>
        )}
      </div>
      <div className="mt-2">
        {uploadedFile ? (
          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-md">
            <CheckCircle2 size={16} />
            <span className="font-medium truncate">{uploadedFile.name}</span>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm text-gray-500"><span className="font-semibold">{t('pages.jobApplicationForm.clickToUpload')}</span> {t('pages.jobApplicationForm.dragDrop')}</p>
              <p className="text-xs text-gray-500">{t('pages.jobApplicationForm.formats')}</p>
            </div>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={e => onFileChange(docName, e.target.files[0])}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default JobApplicationForm;