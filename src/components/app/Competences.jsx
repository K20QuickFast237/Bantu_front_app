import React, { useState, useEffect } from 'react';
import { Edit, Trash2, PlusCircle, Loader2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
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
import DynamicFontAwesomeIcon from './DynamicFontAwesomeIcon';

const Competences = () => {
  const { token } = useAuth();
  const [competences, setCompetences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompetence, setEditingCompetence] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [competenceToDelete, setCompetenceToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  // Données fictives pour remplacer l'API
  const fakeCompetences = [
    { id: 1, nom: 'React', description: 'Développement frontend', nbr_usage: 15 },
    { id: 2, nom: 'Node.js', description: 'Développement backend', nbr_usage: 12 },
    { id: 3, nom: 'Photoshop', description: 'Design graphique', nbr_usage: 8 },
    { id: 4, nom: 'Illustrator', description: 'Design vectoriel', nbr_usage: 6 },
    { id: 5, nom: 'Gestion de projet', description: 'Management', nbr_usage: 10 }
  ];

  useEffect(() => {
    const fetchCompetences = async () => {
      if (!token) return;
      try {
        // Simulation de chargement avec données fictives
        setTimeout(() => {
          setCompetences(fakeCompetences);
        }, 1000);
      } catch (error) {
        toast.error('Erreur lors du chargement des compétences');
        console.error('Erreur:', error);
        setCompetences([]);
      }
    };
    fetchCompetences();
  }, [token]);

  const handleRemoveSkill = (skillToRemove) => {
    setCompetences(competences.filter(skill => skill.id !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi de données
    setTimeout(() => {
      if (newSkill.trim() !== '' && !competences.some(c => c.nom === newSkill.trim())) {
        const newCompetence = {
          id: editingCompetence ? editingCompetence.id : Date.now(),
          nom: newSkill.trim(),
          description: '',
          nbr_usage: 0
        };

        if (editingCompetence) {
          setCompetences(competences.map(c => 
            c.id === editingCompetence.id ? { ...c, nom: newSkill.trim() } : c
          ));
          toast.success('Compétence mise à jour avec succès');
        } else {
          setCompetences([...competences, newCompetence]);
          toast.success('Compétence ajoutée avec succès');
        }

        setNewSkill('');
        setIsModalOpen(false);
        setEditingCompetence(null);
      }
      setIsSubmitting(false);
    }, 1000);
  };

  const openEditModal = (competence) => {
    setEditingCompetence(competence);
    setNewSkill(competence.nom);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!competenceToDelete) return;
    setIsSubmitting(true);
    
    // Simulation de suppression
    setTimeout(() => {
      setCompetences(competences.filter(c => c.id !== competenceToDelete));
      setIsDeleteModalOpen(false);
      setCompetenceToDelete(null);
      toast.success('Compétence supprimée avec succès');
      setIsSubmitting(false);
    }, 800);
  };

  const openDeleteModal = (id) => {
    setCompetenceToDelete(id);
    setIsDeleteModalOpen(true);
  };

  if (!token) {
    return <p className="text-red-500 text-center">Veuillez vous connecter pour gérer vos compétences.</p>;
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
                {/* Compétence Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Compétence <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Ex: React, Photoshop, Gestion de projet..."
                    required
                  />
                </div>
                
                {/* Liste des Compétences existantes */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Compétences ajoutées
                  </label>
                  <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-lg min-h-[60px]">
                    {competences.map((competence) => (
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
                    ))}
                    {competences.length === 0 && (
                      <p className="text-gray-400 text-sm">Aucune compétence ajoutée</p>
                    )}
                  </div>
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

        <div className="space-y-4">
          {competences.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucune compétence enregistrée.</p>
          ) : (
            competences.map((competence) => (
              <div key={competence.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4 flex-grow">
                  <DynamicFontAwesomeIcon 
                    iconName={competence.icon} 
                    className="text-2xl text-orange-500 w-8 text-center" 
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800 text-lg">{competence.nom}</h3>
                    <p className="text-sm text-gray-500">{competence.description || 'Pas de description'}</p>
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