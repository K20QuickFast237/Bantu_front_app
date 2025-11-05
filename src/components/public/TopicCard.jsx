import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const TopicCard = ({ title, category, categoryColor, views }) => {
  return (
    <div className="bg-gray-100 rounded-xl border border-gray-100 px-6 py-4 flex flex-col justify-between 
                  transition-all duration-300 ease-in-out hover:shadow-lg hover:border-gray-200 cursor-pointer h-full">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm text-left font-semibold text-gray-900 leading-snug pr-4">
          {title}
        </h3>
        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>
      <div className="flex justify-between items-start text-sm mt-auto">
        <div className="flex items-center">
          <span className="text-orange-600 text-xs font-medium">
            {category}
          </span>
        </div>
        <span className="text-gray-500">
          {views}
        </span>
      </div>
    </div>
  );
};

const PopularHelpTopics = () => {
  const { t } = useTranslation();
  
  const topics = [
    {
      title: t('aide.topics.resetPassword.title'),
      category: t('aide.topics.resetPassword.category'),
      categoryColor: '#4A90E2',
      views: `2.3k ${t('aide.topics.views')}`,
    },
    {
      title: t('aide.topics.paymentMethods.title'),
      category: t('aide.topics.paymentMethods.category'),
      categoryColor: '#F5A623',
      views: `1.8k ${t('aide.topics.views')}`,
    },
    {
      title: t('aide.topics.applyJobs.title'),
      category: t('aide.topics.applyJobs.category'),
      categoryColor: '#7ED321',
      views: `3.1k ${t('aide.topics.views')}`,
    },
    {
      title: t('aide.topics.reportContent.title'),
      category: t('aide.topics.reportContent.category'),
      categoryColor: '#D0021B',
      views: `1.2k ${t('aide.topics.views')}`,
    },
    {
      title: t('aide.topics.resetPassword.title'),
      category: t('aide.topics.resetPassword.category'),
      categoryColor: '#4A90E2',
      views: `2.7k ${t('aide.topics.views')}`,
    },
    {
      title: t('aide.topics.paymentMethods.title'),
      category: t('aide.topics.paymentMethods.category'),
      categoryColor: '#F5A623',
      views: `1.9k ${t('aide.topics.views')}`,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <section className="bg-white py-16 sm:py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            {t('aide.topics.title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
            {t('aide.topics.subtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => (
              <TopicCard
                key={index}
                title={topic.title}
                category={topic.category}
                categoryColor={topic.categoryColor}
                views={topic.views}
              />
            ))}
          </div>
        </div>
      </section>
    </motion.section>
  );
};

export default PopularHelpTopics;