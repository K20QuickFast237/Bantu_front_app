import React, { useState } from 'react';
import JobCard from "../../components/app/JobCard";
import JobSearchDashboard from "../../components/app/JobSearchDashboard";
import JobCarousel from "../../components/app/JobCarousel";
import HeaderProfil from "../../components/app/HeaderProfil";
import Footer from "../../components/public/Footer";

function Recherche_offre() {
  // States partagés pour temps réel
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [selectedContract, setSelectedContract] = useState('');
  const [selectedEducation, setSelectedEducation] = useState('');

  return (
    <>
      <HeaderProfil />
      <JobSearchDashboard
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        allJobTitle={true}
        locationTerm={locationTerm}
        setLocationTerm={setLocationTerm}
        selectedContract={selectedContract}
        setSelectedContract={setSelectedContract}
        selectedEducation={selectedEducation}
        setSelectedEducation={setSelectedEducation}
      />
      <JobCard
        searchTerm={searchTerm}
        locationTerm={locationTerm}
        selectedContract={selectedContract}
        selectedEducation={selectedEducation}
        limit={6}
      />
      <JobCarousel />
      <Footer />
    </>
  );
}

export default Recherche_offre;