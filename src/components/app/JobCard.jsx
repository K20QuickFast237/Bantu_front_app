import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import api from '@/services/api'; // 👈 ton instance axios déjà configurée

const JobCard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupération des offres depuis ton API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/offres');
        console.log(response.data.data); // 👈 appelle {{local_base_url}}/offres
        setJobs(response.data.data); // selon ton API : ajuste si c'est response.data.data
      } catch (err) {
        console.error("Erreur lors du chargement des offres :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const JobCardItem = ({ job }) => (
    <Link to={`/jobOffers/${job.id}`}>
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
        
        {/* Header with logo and company */}
        <div className="mb-4">
          <div className="flex flex-col gap-3">
            <div className='flex'>
              <div className="w-25 h-25 bg-gray-100 rounded-lg flex items-center justify-center self-start">
                <span className="text-xs font-semibold text-gray-600">Bantulink</span>
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
          {/* <span className="font-medium">Localisation :</span> */}
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
    </Link >
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
              <h1 className="text-2xl font-semibold text-emerald-400">Vos résultats de recherche</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <p className="text-center text-gray-500">Chargement des offres...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">Aucune offre trouvée.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {jobs.map((job) => (
              <JobCardItem
                key={job.id}
                job={job}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && jobs.length > 0 && (
          <div className="flex justify-start">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              Afficher plus
            </button>
          </div>
        )}
      </div>
    </div>
  </motion.section>
);
};

export default JobCard;
