import React from 'react';
import { Search, MapPin, ArrowRight } from 'lucide-react';

const DashboardEntreprise = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <div className="bg-[#FFF3EB] p-8">
        <h1 className="text-[#1D4ED8] text-xl font-bold">ATOM TECH</h1>
        <p className="text-sm font-semibold mt-1">
          Nous avons les talents dont vous avez besoin : ils sont ici !
        </p>

        {/* Search Bar */}
        <div className="mt-6 flex flex-wrap items-center shadow-md rounded-md overflow-hidden max-w-4xl">
          <div className="flex items-center flex-1 border-r border-gray-200 bg-white px-4 py-3">
            <Search className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Recherchez par poste, mots clés,…"
              className="w-full outline-none text-sm"
            />
          </div>
          <div className="flex items-center flex-1 border-r border-gray-200 bg-white px-4 py-3">
            <MapPin className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="choisir le pays ou la ville"
              className="w-full outline-none text-sm"
            />
          </div>
          <button className="bg-[#F97316] text-white px-6 py-3 text-sm font-semibold">
            Rechercher des profils
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-0 text-center bg-white mt-2 rounded-b-md shadow-md overflow-hidden">
          {['2 500', '05', '2 500', '2 500'].map((val, i) => (
            <div key={i} className="p-4 border-r last:border-none">
              <p className="text-xl font-bold">{val}</p>
              <p className="text-sm font-medium text-gray-600">
                {i === 1 ? 'Vos offres créées' : 'Profils pour vous'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 px-8">
        <div className="bg-[#1E3A8A] text-white p-6">
          <h2 className="text-lg font-bold">Créez vos offres d'emploi</h2>
          <p className="text-sm text-[#F97316] mt-1">Créez des vos offres d'emploi</p>
          <div className="flex justify-end mt-4">
            <ArrowRight className="text-[#F97316]" />
          </div>
        </div>

        <div className="bg-[#1E3A8A] text-white p-6">
          <h2 className="text-lg font-bold">Dashboard</h2>
          <p className="text-sm text-[#F97316] mt-1">Accédez et gérez vos données</p>
          <div className="flex justify-end mt-4">
            <ArrowRight className="text-[#F97316]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEntreprise;
