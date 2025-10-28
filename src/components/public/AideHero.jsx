import React, { useState, useEffect, useRef } from 'react';
import AideBg from '../../assets/aide1.png';
import { Link } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Ajout

const AideHero = ({ categoryRef, topicRef, testimonialRef, contactRef }) => {
  const { t } = useTranslation(); // Hook i18n
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null);

  // Données statiques pour la recherche (basées sur les autres composants)
  const searchData = [
    { 
      title: t('aide.categories.account.title'), 
      description: t('aide.categories.account.desc'),
      section: 'category',
      ref: categoryRef
    },
    { 
      title: t('aide.categories.orders.title'), 
      description: t('aide.categories.orders.desc'),
      section: 'category',
      ref: categoryRef
    },
    { 
      title: t('aide.categories.jobs.title'), 
      description: t('aide.categories.jobs.desc'),
      section: 'category',
      ref: categoryRef
    },
    { 
      title: t('aide.categories.disputes.title'), 
      description: t('aide.categories.disputes.desc'),
      section: 'category',
      ref: categoryRef
    },
    { 
      title: t('aide.topics.resetPassword.title'), 
      category: t('aide.topics.resetPassword.category'), 
      section: 'topic', 
      ref: topicRef 
    },
    { 
      title: t('aide.topics.paymentMethods.title'), 
      category: t('aide.topics.paymentMethods.category'), 
      section: 'topic', 
      ref: topicRef 
    },
    { 
      title: t('aide.topics.applyJobs.title'), 
      category: t('aide.topics.applyJobs.category'), 
      section: 'topic', 
      ref: topicRef 
    },
    { 
      title: t('aide.topics.reportContent.title'), 
      category: t('aide.topics.reportContent.category'), 
      section: 'topic', 
      ref: topicRef 
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSuggestions]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(query.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(filtered);
      setShowSuggestions(true);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
  };

  const handleResultClick = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
    setShowSuggestions(false);
    setSearchQuery('');
  };

  return (
    <section className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${AideBg})` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t('aide.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            {t('aide.hero.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto" ref={searchContainerRef}>
          <div className="relative mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={t('aide.hero.searchPlaceholder')}
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => handleSearch(searchQuery)}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              >
                {t('aide.hero.searchButton')}
              </button>
            </div>
            <div className={`w-full max-w-xl transition-all duration-300 ${showSuggestions && searchQuery ? 'block' : 'hidden'}`}>
              <div className="bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="px-6 py-3 text-gray-800 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleResultClick(result.ref)}
                    >
                      <p className="font-semibold">{result.title}</p>
                      {result.category && <p className="text-sm text-gray-600">{result.category}</p>}
                      {result.description && <p className="text-sm text-gray-500">{result.description.slice(0, 50)}...</p>}
                    </div>
                  ))
                ) : (
                  searchQuery && (
                    <div className="px-6 py-3 text-gray-800">
                      {t('aide.hero.noResults')}
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white opacity-90 px-4">
              <span className="font-medium text-gray-600">{t('aide.hero.popularSearches')}:</span>
              <a href="#" className="underline font-medium text-xs text-blue-500 hover:text-blue-800 transition-colors">{t('aide.hero.popular1')}</a>
              <a href="#" className="underline font-medium text-xs text-blue-500 hover:text-blue-800 transition-colors">{t('aide.hero.popular2')}</a>
              <a href="#" className="underline font-medium text-xs text-blue-500 hover:text-blue-800 transition-colors">{t('aide.hero.popular3')}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AideHero;