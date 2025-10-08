import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  // State for scroll effect and mobile menu visibility
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Adds/removes scroll listener for header background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Class for NavLink styling, applies active state visual feedback
  const navLinkClass = ({ isActive }) =>
    `relative pb-1 font-light transition-colors duration-200 ${
      isActive
        ? 'text-blue-500 font-semibold after:absolute after:bottom-0 after:left-4 after:w-1/3 after:h-1 after:rounded-full after:bg-blue-500'
        : 'text-gray-900 hover:text-blue-500'
    }`;

  return (
    
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 px-4 sm:px-6 lg:px-8 ${ // Adjusted padding for better responsiveness
        scrolled ? 'bg-white shadow-md border-b border-gray-200' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src="src/assets/logobantulink.png" alt="BantuLink Logo" className="h-7" />
        </div>

        {/* Mobile Menu Button (Hamburger/Close Icon) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-900 focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors" // Added padding and hover effect for better touch
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-7 h-7" // Slightly larger for easier tap
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/home" className={navLinkClass}>Accueil</NavLink>
          <NavLink to="/about" className={navLinkClass}>À Propos</NavLink>
          <NavLink to="/features" className={navLinkClass}>Fonctionnalités</NavLink>
          <NavLink to="/pricing" className={navLinkClass}>Tarifs</NavLink>
          <NavLink to="/support" className={navLinkClass}>Support</NavLink>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLink
            to="/login"
            className="px-6 py-2 text-white bg-emerald-600 rounded-full font-medium hover:bg-gray-900 transition-colors"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="px-6 py-2 text-emerald-700 border-2 border-emerald-400 rounded-full font-medium hover:bg-gray-50 transition-colors"
          >
            Register
          </NavLink>
        </div>
      </div>

      {/* Mobile Menu (Visible when mobileMenuOpen is true) */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 transition-all duration-300 ease-in-out transform ${
          mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none' // Smooth slide-down effect
        }`}
      >
        <div className="flex flex-col items-center py-6 space-y-4"> {/* Increased vertical padding and spacing */}
          <NavLink to="/home" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Accueil</NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>À Propos</NavLink>
          <NavLink to="/features" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Fonctionnalités</NavLink>
          <NavLink to="/pricing" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Tarifs</NavLink>
          <NavLink to="/support" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Support</NavLink>
          <div className="w-full max-w-xs px-4 mt-6 space-y-4"> {/* Added container for auth buttons to control width */}
            <NavLink
              to="/login"
              className="block w-full text-center px-6 py-2 text-white bg-emerald-600 rounded-full font-medium hover:bg-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="block w-full text-center px-6 py-2 text-emerald-700 border-2 border-emerald-400 rounded-full font-medium hover:bg-gray-50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Register
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;