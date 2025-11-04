import { useState, useEffect } from 'react';
import api from '@/services/api';
import { useAuth } from './useAuth';

export const useProfileCompletion = () => {
  const { user, particulier } = useAuth();
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [profileData, setProfileData] = useState({
    infosPersonnelles: 0,
    competences: 0,
    experiences: 0,
    formations: 0,
  });

  useEffect(() => {
    const calculatePersonalInfoCompletion = () => {
      if (!particulier) return 0;
      const requiredFields = [
        'date_naissance', 'telephone', 'adresse', 'ville', 'pays',
        'titre_professionnel', 'resume_profil', 'cv_link', 'lettre_motivation_link',
        'image_profil', 'is_visible',
      ];
      const filledFields = requiredFields.filter(field => particulier[field] && particulier[field].toString().trim() !== '');
      return Math.round((filledFields.length / requiredFields.length) * 100);
    };

    const fetchCompetences = async () => {
      try {
        if (!user?.id) return 0;
        const response = await api.get(`/user/${user.id}/skills`);
        return (Array.isArray(response.data) && response.data.length > 0) ? 100 : 0;
      } catch (error) {
        console.error('Erreur chargement compétences:', error);
        return 0;
      }
    };

    const fetchExperiences = async () => {
      try {
        const response = await api.get('/experiences');
        return (Array.isArray(response.data) && response.data.length > 0) ? 100 : 0;
      } catch (error) {
        console.error('Erreur chargement expériences:', error);
        return 0;
      }
    };

    const fetchFormations = async () => {
      try {
        const response = await api.get('/formations');
        return (Array.isArray(response.data) && response.data.length > 0) ? 100 : 0;
      } catch (error) {
        console.error('Erreur chargement formations:', error);
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
        formations: formationsCompletion,
      };
      setProfileData(newProfileData);

      const totalCompletion = Math.round(
        (infosPersonnellesCompletion + competencesCompletion + experiencesCompletion + formationsCompletion) / 4
      );
      setProfileCompletion(totalCompletion);
    };

    if (user?.id) {
      updateProfileCompletion();
      // On écoute les événements pour rafraîchir le calcul
      const events = ['profile-updated', 'competences-updated', 'experiences-updated', 'formations-updated'];
      events.forEach(event => window.addEventListener(event, updateProfileCompletion));
      return () => events.forEach(event => window.removeEventListener(event, updateProfileCompletion));
    }
  }, [user, particulier]);

  return { profileCompletion, profileData };
};