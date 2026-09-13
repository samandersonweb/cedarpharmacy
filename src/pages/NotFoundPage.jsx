import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex-grow flex items-center justify-center py-24 px-4 bg-slate-50">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-soft">
        <span className="text-6xl font-black text-blue-700 block">404</span>
        <h1 className="text-2xl font-extrabold text-slate-900">Page Not Found</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          The page or medication link you are looking for does not exist or has been moved.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="group relative w-full sm:w-auto inline-flex items-center gap-3 p-2 pr-4 rounded-xl bg-gradient-to-r from-[#0D38B5] via-[#092E96] to-[#061F66] text-white border border-blue-400/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_16px_-2px_rgba(9,46,150,0.4)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_8px_24px_-2px_rgba(9,46,150,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden"
          >
            <span className="w-8 h-8 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#092E96] transition-all">
              <Home className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold tracking-tight text-white">Back to Home</span>
          </Link>
          <Link
            to="/refill"
            className="group relative w-full sm:w-auto inline-flex items-center gap-3 p-2 pr-4 rounded-xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 text-slate-800 hover:border-blue-300 hover:text-[#092E96] shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#092E96] group-hover:bg-[#092E96] group-hover:text-white transition-all">
              <ArrowLeft className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold tracking-tight">Prescription Refills</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
