import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Pill, 
  Menu, 
  X, 
  ChevronRight, 
  Home, 
  Building2, 
  Stethoscope, 
  MapPin, 
  Clock, 
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open & listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About Us', path: '/about', icon: Building2 },
    { name: 'Services', path: '/services', icon: Stethoscope },
    { name: 'Contact & Map', path: '/contact', icon: MapPin },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        {/* Top subtle blue brand accent line */}
        <div className="h-1 w-full bg-[#092E96]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">

          {/* Brand Logo */}
          <Link
            to="/"
            aria-label="Cedar Pharmacy Home"
            className="flex items-center group focus:outline-none focus:ring-2 focus:ring-blue-600/30 rounded-lg shrink-0"
          >
            <div className="bg-[#051538] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl border border-slate-800 shadow-xs group-hover:bg-[#071d4d] transition-colors flex items-center">
              <img
                src="/images/ceder_logo_png.png"
                alt="Cedar Pharmacy Logo"
                className="h-8 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-50 text-[#092E96] font-bold shadow-2xs'
                      : 'text-slate-700 hover:text-[#092E96] hover:bg-slate-100/80'
                  }`
                }
              >
                <span>{link.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Desktop Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/refill"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#092E96] hover:bg-[#061F69] shadow-xs hover:shadow-sm active:scale-[0.98] transition-all duration-150 flex items-center gap-2"
            >
              <Pill className="w-4 h-4 text-sky-200" />
              <span>Transfer Prescription</span>
            </Link>
          </div>

          {/* Mobile Header Controls */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/refill"
              className="inline-flex items-center gap-1.5 bg-[#092E96] hover:bg-[#061F69] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-xs active:scale-95 transition-all"
              aria-label="Transfer Prescription"
            >
              <Pill className="w-3.5 h-3.5 text-sky-200" />
              <span>Transfer Rx</span>
            </Link>

            <a
              href="tel:+16123543851"
              aria-label="Call Cedar Pharmacy"
              className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 hover:text-[#092E96] hover:bg-blue-50 active:scale-95 transition-all flex items-center justify-center border border-slate-200/60"
            >
              <Phone className="w-4 h-4 text-[#092E96]" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
              className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 hover:text-[#092E96] hover:bg-slate-200 active:scale-95 transition-all flex items-center justify-center border border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-[#092E96]"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* PORTAL-RENDERED MOBILE DRAWER (Bypasses all sticky / backdrop-filter traps) */}
      {mounted && createPortal(
        <div
          className={`fixed inset-0 z-[9999] md:hidden transition-all duration-300 ${
            mobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          }`}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
            className={`fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Drawer Panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className={`fixed top-0 right-0 bottom-0 w-[88vw] max-w-sm h-full bg-white text-slate-900 z-10 border-l border-slate-200 shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                <div className="bg-[#051538] px-3 py-1 rounded-xl shadow-xs">
                  <img
                    src="/images/ceder_logo_png.png"
                    alt="Cedar Pharmacy"
                    className="h-7 w-auto object-contain"
                  />
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Navigation Menu"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#092E96]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body with Navigation Links Front & Center */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">

              {/* 1. Main Navigation Links (Prominent & Clear) */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                  Navigation
                </p>
                <div className="space-y-1.5">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <NavLink
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `p-3.5 rounded-xl text-base font-semibold flex items-center justify-between transition-all duration-150 ${
                            isActive
                              ? 'bg-blue-50 text-[#092E96] font-bold border-l-4 border-[#092E96]'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                          }`
                        }
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-[#092E96] shrink-0" />
                          <span>{link.name}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </NavLink>
                    );
                  })}
                </div>
              </div>

              {/* 2. Quick Patient Actions */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                  Patient Services
                </p>

                {/* Transfer Rx CTA */}
                <Link
                  to="/refill"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3.5 rounded-xl bg-[#092E96] text-white shadow-sm hover:bg-[#061F69] active:scale-[0.98] transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                      <Pill className="w-4 h-4 text-sky-200" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">Transfer Prescription</p>
                      <p className="text-[11px] text-sky-200">Online Rx transfer intake</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-sky-200 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                {/* Call Pharmacist */}
                <a
                  href="tel:+16123543851"
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 active:scale-[0.98] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#092E96]/10 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-[#092E96]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-tight">(612) 354-3851</p>
                      <p className="text-[11px] text-slate-500">Direct pharmacist line</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#092E96] bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                    Call
                  </span>
                </a>
              </div>

              {/* 3. Pharmacy Location & Hours Card */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-slate-900">Mon–Sat: 9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex items-start gap-2 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-[#092E96] shrink-0 mt-0.5" />
                  <span>417 Cedar Ave, Minneapolis, MN 55454</span>
                </div>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-3.5 border-t border-slate-100 bg-slate-50 text-center shrink-0">
              <p className="text-[11px] text-slate-400">
                © {new Date().getFullYear()} Ceder Pharmacy • Minneapolis, MN
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

