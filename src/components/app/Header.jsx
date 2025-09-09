import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/assets_application/BantuLinkLogo.png'; // Make sure this path is correct for your logo

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white py-4 px-8 border-b border-gray-200 flex justify-between items-center shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Bantulink Logo" className="h-5 w-auto mr-2" />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Navigation Section */}
      <nav className="hidden md:block">
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-8 border-t border-gray-200">
          <ul className="flex flex-col space-y-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block font-semibold transition-colors duration-200 ${
                    isActive ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'
                  }`
                }
                onClick={toggleMenu}
              >
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                    isActive ? 'text-blue-600 font-semibold' : ''
                  }`
                }
                onClick={toggleMenu}
              >
                À Propos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/features"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                    isActive ? 'text-blue-600 font-semibold' : ''
                  }`
                }
                onClick={toggleMenu}
              >
                Fonctionnalités
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                    isActive ? 'text-blue-600 font-semibold' : ''
                  }`
                }
                onClick={toggleMenu}
              >
                Tarifs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/support"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                    isActive ? 'text-blue-600 font-semibold' : ''
                  }`
                }
                onClick={toggleMenu}
              >
                Support
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;