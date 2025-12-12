import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Download, Linkedin, Github, Globe, ChevronLeft, User } from 'lucide-react';
import api from '@/services/api';
import BantulinkLoader from '@/components/ui/BantulinkLoader';
import { Button } from '@/components/ui/button';

export default function ProfilCandidatByRecruteur() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidat, setCandidat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidat = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await api.get(`/user/${id}`);
        setCandidat(response.data.data);
      } catch (error) {
        console.error('Error fetching candidate:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidat();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BantulinkLoader />
      </div>
    );
  }

  console.log(candidat);

  if (!candidat) {
    return (
      <div className="text-center py-10">
        <p>Candidat non trouvé.</p>
        <Button onClick={() => navigate(-1)} className="mt-4" variant="outline">Retour</Button>
      </div>
    );
  }

  const { particulier, experiences, skills, formations } = candidat;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-10 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <Button onClick={() => navigate(-1)} variant="ghost" className="mb-4">
            <ChevronLeft size={20} className="mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Profil de {candidat.prenom} {candidat.nom}</h1>
          <p className="text-gray-600 text-sm">Membre depuis {new Date(candidat.email_verified_at).toLocaleDateString('fr-FR')}</p>
        </div>

        {/* Personal Info Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Informations Personnelles</h2>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Photo */}
            <div className="flex-shrink-0">
              {particulier?.image_profil ? (
                <img src={particulier.image_profil} alt="Profil" className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md" />
              ) : (
                <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-20 h-20 text-gray-500" />
                </div>
              )}
            </div>

            {/* Center Info */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{candidat.prenom} {candidat.nom}</h3>
              <p className="text-gray-700 text-sm mb-6">{particulier?.titre_professionnel}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gray-500" />
                  <a href={`mailto:${candidat.email}`} className="text-gray-700 hover:underline">{candidat.email}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-gray-500" />
                  <span className="text-gray-700">{particulier?.telephone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-gray-500" />
                  <span className="text-gray-700">{particulier?.adresse}, {particulier?.ville}, {particulier?.pays}</span>
                </div>
              </div>
            </div>

            {/* Right Info */}
            <div className="flex-1 space-y-4">
              <div className="space-y-2 text-sm">
                <p className="text-green-600 font-semibold">Visibilité :</p>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${particulier?.is_visible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {particulier?.is_visible ? 'Visible par les recruteurs' : 'Non visible'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Summary */}
        {particulier?.resume_profil && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Résumé Du Profil</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{particulier.resume_profil}</p>
          </div>
        )}

        {/* Experiences */}
        {experiences?.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Expériences</h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-4 border-green-600 pl-4">
                  <h3 className="font-semibold text-gray-800">{exp.titre_poste}</h3>
                  <p className="text-gray-600 text-sm">{exp.nom_entreprise} • {exp.ville}, {exp.pays}</p>
                  <p className="text-gray-500 text-sm">{new Date(exp.date_debut).toLocaleDateString('fr-FR')} - {new Date(exp.date_fin).toLocaleDateString('fr-FR')}</p>
                  <p className="text-gray-600 text-sm mt-2">{exp.description_taches}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Competences */}
        {skills?.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Compétences</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  {skill.nom} ({skill.niveau})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {formations?.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Diplômes & Formations</h2>
            <div className="space-y-6">
              {formations.map((formation) => (
                <div key={formation.id} className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-800">{formation.diplome}</h3>
                  <p className="text-gray-600 text-sm">{formation.etablissement}</p>
                  <p className="text-gray-500 text-sm">{new Date(formation.date_debut).toLocaleDateString('fr-FR')} - {new Date(formation.date_fin).toLocaleDateString('fr-FR')}</p>
                  <p className="text-gray-600 text-sm mt-2">Domaine d'étude : {formation.domaine_etude}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Resources */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Autres Ressources</h2>
          <div className="space-y-3">
            {particulier?.cv_link && (
              <div className="flex items-center gap-4 text-sm">
                <Download size={16} className="text-gray-500" />
                <a href={particulier.cv_link} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-sm flex items-center gap-2">
                  <span>Télécharger le CV</span>
                </a>
              </div>
            )}
             {particulier?.ressources &&
                JSON.parse(particulier.ressources).map((ressource, index) => (
                  <div key={index} className="flex items-center gap-4 text-sm">
                    {ressource.nom.toLowerCase().includes('linkedin') ? (
                      <Linkedin size={16} className="text-gray-500" />
                    ) : ressource.nom.toLowerCase().includes('github') ? (
                      <Github size={16} className="text-gray-500" />
                    ) : (
                      <Globe size={16} className="text-gray-500" />
                    )}
                    <a
                      href={ressource.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline text-sm"
                    >
                      {ressource.nom}
                    </a>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}