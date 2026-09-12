import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function TopBar() {
  return (
    <aside className="bg-slate-950 text-slate-300 text-xs border-b border-slate-800/80 py-2 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Address with Pin */}
        <div className="flex items-center gap-2 min-w-0">
          <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span className="truncate text-[11px] sm:text-xs text-slate-300">
            417 Cedar Ave, Minneapolis, MN 55454
          </span>
        </div>

        {/* Right: Hours & Tap-to-Call */}
        <div className="flex items-center gap-3 shrink-0 text-[11px] sm:text-xs">
          <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Mon–Sat: 9:00 AM – 7:00 PM</span>
          </span>

          <span className="hidden md:inline text-slate-700">|</span>

          <a
            href="tel:+16123543851"
            className="inline-flex items-center gap-1.5 font-semibold text-white bg-slate-800/90 hover:bg-[#092E96] border border-slate-700/70 hover:border-[#092E96] px-2.5 py-1 rounded-md transition-all duration-150 active:scale-95"
            title="Call Cedar Pharmacy"
          >
            <Phone className="w-3 h-3 text-sky-400 shrink-0" />
            <span>(612) 354-3851</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
