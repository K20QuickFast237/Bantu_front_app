import React from 'react';
import { 
  Eye, 
  FileText, 
  Download, 
  Edit, 
  Plus, 
  Search, 
  Calendar, 
  MapPin, 
  Building, 
  User 
} from 'lucide-react';
import Footer from '../../components/public/Footer';

const RecruiterProfile = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 text-black px-3 py-1 rounded font-semibold">
              Bantulink
            </div>
          </div>
          <div className="flex items-center gap-4">
            
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
              CD
            </div>
            <span>Cyprien DONTSA</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Visibility */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  Votre profil est visible aux recruteurs
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-3">
                    Rendez votre profil visible aux recruteurs
                  </p>
                  <div className="flex gap-2">
                    <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-medium">
                      🔥 Recherche active
                    </span>
                    <span className="bg-white border border-gray-300 text-gray-700 px-2 py-1 rounded text-xs">
                      Disponible
                    </span>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-3">
                    Recevez des offres d'emploi
                  </p>
                  <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-medium">
                    Oui
                  </span>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-2">
                    Plus de 50 CV reçus partagent la profile de candidats via Neocv Pro
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Section with Avatar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xl">
                    CD
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">Cyprien DONTSA</h3>
                    <p className="text-gray-600">Développeur Senior Frontend</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>Paris, France</span>
                    </div>
                    <button className="mt-3 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors">
                      Appliquer
                    </button>
                  </div>
                  <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-50 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Career Opportunities */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Débloquez vos opportunités de carrière
                </h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">Soyez visible !</p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-2">Quand aux opportunités</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-yellow-400 h-2 rounded-full w-[60%]" ></div>
                  </div>
                  <p className="text-xs text-gray-500">60%</p>
                </div>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors">
                  Mettre à jour mon profil
                </button>
              </div>
            </div>

            {/* Job Searches */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Mes recherches d'emploi
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Développeur Web</p>
                    <p className="text-sm text-gray-500">Paris</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">React Developer - Senior</p>
                    <p className="text-sm text-gray-500">Remote</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-2 mt-4">
                  <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors">
                    Voir toutes mes recherches
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Créer une nouvelle recherche
                  </button>
                </div>
              </div>
            </div>

            {/* Applications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  Mes candidatures
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Développeur React Senior - TechCorp</p>
                      <p className="text-sm text-gray-500">Candidature envoyée le 15 janvier 2024</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">En cours</span>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Full Stack Developer - StartupXYZ</p>
                      <p className="text-sm text-gray-500">Candidature envoyée le 12 janvier 2024</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">En attente</span>
                  </div>
                </div>

                <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors w-full">
                  Voir toutes mes candidatures
                </button>
              </div>
            </div>

            {/* CV and Cover Letters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Mes CV et lettres de motivation
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">CV_Cyprien.pdf</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Dernière mise à jour : 15 janvier 2024</p>
                    <button className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Télécharger
                    </button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">CV_Cyprien_2025_1.pdf</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Dernière mise à jour : 5 janvier 2024</p>
                    <button className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Télécharger
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Télécharger une nouvelle lettre
                  </button>
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors">
                    Personnaliser mon CV gratuitement
                  </button>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Mes informations personnelles
                </h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  Mettez à jour vos coordonnées, mot de passe, localisation et préférences de newsletter
                </p>
                <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors">
                  Modifier mes informations
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Matching Offers */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  Offres correspondant à votre profil
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">Développeur React Senior</h4>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">NOUVEAU</span>
                  </div>
                  <p className="text-sm text-gray-600">TechCorp</p>
                  <p className="text-xs text-gray-500">Paris</p>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">Full-Stack Developer</h4>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">NOUVEAU</span>
                  </div>
                  <p className="text-sm text-gray-600">StartupXYZ</p>
                  <p className="text-xs text-gray-500">Remote</p>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">Laravel Developer</h4>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">URGENT</span>
                  </div>
                  <p className="text-sm text-gray-600">WebAgency</p>
                  <p className="text-xs text-gray-500">Lyon</p>
                </div>

                <button className="w-full bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors">
                  Voir toutes les offres correspondantes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
    
    </>
  );
};

export default RecruiterProfile;