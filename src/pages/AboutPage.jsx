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
  ArrowRight 
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
                  className="w-full py-3 px-4 rounded-lg text-sm font-bold text-white bg-[#092E96] hover:bg-[#061F69] flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Refill or Transfer Prescriptions</span>
                  <ArrowRight className="w-4 h-4" />
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
          <div className="pt-2 flex justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-lg text-xs font-bold text-[#092E96] bg-white hover:bg-slate-100 transition-colors"
            >
              Get Location & Hours
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
