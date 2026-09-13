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
  ArrowRight,
  ArrowUpRight,
  Plus
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
                  `px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center gap-2 ${isActive
                    ? 'bg-blue-50 text-[#092E96] font-bold shadow-2xs'
                    : 'text-slate-700 hover:text-[#092E96] hover:bg-slate-100/80'
                  }`
                }
              >
                <span>{link.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Desktop Action CTA - The Luminous Apothecary Prism Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/refill"
              className="group relative inline-flex items-center gap-3 p-1.5 pr-3 rounded-xl bg-gradient-to-r from-[#0D38B5] via-[#092E96] to-[#061F66] text-white border border-blue-400/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_16px_-2px_rgba(9,46,150,0.4)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_8px_24px_-2px_rgba(9,46,150,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {/* Luminous Shimmer Sheen Sweep */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

              {/* Left Chamber: Apothecary Seal Key */}
              <span className="w-7 h-7 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center shadow-inner group-hover:bg-white group-hover:text-[#092E96] group-hover:scale-105 transition-all duration-300 shrink-0 text-white">
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>

              {/* Center: Bespoke Typography */}
              <span className="text-[12px] font-bold tracking-[0.03em] text-white drop-shadow-xs">
                Transfer Prescription
              </span>

              {/* Right: Trailing Micro Arrow */}
              <span className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center text-blue-100 group-hover:bg-white/25 group-hover:text-white transition-all duration-300 shrink-0">
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile Header Controls */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/refill"
              className="group relative inline-flex items-center gap-2 p-1 pr-2.5 rounded-lg bg-gradient-to-r from-[#0D38B5] via-[#092E96] to-[#061F66] text-white border border-blue-400/30 shadow-xs active:scale-95 transition-all overflow-hidden"
              aria-label="Transfer Prescription"
            >
              <span className="w-6 h-6 rounded-md bg-white/15 border border-white/25 flex items-center justify-center text-white shrink-0">
                <Plus className="w-3 h-3 stroke-[2.5]" />
              </span>
              <span className="text-[11px] font-bold tracking-tight text-white">Transfer Rx</span>
              <ArrowRight className="w-3 h-3 text-blue-200" />
            </Link>

            <a
              href="tel:+16123543851"
              aria-label="Call Cedar Pharmacy"
              className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 hover:text-[#092E96] hover:bg-blue-50 transition-colors flex items-center justify-center border border-slate-200/80"
            >
              <Phone className="w-4 h-4 text-[#092E96]" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
              className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 hover:text-[#092E96] hover:bg-slate-200 transition-colors flex items-center justify-center border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-[#092E96]"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* PORTAL-RENDERED MOBILE DRAWER (Bypasses all sticky / backdrop-filter traps) */}
      {mounted && createPortal(
        <div
          className={`fixed inset-0 z-[9999] md:hidden transition-all duration-300 ${mobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
            }`}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
            className={`fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'
              }`}
          />

          {/* Drawer Panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className={`fixed top-0 right-0 bottom-0 w-[88vw] max-w-sm h-full bg-white text-slate-900 z-10 border-l border-slate-200 shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
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
                          `p-3.5 rounded-xl text-base font-semibold flex items-center justify-between transition-all duration-150 ${isActive
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
                  className="group relative p-3.5 rounded-xl bg-gradient-to-r from-[#0D38B5] via-[#092E96] to-[#061F66] text-white border border-blue-400/35 shadow-md transition-all flex items-center justify-between overflow-hidden"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#092E96] transition-all">
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-200">Express Online Intake</p>
                      <p className="text-sm font-bold text-white">Transfer Prescription</p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white group-hover:bg-white/25 transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>

                {/* Call Pharmacist */}
                <a
                  href="tel:+16123543851"
                  className="group p-3.5 rounded-xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 text-slate-900 transition-all flex items-center justify-between shadow-xs hover:border-blue-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 text-[#092E96] flex items-center justify-center shrink-0 group-hover:bg-[#092E96] group-hover:text-white transition-all">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Direct Pharmacist</p>
                      <p className="text-sm font-bold text-slate-900 leading-tight">(612) 354-3851</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#092E96] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60">
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

