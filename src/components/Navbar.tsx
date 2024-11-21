import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg mb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Selise Shuttle
            </Link>
          </div>
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="mobile-menu-button p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/admin"
              className={`relative py-2 px-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md
                ${isAdminRoute ? 'font-semibold' : ''}
              `}
            >
              Admin
              {isAdminRoute && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300 rounded-full"></div>
              )}
            </Link>
          </div>
        </div>

        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden pb-4`}>
          <Link
            to="/admin"
            className={`block py-2 px-4 text-sm ${
              isAdminRoute 
                ? 'bg-gray-100 text-gray-900 font-semibold' 
                : 'text-gray-700 hover:bg-gray-100'
            } rounded-md`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
