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
  const [previewImage, setPreviewImage] = useState(particulier?.image_profil || '');
  const [cvFiles, setCvFiles] = useState([]);
  const [lettreFiles, setLettreFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    date_naissance: Yup.date().required('La date de naissance est requise'),
    telephone: Yup.string().required('Le téléphone est requis'),
    adresse: Yup.string().required("L'adresse est requise"),
    ville: Yup.string().required('La ville est requise'),
    pays: Yup.string().required('Le pays est requis'),
    titre_professionnel: Yup.string().required('Le titre professionnel est requis'),
    resume_profil: Yup.string().required('Le résumé du profil est requis'),
    // La validation du CV et de la lettre est maintenant conditionnelle
    cv_link: Yup.string().url('URL CV invalide'),
    lettre_motivation_link: Yup.string().url('URL lettre invalide'),
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
      if (cvFiles.length > 0) {
        cvFiles.forEach(file => formData.append('cv_files[]', file));
      }
      if (lettreFiles.length > 0) {
        lettreFiles.forEach(file => formData.append('lettre_motivation_files[]', file));
      }
      
      try {
        const response = await api.post('/profile/particulier', formData, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
        });
        const updatedParticulier = response.data.data?.particulier || response.data.particulier || {};
        updateUser(prevUser => ({
          ...prevUser,
          particulier: updatedParticulier
        }));
        setPreviewImage(updatedParticulier.image_profil || '');
        // Dispatch event to update profile completion bar
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
    const files = e.target.files;
    if (files) {
      setCvFiles(prev => [...prev, ...Array.from(files)]);
    }
  };

  const handleLettreUpload = (e) => {
    const files = e.target.files;
    if (files) {
      setLettreFiles(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removeFile = (fileList, setFileList, index) => {
    const newFiles = [...fileList];
    newFiles.splice(index, 1);
    setFileList(newFiles);
  }

  const handleImageDelete = () => {
    setImageFile(null);
    setPreviewImage('');
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
            {previewImage && (
              <div className="mt-2">
                <img src={previewImage} alt="Aperçu" className="h-20 w-20 rounded-full object-cover border-2 border-gray-300" />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CV</label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleCvUpload} multiple className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            <div className="mt-2 space-y-1">
              {cvFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between text-xs bg-gray-100 p-1 rounded">
                  <span className="text-gray-700 truncate">{file.name}</span>
                  <button type="button" onClick={() => removeFile(cvFiles, setCvFiles, index)} className="text-red-500 hover:text-red-700 ml-2">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            {particulier?.cv_link && cvFiles.length === 0 && (
              <p className="text-gray-500 text-xs mt-1">CV actuel : <a href={particulier.cv_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">voir</a>. Uploader un nouveau fichier le remplacera.</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lettre de motivation</label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleLettreUpload} multiple className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            <div className="mt-2 space-y-1">
              {lettreFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between text-xs bg-gray-100 p-1 rounded">
                  <span className="text-gray-700 truncate">{file.name}</span>
                  <button type="button" onClick={() => removeFile(lettreFiles, setLettreFiles, index)} className="text-red-500 hover:text-red-700 ml-2">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            {particulier?.lettre_motivation_link && lettreFiles.length === 0 && (
              <p className="text-gray-500 text-xs mt-1">
                Lettre actuelle : <a href={particulier.lettre_motivation_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">voir</a>. Uploader un nouveau fichier la remplacera.
              </p>
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