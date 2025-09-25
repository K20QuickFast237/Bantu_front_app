import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { X, User, Phone, Building, Briefcase, Globe, MapPin, Hash, Info, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Welcome1 from '../../assets/assets_application/welcome1.png';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/app/Header';

const itemVariants = { // This can be kept if you want to re-add animations later, but it's not used now.
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4, // Faster duration
      ease: 'easeOut',
    },
  },
};

const validationSchemaStep1 = Yup.object({
  titre_professionnel: Yup.string().required('Le titre du poste est requis'),
  telephone_pro: Yup.string().required('Le téléphone est requis'),
  fonctionEntreprise: Yup.string().required('La fonction est requise'),
  sexe: Yup.string().required('Le sexe est requis'),
});

const validationSchemaStep2 = Yup.object({
  nom_entreprise: Yup.string().required('Le nom de l\'entreprise est requis'),
  num_contribuable: Yup.string().required('Le N° de contribuable (NIU) est requis'),
  pays: Yup.string().required('Le pays est requis'),
  ville: Yup.string().required('La ville est requise'),
  adresse: Yup.string().required('L\'adresse est requise'),
  description_entreprise: Yup.string().required('La description est requise'),
  site_web: Yup.string().url('Veuillez entrer une URL valide').notRequired(),
});

const combinedValidationSchema = Yup.object().shape({
  ...validationSchemaStep1.fields,
  ...validationSchemaStep2.fields,
});

