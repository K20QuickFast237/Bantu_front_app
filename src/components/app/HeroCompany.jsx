import React from 'react';
import CompanyBg from '../../assets/assets_application/Recherche_entreprise.png';
import BantulinkLogo from '../../assets/assets_application/BantuLinkLogo.png';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeroCompany = ({ companyData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { professionnel } = useAuth();

  const company = companyData || professionnel;

  const handleGoBack = () => {
    navigate('/dashboardEntreprise');
  };
  
  return (
    <div className="relative w-full">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="relative w-full pt-20 pb-10 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${CompanyBg})` }}
          ></div>

          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col justify-center h-full">
            <div className="text-center text-white mb-8">
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight">
                {t('hero_company.create_job_offers')}
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight">
                {t('hero_company.and_quickly')}
              </p>
            </div>
          </div>
        </div>

        <div className="relative -mt-14 z-20 px-6 sm:px-8 md:px-10">
          <div className="flex items-center">
            <div className="bg-white p-2 shadow-lg rounded-lg mr-4 border border-gray-200">
              <img src={`/storage/public/${company.logo}`} alt="Company Logo" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
            </div>

            <div className='mt-15'>
              <p className="text-[#10B981] text-xl sm:text-2xl font-bold">{company.nom_entreprise}</p>
              <p className="text-gray-700 text-base sm:text-lg">{company.email_pro}</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HeroCompany;