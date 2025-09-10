import React, { useState, useEffect } from 'react';
import { Edit, Trash2, PlusCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
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
import FormError from './FormError';


const Experiences = () => {
  const { token } = useAuth();
  const [experiences, setExperiences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchExperiences = async () => {
      if (!token) return;
      setIsLoading(true);
      try {
        const response = await api.get('/experiences');
        setExperiences(response.data);
      } catch (error) {
        toast.error('Erreur lors du chargement des expériences');
        console.error('Erreur API:', error);
        setExperiences([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExperiences();
  }, [token]);

  const formik = useFormik({
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
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      const promise = editingExperience
        ? api.put(`/experiences/${editingExperience.id}`, values)
        : api.post('/experiences', values);

      toast.promise(promise, {
        loading: editingExperience ? "Mise à jour en cours..." : "Ajout en cours...",
        success: (response) => {
          const message = response.data.message || `Expérience ${editingExperience ? 'mise à jour' : 'ajoutée'} avec succès`;
          setExperiences(editingExperience
            ? experiences.map(exp => (exp.id === editingExperience.id ? response.data.data : exp))
            : [...experiences, response.data.data]);
          resetForm();
          setIsModalOpen(false);
          setEditingExperience(null);
          return message;
        },
        error: (error) => error.response?.data?.message || 'Une erreur est survenue',
      }).finally(() => setIsSubmitting(false));
    },
  });

  const openEditModal = (experience) => {
    setEditingExperience(experience);
    formik.setValues({
      titre_poste: experience.titre_poste,
      nom_entreprise: experience.nom_entreprise,
      date_debut: experience.date_debut,
      date_fin: experience.date_fin,
      description_taches: experience.description_taches,
      adresse: experience.adresse,
      ville: experience.ville,
      pays: experience.pays,
    });
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!experienceToDelete) return;
    setIsSubmitting(true);
    const promise = api.delete(`/experiences/${experienceToDelete}`);

    toast.promise(promise, {
      loading: 'Suppression en cours...',
      success: () => {
        setExperiences(experiences.filter(e => e.id !== experienceToDelete));
        setIsDeleteModalOpen(false);
        setExperienceToDelete(null);
        return 'Expérience supprimée avec succès';
      },
      error: (error) => error.response?.data?.message || 'Erreur lors de la suppression',
    }).finally(() => setIsSubmitting(false));
  };

  const openDeleteModal = (id) => {
    setExperienceToDelete(id);
    setIsDeleteModalOpen(true);
  }

  if (!token) {
    return <p className="text-red-500 text-center">Veuillez vous connecter pour gérer vos expériences.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-[95%] mx-auto my-8 border border-gray-200">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="flex justify-between items-center mb-6 border-b border-gray-400 pb-4">
          <div>
            <h2 className="text-xl font-semibold text-blue-800">Expériences</h2>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button
                onClick={() => {
                  setEditingExperience(null);
                  formik.resetForm();
                }}
                className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 font-medium text-sm transition-colors"
              >
                <PlusCircle size={16} className="mr-1" />
                Ajouter
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingExperience ? 'Modifier une expérience' : 'Ajouter une expérience'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Titre du poste</label>
                  <input
                    type="text"
                    name="titre_poste"
                    value={formik.values.titre_poste}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors"
                  />
                  <FormError>{formik.touched.titre_poste && formik.errors.titre_poste}</FormError>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Nom de l'entreprise</label>
                  <input
                    type="text"
                    name="nom_entreprise"
                    value={formik.values.nom_entreprise}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors"
                  />
                  <FormError>{formik.touched.nom_entreprise && formik.errors.nom_entreprise}</FormError>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Adresse</label>
                  <input
                    type="text"
                    name="adresse"
                    value={formik.values.adresse}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors"
                  />
                  <FormError>{formik.touched.adresse && formik.errors.adresse}</FormError>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Ville</label>
                  <input
                    type="text"
                    name="ville"
                    value={formik.values.ville}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors"
                  />
                  <FormError>{formik.touched.ville && formik.errors.ville}</FormError>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Pays</label>
                  <input
                    type="text"
                    name="pays"
                    value={formik.values.pays}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors"
                  />
                  <FormError>{formik.touched.pays && formik.errors.pays}</FormError>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Date de début</label>
                  <input
                    type="date"
                    name="date_debut"
                    value={formik.values.date_debut}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors"
                  />
                  <FormError>{formik.touched.date_debut && formik.errors.date_debut}</FormError>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Date de fin</label>
                  <input
                    type="date"
                    name="date_fin"
                    value={formik.values.date_fin}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors"
                  />
                  <FormError>{formik.touched.date_fin && formik.errors.date_fin}</FormError>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Description des tâches</label>
                  <textarea
                    name="description_taches"
                    value={formik.values.description_taches}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors"
                    rows="4"
                  />
                  <FormError>{formik.touched.description_taches && formik.errors.description_taches}</FormError>
                </div>
                <DialogFooter className="mt-6 flex justify-end space-x-2 pt-4 pb-2">
                  <DialogClose asChild>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingExperience(null);
                        formik.resetForm();
                      }}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 text-sm transition-colors"
                    >
                      Annuler
                    </button>
                  </DialogClose>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 border-2 border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 text-sm flex items-center justify-center transition-colors disabled:bg-blue-300"
                  >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editingExperience ? 'Mettre à jour' : 'Ajouter'}
                  </button>
                </DialogFooter>
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
            <p className="text-gray-600">Aucune expérience enregistrée.</p>
          ) : (
            experiences.map((exp) => (
              <div key={exp.id} className="flex justify-between items-start pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-start flex-grow">
                  <div className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: '#10B981' }}></div>
                  <div>
                    <div className="grid grid-cols-2 border-l border-[#10B981] -ml-4 pl-4 gap-y-1 gap-x-4 text-sm text-gray-700">
                      <p><span className="font-medium text-gray-600">Poste</span></p>
                      <p className="font-semibold text-gray-800">{exp.titre_poste || 'Non spécifié'}</p>
                      <p><span className="font-medium text-gray-600">Entreprise</span></p>
                      <p>{exp.nom_entreprise || 'Non spécifié'}</p>
                      <p><span className="font-medium text-gray-600">Localisation</span></p>
                      <p>{[exp.adresse, exp.ville, exp.pays].filter(Boolean).join(', ') || 'Non spécifié'}</p>
                      <p><span className="font-medium text-gray-600">Type De Contrat</span></p>
                      <p>Non spécifié</p>
                      <p><span className="font-medium text-gray-600">Date</span></p>
                      <p>{`${exp.date_debut || 'N/A'} - ${exp.date_fin || 'N/A'}`}</p>
                      <p><span className="font-medium text-gray-600">Description, Missions</span></p>
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
                    Modifier
                  </button>
                  <button
                    onClick={() => openDeleteModal(exp.id)}
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

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Êtes-vous sûr de vouloir supprimer ?</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. L'expérience sera définitivement supprimée.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button type="button" className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 text-sm transition-colors">Annuler</button>
            </DialogClose>
            <button onClick={handleConfirmDelete} disabled={isSubmitting} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm flex items-center justify-center transition-colors disabled:bg-red-300">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Supprimer
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Experiences;