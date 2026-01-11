import React, { useState, useEffect } from 'react';
import { Edit, Loader2, Globe, Trash2, PlusCircle, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from 'react-i18next';

const AutresRessources = () => {
  const { t } = useTranslation();
  const { particulier, refreshAuth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ressources, setRessources] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [portfolioLink, setPortfolioLink] = useState('');
  const [nouveauNom, setNouveauNom] = useState('');
  const [nouveauLien, setNouveauLien] = useState('');

  useEffect(() => {
    if (particulier?.ressources) {
      try {
        const parsedRessources = JSON.parse(particulier.ressources);
        if (Array.isArray(parsedRessources)) {
          setRessources(parsedRessources);
        }
      } catch (error) {
        console.error("Erreur lors de l'analyse des ressources:", error);
        setRessources([]);
      }
    } else {
      setRessources([]);
    }
    setPortfolioLink(particulier?.portfolio_link || '');
  }, [particulier]);

  const handleAjouterRessource = () => {
    if (nouveauNom && nouveauLien) {
      // Basic URL validation
      try {
        new URL(nouveauLien);
        setRessources([...ressources, { nom: nouveauNom, lien: nouveauLien }]);
        setNouveauNom('');
        setNouveauLien('');
      } catch (_) {
        toast.error(t('profile.otherResources.invalidUrlError'));
      }
    } else {
      toast.error(t('profile.otherResources.missingFieldsError'));
    }
  };

  const handleSupprimerRessource = (index) => {
    const nouvellesRessources = [...ressources];
    nouvellesRessources.splice(index, 1);
    setRessources(nouvellesRessources);
  };

  const handleUpdateRessource = (index, field, value) => {
    const nouvellesRessources = [...ressources];
    nouvellesRessources[index] = { ...nouvellesRessources[index], [field]: value };
    setRessources(nouvellesRessources);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('ressources', JSON.stringify(ressources));
      formData.append('portfolio_link', portfolioLink);
      // Laravel ne gère pas bien FormData avec PUT, on doit le "tricher" avec POST et _method
      formData.append('_method', 'PUT');

      await api.post('/profile/particulier', formData);

      await refreshAuth();
      toast.success(t('profile.otherResources.updateSuccess'));
      window.dispatchEvent(new CustomEvent('profile-updated'));
      setIsModalOpen(false);
    } catch (error) {
      toast.error(t('profile.otherResources.updateError'));
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-[95%] mx-auto my-8 border border-gray-200">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-400 gap-3">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800">{t('profile.otherResources.title')}</h2>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
           <DialogTrigger asChild>
              <button
                className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 font-medium text-sm transition-colors"
              >
                <Edit size={16} className="mr-1" />
                {t('profile.otherResources.edit')}
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-white rounded-lg shadow-md p-0 max-h-[90vh] overflow-y-auto">
              <DialogHeader className="pb-4 border-b border-gray-200">
                <DialogTitle className="text-xl font-semibold text-gray-800 pt-6 px-6">
                  {t('profile.otherResources.editTitle')}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
                <div className="space-y-2">
                  <label htmlFor="portfolio_link" className="block text-sm font-medium text-gray-700">{t('profile.otherResources.website')}</label>
                  <input
                    id="portfolio_link"
                    type="text"
                    placeholder={t('profile.otherResources.portfolioPlaceholder')}
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">{t('profile.otherResources.currentResources')}</label>
                  {ressources.length > 0 ? (
                    ressources.map((ressource, index) => (editingIndex === index ? (
                      <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-md">
                        <input type="text" value={ressource.nom} onChange={(e) => handleUpdateRessource(index, 'nom', e.target.value)} className="flex-1 px-2 py-1 border border-gray-300 rounded-md text-sm" />
                        <input type="text" value={ressource.lien} onChange={(e) => handleUpdateRessource(index, 'lien', e.target.value)} className="flex-1 px-2 py-1 border border-gray-300 rounded-md text-sm" />
                        <button type="button" onClick={() => setEditingIndex(null)} className="p-2 text-green-600 hover:text-green-800">
                          <Save size={16} />
                        </button>
                      </div>
                    ) : (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-md group">
                        <div className="truncate">
                          <strong className="capitalize">{ressource.nom}:</strong>
                          <a href={ressource.lien} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">{ressource.lien}</a>
                        </div>
                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => setEditingIndex(index)}
                            className="p-2 text-blue-600 hover:text-blue-800"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSupprimerRessource(index)}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )) : (
                    <p className="text-sm text-gray-500">{t('profile.otherResources.noResourcesAdded')}</p>
                  )}
                </div>

                <div className="space-y-2 pt-4 border-t">
                   <label className="block text-sm font-medium text-gray-700">{t('profile.otherResources.addNewResource')}</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder={t('profile.otherResources.namePlaceholder')}
                      value={nouveauNom}
                      onChange={(e) => setNouveauNom(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder={t('profile.otherResources.linkPlaceholder')}
                      value={nouveauLien}
                      onChange={(e) => setNouveauLien(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={handleAjouterRessource}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
                    >
                      <PlusCircle size={16} className="mr-1" /> {t('profile.otherResources.add')}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 text-white bg-green-500 rounded-3xl hover:bg-green-600 flex items-center justify-center transition-colors disabled:bg-green-300"
                  >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('profile.otherResources.save')}
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {ressources.length > 0 || portfolioLink ? (
          <div className="space-y-4 text-sm text-gray-700">
            {portfolioLink && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <p className="w-full sm:w-40 text-gray-700 font-medium capitalize">{t('profile.otherResources.portfolio')}</p>
                <a href={portfolioLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2 w-full sm:w-auto">
                  <Globe size={16} />
                  <span className="truncate">{portfolioLink}</span>
                </a>
              </div>
            )}
            {ressources.map((ressource, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <p className="w-full sm:w-40 text-gray-700 font-medium capitalize">{ressource.nom}</p>
                <a href={ressource.lien} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2 w-full sm:w-auto">
                  <Globe size={16} />
                  <span className="truncate">{ressource.lien}</span>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">{t('profile.otherResources.noExternalResources')}</p>
        )}
      </motion.section>
    </div>

  );
};

export default AutresRessources;