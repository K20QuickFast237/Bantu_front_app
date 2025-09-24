import React, { useState, useEffect } from 'react';
import { Edit, Trash2, PlusCircle, Loader2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
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
  const [skills, setSkills] = useState(['Photoshop', 'Illustrator', 'Gestion de projet']);

  // Données fictives pour remplacer l'API
  const fakeExperiences = [
    {
      id: 1,
      titre_poste: 'Développeur Frontend',
      nom_entreprise: 'Tech Solutions',
      date_debut: '2020-01-15',
      date_fin: '2022-03-20',
      description_taches: 'Développement d\'applications web responsives avec React et Vue.js',
      adresse: '123 Rue de la Tech',
      ville: 'Paris',
      pays: 'France',
      resultat_obtenu: 'Projets livrés avec succès'
    },
    {
      id: 2,
      titre_poste: 'Designer UI/UX',
      nom_entreprise: 'Creative Agency',
      date_debut: '2018-06-10',
      date_fin: '2019-12-15',
      description_taches: 'Conception d\'interfaces utilisateur et expériences utilisateur',
      adresse: '456 Avenue Design',
      ville: 'Lyon',
      pays: 'France',
      resultat_obtenu: 'Augmentation de la satisfaction utilisateur de 30%'
    }
  ];

  useEffect(() => {
    const fetchExperiences = async () => {
      if (!token) return;
      setIsLoading(true);
      try {
        // Simulation de chargement avec données fictives
        setTimeout(() => {
          setExperiences(fakeExperiences);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        toast.error('Erreur lors du chargement des expériences');
        console.error('Erreur:', error);
        setExperiences([]);
        setIsLoading(false);
      }
    };
    fetchExperiences();
  }, [token]);

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi de données
    setTimeout(() => {
      const newExperience = {
        id: editingExperience ? editingExperience.id : Date.now(),
        titre_poste: e.target.titre_poste.value,
        nom_entreprise: e.target.nom_entreprise.value,
        date_debut: e.target.date_debut.value,
        date_fin: e.target.date_fin.value,
        description_taches: e.target.description_taches.value,
        adresse: e.target.adresse.value,
        ville: e.target.ville.value,
        pays: e.target.pays.value,
        resultat_obtenu: e.target.resultat_obtenu.value
      };

      if (editingExperience) {
        setExperiences(experiences.map(exp => 
          exp.id === editingExperience.id ? newExperience : exp
        ));
        toast.success('Expérience mise à jour avec succès');
      } else {
        setExperiences([...experiences, newExperience]);
        toast.success('Expérience ajoutée avec succès');
      }

      setIsModalOpen(false);
      setEditingExperience(null);
      setIsSubmitting(false);
    }, 1000);
  };

  const openEditModal = (experience) => {
    setEditingExperience(experience);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!experienceToDelete) return;
    setIsSubmitting(true);
    
    // Simulation de suppression
    setTimeout(() => {
      setExperiences(experiences.filter(e => e.id !== experienceToDelete));
      setIsDeleteModalOpen(false);
      setExperienceToDelete(null);
      toast.success('Expérience supprimée avec succès');
      setIsSubmitting(false);
    }, 800);
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
              
              <form onSubmit={handleSubmit} className="p-6">
                {/* Titre du poste */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Titre du poste <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="titre_poste"
                    defaultValue={editingExperience?.titre_poste || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex : Développeur Frontend"
                    required
                  />
                </div>
                
                {/* Nom de l'entreprise */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Nom de l'entreprise <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nom_entreprise"
                    defaultValue={editingExperience?.nom_entreprise || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex : Tech Solutions"
                    required
                  />
                </div>
                
                {/* Adresse */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="adresse"
                    defaultValue={editingExperience?.adresse || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex : 123 Rue de la Tech"
                  />
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
                      defaultValue={editingExperience?.ville || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex : Paris"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Pays
                    </label>
                    <input
                      type="text"
                      name="pays"
                      defaultValue={editingExperience?.pays || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex : France"
                    />
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
                      defaultValue={editingExperience?.date_debut || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Date de fin <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date_fin"
                      defaultValue={editingExperience?.date_fin || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                {/* Résultat obtenu */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Résultat obtenu
                  </label>
                  <input
                    type="text"
                    name="resultat_obtenu"
                    defaultValue={editingExperience?.resultat_obtenu || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex : Projets livrés avec succès"
                  />
                </div>
                
                {/* Description des tâches */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Description des tâches
                  </label>
                  <textarea
                    name="description_taches"
                    defaultValue={editingExperience?.description_taches || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Décrivez vos principales missions et responsabilités..."
                  ></textarea>
                </div>
                
                {/* Compétences */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Compétences
                  </label>
                  <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg">
                    {skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                      >
                        {skill}
                        <FaTimes 
                          className="ml-2 cursor-pointer text-red-500" 
                          onClick={() => handleRemoveSkill(skill)} 
                        />
                      </span>
                    ))}
                  </div>
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
                      <p><span className="font-medium text-gray-600">Résultat obtenu</span></p>
                      <p>{exp.resultat_obtenu || 'Non spécifié'}</p>
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