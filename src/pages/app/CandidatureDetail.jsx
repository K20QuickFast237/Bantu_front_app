import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import HeaderProfil from '../../components/app/HeaderProfil';
import Footer from '../../components/public/Footer';
import api from '@/services/api';
import BantulinkLoader from '@/components/ui/BantulinkLoader';

const CandidatureDetail = () => {
  const { id } = useParams();
  const [candidature, setCandidature] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidature = async () => {
      try {
        const response = await api.get(`/candidatures/${id}`);
        setCandidature(response.data);
      } catch (error) {
        console.error("Erreur lors du fetch de la candidature:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidature();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BantulinkLoader />
      </div>
    );
  }

  if (!candidature) {
    return <p className="text-center mt-20">Candidature non trouvée</p>;
  }

  const { type, particulier, motivation_text, cv_url, certificats, offre } = candidature;

  return (
    <>
      <HeaderProfil />
      <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Détails de la candidature</h1>
            <Link to={`/dashboard_candidature_spec/${offre?.id}`}>
              <button className="text-blue-600 hover:text-blue-800 font-medium">Retour</button>
            </Link>
          </div>

          {/* Infos Candidat */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Candidat</h2>
            <p className="text-gray-700"><strong>Nom :</strong> {particulier?.nom || 'N/A'}</p>
            <p className="text-gray-700"><strong>Adresse :</strong> {particulier?.adresse || 'N/A'}</p>
            <p className="text-gray-700"><strong>Téléphone :</strong> {particulier?.telephone || 'N/A'}</p>
            <p className="text-gray-700"><strong>Email :</strong> {particulier?.email || 'N/A'}</p>
            {/* Ajoutez d'autres infos de infopersonelles si besoin */}
          </div>

          {/* Offre */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Offre d'emploi</h2>
            <p className="text-gray-700"><strong>Titre :</strong> {offre?.titre_poste || 'N/A'}</p>
          </div>

          {/* Contenu conditionnel */}
          {type === 'profil' ? (
            // Affichage pour profil + lettre
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Lettre de motivation</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{motivation_text || 'Aucune lettre fournie'}</p>
              <h3 className="text-lg font-semibold mt-4 mb-2">Infos personnelles complètes</h3>
              <ul className="text-gray-700 space-y-1 list-disc pl-4">
                <li><strong>Date de naissance :</strong> {particulier?.date_naissance || 'N/A'}</li>
                <li><strong>Titre professionnel :</strong> {particulier?.titre_professionnel || 'N/A'}</li>
                <li><strong>Résumé :</strong> {particulier?.resume_profil || 'N/A'}</li>
                {/* Ajoutez d'autres champs de infopersonelles */}
              </ul>
            </div>
          ) : (
            // Affichage pour docs
            <div className="mb-6 p-4 bg-purple-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Documents joints</h2>
              {cv_url && (
                <div className="mb-4 p-3 bg-white rounded border">
                  <p className="font-medium">CV :</p>
                  <a href={cv_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Télécharger CV</a>
                </div>
              )}
              {certificats && certificats.length > 0 && (
                <div>
                  <p className="font-medium mb-2">Certificats :</p>
                  <ul className="space-y-2">
                    {certificats.map((cert, i) => (
                      <li key={i} className="p-3 bg-white rounded border">
                        <a href={cert.url || cert} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                          Certificat {i + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Statut */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Statut</h2>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-800"></div>
              <span className="text-gray-700">candidature</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CandidatureDetail;