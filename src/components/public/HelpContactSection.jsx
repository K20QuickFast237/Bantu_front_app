import React from 'react';
import { MessageSquare, Mail, Clock, CheckCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const InfoBlock = ({ icon: Icon, iconBgColor, iconColor, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4 relative"
        style={{ backgroundColor: iconBgColor }}
      >
        <Icon className="w-8 h-8" style={{ color: iconColor }} strokeWidth={1.75} />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-1">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">
        {description}
      </p>
    </div>
  );
};

const HelpContactSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="flex justify-center bg-gray-50 items-center py-16 ">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-lg
       p-8 sm:py-12 md:p-16 w-full max-w-5xl text-center">
        
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
          {t('aide.contact.title')}
        </h2>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto mb-12">
          {t('aide.contact.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          <button 
            className="flex items-center justify-center py-3 px-6 rounded-lg text-white font-semibold shadow-md
                       transition duration-300 ease-in-out hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            style={{ 
              background: 'linear-gradient(to right, #4A90E2, #6B8EFA)',
              boxShadow: '0 4px 10px rgba(74, 144, 226, 0.4)'
            }}
          >
            <MessageSquare className="w-5 h-5 mr-2" /> {t('aide.contact.liveChat')}
          </button>

          <button 
            className="flex items-center justify-center py-3 px-6 rounded-lg text-white font-semibold shadow-md
                       transition duration-300 ease-in-out hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            style={{ 
              background: 'linear-gradient(to right, #FF8C00, #FFA500)',
              boxShadow: '0 4px 10px rgba(255, 140, 0, 0.4)'
            }}
          >
            <Mail className="w-5 h-5 mr-2" /> {t('aide.contact.emailSupport')}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-start gap-8 md:gap-12">
          <InfoBlock 
            icon={Clock} 
            iconBgColor="rgba(204, 219, 255, 0.3)"
            iconColor="#4A90E2"
            title={t('aide.contact.fastResponse.title')}
            description={t('aide.contact.fastResponse.desc')}
          />
          <InfoBlock 
            icon={CheckCircle}
            iconBgColor="rgba(255, 236, 179, 0.3)"
            iconColor="#F5A623"
            title={t('aide.contact.expertSupport.title')}
            description={t('aide.contact.expertSupport.desc')}
          />
          <InfoBlock 
            icon={Zap}
            iconBgColor="rgba(215, 255, 215, 0.3)"
            iconColor="#7ED321"
            title={t('aide.contact.available247.title')}
            description={t('aide.contact.available247.desc')}
          />
        </div>

      </div>
    </section>
  );
};

export default HelpContactSection;