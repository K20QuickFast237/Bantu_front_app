import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, MessageSquare, Bell, Search, Menu, Globe, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import Dropdown from "@/components/ui/dropdown";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import logo from '@/assets/logobantumarket.png';
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  
  // Simulated state - will be replaced with real auth later
  const isLoggedIn = location.pathname.includes("/dashboard") || location.pathname.includes("/jobs");

  // Sample products for autocomplete
  const jobs = [];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const filteredJobs = searchQuery.trim()
    ? jobs.filter((job) =>
        job.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${searchQuery}`);
      setShowSuggestions(false);
    }
  };

  const handleProductSelect = (product) => {
    setSearchQuery(product);
    navigate(`/job?search=${product}`);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-20">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="BantuHire" className="h-10 md:h-12" />
          </Link>

          {/* Search Bar - Desktop */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t('header.findJob')}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(e.target.value.trim().length > 0);
                  }}
                  onFocus={() => searchQuery.trim().length > 0 && setShowSuggestions(true)}
                  className="pl-10"
                />
              </div>
            </form>
            
            {showSuggestions && filteredProducts.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white border rounded-md shadow-lg z-50">
                <Command>
                  <CommandList>
                    <CommandEmpty>Aucun produit trouvé</CommandEmpty>
                    <CommandGroup>
                      {filteredJobs.map((job, index) => (
                        <CommandItem
                          key={index}
                          onSelect={() => handleProductSelect(job)}
                          className="cursor-pointer"
                        >
                          <Search className="mr-2 h-4 w-4" />
                          {job}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Desktop controls */}
            <div className="hidden md:flex items-center gap-2">
              {/* Language Switcher */}
              <Dropdown
                trigger={<Button variant="ghost" size="icon"><Globe className="h-5 w-5" /></Button>}
                align="end"
              >
                <button type="button" className="w-full text-left px-4 py-2 text-sm hover:bg-muted/10" onClick={() => changeLanguage('fr')}>🇫🇷 Français</button>
                <button type="button" className="w-full text-left px-4 py-2 text-sm hover:bg-muted/10" onClick={() => changeLanguage('en')}>🇬🇧 English</button>
              </Dropdown>

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
            <Dropdown
              trigger={<Button variant="ghost" size="icon" className="md:hidden"><Menu className="h-5 w-5" /></Button>}
              align="end"
            >
              <button type="button" className="w-full text-left px-4 py-2 text-sm hover:bg-muted/10" onClick={() => navigate('/jobs')}>Offres</button>
              <button type="button" className="w-full text-left px-4 py-2 text-sm hover:bg-muted/10" onClick={() => navigate('/companies')}>Entreprises</button>
              <button type="button" className="w-full text-left px-4 py-2 text-sm hover:bg-muted/10" onClick={() => navigate(`/post-job`)}>Publier une offre</button>
                <Dropdown trigger={<button type="button" className="w-full text-left px-4 py-2 text-sm">Langue</button>} align="start">
                  <button type="button" onClick={() => changeLanguage('fr')}>🇫🇷 Français</button>
                  <button type="button" onClick={() => changeLanguage('en')}>🇬🇧 English</button>
                </Dropdown>

              {!isLoggedIn && (
                <>
                  <div data-no-default className="px-3 py-2">
                    <Button className="w-full" onClick={() => setShowLoginModal(true)}>{t('header.login')}</Button>
                  </div>
                  <div data-no-default className="px-3 py-2">
                    <Button className="w-full" onClick={() => setShowRegisterModal(true)}>{t('header.register')}</Button>
                  </div>
                </>
              )}
            </Dropdown>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('header.findJob')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>
        {/* Login Modal */}
        <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
          <DialogContent className="sm:max-w-md">
            <LoginForm onSuccess={() => { setShowLoginModal(false); navigate('/dashboard'); }} />
          </DialogContent>
        </Dialog>
        {/* Register Modal */}
        <Dialog open={showRegisterModal} onOpenChange={setShowRegisterModal}>
          <DialogContent className="sm:max-w-md">
            <RegisterForm onSuccess={(values, data) => { setShowRegisterModal(false); navigate('/EmailVerification', { state: { email: values.email, token: data.token, signature: data.signature } }); }} />
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};
