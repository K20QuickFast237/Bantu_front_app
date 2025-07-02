import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock, Calendar, Building } from 'lucide-react';

// Imports des images
import CompanyBg from '../../assets/assets_application/Recherche_entreprise.png';
import BantulinkLogo from '../../assets/assets_application/BantulinkLogo.png';

const JobCarousel = () => {
  const [activeTab, setActiveTab] = useState('graphiste');
  const jobCarouselRef = useRef(null);
  const companyCarouselRef = useRef(null);

  // Données factices pour les offres d'emploi
  const jobOffers = [
    {
      id: 1,
      company: "ATOM TECH",
      logo: BantulinkLogo,
      title: "Stage - Graphic & Motion Designer",
      publishDate: "30/06/2025",
      deadline: "15/07/2025",
      location: "Douala, akwa",
      workType: "Temps plein"
    },
    {
      id: 2,
      company: "ATOM TECH",
      logo: BantulinkLogo,
      title: "Stage - Graphic & Motion Designer",
      publishDate: "30/06/2025",
      deadline: "15/07/2025",
      location: "Douala, akwa",
      workType: "Temps plein"
    },
    {
      id: 3,
      company: "ATOM TECH",
      logo: BantulinkLogo,
      title: "Stage - Graphic & Motion Designer",
      publishDate: "30/06/2025",
      deadline: "15/07/2025",
      location: "Douala, akwa",
      workType: "Temps plein"
    },
    {
      id: 4,
      company: "ATOM TECH",
      logo: BantulinkLogo,
      title: "Stage - Graphic & Motion Designer",
      publishDate: "30/06/2025",
      deadline: "15/07/2025",
      location: "Douala, akwa",
      workType: "Temps plein"
    },
     {
      id: 5,
      company: "ATOM TECH",
      logo: BantulinkLogo,
      title: "Stage - Graphic & Motion Designer",
      publishDate: "30/06/2025",
      deadline: "15/07/2025",
      location: "Douala, akwa",
      workType: "Temps plein"
    },
  ];

  // Données factices pour les entreprises
  const companies = [
    {
      id: 1,
      name: "ATOM TECH",
      logo: BantulinkLogo,
      bgImage: CompanyBg,
      sector: "Technologie / IA",
      location: "Douala, akwa",
      offers: "05 offres"
    },
    {
      id: 2,
      name: "ATOM TECH",
      logo: BantulinkLogo,
      bgImage: CompanyBg,
      sector: "Technologie / IA",
      location: "Douala, akwa",
      offers: "05 offres"
    },
    {
      id: 3,
      name: "ATOM TECH",
      logo: BantulinkLogo,
      bgImage: CompanyBg,
      sector: "Technologie / IA",
      location: "Douala, akwa",
      offers: "05 offres"
    },
    {
      id: 4,
      name: "ATOM TECH",
      logo: BantulinkLogo,
      bgImage: CompanyBg,
      sector: "Technologie / IA",
      location: "Douala, akwa",
      offers: "05 offres"
    },
    {
      id: 5,
      name: "ATOM TECH",
      logo: BantulinkLogo,
      bgImage: CompanyBg,
      sector: "Technologie / IA",
      location: "Douala, akwa",
      offers: "05 offres"
    },
  ];

  const tabs = [
    { id: 'communication', label: 'Communication' },
    { id: 'graphiste', label: 'Graphiste' },
    { id: 'developpeur', label: 'Développeur PHP' },
    { id: 'community', label: 'Community Manager' },
    { id: 'copywriter', label: 'Copy writer' },
    { id: 'communication2', label: 'Communication' }
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

  return (
    <div className="max-w-7xl mx-auto py-8 bg-white font-sans">
      {/* Section "Recherches populaires" */}
      <div className="mb-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-teal-500 mb-4">Recherches populaires</h2>
        <div className="flex items-center overflow-x-auto whitespace-nowrap scroll-smooth pb-2 relative">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      className={`flex-shrink-0 px-5 py-2 text-sm font-medium transition-colors duration-200 ${
        activeTab === tab.id
          ? 'text-orange-500 font-bold' // Couleur du texte orange pour l'onglet actif et en gras
          : 'text-gray-700' // Couleur du texte par défaut pour les onglets inactifs
      } mr-3 focus:outline-none`}
      onClick={() => setActiveTab(tab.id)}
    >
      {tab.label}
    </button>
  ))}
  {/* Barre de soulignement pour l'onglet actif */}
  <div
    className="absolute bottom-0 left-0 h-1 bg-orange-500 transition-all duration-300"
    style={{
      width: 'calc(100% / ' + tabs.length + ')', // Supposons une largeur égale pour chaque onglet
      transform: `translateX(${tabs.findIndex(tab => tab.id === activeTab) * (100 / tabs.length)}%)`
    }}
  ></div>
