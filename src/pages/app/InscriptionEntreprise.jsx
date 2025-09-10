import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { X, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Welcome1 from '../../assets/assets_application/welcome1.png';

const InscriptionEntreprise = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const navigate = useNavigate();

  // Pre-filled user data
  const userData = {
    nom: 'Kana',
    prenom: 'Alma',
    email: 'kanaalma249@gmail.com',
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleCreateAccount = () => {
    navigate('/dashboardEntreprise');
  };

  // Optimized animations
  const popupVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3, // Faster duration
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4, // Faster duration
        ease: 'easeOut',
      },
    },
  };

  const formVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4, // Faster duration
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    float: {
      y: [-10, 10],
      rotate: [-1, 1],
      transition: {
        y: { repeat: Infinity, repeatType: 'reverse', duration: 2.5, ease: 'easeInOut' },
        rotate: { repeat: Infinity, repeatType: 'reverse', duration: 3.5, ease: 'easeInOut' },
      },
    },
  };

  const backgroundVariants = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="bg-gradient-to-br from-[#0A2342] to-[#0a2e55] w-full max-w-5xl h-[85vh] overflow-y-auto rounded-2xl relative shadow-2xl"
            variants={containerVariants}
          >
            {/* Close Button with Animation */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-green-400 z-50"
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={32} strokeWidth={2} />
            </motion.button>

            {/* Floating Decorative Elements */}
            <motion.div
              className="absolute top-10 left-10 w-20 h-20 bg-green-500/20 rounded-full filter blur-xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-32 h-32 bg-red-500/20 rounded-full filter blur-2xl"
              animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Main Content */}
            <motion.div
              className="flex flex-col lg:flex-row py-12"
              variants={containerVariants}
            >
              {/* Left Section */}
              <motion.div
                className="w-full lg:w-1/2 bg-gradient-to-b from-[#0A2342] to-green-900/50 flex flex-col items-center px-6 lg:px-12 py-12 text-white relative"
                variants={itemVariants}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(45deg, rgba(0,150,55,0.2), rgba(37,99,235,0.2), rgba(239,68,68,0.2))',
                    backgroundSize: '200% 200%',
                  }}
                  variants={backgroundVariants}
                  animate="animate"
                />
                <motion.h1
                  className="text-3xl md:text-4xl font-bold mb-8 text-center lg:text-left leading-tight tracking-tight"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, color: '#22c55e' }}
                >
                  Complétez Votre Profil Entreprise
                </motion.h1>
                <motion.p
                  className="text-base text-center lg:text-left mb-12 opacity-90 max-w-lg"
                  variants={itemVariants}
                  style={{ textShadow: '0 0 10px rgba(255,255,255,0.2)' }}
                >
                  Finalisez votre profil pour accéder à notre plateforme et recruter les meilleurs talents. Ajoutez les informations de votre entreprise pour commencer dès aujourd'hui.
                </motion.p>
                <motion.div
                  className="w-full flex justify-center relative"
                  variants={imageVariants}
                  initial="hidden"
                  animate={["visible", "float"]}
                >
                  <img
                    src={Welcome1}
                    alt="Welcome Illustration"
                    className="max-w-[80%] h-auto drop-shadow-2xl"
                  />
                  <motion.div
                    className="absolute -top-4 -right-4 w-12 h-12 bg-red-500/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>
              </motion.div>

              {/* Right Section - Form */}
              <motion.div
                className="w-full lg:w-1/2 bg-white px-6 lg:px-12 py-12 relative"
                variants={formVariants}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-blue-100/50 to-transparent"
                  style={{ scaleY }}
                />
                <motion.h2
                  className="text-blue-800 text-3xl lg:text-4xl font-bold mb-8 text-center underline decoration-green-400 underline-offset-8"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, color: '#1e40af' }}
                >
                  Complétez Votre Profil
                </motion.h2>

                {/* Vos informations Personnelles */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-green-500" /> Informations Personnelles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-8">
                    {[
                      { id: "nom", label: "Nom", value: userData.nom, disabled: true },
                      { id: "prenom", label: "Prénom", value: userData.prenom, disabled: true },
                      { id: "adresseEmail", label: "Adresse Email", value: userData.email, disabled: true, colSpan: "md:col-span-2" },
                      { id: "telephone", label: "Téléphone" },
                      { id: "intitulePoste", label: "Intitulé de Votre Poste" },
                      { id: "fonctionEntreprise", label: "Votre Fonction", colSpan: "md:col-span-2" },
                    ].map((field) => (
                      <motion.div
                        key={field.id}
                        className={field.colSpan || ""}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        <label htmlFor={field.id} className="block text-sm font-medium text-blue-800 mb-2">
                          {field.label}<span className="text-red-500">*</span>
                        </label>
                        <motion.input
                          type={field.id === "adresseEmail" ? "email" : "text"}
                          id={field.id}
                          value={field.value}
                          disabled={field.disabled}
                          className={`block w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-blue-500 bg-blue-50/50 text-blue-900 placeholder-blue-400/70 transition-all duration-300 ${
                            field.disabled ? 'opacity-60 cursor-not-allowed' : ''
                          }`}
                          whileFocus={!field.disabled ? { scale: 1.01, borderColor: '#22c55e' } : {}}
                        />
                      </motion.div>
                    ))}
                    <motion.div className="md:col-span-2" variants={itemVariants}>
                      <label className="block text-sm font-medium text-blue-800 mb-2">Sexe<span className="text-red-500">*</span></label>
                      <div className="flex items-center space-x-6">
                        {["Homme", "Femme"].map((gender) => (
                          <motion.label
                            key={gender}
                            className="flex items-center"
                            whileHover={{ scale: 1.05 }}
                          >
                            <input
                              type="radio"
                              name="sexe"
                              value={gender.toLowerCase()}
                              className="focus:ring-green-400 h-5 w-5 text-blue-600 border-blue-300"
                            />
                            <span className="ml-2 text-blue-800">{gender}</span>
                          </motion.label>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Informations De L'entreprise */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-green-500" /> Informations de l'Entreprise
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-8">
                    {[
                      { id: "nomEntreprise", label: "Nom de l'entreprise", colSpan: "md:col-span-2" },
                      { id: "niu", label: "NIU", colSpan: "md:col-span-2" },
                      { id: "pays", label: "Pays", colSpan: "md:col-span-2", type: "select" },
                      { id: "ville1", label: "Ville 1", colSpan: "md:col-span-2" },
                      { id: "ville2", label: "Ville 2 (optionnel)", colSpan: "md:col-span-2" },
                      { id: "quartier", label: "Quartier", colSpan: "md:col-span-2" },
                      { id: "codePostal", label: "Code postal", colSpan: "md:col-span-2" },
                      { id: "adresse", label: "Adresse", colSpan: "md:col-span-2" },
                    ].map((field) => (
                      <motion.div
                        key={field.id}
                        className={field.colSpan || ""}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      >
                        <label htmlFor={field.id} className="block text-sm font-medium text-blue-800 mb-2">
                          {field.label}<span className={field.id === "ville2" ? "" : "text-red-500"}>*</span>
                        </label>
                        {field.type === "select" ? (
                          <motion.select
                            id={field.id}
                            className="block w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-blue-500 bg-blue-50/50 text-blue-900 transition-all duration-300"
                            whileFocus={{ scale: 1.01, borderColor: '#22c55e' }}
                          >
                            <option value="">Choisir votre pays</option>
                            <option value="Cameroun">Cameroun</option>
                            <option value="France">France</option>
                          </motion.select>
                        ) : (
                          <motion.input
                            type="text"
                            id={field.id}
                            className="block w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-blue-500 bg-blue-50/50 text-blue-900 placeholder-blue-400/70 transition-all duration-300"
                            whileFocus={{ scale: 1.01, borderColor: '#22c55e' }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex flex-col-reverse sm:flex-row justify-between items-center mt-12 gap-4"
                  variants={itemVariants}
                >
                  <motion.button
                    className="px-6 py-3 rounded-lg bg-red-500/10 text-red-600 border-2 border-red-400 font-semibold hover:bg-red-500/20 transition-colors duration-300"
                    whileHover={{ scale: 1.05, boxShadow: '0 6px 15px rgba(239,68,68,0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                  >
                    Annuler
                  </motion.button>
                  <motion.button
                    className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition-colors duration-300"
                    whileHover={{ scale: 1.05, boxShadow: '0 6px 15px rgba(37,99,235,0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreateAccount}
                  >
                    Créer votre compte
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InscriptionEntreprise;