import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Close menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-dark/95 backdrop-blur-md border-b border-light/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-50">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 select-none" onClick={closeMenu}>
          <img src="/logo.png" alt="DYC EDUWORKS" className="h-10 w-10 object-contain" />
          <span className="text-xl font-black tracking-tighter">
            <span className="text-teal">DYC</span><span className="text-light"> EDUWORKS</span>
          </span>
        </Link>

        {/* Desktop Links */}
        {!isAdmin && (
          <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest text-light/60">
            <Link to="/#home" className="hover:text-teal transition-colors">Home</Link>
            <Link to="/#services" className="hover:text-teal transition-colors">Services</Link>
            <Link to="/#team" className="hover:text-teal transition-colors">Team</Link>
            <Link to="/#about" className="hover:text-teal transition-colors">About</Link>
            <Link to="/#contact" className="hover:text-teal transition-colors">Contact</Link>
          </div>
        )}

        {/* Desktop CTA */}
        {!isAdmin && (
          <Link
            to="/project-form"
            className="hidden md:flex bg-teal text-dark px-6 py-2 font-bold text-sm hover:bg-light transition-all duration-300 items-center group"
          >
            LET'S TALK <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}

        {/* Hamburger Toggle */}
        {!isAdmin && (
          <button
            onClick={toggleMenu}
            className="md:hidden text-light hover:text-teal focus:outline-none transition-colors p-2 z-50 flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {!isAdmin && (
        <div
          className={`absolute top-full left-0 w-full bg-dark/95 border-b border-light/10 md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[380px] opacity-100 py-6 border-t border-light/5' : 'max-h-0 opacity-0 py-0 border-t-0 pointer-events-none'
          } overflow-hidden`}
        >
          <div className="flex flex-col items-center space-y-4 text-sm font-bold uppercase tracking-widest text-light/80 px-6">
            <Link to="/#home" onClick={closeMenu} className="hover:text-teal transition-colors py-2 block w-full text-center">Home</Link>
            <Link to="/#services" onClick={closeMenu} className="hover:text-teal transition-colors py-2 block w-full text-center">Services</Link>
            <Link to="/#team" onClick={closeMenu} className="hover:text-teal transition-colors py-2 block w-full text-center">Team</Link>
            <Link to="/#about" onClick={closeMenu} className="hover:text-teal transition-colors py-2 block w-full text-center">About</Link>
            <Link to="/#contact" onClick={closeMenu} className="hover:text-teal transition-colors py-2 block w-full text-center">Contact</Link>
            
            <Link
              to="/project-form"
              onClick={closeMenu}
              className="bg-teal text-dark px-8 py-3 font-bold text-xs hover:bg-light transition-all duration-300 flex items-center justify-center group mt-2 w-full max-w-[200px]"
            >
              LET'S TALK <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
