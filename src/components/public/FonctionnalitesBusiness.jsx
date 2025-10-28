import React from "react";
import { useTranslation } from 'react-i18next'; // Ajout

const FonctionnalitesBusiness = () => {
  const { t } = useTranslation(); // Hook i18n

  return (
    <section className="relative w-full bg-white py-16 mb-18">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <span className="bg-[#F59E0B] text-white text-xs font-semibold px-4 py-1 rounded-full mb-4">
            BantuMarket
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#F59E0B] text-center mb-2">
            {t('business.title')}
          </h2>
          <p className="text-[#6B7280] text-center max-w-2xl">
            {t('business.subtitle')}
          </p>
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
          {/* Online Store */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-[#F59E0B] rounded-2xl flex items-center justify-center min-h-[180px] h-48 md:h-56 mb-4 md:mb-0">
              <span className="text-white text-xl md:text-2xl font-semibold text-center">
                {t('business.onlineStore.title')}
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-[#F59E0B] font-bold text-lg mb-1">{t('business.onlineStore.title')}</h3>
              <p className="text-[#6B7280] mb-2">
                {t('business.onlineStore.description')}
              </p>
              <ul className="text-[#6B7280] text-sm space-y-1">
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>{t('business.onlineStore.features.0')}</li>
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>{t('business.onlineStore.features.1')}</li>
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>{t('business.onlineStore.features.2')}</li>
              </ul>
            </div>
          </div>
          {/* Promotion */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-[#F59E0B] rounded-2xl flex items-center justify-center min-h-[180px] h-48 md:h-56 mb-4 md:mb-0">
              <span className="text-white text-xl md:text-2xl font-semibold text-center">
                {t('business.promotion.title')}
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-[#F59E0B] font-bold text-lg mb-1">{t('business.promotion.title')}</h3>
              <p className="text-[#6B7280] mb-2">
                {t('business.promotion.description')}
              </p>
              <ul className="text-[#6B7280] text-sm space-y-1">
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>{t('business.promotion.features.0')}</li>
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>{t('business.promotion.features.1')}</li>
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>{t('business.promotion.features.2')}</li>
              </ul>
            </div>
          </div>
          {/* Buyer Chat */}
          <div className="flex flex-col md:flex-row-reverse gap-8">
            <div className="flex-1 bg-[#F59E0B] rounded-2xl flex items-center justify-center min-h-[180px] h-48 md:h-56 mb-4 md:mb-0">
              <span className="text-white text-xl md:text-2xl font-semibold text-center">
                {t('business.chat.title')}
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-[#F59E0B] font-bold text-lg mb-1">{t('business.chat.title')}</h3>
              <p className="text-[#6B7280] mb-2">
                {t('business.chat.description')}
              </p>
              <ul className="text-[#6B7280] text-sm space-y-1">
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>{t('business.chat.features.0')}</li>
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>{t('business.chat.features.1')}</li>
                <li><span className="text-[#19b885] font-bold mr-2">✔</span>{t('business.chat.features.2')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FonctionnalitesBusiness;