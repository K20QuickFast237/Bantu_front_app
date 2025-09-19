import React from 'react';

const Header = () => {
  return (
    <header className="bg-slate-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Logo BantuLink */}
          <div className="flex-shrink-0">
            <svg
              className="h-8 w-8 text-blue-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-2xl font-bold">BantuLink</span>
        </div>
        {/* Navigation - à ajouter si nécessaire */}
        {/* <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-blue-400">Accueil</a></li>
            <li><a href="#" className="hover:text-blue-400">À propos</a></li>
            <li><a href="#" className="hover:text-blue-400">Services</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </nav> */}
      </div>
    </header>
  );
};

export default Header;