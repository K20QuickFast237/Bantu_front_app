
import React, { useState, useEffect } from 'react';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
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
import DynamicFontAwesomeIcon from '../ui/DynamicFontAwesomeIcon';

const competenceSchema = Yup.object().shape({
  nom: Yup.string().required('Le nom de la compétence est requis'),
  description: Yup.string().nullable(),
  icon: Yup.string().nullable(),
  nbr_usage: Yup.number()
    .integer('Doit être un nombre entier')
    .min(0, 'Ne peut être négatif')
    .required("Le nombre d'usage est requis"),
});

const Competences = () => {
  const { token } = useAuth();
  const [competences, setCompetences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompetence, setEditingCompetence] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [competenceToDelete, setCompetenceToDelete] = useState(null);

  useEffect(() => {
    const fetchCompetences = async () => {
      if (!token) return;
      try {
        const response = await api.get('/skills');
        setCompetences(response.data);
      } catch (error) {
        toast.error('Erreur lors du chargement des compétences');
        console.error('Erreur API:', error);
        setCompetences([]);
      }
    };
    fetchCompetences();
  }, [token]);

  const formik = useFormik({
    initialValues: {
      nom: '',
      description: '',
      icon: '',
      nbr_usage: 0,
    },
    validationSchema: competenceSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        let response;
        if (editingCompetence) {
          response = await api.put(`/skills/${editingCompetence.id}`, values);
          toast.success('Compétence mise à jour avec succès');
          setCompetences(competences.map(c => (c.id === editingCompetence.id ? response.data : c)));
        } else {
          response = await api.post('/skills', values);
          toast.success('Compétence ajoutée avec succès');
          setCompetences([...competences, response.data]);
        }
        resetForm();
        setIsModalOpen(false);
        setEditingCompetence(null);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Une erreur est survenue');
        console.error('Erreur soumission:', error);
      }
    },
  });

  const openEditModal = (competence) => {
    setEditingCompetence(competence);
    formik.setValues({
      nom: competence.nom,
      description: competence.description || '',
      icon: competence.icon || '',
      nbr_usage: competence.nbr_usage,
    });
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!competenceToDelete) return;
    try {
      await api.delete(`/skills/${competenceToDelete}`);
      setCompetences(competences.filter(c => c.id !== competenceToDelete));
      toast.success('Compétence supprimée avec succès');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la suppression');
      console.error('Erreur suppression:', error);
    } finally {
      setIsDeleteModalOpen(false);
      setCompetenceToDelete(null);
    }
  };

  const openDeleteModal = (id) => {
    setCompetenceToDelete(id);
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
          <h2 className="text-xl font-semibold text-blue-800">Compétences</h2>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button
                onClick={() => {
                  setEditingCompetence(null);
                  formik.resetForm();
                }}
                className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 animate-pulse font-medium text-sm"
              >
                <PlusCircle size={16} className="mr-1" />
                Ajouter
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{editingCompetence ? 'Modifier une compétence' : 'Ajouter une compétence'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Nom</label>
                  <input type="text" name="nom" value={formik.values.nom} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full p-2 border border-gray-300 rounded-md" />
                  {formik.touched.nom && formik.errors.nom && <p className="text-red-500 text-xs">{formik.errors.nom}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Description</label>
                  <input type="text" name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Icône (ex: fa-springboot)</label>
                  <input type="text" name="icon" value={formik.values.icon} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Nombre d'usage</label>
                  <input type="number" name="nbr_usage" value={formik.values.nbr_usage} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full p-2 border border-gray-300 rounded-md" />
                  {formik.touched.nbr_usage && formik.errors.nbr_usage && <p className="text-red-500 text-xs">{formik.errors.nbr_usage}</p>}
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <button type="button" className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 text-sm">Annuler</button>
                  </DialogClose>
                  <button type="submit" className="px-4 py-2 border-2 border-gray-300 rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 text-sm">
                    {editingCompetence ? 'Mettre à jour' : 'Ajouter'}
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {competences && competences.length > 0 ? (
            competences.map((competence) => (
              <div key={competence.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4 flex-grow">
                  <DynamicFontAwesomeIcon iconName={competence.icon} className="text-2xl text-orange-500 w-8 text-center" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">{competence.nom}</h3>
                    <p className="text-sm text-gray-500">{competence.description || 'Pas de description'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0 ml-4">
                  <div className="text-center">
                    <p className="font-bold text-lg text-blue-600">{competence.nbr_usage}</p>
                    <p className="text-xs text-gray-500">utilisations</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => openEditModal(competence)} className="p-1 text-gray-500 hover:text-blue-600"><Edit size={16} /></button>
                    <button onClick={() => openDeleteModal(competence.id)} className="p-1 text-gray-500 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Aucune compétence enregistrée.</p>
          )}
        </div>
      </motion.section>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Êtes-vous sûr de vouloir supprimer ?</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. La compétence sera définitivement supprimée.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button type="button" className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 text-sm">Annuler</button>
            </DialogClose>
            <button onClick={handleConfirmDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm">
              Supprimer
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Competences;