import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, ChevronDown, MessageSquare, Globe, Menu, X } from 'lucide-react'; // Ajout Globe, Menu, X
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n'; // Ajustez le chemin

const HeaderProfil = ({ onOpenProfileModal }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false); // État dropdown langue
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
        // Ne pas fermer le menu mobile ici, il a sa propre logique
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = (e, to) => {
    e.preventDefault();
    if (onOpenProfileModal) {
      onOpenProfileModal(() => navigate(to));
    } else {
      navigate(to);
    }
  };

  const userProfileItems = [
    { to: '/profil', label: t('header.myAccount'), icon: User, action: (e) => handleProfileClick(e, '/profil') },
    { to: '/dashboard/candidate/settings', label: t('header.settings') || 'Paramètres', icon: Settings },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  const hideNavLinksFor = ['/WhatDoYouWantToDo', '/whatdoyouwanttodo'];
  const hideNavLinks = hideNavLinksFor.some(p => location.pathname.toLowerCase() === p.toLowerCase());

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  return (
    <header className="relative flex items-center justify-between h-20 px-4 sm:px-10 bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center space-x-8">
        <Link to="/candidatProfil" className="text-xl font-bold">
          <span className="text-green-500">Bantu</span><span className="text-red-500">Link</span>
        </Link>

        {!hideNavLinks && (
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium text-sm">
            <Link to="/rechercheOffre" className="hover:text-green-600 transition-colors">
              {t('header.findJob') || 'Trouver un job'} {/* Ajoutez 'findJob': 'Find a job' en EN si besoin */}
            </Link>
            <Link to="/all-companies" className="hover:text-green-600 transition-colors">
              {t('header.findCompany') || 'Trouver une entreprise'}
            </Link>
          </nav>
        )}
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2">
        <button
          onClick={() => navigate('/candidat_chat')}
          className="p-2 text-gray-600 hover:text-black relative transition-colors rounded-full hover:bg-gray-100"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#009739] text-white text-[9px] rounded-full flex items-center justify-center border-2 border-white">5</span>
        </button>

        {/* Dropdown Langue */}
        <div className="relative z-50">
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
                      <a key={item.label} href={item.to} onClick={item.action} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors">
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

        {/* Hamburger Menu Icon */}
        {!hideNavLinks && (
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && !hideNavLinks && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden z-50"
          >
            <nav className="flex flex-col p-4 space-y-2">
              <Link to="/rechercheOffre" className="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>{t('header.findJob') || 'Trouver un job'}</Link>
              <Link to="/all-companies" className="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>{t('header.findCompany') || 'Trouver une entreprise'}</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default HeaderProfil;