import React from 'react';
import { 
  Calendar, 
  Clock, 
  Euro, 
  FileText, 
  Users, 
  BarChart3, 
  MessageSquare, 
  User, 
  Bell 
} from 'lucide-react';

const JobOffersPage = () => {
  const jobOffers = [
    {
      id: 1,
      title: "Stage - Graphic & Motion Designer",
      publicationDate: "30/06/2025",
      deadline: "15/07/2025",
      type: "Temps plein",
      salary: "Non Spécifié",
      contractType: "CDI"
    },
    {
      id: 2,
      title: "Stage - Graphic & Motion Designer", 
      publicationDate: "30/06/2025",
      deadline: "15/07/2025",
      type: "Temps plein",
      salary: "Non Spécifié",
      contractType: "CDI"
    },
    {
      id: 3,
      title: "Stage - Graphic & Motion Designer",
      publicationDate: "30/06/2025", 
      deadline: "15/07/2025",
      type: "Temps plein",
      salary: "Non Spécifié",
      contractType: "CDI"
    },
    {
      id: 4,
      title: "Stage - Graphic & Motion Designer",
      publicationDate: "30/06/2025",
      deadline: "15/07/2025", 
      type: "Temps plein",
      salary: "Non Spécifié",
      contractType: "CDI"
    },
    {
      id: 5,
      title: "Stage - Graphic & Motion Designer",
      publicationDate: "30/06/2025",
      deadline: "15/07/2025",
      type: "Temps plein", 
      salary: "Non Spécifié",
      contractType: "CDI"
    },
    {
      id: 6,
      title: "Stage - Graphic & Motion Designer",
      publicationDate: "30/06/2025",
      deadline: "15/07/2025",
      type: "Temps plein",
      salary: "Non Spécifié", 
      contractType: "CDI"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">b</span>
          </div>
          <span className="font-semibold text-gray-800">RecrutLint</span>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-gray-600" />
          <User className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r min-h-screen">
          <div className="p-4">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <div className="font-semibold text-sm">ATOM TECH</div>
                  <div className="text-xs text-gray-500">Entreprise</div>
                </div>
              </div>
              
              <div className="flex gap-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-lg">8</div>
                  <div className="text-gray-500">Jobs Posts</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-green-500">47</div>
                  <div className="text-gray-500">Applicants</div>
                </div>
              </div>
            </div>

            <nav>
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 rounded bg-gray-100">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">Dashboard</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-blue-600 bg-blue-50 rounded">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">Vos offres d'emploi</span>
                  <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Candidatures</span>
                  <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">Messages</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">Analytics</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Partenaires</span>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Vos offres d'emploi</h1>
            <p className="text-gray-600 text-sm">Last login: Today at 9:30 AM</p>
          </div>

          {/* Job Offers Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {jobOffers.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-4 underline">{job.title}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Date de publication : {job.publicationDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline : {job.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Euro className="w-4 h-4" />
                      <span>Salaire : {job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText className="w-4 h-4" />
                      <span>Type de contrat : {job.contractType}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded transition-colors">
                      Afficher
                    </button>
                    <button className="px-3 py-1 text-sm border border-orange-400 text-orange-600 hover:bg-orange-50 rounded transition-colors">
                      Modifier
                    </button>
                    <button className="px-3 py-1 text-sm border border-red-400 text-red-600 hover:bg-red-50 rounded transition-colors">
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition-colors rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 text-center">
                  <FileText className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-medium">Create New Job</div>
                  <div className="text-sm opacity-90">Post a new position</div>
                </div>
              </div>
              
              <div className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                  <div className="font-medium text-gray-800">Switch Mode</div>
                  <div className="text-sm text-gray-600">View as candidate</div>
                </div>
              </div>
              
              <div className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 text-center">
                  <User className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                  <div className="font-medium text-gray-800">Edit Profile</div>
                  <div className="text-sm text-gray-600">Update your info</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOffersPage;