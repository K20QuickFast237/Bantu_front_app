import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import { toast } from 'sonner';
import { ClipLoader } from "react-spinners";
import { Upload, Trash2, Eye, Share2, Edit, X } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
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
import { useTranslation } from 'react-i18next';

// Composant de prévisualisation
const OffrePreview = ({ values, onEdit, onCancel, onSubmit, skillsList }) => {
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

const MultiStepForm = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [skillsList, setSkillsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [formData, setFormData] = useState();
  const { professionnel } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [newDoc, setNewDoc] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();

  // Déplacer les schémas de validation à l'intérieur du composant
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
      date_limite_soumission: Yup.date()
        .typeError(t('multiStepForm.invalidDate'))
        .required(t('multiStepForm.dateRequired')),
      fonction: Yup.string().required(t('multiStepForm.functionRequired')),
      experience: Yup.string().required(t('multiStepForm.experienceRequired')),
      description_poste: Yup.string().required(t('multiStepForm.descriptionRequired')),
      responsabilites: Yup.string().required(t('multiStepForm.responsibilitiesRequired')),
      exigences: Yup.string().required(t('multiStepForm.requirementsRequired')),
      type_contrat: Yup.string()
        .oneOf(['cdi', 'cdd', 'stage', 'freelance'], t('multiStepForm.invalidContractType'))
        .required(t('multiStepForm.contractTypeRequired')),
      remuneration_max: Yup.number()
        .typeError(t('multiStepForm.invalidAmount'))
        .required(t('multiStepForm.maxSalaryRequired'))
        .min(0, t('multiStepForm.mustBePositive')),
      remuneration_min: Yup.number()
        .typeError(t('multiStepForm.invalidAmount'))
        .required(t('multiStepForm.minSalaryRequired'))
        .min(0, t('multiStepForm.mustBePositive')),
    }),
    // Step 3: CANDIDATURE
    Yup.object({
      email_candidature: Yup.string().email(t('multiStepForm.invalidEmail')).required(t('multiStepForm.emailRequired')),
      url_candidature: Yup.string().url(t('multiStepForm.invalidUrl')).nullable().required(t('multiStepForm.urlRequired')),
      instructions_candidature: Yup.string().nullable().required(t('multiStepForm.instructionsRequired')),
      skills: Yup.array().min(1, t('multiStepForm.atLeastOneSkill')),
    }),
    // Step 4: PUBLIER
    Yup.object({}),
  ];

  useEffect(() => {
    if (professionnel) {
      setFormData((prev) => ({
        ...prev,
        nom_entreprise: professionnel.nom_entreprise || '',
        email_pro: professionnel.email_pro || '',
        telephone_pro: professionnel.telephone_pro || '',
        site_web: professionnel.site_web || '',
        pays: professionnel.pays || '',
        ville: professionnel.ville || '',
        adresse: professionnel.adresse || '',
        description_entreprise: professionnel.description_entreprise || '',
      }));
    }
  }, [professionnel]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get('/skills');
        setSkillsList(response.data)
      } catch (error) {
        toast.error(t('multiStepForm.skillsError'), {
          description: `${error}` || t('multiStepForm.unexpectedError'),
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
          description: `${error.message}` || t('multiStepForm.unexpectedError'),
          duration: 3000
        });
      }
    };
    fetchCategories();
  }, [t])

  const initialValues = {
    nom_entreprise: professionnel?.nom_entreprise || '',
    email_pro: professionnel?.email_pro || '',
    telephone_pro: professionnel?.telephone_pro || '',
    site_web: professionnel?.site_web || '',
    logo: null,
    pays: professionnel?.pays || '',
    ville: professionnel?.ville || '',
    adresse: professionnel?.adresse || '',
    description_entreprise: professionnel?.description_entreprise || '',
    categorie_id: '',
    titre_poste: '',
    date_limite_soumission: '',
    fonction: '',
    experience: '',
    lieu_travail: '',
    description_poste: '',
    exigences: '',
    responsabilites: '',
    type_contrat: 'cdi',
    remuneration_min: '',
    remuneration_max: '',
    email_candidature: '',
    url_candidature: '',
    instructions_candidature: '',
    documents_requis: [t('multiStepForm.cv'), t('multiStepForm.motivationLetter')],
    skills: [],
    statut: 'active',
  };

  const addSkill = (id, formik) => {
    if (!formik.values.skills.includes(id)) {
      formik.setFieldValue('skills', [...formik.values.skills, id]);
    }
  };

  const removeSkill = (id, formik) => {
    formik.setFieldValue('skills', formik.values.skills.filter(s => s !== id));
  };

  const steps = [
    { number: 1, label: t('multiStepForm.employer'), color: 'bg-orange-500' },
    { number: 2, label: t('multiStepForm.offer'), color: 'bg-green-500' },
    { number: 3, label: t('multiStepForm.application'), color: 'bg-blue-500' },
    { number: 4, label: t('multiStepForm.publish'), color: 'bg-gray-500' }
  ];

  const addDocument = () => {
    if (newDoc && newDoc.trim() !== "") {
      setDocuments([...documents, newDoc]);
      setNewDoc("");
    }
  };

  const removeDocument = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const scrollToTop = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollToTop();
    }
  };

  const handleCancel = () => {
    setShowPreview(false);
    navigate('/dashboard' );
  };

  const publishOffer = async (values, actions) => {
    setLoading(true);
    setShowPreview(false);
    try {
      const payload = {
        ...values,
        documents_requis: documents.length > 0 ? documents : values.documents_requis,
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
        description: error.response?.data?.message || t('multiStepForm.unexpectedError'),
      });
    } finally {
      setLoading(false);
      actions.setSubmitting(false);
    }
  };

  const renderStepIndicator = (formik) => (
    <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto px-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div
            className="flex flex-col text-orange-600 items-center cursor-pointer"
            onClick={async () => {
              if (step.number === currentStep) return;
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

  const renderEmployeurStep = (formik) => (
    <Form className="max-w-8xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <p className="bg-emerald-200  font-medium">{t('multiStepForm.completeCompanyInfo')}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.companyName')} *</label>
          <Field
            name="nom_entreprise"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <ErrorMessage name="nom_entreprise" component="div" className="text-red-500 text-xs" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.companyEmail')} *</label>
          <Field
            name="email_pro"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <ErrorMessage name="email_pro" component="div" className="text-red-500 text-xs" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.companyPhone')} *</label>
          <Field
            name="telephone_pro"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <ErrorMessage name="telephone_pro" component="div" className="text-red-500 text-xs" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.companyWebsite')}</label>
          <Field
            name="site_web"
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <ErrorMessage name="site_web" component="div" className="text-red-500 text-xs" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.yourLogo')}</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="bg-gray-200 w-24 h-16 mx-auto rounded flex items-center justify-center mb-4">
            <span className="text-gray-500 text-sm">{t('multiStepForm.search')}</span>
          </div>
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {t('multiStepForm.change')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.country')} *</label>
          <Field
            name="pays"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <ErrorMessage name="pays" component="div" className="text-red-500 text-xs" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.city')} *</label>
          <Field
            name="ville"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <ErrorMessage name="ville" component="div" className="text-red-500 text-xs" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.postalCode')}</label>
          <Field
            name="code_postal"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <ErrorMessage name="code_postal" component="div" className="text-red-500 text-xs" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.localAddress')} *</label>
          <Field
            name="adresse"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <ErrorMessage name="adresse" component="div" className="text-red-500 text-xs" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.companyDescription')}</label>
        <Field
          as="textarea"
          name="description_entreprise"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder={t('multiStepForm.describeCompany')}
        />
        <ErrorMessage name="description_entreprise" component="div" className="text-red-500 text-xs" />
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={handleCancel}
        >
          {t('multiStepForm.cancel')}
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600"
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : t('multiStepForm.next')}
        </button>
      </div>
    </Form>
  );

  const renderOffreStep = (formik) => (
    <Form className="max-w-8xl mx-auto space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.offerTitle')}</label>
          <Field
            name="titre_poste"
            placeholder={t('multiStepForm.jobTitle')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <ErrorMessage name="titre_poste" component="div" className="text-red-500 text-xs" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.submissionDeadline')}</label>
          <Field
            name="date_limite_soumission"
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <ErrorMessage name="date_limite_soumission" component="div" className="text-red-500 text-xs" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.category')}</label>
        <Field as="select" name="categorie_id" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
          <option value="">{t('multiStepForm.selectCategory')}</option>
          {categoriesList.map((category) => (
            <option key={category.id} value={category.id}>
              {category.nom}
            </option>
          ))}
        </Field>
        <ErrorMessage name="categorie_id" component="div" className="text-red-500 text-xs" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.jobFunction')}</label>
          <Field
            name="fonction"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <ErrorMessage name="fonction" component="div" className="text-red-500 text-xs" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.experience')}</label>
          <Field as="select" name="experience" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option value="">{t('multiStepForm.select')}</option>
            <option value="debutant">{t('multiStepForm.beginner')}</option>
            <option value="junior">{t('multiStepForm.junior')}</option>
            <option value="senior">{t('multiStepForm.senior')}</option>
          </Field>
          <ErrorMessage name="experience" component="div" className="text-red-500 text-xs" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.offerDescription')}</label>
        <Field
          as="textarea"
          name="description_poste"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder={t('multiStepForm.describeOffer')}
        />
        <ErrorMessage name="description_poste" component="div" className="text-red-500 text-xs" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.responsibilities')}</label>
        <Field
          as="textarea"
          name="responsabilites"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder={t('multiStepForm.listResponsibilities')}
        />
        <ErrorMessage name="responsabilites" component="div" className="text-red-500 text-xs" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.jobRequirements')}</label>
        <Field
          as="textarea"
          name="exigences"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder={t('multiStepForm.listRequirements')}
        />
        <ErrorMessage name="exigences" component="div" className="text-red-500 text-xs" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.contractType')}</label>
        <Field as="select" name="type_contrat" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
          <option value="cdi">CDI</option>
          <option value="cdd">CDD</option>
          <option value="stage">{t('multiStepForm.internship')}</option>
          <option value="freelance">{t('multiStepForm.freelance')}</option>
        </Field>
        <ErrorMessage name="type_contrat" component="div" className="text-red-500 text-xs" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.maxSalary')}</label>
        <Field
          name="remuneration_max"
          type="number"
          placeholder={t('multiStepForm.amountInFrench')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <ErrorMessage name="remuneration_max" component="div" className="text-red-500 text-xs" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.minSalary')}</label>
        <Field
          name="remuneration_min"
          type="number"
          placeholder={t('multiStepForm.amountInFrench')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <ErrorMessage name="remuneration_min" component="div" className="text-red-500 text-xs" />
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={handlePrevious}
          className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {t('multiStepForm.back')}
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600"
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : t('multiStepForm.next')}
        </button>
      </div>
    </Form>
  );

  const renderCandidatureStep = (formik) => (
    <Form className="max-w-8xl mx-auto space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.applicationEmail')} *</label>
          <Field
            name="email_candidature"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <ErrorMessage name="email_candidature" component="div" className="text-red-500 text-xs" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.applicationUrl')}</label>
          <Field
            name="url_candidature"
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <ErrorMessage name="url_candidature" component="div" className="text-red-500 text-xs" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('multiStepForm.applicationInstructions')}</label>
        <Field
          as="textarea"
          name="instructions_candidature"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <ErrorMessage name="instructions_candidature" component="div" className="text-red-500 text-xs" />
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
                onClick={() => removeSkill(id, formik)}
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
                  onSelect={() => addSkill(skill.id, formik)}
                >
                  {skill.nom}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <ErrorMessage name="skills" component="div" className="text-red-500 text-xs" />
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
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded"
              >
                <span>{doc}</span>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeDocument(index)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  {t('multiStepForm.remove')}
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">{t('multiStepForm.noDocuments')}</p>
          )}
        </div>

        <p className="text-sm text-blue-600 mt-2">
          {t('multiStepForm.noteDocuments')}
        </p>
      </div>
      <div className="flex justify-between pt-6">
        <button
          onClick={handlePrevious}
          className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {t('multiStepForm.back')}
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : t('multiStepForm.next')}
        </button>
      </div>
    </Form>
  );

  const renderPublierStep = (formik) => (
    showPreview ? <OffrePreview values={formik.values} onEdit={handlePrevious} onCancel={handleCancel} onSubmit={() => publishOffer(formik.values, formik.actions)} skillsList={skillsList} /> : <Form className="max-w-8xl mx-auto text-center space-y-6">
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
          type="button"
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

    </Form>
  );

  const validateAllSteps = async (values) => {
    try {
      const fullSchema = validationSchemas
        .reduce((acc, schema) => acc.concat(schema), Yup.object({}));
      await fullSchema.validate(values, { abortEarly: false });
      return {};
    } catch (err) {
      const errors = {};
      if (err.inner) {
        err.inner.forEach(e => {
          if (!errors[e.path]) errors[e.path] = e.message;
        });
      }
      return errors;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[currentStep - 1]}
      onSubmit={async (values, actions) => {
        if (currentStep < 4) {
          setCurrentStep(currentStep + 1);
          scrollToTop();
          actions.setSubmitting(false);
        } else {
          const errors = await validateAllSteps(values);
          if (Object.keys(errors).length > 0) {
            actions.setErrors(errors);
            actions.setTouched(
              Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
            );
            toast.error(t('multiStepForm.correctErrors'));
            actions.setSubmitting(false);
            return;
          }
          
          publishOffer(values, actions);
        }
      }}
    >
      {(formik) => (
        <div ref={formRef} className="min-h-screen mt-5 py-8">
          <div className="container mx-auto px-4">
            {renderStepIndicator(formik)}
            <div className="bg-white p-8 max-w-6xl mx-auto">
              {currentStep === 1 && renderEmployeurStep(formik)}
              {currentStep === 2 && renderOffreStep(formik)}
              {currentStep === 3 && renderCandidatureStep(formik)}
              {currentStep === 4 && renderPublierStep(formik)}
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default MultiStepForm;