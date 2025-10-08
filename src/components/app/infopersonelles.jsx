import React, { useState } from 'react';
import { Camera, Mail, Phone, User, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
  const { user, token, particulier } = useAuth();
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(particulier?.image_profil || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    initialValues: {
      date_naissance: '',
      telephone: '',
      adresse: '',
      ville: '',
      pays: '',
      titre_professionnel: '',
      resume_profil: '',
      cv_link: '',
      lettre_motivation_link: '',
      is_visible: '0',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => formData.append(key, value));
      if (imageFile) formData.append('image_profil', imageFile);

      try {
        const response = await api.post('/profile/particulier', formData, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
        });
        const updatedParticulier = response.data.data?.particulier || response.data.particulier || {};
        updateUser(prevUser => ({
          ...prevUser,
          particulier: updatedParticulier
        }));
        setPreviewImage(updatedParticulier.image_profil || null);
        setIsModalOpen(false);
        import('sonner').then(({ toast }) => toast.success('Profil mis à jour !'));
      } catch (error) {
        import('sonner').then(({ toast }) => toast.error('Erreur lors de la mise à jour du profil'));
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Gère l'upload d'image
  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Gère la suppression de l'image
  const handleImageDelete = () => {
    setImageFile(null);
    setPreviewImage(null);
    import('sonner').then(({ toast }) => toast.success('Image supprimée'));
  };

  // Affichage des infos si particulier existe
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
            <h2 className="text-lg sm:text-xl font-semibold text-blue-800">Informations Personnelles</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 font-medium text-sm"
            >
              <Edit size={16} className="mr-1" />
              Modifier
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-start mb-6 gap-6">
            <div className="flex justify-center md:justify-start">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border border-gray-300">
                {previewImage ? (
                  <img src={particulier.image_profil} alt="Profil" className="w-full h-full object-cover rounded-full" />
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
                  <span className="mr-2 text-gray-500 min-w-[16px]">📍</span>
                  <span className="truncate">{[particulier.adresse, particulier.ville, particulier.pays].filter(Boolean).join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                  <span>Âge : {new Date().getFullYear() - new Date(particulier.date_naissance).getFullYear()} ans</span>
                </div>
                <div className="flex items-center col-span-2">
                  <Mail size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                  <span className="truncate">{particulier.resume_profil}</span>
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                  <a href={particulier.cv_link} target="_blank" rel="noopener noreferrer" className="text-[#10B981] hover:underline truncate">
                    CV
                  </a>
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                  <a href={particulier.lettre_motivation_link} target="_blank" rel="noopener noreferrer" className="text-[#10B981] hover:underline truncate">
                    Lettre de motivation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        {/* Formulaire Dialog pour modification */}
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
                <input type="date" {...formik.getFieldProps('date_naissance')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                {formik.touched.date_naissance && formik.errors.date_naissance && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.date_naissance}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input type="tel" {...formik.getFieldProps('telephone')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                {formik.touched.telephone && formik.errors.telephone && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.telephone}</p>
                )}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image de profil</label>
                <div className="flex items-center space-x-4">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  {previewImage && (
                    <button type="button" onClick={handleImageDelete} className="flex items-center px-3 py-2 border border-red-300 rounded-md text-red-600 hover:bg-red-100">
                      <Trash2 size={16} className="mr-1" />
                      Supprimer
                    </button>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lien CV (URL)</label>
                <input type="url" {...formik.getFieldProps('cv_link')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                {formik.touched.cv_link && formik.errors.cv_link && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.cv_link}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lien Lettre de motivation (URL)</label>
                <input type="url" {...formik.getFieldProps('lettre_motivation_link')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                {formik.touched.lettre_motivation_link && formik.errors.lettre_motivation_link && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.lettre_motivation_link}</p>
                )}
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={formik.values.is_visible === '1'} onChange={e => formik.setFieldValue('is_visible', e.target.checked ? '1' : '0')} className="rounded" />
                  <span className="text-sm font-medium text-gray-700">Profil visible pour les recruteurs</span>
                </label>
              </div>
              <DialogFooter className="mt-6">
                <DialogClose asChild>
                  <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
                    Annuler
                  </button>
                </DialogClose>
                <button type="submit" disabled={isSubmitting || !formik.isValid} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center">
                  {isSubmitting && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                  Enregistrer
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Si pas de particulier, afficher le formulaire pour compléter le profil
  return (
    <div className="p-4 sm:p-6 rounded-lg shadow-md max-w-[95%] mx-auto mb-8 mt-5 border border-gray-200">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-6">Complétez votre profil</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
            <input type="date" {...formik.getFieldProps('date_naissance')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formik.touched.date_naissance && formik.errors.date_naissance && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.date_naissance}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input type="tel" {...formik.getFieldProps('telephone')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formik.touched.telephone && formik.errors.telephone && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.telephone}</p>
            )}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image de profil</label>
            <div className="flex items-center space-x-4">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              {previewImage && (
                <button type="button" onClick={handleImageDelete} className="flex items-center px-3 py-2 border border-red-300 rounded-md text-red-600 hover:bg-red-100">
                  <Trash2 size={16} className="mr-1" />
                  Supprimer
                </button>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lien CV (URL)</label>
            <input type="url" {...formik.getFieldProps('cv_link')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formik.touched.cv_link && formik.errors.cv_link && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.cv_link}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lien Lettre de motivation (URL)</label>
            <input type="url" {...formik.getFieldProps('lettre_motivation_link')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formik.touched.lettre_motivation_link && formik.errors.lettre_motivation_link && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.lettre_motivation_link}</p>
            )}
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={formik.values.is_visible === '1'} onChange={e => formik.setFieldValue('is_visible', e.target.checked ? '1' : '0')} className="rounded" />
              <span className="text-sm font-medium text-gray-700">Profil visible pour les recruteurs</span>
            </label>
          </div>
          <button type="submit" disabled={isSubmitting || !formik.isValid} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center">
            {isSubmitting && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
            Enregistrer
          </button>
        </form>
      </motion.section>
    </div>
  );
};

export default Infopersonelles;