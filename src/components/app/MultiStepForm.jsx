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

// Composant de prévisualisation
const OffrePreview = ({ values, onEdit, onCancel, onSubmit, skillsList }) => {

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Header Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{values.titre_poste}</h1>
          <div className="flex items-center gap-2">
            <button className="text-teal-500 font-medium flex items-center gap-1">
              Partager <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mb-6">
          Date de publication : {new Date().toLocaleDateString('fr-FR')} • Date limite : {new Date(values.date_limite_soumission).toLocaleDateString('fr-FR')}
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
          <div>
            <div className="font-semibold text-gray-900 mb-1">Type de contrat</div>
            <div className="text-gray-700">{values.type_contrat.toUpperCase()}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">Lieu</div>
            <div className="text-gray-700">{values.ville}, {values.pays}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">Salaire</div>
            <div className="text-gray-700">{values.remuneration_min} - {values.remuneration_max}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">Télétravail</div>
            <div className="text-gray-700">{values.teletravail ? 'Autorisé' : 'Non autorisé'}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">Expérience</div>
            <div className="text-gray-700">{values.experience}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">Niveau d'études</div>
            <div className="text-gray-700">{values.niveau_etudes || 'Non spécifié'}</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={onEdit} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
            <Edit className="w-5 h-5" />
            Modifier l'offre
          </button>
          <button onClick={onSubmit} className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center transition-colors">
            Publier
          </button>
          <button onClick={onCancel} className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
            <X className="w-5 h-5" />
            Annuler
          </button>
        </div>
      </div>

      {/* Description Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-orange-500 mb-4">Description de l'offre</h2>
        <p className="text-gray-700 mb-6 leading-relaxed whitespace-pre-line">{values.description_poste}</p>

        <h3 className="text-xl font-bold text-orange-500 mb-4">Missions de l'employé</h3>
        <div className="space-y-2 text-gray-700 mb-6 whitespace-pre-line">{values.responsabilites}</div>

        <h3 className="text-xl font-bold text-orange-500 mb-4">Profil recherché</h3>
        <div className="space-y-2 text-gray-700 whitespace-pre-line">{values.exigences}</div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="bg-white rounded-lg shadow-sm p-6 flex gap-3">
        <button onClick={onEdit} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
          <Edit className="w-5 h-5" />
          Modifier l'offre
        </button>
        <button onClick={onSubmit} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
          Publier l'offre
        </button>
        <button onClick={onCancel} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
          <X className="w-5 h-5" />
          Annuler
        </button>
      </div>
    </div>
  );
};

const validationSchemas = [
  // Step 1: EMPLOYEUR
  Yup.object({
    nom_entreprise: Yup.string().required('Nom requis'),
    email_pro: Yup.string().email('Email invalide').required('Email requis'),
    telephone_pro: Yup.string().required('Téléphone requis'),
    pays: Yup.string().required('Pays requis'),
    ville: Yup.string().required('Ville requise'),
    adresse: Yup.string().required('Adresse requise'),
    description_entreprise: Yup.string().nullable(),
  }),
  // Step 2: OFFRE (tous requis et typés)
  Yup.object({
    categorie_id: Yup.string().required('Catégorie requise'),
    titre_poste: Yup.string().required('Titre requis'),
    date_limite_soumission: Yup.date()
      .typeError('Date invalide')
      .required('Date requise'),
    fonction: Yup.string().required('Fonction requise'),
    experience: Yup.string().required('Expérience requise'),
    description_poste: Yup.string().required("Description requise"),
    responsabilites: Yup.string().required("Responsabilités requises"),
    exigences: Yup.string().required("Exigences requises"),
    type_contrat: Yup.string()
      .oneOf(['cdi', 'cdd', 'stage', 'freelance'], 'Type de contrat invalide')
      .required('Type de contrat requis'),
    remuneration_max: Yup.number()
      .typeError('Montant invalide')
      .required('Rémunération maximale requise')
      .min(0, 'Doit être positif'),
    remuneration_min: Yup.number()
      .typeError('Montant invalide')
      .required('Rémunération minimale requise')
      .min(0, 'Doit être positif'),
  }),
  // Step 3: CANDIDATURE
  Yup.object({
    email_candidature: Yup.string().email('Email invalide').required('Email requis'),
    url_candidature: Yup.string().url('URL invalide').nullable().required('URL requise'),
    instructions_candidature: Yup.string().nullable().required('Instructions requises'),
    skills: Yup.array().min(1, 'Au moins une compétence requise'),
  }),
  // Step 4: PUBLIER
  Yup.object({}),
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [skillsList, setSkillsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [formData, setFormData] = useState();
  const { professionnel } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [newDoc, setNewDoc] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // Nouvel état pour la prévisualisation
  const formRef = useRef(null);
  const navigate = useNavigate();

  // 🔹 Préremplissage avec les infos du profil professionnel
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
        toast.error("erreur récupération competences", {
          description: `${error}` || "Une erreur inattendue est survenue",
          duration: 3000
        })
      }
    }
    fetchSkills();

    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        console.log(response);
        // Assurer que nous avons bien un tableau. L'API peut retourner { data: [...] }
        const categories = Array.isArray(response.data) ? response.data : response.data?.data || [];
        setCategoriesList(categories);
      } catch (error) {
        toast.error("Erreur lors de la récupération des catégories.", {
          description: `${error.message}` || "Une erreur inattendue est survenue",
          duration: 3000
        });
      }
    };
    fetchCategories();
  }, [])

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
    documents_requis: ['CV', 'Lettre de motivation'],
    skills: [],
    statut: 'active',
  };

  // Remplace addSkill et removeSkill :
  const addSkill = (id, formik) => {
    if (!formik.values.skills.includes(id)) {
      formik.setFieldValue('skills', [...formik.values.skills, id]);
    }
  };

  const removeSkill = (id, formik) => {
    formik.setFieldValue('skills', formik.values.skills.filter(s => s !== id));
  };

  const steps = [
    { number: 1, label: 'EMPLOYEUR', color: 'bg-orange-500' },
    { number: 2, label: 'OFFRE', color: 'bg-green-500' },
    { number: 3, label: 'CANDIDATURE', color: 'bg-blue-500' },
    { number: 4, label: 'PUBLIER', color: 'bg-gray-500' }
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


  // const handleInputChange = (field, value) => {
  //   setFormData(prev => ({ ...prev, [field]: value }));
  // };

  const scrollToTop = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // const handleNext = () => {
  //   if (currentStep < 4) {
  //     setCurrentStep(currentStep + 1);
  //     scrollToTop();
  //   }
  // };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollToTop();
    }
  };

  // const handleStepClick = async (stepNumber, formik) => {
  //   if (stepNumber === currentStep) return;
  //   // Validation avant de changer d'étape
  //   const valid = await formik.validateForm();
  //   formik.setTouched(
  //     Object.keys(formik.values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
  //   );
  //   if (Object.keys(valid).length === 0) {
  //     setCurrentStep(stepNumber);
  //     scrollToTop();
  //   }
  // };

  const handleCancel = () => {
    setShowPreview(false);
    navigate('/dashboard' );
  };

  // Fonction unique pour publier l'offre
  const publishOffer = async (values, actions) => {
    setLoading(true);
    setShowPreview(false); // Ferme la prévisualisation si elle est ouverte
    try {
      const payload = {
        ...values,
        documents_requis: documents.length > 0 ? documents : values.documents_requis,
        skills: values.skills,
        statut: values.statut,
        date_publication: new Date().toISOString().split('T')[0],
      };
      await api.post('/offres', payload);
      toast.success("Offre publiée avec succès !");
      actions.resetForm();
      navigate('/job-post');
    } catch (error) {
      toast.error("Erreur de publication :", {
        description: error.response?.data?.message || "Une erreur inattendue est survenue.",
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
  <p className="bg-emerald-200 text-center w-80% font-medium">Veuillez saisir et/ou compléter les informations de votre entreprise</p>

  // Exemple d'intégration Formik pour le step 1
  const renderEmployeurStep = (formik) => (
    <Form className="max-w-8xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <p className="bg-emerald-200  font-medium">Veuillez saisir et/ou compléter les informations de votre entreprise</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise *</label>
          <Field
            name="nom_entreprise"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <ErrorMessage name="nom_entreprise" component="div" className="text-red-500 text-xs" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email de l'entreprise *</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone de l'entreprise *</label>
          <Field
            name="telephone_pro"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <ErrorMessage name="telephone_pro" component="div" className="text-red-500 text-xs" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Site web de l'entreprise</label>
          <Field
            name="site_web"
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <ErrorMessage name="site_web" component="div" className="text-red-500 text-xs" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Votre logo</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="bg-gray-200 w-24 h-16 mx-auto rounded flex items-center justify-center mb-4">
            <span className="text-gray-500 text-sm">Rechercher</span>
          </div>
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Changer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pays *</label>
          <Field
            name="pays"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <ErrorMessage name="pays" component="div" className="text-red-500 text-xs" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
          <Field
            name="ville"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <ErrorMessage name="ville" component="div" className="text-red-500 text-xs" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
          <Field
            name="code_postal"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <ErrorMessage name="code_postal" component="div" className="text-red-500 text-xs" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adresse locale *</label>
          <Field
            name="adresse"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <ErrorMessage name="adresse" component="div" className="text-red-500 text-xs" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description de l'entreprise</label>
        <Field
          as="textarea"
          name="description_entreprise"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Décrivez votre entreprise..."
        />
        <ErrorMessage name="description_entreprise" component="div" className="text-red-500 text-xs" />
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={handleCancel}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600"
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : "Suivant"}
        </button>
      </div>
    </Form>
  );

  const renderOffreStep = (formik) => (
    <Form className="max-w-8xl mx-auto space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre de l'Offre</label>
          <Field
            name="titre_poste"
            placeholder="Titre du poste"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <ErrorMessage name="titre_poste" component="div" className="text-red-500 text-xs" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date limite de soumission</label>
          <Field
            name="date_limite_soumission"
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <ErrorMessage name="date_limite_soumission" component="div" className="text-red-500 text-xs" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
        <Field as="select" name="categorie_id" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
          <option value="">Sélectionner une catégorie</option>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Fonction du poste</label>
          <Field
            name="fonction"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <ErrorMessage name="fonction" component="div" className="text-red-500 text-xs" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
          <Field as="select" name="experience" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option value="">Sélectionner</option>
            <option value="debutant">Débutant</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
          </Field>
          <ErrorMessage name="experience" component="div" className="text-red-500 text-xs" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description de l'offre</label>
        <Field
          as="textarea"
          name="description_poste"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Décrivez l'offre d'emploi..."
        />
        <ErrorMessage name="description_poste" component="div" className="text-red-500 text-xs" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Responsabilités / Missions du poste</label>
        <Field
          as="textarea"
          name="responsabilites"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Listez les responsabilités..."
        />
        <ErrorMessage name="responsabilites" component="div" className="text-red-500 text-xs" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Exigences du poste</label>
        <Field
          as="textarea"
          name="exigences"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Listez les exigences..."
        />
        <ErrorMessage name="exigences" component="div" className="text-red-500 text-xs" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Type de contrat</label>
        <Field as="select" name="type_contrat" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
          <option value="cdi">CDI</option>
          <option value="cdd">CDD</option>
          <option value="stage">Stage</option>
          <option value="freelance">Freelance</option>
        </Field>
        <ErrorMessage name="type_contrat" component="div" className="text-red-500 text-xs" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rémunération maximale Souhaitée</label>
        <Field
          name="remuneration_max"
          type="number"
          placeholder="Chiffrer en français"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <ErrorMessage name="remuneration_max" component="div" className="text-red-500 text-xs" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rémunération minimale Souhaitée </label>
        <Field
          name="remuneration_min"
          type="number"
          placeholder="Chiffrer en français"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <ErrorMessage name="remuneration_min" component="div" className="text-red-500 text-xs" />
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={handlePrevious}
          className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Retour
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600"
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : "Suivant"}
        </button>
      </div>
    </Form>
  );

  const renderCandidatureStep = (formik) => (
    <Form className="max-w-8xl mx-auto space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adresse mail de candidature *</label>
          <Field
            name="email_candidature"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <ErrorMessage name="email_candidature" component="div" className="text-red-500 text-xs" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL de candidature (site web ou autre)</label>
          <Field
            name="url_candidature"
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <ErrorMessage name="url_candidature" component="div" className="text-red-500 text-xs" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Instructions de candidature (Facultatif)</label>
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
          Compétences
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
          <CommandInput placeholder="Rechercher une compétence..." />
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup heading="Suggestions">
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
          Documents de candidature
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
              Ajouter
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un document requis</DialogTitle>
            </DialogHeader>

            <Input
              type="text"
              placeholder="Nom du document..."
              value={newDoc}
              onChange={(e) => setNewDoc(e.target.value)}
            />

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setNewDoc("")}
                type="button"
              >
                Annuler
              </Button>
              <Button
                type="button"
                onClick={addDocument}
                disabled={!newDoc.trim()}
              >
                Ajouter
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
                  Retirer
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Aucun document ajouté</p>
          )}
        </div>

        <p className="text-sm text-blue-600 mt-2">
          NB : Tout document spécifique sera demandé lors de la candidature en
          ligne
        </p>
      </div>
      <div className="flex justify-between pt-6">
        <button
          onClick={handlePrevious}
          className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Retour
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : "Suivant"}
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
          Veuillez prendre 1min pour relire les informations que vous avez entrées par rapport à l'offre. Si tout est correct, veuillez publier l'offre.
        </h2>
  
        <p className="text-gray-700">
          Vous pourrez suivre l'offre et ses candidatures dans votre dashboard
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
          Je confirme que cette offre respecte les{' '}
          <span className="text-orange-500 underline cursor-pointer">conditions d'utilisation</span>
          {' '}de BantuLink
        </label>
      </div>
  
      <div className="flex justify-center space-x-4 pt-6">
        <button
          onClick={handlePrevious}
          className="px-8 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          type="button"
        >
          Retour
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
          <Eye className="mr-2 h-4 w-4" /> Prévisualiser
        </button>
        <button
          disabled={!termsAccepted}
          type="submit"
          className={`px-8 py-2 rounded-md text-sm font-medium ${termsAccepted
            ? 'bg-orange-500 text-white hover:bg-orange-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          Publier
        </button>
      </div>

    </Form>
  );

  // Fonction de validation globale
  const validateAllSteps = async (values) => {
    try {
      // Fusionne tous les schémas
      const fullSchema = validationSchemas
        .reduce((acc, schema) => acc.concat(schema), Yup.object({}));
      await fullSchema.validate(values, { abortEarly: false });
      return {};
    } catch (err) {
      // Transforme les erreurs Yup en objet { champ: message }
      const errors = {};
      if (err.inner) {
        err.inner.forEach(e => {
          if (!errors[e.path]) errors[e.path] = e.message;
        });
      }
      return errors;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderEmployeurStep();
      case 2:
        return renderOffreStep();
      case 3:
        return renderCandidatureStep();
      case 4:
        return renderPublierStep();
      default:
        return renderEmployeurStep();
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
          // Validation globale avant publication
          const errors = await validateAllSteps(values);
          if (Object.keys(errors).length > 0) {
            actions.setErrors(errors);
            // Affiche tous les champs comme touchés pour voir les erreurs
            actions.setTouched(
              Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
            );
            toast.error("Veuillez corriger les erreurs dans le formulaire.");
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