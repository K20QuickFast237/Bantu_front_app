import React, { useState, useEffect } from 'react';
import { Edit, Trash2, PlusCircle, Loader2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { user, token } = useAuth();
  const [competences, setCompetences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [competenceToDelete, setCompetenceToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCompetence, setSelectedCompetence] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [newSkills, setNewSkills] = useState([]);
  const [availableCompetences, setAvailableCompetences] = useState([]);

  useEffect(() => {
    const fetchAvailableCompetences = async () => {
      try {
        const response = await api.get('/skills');
        setAvailableCompetences(response.data);
      } catch (error) {
        toast.error(t('skills.errorLoad'));
      }
    };

    const fetchCompetences = async () => {
      try {
        const response = await api.get(`/user/${user.id}/skills`);
        setCompetences(Array.isArray(response.data) ? response.data : []);
      } catch {
        toast.error(t('skills.errorLoad'));
        setCompetences([]);
      } finally {
        setIsSubmitting(false);
      }
    };

    fetchCompetences();
    fetchAvailableCompetences();
  }, [token, user.id, t]);

  const handleAddSkill = () => {
    if (!selectedCompetence || !selectedLevel) {
      toast.error(t('skills.selectSkillAndLevel'));
      return;
    }

    const skillObject = availableCompetences.find(s => s.id === parseInt(selectedCompetence));
    if (!skillObject) return;

    const alreadyAdded =
      newSkills.some(s => s.id === skillObject.id) ||
      competences.some(s => s.id === skillObject.id);

    if (alreadyAdded) {
      toast.error(t('skills.alreadyAdded'));
      return;
    }

    setNewSkills([...newSkills, { ...skillObject, niveau: selectedLevel }]);
    setSelectedCompetence('');
    setSelectedLevel('');
  };

  const handleRemoveNewSkill = (id) => {
    setNewSkills(newSkills.filter(s => s.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newSkills.length === 0) {
      toast.error(t('skills.addAtLeastOne'));
      return;
    }

    setIsSubmitting(true);
    try {
      const addedSkills = [];
      for (const skill of newSkills) {
        await api.post(`/user/${user.id}/skill`, {
          id: skill.id,
          niveau: skill.niveau
        });

        const fullSkill = availableCompetences.find(c => c.id === skill.id);
        addedSkills.push({ ...fullSkill, niveau: skill.niveau });
      }

      setCompetences([...competences, ...addedSkills]);
      setNewSkills([]);
      setIsModalOpen(false);
      toast.success(t('skills.successAdd'));

      window.dispatchEvent(new Event('competences-updated'));
    } catch {
      toast.error(t('skills.errorAdd'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    setIsSubmitting(true);
    try {
      await api.delete(`/user/${user.id}/skill/${competenceToDelete}`);
      setCompetences(competences.filter(c => c.id !== competenceToDelete));
      setIsDeleteModalOpen(false);
      setCompetenceToDelete(null);
      toast.success(t('skills.successDelete'));

      window.dispatchEvent(new Event('competences-updated'));
    } catch {
      toast.error(t('skills.errorDelete'));
    } finally {
      setIsSubmitting(false);
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
          <h2 className="text-xl font-semibold text-blue-800">{t('skills.title')}</h2>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button
                onClick={() => {
                  setNewSkills([]);
                  setSelectedCompetence('');
                  setSelectedLevel('');
                }}
                className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 font-medium text-sm transition-colors"
              >
                <PlusCircle size={16} className="mr-1" />
                {t('skills.add')}
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-md p-0">
              <DialogHeader className="pb-4 border-b border-gray-200 relative">
                <DialogTitle className="text-xl font-semibold text-gray-800 pt-6 px-6">
                  {t('skills.modalTitle')}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-4 flex gap-2">
                  <select
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedCompetence}
                    onChange={(e) => setSelectedCompetence(e.target.value)}
                  >
                    <option value="">{t('skills.selectSkill')}</option>
                    {availableCompetences.map((c) => (
                      <option key={c.id} value={c.id}>{c.nom}</option>
                    ))}
                  </select>

                  <select
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  >
                    <option value="">{t('skills.selectLevel')}</option>
                    <option value="Débutant">{t('skills.beginner')}</option>
                    <option value="Intermédiaire">{t('skills.intermediate')}</option>
                    <option value="Avancé">{t('skills.advanced')}</option>
                  </select>

                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    {t('skills.add')}
                  </button>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {newSkills.length > 0
                    ? newSkills.map(skill => (
                        <span
                          key={skill.id}
                          className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                        >
                          {skill.nom} - {skill.niveau}
                          <X
                            className="ml-2 cursor-pointer text-red-500"
                            onClick={() => handleRemoveNewSkill(skill.id)}
                          />
                        </span>
                      ))
                    : <p className="text-gray-400 text-sm">{t('skills.noneSelected')}</p>
                  }
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || newSkills.length === 0}
                    className="px-6 py-3 text-white bg-green-500 rounded-3xl hover:bg-green-600 flex items-center justify-center transition-colors disabled:bg-green-300"
                  >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('skills.save')}
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {competences.length === 0 ? (
            <p className="text-gray-500 text-center py-8">{t('skills.noSkills')}</p>
          ) : (
            competences.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-grow">
                  <DynamicFontAwesomeIcon
                    iconName={c.icon}
                    className="text-2xl text-orange-500 w-8 text-center"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800 text-lg">{c.nom}</h3>
                    <p className="text-sm text-gray-500">{c.description || t('skills.noDescription')}</p>
                    <p className="text-xs text-gray-400">{c.niveau ? `${t('skills.level')}: ${c.niveau}` : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0 ml-4">
                  <div className="text-center bg-blue-50 px-3 py-2 rounded-lg">
                    <p className="font-bold text-lg text-blue-600">{c.nbr_usage}</p>
                    <p className="text-xs text-gray-500">{t('skills.uses')}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openDeleteModal(c.id)}
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
            <DialogTitle>{t('skills.confirmDelete')}</DialogTitle>
            <DialogDescription>
              {t('skills.deleteDesc')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button type="button" className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 text-sm transition-colors">
                {t('skills.cancel')}
              </button>
            </DialogClose>
            <button
              onClick={handleConfirmDelete}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm flex items-center justify-center transition-colors disabled:bg-red-300"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('skills.delete')}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Competences;