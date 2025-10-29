import React, { useState, useEffect } from 'react';
import {
  Eye,
  FileText,
  Calendar,
  Users,
  Plus,
  User,
  ArrowLeftRight,
  BarChart3,
  Search,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

// Composants UI réutilisables
const Button = ({ children, variant = 'default', size = 'default', className = '', onClick, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    default: 'bg-[#009739] text-white hover:bg-[#007a2f] focus:ring-green-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-blue-500'
  };

  const sizes = {
    default: 'h-9 px-3 text-sm',
    sm: 'h-7 px-2 text-xs',
    lg: 'h-11 px-7'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`flex flex-col space-y-1 p-5 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-base font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-5 ${className}`} {...props}>
    {children}
  </div>
);

const Avatar = ({ children, className = '', ...props }) => (
  <div className={`relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full ${className}`} {...props}>
    {children}
  </div>
);

const AvatarFallback = ({ children, className = '', ...props }) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full font-medium ${className}`} {...props}>
    {children}
  </div>
);

const Dashboard = ({ setActiveSection }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    { title: '0', subtitle: 'Vues Totales', color: 'bg-blue-50 border-blue-200', icon: Eye, iconColor: 'text-blue-600' },
    { title: '0', subtitle: 'Totales des offres', color: 'bg-green-50 border-green-200', icon: FileText, iconColor: 'text-green-600' },
    { title: '0', subtitle: 'Entretiens planifiés', color: 'bg-yellow-50 border-yellow-200', icon: Calendar, iconColor: 'text-yellow-600' },
    { title: '0', subtitle: 'Candidats actifs', color: 'bg-pink-50 border-pink-200', icon: Users, iconColor: 'text-pink-600' },
  ]);
  const [jobPosts, setJobPosts] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const { user } = useAuth();
  const [animateCards, setAnimateCards] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setAnimateCards(true), 100);
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [offersResponse, applicationsResponse] = await Promise.all([
          api.get('/mesoffres'),
          api.get('/candidatures')
        ]);

        setJobPosts(offersResponse.data.data || []);
        setRecentApplications(applicationsResponse.data || []);

        setStats(prevStats => [
          { ...prevStats[0], title: '234' }, // TODO: Remplacer par des données dynamiques quand l'API sera prête
          { ...prevStats[1], title: offersResponse.data.total?.toString() || '0' }, // TODO: Remplacer par des données dynamiques
          { ...prevStats[2], title: '5' }, // TODO: Remplacer par des données dynamiques
          { ...prevStats[3], title: '12' }, // TODO: Remplacer par des données dynamiques
        ]);

      } catch (error) {
        console.error("Erreur lors de la récupération des données du dashboard:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateJobClick = () => {
    navigate('/createJob');
  };

  const quickActions = [
    {
      title: 'Créer une offre',
      subtitle: 'Publier un nouveau poste',
      onClick: handleCreateJobClick,
      icon: Plus,
      bgColor: 'bg-white',
      textColor: 'text-gray-800',
      iconColor: 'text-gray-800'
    },
    {
      title: 'Modifier le profil',
      subtitle: 'Mettre à jour vos infos',
      icon: User,
      onClick: () => navigate('/settings'),
      bgColor: 'bg-white',
      textColor: 'text-gray-800',
      iconColor: 'text-gray-800'
    },
    {
      title: 'Changer de mode',
      subtitle: 'Voir en tant que candidat',
      icon: ArrowLeftRight,
      onClick: () => navigate('/profil'),
      bgColor: 'bg-white',
      textColor: 'text-green-600',
      iconColor: 'text-green-600'
    },
    {
      title: 'Voir les statistiques',
      subtitle: 'Analyses de performance',
      icon: BarChart3,
      onClick: () => navigate('/analytics'),
      bgColor: 'bg-white',
      textColor: 'text-orange-500',
      iconColor: 'text-orange-500'
    }
  ];

  return (
    <main className="flex-1 p-5 overflow-auto">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">Bienvenue, {user.nom}</h1>
          <p className="text-sm text-gray-600">Voici votre tableau de bord de recrutement pour aujourd'hui.</p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher des candidats, des emplois..."
            className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded-lg bg-white text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#009739] focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className={`${stat.color} border-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                animateCards ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: animateCards ? 'fadeInUp 0.5s ease-out forwards' : 'none'
              }}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-7 h-7 ${stat.iconColor}`} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.title}</h3>
                  <p className="text-sm text-gray-700 font-medium">{stat.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">Offres d'emploi actives</CardTitle>
              <Button onClick={handleCreateJobClick} className="transform hover:scale-105 transition-all">
                Créer une offre
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {jobPosts.slice(0, 3).map((job) => {
                const postedDate = new Date(job.created_at);
                const today = new Date();
                const diffTime = Math.abs(today - postedDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                return (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transform hover:scale-[1.02] transition-transform"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${job.statut === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-900">{job.titre_poste}</h4>
                        <p className="text-xs text-gray-600">{job.nom_entreprise || 'Entreprise'}</p>
                        <p className="text-xs text-gray-500">Publié il y a {diffDays} jours • {job.candidatures_count || 0} candidats</p>
                      </div>
                    </div>
                    <Button onClick={() => navigate(`/dashboard_candidature_spec/${job.id}`)} variant="outline" size="sm" className="hover:scale-105 transition-transform">
                      <Eye className="w-3.5 h-3.5 mr-1.5" />
                      Voir les candidatures
                    </Button>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">Candidatures récentes</CardTitle>
              <Button variant="outline" size="sm" className="text-[#009739] border-[#009739] hover:bg-green-50 hover:scale-105 transition-transform">
                Voir toutes les candidatures
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentApplications.slice(0, 4).map((application) => {
                const applicationDate = new Date(application.created_at);
                const today = new Date();
                const diffTime = Math.abs(today - applicationDate);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
                const timeAgo = diffDays > 0 ? `il y a ${diffDays} jour(s)` : `il y a ${diffHours} heure(s)`;
                const avatarColors = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-orange-500', 'bg-purple-500'];
                const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

                return (
                  <div
                    key={application.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transform hover:scale-105 transition-all"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={`${randomColor} text-white text-xs`}>
                        {application.candidat?.nom?.substring(0, 2).toUpperCase() || 'N/A'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">{application.candidat?.nom || 'Candidat Anonyme'}</p>
                      <p className="text-xs text-gray-600">{application.offre?.titre_poste || 'Poste non spécifié'}</p>
                      <p className="text-xs text-gray-500">{timeAgo}</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs hover:scale-105 transition-transform" onClick={() => navigate(`/profil_candidat_by_recruteur/${application.candidat_id}`)}>
                      Voir
                    </Button>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-7">
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          Actions rapides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card
                key={index}
                onClick={action.onClick}
                className={`cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${action.bgColor}`}
              >
                <CardContent className="p-4 flex items-center space-x-3">
                  <Icon className={`w-6 h-6 flex-shrink-0 ${action.iconColor}`} />
                  <div>
                    <h3 className={`font-semibold text-sm mb-0.5 ${action.textColor}`}>{action.title}</h3>
                    <p className={`text-xs opacity-90 ${action.textColor}`}>{action.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;