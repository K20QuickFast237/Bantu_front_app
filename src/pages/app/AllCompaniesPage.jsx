import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderProfil from "@/components/app/HeaderProfil";
import Footer from "@/components/public/Footer";
import JobSearchDashboard from "@/components/app/JobSearchDashboard";
import CompanyList from '@/components/app/CompanyList';

function AllCompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();
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
        searchProfileButtonText={t('pages.allCompanies.searchButton')}
        title={t('pages.allCompanies.title')}
      />
      <CompanyList searchTerm={searchTerm} locationTerm={locationTerm} />
      <Footer />
    </>
  );
}

export default AllCompaniesPage;