import React, { useState, useEffect } from 'react';
import { Edit, Trash2, PlusCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

// Schéma de validation pour les expériences
const experienceSchema = Yup.object().shape({
  titre_poste: Yup.string().required('Le titre du poste est requis'),
  nom_entreprise: Yup.string().required('Le nom de l\'entreprise est requis'),
  date_debut: Yup.date().required('La date de début est requise').nullable(),
  date_fin: Yup.date().min(Yup.ref('date_debut'), 'La date de fin doit être postérieure à la date de début').nullable(),
  description_taches: Yup.string().required('La description des tâches est requise'),
  adresse: Yup.string().required('L\'adresse est requise'),
  ville: Yup.string().required('La ville est requise'),
  pays: Yup.string().required('Le pays est requis'),
});

const Experiences = () => {
  const { token } = useAuth();
  const [experiences, setExperiences] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  // Charger les expériences à chaque montage ou changement de token
  useEffect(() => {
    const fetchExperiences = async () => {
      if (!token) {
        return;
      }
      try {
        const response = await api.get('/experiences');
        setExperiences(response.data);
      } catch (error) {
        toast.error('Erreur lors du chargement des expériences');
        console.error('Erreur API:', error);
        setExperiences([]); // Réinitialiser en cas d'erreur
      }
    };
    fetchExperiences();
  }, [token]); // Déclenche à chaque changement de token (connexion/déconnexion)

  // Formulaire Formik
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
    validationSchema: experienceSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        let response;
        if (editingExperience) {
          response = await api.put(`/experiences/${editingExperience.id}`, values);
          toast.success('Expérience mise à jour avec succès');
          setExperiences(experiences.map(e => (e.id === editingExperience.id ? { ...e, ...values, id: editingExperience.id } : e)));
        } else {
          response = await api.post('/experiences', values);
          console.log('Réponse API POST:', response.data);
          setExperiences([...experiences, { ...values, id: response.data.id || Date.now() }]);
          toast.success('Expérience ajoutée avec succès');
        }
        resetForm();
        setIsModalOpen(false);
        setEditingExperience(null);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Une erreur est survenue');
        console.error('Erreur soumission:', error);
      }
    },
  });

  // Ouvrir le modal pour modifier
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

  // Supprimer une expérience
  const deleteExperience = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette expérience ?')) {
      try {
        await api.delete(`/experiences/${id}`);
        setExperiences(experiences.filter(e => e.id !== id));
        toast.success('Expérience supprimée avec succès');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Erreur lors de la suppression');
        console.error('Erreur suppression:', error);
      }
    }
  };

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
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-400 pb-4">
          <div>
            <h2 className="text-xl font-semibold text-blue-800">Expériences</h2>
            <p className="text-sm text-gray-500">Vos Expériences</p>
          </div>
          <button
            onClick={() => {
              setEditingExperience(null);
              formik.resetForm();
              setIsModalOpen(true);
            }}
            className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 animate-pulse font-medium text-sm"
          >
            <PlusCircle size={16} className="mr-1" />
            Ajouter
          </button>
        </div>

        {/* Experiences List */}
        <div className="space-y-6">
          {experiences.length === 0 ? (
            <p className="text-gray-600">Aucune expérience enregistrée.</p>
          ) : (
            experiences.map((exp) => (
              <div key={exp.id} className="flex justify-between items-start pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-start flex-grow">
                  <div className="w-3 h-3 rounded-full mr-3 mt-2" style={{ backgroundColor: '#10B981' }}></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{exp.titre_poste || 'Non spécifié'}</h3>
                    <div className="grid grid-cols-2 border-l-1 border-[#10B981] -ml-4 pl-4 gap-y-1 gap-x-4 text-sm text-gray-700">
                      <p><span className="font-medium text-gray-600">Entreprise</span></p>
                      <p>{exp.nom_entreprise || 'Non spécifié'}</p>
                      <p><span className="font-medium text-gray-600">Localisation</span></p>
                      <p>{`${exp.adresse || ''}, ${exp.ville || ''}, ${exp.pays || ''}`}</p>
                      <p><span className="font-medium text-gray-600">Type De Contrat</span></p>
                      <p>Non spécifié</p>
                      <p><span className="font-medium text-gray-600">Date</span></p>
                      <p>{`${exp.date_debut || ''} - ${exp.date_fin || ''}`}</p>
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
                    onClick={() => deleteExperience(exp.id)}
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

      {/* Modal pour ajout/modification */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-blue-800">
                {editingExperience ? 'Modifier une expérience' : 'Ajouter une expérience'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-800">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Titre du poste</label>
                  <input
                    type="text"
                    name="titre_poste"
                    value={formik.values.titre_poste}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {formik.touched.titre_poste && formik.errors.titre_poste && (
                    <p className="text-red-500 text-xs">{formik.errors.titre_poste}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Nom de l'entreprise</label>
                  <input
                    type="text"
                    name="nom_entreprise"
                    value={formik.values.nom_entreprise}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {formik.touched.nom_entreprise && formik.errors.nom_entreprise && (
                    <p className="text-red-500 text-xs">{formik.errors.nom_entreprise}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Adresse</label>
                  <input
                    type="text"
                    name="adresse"
                    value={formik.values.adresse}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {formik.touched.adresse && formik.errors.adresse && (
                    <p className="text-red-500 text-xs">{formik.errors.adresse}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Ville</label>
                  <input
                    type="text"
                    name="ville"
                    value={formik.values.ville}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {formik.touched.ville && formik.errors.ville && (
                    <p className="text-red-500 text-xs">{formik.errors.ville}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Pays</label>
                  <input
                    type="text"
                    name="pays"
                    value={formik.values.pays}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {formik.touched.pays && formik.errors.pays && (
                    <p className="text-red-500 text-xs">{formik.errors.pays}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Date de début</label>
                  <input
                    type="date"
                    name="date_debut"
                    value={formik.values.date_debut}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {formik.touched.date_debut && formik.errors.date_debut && (
                    <p className="text-red-500 text-xs">{formik.errors.date_debut}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Date de fin</label>
                  <input
                    type="date"
                    name="date_fin"
                    value={formik.values.date_fin}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {formik.touched.date_fin && formik.errors.date_fin && (
                    <p className="text-red-500 text-xs">{formik.errors.date_fin}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Description des tâches</label>
                  <textarea
                    name="description_taches"
                    value={formik.values.description_taches}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows="4"
                  />
                  {formik.touched.description_taches && formik.errors.description_taches && (
                    <p className="text-red-500 text-xs">{formik.errors.description_taches}</p>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingExperience(null);
                    formik.resetForm();
                  }}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 text-sm"
                >
                  {editingExperience ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experiences;