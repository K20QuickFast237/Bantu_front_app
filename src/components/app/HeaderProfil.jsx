import React from 'react';
import { User2 } from 'lucide-react';
import { Link } from 'react-router-dom'; // Assurez-vous d'avoir react-router-dom installé

const HeaderProfil = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <Link to={"/candidatProfil"}>
           <div className="text-xl font-bold">
          <span className="text-green-500">Bantu</span>
          <span className="text-red-500">Link</span>
        </div>
        </Link>
        
        {/* Liens de navigation */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium text-sm">
          <Link to="/rechercheOffre" className="hover:text-green-600 transition-colors">
            Trouver un job
          </Link>
          <Link to="/trouver-une-entreprise" className="hover:text-green-600 transition-colors">
            Trouver une entreprise
          </Link>
        </nav>
      </div>

      {/* Profil de l'utilisateur */}
      <div className="flex items-center space-x-2">
        <Link to="/profil" className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
          <User2 className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-800 text-sm">Mon profil</span>
        </Link>
      </div>
    </header>
  );
};

export default HeaderProfil;