import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Award, 
  Heart, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Plus
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex-grow bg-[#F8FAFC] text-slate-900">
      
      {/* HERO SECTION */}
      <section className="relative py-14 sm:py-20 border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-blue-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-[#092E96] text-xs font-bold uppercase tracking-wider shadow-xs">
            <Heart className="w-3.5 h-3.5 text-[#092E96]" />
            <span>Serving Minneapolis Neighborhoods</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Your Dedicated Local Healthcare Advocates at <span className="text-[#092E96]">Ceder Pharmacy</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Founded with a commitment to compassionate personal care, Ceder Pharmacy provides Minneapolis families with accurate, fast, and personalized pharmacy services.
          </p>
        </div>
      </section>

      {/* STORY & MISSION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-[#092E96] uppercase tracking-wider">Our Community Mission</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              Independent Healthcare Built on Personal Relationships
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We believe healthcare should be accessible, transparent, and patient-centered. Located at 417 Cedar Ave, Ceder Pharmacy serves the Cedar-Riverside and broader Minneapolis community with dignity and care.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Unlike large retail chains where pharmacists are rushed behind glass dividers, our team is directly accessible. We take the time to answer every question, check for medication interactions, and help lower out-of-pocket costs.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Licensed Staff</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Automation Hold Times</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Twin Cities Metro Delivery</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Core Pillars of Our Service
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#092E96] flex items-center justify-center shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Accuracy & Patient Safety</h4>
                    <p className="text-xs text-slate-600">Multi-stage computer verification for zero-error dispensing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#092E96] flex items-center justify-center shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Patient Cost Optimization</h4>
                    <p className="text-xs text-slate-600">We work to find manufacturer discounts and lower copays.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#092E96] flex items-center justify-center shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Community Respect</h4>
                    <p className="text-xs text-slate-600">Culturally sensitive care serving the diverse Minneapolis population.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/refill"
                  className="group relative w-full inline-flex items-center justify-between p-2 pr-4 rounded-xl bg-gradient-to-r from-[#0D38B5] via-[#092E96] to-[#061F66] text-white border border-blue-400/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_6px_20px_-2px_rgba(9,46,150,0.4)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_10px_28px_-2px_rgba(9,46,150,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                  <span className="w-8 h-8 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center shadow-inner group-hover:bg-white group-hover:text-[#092E96] group-hover:scale-105 transition-all duration-300 shrink-0 text-white">
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </span>
                  <div className="text-left flex-1 px-3">
                    <span className="text-[9px] font-black uppercase tracking-[0.16em] text-blue-200 block leading-none mb-0.5">
                      Fast 1-Min Service
                    </span>
                    <span className="text-sm font-extrabold tracking-tight text-white block">
                      Refill or Transfer Prescriptions
                    </span>
                  </div>
                  <span className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-blue-100 group-hover:bg-white/25 group-hover:text-white transition-all duration-300 shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-14 bg-[#092E96] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Visit Ceder Pharmacy Today</h2>
          <p className="text-sm text-blue-100 max-w-xl mx-auto">
            417 Cedar Ave, Minneapolis, MN 55454. We are ready to assist you.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 p-2 pr-5 rounded-xl bg-gradient-to-b from-white to-slate-50 text-slate-900 border border-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden"
            >
              <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#092E96] group-hover:bg-[#092E96] group-hover:text-white group-hover:scale-105 transition-all duration-300 shrink-0">
                <MapPin className="w-4 h-4" />
              </span>
              <div className="text-left">
                <span className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400 group-hover:text-[#092E96]/70 block leading-none mb-0.5 transition-colors">
                  Minneapolis Dispensary
                </span>
                <span className="text-sm font-extrabold tracking-tight text-slate-900 group-hover:text-[#092E96] block transition-colors">
                  Get Location & Hours
                </span>
              </div>
              <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-600 group-hover:bg-[#092E96] group-hover:text-white transition-all duration-300 shrink-0 ml-1">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
