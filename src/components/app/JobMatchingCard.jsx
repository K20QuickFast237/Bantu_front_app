import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, FileText, Award, ChevronLeft, ChevronRight } from 'lucide-react'; // Icônes mises à jour
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import api from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import BantulinkLoader from '../ui/BantulinkLoader';
import MatchingScoreCircle from './MatchingScoreCircle'; // Import du nouveau composant
import { encodeId } from '@/obfuscate';

const JobMatchingCard = () => {
  const { user } = useAuth();
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 9;

  useEffect(() => {
    if (user?.id) {
      api.get(`/matching/candidate/${user.id}`)
        .then(res => setJobData(res.data || []))
        .catch(() => setJobData([]))
        .finally(() => setLoading(false));
    }
  }, [user]);

  // Calculs pour la pagination
  const totalPages = Math.ceil(jobData.length / JOBS_PER_PAGE);
  const paginatedJobs = jobData.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };


  const JobCardItem = ({ job }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Link to={`/jobOffers/${encodeId(job.offre_id || job.id)}`} className="block h-full">
        <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg hover:border-orange-300 transition-all duration-300 h-full flex flex-col">
          {/* En-tête de la carte */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                <img src={job.logo} alt={`${job.nom_entreprise} logo`} className="w-full h-full object-contain p-1" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-md leading-tight">{job.nom_entreprise}</h4>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3" />
                  Publié le: {new Date(job.date_publication).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
            <MatchingScoreCircle score={parseFloat(job.score)} size={48} />
          </div>

          {/* Titre du poste */}
          <h3 className="font-semibold text-lg text-gray-900 my-2 hover:text-orange-600 transition-colors">
            {job.titre}
          </h3>

          {/* Détails sous forme de badges */}
          <div className="flex flex-wrap gap-2 text-xs mt-auto pt-4">
            <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full"><MapPin size={12} /> {job.lieu_travail}</span>
            <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full"><FileText size={12} /> {job.type_contrat}</span>
            <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full"><Award size={12} /> {job.experience_requise}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="mb-4">
          <div className="bg-white border-b border-gray-200">
            <div className="mx-auto px-4 sm:px-6 lg:px-8"></div>
          </div>
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {loading ? (
                <div className="col-span-3 text-center text-gray-500"><BantulinkLoader/></div>
              ) : jobData.length === 0 ? (
                <div className="col-span-3 text-center text-gray-500">Aucune offre trouvée.</div>
              ) : (
                paginatedJobs.map((job) => <JobCardItem key={job.offre_id || job.id} job={job} />)
              )}
            </div>
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
                  Page {currentPage} sur {totalPages}
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
        </div>
      </motion.section>
    </>
  );
};

export default JobMatchingCard;