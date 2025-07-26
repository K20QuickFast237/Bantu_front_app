import React, { useState } from 'react';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  Plus,
  Search,
  Bell,
  ChevronDown,
  Eye
} from 'lucide-react';
import Footer from '../../components/public/Footer'; // Assurez-vous que le chemin du Footer est correct

// Composant Sidebar (styles Tailwind CSS intégrés)
const SlidebarDashRecru = ({ activeSection, setActiveSection }) => {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'job-posts', label: 'My Job Posts', icon: Briefcase },
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

      {/* Profil du recruteur sur le côté gauche */}
      <div className="p-6 border-b border-gray-200 text-center">
        <div className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full mx-auto mb-3">
          <div className="flex h-full w-full items-center justify-center rounded-full font-medium bg-blue-600 text-white text-3xl">JM</div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Jean Mba</h3>
        <p className="text-sm text-gray-600">Recruiter</p>
        <div className="flex justify-center space-x-4 mt-4">
          <div className="text-center">
            <p className="font-bold text-lg text-gray-900">8</p>
            <p className="text-xs text-gray-600">Job Posts</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg text-gray-900">47</p>
            <p className="text-xs text-gray-600">Applicants</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
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

// Composant Header (styles Tailwind CSS intégrés)
const HeaderDashRecru = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-4">
          <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full hover:scale-110 transition-transform cursor-pointer">
            <div className="flex h-full w-full items-center justify-center rounded-full font-medium bg-blue-600 text-white">JM</div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Composant pour le contenu de la page "My Job Posts" (styles Tailwind CSS intégrés)
const MyJobPostsRecruiterContent = () => {
  const jobPosts = [
    {
      title: 'Frontend Developer',
      company: 'Tech Solutions',
      location: 'Douala',
      postedDays: 2,
      applicants: 12,
      status: 'active',
      statusColor: 'bg-green-500'
    },
    {
      title: 'UI/UX Designer',
      company: 'Creative Agency',
      location: 'Yaoundé',
      postedDays: 5,
      applicants: 8,
      status: 'active',
      statusColor: 'bg-green-500'
    },
    {
      title: 'Backend Developer',
      company: 'StartupCo',
      location: 'Remote',
      postedDays: '1 week',
      applicants: 15,
      status: 'closed',
      statusColor: 'bg-red-500'
    }
  ];

  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Job Posts</h1>
        <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 transform hover:scale-105 transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Create New Job
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search job posts..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 flex items-center space-x-2">
          <span>All Status</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {jobPosts.map((job, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{job.title}</h3>
                <p className="text-sm text-gray-600">
                  {job.company} • {job.location} • Posted {job.postedDays} ago
                </p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${job.statusColor} text-white`}>
                    {job.status}
                  </span>
                  <span className="text-sm text-gray-700">{job.applicants} applicants</span>
                </div>
              </div>
              <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-8 px-3 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 hover:scale-105 transition-transform">
                <Eye className="w-4 h-4 mr-2" />
                View Applications
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

// Composant principal OffreRecruteur
const OffreRecruteur = () => {
  const [activeSection, setActiveSection] = useState('job-posts');

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        <SlidebarDashRecru
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <div className="flex-1 flex flex-col">
          <HeaderDashRecru />
          <MyJobPostsRecruiterContent />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OffreRecruteur;