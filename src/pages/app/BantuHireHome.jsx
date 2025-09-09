import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Search, ChevronDown, User, LogIn, ArrowRight, Building, Users, FileText, PlusCircle, Menu, X, ChevronRight, Flame, Star } from 'lucide-react';

export default function BantuHireHome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dropdown for "Pour les Candidats" and "Pour les Employeurs"
  const DropdownMenu = ({ title, items, scrolled }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
        <button className={`flex items-center gap-1 transition-colors ${scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`}>
          {title}
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full pt-2 w-56 bg-white rounded-lg shadow-xl  overflow-hidden"
          >
            <ul className="p-2">
              {items.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                    {item.icon}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    );
  };

  const candidateItems = [
    { href: '#', label: 'Parcourir les offres', icon: <Search className="w-4 h-4 text-gray-500" /> },
    { href: '#', label: 'Déposer mon CV', icon: <FileText className="w-4 h-4 text-gray-500" /> },
    { href: '#', label: 'Alertes emploi', icon: <Users className="w-4 h-4 text-gray-500" /> },
  ];

  const employerItems = [
    { href: '#', label: 'Publier une offre', icon: <PlusCircle className="w-4 h-4 text-gray-500" /> },
    { href: '#', label: 'Rechercher des CVs', icon: <Users className="w-4 h-4 text-gray-500" /> },
    { href: '#', label: 'Nos solutions RH', icon: <Building className="w-4 h-4 text-gray-500" /> },
  ];

  // Custom Select for Categories
  const CustomSelect = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Catégorie");
    const ref = useRef(null);

    const categories = ["Technologie", "Marketing", "Vente", "Design", "Ressources Humaines"];

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    return (
        <div className="relative w-full" ref={ref}>
            <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center bg-transparent text-gray-800 focus:outline-none cursor-pointer"
            >
            <span className={selected === "Catégorie" ? "text-gray-500" : "text-gray-800"}>{selected}</span>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
            <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-100 z-10 overflow-hidden"
            >
                {categories.map((category, index) => (
                <li
                    key={index}
                    onClick={() => {
                    setSelected(category);
                    setIsOpen(false);
                    }}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                    {category}
                </li>
                ))}
            </motion.ul>
            )}
        </div>
    );
  };

  // Accordion for Mobile Menu
  const MobileAccordionMenu = ({ title, items, scrolled }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <li>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex justify-between items-center px-4 py-2 rounded-md font-medium ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
        >
          <span>{title}</span>
          <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pl-6 overflow-hidden"
            >
              {items.map((item, index) => (
                <li key={index} className="pt-2">
                  <a
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md ${scrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300 hover:bg-white/10'}`}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    );
  };

  const recentJobs = [
    {
      logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png',
      title: 'Développeur React.js Senior',
      company: 'Tech Solutions Inc.',
      location: 'Paris, France',
      type: 'CDI',
      posted: 'il y a 2 heures',
      tags: ['React', 'JavaScript', 'Frontend'],
    },
    {
      logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png',
      title: 'UI/UX Designer',
      company: 'Creative Minds',
      location: 'Télétravail',
      type: 'Freelance',
      posted: 'il y a 8 heures',
      tags: ['Figma', 'UX', 'UI', 'Design System'],
    },
    {
      logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968260.png',
      title: 'Data Scientist',
      company: 'DataCorp',
      location: 'Lyon, France',
      type: 'CDI',
      posted: 'il y a 1 jour',
      tags: ['Python', 'Machine Learning', 'SQL'],
    },
  ];

  const featuredJobs = [
    {
      logo: 'https://cdn-icons-png.flaticon.com/512/1400/1400829.png',
      title: 'Chef de Projet Digital',
      company: 'Innovate Agency',
      location: 'Lille, France',
      type: 'CDI',
      salary: '45k€ - 55k€',
    },
    {
      logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111491.png',
      title: 'Ingénieur DevOps Confirmé',
      company: 'CloudNine',
      location: 'Télétravail',
      type: 'Freelance',
      salary: 'TJM 600€',
    },
  ];

  const RecentJobCard = ({ logo, title, company, location, type, posted, tags }) => (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.08)" }}
      className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col sm:flex-row gap-6 transition-shadow cursor-pointer"
    >
      <img src={logo} alt={`${company} logo`} className="w-12 h-12 rounded-md object-contain self-start" />
      <div className="flex-grow">
        <a href="#" className="text-lg font-bold text-gray-900 hover:text-[#009739] transition-colors">{title}</a>
        <div className="text-sm text-gray-600 mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>{company}</span>
          <span className="flex items-center gap-1"><MapPin size={14} /> {location}</span>
          <span>{type}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start sm:items-end justify-between mt-4 sm:mt-0 flex-shrink-0">
        <span className="text-xs text-gray-500 mb-4">{posted}</span>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-900 transition-colors">
          Postuler
        </button>
      </div>
    </motion.div>
  );

  const FeaturedJobCard = ({ logo, title, company, location, type, salary }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-100 p-5 rounded-xl border border-emerald-300 shadow-lg relative overflow-hidden cursor-pointer"
    >
      {/* Premium Badge */}
      <div className="absolute top-0 right-0 h-16 w-16">
        <div className="absolute transform rotate-45 bg-gradient-to-r from-[#0A2342] to-[#0A2342]/70 text-center text-white font-semibold py-1 right-[-34px] top-[18px] w-[120px] shadow-md">
          <Star size={12} className="inline-block mb-0.5 mr-1" />
          Premium
        </div>
      </div>

      <div className="flex items-center gap-4">
        <img src={logo} alt={`${company} logo`} className="w-10 h-10 rounded-md object-contain" />
        <div className="flex-grow">
          <a href="#" className="font-bold text-gray-900 hover:text-[#009739] transition-colors">{title}</a>
          <p className="text-sm text-gray-600">{company}</p>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-700 space-y-1 pl-14">
        <p className="flex items-center gap-2"><MapPin size={14} className="text-gray-500"/> {location}</p>
        <p className="flex items-center gap-2"><Briefcase size={14} className="text-gray-500"/> {type} - <span className="font-medium text-green-700">{salary}</span></p>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-[#0A2342] font-sans">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A2342] via-[#0A2342]/80 to-transparent"></div>

      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070"
        alt="Professionals collaborating"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      {/* Content */}
      <header className={`sticky top-0 z-50 transition-all duration-300 border-b border-gray-200/10 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8 text-sm font-medium">
                <div className={`text-2xl font-bold hover:scale-105 transition-transform duration-300 cursor-pointer ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                    BantuHire
                </div>
                <div className="hidden md:flex items-center gap-8">
                <DropdownMenu title="Pour les Candidats" items={candidateItems} scrolled={isScrolled} />
                <DropdownMenu title="Pour les Employeurs" items={employerItems} scrolled={isScrolled} />
                </div>
            </div>
          
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#" className={`flex items-center gap-2 transition-colors ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`}>
                <User className="w-4 h-4" />
                Se connecter
              </a>
              <a
                href="#"
                className={`px-4 py-2 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl ${isScrolled ? 'bg-gray-800 hover:bg-gray-900 text-white' : 'bg-[#009739] hover:bg-[#007a2f] text-white'}`}
              >
                Publier une offre
              </a>
            </nav>

            <div className="md:hidden flex items-center gap-4">
               <a
                href="#"
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors shadow-md hover:shadow-lg ${isScrolled ? 'bg-gray-800 hover:bg-gray-900 text-white' : 'bg-[#009739] hover:bg-[#007a2f] text-white'}`}
              >
                Publier une offre
              </a>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-1 rounded-md cursor-pointer ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden"
              >
                <div className={`py-4 border-t ${isScrolled ? 'border-gray-200' : 'border-white/20'}`}>
                  <ul className="flex flex-col space-y-1">
                    <MobileAccordionMenu title="Pour les Candidats" items={candidateItems} scrolled={isScrolled} />
                    <MobileAccordionMenu title="Pour les Employeurs" items={employerItems} scrolled={isScrolled} />
                    <li className={`border-t my-2 mx-4 ${isScrolled ? 'border-gray-200' : 'border-white/10'}`}></li>
                    <li><a href="#" className={`flex items-center px-4 py-2 rounded-md ${isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}><User className="w-4 h-4 mr-2" /> Se connecter</a></li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-12 text-white">

        <motion.div
          className="text-left max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main text */}
          <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-bold mb-4 leading-tight">
            Trouvez Votre Prochaine Opportunité
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-10 max-w-7xl mx-auto">
            Explorez des milliers d'offres d'emploi et connectez-vous avec les meilleures entreprises.
          </motion.p>

          {/* Search hints */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-4">
            <button className="bg-white/10 backdrop-blur-sm text-white text-xs font-semibold py-1 px-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors cursor-default">
              Quel poste ?
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white text-xs font-semibold py-1 px-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors cursor-default">
              Où ?
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white text-xs font-semibold py-1 px-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors cursor-default">
              Quel categorie ?
            </button>
          </motion.div>

          {/* Search form */}
          <motion.div variants={itemVariants} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl flex flex-col lg:flex-row items-center p-2 gap-2 max-w-7xl mx-auto">
            <div className="flex-1 w-full flex items-center border-b lg:border-b-0 lg:border-r border-gray-200 p-2">
              <Briefcase className="w-5 h-5 text-gray-400 mx-3" />
              <input
                type="text"
                placeholder="Titre du poste, compétence, entreprise"
                className="w-full bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
              />
            </div>
            <div className="flex-1 w-full flex items-center border-b lg:border-b-0 lg:border-r border-gray-200 p-2">
              <MapPin className="w-5 h-5 text-gray-400 mx-3" />
              <input
                type="text"
                placeholder="Ville, région ou pays"
                className="w-full bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
              />
            </div>
            <div className="flex-1 w-full flex items-center p-2">
              <div className="relative w-full">
                <CustomSelect />
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="bg-[#009739] hover:bg-[#007a2f] text-white px-8 py-4 rounded-lg font-semibold w-full lg:w-auto flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <Search className="w-5 h-5" />
              Rechercher
            </motion.button>
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants} className="mt-8 text-sm space-y-2">
            <p>
              <a href="#" className="text-green-400 hover:underline font-semibold">
                Recherche avancée
              </a>
              <span className="text-gray-400"> pour plus d'options.</span>
            </p>
            <p>
              <a href="#" className="text-green-400 hover:underline font-semibold">
                Déposez votre CV
              </a>
              <span className="text-gray-400"> – C'est rapide et facile.</span>
            </p>
            <p>
              <a href="#" className="text-green-400 hover:underline font-semibold">
                Employeurs : lancez-vous 
              </a>
              <span className="text-gray-400"> – Publiez une offre d’emploi et recevez des candidatures.</span>
            </p>
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main column for recent offers */}
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Offres récentes</h2>
              <div className="space-y-4">
                {recentJobs.map((job, index) => (
                  <RecentJobCard key={index} {...job} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <button className="bg-[#009739] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#007a2f] transition-colors shadow-md">
                  Voir plus d'offres
                </button>
              </div>
            </div>

            {/* Sidebar for featured offers */}
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">Offres en feux <Flame className="text-orange-500" /></h2>
              <div className="space-y-4">
                {featuredJobs.map((job, index) => (
                  <FeaturedJobCard key={index} {...job} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
