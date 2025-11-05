import React, { useState } from 'react';
import HeaderProfil from "@/components/app/HeaderProfil";
import Footer from "@/components/public/Footer";
import JobSearchDashboard from "@/components/app/JobSearchDashboard";
import CompanyList from '@/components/app/CompanyList';
import { useTranslation } from 'react-i18next';

function AllCompaniesPage() {
  const { t } = useTranslation();
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
        searchProfileButtonText={t('allCompanies.searchCompanies')}
        title={t('allCompanies.findDreamCompany')}
      />
      <CompanyList searchTerm={searchTerm} locationTerm={locationTerm} />
      <Footer />
    </>
  );
}

export default AllCompaniesPage;