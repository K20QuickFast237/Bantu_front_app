import React, { useState } from 'react';
import HeaderProfil from "@/components/app/HeaderProfil";
import Footer from "@/components/public/Footer";
import JobSearchDashboard from "@/components/app/JobSearchDashboard";
import CompanyList from '@/components/app/CompanyList';

function AllCompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');

  return (
    <>
      <HeaderProfil />
      <JobSearchDashboard
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        locationTerm={locationTerm}
        setLocationTerm={setLocationTerm}
        // On désactive les filtres non pertinents pour les entreprises
        hideContractFilter={true}
        hideEducationFilter={true}
        searchProfileButtonText="Rechercher des entreprises"
        title="Trouvez l'entreprise de vos rêves"
      />
      <CompanyList searchTerm={searchTerm} locationTerm={locationTerm} />
      <Footer />
    </>
  );
}

export default AllCompaniesPage;