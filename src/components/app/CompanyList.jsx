import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BantulinkLoader from '../ui/BantulinkLoader';
import CompanyCard from './CompanyCard';
import { useTranslation } from 'react-i18next';

const CompanyList = ({ searchTerm, locationTerm }) => {
  const { t } = useTranslation();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const COMPANIES_PER_PAGE = 12;

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await api.get('/entreprises/avec-offres-en-cours');
        setCompanies(response.data.data || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des entreprises:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const totalPages = Math.ceil(companies.length / COMPANIES_PER_PAGE);
  const paginatedCompanies = companies.slice(
    (currentPage - 1) * COMPANIES_PER_PAGE,
    currentPage * COMPANIES_PER_PAGE
  );

  if (loading) {
    return <div className="flex justify-center p-10"><BantulinkLoader /></div>;
  }

  return (
    <div className="mx-auto px-10 sm:px-6 lg:px-8 py-8">
      {paginatedCompanies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCompanies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-12">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-gray-700 font-medium">
                {t('companies.page')} {currentPage} {t('companies.of')} {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500 py-10">{t('companies.noCompanies')}</p>
      )}
    </div>
  );
};

export default CompanyList;