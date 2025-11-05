import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import api from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import BantulinkLoader from '../ui/BantulinkLoader';
import { useTranslation } from 'react-i18next';

const JobCard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      api.get(`/matching/candidate/${user.id}`)
        .then(res => setJobData(res.data || []))
        .catch(() => setJobData([]))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const JobCardItem = ({ title, company, location, publicationDate, contractType, workType, logo}) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="mb-4">
        <div className="flex flex-col gap-3">
          <div className='flex '>
            <div className="w-25 h-25 bg-gray-100 rounded-lg flex items-center justify-center self-start">
                <img src={`/storage/public/${logo}`} alt={t('jobMatching.companyLogoAlt')} className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
            </div>
            <div className='mt-7 ml-3 font-semibold text-xl'>{company}</div>
          </div>
          <Link to="/jobOffers"> 
            <h3 className="font-semibold underline hover:decoration-0 text-gray-900 text-lg leading-tight">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <Calendar className="w-4 h-4" />
        <span>{t('jobMatching.publicationDate')} {publicationDate}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
        <span className="font-medium">{t('jobMatching.location')} :</span>
        <span>{location}</span>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{contractType}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{workType}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="min-h-screen ">
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {loading ? (
                <div className="col-span-3 text-center text-gray-500"><BantulinkLoader/></div>
              ) : jobData.length === 0 ? (
                <div className="col-span-3 text-center text-gray-500">{t('jobMatching.noOffersFound')}</div>
              ) : (
                jobData.map((job, index) => (
                  <JobCardItem
                    key={job.id || index}
                    title={job.titre_poste}
                    company={job.nom_entreprise || job.company}
                    logo={job.logo}
                    location={job.lieu_travail || job.location}
                    publicationDate={job.date_publication || job.publicationDate}
                    contractType={job.type_contrat || job.contractType}
                    workType={job.workType || t('jobMatching.fullTime')}
                  />
                ))
              )}
            </div>
            <div className="flex justify-start">
              <Link to={"/rechercheOffre"}>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                  {t('jobMatching.showMore')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default JobCard;