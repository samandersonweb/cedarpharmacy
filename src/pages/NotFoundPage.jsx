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
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/refill"
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Prescription Refills</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
