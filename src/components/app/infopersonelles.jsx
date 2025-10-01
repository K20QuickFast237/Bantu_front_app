import React, { useState, useEffect } from 'react';
import { Camera, Mail, Phone, User, Edit, Search, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import api from '../../services/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const Infopersonelles = () => {
  const { user, token, updateUser } = useAuth(); // Importer la fonction updateUser
  // État pour le fichier image en attente d'upload
  const [imageFile, setImageFile] = useState(null);

  // État pour l'URL de l'image à afficher (soit de l'API, soit un aperçu local)
  const [previewImage, setPreviewImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completionPercent, setCompletionPercent] = useState(25);
  // Add a ref to trigger a hidden file input from the avatar circle/camera button
  const avatarInputRef = React.useRef(null);

  // Calcul du % de complétion
  const calculateCompletion = (data, image) => {
    const totalFields = 11;
    let filledFields = 0;

    if (data.date_naissance) filledFields++;
    if (data.telephone) filledFields++;
    if (data.adresse) filledFields++;
    if (data.ville) filledFields++;
    if (data.pays) filledFields++;
    if (data.titre_professionnel) filledFields++;
    if (data.resume_profil) filledFields++;
    if (image) filledFields++;
    if (data.cv_link) filledFields++;
    if (data.lettre_motivation_link) filledFields++;
    if (data.is_visible === '1') filledFields++;

    const basePercent = 25;
    const progressPercent = (filledFields / totalFields) * 75;
    return Math.min(100, Math.round(basePercent + progressPercent));
  };

  // Validation Yup
  const validationSchema = Yup.object({
    date_naissance: Yup.date().required('Date de naissance requise'),
    telephone: Yup.string().required('Téléphone requis'),
    adresse: Yup.string().required('Adresse requise'),
    ville: Yup.string().required('Ville requise'),
    pays: Yup.string().required('Pays requis'),
    titre_professionnel: Yup.string().required('Titre professionnel requis'),
    resume_profil: Yup.string().required('Résumé profil requis'),
    cv_link: Yup.string().url('URL CV invalide').required('Lien CV requis'),
    lettre_motivation_link: Yup.string().url('URL lettre invalide').required('Lien lettre requis'),
    is_visible: Yup.string().oneOf(['0', '1']).nullable(),
  });

  const formik = useFormik({
    initialValues: {}, // Initialisé vide, sera rempli par l'API
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values, { setErrors }) => {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('date_naissance', values.date_naissance);
      formData.append('telephone', values.telephone);
      formData.append('adresse', values.adresse);
      formData.append('ville', values.ville);
      formData.append('pays', values.pays);
      formData.append('titre_professionnel', values.titre_professionnel);
      formData.append('resume_profil', values.resume_profil);
      if (imageFile) formData.append('image_profil', imageFile);
      formData.append('cv_link', values.cv_link);
      formData.append('lettre_motivation_link', values.lettre_motivation_link);
      formData.append('is_visible', values.is_visible);

      try {
        const response = await api.post('/profile/particulier', formData, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
        });
        const updatedParticulier = response.data.data.particulier || response.data.particulier || {};
        
        // Mettre à jour l'objet utilisateur global dans le contexte
        // pour que les changements persistent à travers la navigation.
        updateUser(prevUser => ({
          ...prevUser,
          particulier: updatedParticulier
        }));

        if (updatedParticulier.image_profil) {
          // L'API retourne une URL complète, on l'utilise directement.
          const imageUrl = updatedParticulier.image_profil;
          setPreviewImage(imageUrl);
        } else {
          // S'il n'y a pas d'image après la mise à jour, on vide l'aperçu
          setPreviewImage(null);
        }
        setImageFile(null);
        setIsModalOpen(false);

        // Utiliser sonner au lieu de react-hot-toast pour la cohérence
        import('sonner').then(({ toast: sonnerToast }) => sonnerToast.success('Profil mis à jour !'));
      } catch (error) {
        console.error('Erreur submit:', error.response?.data || error.message);
        if (error.response?.status === 422 && error.response.data.errors) {
          Object.entries(error.response.data.errors).forEach(([field, messages]) => {
            toast.error(`${field}: ${messages.join(', ')}`);
          });
        } else {
          // Utiliser sonner au lieu de react-hot-toast
          import('sonner').then(({ toast: sonnerToast }) => sonnerToast.error('Erreur lors de la mise à jour du profil'));
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Effet pour charger les données et les synchroniser avec Formik
  useEffect(() => {
    if (user) {
      // Les données de l'utilisateur sont déjà dans le contexte, pas besoin de refaire un appel API.
      const particulierProfile = user.particulier || {}; // Accéder à l'objet "particulier"

      // Mettre à jour les valeurs du formulaire Formik
      formik.setValues({
        date_naissance: particulierProfile.date_naissance || '',
        telephone: particulierProfile.telephone || '',
        adresse: particulierProfile.adresse || '',
        ville: particulierProfile.ville || '',
        pays: particulierProfile.pays || '',
        titre_professionnel: particulierProfile.titre_professionnel || '',
        resume_profil: particulierProfile.resume_profil || '',
        cv_link: particulierProfile.cv_link || '',
        lettre_motivation_link: particulierProfile.lettre_motivation_link || '',
        is_visible: particulierProfile.is_visible ? '1' : '0',
      });

      if (particulierProfile.image_profil) {
        setPreviewImage(particulierProfile.image_profil);
      } else {
        setPreviewImage(null);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // Dépend uniquement de l'objet `user` du contexte.

  // Met à jour % et localStorage
  useEffect(() => {
    setCompletionPercent(calculateCompletion(formik.values, previewImage));
  }, [formik.values, previewImage]); // On ne sauvegarde plus dans le localStorage

  // Gère l'upload d'image
  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      console.log('Image sélectionnée:', file);
      setImageFile(file);
      // Use FileReader to persist a data URL (works after reload/logout)
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result); // Met à jour l'aperçu avec une data URL
      };
      reader.readAsDataURL(file);
    }
  };

  // Gère la suppression de l'image
  const handleImageDelete = () => {
    setImageFile(null);
    setPreviewImage(null);
    toast.success('Image supprimée');
    // TODO: Appeler DELETE /profile/image si disponible
  };

  // Révoquer l'URL de prévisualisation
  useEffect(() => {
    // Cet effet est maintenant vide car nous n'utilisons plus de blob URLs ni localStorage pour l'image
    return () => {};
  }, [previewImage]);

  // Nom dynamique
  let displayName = "Utilisateur";
  if (user) {
    const prenomPart = user.prenom ? `${user.prenom} ` : '';
    const nomPart = user.nom || '';
    displayName = (prenomPart + nomPart).trim() || "Utilisateur";
  }

  return (
    <div className="p-4 sm:p-6 rounded-lg shadow-md max-w-[95%] mx-auto mb-8 mt-5 border border-gray-200">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 gap-3">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800">Informations Personnelles</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 animate-pulse font-medium text-sm"
          >
            <Edit size={16} className="mr-1" />
            Modifier
          </button>
        </div>

        {/* Profil */}
        <div className="flex flex-col md:flex-row items-start mb-6 gap-6">
          {/* Photo */}
          <div className="flex justify-center md:justify-start">
            <div
              className="relative w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-full flex items-center justify-center mr-0 md:mr-6 overflow-hidden border border-gray-300 cursor-pointer"
              onClick={() => {
                if (previewImage) {
                  setIsImageModalOpen(true);
                } else {
                  avatarInputRef.current && avatarInputRef.current.click();
                }
              }}
            >
              {previewImage ? (
                <img src={previewImage} alt="Profil" className="w-full h-full object-cover rounded-full" />
              ) : (
                <User size={50} className="text-gray-500 sm:size-[60px]" />
              )}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); avatarInputRef.current && avatarInputRef.current.click(); }}
                className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow border border-gray-300"
                aria-label="Changer la photo de profil"
              >
                <Camera size={14} className="text-gray-500 sm:size-[16px]" />
              </button>
              {/* Hidden input to pick a file from the avatar area */}
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Détails */}
          <div className="flex-grow w-full">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{displayName}</h3>
            <p className="text-sm text-gray-600 mb-4">{formik.values.titre_professionnel || 'Titre non défini'}</p>

            {/* Barre complétion */}
            <div className="flex flex-col w-1/2 sm:flex-row items-start sm:items-center mb-4 gap-2 sm:gap-0">
              <span className="text-[#10B981] text-2xl font-bold sm:mr-2">{completionPercent}%</span>
              <div className="flex-grow w-full sm:w-auto bg-gray-200 rounded-full h-2.5 sm:mr-4">
                <div
                  className="bg-[#10B981] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercent}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-700">
                <span className="font-semibold text-[#10B981] sm:mr-1">Vous Êtes :</span>
                <span className="flex items-center border-2 border-gray-300 p-2 rounded-lg">
                  <span className={`w-2 h-2 rounded-full mr-1 ${formik.values.is_visible === '1' ? 'bg-[#10B981]' : 'bg-gray-400'}`}></span>
                  {formik.values.is_visible === '1' ? 'Visible' : 'Non visible'}
                </span>
              </div>
            </div>

            {/* Infos dynamiques */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-gray-700 text-sm">
              {formik.values.telephone && (
                <div className="flex items-center">
                  <Phone size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                  <span>{formik.values.telephone}</span>
                </div>
              )}
              {formik.values.adresse && (
                <div className="flex items-center">
                  <Search size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                  <span className="truncate">{[formik.values.adresse, formik.values.ville, formik.values.pays].filter(Boolean).join(', ')}</span>
                </div>
              )}
              {formik.values.date_naissance && (
                <div className="flex items-center">
                  <User size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                  <span>Âge : {new Date().getFullYear() - new Date(formik.values.date_naissance).getFullYear()} ans</span>
                </div>
              )}
              {formik.values.resume_profil && (
                <div className="flex items-center col-span-2">
                  <Mail size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                  <span className="truncate">{formik.values.resume_profil.substring(0, 100)}...</span>
                </div>
              )}
              {formik.values.cv_link && (
                <div className="flex items-center">
                  <User size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                  <a href={formik.values.cv_link} target="_blank" rel="noopener noreferrer" className="text-[#10B981] hover:underline truncate">
                    CV
                  </a>
                </div>
              )}
              {formik.values.lettre_motivation_link && (
                <div className="flex items-center">
                  <User size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                  <a href={formik.values.lettre_motivation_link} target="_blank" rel="noopener noreferrer" className="text-[#10B981] hover:underline truncate">
                    Lettre de motivation
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-gray-200">
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center border border-gray-200">
            <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">0</p>
            <p className="text-xs sm:text-sm text-gray-600">consultation<br/>de votre profil</p>
          </div>
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center border border-gray-200">
            <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">+15%</p>
            <p className="text-xs sm:text-sm text-gray-600">Offres consultés<br/>ces 15 derniers jours</p>
          </div>
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center border border-gray-200">
            <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">0</p>
            <p className="text-xs sm:text-sm text-gray-600">ajout aux favoris<br/>des recruteurs</p>
          </div>
          <div className="flex items-center justify-center p-3 sm:p-4 rounded-lg border border-gray-200 bg-gray-50">
            <a href="#" className="text-[#10B981] underline text-center text-xs sm:text-sm">
              Voir toutes les<br/>statistiques
            </a>
          </div>
        </div>
      </motion.section>

      {/* Pop-up pour voir l'image */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Image de profil</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            {previewImage ? (
              <img src={previewImage} alt="Profil" className="max-w-full max-h-[60vh] object-contain" />
            ) : (
              <p>Aucune image disponible</p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
                Fermer
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Formulaire Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Compléter votre profil</DialogTitle>
            <DialogDescription>
              Remplissez les informations pour compléter votre profil et augmenter votre visibilité.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
              <input
                type="date"
                {...formik.getFieldProps('date_naissance')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.date_naissance && formik.errors.date_naissance && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.date_naissance}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input
                type="tel"
                {...formik.getFieldProps('telephone')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex. +237 674 882 527"
              />
              {formik.touched.telephone && formik.errors.telephone && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.telephone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input
                type="text"
                {...formik.getFieldProps('adresse')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex. Akwa Dubai"
              />
              {formik.touched.adresse && formik.errors.adresse && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.adresse}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
              <input
                type="text"
                {...formik.getFieldProps('ville')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex. Douala"
              />
              {formik.touched.ville && formik.errors.ville && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.ville}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
              <input
                type="text"
                {...formik.getFieldProps('pays')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex. Cameroun"
              />
              {formik.touched.pays && formik.errors.pays && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.pays}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre professionnel</label>
              <input
                type="text"
                {...formik.getFieldProps('titre_professionnel')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex. Développeur"
              />
              {formik.touched.titre_professionnel && formik.errors.titre_professionnel && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.titre_professionnel}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Résumé profil</label>
              <textarea
                {...formik.getFieldProps('resume_profil')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex. Passionné par le développement..."
              />
              {formik.touched.resume_profil && formik.errors.resume_profil && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.resume_profil}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image de profil</label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {previewImage && (
                  <button
                    type="button"
                    onClick={handleImageDelete}
                    className="flex items-center px-3 py-2 border border-red-300 rounded-md text-red-600 hover:bg-red-100"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Supprimer
                  </button>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lien CV (URL)</label>
              <input
                type="url"
                {...formik.getFieldProps('cv_link')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex. https://example.com/cv.pdf"
              />
              {formik.touched.cv_link && formik.errors.cv_link && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.cv_link}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lien Lettre de motivation (URL)</label>
              <input
                type="url"
                {...formik.getFieldProps('lettre_motivation_link')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex. https://example.com/lettre.pdf"
              />
              {formik.touched.lettre_motivation_link && formik.errors.lettre_motivation_link && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.lettre_motivation_link}</p>
              )}
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formik.values.is_visible === '1'}
                  onChange={(e) => formik.setFieldValue('is_visible', e.target.checked ? '1' : '0')}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">Profil visible pour les recruteurs</span>
              </label>
            </div>
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
                  Annuler
                </button>
              </DialogClose>
              <button
                type="submit"
                disabled={isSubmitting || !formik.isValid}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center"
              >
                {isSubmitting && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                Enregistrer
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Infopersonelles;