import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Calendar, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/services/api'; 
import { useTranslation } from 'react-i18next';
import BantulinkLoader from '../ui/BantulinkLoader';
import { encodeId } from '@/obfuscate';

// Sous-composant déplacé à l'extérieur pour la performance
const JobCardItem = ({ job, t }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    <Link to={`/jobOffers/${encodeId(job.id)}`}>
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 h-full">
        
        {/* Header with logo and company */}
        <div className="mb-4">
          <div className="flex flex-col gap-3">
            <div className='flex items-center'>
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={job.employeur?.logo || '/api/placeholder/64/64'} 
                  alt="Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div className='ml-3 font-semibold text-lg text-gray-800'>
                {job.employeur?.nom_entreprise || t('jobCard.unknownCompany')}
              </div>
            </div>
            <h3 className="font-semibold underline text-gray-900 text-lg leading-tight mt-2">
              {job.titre_poste}
            </h3>
          </div>
        </div>

        {/* Publication date */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{t('jobCard.publicationDate')} {job.date_publication}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{t('jobCard.location')} {job.ville}, {job.pays}</span>
        </div>

        {/* Job details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{job.type_contrat}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Briefcase className="w-4 h-4" />
            <span>{job.experience_requise || t('jobCard.notSpecified')}</span>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

const JobCard = ({ searchTerm = '', locationTerm = '', selectedContract = '', selectedEducation = '', paginationEnabled = false, limit = 6 }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 9;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Récupération des offres
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/offres');
        setJobs(Array.isArray(response.data) ? response.data : response.data.data || []);
      } catch (err) {
        console.error("Erreur lors du chargement des offres :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filtrage
  useEffect(() => {
    const filterJobs = () => {
      return jobs.filter((job) => {
        const lowerSearch = searchTerm.toLowerCase();
        const lowerLocation = locationTerm.toLowerCase();
        
        const matchesSearch = !lowerSearch || 
          job.titre_poste.toLowerCase().includes(lowerSearch) || 
          (job.employeur?.nom_entreprise || '').toLowerCase().includes(lowerSearch);
        
        const matchesLocation = !lowerLocation || 
          job.ville.toLowerCase().includes(lowerLocation) || 
          job.pays.toLowerCase().includes(lowerLocation);
        
        const matchesContract = !selectedContract || job.type_contrat === selectedContract;
        const matchesEducation = !selectedEducation || job.niveau_etude === selectedEducation;
        
        return matchesSearch && matchesLocation && matchesContract && matchesEducation;
      });
    };

    setFilteredJobs(filterJobs());
    setCurrentPage(1); // Reset pagination on filter change
  }, [jobs, searchTerm, locationTerm, selectedContract, selectedEducation]);

  // Pagination logic
  const jobsToDisplay = paginationEnabled
    ? filteredJobs.slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE)
    : filteredJobs.slice(0, limit);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-10 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <h1 className="text-2xl font-semibold text-emerald-400">
              {t('jobCard.availableJobs')}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-10 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <BantulinkLoader />
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">{t('jobCard.noJobsFound')}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <AnimatePresence mode="popLayout">
                {jobsToDisplay.map((job) => (
                  <JobCardItem key={job.id} job={job} t={t} />
                ))}
              </AnimatePresence>
            </div>
            
            {/* Pagination */}
            {paginationEnabled && totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-8">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-gray-700 font-medium">
                  Page {currentPage} sur {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Show More Button */}
            {!paginationEnabled && filteredJobs.length > limit && (
              <div className="flex justify-start mt-4">
                <Link 
                  to="/all-jobs" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  {t('jobCard.showMore')}
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </motion.section>
  );
};

export default JobCard;