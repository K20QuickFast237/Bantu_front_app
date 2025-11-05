import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const JobItem = ({ job }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Link to={`/jobOffers/${job.id}`} className="block h-full">
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
          <div className="flex-grow">
            <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2">
              {job.titre_poste}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Calendar className="w-4 h-4" />
              <span>{t('jobs.publishedOn')} {job.date_publication}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <MapPin className="w-4 h-4" />
              <span>{job.ville}, {job.pays}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="capitalize">{job.type_contrat}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 text-right">
            <span className="text-sm font-medium text-orange-500 hover:text-orange-600">
              {t('jobs.viewOffer')}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const CompanyJobCard = ({ jobs }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [jobs]);

  if (!jobs || jobs.length === 0) {
    return <p className="text-center text-gray-500 py-10">{t('jobs.noJobs')}</p>;
  }

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const paginatedJobs = jobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedJobs.map((job) => (
            <JobItem key={job.id} job={job} />
          ))}
        </div>
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-gray-700 font-medium">
            {t('jobs.page')} {currentPage} {t('jobs.of')} {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyJobCard;