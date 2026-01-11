import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, MessageSquare, Bell, Menu, Globe, LogOut, Briefcase, Building, PlusCircle } from "lucide-react";
import { useState } from "react";
import Dropdown from "@/components/ui/dropdown";
import { AnimatePresence, motion } from "framer-motion";
import logo from '@/assets/logobantuhire.png';
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginForm from "@/components/public/LoginForm";
import RegisterForm from "@/components/public/RegisterForm";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Simulated state - will be replaced with real auth later
  const isLoggedIn = location.pathname.includes("/dashboard") || location.pathname.includes("/jobs");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
    setMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${isActive
      ? 'bg-primary/10 text-primary'
      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
    }`;

  const mobileNavLinkClass = ({ isActive }) => {
    return `block w-full text-center px-4 py-3 text-base font-medium transition-colors duration-300 rounded-lg ${isActive
      ? 'bg-primary/10 text-primary'
      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
    }`;
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="BantuHire" className="h-10 md:h-12" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/all-jobs" className={navLinkClass}><Briefcase className="h-4 w-4" />Offres</NavLink>
            <NavLink to="/companies" className={navLinkClass}><Building className="h-4 w-4" />Entreprises</NavLink>
            <NavLink to="/post-job" className={navLinkClass}><PlusCircle className="h-4 w-4" />Publier une offre</NavLink>
          </div>

          <div className="flex items-center gap-2">
            {/* Desktop controls */}
            <div className="hidden md:flex items-center gap-2">
              {/* Language Switcher */}
              <div className="relative">
                <Button variant="ghost" size="icon" onClick={() => setIsLangOpen(!isLangOpen)}>
                  <Globe className="h-5 w-5" />
                </Button>
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full right-0 mt-2 w-32 bg-white rounded-md shadow-lg border"
                    >
                      <button type="button" className="w-full text-left px-4 py-2 text-sm hover:bg-muted/50" onClick={() => changeLanguage('fr')}>🇫🇷 Français</button>
                      <button type="button" className="w-full text-left px-4 py-2 text-sm hover:bg-muted/50" onClick={() => changeLanguage('en')}>🇬🇧 English</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {isLoggedIn ? (
                <>
                  <Button variant="ghost" size="icon" onClick={() => navigate("/messages") }>
                    <MessageSquare className="h-5 w-5" />
                  </Button>

                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>

                <Dropdown
                  trigger={<Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>}
                  align="end"
                >
                  <button type="button" className="w-full text-left px-4 py-2 text-sm hover:bg-muted/10" onClick={() => navigate('/dashboard')}><User className="mr-2 h-4 w-4" />{t('header.myAccount')}</button>
                  <button type="button" className="w-full text-left px-4 py-2 text-sm hover:bg-muted/10" onClick={() => navigate('/') }><LogOut className="mr-2 h-4 w-4" />{t('header.logout')}</button>
                </Dropdown>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowLoginModal(true)}
                  >
                    {t('header.login')}
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowRegisterModal(true)}
                  >
                    {t('header.register')}
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t"
            >
              <div className="flex flex-col items-center py-4 px-4 space-y-3">
                <NavLink to="/all-jobs" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Offres</NavLink>
                <NavLink to="/companies" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Entreprises</NavLink>
                <NavLink to="/post-job" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Publier une offre</NavLink>
                
                <div className="w-full border-t pt-4 space-y-3">
                  {isLoggedIn ? (
                     <>
                      <Button className="w-full" onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }}>Mon Compte</Button>
                      <Button variant="outline" className="w-full" onClick={() => { /* handle logout */ setMobileMenuOpen(false); }}>Déconnexion</Button>
                    </>
                  ) : (
                    <>
                      <Button className="w-full" onClick={() => { setShowLoginModal(true); setMobileMenuOpen(false); }}>{t('header.login')}</Button>
                      <Button variant="outline" className="w-full" onClick={() => { setShowRegisterModal(true); setMobileMenuOpen(false); }}>{t('header.register')}</Button>
                    </>
                  )}
                </div>

                <div className="w-full border-t pt-4">
                  <div className="relative">
                    <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center justify-center w-full py-2 text-sm font-medium text-muted-foreground">
                      <Globe className="w-4 h-4 mr-2" />
                      <span>{i18n.language === 'fr' ? 'Français' : 'English'}</span>
                    </button>
                    {isLangOpen && (
                       <div className="mt-2 flex flex-col items-center space-y-2">
                          <button type="button" className="w-full text-center py-2 text-sm hover:bg-muted/50 rounded-md" onClick={() => changeLanguage('fr')}>🇫🇷 Français</button>
                          <button type="button" className="w-full text-center py-2 text-sm hover:bg-muted/50 rounded-md" onClick={() => changeLanguage('en')}>🇬🇧 English</button>
                       </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modals */}
        <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
          <DialogContent className="sm:max-w-md">
            <LoginForm onSuccess={() => { setShowLoginModal(false); navigate('/dashboard'); }} />
          </DialogContent>
        </Dialog>
        <Dialog open={showRegisterModal} onOpenChange={setShowRegisterModal}>
          <DialogContent className="sm:max-w-md">
            <RegisterForm onSuccess={(values, data) => { setShowRegisterModal(false); navigate('/EmailVerification', { state: { email: values.email, token: data.token, signature: data.signature } }); }} />
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};