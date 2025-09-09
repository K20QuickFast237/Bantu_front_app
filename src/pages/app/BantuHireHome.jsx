import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Search, ChevronDown, User, LogIn, ArrowRight, Building, Users, FileText, PlusCircle } from 'lucide-react';

export default function BantuHireHome() {
  const [isScrolled, setIsScrolled] = useState(false);

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
            className="absolute top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
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
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className={`text-2xl font-bold hover:scale-105 transition-transform duration-300 cursor-pointer ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            BantuHire
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <DropdownMenu title="Pour les Candidats" items={candidateItems} scrolled={isScrolled} />
            <DropdownMenu title="Pour les Employeurs" items={employerItems} scrolled={isScrolled} />
            <a href="#" className={`flex items-center gap-2 transition-colors ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`}>
              <User className="w-4 h-4" />
              Mon Compte
            </a>
            <a
              href="#"
              className={`px-4 py-2 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl ${isScrolled ? 'bg-gray-800 hover:bg-gray-900 text-white' : 'bg-[#009739] hover:bg-[#007a2f] text-white'}`}
            >
              Publier une offre
            </a>
          </nav>
          <div className="md:hidden">
            <LogIn className={`w-6 h-6 cursor-pointer ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
          </div>
        </div>
      </header>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-12 text-white">

        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main text */}
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Trouvez Votre Prochaine Opportunité
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Explorez des milliers d'offres d'emploi et connectez-vous avec les meilleures entreprises.
          </motion.p>

          {/* Search form */}
          <motion.div variants={itemVariants} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl flex flex-col lg:flex-row items-center p-2 gap-2 max-w-4xl mx-auto">
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
          </motion.div>
        </motion.div>
      </section>
      <div className="relative z-10 text-center pb-24">
          <motion.button 
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 151, 57, 0.25)" }}
            className="bg-white text-[#009739] font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 group"
          >
            <span className="flex items-center gap-3">
              Voir les dernières offres
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
      </div>
    </div>
  );
}
