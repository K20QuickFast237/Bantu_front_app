import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Briefcase, MapPin, Search, ChevronDown, User, LogIn, Building, Users, FileText, PlusCircle, Menu, X, ChevronRight, Flame, Star, Code, Megaphone, PenTool, DollarSign, HeartHandshake, Award, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Footer from "@/components/app/footer";
import InscriptionEntreprise from "./InscriptionEntreprise";

export default function BantuHireHome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInscriptionOpen, setIsInscriptionOpen] = useState(false);

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

  const { ref: categoriesRef, inView: categoriesInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dropdown for "Pour les Candidats" and "Pour les Employeurs"
  const DropdownMenu = ({ title, items, scrolled, isEmployer }) => {
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
            className="absolute top-full pt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <ul className="p-2">
              {items.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={isEmployer ? () => setIsInscriptionOpen(true) : undefined}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full text-left"
                  >
                    {item.icon}
                    {item.label}
                  </button>
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
  const MobileAccordionMenu = ({ title, items, scrolled, isEmployer }) => {
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
                  <button
                    onClick={isEmployer ? () => setIsInscriptionOpen(true) : undefined}
                    className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md ${scrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300 hover:bg-white/10'}`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
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
      whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.08)" }}
      className="bg-white p-5 rounded-xl border border-gray-200/80 flex flex-col sm:flex-row items-start gap-5 transition-all duration-300 group"
    >
      <div className="w-14 h-14 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
        <img src={logo} alt={`${company} logo`} className="w-10 h-10 object-contain" />
      </div>
      <div className="flex-grow">
        <a href="#" className="text-lg font-bold text-gray-800 group-hover:text-[#009739] transition-colors">{title}</a>
        <div className="text-sm text-gray-500 mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>{company}</span>
          <span className="flex items-center gap-1.5"><MapPin size={14} /> {location}</span>
          <span className="flex items-center gap-1.5"><Briefcase size={14} /> {type}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full group-hover:bg-green-100 group-hover:text-green-800 transition-colors">{tag}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start sm:items-end justify-between mt-4 sm:mt-0 flex-shrink-0 w-full sm:w-auto">
        <span className="text-xs text-gray-400 mb-3">{posted}</span>
        <button className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded-lg font-semibold text-sm hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center justify-center gap-2">
          Consulter <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );

  const FeaturedJobCard = ({ logo, title, company, location, type, salary }) => (
    <motion.div
      whileHover={{ y: -5, borderColor: '#009739' }}
      className="bg-white p-5 rounded-xl border-2 border-transparent shadow-lg relative overflow-hidden group transition-all duration-300"
    >
      <div className="absolute top-3 right-3 bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
        <Flame size={12} /> En Feu
      </div>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-white border border-gray-200 rounded-md flex items-center justify-center flex-shrink-0">
          <img src={logo} alt={`${company} logo`} className="w-8 h-8 object-contain" />
        </div>
        <div className="flex-grow">
          <a href="#" className="font-bold text-gray-800 group-hover:text-[#009739] transition-colors pr-16">{title}</a>
          <p className="text-sm text-gray-500 mt-1">{company}</p>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600 space-y-2">
        <p className="flex items-center gap-2"><MapPin size={14} className="text-gray-400"/> {location}</p>
        <p className="flex items-center gap-2"><Briefcase size={14} className="text-gray-400"/> {type}</p>
        <p className="flex items-center gap-2"><DollarSign size={14} className="text-gray-400"/> <span className="font-semibold text-green-700">{salary}</span></p>
      </div>
      <button className="mt-4 w-full bg-[#009739] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#007a2f] transition-colors flex items-center justify-center gap-2">
        Consulter l'offre
      </button>
    </motion.div>
  );

  // Animated Counter for CategoryCard
  const AnimatedCounter = ({ end, duration = 1500, isInView }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (isInView) {
        let startTime;
        const startCount = 0;

        const updateCount = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const currentCount = Math.floor(progress * (end - startCount) + startCount);
          setCount(currentCount);

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          }
        };

        requestAnimationFrame(updateCount);
      }
    }, [end, duration, isInView]);

    return <span className="font-mono">{count.toLocaleString('fr-FR')}</span>;
  };

  // Category Card Component
  const CategoryCard = ({ icon, name, count, isInView }) => (
    <motion.div
      variants={itemVariants}
      className="group relative bg-white/30 backdrop-blur-lg rounded-xl p-5 cursor-pointer border border-gray-200/20 shadow-lg hover:bg-blue-600 transition-all duration-300 overflow-hidden"
    >
      <div className="relative z-10 flex items-center justify-between h-full space-x-6">
        <div className="max-w-1/2">
          <div className="text-blue-600 group-hover:text-white transition-colors duration-300">
            {icon}
          </div>
          <h3 className="text-lg font-light text-blue-900 group-hover:text-white transition-colors duration-300 text-left">
            {name}
          </h3>
        </div>
        <div className="text-3xl font-medium text-gray-400 group-hover:text-gray-200 transition-colors duration-300 flex-shrink-0 max-w-1/2">
          <AnimatedCounter end={count} isInView={isInView} />
        </div>
      </div>
    </motion.div>
  );

  const popularCategories = [
    { name: 'Développement', icon: <Code size={40} strokeWidth={1} />, count: 12450},
    { name: 'Marketing & Vente', icon: <Megaphone size={40} strokeWidth={1} />, count: 8750 },
    { name: 'Design & Création', icon: <PenTool size={40} strokeWidth={1} />, count: 6320 },
    { name: 'Finance & Compta', icon: <DollarSign size={40} strokeWidth={1} />, count: 4100 },
    { name: 'RH & Recrutement', icon: <HeartHandshake size={40} strokeWidth={1} />, count: 3200 },
    { name: 'Design & Création', icon: <PenTool size={40} strokeWidth={1} />, count: 6320 },
    { name: 'Finance & Compta', icon: <DollarSign size={40} strokeWidth={1} />, count: 4100 },
    { name: 'RH & Recrutement', icon: <HeartHandshake size={40} strokeWidth={1} />, count: 3200 },
  ];

  const categorySectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Testimonial Timeline Section
  const TestimonialTimeline = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end end"],
    });
    const scaleY = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    });

    const testimonials = [
      {
        name: 'Amina Diallo',
        role: 'Développeuse Full-Stack',
        company: 'chez Innovatech',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256',
        quote: "BantuHire a été un game-changer. J'ai trouvé un poste qui correspond parfaitement à mes compétences en moins de deux semaines. La plateforme est incroyablement intuitive.",
        type: 'candidate',
      },
      {
        name: 'Thomas Dubois',
        role: 'Responsable RH',
        company: 'chez NextGen Corp',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256',
        quote: "Nous avons recruté trois ingénieurs talentueux grâce à BantuHire. Les outils de filtrage et la qualité des profils nous ont fait gagner un temps précieux.",
        type: 'employer',
      },
      {
        name: 'Léa N\'diaye',
        role: 'Marketing Digital Manager',
        company: 'chez Creative Pulse',
        avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=256',
        quote: "La visibilité des offres et les alertes personnalisées sont des atouts majeurs. C'est la meilleure plateforme pour faire évoluer sa carrière en Afrique.",
        type: 'candidate',
      },
    ];

    const TestimonialCard = ({ item, index }) => {
      const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
      const isEven = index % 2 === 0;

      return (
        <div ref={ref} className={`flex items-start gap-6 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-5/12"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200/80 h-full">
              <p className="text-gray-600 italic mb-4">"{item.quote}"</p>
              <div className="flex items-center">
                <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-green-200" />
                <div>
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role} <span className="text-green-600">{item.company}</span></p>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="hidden lg:flex w-2/12 items-center justify-center relative">
            <div className="w-1 h-full bg-gray-200"></div>
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              className="absolute w-10 h-10 bg-white rounded-full border-4 border-green-500 flex items-center justify-center shadow-md"
            >
              {item.type === 'candidate' ? <User className="w-5 h-5 text-green-600" /> : <Building className="w-5 h-5 text-green-600" />}
            </motion.div>
          </div>
        </div>
      );
    };

    return (
      <section className="bg-gray-50 py-16 md:py-24" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">La Chronologie du Succès</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Découvrez comment BantuHire transforme les carrières et les entreprises, un succès à la fois.</p>
          </motion.div>
          <div className="relative">
            <motion.div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 hidden lg:block" style={{ transform: 'translateX(-50%)' }} />
            <motion.div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-green-600 hidden lg:block" style={{ scaleY, transformOrigin: 'top', transform: 'translateX(-50%)' }} />
            <div className="space-y-12 lg:space-y-24">
              {testimonials.map((item, index) => <TestimonialCard key={index} item={item} index={index} />)}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // CTA Section
  const CtaSection = () => {
    return (
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-br from-[#0A2342] to-[#0a2e55] rounded-2xl p-8 md:p-12 text-center overflow-hidden relative shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-500/10 rounded-full filter blur-xl"></div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-green-500/10 rounded-full filter blur-2xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Prêt à faire le grand saut ?
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
                Que vous soyez un talent à la recherche de sa prochaine mission ou une entreprise en quête de la perle rare, votre avenir commence ici.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#009739] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#007a2f] transition-colors duration-300 shadow-lg hover:shadow-xl cursor-pointer group"
                >
                  <span className="flex items-center justify-center">
                    Trouver un emploi
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer group"
                >
                  Publier une offre
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
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
      <header className={`sticky top-0 z-50 transition-all duration-300 border-b border-gray-200/10 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center gap-8 text-sm font-medium">
              <div className={`text-2xl font-bold hover:scale-105 transition-transform duration-300 cursor-pointer ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                BantuHire
              </div>
              <div className="hidden md:flex items-center gap-8">
                <DropdownMenu title="Pour les Candidats" items={candidateItems} scrolled={isScrolled} isEmployer={false} />
                <DropdownMenu title="Pour les Employeurs" items={employerItems} scrolled={isScrolled} isEmployer={true} />
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
                    <MobileAccordionMenu title="Pour les Candidats" items={candidateItems} scrolled={isScrolled} isEmployer={false} />
                    <MobileAccordionMenu title="Pour les Employeurs" items={employerItems} scrolled={isScrolled} isEmployer={true} />
                    <li className={`border-t my-2 mx-4 ${isScrolled ? 'border-gray-200' : 'border-white/10'}`}></li>
                    <li><a href="#" className={`flex items-center px-4 py-2 rounded-md ${isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}><User className="w-4 h-4 mr-2" /> Se connecter</a></li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:pt-20 text-white">
        <motion.div
          className="text-left max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Trouvez Votre Prochaine Opportunité
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-10 max-w-7xl mx-auto">
            Explorez des milliers d'offres d'emploi et connectez-vous avec les meilleures entreprises.
          </motion.p>
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
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">Offres en Feu <Flame className="text-orange-500" /></h2>
              <div className="space-y-4">
                {featuredJobs.map((job, index) => (
                  <FeaturedJobCard key={index} {...job} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 md:py-24" ref={categoriesRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Catégories Populaires</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">Trouvez des opportunités dans les secteurs qui recrutent le plus.</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" variants={categorySectionVariants} initial="hidden" animate={categoriesInView ? "visible" : "hidden"}>
            {popularCategories.map((category, index) => (
              <CategoryCard key={index} {...category} isInView={categoriesInView} />
            ))}
          </motion.div>
        </div>
      </section>

      <TestimonialTimeline />
      <CtaSection />
      <Footer />
      <InscriptionEntreprise isOpen={isInscriptionOpen} onClose={() => setIsInscriptionOpen(false)} />
    </div>
  );
}