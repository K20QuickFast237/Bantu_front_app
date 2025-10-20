import React from 'react';
import { Camera, Mail, Phone, User, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

const Infopersonelles = ({ onEditClick }) => {
  const { user, particulier } = useAuth();

  // Affichage des infos si particulier existe
  if (particulier) {
    return (
      <div className="p-4 sm:p-6 rounded-lg shadow-md max-w-[95%] mx-auto mb-8 mt-5 border border-gray-200">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-blue-800">Informations Personnelles</h2>
            <button
              onClick={onEditClick}
              className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 font-medium text-sm"
            >
              <Edit size={16} className="mr-1" />
              Modifier
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-start mb-6 gap-6">
            <div className="flex justify-center md:justify-start">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border border-gray-300">
                {particulier.image_profil ? (
                  <img src={particulier.image_profil} alt="Profil" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <User size={50} className="text-gray-500 sm:size-[60px]" />
                )}
              </div>
            </div>
            <div className="flex-grow w-full">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                {user?.prenom} {user?.nom}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{particulier.titre_professionnel}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-gray-700 text-sm">
                <div className="flex items-center">
                  <Phone size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                  <span>{particulier.telephone}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-gray-500 min-w-[16px]">📍</span>
                  <span className="truncate">{[particulier.adresse, particulier.ville, particulier.pays].filter(Boolean).join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                  <span>Âge : {new Date().getFullYear() - new Date(particulier.date_naissance).getFullYear()} ans</span>
                </div>
                <div className="flex items-center col-span-2">
                  <Mail size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                  <span className="truncate">{particulier.resume_profil}</span>
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                  <a href={particulier.cv_link} target="_blank" rel="noopener noreferrer" className="text-[#10B981] hover:underline truncate">
                    CV
                  </a>
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-2 text-gray-500 min-w-[16px]" />
                  <a href={particulier.lettre_motivation_link} target="_blank" rel="noopener noreferrer" className="text-[#10B981] hover:underline truncate">
                    Lettre de motivation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    );
  }

  // Si pas de particulier, on ne rend rien, car la modale sera affichée par le parent.
  return (
    null
  );
};

export default Infopersonelles;