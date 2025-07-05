import React from 'react';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const JobCard = () => {
  const jobData = [
    {
      title: "Stage - Graphic & Motion Designer",
      company: "ATOM TECH",
      location: "Douala, akwa",
      publicationDate: "30/06/2025",
      contractType: "Stage",
      workType: "Temps plein"
    },
    {
      title: "Stage - Graphic & Motion Designer",
      company: "ATOM TECH",
      location: "Douala, akwa",
      publicationDate: "30/06/2025",
      contractType: "Stage",
      workType: "Temps plein"
    },
    {
      title: "Stage - Graphic & Motion Designer",
      company: "ATOM TECH",
      location: "Douala, akwa",
      publicationDate: "30/06/2025",
      contractType: "Stage",
      workType: "Temps plein"
    },
    {
      title: "Stage - Graphic & Motion Designer",
      company: "ATOM TECH",
      location: "Douala, akwa",
      publicationDate: "30/06/2025",
      contractType: "Stage",
      workType: "Temps plein"
    },
    {
      title: "Stage - Graphic & Motion Designer",
      company: "ATOM TECH",
      location: "Douala, akwa",
      publicationDate: "30/06/2025",
      contractType: "Stage",
      workType: "Temps plein"
    },
    {
      title: "Stage - Graphic & Motion Designer",
      company: "ATOM TECH",
      location: "Douala, akwa",
      publicationDate: "30/06/2025",
      contractType: "Stage",
      workType: "Temps plein"
    },
    {
      title: "Stage - Graphic & Motion Designer",
      company: "ATOM TECH",
      location: "Douala, akwa",
      publicationDate: "30/06/2025",
      contractType: "Stage",
      workType: "Temps plein"
    },
    {
      title: "Stage - Graphic & Motion Designer",
      company: "ATOM TECH",
      location: "Douala, akwa",
      publicationDate: "30/06/2025",
      contractType: "Stage",
      workType: "Temps plein"
    },
    {
      title: "Stage - Graphic & Motion Designer",
      company: "ATOM TECH",
      location: "Douala, akwa",
      publicationDate: "30/06/2025",
      contractType: "Stage",
      workType: "Temps plein"
    }
  ];

  const JobCardItem = ({ title, company, location, publicationDate, contractType, workType }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      
      {/* Header with logo and company */}
      <div className="mb-4">
        <div className="flex flex-col gap-3">
          <div className='flex '>
            <div className="w-25 h-25 bg-gray-100 rounded-lg flex items-center justify-center self-start">
            <span className="text-xs font-semibold text-gray-600">Bantulink</span>
          </div>
          <div className='mt-7 ml-3 font-semibold text-xl'> ATOM TECH</div>
          </div>
          
          <h3 className="font-semibold underline text-gray-900 text-lg leading-tight">
            {title}
          </h3>
        </div>
      </div>

      {/* Publication date */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <Calendar className="w-4 h-4" />
        <span>Date de publication : {publicationDate}</span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
        <span className="font-medium">Localisation :</span>
        <span>{location}</span>
      </div>

      {/* Job details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
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
        viewport={{ once: true, amount: 0.1 }} // Anime une seule fois lorsque 30% de l'élément est visible
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
    
     <div className="min-h-screen ">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-emerald-400">Vos resultats de recherche</h1>
            </div>
           
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {jobData.map((job, index) => (
            <JobCardItem
              key={index}
              title={job.title}
              company={job.company}
              location={job.location}
              publicationDate={job.publicationDate}
              contractType={job.contractType}
              workType={job.workType}
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-start">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
            Afficher plus
          </button>
        </div>
      </div>
    </div>

    </motion.section>
    </>
  );
};

export default JobCard;