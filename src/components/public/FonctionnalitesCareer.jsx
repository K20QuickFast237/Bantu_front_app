import React from "react";
import { useTranslation } from 'react-i18next'; // Ajout

const features = [
  
  {
    title: t('career.smartSearch.title'),
    desc: t('career.smartSearch.desc'),
  },
  {
    title: t('career.realTimeChat.title'),
    desc: t('career.realTimeChat.desc'),
  },
  {
    title: t('career.videoInterviews.title'),
    desc: t('career.videoInterviews.desc'),
  },
  {
    title: t('career.skillCertifications.title'),
    desc: t('career.skillCertifications.desc'),
  },
];

const FonctionnalitesCareer = () => {
  const { t } = useTranslation(); // Hook i18n

  return (
    <section className="relative w-full bg-[#EBF4FF] py-14 overflow-hidden">
      {/* Vague top */}
      <div className="absolute top-0 left-0 w-full z-0 py-4 px-10">
        <svg
          className="w-full h-[48px] md:h-[120px]"
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z"
            fill="#fff"
          />
        </svg>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-30">
        <div className="flex flex-col items-center mb-8">
          <span className="bg-[#1a2979] text-white text-xs font-semibold px-4 py-1 rounded-full mb-4">
            BantuHire
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a2979] text-center mb-2">
            {t('career.title')}
          </h2>
          <p className="text-gray-500 text-center max-w-2xl">
            {t('career.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-14">
          {features.map((f, idx) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-start"
            >
              <div className="w-full mb-4">
                <div className="bg-[#223e88] rounded-xl w-full h-48 flex items-center justify-center">
                  <span className="text-white text-xl md:text-2xl font-semibold text-center">
                    {f.title}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-[#223e88] font-bold mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Vague bottom */}
      <div className="absolute bottom-0 left-0 w-full z-0 pt-4 px-10">
        <svg
          className="w-full h-[48px] md:h-[80px]"
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z"
            fill="#FFF7ED"
          />
        </svg>
      </div>
    </section>
  );
};

export default FonctionnalitesCareer;