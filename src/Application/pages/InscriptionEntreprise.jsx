import React from 'react';
import { motion } from 'framer-motion';
import Welcome1 from '../../assets/assets_application/Welcome1.png';
import Header from '../components/Header';
import Footer from '../../components/Footer';

const InscriptionEntreprise = () => {
  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const formVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <Header />
      <motion.div 
        className="min-h-screen flex flex-col lg:flex-row pb-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Section - Gradient Background and Image */}
        <motion.div 
          className="w-full lg:w-1/2 bg-gradient-to-b pt-30 from-blue-900 to-emerald-700 flex flex-col items-center px-6 lg:px-12 py-12 text-white"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-2xl md:text-3xl font-bold mb-6 lg:mb-10 text-center lg:text-left leading-tight"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Augmentez Votre Attractivité Et Recrutez Facilement Dès Aujourd'hui
          </motion.h1>
          
          <motion.p 
            className="text-sm text-center lg:text-left mb-8 lg:mb-12 opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel pharetra urna.
            Ornare iaculis mauris, Cras facilisis dictum feugiat. Nam et placerat arcu.
            Fusce non pulvinar sapien. Ut maximus ex felis, nec pharetra sapien aliquet.
            Curabitur tincidunt risus, Nec tempor augue ante id orci. Ut semper elit et amet vulputate,
            eget tristique nunc. Ut laoreet, sapien et cursus luctus, velit dolor ornare sem,
            Convallis blandit ipsum. Ut varius luctus ligula. Ac molestie dolor fringilla vel.
            Maecenas luctus magna at tortor pretium et id ante. Sed non auctor quam.
            Morbi a enim purus. Nulla in vulpu
          </motion.p>
          
          <motion.div 
            className="w-full flex justify-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <img src={Welcome1} alt="Welcome Illustration" className="max-w-full h-auto" />
          </motion.div>
        </motion.div>

        {/* Right Section - Form */}
        <motion.div 
          className="w-full lg:w-1/2 bg-white border-b pt-30 border-emerald-600 pb-10 px-6 lg:px-12"
          variants={formVariants}
        >
          <motion.h2 
            className="text-orange-500 text-2xl lg:text-3xl underline font-bold mb-6 lg:mb-8 text-center"
            whileHover={{ scale: 1.02 }}
          >
            Création De Compte
          </motion.h2>

          {/* Vos informations Personnelles */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Vos informations Personnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
              {[
                { id: "nom", label: "Nom" },
                { id: "prenom", label: "Prénom" },
                { id: "adresseEmail", label: "Adresse Email", colSpan: "md:col-span-2" },
                { id: "telephone", label: "Téléphone" },
                { id: "intitulePoste", label: "Intitulé De Votre Poste" },
                { id: "fonctionEntreprise", label: "Votre Fonction Dans L'Entreprise", colSpan: "md:col-span-2" }
              ].map((field) => (
                <motion.div 
                  key={field.id}
                  className={field.colSpan || ""}
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}<span className="text-red-500">*</span>
                  </label>
                  <input
                    type={field.id === "adresseEmail" ? "email" : "text"}
                    id={field.id}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
                  />
                </motion.div>
              ))}

              <motion.div 
                className="md:col-span-2"
                variants={itemVariants}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">Sexe<span className="text-red-500">*</span></label>
                <div className="flex items-center space-x-6 mt-1">
                  {["Homme", "Femme"].map((gender) => (
                    <label key={gender} className="flex items-center">
                      <input 
                        type="radio" 
                        name="sexe" 
                        value={gender.toLowerCase()} 
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" 
                      />
                      <span className="ml-2 text-gray-700">{gender}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Informations De L'entreprise */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations De L'entreprise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
              {[
                { id: "nomEntreprise", label: "Nom de l'entreprise", colSpan: "md:col-span-2" },
                { id: "niu", label: "NIU", colSpan: "md:col-span-2" },
                { id: "pays", label: "Pays", colSpan: "md:col-span-2", type: "select" },
                { id: "ville", label: "Ville", colSpan: "md:col-span-2" },
                { id: "codePostal", label: "Code postal", colSpan: "md:col-span-2" },
                { id: "adresse", label: "Adresse", colSpan: "md:col-span-2" }
              ].map((field) => (
                <motion.div 
                  key={field.id}
                  className={field.colSpan || ""}
                  whileHover={{ scale: 1.01 }}
                >
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}<span className="text-red-500">*</span>
                  </label>
                  {field.type === "select" ? (
                    <select
                      id={field.id}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
                    >
                      <option value="">Choisir votre pays</option>
                      <option value="Cameroun">Cameroun</option>
                      <option value="France">France</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      id={field.id}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col-reverse sm:flex-row justify-between items-center mt-10 gap-4"
            variants={itemVariants}
          >
            <motion.button 
              className="text-orange-500 rounded-md hover:underline text-xs border-2 p-2 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Annuler la création de compte
            </motion.button>
            <motion.button 
              className="px-6 py-3 text-xs rounded-md bg-orange-500 text-white font-semibold shadow-md hover:bg-orange-600 transition-colors duration-200"
              whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Créer votre compte recruteur
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
};

export default InscriptionEntreprise;