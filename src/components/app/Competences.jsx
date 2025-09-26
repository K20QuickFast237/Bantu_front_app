import React, { useState, useEffect } from 'react';
import { Edit, Trash2, PlusCircle, Loader2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DynamicFontAwesomeIcon from './DynamicFontAwesomeIcon';

const Competences = () => {
  const { user, token } = useAuth();
  const [competences, setCompetences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompetence, setEditingCompetence] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [competenceToDelete, setCompetenceToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [availableCompetences, setAvailableCompetences] = useState([]); // Liste des compétences disponibles depuis l'API


  useEffect(() => {
    // Récupérer la liste des compétences disponibles depuis l'API
    const fetchAvailableCompetences = async () => {
      try {
        const response = await api.get('/skills');
        setAvailableCompetences(response.data);
      } catch (error) {
        toast.error('Erreur lors du chargement des compétences disponibles');
      }
    };

    const fetchCompetences = async () => {
      try {
        const response = await api.get(`/user/${user.id}/skills`);
        setCompetences(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        toast.error('Erreur lors du chargement des compétences');
        setCompetences([]);
      } finally {
        setIsSubmitting(false);
      }
    };
    fetchCompetences();
   

  }, [token]);

  const handleRemoveSkill = (skillToRemove) => {
    setCompetences(competences.filter(skill => skill.id !== skillToRemove));
  };

  const handleSubmit = async() => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation pour s'assurer qu'une compétence est sélectionnée
      if (!newSkill) {
        toast.error('Veuillez sélectionner une compétence.');
        return;
      }

      // Envoyer la compétence sélectionnée à l'API
      const response = await api.post(`/user/${user.id}/skill`, { competenceId: newSkill }); // Remplacez '/user/competences' par votre endpoint pour ajouter une compétence à l'utilisateur

      // Mettre à jour la liste des compétences de l'utilisateur après l'ajout
      setCompetences([...competences, response.data]);
      toast.success('Compétence ajoutée avec succès');

      setNewSkill('');
      setIsModalOpen(false);
      setEditingCompetence(null);
    } catch (error) {
      toast.error('Erreur lors de l\'ajout de la compétence');
    } finally {
      setIsSubmitting(false);
      }
  };

  const openEditModal = (competence) => {
    setEditingCompetence(competence);
    setNewSkill(competence.nom);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {

    setIsSubmitting(true);

    try {
      await api.delete(`/user/${user.id}/skill/${competenceToDelete}`); 
      setIsDeleteModalOpen(false);
      setCompetenceToDelete(null);
      toast.success('Compétence supprimée avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression de la compétence');
    } finally {
      setIsSubmitting(false);
    }
  };const openDeleteModal = (id) => {
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
              setNewSkill('');
            }}
            className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 font-medium text-sm transition-colors"
          >
            <PlusCircle size={16} className="mr-1" />
            Ajouter
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-md p-0">
          <DialogHeader className="pb-4 border-b border-gray-200 relative">
            <DialogTitle className="text-xl font-semibold text-gray-800 pt-6 px-6">
              {editingCompetence ? 'Modifier une compétence' : 'Ajouter une compétence'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Sélection de la compétence */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Compétence <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                required
              >
                <option value="">Sélectionner une compétence</option>
                {availableCompetences.map((competence) => (
                  <option key={competence.id} value={competence.id}>
                    {competence.nom}
                  </option>
                ))}
              </select>
            </div>

            {/* Liste des compétences ajoutées */}
            <div className="mb-4 flex flex-wrap gap-2">
              {competences.length > 0 ? (
                competences.map((competence) => (
                  <span
                    key={competence.id}
                    className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                  >
                    {competence.nom}
                    <FaTimes
                      className="ml-2 cursor-pointer text-red-500"
                      onClick={() => handleRemoveSkill(competence.id)}
                    />
                  </span>
                ))
              ) : (
                <p className="text-gray-400 text-sm">Aucune compétence ajoutée</p>
              )}
            </div>

            {/* Bouton Enregistrer */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting || newSkill.trim() === ''}
                className="px-6 py-3 text-white bg-green-500 rounded-3xl hover:bg-green-600 flex items-center justify-center transition-colors disabled:bg-green-300"
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingCompetence ? 'Mettre à jour' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>

    {/* Liste affichée en dehors du modal */}
    <div className="space-y-4">
      {competences.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Aucune compétence enregistrée.</p>
      ) : (
        competences.map((competence) => (
          <div
            key={competence.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4 flex-grow">
              <DynamicFontAwesomeIcon
                iconName={competence.icon}
                className="text-2xl text-orange-500 w-8 text-center"
              />
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800 text-lg">{competence.nom}</h3>
                <p className="text-sm text-gray-500">
                  {competence.description || 'Pas de description'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 flex-shrink-0 ml-4">
              <div className="text-center bg-blue-50 px-3 py-2 rounded-lg">
                <p className="font-bold text-lg text-blue-600">{competence.nbr_usage}</p>
                <p className="text-xs text-gray-500">utilisations</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openEditModal(competence)}
                  className="flex items-center px-3 py-1 rounded-md text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 text-xs"
                >
                  <Edit size={14} className="mr-1" />
                  Modifier
                </button>
                <button
                  onClick={() => openDeleteModal(competence.id)}
                  className="flex items-center px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 text-xs"
                >
                  <Trash2 size={14} />
                </button>
              </div>
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
              Cette action est irréversible. La compétence sera définitivement supprimée.
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

export default Competences;