const InputField = ({ id, label, formik, icon: Icon, required = true, type = "text", ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-blue-800 mb-1">
      {label}{required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}
      </div>
      <input type={type} id={id} name={id} {...formik.getFieldProps(id)} {...props} className={`block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 bg-gray-100 text-gray-900 placeholder-gray-500 transition-all duration-300 ${ formik.touched[id] && formik.errors[id] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500' }`} />
    </div>
    {formik.touched[id] && formik.errors[id] ? <div className="text-red-500 text-xs mt-1">{formik.errors[id]}</div> : null}
  </div>
);

const Step1 = ({ formik, userData }) => (
  <div className="h-full">
    <h2 className="text-blue-800 text-2xl font-bold mb-6 text-center">
      Étape 1: Vos Informations
    </h2>
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
        {/* Champs pré-remplis non modifiables */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Nom</label>
            <input type="text" value={userData.nom} disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Prénom</label>
            <input type="text" value={userData.prenom} disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" />
          </div>
        </div>

        {/* Champs du formulaire */}
        {[
          { id: "titre_professionnel", label: "Titre du Poste", icon: Briefcase },
          { id: "telephone_pro", label: "Téléphone Professionnel", icon: Phone },
          { id: "fonctionEntreprise", label: "Votre Fonction", icon: User, colSpan: "md:col-span-2" }
        ].map((field) => (
          <motion.div key={field.id} className={field.colSpan || ""}>
            <InputField id={field.id} label={field.label} formik={formik} icon={field.icon} />
          </motion.div>
        ))}
        <motion.div className="md:col-span-2" onBlur={formik.handleBlur}>
          <label className="block text-sm font-medium text-blue-800 mb-2">Sexe<span className="text-red-500">*</span></label>
          <div className="flex items-center space-x-6">
            {["Homme", "Femme"].map((gender) => (
              <motion.label
                key={gender}
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <input
                  type="radio"
                  name="sexe" // Corrected name
                  value={gender}
                  onChange={formik.handleChange}
                  checked={formik.values.sexe === gender}
                  className="focus:ring-green-400 h-5 w-5 text-blue-600 border-blue-300"
                />
                <span className="ml-2 text-blue-800">{gender}</span>
              </motion.label>
            ))}
          </div>
          {formik.touched.sexe && formik.errors.sexe ? (
            <div className="text-red-500 text-xs mt-1">{formik.errors.sexe}</div>
          ) : null}
        </motion.div>
      </div>
    </div>
  </div>
);

const Step2 = ({ formik }) => (
  <div className="h-full">
    <h2 className="text-blue-800 text-2xl font-bold mb-6 text-center">
      Étape 2: Informations de l'Entreprise
    </h2>
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
        {[
          { id: "nom_entreprise", label: "Nom de l'entreprise", icon: Building, colSpan: "md:col-span-2" },
          { id: "num_contribuable", label: "N° de Contribuable (NIU)", icon: Hash, colSpan: "md:col-span-2" },
          { id: "pays", label: "Pays", icon: Globe, colSpan: "md:col-span-2", type: "select" },
          { id: "ville", label: "Ville", icon: MapPin, colSpan: "md:col-span-2" },
          { id: "adresse", label: "Adresse", icon: MapPin, colSpan: "md:col-span-2" },
          { id: "site_web", label: "Site Web", icon: Globe, colSpan: "md:col-span-2", required: false },
          { id: "description_entreprise", label: "Description de l'entreprise", icon: Info, colSpan: "md:col-span-2", type: "textarea" },
        ].map((field) => (
          <motion.div key={field.id} className={field.colSpan || ""}>
            <label htmlFor={field.id} className="block text-sm font-medium text-blue-800 mb-1">
              {field.label}{field.required !== false && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {field.icon && <field.icon className="h-5 w-5 text-gray-400" />}
              </div>
              {field.type === "select" ? (
                <select id={field.id} name={field.id} {...formik.getFieldProps(field.id)} className={`block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 bg-gray-100 text-gray-900 transition-all duration-300 ${ formik.touched[field.id] && formik.errors[field.id] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500' }`}>
                  <option value="">Choisir votre pays</option>
                  <option value="Cameroun">Cameroun</option>
                  <option value="Bénin">Bénin</option>
                  <option value="France">France</option>
                </select>
              ) : field.type === "textarea" ? (
                <textarea id={field.id} name={field.id} rows="4" {...formik.getFieldProps(field.id)} className={`block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 bg-gray-100 text-gray-900 placeholder-gray-500 transition-all duration-300 ${ formik.touched[field.id] && formik.errors[field.id] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500' }`} />
              ) : (
                <input type="text" id={field.id} name={field.id} {...formik.getFieldProps(field.id)} className={`block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 bg-gray-100 text-gray-900 placeholder-gray-500 transition-all duration-300 ${ formik.touched[field.id] && formik.errors[field.id] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500' }`} />
              )}
            </div>
            {formik.touched[field.id] && formik.errors[field.id] ? (
              <div className="text-red-500 text-xs mt-1">{formik.errors[field.id]}</div>
            ) : null}
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const CompletionProfessionnel = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [globalError, setGlobalError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  // Pre-filled user data
  const userData = {
    nom: 'Kana',
    prenom: 'Alma',
    email: 'kanaalma249@gmail.com',
  };

  const formik = useFormik({
    initialValues: {
      titre_professionnel: '',
      telephone_pro: '',
      fonctionEntreprise: '',
      sexe: '',
      nom_entreprise: '',
      num_contribuable: '',
      pays: '',
      ville: '',
      adresse: '',
      description_entreprise: '',
      site_web: '',
    },
    validationSchema: combinedValidationSchema,
    onSubmit: (values) => {
      setGlobalError('');
      if (formik.isValid) {
        console.log('Form data submitted:', values);
        if (user && user.id) {
          const recruiterData = {
            ...values,
            isRecruiterProfileComplete: true,
          };
          localStorage.setItem(`user_${user?.id}_recruiter_profile`, JSON.stringify(recruiterData));
        }
        navigate('/dashboardEntreprise');
      } else {
        setGlobalError("Veuillez vérifier les informations saisies.");
      }
    },
  });

  // Fait disparaître le message d'erreur global après 5 secondes
  useEffect(() => {
    if (globalError) {
      const timer = setTimeout(() => {
        setGlobalError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [globalError]);

  const handleNext = async () => {
    if (currentStep === 1) {
      const step1Fields = Object.keys(validationSchemaStep1.fields);

      try {
        // Valider manuellement les valeurs UNIQUEMENT contre le schéma de l'étape 1
        await validationSchemaStep1.validate(formik.values, { abortEarly: false });
        setGlobalError('');
        setCurrentStep(2);
      } catch (validationErrors) {
        // Si la validation échoue, Yup lève une erreur. On la transforme pour Formik.
        const errors = {};
        validationErrors.inner.forEach(error => {
          errors[error.path] = error.message;
        });
        formik.setErrors(errors);
        // On marque les champs comme "touchés" pour que les erreurs s'affichent
        const touchedFields = step1Fields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
        formik.setTouched(touchedFields);
        setGlobalError("Veuillez corriger les erreurs avant de continuer.");
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    setGlobalError('');
  };

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

  // Fonction de gestion du clic
  const handleCreateAccount = () => {
    // Logique de validation ou de soumission du formulaire...
    // Une fois la soumission réussie, rediriger l'utilisateur
    navigate('/dashboardEntreprise');
  };

  const handleClose = () => {
    // Navigue vers la page précédente ou une page par défaut
    navigate(-1);
  };

  return (
    <AnimatePresence>
      {/* Conteneur principal qui prend toute la hauteur et utilise flexbox */}
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        {/* Conteneur pour les deux compartiments qui prend l'espace restant */}
        <motion.div
          className="flex-grow flex flex-col lg:flex-row"
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Left Section */}
          <motion.div
            className="w-full lg:w-1/2 bg-gradient-to-b from-[#0A2342] to-green-900/50 flex flex-col items-center justify-center px-6 lg:px-12 py-12 text-white relative"
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(45deg, rgba(0,150,55,0.2), rgba(37,99,235,0.2), rgba(239,68,68,0.2))',
                backgroundSize: '200% 200%',
              }}
              animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            />
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-8 text-center lg:text-left leading-tight tracking-tight"
              whileHover={{ scale: 1.05, color: '#22c55e' }}
            >
              Complétez Votre Profil Entreprise
            </motion.h1>
            <motion.p
              className="text-base text-center lg:text-left mb-12 opacity-90 max-w-lg"
              style={{ textShadow: '0 0 10px rgba(255,255,255,0.2)' }}
            >
              Finalisez votre profil pour accéder à notre plateforme et recruter les meilleurs talents. Ajoutez les informations de votre entreprise pour commencer dès aujourd'hui.
            </motion.p>
            <motion.div
              className="w-full flex justify-center relative"
              animate={{ y: [-5, 5] }}
              transition={{ y: { repeat: Infinity, repeatType: 'reverse', duration: 3, ease: 'easeInOut' } }}
            >
              <img
                src={Welcome1}
                alt="Welcome Illustration"
                className="max-w-[80%] h-auto drop-shadow-2xl"
              />
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-red-500/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </motion.div>

          {/* Right Section - Form */}
          <form onSubmit={formik.handleSubmit}
            className="w-full lg:w-1/2 bg-white px-6 lg:px-12 py-8 relative flex flex-col"
          >
            <motion.button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 z-50 transition-transform hover:rotate-90"
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={32} strokeWidth={2} />
              </motion.button>
              <AnimatePresence>
                {globalError && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 text-center text-sm">
                    {globalError}
                  </motion.div>
                )}
              </AnimatePresence>

                {/* Step Indicator */}
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-8">
                    {[1, 2].map((step) => (
                      <div key={step} className="flex items-center gap-3">
                        <motion.div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                            currentStep >= step
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-500'
                          }`}
                          layout
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                          {step}
                        </motion.div>
                        <span
                          className={`font-semibold hidden sm:inline ${
                            currentStep >= step ? 'text-green-600' : 'text-gray-500'
                          }`}
                        >
                          {step === 1 ? 'Infos Personnelles' : 'Infos Entreprise'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-grow relative">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        className="absolute inset-0 overflow-y-auto pr-4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Step1 formik={formik} userData={userData} />
                      </motion.div>
                    )}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        className="absolute inset-0 overflow-y-auto pr-4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Step2 formik={formik} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                  {currentStep > 1 ? (
                    <motion.button
                      type="button"
                      className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                      onClick={handlePrev}
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                      Précédent
                    </motion.button>
                  ) : (
                    <motion.button
                      type="button"
                      className="px-6 py-2 rounded-lg bg-red-500/10 text-red-600 border-2 border-red-400 font-semibold hover:bg-red-500/20 transition-colors"
                      onClick={handleClose}
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                      Annuler
                    </motion.button>
                  )}

                  {currentStep < 2 ? (
                    <motion.button
                      type="button"
                      className="px-8 py-2 rounded-lg bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transition-colors"
                      onClick={handleNext}
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                      Suivant
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      className="px-8 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      disabled={formik.isSubmitting}
                    >
                      Terminer mon profil
                    </motion.button>
                  )}
                </div>
              </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CompletionProfessionnel;