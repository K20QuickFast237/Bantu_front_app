import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Employeur data
    companyName: 'ATOM TECH',
    companyEmail: 'contact@atomtechpro.com',
    companyPhone: '+33 7 888 816 825',
    companyWebsite: 'www.atomtechpro.com',
    companyLogo: null,
    country: 'Cameroun',
    city: 'Douala',
    address: '237 RUE JOFFRE AKWA',
    
    // Offre data
    jobTitle: '',
    jobLocation: '',
    jobDescription: '',
    requirements: '',
    deadline: '15-07-2023',
    
    // Candidature data
    candidateEmail: 'contact@atomtechpro.com',
    candidateUrl: 'www.atomtechpro.com/works/submit',
    candidateInstructions: `Cliquez sur le bouton « Postuler » pour soumettre votre candidature en ligne.
Ou envoyez-nous tous nos dossier de candidature à l'adresse e-mail laptopmghealthsystem@gmail.com
Ou déposez-la en personne dans nos locaux à Akwa, Douala.`,
    documents: ['CV', 'Lettre de motivation']
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  const steps = [
    { number: 1, label: 'EMPLOYEUR', color: 'bg-orange-500' },
    { number: 2, label: 'OFFRE', color: 'bg-green-500' },
    { number: 3, label: 'CANDIDATURE', color: 'bg-blue-500' },
    { number: 4, label: 'PUBLIER', color: 'bg-gray-500' }
  ];

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

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto px-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div 
            className="flex flex-col text-orange-600 items-center cursor-pointer"
            onClick={() => handleStepClick(step.number)}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                currentStep === step.number ? step.color : 'bg-gray-300'
              }`}
            >
              {step.number}
            </div>
            <span className={`text-xs mt-1 font-medium ${
              currentStep === step.number ? 'text-orange-600' : 'text-gray-500'
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
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email de l'entreprise *</label>
          <input
            type="email"
            value={formData.companyEmail}
            onChange={(e) => handleInputChange('companyEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone de l'entreprise *</label>
          <input
            type="tel"
            value={formData.companyPhone}
            onChange={(e) => handleInputChange('companyPhone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Site web de l'entreprise</label>
          <input
            type="url"
            value={formData.companyWebsite}
            onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
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
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
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
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Type de l'offre</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option>Stage développeur web</option>
            <option>Emploi</option>
            <option>Freelance</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => handleInputChange('deadline', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fonction du poste</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option>Sélectionnez la fonction du poste</option>
            <option>Développeur</option>
            <option>Designer</option>
          </select>
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
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Responsabilités / Missions du poste</label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Listez les responsabilités..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Exigences du poste</label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Listez les exigences..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Les avis sur !</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
          <option>Choisir Statut</option>
          <option>Public</option>
          <option>Privé</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Prix/Salaire / Rémunération Souhaitée</label>
        <input
          type="text"
          placeholder="Chiffrer en français"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
            value={formData.candidateEmail}
            onChange={(e) => handleInputChange('candidateEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL de candidature (site web ou autre)</label>
          <input
            type="url"
            value={formData.candidateUrl}
            onChange={(e) => handleInputChange('candidateUrl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Instructions de candidature (Facultatif)</label>
        <textarea
          rows={4}
          value={formData.candidateInstructions}
          onChange={(e) => handleInputChange('candidateInstructions', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Documents de candidature</label>
        <button 
          type="button"
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Upload className="w-4 h-4 mr-2" />
          Ajouter
        </button>
        
        <div className="mt-4 space-y-2">
          {formData.documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded">
              <span>{doc}</span>
              <button 
                type="button"
                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                Retirer
              </button>
            </div>
          ))}
        </div>

        <input
          type="text"
          placeholder="Entrez le nom du document..."
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-sm text-blue-600 mt-1">
          NB : Tout document spécifique lui sera demandé lors de la candidature en ligne
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
          className={`px-8 py-2 rounded-md text-sm font-medium ${
            termsAccepted 
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