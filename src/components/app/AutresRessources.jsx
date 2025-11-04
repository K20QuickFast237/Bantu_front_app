import React, { useState } from 'react';
import { Edit, Loader2, Linkedin, Globe, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '@/services/api';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const validationSchema = Yup.object({
  portfolio_link: Yup.string().url('URL du portfolio invalide').nullable(),
  linkedin_link: Yup.string().url('URL LinkedIn invalide').nullable(),
  github_link: Yup.string().url('URL GitHub invalide').nullable(),
  behance_link: Yup.string().url('URL Behance invalide').nullable(),
});

const AutresRessources = () => {
  const { particulier } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      portfolio_link: particulier?.portfolio_link || '',
      linkedin_link: particulier?.linkedin_link || '',
      github_link: particulier?.github_link || '',
      behance_link: particulier?.behance_link || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await api.put('/profile/particulier', values);

        toast.success('Ressources mises à jour avec succès !');
        setIsModalOpen(false);
      } catch (error) {
        console.error("Update error:", error.response?.data || error.message);
        toast.error('Erreur lors de la mise à jour des ressources.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const renderLink = (url, Icon, label) => {
    if (!url) return null;
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2">
        <Icon size={16} />
        <span className="truncate">{url}</span>
      </a>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-[95%] mx-auto my-8 border border-gray-200">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-400">
          <h2 className="text-xl font-semibold text-blue-800">Autres Ressources</h2>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 font-medium text-sm transition-colors"
              >
                <Edit size={16} className="mr-1" />
                Modifier
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg bg-white rounded-lg shadow-md p-0">
              <DialogHeader className="pb-4 border-b border-gray-200">
                <DialogTitle className="text-xl font-semibold text-gray-800 pt-6 px-6">
                  Modifier les ressources
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={formik.handleSubmit} className="p-6 space-y-4">
                <div>
                  <label htmlFor="portfolio_link" className="block text-gray-700 font-medium mb-2">Site internet / Portfolio</label>
                  <input
                    id="portfolio_link"
                    type="text"
                    {...formik.getFieldProps('portfolio_link')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://mon-portfolio.com"
                  />
                  {formik.touched.portfolio_link && formik.errors.portfolio_link ? (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.portfolio_link}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="linkedin_link" className="block text-gray-700 font-medium mb-2">LinkedIn</label>
                  <input
                    id="linkedin_link"
                    type="text"
                    {...formik.getFieldProps('linkedin_link')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://linkedin.com/in/votre-profil"
                  />
                  {formik.touched.linkedin_link && formik.errors.linkedin_link ? (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.linkedin_link}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="behance_link" className="block text-gray-700 font-medium mb-2">Behance</label>
                  <input
                    id="behance_link"
                    type="text"
                    {...formik.getFieldProps('behance_link')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://behance.com/in/votre-profil"
                  />
                  {formik.touched.behance_link && formik.errors.behance_link ? (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.behance_link}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="github_link" className="block text-gray-700 font-medium mb-2">GitHub</label>
                  <input
                    id="github_link"
                    type="text"
                    {...formik.getFieldProps('github_link')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://github.com/votre-profil"
                  />
                  {formik.touched.github_link && formik.errors.github_link ? (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.github_link}</p>
                  ) : null}
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="px-6 py-3 text-white bg-green-500 rounded-3xl hover:bg-green-600 flex items-center justify-center transition-colors disabled:bg-green-300"
                  >
                    {formik.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Enregistrer
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4 text-sm text-gray-700">
          <div className="flex items-center gap-4">
            <p className="w-40 text-gray-700 font-medium">Site internet / Portfolio</p>
            {renderLink(particulier?.portfolio_link, Globe, 'Portfolio') || <span className="text-gray-500">Non renseigné</span>}
          </div>
          <div className="flex items-center gap-4">
            <p className="w-40 text-gray-700 font-medium">LinkedIn</p>
            {renderLink(particulier?.linkedin_link, Linkedin, 'LinkedIn') || <span className="text-gray-500">Non renseigné</span>}
          </div>
          <div className="flex items-center gap-4">
            <p className="w-40 text-gray-700 font-medium">Behance</p>
            {renderLink(particulier?.behance_link, Globe, 'Behance') || <span className="text-gray-500">Non renseigné</span>}
          </div>
          <div className="flex items-center gap-4">
            <p className="w-40 text-gray-700 font-medium">GitHub</p>
            {renderLink(particulier?.github_link, Github, 'GitHub') || <span className="text-gray-500">Non renseigné</span>}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AutresRessources;