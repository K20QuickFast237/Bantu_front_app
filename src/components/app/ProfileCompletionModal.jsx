import React, { useState } from 'react';
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
  DialogClose,
} from "@/components/ui/dialog";
import { Loader2, Trash2 } from 'lucide-react';

const ProfileCompletionModal = ({ isOpen, onClose, onComplete }) => {
  const { user, token, updateUser, particulier } = useAuth();
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(particulier?.image_profil || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      date_naissance: particulier?.date_naissance || '',
      telephone: particulier?.telephone || '',
      adresse: particulier?.adresse || '',
      ville: particulier?.ville || '',
      pays: particulier?.pays || '',
      titre_professionnel: particulier?.titre_professionnel || '',
      resume_profil: particulier?.resume_profil || '',
      image_profil: particulier?.image_profil || '',
      cv_link: particulier?.cv_link || '',
      lettre_motivation_link: particulier?.lettre_motivation_link || '',
      is_visible: particulier?.is_visible ? String(particulier.is_visible) : '0',
    },
    validationSchema,
    enableReinitialize: true,
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

  const handleImageDelete = () => {
    setImageFile(null);
    setPreviewImage(null);
    toast.success('Image supprimée.');
  };

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
            {formik.touched.cv_link && formik.errors.cv_link && <p className="text-red-500 text-xs mt-1">{formik.errors.cv_link}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lien Lettre de motivation (URL)</label>
            <input type="url" {...formik.getFieldProps('lettre_motivation_link')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            {formik.touched.lettre_motivation_link && formik.errors.lettre_motivation_link && <p className="text-red-500 text-xs mt-1">{formik.errors.lettre_motivation_link}</p>}
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={formik.values.is_visible === '1'} onChange={e => formik.setFieldValue('is_visible', e.target.checked ? '1' : '0')} className="rounded" />
              <span className="text-sm font-medium text-gray-700">Profil visible pour les recruteurs</span>
            </label>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
                Annuler
              </button>
            </DialogClose>
            <button type="submit" disabled={isSubmitting || !formik.isValid} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center">
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