import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `relative pb-1 font-light  transition-colors duration-200 ${
      isActive
        ? 'text-gray-900 font-semibold after:absolute after:bottom-0 after:left-4 after:w-1/3 after:h-1 after:rounded-full after:bg-blue-500'
        : 'text-gray-900 hover:text-gray-900'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 px-10 ${
        scrolled ? 'bg-white shadow-md border-b border-gray-200' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="ml-2 text-xl font-semibold text-gray-900">Bantulink</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/home" className={navLinkClass}>
            Accueil
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            À Propos
          </NavLink>
          <NavLink to="/features" className={navLinkClass}>
            Fonctionnalités
          </NavLink>
          <NavLink to="/pricing" className={navLinkClass}>
            Tarifs
          </NavLink>
          <NavLink to="/support" className={navLinkClass}>
            Support
          </NavLink>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <NavLink
            to="/login"
            className="px-6 py-2 text-white bg-gray-800 rounded-full font-medium hover:bg-gray-900 transition-colors"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="px-6 py-2 text-gray-700 border-2 border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors"
          >
            Register
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
