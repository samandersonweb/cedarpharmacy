import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function Footer() {
  return (
    <footer className="bg-[#051433] text-slate-300 border-t border-slate-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <div className="bg-[#051538] px-3.5 py-1.5 rounded-lg border border-slate-800 shadow-sm inline-flex items-center">
                <img
                  src="/images/ceder_logo_png.png"
                  alt="Ceder Pharmacy"
                  className="h-9 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your trusted independent community pharmacy in Minneapolis. Personalized medication care, fast prescription refills, and expert pharmacist consultations.
            </p>
            <div className="pt-2">
              <StatusBadge dark={true} />
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  Pharmacy Services
                </Link>
              </li>
              <li>
                <Link to="/refill" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  Transfer Prescription
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  Contact & Hours
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Pharmacy Hours */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              Hours of Operation
            </h3>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Monday – Friday</span>
                <span className="text-slate-200 font-semibold">9:00 AM – 7:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Saturday</span>
                <span className="text-slate-200 font-semibold">9:00 AM – 7:00 PM</span>
              </div>
              <div className="flex justify-between py-1 text-slate-400">
                <span>Sunday</span>
                <span className="text-rose-400 font-semibold">Closed</span>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Address */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Location & Contact
            </h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>417 Cedar Ave, Minneapolis, MN 55454</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:+16123543851" className="text-slate-200 font-semibold hover:text-white transition-colors">
                  +1 (612) 354-3851
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Ceder Pharmacy. All rights reserved. Minneapolis, MN.</p>
        </div>

      </div>
    </footer>
  );
}

