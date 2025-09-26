import React, { useState, useEffect } from 'react';
import { Edit, Trash2, PlusCircle, Loader2, X } from 'lucide-react';
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
import FormError from './FormError';
import { toast } from 'sonner';
import { useFormik } from 'formik';

const Experiences = () => {
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
        setIsLoading(false);
      } catch (error) {
        toast.error('Erreur lors du chargement des expériences');
        setExperiences([]);
        setIsLoading(false);
      }
    };
    fetchExperiences();
  }, [token]);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      if (editingExperience) {
        // Modification d'une formation existante
        await api.put(`/experiences/${editingExperience.id}`, values);
        setExperiences(
          experiences.map((experience) =>
            experience.id === editingExperience.id ? { ...experience, ...values } : experience
          )
        );
        toast.success('Experience mise à jour avec succès');
      } else {
        // Ajout d'une nouvelle formation
        const response = await api.post('/experiences', values);
        setExperiences([...experiences, response.data]);
        toast.success('Experience ajoutée avec succès');
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde de la experience');
      console.error('Erreur:', error);
    } finally {
      setIsModalOpen(false);
      setSubmitting(false);
      setIsLoading(false);
    }

  };


  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setValues } = useFormik({
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
    
    try {
      await api.delete(`/experiences/${experienceToDelete}`);
      setExperiences(experiences.filter((experience) => experience.id !== experienceToDelete));
      setIsDeleteModalOpen(false);
      setExperienceToDelete(null);
      toast.success('Formation supprimée avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression de la formation');
    } finally {
      
    }
    setIsDeleteModalOpen(false);
    setExperienceToDelete(null);
  };

  const openDeleteModal = (id) => {
    setExperienceToDelete(id);
    setIsDeleteModalOpen(true);
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
                }}
                className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 font-medium text-sm transition-colors"
              >
                <PlusCircle size={16} className="mr-1" />
                Ajouter
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-md p-0">
              <DialogHeader className="pb-4 border-b border-gray-200 relative">
                <DialogTitle className="text-xl font-semibold text-gray-800 pt-6 px-6">
                  {editingExperience ? 'Modifier une expérience' : 'Ajouter une expérience'}
                </DialogTitle>
                
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="p-6" noValidate>
                {/* Titre du poste */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Titre du poste <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="titre_poste"
                    value={values.titre_poste}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex : Développeur Frontend"
                    required
                  />
                  {errors.titre_poste && touched.titre_poste && (<p className="text-red-500 text-sm">{errors.titre_poste}</p>)}
                </div>
                
                {/* Nom de l'entreprise */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Nom de l'entreprise <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nom_entreprise"
                    value={values.nom_entreprise}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex : Tech Solutions"
                    required
                  />
                  {errors.nom_entreprise && touched.nom_entreprise && (<p className="text-red-500 text-sm">{errors.nom_entreprise}</p>)}
                </div>
                
                {/* Adresse */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="adresse"
                    value={values.adresse}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex : 123 Rue de la Tech"
                  />
                  {errors.adresse && touched.adresse && (<p className="text-red-500 text-sm">{errors.adresse}</p>)}
                </div>
                
                {/* Ville et Pays */}
                <div className="flex space-x-4 mb-4">
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Ville
                    </label>
                    <input
                      type="text"
                      name="ville"
                      value={values.ville}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex : Paris"
                    />
                    {errors.ville && touched.ville && (<p className="text-red-500 text-sm">{errors.ville}</p>)}
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Pays
                    </label>
                    <input
                      type="text"
                      name="pays"
                      value={values.pays}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex : France"
                    />
                    {errors.pays && touched.pays && (<p className="text-red-500 text-sm">{errors.pays}</p>)}
                  </div>
                </div>
                
                {/* Dates de début et de fin */}
                <div className="flex space-x-4 mb-4">
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Date de début <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date_debut"
                      value={values.date_debut}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    {errors.date_debut && touched.date_debut && (<p className="text-red-500 text-sm">{errors.date_debut}</p>)}
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Date de fin <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date_fin"
                      value={values.date_fin}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    {errors.date_fin && touched.date_fin && (<p className="text-red-500 text-sm">{errors.date_fin}</p>)}
                  </div>
                </div>
                
                {/* Description des tâches */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Description des tâches
                  </label>
                  <textarea
                    name="description_taches"
                    value={values.description_taches}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Décrivez vos principales missions et responsabilités..."
                  ></textarea>
                  {errors.description_taches && touched.description_taches && (<p className="text-red-500 text-sm">{errors.description_taches}</p>)}
                </div>
                
                {/* Boutons */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 text-white bg-green-500 rounded-3xl hover:bg-green-600 flex items-center justify-center transition-colors disabled:bg-green-300"
                  >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editingExperience ? 'Mettre à jour' : 'Enregistrer'}
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