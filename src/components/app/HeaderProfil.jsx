import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Edit, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const HeaderProfil = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    // Le nettoyage du sessionStorage est déjà géré dans le contexte
    sessionStorage.removeItem('token');
    
    // Appeler la fonction logout du contexte
    if (logout) {
      await logout();
    }
    
    // Rediriger vers la page de connexion
    navigate('/login', { replace: true });
  };

  const userProfileItems = [
    { to: '/profil', label: "Voir le profil", icon: User },
    { to: '/profil', label: "Modifier le profil", icon: Edit },
    { to: '/dashboard/candidate/settings', label: 'Paramètres', icon: Settings },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  return (
    <header className="flex items-center justify-between py-4 px-10 bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center space-x-8">
        <Link to="/candidatProfil" className="text-xl font-bold">
          <span className="text-green-500">Bantu</span><span className="text-red-500">Link</span>
        </Link>

        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium text-sm">
          <Link to="/rechercheOffre" className="hover:text-green-600 transition-colors">
            Trouver un job
          </Link>
          <Link to="/dashboard/candidate/jobs" className="hover:text-green-600 transition-colors">
            Trouver une entreprise
          </Link>
        </nav>
      </div>

      <div className="relative" ref={profileMenuRef}>
        <button
          onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
          className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors group"
        >
          <User className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-800 text-sm">{user?.nom || 'Mon Profil'}</span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isProfileMenuOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute top-full right-0 mt-2 w-60 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-10"
            >
              <div className="p-2">
                {userProfileItems.map((item) => (
                  <Link key={item.to + item.label} to={item.to} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors">
                    <item.icon className="w-4 h-4 text-gray-500" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <div className="border-t border-gray-200/60 my-1"></div>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default HeaderProfil;