import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Briefcase, FileText, MessageSquare, BarChart3, Settings, LogOut, Menu, X, ChevronLeft
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Badge } from '@/components/ui/badge';
import ConfirmationDialog from '../ConfirmationDialog';

function NavItem({ icon: Icon, label, to, sidebarOpen, badge }) {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <li className="relative mx-2 mb-1">
      <button
        onClick={() => navigate(to)}
        className={`w-full flex items-center text-left transition-all duration-200 transform rounded-lg ${
          active
            ? 'bg-green-100 text-[#009739] font-semibold shadow-inner'
            : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
        } ${sidebarOpen ? 'px-3 py-2 space-x-3' : 'p-3 justify-center'}`}
      >
        <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-[#009739]' : 'text-gray-700'}`} />
        {sidebarOpen && (
          <span className={`text-xs font-medium flex-1 ${active ? 'text-[#009739]' : 'text-gray-700'}`}>{label}</span>
        )}
        {sidebarOpen && badge && (
          <Badge className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[18px] flex items-center justify-center">
            {badge}
          </Badge>
        )}
        {!sidebarOpen && badge && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </button>
    </li>
  );
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, isMobile }) => {
  const navigate = useNavigate();
  const { professionnel, logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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
  };


  const handleLogoClick = () => {
    navigate('/dashboardEntreprise');
  };

    // Create backdrop for mobile
  const MobileBackdrop = () => {
    if (isMobile && sidebarOpen) {
      return (
        <div 
          className="fixed inset-0 bg-transparent bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      );
    }
    return null;
  };


  const sidebarItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, to: '/dashboard' },
    { id: 'job-posts', label: 'Mes offres d\'emploi', icon: Briefcase, to: '/job-post' },
    { id: 'applications', label: 'Candidatures', icon: FileText, badge: 3, to: '/job-application' }, // Le badge est codé en dur comme dans l'original
    { id: 'messages', label: 'Messages', icon: MessageSquare, to: '/chat' },
    { id: 'analytics', label: 'Statistiques', icon: BarChart3, to: '/analytics' },
    { id: 'settings', label: 'Paramètres', icon: Settings, to: '/settings' },
  ];

  return (
    <>
      <MobileBackdrop />
      <div 
        className={`
          bg-white text-gray-700 h-screen flex flex-col transition-all duration-300 ease-in-out shadow-md border-r border-gray-200
          ${isMobile 
            ? `fixed inset-y-0 left-0 z-30 ${sidebarOpen ? 'w-60 translate-x-0' : 'w-60 -translate-x-full'}` 
            : `relative ${sidebarOpen ? 'w-60' : 'w-20'}`
          }
        `}
      >
        {/* En-tête de la Sidebar */}
        <div className={`flex items-center p-3 border-b border-gray-200 h-14 ${sidebarOpen || !isMobile ? 'justify-between' : 'justify-center'}`}>
          {(sidebarOpen || !isMobile) && (
            <button onClick={handleLogoClick} className="flex items-center space-x-2 text-xl font-bold text-gray-700 hover:text-[#0A2342] transition-colors">
              <span className="text-green-500">Bantu</span><span className="text-red-500">Link</span>
            </button>
          )}
          {/* <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-1 rounded-md hover:bg-gray-100"
          >
            {isMobile && sidebarOpen ? <X size={20} /> : <ChevronLeft size={20} />}
          </button> */}
        </div>
        
        {/* Infos de l'entreprise */}
        <div className="p-4 border-b border-gray-200">
          <div className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarFallback className="bg-[#0A2342] text-white text-base">{professionnel?.nom_entreprise?.substring(0, 2).toUpperCase() || 'N/A'}</AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="ml-3 overflow-hidden">
                <p className="font-semibold text-gray-900 text-sm truncate">{professionnel?.nom_entreprise}</p>
                <p className="text-xs text-gray-600 truncate">{professionnel?.titre_professionnel}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <NavItem 
                key={item.id}
                icon={item.icon}
                label={item.label}
                to={item.to}
                sidebarOpen={sidebarOpen}
                badge={item.badge}
              />
            ))}
          </ul>
        </nav>
        
        {/* Pied de page avec déconnexion */}
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center w-full text-left text-gray-700 hover:text-red-600" onClick={openLogoutModal}>
            <LogOut size={20} className={`${!sidebarOpen && 'mx-auto'}`} />
            {sidebarOpen && <span className="ml-3 text-sm font-medium">Se déconnecter</span>}
          </button>
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
    </>
  );
};

export default Sidebar;
