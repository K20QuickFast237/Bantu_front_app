import React, { useState } from 'react';
import { 
  Home,
  Search, 
  Bell, 
  MessageCircle, 
  Users, 
  FileText, 
  Briefcase, 
  User,
  Plus,
  MoreHorizontal,
  Heart,
  Share2,
  MessageSquare,
  ChevronRight,
  Settings
} from 'lucide-react';

const Dashboard = () => {

  const sidebarActions = [
    { icon: FileText, label: 'Créer un CV pour postuler', color: 'text-blue-600' },
    { icon: Briefcase, label: 'Publier une offre d\'emploi', color: 'text-gray-700' },
    { icon: MessageCircle, label: 'Groupe WhatsApp d\'offres d\'emploi', color: 'text-green-600' }
  ];

  const recentJobs = [
    {
      title: 'RESPONSABLE COMMERCIAL ET MARKETING',
      company: 'CHAPCHAPCAR CAMEROUN',
      location: 'Yaoundé, Centre, Cameroun',
      type: 'CDI'
    },
    {
      title: 'OFFRE DE STAGE ÉDITION 2025',
      company: 'Nachtigal Hydro Power Company (NHPC)',
      location: 'Lieu Non spécifié, Cameroun',
      type: 'Stage'
    },
    {
      title: 'AGENT GESTIONNAIRE DE COMPTE E-COMMERCE',
      company: 'Qazam',
      location: 'Douala, Littoral, Cameroun',
      type: 'CDI'
    }
  ];

  const posts = [
    {
      id: 1,
      author: {
        name: 'Marie Kouam',
        title: 'RH Manager chez TechCorp',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
      },
      content: 'Nous recherchons un développeur React.js senior pour rejoindre notre équipe dynamique. Expérience minimum 3 ans requise. Postulez dès maintenant !',
      time: '2h',
      likes: 15,
      comments: 3,
      shares: 2
    },
    {
      id: 2,
      author: {
        name: 'Jean-Baptiste Fotso',
        title: 'Consultant en Marketing Digital',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
      },
      content: 'Excellente session de formation sur le marketing digital aujourd\'hui. Merci à tous les participants pour leur engagement !',
      time: '4h',
      likes: 28,
      comments: 7,
      shares: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo et Recherche */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-[#009739]">BantuHire</div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Recherche de relations, pages, groupes, #hashtags"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-green-600 relative transition-colors">
                <MessageCircle className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
              <button className="p-2 text-gray-600 hover:text-green-600 relative transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">1</span>
              </button>
              
              {/* Profile Dropdown */}
              <div className="flex items-center space-x-2 cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">Jospin Duclair</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Profile */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Profile Header */}
              <div className="relative">
                <div className="h-20 bg-gradient-to-r from-green-400 to-green-600"></div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-4 border-white"
                  />
                </div>
              </div>
              
              <div className="pt-10 pb-4 px-4 text-center">
                <h3 className="font-semibold text-lg text-gray-900">Jospin Duclair</h3>
                <p className="text-gray-600 text-sm">Développeur Full-Stack | React, Node.js</p>
                <p className="text-gray-500 text-xs mt-1">@nanfackjospinduclair</p>
                
                <div className="flex justify-around mt-4 text-sm text-gray-600 border-t pt-3">
                  <div className="text-center"><span className="font-bold block">150</span> Relations</div>
                  <div className="text-center"><span className="font-bold block">25</span> Publications</div>
                </div>
              </div>

              {/* Profile Actions */}
              <div className="border-t border-gray-100 px-4 py-3 space-y-2">
                {sidebarActions.map((action, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <action.icon className={`w-5 h-5 ${action.color}`} />
                      <span className="text-sm text-gray-700">{action.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>

              {/* Profile Menu */}
              <div className="border-t border-gray-100">
                <div className="p-2 space-y-1 text-sm">
                  <div className="flex items-center p-2 bg-green-100 text-green-800 font-semibold rounded cursor-pointer">
                    <Home className="w-5 h-5 mr-3" />
                    <span className="text-sm text-gray-700">Fil d'actualité</span>
                  </div>
                  <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                    <Users className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-sm text-gray-700">Mes Candidatures</span>
                  </div>
                  <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                    <FileText className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-sm text-gray-700">Mes CVs</span>
                  </div>
                  <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                    <Briefcase className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-sm text-gray-700">Offres d'emplois</span>
                  </div>
                  <div className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                    <Settings className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-sm text-gray-700">Paramètres</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-6">
            {/* WhatsApp Group Banner */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h4 className="font-semibold text-green-800">GROUPE WHATSAPP D'OFFRES D'EMPLOI</h4>
                  <p className="text-sm text-green-700">Cliquez ici pour ne plus manquer aucune actualité d'offre d'emploi!</p>
                </div>
              </div>
            </div>

            {/* Create Post */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    placeholder="Exprimez-vous... #Hashtag... @Mention... Lien..."
                    className="w-full p-3 border border-gray-200 bg-gray-50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows="3"
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex space-x-2">
                      <button className="text-gray-500 hover:text-green-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <FileText className="w-5 h-5" />
                      </button>
                    </div>
                    <button className="bg-[#009739] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#007a2f] transition-colors">
                      Créer Un Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start space-x-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                          <p className="text-sm text-gray-600">{post.author.title}</p>
                          <p className="text-xs text-gray-500">{post.time}</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <p className="mt-3 text-gray-800 leading-relaxed">{post.content}</p>
                      
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                        <div className="flex items-center space-x-6">
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                            <Heart className="w-5 h-5" />
                            <span className="text-sm">{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                            <MessageSquare className="w-5 h-5" />
                            <span className="text-sm">{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                            <Share2 className="w-5 h-5" />
                            <span className="text-sm">{post.shares}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Job Offers */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Offres d'emploi récentes</h3>
              </div>
              
              <div className="p-4 space-y-4">
                {recentJobs.map((job, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                    <h4 className="font-medium text-green-700 text-sm hover:underline cursor-pointer">
                      {job.title}
                    </h4>
                    <p className="text-sm font-medium text-gray-900 mt-1">{job.company}</p>
                    <p className="text-xs text-gray-500 mt-1">{job.location}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                      {job.type}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 p-4">
                <button className="w-full flex items-center justify-between p-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  <span>Alerte Emploi Personnalisée</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between p-2 text-sm text-gray-700 hover:bg-gray-100 rounded mt-1 transition-colors">
                  <span>Plus d'offres sur DooJobs</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;