import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/services/api';
import HeaderProfil from '@/components/app/HeaderProfil';
import Footer from '@/components/public/Footer';
import HeroCompany from '@/components/app/HeroCompany'; // On réutilise le Hero
import BantulinkLoader from '@/components/ui/BantulinkLoader';
import CompanyJobCard from '@/components/app/CompanyJobCard'; // <-- On importe notre nouveau composant

function CompanyProfilePage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
      setLoading(true);
      try {
        // 1. Récupérer la liste de toutes les entreprises avec leurs offres
        const response = await api.get(`/entreprises/avec-offres-en-cours`);
        const allCompanies = response.data.data || [];

        // 2. Trouver l'entreprise qui correspond à l'ID de l'URL
        // On convertit l'ID de l'URL (string) en nombre pour la comparaison
        const companyId = parseInt(id, 10); // Correction: utiliser == pour comparer string et number
        const foundCompany = allCompanies.find(c => c.id == companyId);

        setCompany(foundCompany); 
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'entreprise:", error);
        setCompany(null); // En cas d'erreur, on s'assure que company est null
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [id]);

  return (
    <>
      <HeaderProfil />
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <BantulinkLoader />
        </div>
      ) : (
        <>
          {/* On passe les données de l'entreprise au Hero */}
          <HeroCompany companyData={company} />
          <div className="py-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Offres d'emploi chez {company.nom_entreprise}</h2>
            <CompanyJobCard jobs={company.offres} />
          </div>
        </>
      )}

      <Footer />
    </>
  );
}

export default CompanyProfilePage;