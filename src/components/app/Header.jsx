import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, ChevronDown, Settings, MessageSquare, Globe } from 'lucide-react'; // Ajout Globe
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

const Header = () => {
  const profileMenuRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false); // État dropdown langue
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userProfileItems = [
    { to: '/profil', label: t('header.myAccount'), icon: User, action: (e) => handleProfileClick(e, '/profil') }, // Traduit dynamiquement
    // { to: '/dashboard/candidate/settings', label: t('header.settings') || 'Paramètres', icon: Settings }, // Fallback si pas traduit
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  const handleLogout = async () => {
    logout();
    navigate('/login');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  const handleProfileClick = (e, to) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <header className="flex items-center justify-between py-4 px-10 bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center space-x-8">
        <Link to="/candidatProfil" className="text-xl font-bold">
          <img src="/assets/logobantulink.png" alt="BantuLink Logo" className="h-7" />
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {/* Chat Button (inchangé) */}
        <button
          onClick={() => navigate('/candidat_chat')}
          className="p-2 text-gray-600 hover:text-black relative transition-colors rounded-full hover:bg-gray-100"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#009739] text-white text-[9px] rounded-full flex items-center justify-center border-2 border-white">5</span>
        </button>

        {/* Dropdown Langue (ajouté avant profil) */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Globe className="w-4 h-4 text-gray-600" />
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {isLangOpen && (
              <motion.ul
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-full right-0 mt-2 w-24 bg-white rounded-lg shadow-xl border border-gray-200"
              >
                <li>
                  <button onClick={() => changeLanguage('fr')} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100">
                    {t('header.fr')}
                  </button>
                </li>
                <li>
                  <button onClick={() => changeLanguage('en')} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100">
                    {t('header.en')}
                  </button>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Profil Menu (inchangé, mais labels traduits via t) */}
        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors group"
          >
            <User className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-800 text-sm">{user?.nom || t('header.myAccount')}</span>
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
                    item.action ? (
                      <a key={item.label} href={item.to} onClick={(e) => item.action(e)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors">
                        <item.icon className="w-4 h-4 text-gray-500" />
                        <span>{item.label}</span>
                      </a>
                    ) : (
                      <Link key={item.label} to={item.to} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors">
                        <item.icon className="w-4 h-4 text-gray-500" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  ))}
                  <div className="border-t border-gray-200/60 my-1"></div>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                    <LogOut className="w-4 h-4" />
                    <span>{t('header.logout')}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;