import React from 'react';
import { MapPin, Phone } from 'lucide-react';

export default function TopBar() {
  return (
    <aside className="bg-slate-950 text-slate-300 text-xs border-b border-slate-800/80 py-2 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>417 Cedar Ave, Minneapolis, MN 55454</span>
          </span>
          <span className="hidden md:inline text-slate-700">|</span>
          <a
            href="tel:+16123543851"
            className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors group"
          >
            <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="font-medium">+1 612-354-3851</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
