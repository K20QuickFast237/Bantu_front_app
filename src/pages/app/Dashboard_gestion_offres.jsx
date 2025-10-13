import React, { useEffect, useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import HeaderProfil from '../../components/app/HeaderProfil';
import Footer from '../../components/public/Footer';
import api from '@/services/api';
import { Link } from 'react-router-dom';

const Dashboard_gestion_offres = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    api.get('/mesoffres')
      .then(response => {
        setOffers(response.data.data || []);
        setFilteredOffers(response.data.data || []);
      })
      .catch(() => {
        setOffers([]);
        setFilteredOffers([]);
      });
  }, []);

  // Appliquer le filtre uniquement quand on clique sur le bouton
  const handleFilter = () => {
    let filtered = offers;

    if (statusFilter !== '') {
      filtered = filtered.filter(offer =>
        offer.statut && offer.statut.toLowerCase() === statusFilter
      );
    }

    if (dateFilter.trim() !== '') {
      filtered = filtered.filter(offer =>
        offer.created_at && offer.created_at.startsWith(dateFilter.trim())
      );
    }

    setFilteredOffers(filtered);
  };

  // Réinitialiser les filtres et afficher tout
  const handleReset = () => {
    setStatusFilter('');
    setDateFilter('');
    setFilteredOffers(offers);
  };

  // Statuts possibles (à adapter selon l'API si besoin)
  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'active', label: 'Actif' },
    { value: 'inactive', label: 'Inactif' },
    // Ajouter d'autres statuts si besoin
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <>
      <HeaderProfil />
      <div className="font-sans relative overflow-hidden">
        {/* Hero Section */}
        <div className="bg-[#FFF3EB] px-4 sm:px-8 pb-32 pt-20 relative">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[#10B981] text-2xl md:text-3xl font-bold">Mes offres d'emploi</h1>
            <p className="text-sm md:text-base font-semibold mt-1">
              Nous avons les talents dont vous avez besoin : ils sont ici !
            </p>
          </motion.div>

          {/* Floating animated elements */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-[#F97316] rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-24 relative z-10">
          {/* Search Section */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="shadow-xl rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm bg-white/90"
          >
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-stretch">
              <div className="flex items-center flex-1 min-w-0 border-b md:border-b-0 md:border-r border-gray-200 bg-white px-6 py-4">
                <Search className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
                <select
                  className="w-full outline-none text-sm md:text-base min-w-0 bg-transparent"
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                >
                  {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center flex-1 min-w-0 border-b md:border-b-0 md:border-r border-gray-200 bg-white px-6 py-4">
                <MapPin className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
                <input
                  type="date"
                  placeholder="Date xx/xx/xxxx"
                  className="w-full outline-none text-sm md:text-base min-w-0 bg-transparent"
                  value={dateFilter}
                  onChange={e => setDateFilter(e.target.value)}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#F97316] hover:bg-[#E16214] text-white px-8 py-4 text-sm md:text-base font-semibold flex-shrink-0 transition-all duration-300"
                type="button"
                onClick={handleFilter}
              >
                Rechercher des profils
              </motion.button>
              <button
                className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-semibold"
                type="button"
                onClick={handleReset}
              >
                Tout afficher
              </button>
            </motion.div>

            {/* Stats Section */}
            <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 border-t border-gray-200 bg-white">
              {['15', '05', '02', '00'].map((val, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="p-6 border-r border-gray-200 last:border-none hover:bg-gray-50 transition-all duration-200"
                >
                  <p className="text-2xl md:text-3xl text-center font-bold ">{val}</p>
                  <p className="text-sm md:text-base text-center font-medium text-gray-600 mt-2">
                    {i === 1 ? 'Vos offres créées' : 'Profils pour vous'}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <main className=" max-w-7xl mx-auto px-6 py-8">
            <div className="flex justify-end mb-8">
              <Link to="/createJob">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded">
                  Créer une offre d'emploi
                </button>
              </Link>
            </div>
            <div className="overflow-x-auto border border-gray-300 rounded">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="px-6 py-3 text-left font-semibold text-gray-700 w-16"></th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Titre de l'offre</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Date de creation</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Addresse</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Candidatures</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOffers.map((offer, idx) => (
                    <tr key={offer.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-gray-700 font-medium">{idx + 1}</td>
                      <td className="px-6 py-4 text-green-600 font-medium">{offer.titre_poste || ''}</td>
                      <td className="px-6 py-4 text-gray-700">{offer.created_at ? offer.created_at.split('T')[0] : ''}</td>
                      <td className="px-6 py-4 text-gray-700">{offer.ville || offer.pays || ''}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${offer.statut === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-gray-700">{offer.statut || ''}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-medium">
                        <Link to={`/dashboard_candidature_spec/${offer.id}`}>{offer.candidatures || '0'} candidatures</Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button className="text-blue-600 hover:text-blue-800 font-medium">Modifier</button>
                          <button className="text-blue-600 hover:text-blue-800 font-medium">Voir</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard_gestion_offres;