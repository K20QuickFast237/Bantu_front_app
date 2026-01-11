import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import api from '@/services/api';
import { toast } from 'sonner';
import { ClipLoader } from "react-spinners";
import { Upload, Trash2, Eye, Share2, Edit, X, Search } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Composant de prévisualisation
const OffrePreview = ({ values, onEdit, onCancel, onSubmit }) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Header Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{values.titre_poste}</h1>
          <div className="flex items-center gap-2">
            <button className="text-teal-500 font-medium flex items-center gap-1">
              {t('multiStepForm.share')} <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mb-6">
          {t('multiStepForm.publicationDate')} {new Date().toLocaleDateString('fr-FR')} • {t('multiStepForm.deadline')} {new Date(values.date_limite_soumission).toLocaleDateString('fr-FR')}
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
          <div>
            <div className="font-semibold text-gray-900 mb-1">{t('multiStepForm.contractType')}</div>
            <div className="text-gray-700">{values.type_contrat.toUpperCase()}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">{t('multiStepForm.location')}</div>
            <div className="text-gray-700">{values.ville}, {values.pays}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">{t('multiStepForm.salary')}</div>
            <div className="text-gray-700">{values.remuneration_min} - {values.remuneration_max}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">{t('multiStepForm.remoteWork')}</div>
            <div className="text-gray-700">{values.teletravail ? t('multiStepForm.allowed') : t('multiStepForm.notAllowed')}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">{t('multiStepForm.experience')}</div>
            <div className="text-gray-700">{values.experience}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">{t('multiStepForm.educationLevel')}</div>
            <div className="text-gray-700">{values.niveau_etudes || t('multiStepForm.notSpecified')}</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={onEdit} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
            <Edit className="w-5 h-5" />
            {t('multiStepForm.editOffer')}
          </button>
          <button onClick={onSubmit} className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center transition-colors">
            {t('multiStepForm.publish')}
          </button>
          <button onClick={onCancel} className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
            <X className="w-5 h-5" />
            {t('multiStepForm.cancel')}
          </button>
        </div>
      </div>

      {/* Description Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-orange-500 mb-4">{t('multiStepForm.offerDescription')}</h2>
        <p className="text-gray-700 mb-6 leading-relaxed whitespace-pre-line">{values.description_poste}</p>

        <h3 className="text-xl font-bold text-orange-500 mb-4">{t('multiStepForm.employeeMissions')}</h3>
        <div className="space-y-2 text-gray-700 mb-6 whitespace-pre-line">{values.responsabilites}</div>

        <h3 className="text-xl font-bold text-orange-500 mb-4">{t('multiStepForm.requiredProfile')}</h3>
        <div className="space-y-2 text-gray-700 whitespace-pre-line">{values.exigences}</div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="bg-white rounded-lg shadow-sm p-6 flex gap-3">
        <button onClick={onEdit} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
          <Edit className="w-5 h-5" />
          {t('multiStepForm.editOffer')}
        </button>
        <button onClick={onSubmit} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
          {t('multiStepForm.publishOffer')}
        </button>
        <button onClick={onCancel} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
          <X className="w-5 h-5" />
          {t('multiStepForm.cancel')}
        </button>
      </div>
    </div>
  );
};

// Composants de champ réutilisables inspirés de InscriptionEntreprise.jsx
const InputField = ({ name, label, formik, type = "text", placeholder = "" }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      {...formik.getFieldProps(name)}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
        formik.touched[name] && formik.errors[name]
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:ring-orange-500'
      }`}
    />
    {formik.touched[name] && formik.errors[name] ? (
      <div className="text-red-500 text-xs mt-1">{formik.errors[name]}</div>
    ) : null}
  </div>
);

const TextareaField = ({ name, label, formik, rows = 4, placeholder = "" }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      id={name}
      name={name}
      rows={rows}
      placeholder={placeholder}
      {...formik.getFieldProps(name)}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
        formik.touched[name] && formik.errors[name]
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:ring-orange-500'
      }`}
    />
    {formik.touched[name] && formik.errors[name] ? (
      <div className="text-red-500 text-xs mt-1">{formik.errors[name]}</div>
    ) : null}
  </div>
);


const MultiStepForm = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [skillsList, setSkillsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [contractType, setContractType] = useState([]);
  const { professionnel } = useAuth();
  const [newDoc, setNewDoc] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // Nouvel état pour la prévisualisation
  const formRef = useRef(null);
  const navigate = useNavigate();

  const validationSchemas = [
    // Step 1: EMPLOYEUR
    Yup.object({
      nom_entreprise: Yup.string().required(t('multiStepForm.companyNameRequired')),
      email_pro: Yup.string().email(t('multiStepForm.invalidEmail')).required(t('multiStepForm.emailRequired')),
      telephone_pro: Yup.string().required(t('multiStepForm.phoneRequired')),
      pays: Yup.string().required(t('multiStepForm.countryRequired')),
      ville: Yup.string().required(t('multiStepForm.cityRequired')),
      adresse: Yup.string().required(t('multiStepForm.addressRequired')),
      description_entreprise: Yup.string().nullable(),
    }),
    // Step 2: OFFRE (tous requis et typés)
    Yup.object({
      categorie_id: Yup.string().required(t('multiStepForm.categoryRequired')),
      titre_poste: Yup.string().required(t('multiStepForm.titleRequired')),
      date_limite_soumission: Yup.date().required(t('multiStepForm.dateRequired'))
        .min(new Date(new Date().setHours(0, 0, 0, 0)), t('multiStepForm.invalidDate')),
      fonction: Yup.string().required(t('multiStepForm.functionRequired')),
      experience_requise: Yup.string().required(t('multiStepForm.experienceRequired')),
      description_poste: Yup.string().required(t('multiStepForm.descriptionRequired')),
      responsabilites: Yup.string().required(t('multiStepForm.responsibilitiesRequired')),
      exigences: Yup.string().required(t('multiStepForm.requirementsRequired')),
      type_contrat: Yup.string()
        .required(t('multiStepForm.contractTypeRequired')),
      remuneration_min: Yup.number()
        .typeError(t('multiStepForm.invalidAmount'))
        .required(t('multiStepForm.minSalaryRequired'))
        .min(0, t('multiStepForm.mustBePositive')),
      remuneration_max: Yup.number()
        .typeError(t('multiStepForm.invalidAmount'))
        .required(t('multiStepForm.maxSalaryRequired'))
        .min(Yup.ref('remuneration_min'), t('multiStepForm.invalidAmount')),
    }),
    // Step 3: CANDIDATURE
    Yup.object({
      email_candidature: Yup.string().email(t('multiStepForm.invalidEmail')).nullable(),
      url_candidature: Yup.string().url(t('multiStepForm.invalidUrl')).nullable(),
      instructions_candidature: Yup.string().when('email_candidature', {
        is: (email) => email && email.length > 0,
        then: (schema) => schema.required(t('multiStepForm.instructionsRequired')),
        otherwise: (schema) => schema.nullable(),
      }),
      skills: Yup.array().min(1, t('multiStepForm.atLeastOneSkill')),
    }),
    // Step 4: PUBLIER
    Yup.object({}),
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get('/skills');
        setSkillsList(response.data)
      } catch (error) {
        toast.error(t('multiStepForm.skillsError'), {
          description: `${error}` || "Une erreur inattendue est survenue",
          duration: 3000
        })
      }
    }
    fetchSkills();

    const fetchCategories = async () => {
      try {
        const response = await api.get('/offres-categories');
        const categories = Array.isArray(response.data) ? response.data : response.data?.data || [];
        setCategoriesList(categories);
      } catch (error) {
        toast.error(t('multiStepForm.categoriesError'), {
          description: `${error.message}` || "Une erreur inattendue est survenue",
          duration: 3000
        });
      }
    };
    fetchCategories();

    const fetchExperience = async () => {
      try {
        const response = await api.get('/offres/niveaux');
        const experienceObject = response.data; // { junior: "<1an", ... }

        // Vérifier si la réponse est bien un objet et non un tableau
        if (typeof experienceObject === 'object' && experienceObject !== null && !Array.isArray(experienceObject)) {
          // Transformer l'objet en tableau de { id, nom }
          const formattedExperiences = Object.entries(experienceObject).map(([key, value]) => ({
            id: key, // "junior"
            nom: value.replace(/&lt;/g, '<').replace(/&gt;/g, '>') // "<1an"
          }));
          setExperiences(formattedExperiences);
        } else {
          // Fallback si l'API renvoie un autre format
          setExperiences(Array.isArray(experienceObject) ? experienceObject : []);
        }
      } catch (error) {
        toast.error(t('multiStepForm.unexpectedError'), {
          description: `${error.message}` || "Une erreur inattendue est survenue",
          duration: 3000
        });
      }
    };
    fetchExperience();

    const fetchTypeContract = async () => {
      try {
        const response = await api.get('/types-contrat'); // Réponse: { types_contrat: ["CDI", ...] }
        const contractType = response.data?.types_contrat || []; // On extrait le tableau
        setContractType(contractType);
      } catch (error) {
        toast.error(t('multiStepForm.unexpectedError'), {
          description: `${error.message}` || "Une erreur inattendue est survenue",
          duration: 3000
        });
      }
    };
    fetchTypeContract();
  }, [])

  const steps = [
    { number: 1, label: t('multiStepForm.employer'), color: 'bg-orange-500' },
    { number: 2, label: t('multiStepForm.offer'), color: 'bg-green-500' },
    { number: 3, label: t('multiStepForm.application'), color: 'bg-blue-500' },
    { number: 4, label: t('multiStepForm.publish1'), color: 'bg-gray-500' }
  ];

  // Fonction unique pour publier l'offre
  const publishOffer = async (values, actions) => {
    actions.setSubmitting(true);
    setShowPreview(false); // Ferme la prévisualisation si elle est ouverte
    try {
      const payload = {
        ...values,
        documents_requis: values.documents_requis,
        skills: values.skills,
        statut: values.statut,
        date_publication: new Date().toISOString().split('T')[0],
      };
      await api.post('/offres', payload);
      toast.success(t('multiStepForm.offerPublished'));
      actions.resetForm();
      navigate('/job-post');
    } catch (error) {
      toast.error(t('multiStepForm.publicationError'), {
        description: error.response?.data?.message || "Une erreur inattendue est survenue.",
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      nom_entreprise: professionnel?.nom_entreprise || '',
      email_pro: professionnel?.email_pro || '',
      telephone_pro: professionnel?.telephone_pro || '',
      site_web: professionnel?.site_web || '',
      logo: professionnel?.logo || '',
      pays: professionnel?.pays || '',
      ville: professionnel?.ville || '',
      adresse: professionnel?.adresse || '',
      num_contribuable: professionnel?.num_contribuable || '',
      description_entreprise: professionnel?.description_entreprise || '',
      categorie_id: '',
      titre_poste: '',
      date_limite_soumission: '',
      fonction: '',
      experience_requise: '',
      lieu_travail: '',
      description_poste: '',
      exigences: '',
      responsabilites: '',
      type_contrat: '',
      remuneration_min: '',
      remuneration_max: '',
      email_candidature: '',
      url_candidature: '',
      instructions_candidature: '',
      documents_requis: ['CV', 'Lettre de motivation'],
      skills: [],
      statut: 'active',
    },
    validationSchema: validationSchemas[currentStep - 1],
    onSubmit: publishOffer,
    enableReinitialize: true,
  });

  const addDocument = () => {
    const trimmedDoc = newDoc.trim();
    if (trimmedDoc && !formik.values.documents_requis.includes(trimmedDoc)) {
      formik.setFieldValue('documents_requis', [...formik.values.documents_requis, trimmedDoc]);
      setNewDoc("");
    }
  };

  const removeDocument = (docToRemove) => {
    formik.setFieldValue('documents_requis', formik.values.documents_requis.filter(doc => doc !== docToRemove));
  };

  const scrollToTop = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNext = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
        scrollToTop();
      }
    } else {
      formik.setTouched(
        Object.keys(formik.values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
      toast.error(t('multiStepForm.correctErrors'));
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollToTop();
      if (showPreview) {
        setShowPreview(false);
      }
    }
  };

  const handleCancel = () => {
    setShowPreview(false);
    navigate('/dashboard' );
  };

  const addSkill = (id) => {
    if (!formik.values.skills.includes(id)) {
      formik.setFieldValue('skills', [...formik.values.skills, id]);
    }
  };

  const removeSkill = (id) => {
    formik.setFieldValue('skills', formik.values.skills.filter(s => s !== id));
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto px-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div
            className="flex flex-col text-orange-600 items-center cursor-pointer"
            onClick={async () => {
              if (step.number === currentStep) return;
              // Validation avant de changer d'étape
              const valid = await formik.validateForm();
              formik.setTouched(
                Object.keys(formik.values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
              );
              if (Object.keys(valid).length === 0) {
                setCurrentStep(step.number);
              }
            }}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${currentStep === step.number ? step.color : 'bg-gray-300'
                }`}
            >
              {step.number}
            </div>
            <span className={`text-xs mt-1 font-medium ${currentStep === step.number ? 'text-orange-600' : 'text-gray-500'
              }`}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-px bg-gray-300 mx-4"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderEmployeurStep = () => (
    <form onSubmit={formik.handleSubmit} className="max-w-8xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <p className="bg-emerald-200  font-medium">{t('multiStepForm.completeCompanyInfo')}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField name="nom_entreprise" label={t('multiStepForm.companyName') + " *"} formik={formik} />
        <InputField name="email_pro" label={t('multiStepForm.companyEmail') + " *"} formik={formik} type="email" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField name="telephone_pro" label={t('multiStepForm.companyPhone') + " *"} formik={formik} />
        <InputField name="site_web" label={t('multiStepForm.companyWebsite')} formik={formik} type="url" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.yourLogo')}</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="bg-gray-200 w-fit mx-auto rounded flex items-center justify-center mb-4">
            <img src={formik.values.logo} alt="logo"  />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField name="pays" label={t('multiStepForm.country') + " *"} formik={formik} />
        <InputField name="ville" label={t('multiStepForm.city') + " *"} formik={formik} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField name="num_contribuable" label={t('inscriptionEntreprise.taxId') + " *"} formik={formik} />
        <InputField name="adresse" label={t('multiStepForm.localAddress') + " *"} formik={formik} />
      </div>

      <TextareaField name="description_entreprise" label={t('multiStepForm.companyDescription')} formik={formik} placeholder={t('multiStepForm.describeCompany')} />

      <div className="flex justify-between pt-6">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={handleCancel}
        >
          {t('multiStepForm.cancel')}
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? <ClipLoader size={20} color="#fff" /> : t('multiStepForm.next')}
        </button>
      </div>
    </form>
  );

  const renderOffreStep = () => (
    <form onSubmit={formik.handleSubmit} className="max-w-8xl mx-auto space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.offerTitle')}</label>
          <input
            name="titre_poste"
            placeholder={t('multiStepForm.jobTitle')}
            {...formik.getFieldProps('titre_poste')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${formik.touched.titre_poste && formik.errors.titre_poste ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
          />
          {formik.touched.titre_poste && formik.errors.titre_poste ? <div className="text-red-500 text-xs">{formik.errors.titre_poste}</div> : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.submissionDeadline')}</label>
          <input
            name="date_limite_soumission"
            type="date"
            {...formik.getFieldProps('date_limite_soumission')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${formik.touched.date_limite_soumission && formik.errors.date_limite_soumission ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
          />
          {formik.touched.date_limite_soumission && formik.errors.date_limite_soumission ? <div className="text-red-500 text-xs">{formik.errors.date_limite_soumission}</div> : null}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.category')}</label>
        <select name="categorie_id" {...formik.getFieldProps('categorie_id')} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${formik.touched.categorie_id && formik.errors.categorie_id ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}>
          <option value="">{t('multiStepForm.selectCategory')}</option>
          {categoriesList.map((category) => (
            <option key={category.id} value={category.id}>
              {category.nom}
            </option>
          ))}
        </select>
        {formik.touched.categorie_id && formik.errors.categorie_id ? <div className="text-red-500 text-xs">{formik.errors.categorie_id}</div> : null}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.jobFunction')}</label>
          <input
            name="fonction"
            {...formik.getFieldProps('fonction')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${formik.touched.fonction && formik.errors.fonction ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
          />
          {formik.touched.fonction && formik.errors.fonction ? <div className="text-red-500 text-xs">{formik.errors.fonction}</div> : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.experience')}</label>
          <select name="experience" {...formik.getFieldProps('experience_requise')} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${formik.touched.experience_requise && formik.errors.experience_requise ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}>
            <option value="">{t('multiStepForm.select')}</option>
            {experiences.map((experience) => (
              <option key={experience.id} value={experience.nom}>
                {experience.nom}
              </option>
            ))}
          </select>
          {formik.touched.experience_requise && formik.errors.experience_requise ? <div className="text-red-500 text-xs">{formik.errors.experience_requise}</div> : null}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.offerDescription')}</label>
        <textarea
          name="description_poste"
          rows={4}
          placeholder={t('multiStepForm.describeOffer')}
          {...formik.getFieldProps('description_poste')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${formik.touched.description_poste && formik.errors.description_poste ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
        />
        {formik.touched.description_poste && formik.errors.description_poste ? <div className="text-red-500 text-xs">{formik.errors.description_poste}</div> : null}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.responsibilities')}</label>
        <textarea
          name="responsabilites"
          rows={3}
          placeholder={t('multiStepForm.listResponsibilities')}
          {...formik.getFieldProps('responsabilites')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${formik.touched.responsabilites && formik.errors.responsabilites ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
        />
        {formik.touched.responsabilites && formik.errors.responsabilites ? <div className="text-red-500 text-xs">{formik.errors.responsabilites}</div> : null}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.jobRequirements')}</label>
        <textarea
          name="exigences"
          rows={3}
          placeholder={t('multiStepForm.listRequirements')}
          {...formik.getFieldProps('exigences')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${formik.touched.exigences && formik.errors.exigences ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
        />
        {formik.touched.exigences && formik.errors.exigences ? <div className="text-red-500 text-xs">{formik.errors.exigences}</div> : null}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.contractType')}</label>
        <select name="type_contrat" {...formik.getFieldProps('type_contrat')} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${formik.touched.type_contrat && formik.errors.type_contrat ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}>
          <option value="">{t('multiStepForm.select')}</option>
          {contractType.map((contract) => (
            <option key={contract} value={contract}>
              {contract}
            </option>
          ))}
        </select>
        {formik.touched.type_contrat && formik.errors.type_contrat ? <div className="text-red-500 text-xs">{formik.errors.type_contrat}</div> : null}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.maxSalary')}</label>
        <input
          name="remuneration_max"
          type="number"
          placeholder={t('multiStepForm.amountInFrench')}
          {...formik.getFieldProps('remuneration_max')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${formik.touched.remuneration_max && formik.errors.remuneration_max ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
        />
        {formik.touched.remuneration_max && formik.errors.remuneration_max ? <div className="text-red-500 text-xs">{formik.errors.remuneration_max}</div> : null}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.minSalary')}</label>
        <input
          name="remuneration_min"
          type="number"
          placeholder={t('multiStepForm.amountInFrench')}
          {...formik.getFieldProps('remuneration_min')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${formik.touched.remuneration_min && formik.errors.remuneration_min ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
        />
        {formik.touched.remuneration_min && formik.errors.remuneration_min ? <div className="text-red-500 text-xs">{formik.errors.remuneration_min}</div> : null}
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={handlePrevious}
          className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {t('multiStepForm.back')}
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? <ClipLoader size={20} color="#fff" /> : t('multiStepForm.next')}
        </button>
      </div>
    </form>
  );

  const renderCandidatureStep = () => (
    <form onSubmit={formik.handleSubmit} className="max-w-8xl mx-auto space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.applicationEmail')}</label>
          <input
            name="email_candidature"
            type="email"
            {...formik.getFieldProps('email_candidature')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${formik.touched.email_candidature && formik.errors.email_candidature ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
          />
          {formik.touched.email_candidature && formik.errors.email_candidature ? <div className="text-red-500 text-xs">{formik.errors.email_candidature}</div> : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.applicationUrl')}</label>
          <input
            name="url_candidature"
            type="url"
            {...formik.getFieldProps('url_candidature')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${formik.touched.url_candidature && formik.errors.url_candidature ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
          />
          {formik.touched.url_candidature && formik.errors.url_candidature ? <div className="text-red-500 text-xs">{formik.errors.url_candidature}</div> : null}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.applicationInstructions')}</label>
        <textarea
          name="instructions_candidature"
          rows={4}
          {...formik.getFieldProps('instructions_candidature')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${formik.touched.instructions_candidature && formik.errors.instructions_candidature ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
        />
        {formik.touched.instructions_candidature && formik.errors.instructions_candidature ? <div className="text-red-500 text-xs">{formik.errors.instructions_candidature}</div> : null}
      </div>
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          {t('multiStepForm.skills')}
        </label>

        {/* Badges des compétences sélectionnées */}
        <div className="flex flex-wrap gap-2">
          {formik.values.skills.map((id) => {
            const skill = skillsList.find((s) => s.id === id)
            return (
              <Badge
                key={id}
                onClick={() => removeSkill(id)}
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white"
              >
                {skill ? skill.nom : id} ✕
              </Badge>
            )
          })}
        </div>

        {/* Liste des compétences avec recherche */}
        <Command className="rounded-lg border shadow-md max-h-64 overflow-y-auto">
          <CommandInput placeholder={t('multiStepForm.searchSkill')} />
          <CommandList>
            <CommandEmpty>{t('multiStepForm.noResults')}</CommandEmpty>
            <CommandGroup heading={t('multiStepForm.suggestions')}>
              {skillsList.map((skill) => (
                <CommandItem
                  key={skill.id}
                  onSelect={() => addSkill(skill.id)}
                >
                  {skill.nom}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        {formik.touched.skills && formik.errors.skills ? <div className="text-red-500 text-xs">{formik.errors.skills}</div> : null}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('multiStepForm.applicationDocuments')}
        </label>

        {/*Bouton qui ouvre la modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center"
            >
              <Upload className="w-4 h-4 mr-2" />
              {t('multiStepForm.add')}
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('multiStepForm.addRequiredDocument')}</DialogTitle>
            </DialogHeader>

            <Input
              type="text"
              placeholder={t('multiStepForm.documentName')}
              value={newDoc}
              onChange={(e) => setNewDoc(e.target.value)}
            />

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setNewDoc("")}
                type="button"
              >
                {t('multiStepForm.cancel')}
              </Button>
              <Button
                type="button"
                onClick={addDocument}
                disabled={!newDoc.trim()}
              >
                {t('multiStepForm.add')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Liste des documents */}
        <div className="mt-4 space-y-2">
          {formik.values.documents_requis.length > 0 ? (
            formik.values.documents_requis.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded"
              >
                <span>{doc}</span>
                {doc !== 'CV' && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeDocument(doc)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    {t('multiStepForm.remove')}
                  </Button>
                )}
              </div>
            ))
          ) : null}
        </div>

        <p className="text-sm text-blue-600 mt-2">
          {t('multiStepForm.noteDocuments')}
        </p>
      </div>
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={handlePrevious}
          className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {t('multiStepForm.back')}
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? <ClipLoader size={20} color="#fff" /> : t('multiStepForm.next')}
        </button>
      </div>
    </form>
  );

  const renderPublierStep = () => (
    showPreview 
      ? <OffrePreview values={formik.values} onEdit={() => setShowPreview(false)} onCancel={handleCancel} onSubmit={formik.handleSubmit} skillsList={skillsList} /> 
      : <form onSubmit={formik.handleSubmit} className="max-w-8xl mx-auto text-center space-y-6">
      <div className="mb-8">
        <div className="w-64 h-48 mx-auto bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
          <div className="text-orange-500 text-6xl">✓</div>
        </div>
      </div>
  
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {t('multiStepForm.reviewInfo')}
        </h2>
  
        <p className="text-gray-700">
          {t('multiStepForm.trackOffer')}
        </p>
      </div>
  
      <div className="flex items-center justify-center space-x-2 mt-8">
        <input
          type="checkbox"
          id="terms"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
        />
        <label htmlFor="terms" className="text-sm">
          {t('multiStepForm.confirmTerms')}{' '}
          <span className="text-orange-500 underline cursor-pointer">{t('multiStepForm.termsOfUse')}</span>
          {' '}{t('multiStepForm.ofBantuLink')}
        </label>
      </div>
  
      <div className="flex justify-center space-x-4 pt-6">
        <button
          onClick={handlePrevious}
          className="px-8 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          type="button"
        >
          {t('multiStepForm.back')}
        </button>
        <button
          disabled={!termsAccepted}
          type="button" // Changé de submit à button
          onClick={() => {
            if (termsAccepted) {
              setShowPreview(true);
            }
          }}
          className={`px-8 py-2 rounded-md text-sm font-medium flex items-center ${termsAccepted
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          <Eye className="mr-2 h-4 w-4" /> {t('multiStepForm.preview')}
        </button>
        <button
          disabled={!termsAccepted}
          type="submit"
          className={`px-8 py-2 rounded-md text-sm font-medium ${termsAccepted
            ? 'bg-orange-500 text-white hover:bg-orange-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          {t('multiStepForm.publish')}
        </button>
      </div>

    </form>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderEmployeurStep(formik);
      case 2:
        return renderOffreStep(formik);
      case 3:
        return renderCandidatureStep(formik);
      case 4:
        return renderPublierStep(formik);
      default:
        return renderEmployeurStep(formik);
    }
  };

  return (
    <div ref={formRef} className="min-h-screen mt-5 py-8">
      <div className="container mx-auto px-4">
        {renderStepIndicator()}
        <div className="bg-white p-8 max-w-6xl mx-auto">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;