import React, { useState, useEffect, useRef } from 'react';
import AideBg from '../../assets/aide1.png';
import { Search } from 'lucide-react'; // Ajout de l'icône
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
    { 
      title: 'Processus de vérification de compte', 
      category: t('aide.categories.account.title'), 
      section: 'topic', 
      ref: topicRef 
    },
    { 
      title: 'Politique et processus de remboursement', 
      category: t('aide.categories.orders.title'), 
      section: 'topic', 
      ref: topicRef 
    },
    { 
      title: t('testimonials.title'), 
      description: t('testimonials.title'),
      section: 'testimonial',
      ref: testimonialRef
    },
    { 
      title: t('help.contact.title'), 
      description: t('help.contact.subtitle'),
      section: 'contact',
      ref: contactRef
    }
  ];

  // Fonction pour trouver les résultats de recherche et suggestions
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

  // Effectuer la recherche en temps réel
  useEffect(() => {
    performSearch(searchQuery);
  }, [searchQuery]);

  // Gérer le clic sur un résultat pour scroller vers la section
  const handleResultClick = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  // Gérer le clic à l'extérieur pour fermer les suggestions
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
    <section className="pt-16">
      <div
        className="relative w-full h-[550px] sm:h-[600px] flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `url(${AideBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#959CC8',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl">
          <div className="bg-[#B9E6FF] text-[#1E90FF] text-xs font-semibold py-1.5 px-4 rounded-full mb-6 shadow-md whitespace-nowrap">
            {t('help.hero.supportBadge')}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#36D18C] leading-tight mb-4">
            {t('help.hero.title')}
          </h1>
          <p className="text-base sm:text-lg text-gray-700 opacity-90 max-w-2xl mb-10 px-4">
            {t('help.hero.subtitle')}
          </p>
          <div className="relative w-full max-w-xl mb-8 shadow-md rounded-2xl overflow-hidden border border-gray-200" ref={searchContainerRef}>
            <input
              type="text"
              placeholder={t('help.hero.searchPlaceholder')}
              className="w-full py-5 pl-6 pr-32 text-gray-800 placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                         bg-white rounded-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute inset-y-0 top-2 bottom-2 right-2 bg-blue-600 text-white font-semibold flex items-center gap-2
                               py-2 px-4 sm:px-6 rounded-xl transition duration-300 ease-in-out 
                               hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Search className="w-4 h-4 hidden sm:block" />
              {t('help.hero.searchButton')}
            </button>
          </div>
          <div className={`w-full max-w-xl transition-all duration-300 ${showSuggestions && searchQuery ? 'block' : 'hidden'}`}>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="px-6 py-3 text-gray-800 hover:bg-gray-100 cursor-pointer transition-colors"
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
                    {t('help.hero.noResults')}
                  </div>
                )
              )}
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm px-4 mt-4">
            <span className="font-medium text-gray-600">{t('help.hero.popularSearches')}</span>
            <a href="#" className="bg-gray-200/50 text-gray-700 text-xs font-medium px-3 py-1 rounded-full hover:bg-gray-200/80 transition-colors">{t('help.hero.popular1')}</a>
            <a href="#" className="bg-gray-200/50 text-gray-700 text-xs font-medium px-3 py-1 rounded-full hover:bg-gray-200/80 transition-colors">{t('help.hero.popular2')}</a>
            <a href="#" className="bg-gray-200/50 text-gray-700 text-xs font-medium px-3 py-1 rounded-full hover:bg-gray-200/80 transition-colors">{t('help.hero.popular3')}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AideHero;