import React from 'react';
import { Link } from 'react-router-dom';
import {
  Pill,
  Syringe,
  Repeat,
  ShoppingBag,
  Truck,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  Sparkles,
  Phone,
  ShieldCheck
} from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      id: 'dispensing',
      icon: Pill,
      badge: 'Core Specialty',
      title: 'Precision Prescription Dispensing',
      description: 'Computer-guided precision dispensing with multi-stage pharmacist verification for absolute safety and speed. We maintain extensive inventory for hard-to-find medications.',
      features: [
        'Automated Refill Reminders via SMS/Call',
        'Multi-dose Blister Packaging available',
        'Generic substitution cost-savings review',
        '5-10 minute in-store turnaround'
      ],
      linkText: 'Refill a Prescription',
      linkUrl: '/refill'
    },
    {
      id: 'immunizations',
      icon: Syringe,
      badge: 'Walk-ins Welcome',
      title: 'Immunizations & Vaccinations',
      description: 'Certified immunizing pharmacists providing gentle, safe vaccine administration for adults and children. Protect yourself and your family year-round.',
      features: [
        'Annual Influenza (Flu) Shots',
        'COVID-19 Boosters & Primary Series',
        'Shingles (Shingrix) & RSV Vaccines',
        'Pneumococcal & Tdap Booster'
      ],
      linkText: 'Schedule or Walk-in Info',
      linkUrl: '/contact'
    },
    {
      id: 'mtm',
      icon: Stethoscope,
      badge: 'Personalized Care',
      title: 'Medication Therapy Management (MTM)',
      description: 'Private 1-on-1 consultations with our senior clinical pharmacist to optimize your dosage schedule, prevent harmful drug interactions, and reduce out-of-pocket costs.',
      features: [
        'Comprehensive Medication Review (CMR)',
        'Personalized Pill Schedule Chart',
        'Direct Prescriber Consultation',
        'Insurance Coverage Optimization'
      ],
      linkText: 'Book MTM Consultation',
      linkUrl: '/contact'
    },
    {
      id: 'transfers',
      icon: Repeat,
      badge: 'Zero Effort Switch',
      title: 'Hassle-Free Rx Transfers',
      description: 'Tired of big-box chain pharmacy delays? Transferring to Ceder Pharmacy takes under 60 seconds. Simply give us your prescription name or previous pharmacy info.',
      features: [
        'Direct contact with your previous pharmacy',
        'Prescriber authorization transfer',
        'Insurance copay matching & discounts',
        'First-refill welcome consultation'
      ],
      linkText: 'Transfer Prescription',
      linkUrl: '/contact'
    },
    {
      id: 'delivery',
      icon: Truck,
      badge: 'Same-Day Metro Delivery',
      title: 'Home Delivery & Curbside Pickup',
      description: 'Can’t leave home or pressed for time? We deliver directly to your doorstep across Minneapolis and surrounding metro neighborhoods.',
      features: [
        'Same-day local courier delivery',
        'Temperature-controlled transit',
        'Contactless drive-up curbside pickup',
        'Free delivery on qualifying chronic maintenance meds'
      ],
      linkText: 'Request Delivery',
      linkUrl: '/refill'
    },
    {
      id: 'otc',
      icon: ShoppingBag,
      badge: 'Pharmacist Curated',
      title: 'OTC Health & Wellness Essentials',
      description: 'A curated selection of clinically backed over-the-counter vitamins, first aid kits, allergy relief, diabetic monitoring supplies, and diagnostic blood pressure cuffs.',
      features: [
        'Professional-grade vitamin supplements',
        'Diabetic testing strips & lancets',
        'Durable medical equipment & supports',
        'Pharmacist product recommendations'
      ],
      linkText: 'Inquire About Products',
      linkUrl: '/contact'
    }
  ];

  return (
    <div className="flex-grow bg-[#F8FAFC] text-slate-900 min-h-screen">

      {/* HEADER HERO */}
      <section className="relative py-14 sm:py-20 overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50 to-blue-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-[#092E96] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#092E96]" />
            <span>Comprehensive Clinical Services</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Full-Spectrum Pharmacy Care for <span className="text-[#092E96]">Minneapolis</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From precision prescription dispensing to specialized immunizations and metro delivery, Ceder Pharmacy offers modern healthcare with genuine community warmth.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className="bg-white rounded-xl p-7 border border-slate-200 shadow-xs hover:border-[#092E96]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-11 h-11 rounded-lg bg-blue-50 text-[#092E96] flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#092E96] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 mb-6 border-t border-slate-100 pt-4">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to={service.linkUrl}
                  className="w-full py-3 px-4 rounded-lg text-sm font-bold text-[#092E96] bg-blue-50 hover:bg-blue-100 flex items-center justify-center gap-2 transition-all"
                >
                  <span>{service.linkText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY CHOOSE US FOOTER BANNER */}
      <section className="py-14 bg-white border-t border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-slate-900">Have a specific health or prescription question?</h3>
            <p className="text-sm text-slate-600">Our clinical team is ready to assist you by phone or walk-in consultation.</p>
          </div>
          <Link
            to="/contact"
            className="px-7 py-3.5 rounded-lg text-sm font-bold text-white bg-[#092E96] hover:bg-[#061F69] shadow-sm transition-all shrink-0"
          >
            Contact Our Clinical Team
          </Link>
        </div>
      </section>
    </div>
  );
}
