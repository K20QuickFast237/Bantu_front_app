import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CompanyCard from './CompanyCard';
import api from '@/services/api';
import BantulinkLoader from '../ui/BantulinkLoader';
import { useTranslation } from 'react-i18next';

// Imports des images
import BantulinkLogo from '../../assets/assets_application/BantuLinkLogo.png';

const JobCarousel = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('graphiste');
  const jobCarouselRef = useRef(null);
  const companyCarouselRef = useRef(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Données factices pour les offres d'emploi
  const jobOffers = [
    {
      id: 1,
      company: t('jobCarousel.atomTech'),
      logo: BantulinkLogo,
      title: t('jobCarousel.stageGraphicMotionDesigner'),
      publishDate: "30/06/2025",
      deadline: "15/07/2025",
      location: t('jobCarousel.doualaAkwa'),
      workType: t('jobCarousel.fullTime')
    },
    {
      id: 2,
      company: t('jobCarousel.atomTech'),
      logo: BantulinkLogo,
      title: t('jobCarousel.stageGraphicMotionDesigner'),
      publishDate: "30/06/2025",
      deadline: "15/07/2025",
      location: t('jobCarousel.doualaAkwa'),
      workType: t('jobCarousel.fullTime')
    },
    {
      id: 3,
      company: t('jobCarousel.atomTech'),
      logo: BantulinkLogo,
      title: t('jobCarousel.stageGraphicMotionDesigner'),
      publishDate: "30/06/2025",
      deadline: "15/07/2025",
      location: t('jobCarousel.doualaAkwa'),
      workType: t('jobCarousel.fullTime')
    },
    {
      id: 4,
      company: t('jobCarousel.atomTech'),
      logo: BantulinkLogo,
      title: t('jobCarousel.stageGraphicMotionDesigner'),
      publishDate: "30/06/2025",
      deadline: "15/07/2025",
      location: t('jobCarousel.doualaAkwa'),
      workType: t('jobCarousel.fullTime')
    },
    {
      id: 5,
      company: t('jobCarousel.atomTech'),
      logo: BantulinkLogo,
      title: t('jobCarousel.stageGraphicMotionDesigner'),
      publishDate: "30/06/2025",
      deadline: "15/07/2025",
      location: t('jobCarousel.doualaAkwa'),
      workType: t('jobCarousel.fullTime')
    },
  ];

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await api.get('/entreprises/avec-offres-en-cours');
        setCompanies(response.data.data || []);
      } catch (error) {
        console.error(t('jobCarousel.errorFetchingCompanies'), error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, [t]);

  const tabs = [
    { id: 'communication', label: t('jobCarousel.communication') },
    { id: 'graphiste', label: t('jobCarousel.graphiste') },
    { id: 'developpeur', label: t('jobCarousel.phpDeveloper') },
    { id: 'community', label: t('jobCarousel.communityManager') },
    { id: 'copywriter', label: t('jobCarousel.copyWriter') },
    { id: 'communication2', label: t('jobCarousel.communication') }
  ];

  // Fonction de défilement pour le carrousel
  const scrollCarousel = (carouselRef, direction) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.job-card, .company-card').offsetWidth;
      const gap = 24;
      const scrollAmount = cardWidth + gap; 

      if (direction === 'left') {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Composant de carte d'emploi modifié
  const JobCardItem = ({ job }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 h-full">
      {/* Header with logo and company */}
      <div className="mb-4">
        <div className="flex flex-col gap-3">
          <div className='flex'>
            <div className="w-25 h-25 bg-gray-100 rounded-lg flex items-center justify-center self-start">
              <img src={`/storage/public/${job.logo}`} alt={t('jobCarousel.companyLogoAlt')} className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
            </div>
            <div className='mt-7 ml-3 font-semibold text-xl'>{job.name}</div>
          </div>
          
          <h3 className="font-semibold underline text-gray-900 text-lg leading-tight">
            {job.title}
          </h3>
        </div>
      </div>

      {/* Publication date */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <Calendar className="w-4 h-4" />
        <span>{t('jobCarousel.publicationDate')} {job.publishDate}</span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
        <span className="font-medium">{t('jobCarousel.location')} :</span>
        <span>{job.location}</span>
      </div>

      {/* Job details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{job.workType}</span>
        </div>
      </div>

      {/* Button */}
      <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors mt-auto">
        {t('jobCarousel.showMore')}
      </button>
    </div>
  );

  return (
    <div className="mx-auto py-8 bg-white font-sans">
      {/* Section "Recherches populaires" */}
      <div className="mb-10 px-10 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-3xl font-bold text-emerald-400 mb-4">{t('jobCarousel.popularSearches')}</h2>
        <div className="flex items-center overflow-x-auto whitespace-nowrap scroll-smooth pb-2 relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-shrink-0 px-5 py-2 text-lg font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'text-orange-500 font-bold'
                  : 'text-gray-700'
              } mr-3 focus:outline-none`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
          <div
            className="absolute bottom-0 left-0 h-1 bg-orange-500 transition-all duration-300"
            style={{
              width: 'calc(100% / ' + tabs.length + ')',
              transform: `translateX(${tabs.findIndex(tab => tab.id === activeTab) * (100 / tabs.length)}%)`
            }}
          ></div>
        </div>
      </div>

      {/* Section "Job Offers Carousel" */}
      <motion.div 
        className="mb-10 relative px-10 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div
          ref={jobCarouselRef}
          className="flex gap-6 overflow-x-auto scroll-snap-x scroll-mandatory scroll-smooth pb-4"
        >
          {jobOffers.slice(0, 5).map((job) => (
            <div
              key={job.id}
              className="job-card min-w-[300px] md:min-w-[350px] lg:min-w-[400px] flex-shrink-0 snap-start"
            >
              <JobCardItem job={job} />
            </div>
          ))}
        </div>

        {/* Navigation Arrows for Job Carousel */}
        <button
          onClick={() => scrollCarousel(jobCarouselRef, 'left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors shadow-lg z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollCarousel(jobCarouselRef, 'right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors shadow-lg z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </motion.div>
      
      {/* "Afficher plus" button below Job Carousel */}
      <div className="px-4 sm:px-6 lg:px-8 mb-12">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
          {t('jobCarousel.showMore')}
        </button>
      </div>

      {/* Section "Les entreprises qui recrutent" */}
      {loading ? (
        <div className="flex justify-center p-10"><BantulinkLoader /></div>
      ) : (
        <div className="px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-xl md:text-2xl font-bold text-emerald-400 mb-6">{t('jobCarousel.recruitingCompanies')}</h2>
          <div
            ref={companyCarouselRef}
            className="flex gap-6 overflow-x-auto scroll-snap-x scroll-mandatory scroll-smooth pb-4"
        >
          {companies.slice(0, 5).map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
        {/* Navigation Arrows for Company Carousel */}
        <button
          onClick={() => scrollCarousel(companyCarouselRef, 'left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors shadow-lg z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollCarousel(companyCarouselRef, 'right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors shadow-lg z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      )}

      {/* "Afficher toutes les entreprises" button */}
      <div className="px-4 sm:px-6 lg:px-8 mt-8">
        <Link to="/all-companies">
          <button className="bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors">
            {t('jobCarousel.showAllCompanies')}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JobCarousel;