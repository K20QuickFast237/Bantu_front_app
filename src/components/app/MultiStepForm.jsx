import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import { toast } from 'sonner';
import { ClipLoader } from "react-spinners";
import { Upload, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,} from "@/components/ui/command"

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [skillsList, setSkillsList] = useState([]);
  const { professionnel } = useAuth();
  const [formData, setFormData] = useState({
      // EMPLOYEUR
      nom_entreprise: '',
      email_pro: '',
      telephone_pro: '',
      site_web: '',
      logo: null,
      pays: '',
      ville: '',
      adresse: '',
      description_entreprise: '',

  
      // OFFRE
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
      
      // CANDIDATURE
      email_candidature: '',
      url_candidature: '',
      instructions_candidature: '',
      documents_requis: ['CV', 'Lettre de motivation'],
  
      // Divers
      skills: [],
      statut: 'active',
    });
    const [documents, setDocuments] = useState([]);
    const [newDoc, setNewDoc] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

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
        setSkillsList(response.data) // [{id: 1, name: "React"}, {id: 2, name: "Laravel"}...]
      } catch (error) {
        toast.error("rreur récupération competences", {
          description: `${error}` || "Une erreur inattendue est survenue",
          duration: 3000
        })
      }
    }
    fetchSkills()
  }, [])

  // Ajouter une compétence
  const addSkill = (id) => {
    if (!formData.skills.includes(id)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, id] }))
    }
  }

  // Retirer une compétence
  const removeSkill = (id) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== id) }))
  }

  

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


  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  const handleSubmit = async () => {
      try {
        const payload = {
          titre_poste: formData.titre_poste,
          date_limite_soumission: formData.date_limite_soumission,
          fonction: formData.fonction,
          experience: formData.experience,
          ville: formData.ville,
          pays: formData.pays,
          lieu_travail: formData.lieu_travail,
          description_poste: formData.description_poste,
          exigences: formData.exigences,
          responsabilites: formData.responsabilites,
          type_contrat: formData.type_contrat,
          remuneration_max: formData.remuneration_max,
          remuneration_min: formData.remuneration_min,
          email_candidature: formData.email_candidature,
          url_candidature: formData.url_candidature,
          instructions_candidature: formData.instructions_candidature,
          documents_requis: formData.documents_requis,
          skills: formData.skills,
          statut: formData.statut,
          date_publication: new Date().toISOString().split('T')[0],
        };
  
        console.log("Payload envoyé :", payload);
        await api.post('/offres', payload);
        toast.success("Offre publiée avec succès !");
      } catch (error) {
        toast.error("Erreur publication :", 
          {
            description: `${error} `|| "Erreur lors de la publication de l’offre"
          });
      }
    };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto px-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div
            className="flex flex-col text-orange-600 items-center cursor-pointer"
            onClick={() => handleStepClick(step.number)}
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

  const renderEmployeurStep = () => (
    <div className="max-w-8xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <p className="bg-emerald-200  font-medium">Veuillez saisir et/ou compléter les informations de votre entreprise</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise *</label>
          <input
            type="text"
            value={formData.nom_entreprise}
            onChange={(e) => handleInputChange('nom_entreprise', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email de l'entreprise *</label>
          <input
            type="email"
            value={formData.email_pro}
            onChange={(e) => handleInputChange('email_pro', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone de l'entreprise *</label>
          <input
            type="tel"
            value={formData.telephone_pro}
            onChange={(e) => handleInputChange('telephone_pro', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Site web de l'entreprise</label>
          <input
            type="url"
            value={formData.site_web}
            onChange={(e) => handleInputChange('site_web', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Votre logo</label>
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
          <input
            type="text"
            value={formData.pays}
            onChange={(e) => handleInputChange('pays', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
          <input
            type="text"
            value={formData.ville}
            onChange={(e) => handleInputChange('ville', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adresse locale *</label>
          <input
            type="text"
            value={formData.adresse}
            onChange={(e) => handleInputChange('adresse', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description de l'entreprise</label>
        <textarea
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Décrivez votre entreprise..."
          value={formData.description_entreprise}
          onChange={(e) => handleInputChange('description_entreprise', e.target.value)}
        />
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600"
        >
          Suivant
        </button>
      </div>
    </div>
  );

  const renderOffreStep = () => (
    <div className="max-w-8xl mx-auto space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre de l'Offre</label>
          <input
            type="text"
            placeholder="Titre du poste"
            value={formData.titre_poste}
            onChange={(e) => handleInputChange('titre_poste', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date limite de soumission</label>
          <input
            type="date"
            value={formData.date_limite_soumission}
            onChange={(e) => handleInputChange('date_limite_soumission', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fonction du poste</label>
           <input
            type="text"
            value={formData.fonction}
            onChange={(e) => handleInputChange('fonction', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option>Débutant</option>
            <option>Junior</option>
            <option>Senior</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description de l'offre</label>
        <textarea
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Décrivez l'offre d'emploi..."
          value={formData.description_poste}
        onChange={(e) => handleInputChange('description_poste', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Responsabilités / Missions du poste</label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Listez les responsabilités..."
          value={formData.responsabilites}
          onChange={(e) => handleInputChange('responsabilites', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Exigences du poste</label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Listez les exigences..."
          value={formData.exigences}
          onChange={(e) => handleInputChange('exigences', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Type de contrat</label>
        <select 
          value={formData.type_contrat}
        onChange={(e) => handleInputChange('type_contrat', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="cdi">CDI</option>
          <option value="cdd">CDD</option>
          <option value="stage">Stage</option>
          <option value="freelance">Freelance</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rémunération maximale Souhaitée</label>
        <input
          type="text"
          placeholder="Chiffrer en français"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          value={formData.remuneration_max}
        onChange={(e) => handleInputChange('remuneration_max', e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rémunération minimale Souhaitée </label>
        <input
          type="text"
          placeholder="Chiffrer en français"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          value={formData.remuneration_min}
          onChange={(e) => handleInputChange('remuneration_min', e.target.value)}
        />
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={handlePrevious}
          className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Retour
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600"
        >
          Suivant
        </button>
      </div>
    </div>
  );

  const renderCandidatureStep = () => (
    <div className="max-w-8xl mx-auto space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adresse mail de candidature *</label>
          <input
            type="email"
            value={formData.email_candidature}
            onChange={(e) => handleInputChange('email_candidature', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL de candidature (site web ou autre)</label>
          <input
            type="url"
            value={formData.url_candidature}
            onChange={(e) => handleInputChange('url_candidature', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Instructions de candidature (Facultatif)</label>
        <textarea
          rows={4}
          value={formData.instructions_candidature}
          onChange={(e) => handleInputChange('instructions_candidature', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
       <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Compétences
      </label>

      {/* Badges des compétences sélectionnées */}
      <div className="flex flex-wrap gap-2">
        {formData.skills.map((id) => {
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
        <CommandInput placeholder="Rechercher une compétence..." />
        <CommandList>
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          <CommandGroup heading="Suggestions">
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
    </div>

     <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Documents de candidature
      </label>

      {/* ✅ Bouton qui ouvre la modal */}
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
          onClick={handleNext}
          className="px-6 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600"
        >
          Suivant
        </button>
      </div>
    </div>
  );

  const renderPublierStep = () => (
    <div className="max-w-8xl mx-auto text-center space-y-6">
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
        >
          Retour
        </button>
        <button
          disabled={!termsAccepted}
          onClick={handleSubmit}
          className={`px-8 py-2 rounded-md text-sm font-medium ${termsAccepted
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          Publier
        </button>
      </div>
    </div>
  );

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
    <div className="min-h-screen mt-5 py-8">
      <div className="container mx-auto px-4">
        {renderStepIndicator()}
        <div className="bg-white  p-8 max-w-6xl mx-auto">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;