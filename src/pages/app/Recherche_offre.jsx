import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import JobCard from "../../components/app/JobCard";
import JobSearchDashboard from "../../components/app/JobSearchDashboard";
import JobCarousel from "../../components/app/JobCarousel";
import HeaderProfil from "../../components/app/HeaderProfil";
import Footer from "../../components/public/Footer";

function Recherche_offre() {
  const location = useLocation();
  // States partagés pour temps réel
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [selectedContract, setSelectedContract] = useState('');
  const [selectedEducation, setSelectedEducation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(location.state?.categoryId || '');

  useEffect(() => {
    if (location.state?.categoryId) {
      setSelectedCategory(location.state.categoryId);
    }
  }, [location.state]);

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
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <JobCard
        searchTerm={searchTerm}
        locationTerm={locationTerm}
        selectedContract={selectedContract}
        selectedEducation={selectedEducation}
        selectedCategory={selectedCategory}
        limit={6}
      />
      <JobCarousel />
      <Footer />
    </>
  );
}

export default Recherche_offre;