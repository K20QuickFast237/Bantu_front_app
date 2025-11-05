import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, FileText, MessageSquare, User, LogOut, CheckCheck, Search, ChevronDown, Hand, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { toast } from 'sonner';
import ConfirmationDialog from '../ConfirmationDialog';


const Header = ({ collapsed, setCollapsed }) => {
  const { user, logout, particulier } = useAuth();
  const navigate = useNavigate();
  const [isNotifOpen, setNotifOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
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
    try {
      await logout();
      toast.success("Déconnexion réussie", {
        description: "Vous avez été déconnecté avec succès.",
        duration: 3000,
      });
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast.error("Erreur de déconnexion", {
        description: error.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.",
        duration: 5000,
      });
    } finally {
      setIsLogoutModalOpen(false);
    }
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
    setProfileOpen(false); // Fermer le menu profil si ouvert
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
    <header className="bg-white shadow-sm flex items-center justify-between px-3 py-2 md:px-6 md:py-2 sticky top-0 z-30 border-b border-gray-200">
      <div className="flex items-center">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="mr-3 p-1 rounded-md hover:bg-gray-100 text-gray-600"
        >
          {collapsed ? <ChevronLeft size={20} /> : <ChevronLeft size={20} />}
        </button>
        
        <div className="hidden md:flex space-x-2 items-center text-gray-700">
          <span className="font-medium text-xl">Salut, {user?.nom || "Recruteur"} !</span>
          <Hand size={20} className='text-yellow-500'/>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Search for desktop */}
        <div className="hidden md:block relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="w-48 lg:w-64 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
        </div>
        
        <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate('/chat')}
              className="p-2 text-gray-600 hover:text-black relative transition-colors rounded-full hover:bg-gray-100"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#009739] text-white text-[9px] rounded-full flex items-center justify-center border-2 border-white">5</span>
            </button>
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(!isNotifOpen)}
                className="p-2 text-gray-600 hover:text-black relative transition-colors rounded-full hover:bg-gray-100"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
                      <button onClick={() => navigate('/settings')} className="text-xs font-medium text-gray-600 hover:text-gray-900">Paramètres</button>
                      <button className="text-xs font-medium text-[#009739] hover:underline">Voir toutes les notifications</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setProfileOpen(!isProfileOpen)}
                className="flex items-center focus:outline-none"
              >
                {particulier.image_profil? <img src={particulier.image_profil} alt="profil" className="w-8 h-8 rounded-full md:w-9 md:h-9 hover:scale-110 transition-transform cursor-pointer border-2 border-transparent hover:border-green-400" /> : <Avatar className="w-8 h-8 md:w-9 md:h-9 hover:scale-110 transition-transform cursor-pointer border-2 border-transparent hover:border-green-400">
                  <AvatarFallback className="text-white bg-gray-700 text-sm">{user?.nom?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>}
                <ChevronDown size={16} className="hidden md:block ml-2 text-gray-500" />
              </button>
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        {particulier.image_profil? <img src={particulier.image_profil} alt="profil" className="w-12 h-12 rounded-full" /> : <Avatar className="w-12 h-12">
                          <AvatarFallback className="text-white bg-gray-700">{user?.nom?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                        </Avatar>}
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 truncate">{user?.nom}</p>
                          <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          navigate('/settings');
                          setProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="w-4 h-4 text-gray-500" />
                        <span>Voir mon profil</span>
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={openLogoutModal}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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
      
      <ConfirmationDialog
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Confirmation de déconnexion"
        description="Êtes-vous sûr de vouloir vous déconnecter ?"
        confirmText="Se déconnecter"
        variant="destructive"
      />
    </header>
  );
};

export default Header;