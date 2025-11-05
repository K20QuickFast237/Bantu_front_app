import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Download, Share2, User, Briefcase, Linkedin, Github, Globe, ChevronLeft } from 'lucide-react';
import api from '@/services/api';
import { toast } from 'sonner';
import BantulinkLoader from '@/components/ui/BantulinkLoader';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export default function ProfilCandidatByRecruteur() {
  const { t } = useTranslation();
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
        setCandidat(response.data);
      } catch (error) {
        toast.error(t('candidateProfile.errorLoading'));
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidat();
  }, [id, navigate, t]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BantulinkLoader />
      </div>
    );
  }

  if (!candidat) {
    return (
      <div className="text-center py-10">
        <p>{t('candidateProfile.notFound')}</p>
        <Button onClick={() => navigate(-1)} className="mt-4" variant="outline">{t('candidateProfile.back')}</Button>
      </div>
    );
  }

  const { particulier, experiences, skills } = candidat;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-10 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <Button onClick={() => navigate(-1)} variant="ghost" className="mb-4">
            <ChevronLeft size={20} className="mr-2" />
            {t('candidateProfile.back')}
          </Button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('candidateProfile.profileOf')} {candidat.prenom} {candidat.nom}</h1>
          <p className="text-gray-600 text-sm">{t('candidateProfile.memberSince')} {new Date(candidat.created_at).toLocaleDateString('fr-FR')}</p>
        </div>

        {/* Personal Info Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">{t('applicationDetails.personalInfo')}</h2>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Photo */}
            <div className="flex-shrink-0">
              {particulier?.image_profil ? (
                <img src={particulier.image_profil} alt={t('personalInfo.profilePhotoAlt')} className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md" />
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
                <p className="text-green-600 font-semibold">{t('candidateProfile.visibility')} :</p>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${particulier?.is_visible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {particulier?.is_visible ? t('candidateProfile.visibleToRecruiters') : t('candidateProfile.notVisible')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Summary */}
        {particulier?.resume_profil && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('candidateProfile.profileSummary')}</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{particulier.resume_profil}</p>
          </div>
        )}

        {/* Experiences */}
        {experiences?.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('experiences.title')}</h2>
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
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('skills.title')}</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  {skill.nom} ({skill.niveau})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education (Statique pour le moment) */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('formations.title')}</h2>
          <div className="space-y-6">
            {[
              { school: 'Université de Yaoundé I', location: 'Yaoundé, Cameroun', title: 'Licence en Informatique', date: '2018 - 2021', skills: 'Algorithmique, Bases de données' },
              { school: 'OpenClassrooms', location: 'En ligne', title: 'Développeur d\'application - PHP / Symfony', date: '2022', skills: 'PHP, Symfony, React' },
            ].map((edu, idx) => (
              <div key={idx} className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-gray-800">{edu.title}</h3>
                <p className="text-gray-600 text-sm">{edu.school} • {edu.location}</p>
                <p className="text-gray-500 text-sm">{edu.date}</p>
                <p className="text-gray-600 text-sm mt-2">{t('candidateProfile.skillsAcquired')} : {edu.skills}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Resources */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('resources.title')}</h2>
          <div className="space-y-3">
            {particulier?.cv_link && (
              <div className="flex items-center gap-4">
                <Download size={16} className="text-gray-500" />
                <a href={particulier.cv_link} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-sm flex items-center gap-2">
                  <span>{t('candidateProfile.downloadCv')}</span>
                </a>
              </div>
            )}
            {/* Liens statiques pour le moment */}
            <div className="flex items-center gap-4">
              <Globe size={16} className="text-gray-500" />
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-sm">
                portfolio-candidat.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Linkedin size={16} className="text-gray-500" />
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-sm">
                linkedin.com/in/candidat-profil
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Github size={16} className="text-gray-500" />
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-sm">
                github.com/candidat-profil
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}