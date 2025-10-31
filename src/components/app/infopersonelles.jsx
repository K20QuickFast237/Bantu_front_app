import React, { useEffect, useState } from 'react';
import { Mail, Phone, User, Edit, Map, Eye, FileText, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import { toast } from 'sonner';
import { Switch } from '@radix-ui/react-switch';
import { useTranslation } from 'react-i18next';

const Infopersonelles = ({ onEditClick }) => {
  const { t } = useTranslation();
  const { user, particulier, token } = useAuth();
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [profileData, setProfileData] = useState({
    infosPersonnelles: 0,
    competences: 0,
    experiences: 0,
    formations: 0
  });
  const [isUpdatingVisibility, setIsUpdatingVisibility] = useState(false);

  useEffect(() => {
    const calculatePersonalInfoCompletion = () => {
      if (!particulier) return 0;
      
      const requiredFields = [
        'date_naissance',
        'telephone',
        'adresse',
        'ville',
        'pays',
        'titre_professionnel',
        'resume_profil',
        'cv_link',
        'lettre_motivation_link',
        'image_profil',
        'is_visible',
      ];
      
      const filledFields = requiredFields.filter(field => {
        return particulier[field] && particulier[field].toString().trim() !== '';
      });
      
      return Math.round((filledFields.length / requiredFields.length) * 100);
    };

    const fetchCompetences = async () => {
      try {
        if (!user?.id) return;
        const response = await api.get(`/user/${user.id}/skills`);
        const competences = Array.isArray(response.data) ? response.data : [];
        return competences.length > 0 ? 100 : 0;
      } catch (error) {
        console.error('Erreur lors du chargement des compétences:', error);
        return 0;
      }
    };

    const fetchExperiences = async () => {
      try {
        const response = await api.get('/experiences');
        const experiences = Array.isArray(response.data) ? response.data : [];
        return experiences.length > 0 ? 100 : 0;
      } catch (error) {
        console.error('Erreur lors du chargement des expériences:', error);
        return 0;
      }
    };

    const fetchFormations = async () => {
      try {
        const response = await api.get('/formations');
        const formations = Array.isArray(response.data) ? response.data : [];
        return formations.length > 0 ? 100 : 0;
      } catch (error) {
        console.error('Erreur lors du chargement des formations:', error);
        return 0;
      }
    };

    const updateProfileCompletion = async () => {
      const infosPersonnellesCompletion = calculatePersonalInfoCompletion();
      const competencesCompletion = await fetchCompetences();
      const experiencesCompletion = await fetchExperiences();
      const formationsCompletion = await fetchFormations();

      const newProfileData = {
        infosPersonnelles: infosPersonnellesCompletion,
        competences: competencesCompletion,
        experiences: experiencesCompletion,
        formations: formationsCompletion
      };

      setProfileData(newProfileData);

      const totalCompletion = Math.round(
        (infosPersonnellesCompletion + competencesCompletion + experiencesCompletion + formationsCompletion) / 4
      );
      
      setProfileCompletion(totalCompletion);
    };

    if (user?.id) {
      updateProfileCompletion();
    }

    const profileUpdateListener = () => {
      updateProfileCompletion();
    };

    window.addEventListener('profile-updated', profileUpdateListener);
    window.addEventListener('competences-updated', profileUpdateListener);
    window.addEventListener('experiences-updated', profileUpdateListener);
    window.addEventListener('formations-updated', profileUpdateListener);

    return () => {
      window.removeEventListener('profile-updated', profileUpdateListener);
      window.removeEventListener('competences-updated', profileUpdateListener);
      window.removeEventListener('experiences-updated', profileUpdateListener);
      window.removeEventListener('formations-updated', profileUpdateListener);
    };
  }, [user, particulier]);

  const handleVisibilityToggle = async (checked) => {
    setIsUpdatingVisibility(true);
    const newVisibility = checked ? 1 : 0;

    try {
      const response = await api.put('/profile/particulier', { is_visible: newVisibility }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      window.dispatchEvent(new CustomEvent('profile-updated'));
      toast.success(`Votre profil est maintenant ${newVisibility === 1 ? 'visible' : 'caché'}.`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la visibilité:", error.response?.data || error.message);
      toast.error("Erreur lors de la mise à jour de la visibilité.");
    } finally {
      setIsUpdatingVisibility(false);
    }
  };

  if (particulier) {
    return (
      <div className="p-4 sm:p-6 rounded-lg shadow-md max-w-[95%] mx-auto mb-8 mt-5 border border-gray-200">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-blue-800">
              {t('personalInfo.title')}
            </h2>
            <button
              onClick={onEditClick}
              className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 font-medium text-sm"
            >
              <Edit size={16} className="mr-1" />
              {t('profile.skills.add')}
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row items-start mb-6 gap-6">
            <div className="flex justify-center md:justify-start">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border border-gray-300">
                {particulier.image_profil ? (
                  <img src={`${particulier.image_profil}`} alt="Profil" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <User size={50} className="text-gray-500 sm:size-[60px]" />
                )}
              </div>
            </div>
            <div className="flex-grow w-full">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                {user?.prenom} {user?.nom}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{particulier.titre_professionnel}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-gray-700 text-sm">
                <div className="flex items-center">
                  <Phone size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                  <span>{particulier.telephone}</span>
                </div>
                <div className="flex items-center">
                  <Map className="mr-2 text-gray-500 min-w-[16px]"/>
                  <span className="truncate">{[particulier.adresse, particulier.ville, particulier.pays].filter(Boolean).join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                  <span>
                    {t('personalInfo.age', { 
                      age: new Date().getFullYear() - new Date(particulier.date_naissance).getFullYear() 
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye size={16} className="text-gray-500 min-w-[16px]" />
                  <label htmlFor="visibility-switch" className="text-gray-700 cursor-pointer text-sm">
                    {t('personalInfo.profileVisibility', { 
                      status: particulier.is_visible === false ? t('personalInfo.hidden') : t('personalInfo.visible') 
                    })}
                  </label>
                  {isUpdatingVisibility ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Switch id="visibility-switch" checked={particulier.is_visible === true} onCheckedChange={handleVisibilityToggle} />
                  )}
                </div>
                <div className="flex items-center col-span-2">
                  <Mail size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                  <span className="truncate">{particulier.resume_profil}</span>
                </div>
                {particulier.cv_link && (
                  <div className="flex items-center">
                    <FileText size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                    <a href={`/storage/${particulier.cv_link}`} target="_blank" rel="noopener noreferrer" className="text-[#10B981] hover:underline truncate">
                      {t('personalInfo.viewCV')}
                    </a>
                  </div>
                )}
                {particulier.lettre_motivation_link && (
                  <div className="flex items-center">
                    <FileText size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                    <a href={`/storage/${particulier.lettre_motivation_link}`} target="_blank" rel="noopener noreferrer" className="text-[#10B981] hover:underline truncate">
                      {t('personalInfo.viewMotivationLetter')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Barre de progression style LinkedIn */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-semibold text-gray-700">
                {t('personalInfo.profileStrength')}
              </h4>
              <span className="text-sm font-medium text-blue-600">{profileCompletion}%</span>
            </div>
            
            <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ease-in-out ${profileCompletion < 30 ? 'bg-red-500' : profileCompletion < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
              {Object.entries(profileData).map(([key, value]) => {
                const label = {
                  infosPersonnelles: t('personalInfo.personalInfo'),
                  competences: t('personalInfo.skills'),
                  experiences: t('personalInfo.experiences'),
                  formations: t('personalInfo.education')
                }[key];
                
                const getStatusColor = (percent) => {
                  if (percent === 0) return 'bg-gray-200 border-gray-300';
                  if (percent < 30) return 'bg-red-100 border-red-200';
                  if (percent < 70) return 'bg-yellow-100 border-yellow-200';
                  return 'bg-green-100 border-green-200';
                };
                
                const getTextColor = (percent) => {
                  if (percent === 0) return 'text-gray-500';
                  if (percent < 30) return 'text-red-700';
                  if (percent < 70) return 'text-yellow-700';
                  return 'text-green-700';
                };
                
                return (
                  <div key={key} className={`p-3 rounded-lg border ${getStatusColor(value)}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">{label}</span>
                      <span className={`text-xs font-bold ${getTextColor(value)}`}>{value}%</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-1.5 mt-2">
                      <div 
                        className={`h-1.5 rounded-full ${value < 30 ? 'bg-red-500' : value < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <p className="text-xs text-gray-500 mt-3">
              {profileCompletion < 30 ? 
                t('personalInfo.incompleteProfile') :
                profileCompletion < 70 ? 
                t('personalInfo.progressingProfile') :
                t('personalInfo.excellentProfile')}
            </p>
          </div>
        </motion.section>
      </div>
    );
  }

  // Si pas de particulier, on ne rend rien, car la modale sera affichée par le parent.
  return null;
};

export default Infopersonelles;