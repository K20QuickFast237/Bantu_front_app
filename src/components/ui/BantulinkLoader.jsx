
import React from 'react';
import { useTranslation } from 'react-i18next'; 

const BantulinkLoader = () => { 
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-[300px] w-full">
      <div className="flex flex-col items-center">
        {/* Loader circulaire minimaliste */}
        <div className="relative flex items-center justify-center mb-6 h-14 w-14">
          <svg className="animate-spin-slow h-14 w-14" viewBox="0 0 50 50">
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="#F59E42"
              strokeWidth="3"
              fill="none"
              className="opacity-30"
            />
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="#22C55E"
              strokeWidth="3"
              fill="none"
              strokeDasharray="90"
              strokeDashoffset="60"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute h-3 w-3 rounded-full bg-orange-500 animate-pulse"></span>
        </div>

        {/* Texte très fin et moderne */}
        <span className="text-2xl font-light tracking-wide text-gray-900">
          <span className="text-orange-600 font-light">Bantu</span>
          <span className="text-green-600 font-light">link</span>
        </span>
        
        <div className="mt-2 text-gray-400 text-sm font-light animate-pulse">
          {t('loading.label')}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-spin-slow {
          animation: spin 1.2s cubic-bezier(.68,-0.55,.27,1.55) infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}; // Fermeture correcte du composant

export default BantulinkLoader;