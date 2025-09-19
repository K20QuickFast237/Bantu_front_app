import React from 'react';
import { Camera, Mail, Phone, Linkedin, User, Edit, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Infopersonelles = () => {
  return (
    <div className="p-4 sm:p-6 rounded-lg shadow-md max-w-[95%] mx-auto mb-8 mt-5 border border-gray-200">

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6  pb-4 gap-3">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800">Informations Personnelles</h2>
          <button className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600
           hover:text-white hover:bg-blue-600 animate-pulse font-medium text-sm">
            <Edit size={16} className="mr-1" />
            Modifier
          </button>
        </div>

        {/* Main Profile Section */}
        <div className="flex flex-col md:flex-row items-start mb-6 gap-6">
          {/* Profile Picture Placeholder */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-full flex items-center justify-center mr-0 md:mr-6 overflow-hidden border border-gray-300">
              <User size={50} className="text-gray-500 sm:size-[60px]" />
              <div className="absolute bottom-1 right-1  bg-white p-1 rounded-full shadow border border-gray-300">
                <Camera size={14} className="text-gray-500 sm:size-[16px]" />
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-grow  w-full">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">ABRAHAM TADZONG MBIPE</h3>
            <p className="text-sm text-gray-600 mb-4">Concepteur Et Développeur D'application</p>

            {/* Completion Bar */}
            <div className="flex flex-col w-1/2 sm:flex-row items-start sm:items-center mb-4 gap-2 sm:gap-0">
              <span className="text-[#10B981] text-2xl font-bold sm:mr-2">50%</span>
              <div className="flex-grow w-full sm:w-auto bg-gray-200 rounded-full h-2.5 sm:mr-4">
                <div
                  className="bg-[#10B981] h-2.5 rounded-full"
                  style={{ width: '50%' }}
                ></div>
              </div>
              <div className="text-sm text-gray-700">
                <span className="font-semibold text-[#10B981] sm:mr-1">Vous Êtes :</span>
                <span className="flex items-center border-2 border-gray-300 p-2 rounded-lg">
                  <span className="w-2 h-2 bg-[#10B981] rounded-full mr-1"></span>
                  En recherche active
                </span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-gray-700 text-sm">
              <div className="flex items-center">
                <Mail size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                <span className="truncate">tadzongmbipeabraham@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                <span>+237 674 882 527</span>
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                <span>Homme</span>
              </div>
              <div className="flex items-center">
                <Linkedin size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                <a href="http://linkedin.com/in/atomabraham" target="_blank" rel="noopener noreferrer" className="text-[#10B981] hover:underline truncate">
                  http://linkedin.com/in/atomabraham
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6  border-gray-200">
          {/* Stat Card 1 */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center border border-gray-200">
            <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">0</p>
            <p className="text-xs sm:text-sm text-gray-600">consultation<br/>de votre profil</p>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center border border-gray-200">
            <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">+15%</p>
            <p className="text-xs sm:text-sm text-gray-600">Offres consultés<br/>ces 15 derniers jours</p>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center border border-gray-200">
            <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">0</p>
            <p className="text-xs sm:text-sm text-gray-600">ajout aux favoris<br/>des recruteurs</p>
          </div>

          {/* Stat Card 4 - View all stats */}
          <div className="flex items-center justify-center p-3 sm:p-4 rounded-lg border border-gray-200 bg-gray-50">
            <a href="#" className="text-[#10B981]  underline text-center text-xs sm:text-sm">
              Voir toutes les<br/>statistiques
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Infopersonelles;