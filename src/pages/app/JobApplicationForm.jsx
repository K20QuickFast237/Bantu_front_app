import HeaderProfil from '@/components/app/HeaderProfil';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import BantulinkLoader from '@/components/ui/BantulinkLoader';
import { toast } from 'sonner';

const JobApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { particulier } = useAuth();
  const [job, setJob] = useState(null);
  const [applicationMethod, setApplicationMethod] = useState('profil'); // 'profil' ou 'docs'
  const [coverLetter, setCoverLetter] = useState(''); // Lettre pour profil
  const [uploadedDocs, setUploadedDocs] = useState({ cv: null, certificats: [] }); // Pour docs
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
        toast.error("Impossible de charger les informations de l'offre.");
      }
    };
    fetchJob();
  }, [id]);

  const handleFileChange = (docName, file) => {
    if (docName === 'certificats') {
      setUploadedDocs(prev => ({ ...prev, certificats: [...prev.certificats, file] }));
    } else {
      setUploadedDocs(prev => ({ ...prev, [docName]: file }));
    }
  };

  const handleSubmitApplication = async () => {
    if (!particulier) {
      toast.error("Veuillez completer votre profil pour pouvoir postuler.");
      // navigate('/connexion');
      return;
    }
    setLoading(true);
    try {
      if (applicationMethod === 'profil') {
        // Postuler avec profil + lettre
        if (!coverLetter.trim()) {
          toast.error("Veuillez rédiger une lettre de motivation.");
          setLoading(false);
          return;
        }
        await api.post('/candidatures', {
          offre_id: job.id,
          type: 'profil',
          motivation_text: coverLetter,
          cv_genere: true
        });
        toast.success("Votre candidature a bien été envoyée !");
        navigate('/mesCandidatures');
      } else {
        // Postuler avec docs
        if (!uploadedDocs.cv) {
          toast.error("Veuillez joindre votre CV.");
          setLoading(false);
          return;
        }
        const formData = new FormData();
        formData.append('offre_id', job.id);
        formData.append('type', 'docs');
        formData.append('cv_url', uploadedDocs.cv);
        uploadedDocs.certificats.forEach(cert => formData.append('certificats[]', cert));

        await api.post('/candidatures', formData);
        toast.success("Votre candidature a bien été envoyée !");
        navigate('/CandidatProfil');
      }
    } catch (error) {
      toast.error(`${error?.message} `||"Erreur lors de l'envoi de la candidature.");
    }
    setLoading(false);
  };

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BantulinkLoader />
      </div>
    );
  }

  return (
    <>
      <HeaderProfil />
      <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 lg:p-8">
        <div className="w-full mx-auto bg-white shadow-lg rounded-lg p-6 lg:p-8">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white border border-gray-300 flex items-center justify-center mr-3 text-sm font-semibold text-gray-800 rounded">
                {job?.employeur?.nom_entreprise?.charAt(0) || "?"}
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{job?.employeur?.nom_entreprise}</h1>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">{job?.titre_poste}</h2>

          {/* Publication Dates */}
          <div className="text-gray-600 text-sm mb-6">
            <p>Date de publication : {job.date_publication}</p>
            <p>Date limite : {job.date_limite_soumission}</p>
          </div>

          {/* Job Details Grid */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-gray-700 mb-8">
            <div>
              <p className="font-semibold text-gray-800">Type de contrat</p>
              <p>{job.type_contrat}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Lieu</p>
              <p>{job.ville}, {job.pays}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Salaire</p>
              <p>{job.remuneration_min} - {job.remuneration_max} FCFA</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Expérience</p>
              <p>{job.experience_requise} ans</p>
            </div>
          </div>

          {/* Ma candidature Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h3 className="text-orange-500 text-xl font-bold mb-4">Méthode de candidature</h3>
            <div className="space-y-4">
              <label className="flex items-center text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="applicationMethod"
                  value="profil"
                  checked={applicationMethod === 'profil'}
                  onChange={(e) => setApplicationMethod(e.target.value)}
                  className="form-radio h-5 w-5 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-3">Je postule avec mon profil BantuHire</span>
              </label>
              <label className="flex items-center text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="applicationMethod"
                  value="docs"
                  checked={applicationMethod === 'docs'}
                  onChange={(e) => setApplicationMethod(e.target.value)}
                  className="form-radio h-5 w-5 text-orange-500 border-gray-300 focus:ring-orange-500"
                />
                <span className="ml-3">Je postule avec mon CV</span>
              </label>
            </div>
          </div>

          {/* Dynamique selon la méthode */}
          {applicationMethod === 'profil' ? (
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
              <h3 className="text-emerald-600 text-xl font-bold mb-4">Lettre de motivation</h3>
              <textarea
                className="w-full h-48 p-2 text-gray-800 border border-gray-300 rounded focus:ring-0 focus:outline-none resize-none"
                placeholder="Rédigez votre lettre de motivation ici..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                maxLength={maxCharacters}
                rows={10}
              />
              <div className="text-right text-gray-500 text-sm mt-2">
                {coverLetter.length}/{maxCharacters} caractères
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
              <h3 className="text-orange-500 text-xl font-bold mb-4">Ma candidature</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CV (obligatoire)</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange('cv', e.target.files[0])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  {uploadedDocs.cv && <p className="text-sm text-green-600 mt-1">CV sélectionné</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certificats (optionnel)</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    multiple
                    onChange={(e) => handleFileChange('certificats', [...e.target.files])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  {uploadedDocs.certificats.length > 0 && <p className="text-sm text-green-600 mt-1">{uploadedDocs.certificats.length} certificat(s) sélectionné(s)</p>}
                </div>
                {job.documents_requis && job.documents_requis.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <p className="text-sm font-medium text-blue-800 mb-2">Documents requis :</p>
                    <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
                      {job.documents_requis.map((doc, i) => <li key={i}>{doc}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

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
              Envoyer ma candidature
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobApplicationForm;