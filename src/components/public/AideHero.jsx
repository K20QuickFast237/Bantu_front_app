import React, { useState, useEffect, useRef } from 'react';
import AideBg from '../../assets/aide1.png';
import { Link } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AideHero = ({ categoryRef, topicRef, testimonialRef, contactRef }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null);

  // Données statiques pour la recherche (traduites dynamiquement)
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
      title: t('aide.testimonials.title'),
      description: t('aide.testimonials.subtitle'),
      section: 'testimonial',
      ref: testimonialRef
    },
    { 
      title: t('aide.contact.title'),
      description: t('aide.contact.subtitle'),
      section: 'contact',
      ref: contactRef
    }
  ];

  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    const queryLower = query.toLowerCase();
    const exactMatches = [];
    const partialMatches = [];

    searchData.forEach(item => {
      const titleMatch = item.title.toLowerCase().includes(queryLower);
      const descriptionMatch = item.description && item.description.toLowerCase().includes(queryLower);
      const categoryMatch = item.category && item.category.toLowerCase().includes(queryLower);

      if (titleMatch || descriptionMatch || categoryMatch) {
        exactMatches.push(item);
      } else if (
        item.title.toLowerCase().split(' ').some(word => word.startsWith(queryLower)) ||
        (item.description && item.description.toLowerCase().split(' ').some(word => word.startsWith(queryLower))) ||
        (item.category && item.category.toLowerCase().split(' ').some(word => word.startsWith(queryLower)))
      ) {
        partialMatches.push(item);
      }
    });

    setSearchResults([...exactMatches, ...partialMatches.slice(0, 3)]);
    setShowSuggestions(true);
  };

  useEffect(() => {
    performSearch(searchQuery);
  }, [searchQuery, t]);

  const handleResultClick = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="flex justify-center items-center pt-20">
      <div
        className="relative rounded-3xl w-full max-w-6xl h-[550px] sm:h-[600px] 
        flex flex-col items-center justify-center text-center overflow-hidden shadow-xl mx-9"
        style={{
          backgroundImage: `url(${AideBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#959CC8',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl">
          <div className="bg-[#B9E6FF] text-[#1E90FF] text-xs font-semibold py-1.5 px-4 rounded-full mb-6 shadow-md whitespace-nowrap">
            {t('aide.hero.supportBadge')}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#36D18C] leading-tight mb-4">
            {t('aide.hero.title')}
          </h1>
          <p className="text-base sm:text-lg text-gray-700 opacity-90 max-w-2xl mb-10 px-4">
            {t('aide.hero.subtitle')}
          </p>
          <div className="relative w-full max-w-xl mb-8 shadow-md rounded-2xl overflow-hidden border border-gray-200" ref={searchContainerRef}>
            <input
              type="text"
              placeholder={t('aide.hero.searchPlaceholder')}
              className="w-full py-5 pl-6 pr-32 text-gray-800 placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                         bg-white rounded-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute inset-y-0 top-2 bottom-2 right-2 bg-blue-600 text-white font-semibold 
                               py-2 px-4 sm:px-8 rounded-2xl transition duration-300 ease-in-out 
                               hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
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
            <span className="font-medium text-gray-600">{t('aide.hero.popularSearches')}</span>
            <a href="#" className="underline font-medium text-xs text-blue-500 hover:text-blue-800 transition-colors">{t('aide.hero.popular1')}</a>
            <a href="#" className="underline font-medium text-xs text-blue-500 hover:text-blue-800 transition-colors">{t('aide.hero.popular2')}</a>
            <a href="#" className="underline font-medium text-xs text-blue-500 hover:text-blue-800 transition-colors">{t('aide.hero.popular3')}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AideHero;