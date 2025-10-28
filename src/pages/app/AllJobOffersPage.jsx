import React, { useState } from 'react';
import JobCard from "../../components/app/JobCard";
import JobSearchDashboard from "../../components/app/JobSearchDashboard";
import HeaderProfil from "../../components/app/HeaderProfil";
import Footer from "../../components/public/Footer";

function AllJobOffersPage() {
  // States partagés pour les filtres en temps réel
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
        locationTerm={locationTerm}
        setLocationTerm={setLocationTerm}
        hideContractFilter={true}
        hideEducationFilter={true}
        searchProfileButtonText="Rechercher des offres"
        title="Rechercher parmi toutes les offres d'emploi"
      />
      <JobCard
        searchTerm={searchTerm}
        locationTerm={locationTerm}
        selectedContract={selectedContract}
        selectedEducation={selectedEducation}
        paginationEnabled={true}
      />
      <Footer />
    </>
  );
}

export default AllJobOffersPage;
