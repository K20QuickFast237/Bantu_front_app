import React from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';

const JobSearchDashboard = () => {
  return (
    <div className="bg-[#FFF3EB] py-12 px-4 md:px-10 font-sans">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
        Trouvez une offre d'emploi
      </h2>

      {/* First Row - Search Bar */}
      <div className="flex flex-wrap items-center justify-center max-w-5xl mx-auto shadow-md rounded-t-md overflow-hidden">
        <div className="flex items-center flex-1 min-w-[250px] border-r border-gray-200 bg-white px-4 py-3">
          <Search className="text-gray-400 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Recherchez par titre, compétences, mots clés,…"
            className="w-full outline-none text-sm"
          />
        </div>
        <div className="flex items-center flex-1 min-w-[250px] border-r border-gray-200 bg-white px-4 py-3">
          <MapPin className="text-gray-400 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="choisir le pays ou la ville"
            className="w-full outline-none text-sm"
          />
        </div>
        <button className="bg-[#F97316] text-white px-6 py-3 text-sm font-semibold min-w-[180px]">
          Rechercher des profils
        </button>
      </div>

      {/* Second Row - Filters */}
      <div className="flex flex-wrap items-center justify-center max-w-5xl mx-auto shadow-md rounded-b-md overflow-hidden border-t border-gray-200">
        <div className="flex items-center justify-between flex-1 min-w-[250px] bg-white px-4 py-3 border-r border-gray-200 cursor-pointer">
          <span className="text-sm">Type de contrat</span>
          <ChevronDown className="text-gray-500 w-4 h-4" />
        </div>
        <div className="flex items-center justify-between flex-1 min-w-[250px] bg-white px-4 py-3 cursor-pointer">
          <span className="text-sm">Niveau d'étude</span>
          <ChevronDown className="text-gray-500 w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default JobSearchDashboard;
