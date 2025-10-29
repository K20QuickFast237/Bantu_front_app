import React, { useState, useEffect } from 'react';
import { Edit, Trash2, PlusCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { validationExperienceSchema } from '../../schemas';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next'; // Ajout

const Experiences = () => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [experiences, setExperiences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/experiences');
        setExperiences(response.data);
      } catch (error) {
        toast.error(t('experiences.errorLoad'));
        setExperiences([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExperiences();
  }, [token, t]);

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (editingExperience) {
        await api.put(`/experiences/${editingExperience.id}`, values);
        setExperiences(
          experiences.map((exp) =>
            exp.id === editingExperience.id ? { ...exp, ...values } : exp
          )
        );
        toast.success(t('experiences.successUpdate'));

        window.dispatchEvent(new Event('experiences-updated'));
      } else {
        const response = await api.post('/experiences', values);
        const newExperience = {
          id: response.data.data.id,
          titre_poste: values.titre_poste,
          nom_entreprise: values.nom_entreprise,
          date_debut: values.date_debut,
          date_fin: values.date_fin,
          description_taches: values.description_taches,
          adresse: values.adresse,
          ville: values.ville,
          pays: values.pays,
        };
        setExperiences(prev => [...prev, newExperience]);
        toast.success(t('experiences.successAdd'));

        window.dispatchEvent(new Event('experiences-updated'));
      }
      resetForm();
      setEditingExperience(null);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(t('experiences.errorSave'));
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setValues, resetForm } =
    useFormik({
      initialValues: {
        titre_poste: '',
        nom_entreprise: '',
        date_debut: '',
        date_fin: '',
        description_taches: '',
        adresse: '',
        ville: '',
        pays: '',
      },
      validationSchema: validationExperienceSchema,
      onSubmit,
      enableReinitialize: true,
    });

  const openEditModal = (experience) => {
    setEditingExperience(experience);
    setValues({
      titre_poste: experience.titre_poste || '',
      nom_entreprise: experience.nom_entreprise || '',
      date_debut: experience.date_debut || '',
      date_fin: experience.date_fin || '',
      description_taches: experience.description_taches || '',
      adresse: experience.adresse || '',
      ville: experience.ville || '',
      pays: experience.pays || '',
    });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingExperience(null);
    resetForm();
    setIsModalOpen(true);
  };

  const openDeleteModal = (id) => {
    setExperienceToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!experienceToDelete) return;
    try {
      await api.delete(`/experiences/${experienceToDelete}`);
      setExperiences(experiences.filter((exp) => exp.id !== experienceToDelete));
      toast.success(t('experiences.successDelete'));

      window.dispatchEvent(new Event('experiences-updated'));
    } catch (error) {
      toast.error(t('experiences.errorDelete'));
    } finally {
      setIsDeleteModalOpen(false);
      setExperienceToDelete(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-[95%] mx-auto my-8 border border-gray-200">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="flex justify-between items-center mb-6 border-b border-gray-400 pb-4">
          <h2 className="text-xl font-semibold text-blue-800">{t('experiences.title')}</h2>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button
                onClick={openAddModal}
                className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 font-medium text-sm transition-colors"
              >
                <PlusCircle size={16} className="mr-1" />
                {t('experiences.add')}
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-md p-0">
              <DialogHeader className="pb-4 border-b border-gray-200 relative">
                <DialogTitle className="text-xl font-semibold text-gray-800 pt-6 px-6">
                  {editingExperience ? t('experiences.edit') : t('experiences.addTitle') || 'Ajouter une expérience'}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="p-6" noValidate>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    {t('experiences.jobTitle')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="titre_poste"
                    value={values.titre_poste}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.titre_poste && touched.titre_poste && (
                    <p className="text-red-500 text-sm">{errors.titre_poste}</p>
                  )}
                </div>

                {/* Autres champs... (inchangés, mais labels traduits) */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    {t('experiences.company')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nom_entreprise"
                    value={values.nom_entreprise}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.nom_entreprise && touched.nom_entreprise && (
                    <p className="text-red-500 text-sm">{errors.nom_entreprise}</p>
                  )}
                </div>

                <div className="flex space-x-4 mb-4">
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium mb-2">
                      {t('experiences.startDate')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date_debut"
                      value={values.date_debut}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.date_debut && touched.date_debut && (
                      <p className="text-red-500 text-sm">{errors.date_debut}</p>
                    )}
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium mb-2">
                      {t('experiences.endDate')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date_fin"
                      value={values.date_fin}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.date_fin && touched.date_fin && (
                      <p className="text-red-500 text-sm">{errors.date_fin}</p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">{t('experiences.description')}</label>
                  <textarea
                    name="description_taches"
                    value={values.description_taches}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('experiences.descriptionPlaceholder') || "Décrivez vos principales missions et responsabilités..."}
                  />
                  {errors.description_taches && touched.description_taches && (
                    <p className="text-red-500 text-sm">{errors.description_taches}</p>
                  )}
                </div>

                {/* Adresse, Ville, Pays - Ajoutez des labels similaires si besoin */}

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 text-white bg-green-500 rounded-3xl hover:bg-green-600 flex items-center justify-center transition-colors disabled:bg-green-300"
                  >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editingExperience ? t('experiences.update') || 'Mettre à jour' : t('experiences.save') || 'Enregistrer'}
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : experiences.length === 0 ? (
            <p className="text-gray-600">{t('experiences.noExperiences')}</p>
          ) : (
            experiences.map((exp) => (
              <div key={exp.id} className="flex justify-between items-start pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-start flex-grow">
                  <div className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: '#10B981' }}></div>
                  <div>
                    <div className="grid grid-cols-2 border-l border-[#10B981] -ml-4 pl-4 gap-y-1 gap-x-4 text-sm text-gray-700">
                      <p><span className="font-medium text-gray-600">{t('experiences.post')}</span></p>
                      <p className="font-semibold text-gray-800">{exp.titre_poste || 'Non spécifié'}</p>
                      <p><span className="font-medium text-gray-600">{t('experiences.company')}</span></p>
                      <p>{exp.nom_entreprise || 'Non spécifié'}</p>
                      <p><span className="font-medium text-gray-600">{t('experiences.location')}</span></p>
                      <p>{[exp.adresse, exp.ville, exp.pays].filter(Boolean).join(', ') || 'Non spécifié'}</p>
                      <p><span className="font-medium text-gray-600">{t('experiences.date')}</span></p>
                      <p>{`${exp.date_debut || 'N/A'} - ${exp.date_fin || 'N/A'}`}</p>
                      <p><span className="font-medium text-gray-600">{t('experiences.missions')}</span></p>
                      <p>{exp.description_taches || 'Non spécifié'}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(exp)}
                    className="flex items-center px-2 py-1 rounded-md text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 text-xs"
                  >
                    <Edit size={14} className="mr-1" />
                    {t('experiences.edit')}
                  </button>
                  <button
                    onClick={() => openDeleteModal(exp.id)}
                    className="flex items-center px-2 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 text-xs"
                  >
                    <Trash2 size={14} />
                    {t('experiences.delete')}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.section>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('experiences.confirmDelete')}</DialogTitle>
            <DialogDescription>
              {t('experiences.deleteDesc')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button
                type="button"
                className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 text-sm transition-colors"
              >
                {t('experiences.cancel')}
              </button>
            </DialogClose>
            <button
              onClick={handleConfirmDelete}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm flex items-center justify-center transition-colors disabled:bg-red-300"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('experiences.delete')}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Experiences;