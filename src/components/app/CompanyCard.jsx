import React from "react";
import CompanyBg from "../../assets/assets_application/Recherche_entreprise.png";
import { Link } from "react-router-dom";
import { Building, MapPin } from "lucide-react";
import { useTranslation } from 'react-i18next';

const CompanyCard = ({ company }) => {
  const { t } = useTranslation();
  
  return (
    <Link to={`/company/${company.id}`}>
      <div key={company.id} className="company-card min-w-[70%] sm:min-w-[10%] md:min-w-[10%] lg:min-w-[330px] xl:min-w-[400px] bg-white border border-gray-200 rounded-lg shadow-sm flex-shrink-0 snap-start flex flex-col">
        <div className="w-full h-32 bg-cover bg-center rounded-t-lg flex-shrink-0" style={{ backgroundImage: `url(${company.bgImage ? company.bgImage : `${CompanyBg}`})` }}></div>

        <div className="p-4 relative flex-1 flex flex-col">
          <div className="absolute -top-10 left-4 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
            <img src={`/storage/public/${company.logo}`} alt={company.nom_entreprise} className="w-full h-full object-contain p-2" />
          </div>

          <div className="mt-12 flex-1 flex flex-col">
            <h3 className="font-bold text-gray-900 text-lg mb-2 underline">{company.nom_entreprise}</h3>

            <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <Building className="w-4 h-4 text-black" />
              {company.description_entreprise}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <MapPin className="w-4 h-4 text-black" />
              <span>{company.pays}, {company.ville}, {company.adresse}</span>
            </div>

            <div className="flex justify-between items-center mt-auto">
              <p className="text-base font-semibold text-gray-800">
                {company.offres.length} {t('companies.offers')}
              </p>
              <button className="border border-orange-500 text-orange-500 py-1.5 px-4 rounded-lg text-sm font-medium hover:bg-orange-50 hover:text-orange-600 transition-colors">
                {t('companies.view')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;