import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { X, Save } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const validationSchema = Yup.object({
  telephone: Yup.string().required('Le téléphone est requis'),
  anniversaire: Yup.date().required("La date d'anniversaire est requise"),
  sexe: Yup.string().required('Le sexe est requis'),
  pays: Yup.string().required('Le pays est requis'),
  region: Yup.string().required('La région est requise'),
  ville: Yup.string().required('La ville est requise'),
  adresse: Yup.string().required("L'adresse est requise"),
});

const CompletionCandidatProfil = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      telephone: '671526369',
      anniversaire: '2003-05-04',
      sexe: 'Homme',
      pays: 'Cameroon',
      region: 'Littoral',
      ville: 'Douala',
      adresse: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Données du formulaire soumises :', values);
      // Sauvegarder les données dans le localStorage
      if (user && user.id) {
        const userData = {
          ...values,
          isProfileComplete: true,
        };
        localStorage.setItem(`user_${user.id}_profile`, JSON.stringify(userData));
      }
      onClose(); // Ferme la modale après soumission
      navigate('/dashboard/candidate'); // Rediriger vers le dashboard
    },
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  const renderField = (id, label, type = 'text', options = []) => (
    <div key={id}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{t(`profileCompletion.${label.toLowerCase().replace(/[^a-z]/g, '')}`)}<span className="text-red-500">*</span></label>
      {type === 'select' ? (
        <select
          id={id}
          name={id}
          {...formik.getFieldProps(id)}
          className={`w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${formik.touched[id] && formik.errors[id] ? 'border-red-500 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300 focus:border-blue-400'}`}
        >
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          {...formik.getFieldProps(id)}
          className={`w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${formik.touched[id] && formik.errors[id] ? 'border-red-500 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300 focus:border-blue-400'}`}
        />
      )}
      {formik.touched[id] && formik.errors[id] ? (
        <div className="text-red-500 text-xs mt-1">{formik.errors[id]}</div>
      ) : null}
    </div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{t('profileCompletion.completeYourProfile')}</h2>
              <motion.button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800"
                whileHover={{ scale: 1.1, rotate: 90 }}
              >
                <X size={24} />
              </motion.button>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderField('telephone', t('profileCompletion.telephone'), 'tel')}
                  {renderField('anniversaire', t('profileCompletion.anniversaire'), 'date')}
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('profileCompletion.sexe')}<span className="text-red-500">*</span></label>
                    <div className="flex items-center space-x-6">
                      {['Homme', 'Femme'].map((g) => (
                        <label key={g} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="sexe"
                            value={g}
                            checked={formik.values.sexe === g}
                            onChange={formik.handleChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{g}</span>
                        </label>
                      ))}
                    </div>
                     {formik.touched.sexe && formik.errors.sexe ? (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.sexe}</div>
                    ) : null}
                  </div>

                  {renderField('pays', t('profileCompletion.pays'), 'select', ['Cameroon', 'France', 'Nigeria'])}
                  {renderField('region', t('profileCompletion.region'), 'select', ['Littoral', 'Centre', 'Ouest'])}
                  {renderField('ville', t('profileCompletion.ville'))}
                  {renderField('adresse', t('profileCompletion.adresse'))}
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end items-center gap-4">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                  {t('profileCompletion.cancel')}
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:bg-blue-300"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                  <Save size={16} />
                  {t('profileCompletion.save')}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompletionCandidatProfil;