import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, Pill, Menu, X, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm">
      {/* Top subtle blue brand accent line */}
      <div className="h-1 w-full bg-[#092E96]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">

        {/* Brand Logo inside clean navy container for optimal white text contrast */}
        <Link
          to="/"
          className="flex items-center group focus:outline-none focus:ring-2 focus:ring-blue-600/30 rounded-lg"
        >
          <div className="bg-[#051538] px-3.5 py-1.5 rounded-lg border border-slate-800 shadow-sm group-hover:bg-[#071d4d] transition-colors flex items-center">
            <img
              src="/images/ceder_logo_png.png"
              alt="Cedar Pharmacy Logo"
              className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>
        </Link>

        {/* Desktop Nav Links - Standard Healthcare Layout */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center gap-2 ${isActive
                  ? 'bg-blue-50 text-[#092E96] font-bold border-b-2 border-[#092E96]'
                  : 'text-slate-700 hover:text-[#092E96] hover:bg-slate-100/80'
                }`
              }
            >
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Desktop Action CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/refill"
            className="px-5 py-2.5 rounded-md text-sm font-semibold text-white bg-[#092E96] hover:bg-[#061F69] transition-colors duration-150 flex items-center gap-2 shadow-xs"
          >
            <Pill className="w-4 h-4 text-blue-100" />
            <span>Transfer Prescription</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open Navigation Menu"
          className="md:hidden p-2.5 rounded-lg text-slate-700 hover:text-[#092E96] hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#092E96]"
        >
          <Menu className="w-6 h-6" />
        </button>

      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white text-slate-900 z-50 border-l border-slate-200 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <div className="bg-[#051538] px-3 py-1 rounded-lg">
              <img
                src="/images/ceder_logo_png.png"
                alt="Cedar Pharmacy"
                className="h-8 w-auto object-contain"
              />
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Navigation Menu"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 focus:outline-none focus:ring-2 focus:ring-[#092E96]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <div className="p-6 flex-1 flex flex-col gap-2 overflow-y-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Navigation</p>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `p-3.5 rounded-lg text-sm font-semibold flex items-center justify-between transition-all ${isActive
                  ? 'bg-blue-50 text-[#092E96] border-l-4 border-[#092E96] font-bold pl-4'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 pl-3.5'
                }`
              }
            >
              <span>{link.name}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </NavLink>
          ))}

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3">
            <Link
              to="/refill"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-4 rounded-lg text-center text-sm font-bold text-white bg-[#092E96] hover:bg-[#061F69] shadow-sm flex items-center justify-center gap-2"
            >
              <Pill className="w-4 h-4" />
              <span>Transfer Prescription</span>
            </Link>
            <a
              href="tel:+16123543851"
              className="py-3 px-4 rounded-lg text-center text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#092E96]" />
              <span>Call: (612) 354-3851</span>
            </a>
          </div>
        </div>

        {/* Drawer Footer Info */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 text-xs text-slate-600">
          <p className="font-bold text-slate-900">Ceder Pharmacy</p>
          <p className="mt-0.5">417 Cedar Ave, Minneapolis, MN 55454</p>
          <p className="mt-2 text-[11px] text-slate-500">Mon-Sat: 9:00 AM - 7:00 PM • Sun: Closed</p>
        </div>
      </div>
    </header>
  );
}

