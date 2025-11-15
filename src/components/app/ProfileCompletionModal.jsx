import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Loader2, Trash2 } from 'lucide-react';

const ProfileCompletionModal = ({ isOpen, onClose, onComplete }) => {
  const { user, particulier, refreshAuth } = useAuth();
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(particulier?.image_profil ? `${particulier.image_profil}` : '');
  const [cvFile, setCvFile] = useState(null);
  const [lettreFile, setLettreFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ressources, setRessources] = useState(particulier?.ressources ? JSON.parse(particulier.ressources) : []);

  const validationSchema = Yup.object({
    date_naissance: Yup.date().required('La date de naissance est requise'),
    telephone: Yup.string().required('Le téléphone est requis'),
    adresse: Yup.string().required("L'adresse est requise"),
    ville: Yup.string().required('La ville est requise'),
    pays: Yup.string().required('Le pays est requis'),
    titre_professionnel: Yup.string().required('Le titre professionnel est requis'),
    resume_profil: Yup.string().required('Le résumé du profil est requis'),
    // La validation du CV et de la lettre est maintenant conditionnelle
    cv_file: Yup.mixed().when('cv_link', {
      is: (cv_link) => !cv_link, // Requis seulement si aucun lien de CV n'existe
      then: (schema) => schema.nullable(),
    }),
    lettre_motivation_file: Yup.mixed().when('lettre_motivation_link', {
      is: (lettre_motivation_link) => !lettre_motivation_link, // Requis seulement si aucun lien de lettre n'existe
      then: (schema) => schema.nullable(),
    }),
    cv_link: Yup.string().url('Le lien du CV doit être une URL valide').nullable(),
    lettre_motivation_link: Yup.string().url('Le lien de la lettre de motivation doit être une URL valide').nullable(),
    is_visible: Yup.boolean(),
    ressources: Yup.string().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      date_naissance: particulier?.date_naissance || '',
      telephone: particulier?.telephone || '',
      adresse: particulier?.adresse || '',
      ville: particulier?.ville || '',
      pays: particulier?.pays || '',
      titre_professionnel: particulier?.titre_professionnel || '',
      resume_profil: particulier?.resume_profil || '',
      image_profil_file: particulier?.image_profil || '',
      cv_file: '',
      lettre_motivation_file: '',
      cv_link: particulier?.cv_link || '',
      lettre_motivation_link: particulier?.lettre_motivation_link || '',
      ressources: particulier?.ressources || '[]',
      is_visible: particulier?.is_visible == true, // Initialisation en booléen
    },
    context: { // On passe l'objet 'particulier' au contexte de validation
      particulier: particulier
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsSubmitting(true);

      // 1. Créer une copie des valeurs pour ne pas modifier l'état de Formik directement
      const valuesToSubmit = { ...values };

      // 2. Logique de gestion des fichiers.
      // On ne veut pas envoyer les champs `_file` qui sont dans `initialValues` pour la validation.
      delete valuesToSubmit.cv_file;
      delete valuesToSubmit.lettre_motivation_file;

      // Si un nouveau fichier est uploadé, on supprime l'ancien lien des données à envoyer.
      // Si aucun nouveau fichier n'est uploadé, on supprime aussi le lien pour ne pas le renvoyer inutilement.
      if (imageFile) delete valuesToSubmit.image_profil_file;
      delete valuesToSubmit.cv_link; // Toujours supprimer, car soit on envoie un nouveau fichier, soit on ne change rien.
      delete valuesToSubmit.lettre_motivation_link; // Idem pour la lettre.

      // On s'assure que la valeur la plus récente des ressources (depuis l'état) est utilisée.
      valuesToSubmit.ressources = JSON.stringify(ressources);

      const formData = new FormData()

      // Convertir le booléen is_visible en 1 ou 0 pour le backend
      valuesToSubmit.is_visible = values.is_visible ? 1 : 0;

      Object.entries(valuesToSubmit).forEach(([key, value]) => formData.append(key, value));
      
      if (imageFile) formData.append('image_profil_file', imageFile);
      if (cvFile) formData.append('cv_file', cvFile);
      if (lettreFile) formData.append('lettre_motivation_file', lettreFile);
      try {
        let response;
        if (particulier && Object.keys(particulier).length > 0) {
          formData.append('_method', 'PUT');
          response = await api.post('/profile/particulier', formData);
        } else {
          response = await api.post('/profile/particulier', formData);
        }

        const updatedParticulier = response.data.data || {};

        setPreviewImage(updatedParticulier.image_profil ? `${updatedParticulier.image_profil}` : '');
        // Dispatch event to update profile completion bar
        await refreshAuth();
        window.dispatchEvent(new CustomEvent('profile-updated'));

        toast.success('Profil mis à jour avec succès !');
        onClose();
        if (onComplete) {
          onComplete();
        }
      } catch (error) {
        console.error("Update error:", error.response?.data || error.message);
        toast.error('Erreur lors de la mise à jour du profil.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCvUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      formik.setFieldValue('cv_file', file); // Mettre à jour Formik
      setCvFile(file);
    }
  };

  const handleLettreUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      formik.setFieldValue('lettre_motivation_file', file); // Mettre à jour Formik
      setLettreFile(file);
    }
  };

  const removeFile = (setFile) => {
    setFile(null);
  };

  const [nouveauNom, setNouveauNom] = useState('');
  const [nouveauLien, setNouveauLien] = useState('');

  const handleAjouterRessource = () => {
    if (nouveauNom && nouveauLien) {
      setRessources([...ressources, { nom: nouveauNom, lien: nouveauLien }]);
      setNouveauNom('');
      setNouveauLien('');
    }
  };

  const handleSupprimerRessource = (index) => {
    const nouvellesRessources = [...ressources];
    nouvellesRessources.splice(index, 1);
    setRessources(nouvellesRessources);
  };

  useEffect(() => {
    // Mettre à jour le champ Formik 'ressources' à chaque changement de l'état 'ressources'
    formik.setFieldValue('ressources', JSON.stringify(ressources));
  }, [ressources, formik.setFieldValue]);

  useEffect(() => {
    if (particulier?.ressources) {
      try {
        const parsedRessources = JSON.parse(particulier.ressources);
        if (Array.isArray(parsedRessources)) {
          setRessources(parsedRessources);
        } else {
          console.error("ressources n'est pas un tableau:", parsedRessources);
        }
      } catch (error) {
        console.error("Erreur lors de l'analyse de ressources:", error);
      }
    }
  }, [particulier?.ressources]);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Compléter votre profil</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour compléter votre profil et augmenter votre visibilité.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Les champs du formulaire sont ici, je les omets pour la lisibilité mais ils sont identiques à ceux dans infopersonelles.jsx */}
          {/* ... (copier tous les champs du formulaire de infopersonelles.jsx ici) ... */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
            <input type="date" {...formik.getFieldProps('date_naissance')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formik.touched.date_naissance && formik.errors.date_naissance && <p className="text-red-500 text-xs mt-1">{formik.errors.date_naissance}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input type="tel" {...formik.getFieldProps('telephone')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formik.touched.telephone && formik.errors.telephone && <p className="text-red-500 text-xs mt-1">{formik.errors.telephone}</p>}
          </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
            <input type="text" {...formik.getFieldProps('adresse')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formik.touched.adresse && formik.errors.adresse && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.adresse}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
            <input type="text" {...formik.getFieldProps('ville')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formik.touched.ville && formik.errors.ville && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.ville}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
            <input type="text" {...formik.getFieldProps('pays')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formik.touched.pays && formik.errors.pays && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.pays}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre professionnel</label>
            <input type="text" {...formik.getFieldProps('titre_professionnel')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formik.touched.titre_professionnel && formik.errors.titre_professionnel && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.titre_professionnel}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Résumé profil</label>
            <textarea {...formik.getFieldProps('resume_profil')} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formik.touched.resume_profil && formik.errors.resume_profil && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.resume_profil}</p>
            )}
          </div>
          {/* ... Ajouter tous les autres champs ici (adresse, ville, pays, etc.) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image de profil</label>
            <div className="flex items-center space-x-4">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            {previewImage && (
              <div className="mt-2">
                <img src={previewImage} alt="Aperçu" className="h-20 w-20 rounded-full object-cover border-2 border-gray-300" />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CV</label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleCvUpload} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            <div className="mt-2 space-y-1">
              {cvFile && (
                <div className="flex items-center justify-between text-xs bg-gray-100 p-1 rounded">
                  <span className="text-gray-700 truncate">{cvFile.name}</span>
                  <button type="button" onClick={() => removeFile(setCvFile)} className="text-red-500 hover:text-red-700 ml-2">
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
            {particulier?.cv_link && !cvFile && (
              <p className="text-gray-500 text-xs mt-1">CV actuel : <a href={`${particulier.cv_link}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">voir</a>. Uploader un nouveau fichier le remplacera.</p>            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lettre de motivation</label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleLettreUpload} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            <div className="mt-2 space-y-1">
              {lettreFile && (
                <div className="flex items-center justify-between text-xs bg-gray-100 p-1 rounded">
                  <span className="text-gray-700 truncate">{lettreFile.name}</span>
                  <button type="button" onClick={() => removeFile(setLettreFile)} className="text-red-500 hover:text-red-700 ml-2">
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
            {particulier?.lettre_motivation_link && !lettreFile && (
              <p className="text-gray-500 text-xs mt-1">Lettre actuelle : <a href={`${particulier.lettre_motivation_link}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">voir</a>. Uploader un nouveau fichier la remplacera.</p>            )}
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" 
                checked={formik.values.is_visible} 
                onChange={e => formik.setFieldValue('is_visible', e.target.checked)} 
                className="rounded" />
              <span className="text-sm font-medium text-gray-700">Profil visible pour les recruteurs</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Autres Ressources</label>
            <div className="mb-2">
              {ressources.map((ressource, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-md mb-1">
                  <span>{ressource.nom}: <a href={ressource.lien} target="_blank" rel="noopener noreferrer" className="text-blue-500">{ressource.lien}</a></span>
                  <button
                    type="button"
                    onClick={() => handleSupprimerRessource(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Nom du réseau social"
                value={nouveauNom}
                onChange={(e) => setNouveauNom(e.target.value)}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Lien vers le profil"
                value={nouveauLien}
                onChange={(e) => setNouveauLien(e.target.value)}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
              />
            
            <button
              type="button"
              onClick={handleAjouterRessource}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
            >
              Ajouter une ressource
            </button>
            </div>
            {formik.touched.ressources && formik.errors.ressources && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.ressources}</p>
            )}
          </div>


          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
                Annuler
              </button>
            </DialogClose>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center">
              {isSubmitting && <Loader2 className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />}
              Enregistrer
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileCompletionModal;