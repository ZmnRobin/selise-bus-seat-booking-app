import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg mb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <svg 
              className="h-8 w-8 text-blue-600"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-800">Selise</span>
              <span className="text-2xl font-light text-blue-600 ml-1">Shuttle</span>
            </Link>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/admin"
              className={`relative px-4 py-2 rounded-full transition-all duration-300 ease-in-out
                ${isAdminRoute 
                  ? 'bg-blue-50 text-blue-600 font-semibold' 
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <span className="relative z-10">Admin Panel</span>
              {isAdminRoute && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full"></div>
              )}
            </Link>
          </div>
        </div>

        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden pb-4`}>
          <Link
            to="/admin"
            className={`block px-4 py-2 rounded-md ${
              isAdminRoute 
                ? 'bg-blue-50 text-blue-600 font-semibold' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
