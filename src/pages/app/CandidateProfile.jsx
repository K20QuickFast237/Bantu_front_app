import React, { useState } from 'react';
import {
  Bell,
  CheckCircle,
  Download,
  FileText,
  Search,
  ChevronDown,
  ChevronRight,
  User,
  MessageSquare,
  BarChart3,
  Settings,
  LayoutDashboard,
  Briefcase
} from 'lucide-react';
import Footer from '../../components/Footer'; // Assurez-vous que le chemin du Footer est correct

// Composant Sidebar pour le candidat (ajusté pour coller à l'image)
const CandidateSidebar = ({ activeSection, setActiveSection }) => {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-job-posts', label: 'My Job Posts', icon: Briefcase }, // Ressemble à "My Jobs" ou "Candidatures" pour un candidat
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      {/* Logo BantuLink */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="font-semibold text-gray-900">BantuLink</span>
        </div>
      </div>

      {/* Profil du candidat sur le côté gauche (similaire à l'image) */}
      <div className="p-6 border-b border-gray-200 text-center">
        <div className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full mx-auto mb-3 border-4 border-yellow-500"> {/* Bordure jaune pour le statut "complet" */}
          <div className="flex h-full w-full items-center justify-center rounded-full font-medium bg-yellow-500 text-white text-3xl">CD</div>
          <CheckCircle className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full text-green-500" /> {/* Icône de coche verte */}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Cyprien DONTSA</h3>
        <p className="text-sm text-gray-600">Développeur Fullstack, React / Laravel</p>
        <div className="flex justify-center items-center mt-3 text-sm text-blue-600 font-medium">
          Profil visible aux recruteurs
        </div>
        <button className="mt-4 inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500 transform hover:scale-105 transition-all">
          Voir mon profil
        </button>
      </div>

      {/* Navigation (similaire à l'image, avec 'Dashboard' comme actif pour l'exemple) */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          // Pour cet exemple, je vais simuler 'dashboard' comme actif si vous ne passez pas activeSection
          const isActive = activeSection === item.id || (activeSection === undefined && item.id === 'dashboard');
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
              {item.id === 'applications' && (
                <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium ml-auto bg-red-500 text-white">
                  3
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

// Composant Header pour le candidat (adapté de l'image)
const CandidateHeader = () => {
  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">B</span>
        </div>
        <span className="font-semibold text-white">BantuLink</span>
      </div>
      <div className="flex items-center space-x-4">
        {/* Pas de notifications visibles dans l'image, juste l'avatar du profil */}
        <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full cursor-pointer border-2 border-white">
          <div className="flex h-full w-full items-center justify-center rounded-full font-medium bg-yellow-500 text-white text-base">CD</div>
        </div>
        <span className="font-medium text-white">Cyprien DONTSA</span>
      </div>
    </header>
  );
};

// Contenu principal du profil candidat
const CandidateProfileContent = () => {
  return (
    <main className="flex-1 p-6 overflow-auto bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Colonne de gauche (principale) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Votre profil est visible aux recruteurs */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Votre profil est visible aux recruteurs</h2>
            <div className="mb-4">
              <p className="text-gray-700 font-medium mb-2">Rendre mon profil visible aux recruteurs</p>
              <div className="flex space-x-4">
                <button className="inline-flex items-center justify-center rounded-md font-medium px-4 py-2 text-sm bg-blue-600 text-white">Oui</button>
                <button className="inline-flex items-center justify-center rounded-md font-medium px-4 py-2 text-sm border border-gray-300 bg-white text-gray-700">Anonyme</button>
                <button className="inline-flex items-center justify-center rounded-md font-medium px-4 py-2 text-sm border border-gray-300 bg-white text-gray-700">Non</button>
              </div>
            </div>
            <div>
              <p className="text-gray-700 font-medium mb-2">Recevoir des offres d'emploi</p>
              <div className="flex space-x-4">
                <button className="inline-flex items-center justify-center rounded-md font-medium px-4 py-2 text-sm bg-yellow-500 text-white">Oui</button>
                <button className="inline-flex items-center justify-center rounded-md font-medium px-4 py-2 text-sm border border-gray-300 bg-white text-gray-700">Non</button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Plus de 30 000 recruteurs parcourent les profils de candidats sur BantuLink.</p>
          </div>

          {/* Débloquez vos opportunités de carrière */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Débloquez vos opportunités de carrière</h2>
            <p className="text-gray-700 font-medium mb-2">Statut actuel</p>
            <div className="relative mb-4">
              <select className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                <option>Ouvert aux opportunités</option>
                {/* Ajoutez d'autres options si nécessaire */}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500">
              Mettre à jour mon profil
            </button>
          </div>

          {/* Mes recherches d'emploi */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Mes recherches d'emploi</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                <div>
                  <p className="font-medium text-gray-900">Développeur Web</p>
                  <p className="text-sm text-blue-600">59 offres</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex justify-between items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                <div>
                  <p className="font-medium text-gray-900">React Developer - Douala</p>
                  <p className="text-sm text-blue-600">23 offres</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500">
                Voir toutes mes recherches
              </button>
              <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500">
                Créer une nouvelle recherche
              </button>
            </div>
          </div>

          {/* Mes candidatures */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Mes candidatures</h2>
            <div className="space-y-4">
              <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                <p className="font-medium text-gray-900">Développeur React Senior - TechCorp</p>
                <p className="text-sm text-gray-600">Candidature envoyée le 15 janvier 2024</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                <p className="font-medium text-gray-900">Full Stack Developer - StartupXYZ</p>
                <p className="text-sm text-gray-600">Candidature envoyée le 12 janvier 2024</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                <p className="font-medium text-gray-900">Laravel Developer - WebAgency</p>
                <p className="text-sm text-gray-600">Candidature envoyée le 8 janvier 2024</p>
              </div>
            </div>
            <button className="mt-6 inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500">
              Voir toutes mes candidatures
            </button>
          </div>

          {/* Mes CV et lettres de motivation */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Mes CV et lettres de motivation</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">CV_Cyprien.pdf</p>
                    <p className="text-sm text-gray-600">Dernière mise à jour: 10 janvier 2024</p>
                  </div>
                </div>
                <Download className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600" />
              </div>
              <div className="flex justify-between items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">CV_Cyprien_2025_L.pdf</p>
                    <p className="text-sm text-gray-600">Dernière mise à jour: 5 janvier 2024</p>
                  </div>
                </div>
                <Download className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600" />
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500">
                Télécharger une nouvelle lettre
              </button>
              <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500">
                Formater mon CV gratuitement
              </button>
            </div>
          </div>

          {/* Mes informations personnelles */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6"> {/* Ajout de mb-6 pour l'espacement avec le footer */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Mes informations personnelles</h2>
            <p className="text-gray-700 mb-4">Mettez à jour vos coordonnées, mot de passe, localisation et préférences de newsletter.</p>
            <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500">
              Modifier mes informations
            </button>
          </div>

        </div>

        {/* Colonne de droite (Offres correspondantes) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Offres correspondant à votre profil</h2>
            <div className="space-y-4">
              <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                <p className="font-medium text-gray-900">Développeur React Senior</p>
                <p className="text-sm text-gray-600">CDI • Douala</p>
                <p className="text-sm text-gray-600">TechCorp Solutions</p>
                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 mt-2">87% match</span>
              </div>
              <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                <p className="font-medium text-gray-900">Full Stack Developer</p>
                <p className="text-sm text-gray-600">Freelance • Remote</p>
                <p className="text-sm text-gray-600">StartupXYZ</p>
                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 mt-2">82% match</span>
              </div>
              <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                <p className="font-medium text-gray-900">Laravel Developer</p>
                <p className="text-sm text-gray-600">CDI • Yaoundé</p>
                <p className="text-sm text-gray-600">WebAgency Pro</p>
                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 mt-2">75% match</span>
              </div>
            </div>
            <button className="mt-6 w-full inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500">
              Voir toutes les offres correspondantes
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};


// Composant principal CandidateProfile
const CandidateProfile = () => {
  const [activeSection, setActiveSection] = useState('dashboard'); // Vous pouvez ajuster la section active si nécessaire

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        <CandidateSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <div className="flex-1 flex flex-col">
          <CandidateHeader />
          <CandidateProfileContent />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CandidateProfile;