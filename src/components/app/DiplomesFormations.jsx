import React, { useState, useEffect } from 'react';
import { Edit, Trash2, PlusCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { validationFormationSchema } from '../../schemas';
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

const DiplomesFormations = () => {
  const { t } = useTranslation(); // Hook i18n
  const { token } = useAuth();
  const [formations, setFormations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFormation, setEditingFormation] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formationToDelete, setFormationToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFormations = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/formations');
        setFormations(response.data);
      } catch (error) {
        toast.error('Erreur lors du chargement des formations');
        setFormations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormations();
  }, [token]);

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (editingFormation) {
        await api.put(`/formations/${editingFormation.id}`, values);
        setFormations(
          formations.map((formation) =>
            formation.id === editingFormation.id ? { ...formation, ...values } : formation
          )
        );
        toast.success('Formation mise à jour avec succès');

        window.dispatchEvent(new Event('formations-updated'));
      } else {
        const response = await api.post('/formations', values);
        const newFormation = {
          id: response.data.data.id,
          domaine_etude: values.domaine_etude,
          etablissement: values.etablissement,
          diplome: values.diplome,
          date_debut: values.date_debut,
          date_fin: values.date_fin,
        }
        setFormations(prev => [...prev, newFormation]);
        toast.success('Formation ajoutée avec succès');

        window.dispatchEvent(new Event('formations-updated'));
      }
      setIsModalOpen(false);
      resetForm();
      setEditingFormation(null);
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde de la formation');
      console.error('Erreur:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setValues, resetForm } =
    useFormik({
      initialValues: {
        domaine_etude: '',
        etablissement: '',
        diplome: '',
        date_debut: '',
        date_fin: '',
      },
      validationSchema: validationFormationSchema,
      onSubmit,
      enableReinitialize: true,
    });

  const openEditModal = (formation) => {
    setEditingFormation(formation);
    setValues({
      domaine_etude: formation.domaine_etude || '',
      etablissement: formation.etablissement || '',
      diplome: formation.diplome || '',
      date_debut: formation.date_debut || '',
      date_fin: formation.date_fin || '',
    });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingFormation(null);
    resetForm();
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!formationToDelete) return;
    try {
      await api.delete(`/formations/${formationToDelete}`);
      setFormations(formations.filter((formation) => formation.id !== formationToDelete));
      toast.success('Formation supprimée avec succès');

      window.dispatchEvent(new Event('formations-updated'));
    } catch (error) {
      toast.error('Erreur lors de la suppression de la formation');
    } finally {
      setIsDeleteModalOpen(false);
      setFormationToDelete(null);
    }
  };

  const openDeleteModal = (id) => {
    setFormationToDelete(id);
    setIsDeleteModalOpen(true);
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
          <h2 className="text-xl font-semibold text-blue-800">{t('profile.education.title')}</h2>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button
                onClick={openAddModal}
                className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 font-medium text-sm transition-colors"
              >
                <PlusCircle size={16} className="mr-1" />
                {t('profile.education.add')}
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-md p-0">
              <DialogHeader className="pb-4 border-b border-gray-200 relative">
                <DialogTitle className="text-xl font-semibold text-gray-800 pt-6 px-6">
                  {editingFormation ? t('profile.education.editEducation') : t('profile.education.addEducation')}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="p-6">
                {/* Domaine d'étude */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    {t('profile.education.fieldOfStudy')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="domaine_etude"
                    value={values.domaine_etude}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex : Développement web"
                  />
                  {errors.domaine_etude && touched.domaine_etude && (
                    <p className="text-red-500 text-sm">{errors.domaine_etude}</p>
                  )}
                </div>

                {/* Etablissement */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    {t('profile.education.institution')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="etablissement"
                    value={values.etablissement}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex : Université de Douala"
                  />
                  {errors.etablissement && touched.etablissement && (
                    <p className="text-red-500 text-sm">{errors.etablissement}</p>
                  )}
                </div>

                {/* Diplôme */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    {t('profile.education.diploma')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="diplome"
                    value={values.diplome}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex : Licence en informatique"
                  />
                  {errors.diplome && touched.diplome && (
                    <p className="text-red-500 text-sm">{errors.diplome}</p>
                  )}
                </div>

                {/* Dates */}
                <div className="flex space-x-4 mb-4">
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium mb-2">
                      {t('profile.education.startDate')}
                    </label>
                    <input
                      type="date"
                      name="date_debut"
                      value={values.date_debut}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium mb-2">
                      {t('profile.education.endDate')}
                    </label>
                    <input
                      type="date"
                      name="date_fin"
                      value={values.date_fin}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Bouton */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 text-white bg-green-500 rounded-3xl hover:bg-green-600 flex items-center justify-center transition-colors disabled:bg-green-300"
                  >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editingFormation ? 'Mettre à jour' : t('profile.skills.save')}
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
          ) : formations.length === 0 ? (
            <p className="text-gray-600">{t('profile.education.noEducation')}</p>
          ) : (
            formations.map((formation) => (
              <div
                key={formation.id}
                className="flex justify-between items-start pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start flex-grow">
                  <div
                    className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0"
                    style={{ backgroundColor: '#10B981' }}
                  ></div>

                  <div>
                    <div className="grid grid-cols-2 border-l border-[#10B981] -ml-4 pl-4 gap-y-1 gap-x-4 text-sm text-gray-700">
                      <p>
                        <span className="font-medium text-gray-600">{t('profile.education.fieldOfStudy')}</span>
                      </p>
                      <p className="font-semibold text-gray-800">
                        {formation.domaine_etude || t('profile.education.notSpecified')}
                      </p>

                      <p>
                        <span className="font-medium text-gray-600">{t('profile.education.institution')}</span>
                      </p>
                      <p>{formation.etablissement || t('profile.education.notSpecified')}</p>

                      <p>
                        <span className="font-medium text-gray-600">{t('experiences.date')}</span>
                      </p>
                      <p>
                        {`${formation.date_debut || 'N/A'} - ${formation.date_fin || 'N/A'
                          }`}
                      </p>

                      <p>
                        <span className="font-medium text-gray-600">{t('profile.education.diploma')}</span>
                      </p>
                      <p>{formation.diplome || t('profile.education.notSpecified')}</p>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(formation)}
                    className="flex items-center px-2 py-1 rounded-md text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 text-xs"
                  >
                    <Edit size={14} className="mr-1" />
                    {t('experiences.edit')}
                  </button>
                  <button
                    onClick={() => openDeleteModal(formation.id)}
                    className="flex items-center px-2 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 text-xs"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </motion.section>

      {/* Modal suppression */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('profile.education.deleteConfirm')}</DialogTitle>
            <DialogDescription>
              {t('profile.education.deleteDescription')}
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

export default DiplomesFormations;