import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  Eye,
  Users,
  Calendar,
  Plus,
  User,
  Search,
  CheckCheck,
  Bell,
  ArrowLeft, // Importez l'icône de flèche gauche
  ArrowLeftRight,
  LogOut,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importez le hook de navigation
import Footer from '../../components/public/Footer';
import DashboardSection from './DashboardSection';
import JobPostsSection from './JobPostsSection';
import ApplicationsSection from './ApplicationsSection';
import MessagesSection from './MessagesSection';
import AnalyticsSection from './AnalyticsSection';
import SettingsSection from './SettingsSection';
import { useAuth } from '@/hooks/useAuth';
import HeroCompany from '@/components/app/HeroCompany';
import MultiStepForm from '@/components/app/MultiStepForm';
import api from '@/services/api';

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
  <div className={`p-5 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ children, className = '', ...props }) => (
  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${className}`} {...props}>
    {children}
  </span>
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

// Composant Sidebar
const SlidebarDashRecru = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();
  const { professionnel } = useAuth();
  const [jobPosts, setJobPosts] = useState([]);

  const handleReturnClick = () => {
    navigate('/dashboardEntreprise');
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'job-posts', label: 'Mes offres d\'emploi', icon: Briefcase },
    { id: 'applications', label: 'Candidatures', icon: FileText, badge: 3 },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'analytics', label: 'Statistiques', icon: BarChart3 },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [offersResponse] = await Promise.all([
          api.get('/mesoffres'),
        ]);

        setJobPosts(offersResponse.data || []);

      } catch (error) {
        console.error("Erreur lors de la récupération des données du dashboard:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-60 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      <div className="p-5 border-b border-gray-200 h-14 flex items-center">
        {/* Bouton de retour avec l'icône et le gestionnaire de clic */}
        <button className="flex items-center space-x-2 text-gray-700 hover:text-[#0A2342] transition-colors text-xl font-bold">
          <span className="text-green-500">Bantu</span><span className="text-red-500">Link</span>
        </button>
      </div>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-[#0A2342] text-white text-base">{professionnel?.nom_entreprise?.substring(0, 2).toUpperCase() || 'N/A'}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{professionnel?.nom_entreprise}</p>
            <p className="text-xs text-gray-600">{professionnel?.titre_professionnel}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 transform ${
                isActive
                  ? 'bg-green-100 text-[#009739] font-semibold shadow-inner'
                  : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
              {item.badge && (
                <Badge className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[18px] justify-center items-center">
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

// Composant Header
const HeaderDashRecru = ({ setActiveSection }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isNotifOpen, setNotifOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'candidature', text: 'Nouvelle candidature pour "Développeur Frontend"', time: 'il y a 5 min', unread: true },
    { id: 2, type: 'message', text: 'Message de John Doe', time: 'il y a 1 heure', unread: true },
    { id: 3, type: 'alerte', text: 'Votre offre "Designer UI/UX" expire bientôt', time: 'il y a 3 heures', unread: false },
    { id: 4, type: 'candidature', text: 'Sarah Martinez a postulé à "Chef de Projet"', time: 'il y a 1 jour', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const notificationConfig = {
    candidature: { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
    message: { icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-50' },
    alerte: { icon: Bell, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
    // Ajouter la logique de navigation ici si nécessaire
  };

  return (
    <header className="bg-[#0A2342] shadow-md border-b border-white/10 sticky top-0 z-30">
      <div className="max-w-full mx-auto px-5">
        <div className="flex justify-end items-center h-14">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveSection('messages')}
              className="p-2 text-gray-300 hover:text-white relative transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#009739] text-white text-[9px] rounded-full flex items-center justify-center border-2 border-white">5</span>
            </button>
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(!isNotifOpen)}
                className="p-2 text-gray-300 hover:text-white relative transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-600 text-white text-[9px] rounded-full flex items-center justify-center border-2 border-white">{unreadCount}</span>
                )}
              </button>
              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200/80 overflow-hidden z-20"
                  >
                    <div className="flex justify-between items-center p-3 border-b border-gray-200/80">
                      <h3 className="font-semibold text-base text-gray-800">Notifications</h3>
                      {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="text-xs font-medium text-[#009739] hover:underline flex items-center gap-1">
                          <CheckCheck className="w-3.5 h-3.5" />
                          Marquer tout comme lu
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                      {notifications.map(notif => {
                        const config = notificationConfig[notif.type] || notificationConfig.alerte;
                        const Icon = config.icon;
                        return (
                          <div key={notif.id} onClick={() => handleNotificationClick(notif.id)} className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center ${config.bg}`}>
                              <Icon className={`w-5 h-5 ${config.color}`} />
                            </div>
                            <div className="flex-grow">
                              <p className="text-sm text-gray-800 leading-snug">{notif.text}</p>
                              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                            </div>
                            {notif.unread && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between items-center p-2 text-center border-t border-gray-200/80 bg-gray-50">
                      <button onClick={() => setActiveSection('settings')} className="text-xs font-medium text-gray-600 hover:text-gray-900">Paramètres</button>
                      <button className="text-xs font-medium text-[#009739] hover:underline">Voir toutes les notifications</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="relative" ref={profileRef}>
              <button onClick={() => setProfileOpen(!isProfileOpen)}>
                <Avatar className="hover:scale-110 transition-transform cursor-pointer border-2 border-transparent hover:border-green-400">
                  <AvatarFallback className="text-white bg-gray-700 text-sm">{user?.nom?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
              </button>
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-20"
                  >
                    <div className="p-3 border-b">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user?.nom}</p>
                      <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setActiveSection('settings');
                          setProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <User className="w-4 h-4 text-gray-500" />
                        <span>Voir mon profil</span>
                      </button>
                      <div className="border-t my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Composant principal DashboardRecruteurprofil
const DashboardRecruteurprofil = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(
    location.state?.section || 'dashboard'
  );
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection animateCards={animateCards} setActiveSection={setActiveSection} />;
      case 'job-posts':
        return <JobPostsSection setActiveSection={setActiveSection} />;
      case 'applications':
        return <ApplicationsSection />;
      case 'messages':
        return <MessagesSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'settings':
        return <SettingsSection />;
      case 'create-job':
        return (
          <>
            <HeroCompany />
            <MultiStepForm />
          </>
        );
      default:
        return <DashboardSection animateCards={animateCards} setActiveSection={setActiveSection} />;
    }
  };

  return (
    <>
      <div className="bg-gray-50 flex min-h-screen">
        <SlidebarDashRecru
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className="flex-1 flex flex-col w-0">
          <HeaderDashRecru setActiveSection={setActiveSection} />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex-1"
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default DashboardRecruteurprofil;