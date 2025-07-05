import React from 'react';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../../components/Footer';

const DashboardEntreprise = () => {
  return (
    <>
      <Header/>
      <div className="font-sans">
        {/* Header */}
        <div className="bg-[#FFF3EB] px-4 sm:px-8 pb-20 pt-20">
          <h1 className="text-[#1D4ED8] text-2xl font-bold">ATOM TECH</h1>
          <p className="text-xm mb-5 font-semibold mt-1">
            Nous avons les talents dont vous avez besoin : ils sont ici !
          </p>
        </div>

        {/* Container principal */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 -mt-20 z-20 relative">
          {/* Search Bar et Stats combinés */}
          <div className="shadow-md rounded-md overflow-hidden">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch">
              <div className="flex items-center flex-1 min-w-0 border-b sm:border-b-0 sm:border-r border-gray-200 bg-white px-4 py-3">
                <Search className="text-gray-400 w-5 h-5 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Recherchez par poste, mots clés,…"
                  className="w-full outline-none text-sm min-w-0"
                />
              </div>
              <div className="flex items-center flex-1 min-w-0 border-b sm:border-b-0 sm:border-r border-gray-200 bg-white px-4 py-3">
                <MapPin className="text-gray-400 w-5 h-5 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="choisir le pays ou la ville"
                  className="w-full outline-none text-sm min-w-0"
                />
              </div>
              <button className="bg-[#F97316] text-white px-6 py-3 text-sm font-semibold flex-shrink-0 w-full sm:w-auto">
                Rechercher des profils
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-gray-200 bg-white">
              {['2 500', '05', '2 500', '2 500'].map((val, i) => (
                <div key={i} className="p-4 border-r border-gray-200 last:border-none">
                  <p className="text-xl text-center font-bold">{val}</p>
                  <p className="text-sm text-center font-medium text-gray-600">
                    {i === 1 ? 'Vos offres créées' : 'Profils pour vous'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 mb-5 md:grid-cols-2 gap-6 mt-10 px-4 sm:px-8 max-w-5xl mx-auto">
          <div className="bg-[#1E3A8A] text-white p-6">
            <h2 className="text-2xl font-bold">Créez vos offres d'emploi</h2>
            <p className="text-sm text-[#F97316] mt-1">Créez des vos offres d'emploi</p>
            <div className="flex justify-end mt-4">
              <ArrowRight className="text-[#F97316]" />
            </div>
          </div>

          <div className="bg-[#1E3A8A] text-white p-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-sm text-[#F97316] mt-1">Accédez et gérez vos données</p>
            <div className="flex justify-end mt-4">
              <ArrowRight className="text-[#F97316]" />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default DashboardEntreprise;