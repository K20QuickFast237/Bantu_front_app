import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion'; // Ajout pour animation
import { Globe, ChevronDown } from 'lucide-react'; // Icône langue
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n'; // Ajustez le chemin si besoin

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false); // État dropdown langue
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
      isActive
        ? 'bg-gray-100 text-blue-600'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
    }`;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 px-10 sm:px-6 lg:px-8 ${
        scrolled ? 'shadow-md border-b border-gray-200 backdrop-blur supports-[backdrop-filter]:bg-background/60' : 'bg-white'
      }`}
    >
      <div className="px-10 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <NavLink to="/home" className="flex items-center" aria-label="Accueil">
            <img src="src/assets/logobantulink.png" alt="BantuLink Logo" className="h-7" />
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-900 focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation + Langue */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-8">
            <NavLink to="/home" className={navLinkClass}>{t('header.home')}</NavLink>
            {/* <NavLink to="/about" className={navLinkClass}>{t('header.about')}</NavLink> */}
            {/* <NavLink to="/features" className={navLinkClass}>{t('header.features')}</NavLink> */}
            <NavLink to="/pricing" className={navLinkClass}>{t('header.pricing')}</NavLink>
            <NavLink to="/support" className={navLinkClass}>{t('header.support')}</NavLink>
          </nav>

          {/* Dropdown Langue */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-1 p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Globe className="w-4 h-4" />
              {/* <span className="text-sm font-medium">{t('header.language')}</span> */}
              <ChevronDown className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <motion.ul
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full right-0 mt-1 w-24 bg-white rounded-md shadow-lg border border-gray-200"
                >
                  <li>
                    <button onClick={() => changeLanguage('fr')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      {t('header.fr')}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => changeLanguage('en')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      {t('header.en')}
                    </button>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user && token ? (
            <>
              <NavLink
                to="/profil"
                className="px-5 py-2 text-sm text-emerald-700 border border-emerald-400 rounded-lg font-semibold hover:bg-emerald-50 transition-all duration-300"
              >
                {t('header.myAccount')}
              </NavLink>
              <button
                onClick={handleLogout}
                className="px-5 py-2 text-sm text-white bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300"
              >
                {t('header.logout')}
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-5 py-2 text-sm text-white bg-emerald-600 rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-300"
              >
                {t('header.login')}
              </NavLink>
              <NavLink
                to="/register"
                className="px-5 py-2 text-sm text-emerald-700 border border-emerald-400 rounded-lg font-semibold hover:bg-emerald-50 transition-all duration-300"
              >
                {t('header.register')}
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 transition-all duration-300 ease-in-out transform ${
          mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center py-6 space-y-4">
          <NavLink to="/home" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>{t('header.home')}</NavLink>
          {/* <NavLink to="/about" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>{t('header.about')}</NavLink> */}
          {/* <NavLink to="/features" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>{t('header.features')}</NavLink> */}
          <NavLink to="/pricing" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>{t('header.pricing')}</NavLink>
          <NavLink to="/support" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>{t('header.support')}</NavLink>
          <div className="w-full max-w-xs px-4 mt-6 space-y-4">
            {user && token ? (
              <>
                <NavLink
                  to="/profil"
                  className="block w-full text-center px-6 py-2.5 text-emerald-700 border border-emerald-400 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('header.myAccount')}
                </NavLink>
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="block w-full text-center px-6 py-2.5 text-white bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  {t('header.logout')}
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="block w-full text-center px-6 py-2.5 text-white bg-emerald-600 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('header.login')}
                </NavLink>
                <NavLink
                  to="/register"
                  className="block w-full text-center px-6 py-2.5 text-emerald-700 border border-emerald-400 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('header.register')}
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;