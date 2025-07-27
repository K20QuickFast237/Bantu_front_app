import React, { useState, useEffect } from 'react';
import { Edit, Trash2, PlusCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

// Schéma de validation pour les formations
const formationSchema = Yup.object().shape({
  domaine_etude: Yup.string().required('Le domaine d\'étude est requis'),
  date_debut: Yup.date().required('La date de début est requise').nullable(),
  date_fin: Yup.date().min(Yup.ref('date_debut'), 'La date de fin doit être postérieure à la date de début').nullable(),
  etablissement: Yup.string().required('L\'établissement est requis'),
  diplome: Yup.string().required('Le diplôme est requis'),
});

const DiplomesFormations = () => {
  const { token } = useAuth();
  const [formations, setFormations] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFormation, setEditingFormation] = useState(null);

  // Charger les formations à chaque montage ou changement de token
  useEffect(() => {
    const fetchFormations = async () => {
      if (!token) {
        return;
      }
      try {
        const response = await api.get('/formations');
        setFormations(response.data);
      } catch (error) {
        toast.error('Erreur lors du chargement des formations');
        console.error('Erreur API:', error);
        setFormations([]); // Réinitialiser en cas d'erreur
      }
    };
    fetchFormations();
  }, [token]); // Déclenche à chaque changement de token (connexion/déconnexion)

  // Formulaire Formik
  const formik = useFormik({
    initialValues: {
      domaine_etude: '',
      date_debut: '',
      date_fin: '',
      etablissement: '',
      diplome: '',
    },
    validationSchema: formationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        let response;
        if (editingFormation) {
          response = await api.put(`/formations/${editingFormation.id}`, values);
          toast.success('Formation mise à jour avec succès');
          setFormations(formations.map(f => (f.id === editingFormation.id ? { ...f, ...values, id: editingFormation.id } : f)));
        } else {
          response = await api.post('/formations', values);
          console.log('Réponse API POST:', response.data);
          setFormations([...formations, { ...values, id: response.data.id || Date.now() }]);
          toast.success('Formation ajoutée avec succès');
        }
        resetForm();
        setIsModalOpen(false);
        setEditingFormation(null);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Une erreur est survenue');
        console.error('Erreur soumission:', error);
      }
    },
  });

  // Ouvrir le modal pour modifier
  const openEditModal = (formation) => {
    setEditingFormation(formation);
    formik.setValues({
      domaine_etude: formation.domaine_etude,
      date_debut: formation.date_debut,
      date_fin: formation.date_fin,
      etablissement: formation.etablissement,
      diplome: formation.diplome,
    });
    setIsModalOpen(true);
  };

  // Supprimer une formation
  const deleteFormation = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette formation ?')) {
      try {
        await api.delete(`/formations/${id}`);
        setFormations(formations.filter(f => f.id !== id));
        toast.success('Formation supprimée avec succès');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Erreur lors de la suppression');
        console.error('Erreur suppression:', error);
      }
    }
  };

  if (!token) {
    return <p className="text-red-500 text-center">Veuillez vous connecter pour gérer vos formations.</p>;
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
            <h2 className="text-xl font-semibold text-blue-800">Diplômes & Formations</h2>
          </div>
          <button
            onClick={() => {
              setEditingFormation(null);
              formik.resetForm();
              setIsModalOpen(true);
            }}
            className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 animate-pulse font-medium text-sm"
          >
            <PlusCircle size={16} className="mr-1" />
            Ajouter
          </button>
        </div>

        {/* Formations List */}
        <div className="space-y-6">
          {formations.length === 0 ? (
            <p className="text-gray-600">Aucune formation enregistrée.</p>
          ) : (
            formations.map((item) => (
              <div key={item.id} className="flex justify-between items-start pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-start flex-grow">
                  <div className="w-2 h-2 rounded-full mr-3 mt-2" style={{ backgroundColor: '#10B981' }}></div>
                  <div>
                    <div className="grid grid-cols-2 border-l-1 border-[#10B981] -ml-4 pl-4 gap-y-1 gap-x-4 text-sm text-gray-700">
                      <p><span className="font-medium text-gray-600">Nom</span></p>
                      <p>{item.diplome || 'Non spécifié'}</p>
                      <p><span className="font-medium text-gray-600">École Ou Organisme</span></p>
                      <p>{item.etablissement || 'Non spécifié'}</p>
                      <p><span className="font-medium text-gray-600">Niveau</span></p>
                      <p>{item.domaine_etude || 'Non spécifié'}</p>
                      <p><span className="font-medium text-gray-600">Date</span></p>
                      <p>{`${item.date_debut || ''} - ${item.date_fin || ''}`}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="flex items-center px-2 py-1 rounded-md text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 text-xs"
                  >
                    <Edit size={14} className="mr-1" />
                    Modifier
                  </button>
                  <button
                    onClick={() => deleteFormation(item.id)}
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
                {editingFormation ? 'Modifier une formation' : 'Ajouter une formation'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-800">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Diplôme</label>
                  <input
                    type="text"
                    name="diplome"
                    value={formik.values.diplome}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {formik.touched.diplome && formik.errors.diplome && (
                    <p className="text-red-500 text-xs">{formik.errors.diplome}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Domaine d'étude</label>
                  <input
                    type="text"
                    name="domaine_etude"
                    value={formik.values.domaine_etude}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {formik.touched.domaine_etude && formik.errors.domaine_etude && (
                    <p className="text-red-500 text-xs">{formik.errors.domaine_etude}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Établissement</label>
                  <input
                    type="text"
                    name="etablissement"
                    value={formik.values.etablissement}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {formik.touched.etablissement && formik.errors.etablissement && (
                    <p className="text-red-500 text-xs">{formik.errors.etablissement}</p>
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
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingFormation(null);
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
                  {editingFormation ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiplomesFormations;