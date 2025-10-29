import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/services/api'; // 👈 ton instance axios déjà configurée
import BantulinkLoader from '../ui/BantulinkLoader';

const JobCard = ({ searchTerm, locationTerm, selectedContract, selectedEducation, paginationEnabled = false, limit = 6 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 9;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Récupération des offres depuis ton API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/offres');
        console.log(response.data.data); 
        setJobs(response.data.data); // selon ton API : ajuste si c'est response.data.data
      } catch (err) {
        console.error("Erreur lors du chargement des offres :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Fonction de filtrage en temps réel (fuzzy simple pour similarités)
  const filterJobs = (allJobs, filters) => {
    return allJobs.filter((job) => {
      const lowerSearch = filters.searchTerm.toLowerCase();
      const lowerLocation = filters.locationTerm.toLowerCase();
      
      // Matching partiel pour mots-clés (titre ou entreprise)
      const matchesSearch = !lowerSearch || 
        job.titre_poste.toLowerCase().includes(lowerSearch) || 
        (job.employeur?.nom_entreprise || '').toLowerCase().includes(lowerSearch);
      
      // Matching partiel pour localisation (ville ou pays)
      const matchesLocation = !lowerLocation || 
        job.ville.toLowerCase().includes(lowerLocation) || 
        job.pays.toLowerCase().includes(lowerLocation);
      
      // Matching exact pour contrat
      const matchesContract = !filters.selectedContract || job.type_contrat === filters.selectedContract;
      
      // Matching exact pour éducation (assume champ 'niveau_etude' dans job ; ajoute-le à ton API si besoin)
      const matchesEducation = !filters.selectedEducation || job.niveau_etude === filters.selectedEducation;
      
      return matchesSearch && matchesLocation && matchesContract && matchesEducation;
    });
  };

  // Update filteredJobs en temps réel sur changements de filters
  useEffect(() => {
    const filters = { searchTerm, locationTerm, selectedContract, selectedEducation };
    const newFiltered = filterJobs(jobs, filters);
    setFilteredJobs(newFiltered);
    console.log('Filtered jobs:', newFiltered); // Pour debug
  }, [jobs, searchTerm, locationTerm, selectedContract, selectedEducation]);

  // Calculs pour la pagination ou la limitation
  const jobsToDisplay = paginationEnabled
    ? filteredJobs.slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE)
    : filteredJobs.slice(0, limit);

  const totalPages = paginationEnabled ? Math.ceil(filteredJobs.length / JOBS_PER_PAGE) : 0;

  // Réinitialiser la page actuelle si les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, locationTerm, selectedContract, selectedEducation]);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const JobCardItem = ({ job }) => (
    <motion.div
      layout // Pour transitions fluides entre états
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Link to={`/jobOffers/${job.id}`}>
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          
          {/* Header with logo and company */}
          <div className="mb-4">
            <div className="flex flex-col gap-3">
              <div className='flex'>
                <div className="w-25 h-25 bg-gray-100 rounded-lg flex items-center justify-center self-start">
                  <img src={`/storage/public/${job.employeur.logo}`} alt="Bantulink Logo" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
                </div>
                <div className='mt-7 ml-3 font-semibold text-xl'>{job.employeur.nom_entreprise || "Entreprise inconnue"}</div>
              </div>
              
              <h3 className="font-semibold underline text-gray-900 text-lg leading-tight">
                {job.titre_poste}
              </h3>
            </div>
          </div>

          {/* Publication date */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Calendar className="w-4 h-4" />
            <span>Date de publication : {job.date_publication}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <MapPin className="w-4 h-4" />
            <span>Localisation : {job.ville}, {job.pays}</span>
          </div>

          {/* Job details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{job.type_contrat}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{job.workType || "Non spécifié"}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center">
                <h1 className="text-2xl font-semibold text-emerald-400">Offres d’emploi disponibles</h1>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {loading ? (
              <BantulinkLoader />
            ) : filteredJobs.length === 0 ? (
              <p className="text-center text-gray-500">Aucune offre trouvée.</p>
            ) : (
              <AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredJobs.map((job) => (
                    <JobCardItem
                      key={job.id}
                      job={job}
                    />
                  ))}
                </div>
              </AnimatePresence>
            )}

            {/* Load More Button */}
            {!loading && filteredJobs.length > 0 && (
              <div className="flex justify-start">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                  Afficher plus
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
   </motion.section>
  );
}

export default JobCard;