</div>
      </div>

      {/* Section "Job Offers Carousel" */}
      <div className="mb-10 relative px-4 sm:px-6 lg:px-8">
        <div
          ref={jobCarouselRef}
          className="flex gap-6 overflow-x-auto scroll-snap-x scroll-mandatory scroll-smooth pb-4"
        >
          {jobOffers.map((job) => (
            <div
              key={job.id}
              className="job-card min-w-[calc(100%/3 - 16px)] md:min-w-[calc(100%/3 - 16px)] lg:min-w-[calc(100%/3 - 16px)] xl:min-w-[320px] 
                         bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex-shrink-0 snap-start flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                  <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{job.company}</h3>
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-3 leading-tight">{job.title}</h4>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4 flex-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-black" />
                  <span>Date de publication : {job.publishDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-black" />
                  <span>Deadline : {job.deadline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-black" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-black" />
                  <span>{job.workType}</span>
                </div>
              </div>
              
              <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                Afficher plus
              </button>
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
      </div>
      
      {/* "Afficher plus" button below Job Carousel */}
      <div className="px-4 sm:px-6 lg:px-8 mb-12">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
          Afficher plus
        </button>
      </div>

      {/* Section "Les entreprises qui recrutent" */}
      <div className="px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-xl md:text-2xl font-bold text-teal-500 mb-6">Les entreprises qui recrutent</h2>
        <div
           ref={companyCarouselRef}
           className="flex gap-6 overflow-x-auto scroll-snap-x scroll-mandatory scroll-smooth pb-4"
        >
          {companies.map((company) => (
            <div 
  key={company.id} 
  className="company-card min-w-[70%] sm:min-w-[10%] md:min-w-[10%] lg:min-w-[330px] xl:min-w-[400px] 
             bg-white border border-gray-200 rounded-lg shadow-sm flex-shrink-0 snap-start flex flex-col"
>
  {/* Background image */}
  <div
    className="w-full h-32 bg-cover bg-center rounded-t-lg flex-shrink-0"
    style={{ backgroundImage: `url(${company.bgImage})` }}
  ></div>

  <div className="p-4 relative flex-1 flex flex-col">
    {/* Logo d'entreprise flottant */}
    <div className="absolute -top-10 left-4 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
      <img src={company.logo} alt={company.name} className="w-full h-full object-contain p-2" />
    </div>

    <div className="mt-12 flex-1 flex flex-col">
      <h3 className="font-bold text-gray-900 text-lg mb-2 underline">{company.name}</h3>

      <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
        <Building className="w-4 h-4 text-black" />
        {company.sector}
      </p>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <MapPin className="w-4 h-4 text-black" />
        <span>{company.location}</span>
      </div>

      <div className="flex justify-between items-center mt-auto">
        <p className="text-base font-semibold text-gray-800">{company.offers}</p>
        <button className="border border-orange-500 text-orange-500 py-1.5 px-4 rounded-lg text-sm font-medium hover:bg-orange-50 hover:text-orange-600 transition-colors">
          Voir
        </button>
      </div>
    </div>
  </div>
</div>

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

      {/* "Afficher toutes les entreprises" button */}
      <div className="px-4 sm:px-6 lg:px-8 mt-8">
        <button className="bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors">
          Afficher toutes les entreprises
        </button>
      </div>
    </div>
  );
};

export default JobCarousel;