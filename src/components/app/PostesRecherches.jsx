import React from 'react';
import { Edit, Briefcase, MapPin, FileText, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PostesRecherches = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-[95%] mx-auto my-8 border border-gray-200">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 pb-4">
        <h2 className="text-xl font-semibold text-blue-800">{t('postesRecherches.title')}</h2>
        <button className="flex items-center border-2 p-2 border-gray-300 shadow-md rounded-lg text-blue-600
                   hover:text-white hover:bg-blue-600 animate-pulse font-medium text-sm">
                    <Edit size={16} className="mr-1" />
                    {t('postesRecherches.edit')}
                  </button>
      </div>

      {/* Content Section */}
      <div className="space-y-6"> {/* Espacement vertical entre les groupes de critères */}

        {/* Métiers recherchés */}
        <div className="flex items-start">
          <p className="w-56  text-sm mt-1">{t('postesRecherches.mostRepresentativeJobs')}</p>
          <div className="flex flex-wrap gap-2 flex-grow">
            {/* Les "tags" sont des boutons stylisés ici */}
            <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-md flex items-center">
              {t('postesRecherches.graphiste')}
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-md flex items-center">
              {t('postesRecherches.fullStackDeveloper')}
            </span>
          </div>
        </div>

        {/* Lieux recherchés */}
        <div className="flex items-start">
          <p className="w-56  text-sm mt-1">{t('postesRecherches.searchLocations')}</p>
          <div className="flex flex-wrap gap-2 flex-grow">
            <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-md flex items-center">
              <MapPin size={14} className="mr-1 text-emerald-700" /> {/* Icône de localisation */}
              {t('postesRecherches.douala')}
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-md flex items-center">
              <MapPin size={14} className="mr-1 text-emerald-700" />
              {t('postesRecherches.douala')}
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-md flex items-center">
              <MapPin size={14} className="mr-1 text-emerald-700" />
              {t('postesRecherches.douala')}
            </span>
          </div>
        </div>

        {/* Type de Contrat */}
        <div className="flex items-start">
          <p className="w-56 text-sm mt-1">{t('postesRecherches.contractType')}</p>
          <div className="flex flex-wrap gap-2 flex-grow">
            <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-md flex items-center">
              <FileText size={14} className="mr-1 text-emerald-700" /> {/* Icône de document */}
              {t('postesRecherches.cdi')}
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-md flex items-center">
              <FileText size={14} className="mr-1 text-emerald-700" />
              {t('postesRecherches.freelance')}
            </span>
          </div>
        </div>

        {/* Niveau D'expérience */}
        <div className="flex items-start">
          <p className="w-56  text-sm mt-1">{t('postesRecherches.experienceLevel')}</p>
          <div className="flex flex-wrap gap-2 flex-grow">
            <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-md flex items-center">
              <Calendar size={14} className="mr-1 text-emerald-700" /> {/* Icône de calendrier */}
              {t('postesRecherches.years3to5')}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostesRecherches;