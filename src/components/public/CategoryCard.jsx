import React from 'react';
import { User, ShoppingCart, Briefcase, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Ajout

const CategoryCard = ({ icon: Icon, bgColor, iconColor, title, description, exploreText }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 px-6 py-6 flex flex-col items-center text-center 
                  transition-all duration-300 ease-in-out hover:shadow-lg hover:border-gray-200 cursor-pointer">
      <div className="relative w-20 h-20 rounded-full flex items-center justify-center mb-6 overflow-hidden"
           style={{ background: bgColor }}>
        <Icon className="w-10 h-10" style={{ color: iconColor }} strokeWidth={1.75} />
      </div>

      <h3 className="text-sm font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-xs leading-relaxed mb-4">
        {description}
      </p>
      <a href="#" className="flex items-center text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors">
        {exploreText} <ArrowRight className="w-4 h-4 ml-1" />
      </a>
    </div>
  );
};



const BrowseByCategory = () => {
  const { t } = useTranslation(); // Hook i18n

  const categories = [
    {
      icon: User,
      bgColor: 'linear-gradient(135deg, #E6F0FF 0%, #CCD9FF 100%)',
      iconColor: '#4A90E2',
      title: t('category.account.title'),
      description: t('category.account.desc'),
      exploreText: t('category.explore'),
    },
    {
      icon: ShoppingCart,
      bgColor: 'linear-gradient(135deg, #FFF0E6 0%, #FFD9CC 100%)',
      iconColor: '#F5A623',
      title: t('category.orders.title'),
      description: t('category.orders.desc'),
      exploreText: t('category.explore'),
    },
    {
      icon: Briefcase,
      bgColor: 'linear-gradient(135deg, #E6FFE6 0%, #CCFFCC 100%)',
      iconColor: '#7ED321',
      title: t('category.jobs.title'),
      description: t('category.jobs.desc'),
      exploreText: t('category.explore'),
    },
    {
      icon: Clock,
      bgColor: 'linear-gradient(135deg, #FFEBE6 0%, #FFCCCC 100%)',
      iconColor: '#D0021B',
      title: t('category.disputes.title'),
      description: t('category.disputes.desc'),
      exploreText: t('category.explore'),
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            {t('category.title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
            {t('category.description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                icon={category.icon}
                bgColor={category.bgColor}
                iconColor={category.iconColor}
                title={category.title}
                description={category.description}
                exploreText={category.exploreText}
              />
            ))}
          </div>
        </div>
      </motion.section>
    </section>
  );
};

export default BrowseByCategory;