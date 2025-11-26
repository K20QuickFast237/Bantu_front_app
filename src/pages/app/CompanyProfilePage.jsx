import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/services/api';
import HeaderProfil from '@/components/app/HeaderProfil';
import Footer from '@/components/public/Footer';
import HeroCompany from '@/components/app/HeroCompany'; // On réutilise le Hero
import BantulinkLoader from '@/components/ui/BantulinkLoader';
import CompanyJobCard from '@/components/app/CompanyJobCard'; // <-- On importe notre nouveau composant
import { decodeId } from '@/obfuscate';


function CompanyProfilePage() {
  const { id } = useParams();
  const decodedId = decodeId(id);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/entreprises/avec-offres-en-cours`);
        const allCompanies = response.data.data || [];

        // On s'assure que l'ID décodé est un nombre pour la comparaison stricte
        const numericDecodedId = parseInt(decodedId, 10);
        const foundCompany = allCompanies.find(c => c.id === numericDecodedId);
        setCompany(foundCompany);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'entreprise:", error);
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [decodedId, navigate]);


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
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Offres d'emploi chez {company?.nom_entreprise}</h2>
            <CompanyJobCard jobs={company?.offres} />
          </div>
        </>
      )}

      <Footer />
    </>
  );
}

export default CompanyProfilePage;