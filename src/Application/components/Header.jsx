
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/assets_application/BantulinkLogo.png'; // Make sure this path is correct for your logo

const Header = () => {
  return (
    // Added 'fixed', 'top-0', 'left-0', 'right-0', 'z-50' for fixed positioning
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white py-4 px-8 border-b border-gray-200 flex justify-between items-center shadow-sm">
      {/* Logo Section - often links to the homepage */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Bantulink Logo" className="h-5 w-auto mr-2" />
          
        </Link>
      </div>

      {/* Navigation Section */}
      <nav>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-semibold transition-colors duration-200 ${
                  isActive ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'
                }`
              }
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                  isActive ? 'text-blue-600 font-semibold' : ''
                }`
              }
            >
              À Propos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/features"
              className={({ isActive }) =>
                `text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                  isActive ? 'text-blue-600 font-semibold' : ''
                }`
              }
            >
              Fonctionnalités
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                  isActive ? 'text-blue-600 font-semibold' : ''
                }`
              }
            >
              Tarifs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/support"
              className={({ isActive }) =>
                `text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                  isActive ? 'text-blue-600 font-semibold' : ''
                }`
              }
            >
              Support
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;