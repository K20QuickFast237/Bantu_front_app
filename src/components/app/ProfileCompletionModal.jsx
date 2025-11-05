import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { user, particulier } = useAuth();
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(particulier?.image_profil ? `${particulier.image_profil}` : '');
  const [cvFile, setCvFile] = useState(null);
  const [lettreFile, setLettreFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    date_naissance: Yup.date().required(t('profileCompletion.birthDateRequired')),
    telephone: Yup.string().required(t('profileCompletion.phoneRequired')),
    adresse: Yup.string().required(t('profileCompletion.addressRequired')),
    ville: Yup.string().required(t('profileCompletion.cityRequired')),
    pays: Yup.string().required(t('profileCompletion.countryRequired')),
    titre_professionnel: Yup.string().required(t('profileCompletion.professionalTitleRequired')),
    resume_profil: Yup.string().required(t('profileCompletion.profileSummaryRequired')),
    // La validation du CV et de la lettre est maintenant conditionnelle
    cv_link: Yup.string().url(t('profileCompletion.invalidCvUrl')),
    lettre_motivation_link: Yup.string().url(t('profileCompletion.invalidLetterUrl')),
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
      if (cvFile) formData.append('cv_file', cvFile);
      if (lettreFile) formData.append('lettre_motivation_file', lettreFile);
      
      try {
        let response;
        // Si un profil 'particulier' existe déjà, on met à jour (PUT)
        // Sinon, on crée le profil (POST)
        if (particulier && Object.keys(particulier).length > 0) {
          // Laravel ne gère pas bien FormData avec PUT, on d...
          response = await api.post('/profile/particulier/update', formData);
        } else {
          response = await api.post('/profile/particulier', formData);
        }
        toast.success(t('profileCompletion.successUpdate'));
        onComplete();
        onClose();
      } catch (error) {
        toast.error(t('profileCompletion.errorUpdate'));
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCvUpload = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleLettreUpload = (e) => {
    setLettreFile(e.target.files[0]);
  };

  const removeFile = (setter) => {
    setter(null);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('profileCompletion.completeProfile')}</DialogTitle>
          <DialogDescription>{t('profileCompletion.completeToIncreaseVisibility')}</DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('profileCompletion.profilePhoto')}</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              {previewImage && (
                <img src={previewImage} alt={t('profileCompletion.profilePhotoPreview')} className="mt-2 w-24 h-24 object-cover rounded" />
              )}
            </div>

            {/* Basic Info Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('profileCompletion.birthDate')}</label>
                <input type="date" {...formik.getFieldProps('date_naissance')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                {formik.touched.date_naissance && formik.errors.date_naissance && <p className="text-red-500 text-xs mt-1">{formik.errors.date_naissance}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('profileCompletion.phone')}</label>
                <input type="tel" {...formik.getFieldProps('telephone')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                {formik.touched.telephone && formik.errors.telephone && <p className="text-red-500 text-xs mt-1">{formik.errors.telephone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('profileCompletion.address')}</label>
                <input type="text" {...formik.getFieldProps('adresse')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                {formik.touched.adresse && formik.errors.adresse && <p className="text-red-500 text-xs mt-1">{formik.errors.adresse}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('profileCompletion.city')}</label>
                <input type="text" {...formik.getFieldProps('ville')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                {formik.touched.ville && formik.errors.ville && <p className="text-red-500 text-xs mt-1">{formik.errors.ville}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('profileCompletion.country')}</label>
                <input type="text" {...formik.getFieldProps('pays')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                {formik.touched.pays && formik.errors.pays && <p className="text-red-500 text-xs mt-1">{formik.errors.pays}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('profileCompletion.professionalTitle')}</label>
                <input type="text" {...formik.getFieldProps('titre_professionnel')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                {formik.touched.titre_professionnel && formik.errors.titre_professionnel && <p className="text-red-500 text-xs mt-1">{formik.errors.titre_professionnel}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('profileCompletion.profileSummary')}</label>
                <textarea {...formik.getFieldProps('resume_profil')} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                {formik.touched.resume_profil && formik.errors.resume_profil && <p className="text-red-500 text-xs mt-1">{formik.errors.resume_profil}</p>}
              </div>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('profileCompletion.cv')}</label>
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
                  <p className="text-gray-500 text-xs mt-1">{t('profileCompletion.currentCv')} <a href={`${particulier.cv_link}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{t('profileCompletion.view')}</a>. {t('profileCompletion.newFileWillReplace')}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('profileCompletion.coverLetter')}</label>
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
                  <p className="text-gray-500 text-xs mt-1">{t('profileCompletion.currentLetter')} <a href={`${particulier.lettre_motivation_link}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{t('profileCompletion.view')}</a>. {t('profileCompletion.newFileWillReplace')}</p>
                )}
              </div>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={formik.values.is_visible === '1'} onChange={e => formik.setFieldValue('is_visible', e.target.checked ? '1' : '0')} className="rounded" />
                <span className="text-sm font-medium text-gray-700">{t('profileCompletion.visibleToRecruiters')}</span>
              </label>
            </div>

            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
                  {t('profileCompletion.cancel')}
                </button>
              </DialogClose>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center">
                {isSubmitting && <Loader2 className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />}
                {t('profileCompletion.save')}
              </button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileCompletionModal;