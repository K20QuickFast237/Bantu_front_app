import HeaderProfil from '@/components/app/HeaderProfil';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import BantulinkLoader from '@/components/ui/BantulinkLoader';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const JobApplicationForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { particulier } = useAuth();
  const [job, setJob] = useState(null);
  const [applicationMethod, setApplicationMethod] = useState('bantuHire');
  const [coverLetter, setCoverLetter] = useState('');
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [loading, setLoading] = useState(false);
  const maxCharacters = 2000;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/offres/${id}`);
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
        toast.error(t('jobApplicationForm.loadError'));
      }
    };
    fetchJob();
  }, [id, t]);

  const handleFileChange = (docName, file) => {
    setUploadedDocs(prev => ({
      ...prev,
      [docName]: file
    }));
  };

  const handleSubmitApplication = async () => {
    if (!particulier) {
      toast.error(t('jobApplicationForm.completeProfile'));
      // navigate('/connexion');
      return;
    }
    setLoading(true);
    try {
      if (applicationMethod === 'bantuHire') {
        // Appel API spécifique BantuHire
        await api.post('/candidatures', {
          offre_id: job.id,
          motivation_text: coverLetter,
          cv_genere: true
        });
        toast.success(t('jobApplicationForm.successBantuHire'));
        navigate('/candidatProfil');
      } else {
        // Appel API classique avec fichiers
        const formData = new FormData();
        formData.append('offre_id', job.id);

        // On ajoute toujours les fichiers si présents, sans vérifier documents_requis
        if (uploadedDocs['cv']) {
          formData.append('cv_url', uploadedDocs['cv']);
        } else {
          toast.error(t('jobApplicationForm.cvRequired'));
          setLoading(false);
          return;
        }
        if (uploadedDocs['lettre de motivation']) {
          formData.append('motivation_url', uploadedDocs['lettre de motivation']);
        } else {
          toast.error(t('jobApplicationForm.coverRequired'));
          setLoading(false);
          return;
        }

        await api.post('/candidatures', formData);
        toast.success(t('jobApplicationForm.successClassic'));
        navigate('/candidatProfil');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t('jobApplicationForm.submitError'));
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return <BantulinkLoader />;
  }

  const requiredDocs = job.documents_requis || [];

  return (
    <>
      <HeaderProfil />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{job.titre_poste}</h1>
            <p className="text-gray-600">{job.employeur?.nom_entreprise}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setApplicationMethod('bantuHire')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                  applicationMethod === 'bantuHire'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('jobApplicationForm.bantuHire')}
              </button>
              <button
                onClick={() => setApplicationMethod('classic')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                  applicationMethod === 'classic'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('jobApplicationForm.classic')}
              </button>
            </div>

            {applicationMethod === 'bantuHire' ? (
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('jobApplicationForm.motivationLetter')}</h3>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  maxLength={maxCharacters}
                  placeholder={t('jobApplicationForm.motivationPlaceholder')}
                  className="w-full p-3 border border-gray-300 rounded-lg resize-vertical min-h-[150px] focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-2">
                  {coverLetter.length}/{maxCharacters} {t('jobApplicationForm.characters')}
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('jobApplicationForm.requiredDocuments')}</h3>
                <div className="space-y-4">
                  {requiredDocs.length > 0 ? (
                    requiredDocs.map((docName) => (
                      <label key={docName} className="block">
                        <span className="text-sm font-medium text-gray-700 block mb-2">{docName}</span>
                        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                          <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                          <p className="text-sm text-gray-500 mb-2">{t('jobApplicationForm.chooseFile')}</p>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                            onChange={e => handleFileChange(docName, e.target.files[0])}
                            className="hidden"
                          />
                          {uploadedDocs[docName] && (
                            <div className="mt-4 flex justify-center items-center space-x-2">
                              <span className="text-sm text-green-600">{uploadedDocs[docName].name}</span>
                              <button
                                type="button"
                                className="p-1 text-red-500 hover:text-red-700"
                                onClick={() => setUploadedDocs(prev => {
                                  const copy = { ...prev };
                                  delete copy[docName];
                                  return copy;
                                })}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </label>
                    ))
                  ) : (
                    <p className="text-gray-500">{t('jobApplicationForm.noDocuments')}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Envoyer ma candidature Button */}
          <div className="flex justify-center mt-6">
            <button
              className="px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors flex items-center"
              onClick={handleSubmitApplication}
              disabled={loading}
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              )}
              {t('jobApplicationForm.submit')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobApplicationForm;