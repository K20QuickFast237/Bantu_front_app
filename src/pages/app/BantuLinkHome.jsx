import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Briefcase, ShoppingCart, Users, TrendingUp, Shield, Globe, Star, ArrowRight, Menu, X, Zap, Heart, User, Settings, LogOut, FileText, UserPlus, Store, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Lottie from 'lottie-react';

import postulerAnimation from '../../assets/lotties_json/postuler.json'; 
import recruterAnimation from '../../assets/lotties_json/recruter.json';
import vendreAnimation from '../../assets/lotties_json/vendre.json';
import acheterAnimation from '../../assets/lotties_json/acheter.json';
import Footer from '@/components/app/footer';

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = React.useRef(null);

  // Effet pour gérer les clics en dehors du menu de profil
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si la référence au profil existe et que le clic n'est pas à l'intérieur
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false); // On ferme le menu
      }
    };

    // On ajoute l'écouteur d'événements uniquement si le menu est ouvert
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Nettoyage : on retire l'écouteur quand le composant est démonté ou que le menu se ferme
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]); // Cet effet se redéclenche chaque fois que isProfileOpen change

  return (
    <nav className="bg-[#0A2342] shadow-sm border-b border-white/10 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
            {/* Logo with pulse animation */}
            <div className="flex items-center cursor-pointer">
                <div className="text-2xl font-bold text-white hover:scale-105 transition-transform duration-300">
                Bantulink
                </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center relative" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)} 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-medium">Duclair</span>
                </button>

                <AnimatePresence>
                {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full right-0 mt-2 w-64 bg-[#102a4c] rounded-xl shadow-2xl border border-white/10 z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/10">
                        <p className="font-semibold text-white">Duclair</p>
                        <p className="text-sm text-gray-400">duclair.d@example.com</p>
                      </div>
                      <ul className="p-2">
                          <li><a href="#" className="flex items-center px-3 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white rounded-md transition-colors"><User className="w-5 h-5 mr-3 text-gray-400" /> Mon Profil</a></li>
                          <li><a href="#" className="flex items-center px-3 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white rounded-md transition-colors"><Settings className="w-5 h-5 mr-3 text-gray-400" /> Paramètres</a></li>
                          <li className="border-t border-white/10 my-2"></li>
                          <li><a href="#" className="flex items-center px-3 py-2.5 text-sm text-[#FF7F00] hover:bg-[#FF7F00]/10 rounded-md transition-colors"><LogOut className="w-5 h-5 mr-3" /> Déconnexion</a></li>
                      </ul>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>

            {/* Mobile menu button with rotation */}
            <div className="md:hidden">
                <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-[#FFD700] transition-all duration-300 cursor-pointer"
                >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                  <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="md:hidden overflow-hidden"
                  >
                  <div className="py-4 border-t border-white/20">
                      <ul className="flex flex-col space-y-2">
                      <li><a href="#" className="flex items-center px-4 py-2 text-white hover:bg-white/10 rounded-md"><User className="w-4 h-4 mr-2" /> Mon Profil</a></li>
                      <li><a href="#" className="flex items-center px-4 py-2 text-white hover:bg-white/10 rounded-md"><Settings className="w-4 h-4 mr-2" /> Paramètres</a></li>
                      <li><a href="#" className="flex items-center px-4 py-2 text-[#E30613] hover:bg-[#E30613]/20 rounded-md"><LogOut className="w-4 h-4 mr-2" /> Déconnexion</a></li>
                      </ul>
                  </div>
                  </motion.div>
              )}
            </AnimatePresence>
        </div>
    </nav>
  );
};

// Modal Component
const AccessModal = ({ isOpen, onClose, service }) => {
  const isHire = service === 'hire';
  const bgColor = isHire ? 'from-[#009739] to-[#007a2f]' : 'from-[#E30613] to-[#c00511]';
  const icon = isHire ? <Briefcase className="w-8 h-8 text-[#009739]" /> : <ShoppingCart className="w-8 h-8 text-[#E30613]" />;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 cursor-pointer"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 cursor-default relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${bgColor}`}></div>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all duration-300 cursor-pointer">
              <X size={24} />
            </button>
            <div className="text-center mt-4">
              <div className={`w-20 h-20 ${isHire ? 'bg-green-100' : 'bg-red-100'} rounded-full flex items-center justify-center mx-auto mb-6`}>
                {icon}
              </div>

          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Accéder à {isHire ? 'BantuHire' : 'BantuMarket'}
          </h3>
          
          <p className="text-gray-600 mb-8">
            {isHire 
              ? "Prêt à trouver votre prochain emploi de rêve ou recruter les meilleurs talents ?"
              : "Prêt à découvrir des produits incroyables ou développer votre business ?"
            }
          </p>

          <div className="space-y-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`w-full bg-gradient-to-r ${bgColor} text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-shadow duration-300 cursor-pointer group`}>
                {isHire ? 
                  <Link to="/hirehome">
                    <span className="flex items-center justify-center">
                      Continuer
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                  </Link>
                : 
                  <Link to="/markethome">
                    <span className="flex items-center justify-center">
                      Continuer
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                  </Link>
                }
              </motion.button>
            
              <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={onClose}
                className="w-full border-2 border-gray-300 text-gray-600 py-4 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
            >
              Plus tard
              </motion.button>
          </div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = '', duration = 2000, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime;
      const startCount = 0;
      
      const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };
      
      requestAnimationFrame(updateCount);
    }
  }, [end, duration, isInView]);

  return <span>{count}{suffix}</span>;
};

// Service Card Component
const ServiceCard = ({ service, onClick }) => {
  const isHire = service === 'hire';
  const config = {
    hire: {
      title: 'BantuHire',
      description: 'Trouvez le job de vos rêves ou recrutez les meilleurs talents. Offres d\'emploi, candidatures, et networking professionnel.',
      icon: <Briefcase className="w-8 h-8 text-[#009739]" />,
      bgColor: 'bg-green-100',
      borderColor: 'from-[#009739] to-[#007a2f]',
      buttonColor: 'bg-[#009739] hover:bg-[#007a2f]',
      features: [
        'Milliers d\'offres d\'emploi',
        'Matching intelligent candidats-employeurs',
        'Outils de recrutement avancés'
      ]
    },
    market: {
      title: 'BantuMarket',
      description: 'Marketplace nouvelle génération pour vendre et acheter en toute sécurité. Des milliers de produits et services à portée de clic.',
      icon: <ShoppingCart className="w-8 h-8 text-[#E30613]" />,
      bgColor: 'bg-red-100',
      borderColor: 'from-[#E30613] to-[#c00511]',
      buttonColor: 'bg-[#E30613] hover:bg-[#c00511]',
      features: [
        'Paiements sécurisés',
        'Livraison rapide et fiable',
        'Support vendeur 24/7'
      ]
    }
  };

  const current = config[service];

  return (
    <motion.div
      whileHover={{ y: -8, rotate: 1 }}
      className="group relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Animated top border */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${current.borderColor}`}></div>
      
      <div className="p-8 relative z-10">
        <div className={`w-16 h-16 ${current.bgColor} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
          {current.icon}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          {current.title}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {current.description}
        </p>
        
        <div className="space-y-3 mb-8">
          {current.features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center text-sm text-gray-600 group-hover:translate-x-2 transition-transform duration-300 cursor-pointer"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-2 h-2 ${isHire ? 'bg-[#009739]' : 'bg-[#E30613]'} rounded-full mr-3`}></div>
              {feature}
            </div>
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onClick(service)}
          className={`w-full ${current.buttonColor} text-white py-4 rounded-xl font-semibold transition-shadow duration-300 hover:shadow-lg cursor-pointer group/btn`}
        >
          <span className="flex items-center justify-center">
            Accéder à {current.title}
            <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform duration-300" />
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, color }) => {
  return (
    <motion.div whileHover={{ y: -8 }} className="text-center group cursor-pointer">
      <div className={`w-20 h-20 ${color} rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-[#FF7F00] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>
    </motion.div>
  );
};

// Quick Action Card Component for the Hero section
const QuickActionCard = ({ icon, title, description, onClick, animationData, color }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -10, scale: 1.05, shadow: 'lg' }}
      className={`bg-white/70 backdrop-blur-lg rounded-2xl p-6 text-center cursor-pointer border border-gray-200/50 shadow-md hover:shadow-xl transition-all duration-300 group`}
      onClick={onClick}
    >
      
        {/* Pour utiliser Lottie, remplacez la div ci-dessous par le composant Lottie. */}
        <Lottie animationData={animationData} loop={true} className="w-28 h-28 mx-auto" />
     
      {/* <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 ${color.bg}`}>
        {React.cloneElement(icon, { className: `w-10 h-10 ${color.text}` })}
      </div> */}
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {description}
      </p>
      <div className={`flex items-center justify-center font-semibold ${color.text} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
        Commencer
        <ArrowRight className="w-4 h-4 ml-2 transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300" />
      </div>
    </motion.div>
  );
};


// Testimonial Card Component
const TestimonialCard = ({ rating, text, name, role, color, icon }) => {
  return (
    <motion.div whileHover={{ y: -8 }} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group h-full flex flex-col">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-600 mb-6 italic group-hover:text-gray-700 transition-colors duration-300 flex-grow">
        {text}
      </p>
      <div className="flex items-center mt-auto">
        <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <div>
          <div className="font-semibold text-gray-900 group-hover:text-[#FF7F00] transition-colors duration-300">
            {name}
          </div>
          <div className="text-gray-600 text-sm">{role}</div>
        </div>
      </div>
    </motion.div>
  );
};

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const BantuLinkHome = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.5 });

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .cursor-pointer { cursor: pointer; }
      `}</style>

      <Navigation />

      {/* Hero Section */}
      <header className="bg-white pt-20 lg:pt-28 pb-20 relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-red-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }} 
              className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              La Super-App qui 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FF7F00] cursor-pointer hover:scale-105 transition-transform duration-300 inline-block ml-3">transforme votre avenir</span>
              <Zap className="inline-block w-12 h-12 text-[#FFD700] ml-4 hover:scale-110 transition-transform duration-300 cursor-pointer" />
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.2 }} 
              className="text-xl text-gray-600 mb-16 leading-relaxed hover:text-gray-700 transition-colors duration-300 cursor-pointer"
            >
              Que voulez-vous accomplir aujourd'hui ? Lancez-vous en un clic.
            </motion.p>

            {/* Quick Action Cards */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
              }}
            >
              <QuickActionCard 
                icon={<FileText />} animationData={postulerAnimation} title="Postuler" description="Trouvez le job de vos rêves parmi des milliers d'offres." 
                onClick={() => openModal('hire')} color={{bg: 'bg-green-100', text: 'text-[#009739]'}} />
              <QuickActionCard 
                icon={<UserPlus />} animationData={recruterAnimation} title="Recruter" description="Dénichez les meilleurs talents pour votre entreprise." 
                onClick={() => openModal('hire')} color={{bg: 'bg-green-100', text: 'text-[#009739]'}} />
              <QuickActionCard 
                icon={<Store />} animationData={vendreAnimation} title="Vendre" description="Créez votre boutique et touchez des milliers de clients." 
                onClick={() => openModal('market')} color={{bg: 'bg-red-100', text: 'text-[#E30613]'}} />
              <QuickActionCard 
                icon={<ShoppingBag />} animationData={acheterAnimation} title="Acheter" description="Explorez un marché unique et faites de bonnes affaires." 
                onClick={() => openModal('market')} color={{bg: 'bg-red-100', text: 'text-[#E30613]'}} />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="py-16 bg-[#F5F5F5]"
        ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group cursor-pointer">
              <div className="text-3xl md:text-4xl font-bold text-[#009739] mb-2 group-hover:scale-125 transition-transform duration-300">
                <AnimatedCounter end={50} suffix="K+" isInView={statsInView} />
              </div>
              <div className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300">Offres d'emploi</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl md:text-4xl font-bold text-[#E30613] mb-2 group-hover:scale-125 transition-transform duration-300">
                <AnimatedCounter end={100} suffix="K+" isInView={statsInView} />
              </div>
              <div className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300">Produits disponibles</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl md:text-4xl font-bold text-[#009739] mb-2 group-hover:scale-125 transition-transform duration-300">
                <AnimatedCounter end={25} suffix="K+" isInView={statsInView} />
              </div>
              <div className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300">Entreprises partenaires</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl md:text-4xl font-bold text-[#FF7F00] mb-2 group-hover:scale-125 transition-transform duration-300">
                <AnimatedCounter end={1} suffix="M+" isInView={statsInView} />
              </div>
              <div className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300">Utilisateurs actifs</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} className="bg-white">
          <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ServiceCard service="hire" onClick={openModal} />
              <ServiceCard service="market" onClick={openModal} />
          </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
              Pourquoi choisir Bantulink ?
              <Zap className="inline-block w-8 h-8 text-[#FFD700] ml-2 hover:scale-110 transition-transform duration-300 cursor-pointer" />
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto hover:text-gray-700 transition-colors duration-300 cursor-pointer">
              Une plateforme conçue pour répondre à tous vos besoins professionnels et commerciaux
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
            <FeatureCard
              icon={<Shield className="w-10 h-10 text-[#009739]" />}
              title="Sécurité maximale"
              description="Transactions sécurisées, données protégées et vérification d'identité pour tous nos utilisateurs"
              color="bg-green-100"
            />
            <FeatureCard
              icon={<TrendingUp className="w-10 h-10 text-[#E30613]" />}
              title="Croissance garantie"
              description="Algorithmes intelligents pour maximiser vos opportunités d'emploi et vos ventes"
              color="bg-red-100"
            />
            <FeatureCard
              icon={<Globe className="w-10 h-10 text-[#009739]" />}
              title="Portée internationale"
              description="Connectez-vous avec des opportunités et des clients du monde entier"
              color="bg-green-100"
            />
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600 hover:text-gray-700 transition-colors duration-300 cursor-pointer">
              Découvrez ce que nos utilisateurs pensent de Bantulink
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              rating={5}
              text="Grâce à BantuHire, j'ai trouvé le poste de mes rêves en seulement 2 semaines. L'interface est intuitive et les offres sont de qualité."
              name="Marie Dubois"
              role="Développeuse Web"
              color="bg-green-100"
              icon={<Users className="w-6 h-6 text-[#009739]" />}
            />
            <TestimonialCard
              rating={5}
              text="BantuMarket a révolutionné mon business. Mes ventes ont augmenté de 200% depuis que j'ai rejoint la plateforme."
              name="Jean Martin"
              role="Entrepreneur"
              color="bg-red-100"
              icon={<ShoppingCart className="w-6 h-6 text-[#E30613]" />}
            />
            <TestimonialCard
              rating={5}
              text="Une plateforme complète qui répond à tous mes besoins. Support client excellent et fonctionnalités innovantes."
              name="Sophie Chen"
              role="RH Manager"
              color="bg-green-100"
              icon={<Users className="w-6 h-6 text-[#009739]" />}
            />
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="py-20 bg-[#F5F5F5] relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-16 h-16 bg-green-200 opacity-20 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-red-200 opacity-20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-100 opacity-20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
            Prêt à commencer votre aventure ?
          </h2>
          <p className="text-xl text-gray-600 mb-10 hover:text-gray-700 transition-colors duration-300 cursor-pointer">
            Rejoignez des milliers d'utilisateurs qui font déjà confiance à Bantulink
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal('hire')}
              className="bg-[#E30613] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#c00511] transition-colors duration-300 shadow-lg hover:shadow-xl cursor-pointer group"
            >
              <span className="flex items-center justify-center">
                Commencer avec BantuHire
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -5, backgroundColor: '#007a2f' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal('market')}
              className="bg-[#009739] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer group"
            >
              <span className="flex items-center justify-center">
                Explorer BantuMarket
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer/>

      {/* Modal */}
      <AccessModal isOpen={modalOpen} onClose={closeModal} service={selectedService} />
    </div>
  );
};

export default BantuLinkHome;