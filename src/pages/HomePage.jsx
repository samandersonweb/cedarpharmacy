import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Users,
  Pill,
  Syringe,
  FileText,
  Repeat,
  ShoppingBag,
  Truck,
  Star,
  MapPin,
  Phone,
  Sparkles,
  Search,
  HeartPulse,
  Plus
} from 'lucide-react';

export default function HomePage() {
  const servicesList = [
    {
      id: 'dispensing',
      category: 'prescriptions',
      icon: Pill,
      badge: 'Auto-Sync Available',
      badgeColor: 'bg-blue-50 text-[#092E96] border-blue-200/80',
      title: 'Precision Dispensing & Auto-Refill',
      desc: 'Accurate medication preparation verified by licensed pharmacists, with automatic monthly synchronization and generic cost savings.',
      features: [
        'Automated SMS & phone refill alerts',
        'Generic substitution price matching',
        'Direct consultation on every refill'
      ],
      actionText: 'Refill or Transfer Online',
      actionLink: '/refill',
      isPrimary: true
    },
    {
      id: 'vaccines',
      category: 'clinical',
      icon: Syringe,
      badge: 'No Appointment Needed',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      title: 'Immunizations & Vaccinations',
      desc: 'Protect yourself and your loved ones with walk-in vaccinations administered gently by certified pharmacists in our private consultation room.',
      features: [
        'Flu shots, COVID-19 boosters & RSV',
        'Shingles, Tdap & travel vaccines',
        'Direct documentation sent to your doctor'
      ],
      actionText: 'Learn About Vaccines',
      actionLink: '/services'
    },
    {
      id: 'transfers',
      category: 'prescriptions',
      icon: Repeat,
      badge: 'Zero Effort On Your Part',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200/80',
      title: 'Hassle-Free Rx Transfers',
      desc: 'Switching from large retail chains is seamless. Just give us your prescription name or bottle number, and we handle all communication.',
      features: [
        'We contact your previous pharmacy directly',
        'Preserve your existing insurance & copays',
        'Zero doctor phone tag or paperwork for you'
      ],
      actionText: 'Transfer Prescription',
      actionLink: '/contact'
    },
    {
      id: 'mtm',
      category: 'clinical',
      icon: FileText,
      badge: '1-on-1 Consultation',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200/80',
      title: 'Medication Therapy Management',
      desc: 'Comprehensive one-on-one reviews designed to prevent adverse drug interactions, eliminate duplicates, and streamline daily dosages.',
      features: [
        'Detailed regimen & side-effect audit',
        'Close coordination with your prescribing doctor',
        'Clear, personalized medication schedule'
      ],
      actionText: 'Request MTM Review',
      actionLink: '/services'
    },
    {
      id: 'delivery',
      category: 'wellness',
      icon: Truck,
      badge: 'Minneapolis Metro',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200/80',
      title: 'Home Delivery & Rapid Pickup',
      desc: 'Enjoy reliable doorstep delivery across the Minneapolis metro area, or stop by 417 Cedar Ave for rapid curbside pickup.',
      features: [
        'Temperature-controlled, secure transport',
        'Convenient doorstep delivery schedules',
        'Easy curbside handoff upon arrival'
      ],
      actionText: 'Delivery Options',
      actionLink: '/services'
    },
    {
      id: 'wellness',
      category: 'wellness',
      icon: ShoppingBag,
      badge: 'Pharmacist-Curated',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200/80',
      title: 'Health, Wellness & OTC Essentials',
      desc: 'From high-potency vitamins to certified clinical blood pressure monitors, our shelves feature only products approved by our clinical team.',
      features: [
        'Therapeutic vitamins & daily supplements',
        'Diagnostic monitors, test kits & first aid',
        'Pharmacist guidance on OTC interactions'
      ],
      actionText: 'Explore Wellness Products',
      actionLink: '/services'
    }
  ];

  const testimonials = [
    {
      quote: "Ceder Pharmacy is a true gem in Minneapolis. The pharmacists take time to explain every detail of my medication and always greet me warmly.",
      author: "Farhan M.",
      location: "Cedar-Riverside Resident",
      rating: 5
    },
    {
      quote: "Transferred my prescriptions from a huge chain and couldn't be happier. Zero waiting in long lines and refills are ready in under 10 minutes.",
      author: "Sarah J.",
      location: "Minneapolis, MN",
      rating: 5
    },
    {
      quote: "The free metro delivery service has been a lifesaver for my family. Professional, reliable, and deeply caring pharmacy team.",
      author: "David K.",
      location: "Twin Cities Metro",
      rating: 5
    }
  ];

  return (
    <div className="flex-grow bg-cedar-canvas text-slate-900">

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:py-20 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Hero Left Text Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Trusted Healthcare Built Around Your Life at <span className="text-[#092E96]">Ceder Pharmacy</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                At Ceder Pharmacy in Minneapolis, we make your healthcare experience simple, personal, and convenient. Enjoy fast prescription refills, direct access to our pharmacists, and caring service from a team that truly knows its community.
              </p>

              {/* Primary & Secondary CTAs — Luminous Apothecary Prism Architecture */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  to="/refill"
                  className="group relative w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 p-2 pr-4 rounded-xl bg-gradient-to-r from-[#0D38B5] via-[#092E96] to-[#061F66] text-white border border-blue-400/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_6px_20px_-2px_rgba(9,46,150,0.4)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),0_10px_28px_-2px_rgba(9,46,150,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden"
                >
                  {/* Dynamic Shimmer Sheen Ray */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                  {/* Left Chamber: Apothecary Key */}
                  <span className="w-9 h-9 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center shadow-inner group-hover:bg-white group-hover:text-[#092E96] group-hover:scale-105 transition-all duration-300 shrink-0 text-white">
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </span>

                  {/* Center: Two-Tier Editorial Typography */}
                  <div className="text-left flex-1 sm:flex-none">
                    <span className="text-[9px] font-black uppercase tracking-[0.16em] text-blue-200 block leading-none mb-0.5">
                      Instant Online Intake
                    </span>
                    <span className="text-sm font-extrabold tracking-tight text-white block">
                      Transfer Prescription
                    </span>
                  </div>

                  {/* Right: Dynamic Action Slider */}
                  <span className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-blue-100 group-hover:bg-white/25 group-hover:text-white transition-all duration-300 shrink-0 ml-1">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>

                <Link
                  to="/contact"
                  className="group relative w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 p-2 pr-4 rounded-xl bg-gradient-to-b from-white to-slate-50 text-slate-900 border border-slate-200/90 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_10px_rgba(15,23,42,0.06)] hover:border-blue-300 hover:shadow-[0_6px_20px_rgba(9,46,150,0.12)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden"
                >
                  {/* Left Chamber: Direct Phone Key */}
                  <span className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100/80 flex items-center justify-center text-[#092E96] group-hover:bg-[#092E96] group-hover:text-white group-hover:scale-105 transition-all duration-300 shrink-0">
                    <Phone className="w-4 h-4" />
                  </span>

                  {/* Center: Two-Tier Typography */}
                  <div className="text-left flex-1 sm:flex-none">
                    <span className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400 group-hover:text-[#092E96]/70 block leading-none mb-0.5 transition-colors">
                      Direct Pharmacist Line
                    </span>
                    <span className="text-sm font-extrabold tracking-tight text-slate-800 group-hover:text-[#092E96] block transition-colors">
                      Contact Pharmacists
                    </span>
                  </div>

                  {/* Right: Dynamic Action Slider */}
                  <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-[#092E96] transition-all duration-300 shrink-0 ml-1">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 gap-4 text-left">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-900">Licensed Team</p>
                  <p className="text-[11px] text-slate-500">Direct Pharmacist Access</p>
                </div>
                <div className="border-l border-slate-200 pl-4 space-y-0.5">
                  <p className="text-xs font-bold text-slate-900">Metro Delivery</p>
                  <p className="text-[11px] text-slate-500">Minneapolis Doorstep Service</p>
                </div>
              </div>

            </div>

            {/* Hero Right Visual Focal Point */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#092E96]/20 to-sky-400/20 rounded-3xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/90 bg-white">
                <img
                  src="/images/dispensing-lab.jpg"
                  alt="Ceder Pharmacy Dispensing Laboratory"
                  className="w-full h-80 sm:h-96 object-cover"
                />

                {/* Visual Accent Badge overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-xl border border-slate-700/60 shadow-lg flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#092E96] text-white flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">417 Cedar Ave, Minneapolis</p>
                      <p className="text-[11px] text-slate-300">Open Mon-Sat: 9:00 AM – 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. IMMEDIATE PRESCRIPTION TRANSFER ACTION SECTION */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 -mt-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-md p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

            <div className="lg:col-span-6 space-y-1">
              <div className="flex items-center gap-2 text-[#092E96]">
                <Pill className="w-5 h-5" />
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Transfer Your Prescriptions to Cedar</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                Takes about a minute. We'll contact your current pharmacy directly — no calls needed on your end.
              </p>
            </div>

            <div className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-end gap-3.5">
              <Link
                to="/refill"
                className="group relative w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 p-2 pr-4 rounded-xl bg-gradient-to-r from-[#0D38B5] via-[#092E96] to-[#061F66] text-white border border-blue-400/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_6px_20px_-2px_rgba(9,46,150,0.4)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),0_10px_28px_-2px_rgba(9,46,150,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden"
              >
                {/* Dynamic Shimmer Sheen Ray */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                {/* Left Chamber: Apothecary Key */}
                <span className="w-9 h-9 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center shadow-inner group-hover:bg-white group-hover:text-[#092E96] group-hover:scale-105 transition-all duration-300 shrink-0 text-white">
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </span>

                {/* Center: Two-Tier Editorial Typography */}
                <div className="text-left flex-1 sm:flex-none">
                  <span className="text-[9px] font-black uppercase tracking-[0.16em] text-blue-200 block leading-none mb-0.5">
                    Takes 1 Minute
                  </span>
                  <span className="text-sm font-extrabold tracking-tight text-white block">
                    Start Online Transfer
                  </span>
                </div>

                {/* Right: Dynamic Action Slider */}
                <span className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-blue-100 group-hover:bg-white/25 group-hover:text-white transition-all duration-300 shrink-0 ml-1">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>

              <a
                href="tel:+16123543851"
                className="group relative w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 p-2 pr-4 rounded-xl bg-gradient-to-b from-white to-slate-50 text-slate-900 border border-slate-200/90 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_10px_rgba(15,23,42,0.06)] hover:border-blue-300 hover:shadow-[0_6px_20px_rgba(9,46,150,0.12)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden"
              >
                {/* Left Chamber: Phone Icon Key */}
                <span className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100/80 flex items-center justify-center text-[#092E96] group-hover:bg-[#092E96] group-hover:text-white group-hover:scale-105 transition-all duration-300 shrink-0">
                  <Phone className="w-4 h-4" />
                </span>

                {/* Center: Two-Tier Typography */}
                <div className="text-left flex-1 sm:flex-none">
                  <span className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400 group-hover:text-[#092E96]/70 block leading-none mb-0.5 transition-colors">
                    Direct Pharmacist Line
                  </span>
                  <span className="text-sm font-extrabold tracking-tight text-slate-800 group-hover:text-[#092E96] block transition-colors">
                    (612) 354–3851
                  </span>
                </div>

                {/* Right: Dynamic Action Slider */}
                <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-[#092E96] transition-all duration-300 shrink-0 ml-1">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </a>
            </div>

          </div>
        </div>
      </section>


      {/* 3. TRUST-BUILDING HIGHLIGHTS WITH IMPROVED SECTION TITLE */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-[#092E96] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#092E96]" />
            <span>Patient-First Standards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Healthcare Excellence You Can Rely On
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We prioritize patient safety, medication accuracy, and personal relationships over corporate retail volume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#092E96] flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Zero Long Waiting Lines</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Most prescriptions are filled in 5 to 10 minutes so you can get back to your routine without delay.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#092E96] flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Direct Pharmacist Access</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Speak directly with licensed clinical pharmacists who know you by name and thoroughly review your meds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#092E96] flex items-center justify-center font-bold">
              <Repeat className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Automated Refill Sync</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never worry about running out of vital prescriptions with our automated monthly refill synchronization.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#092E96] flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Twin Cities Metro Delivery</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Discreet and safe home prescription delivery right to your door anywhere in the Minneapolis metro area.
            </p>
          </div>
        </div>
      </section>


      {/* 4. COMPREHENSIVE PHARMACY CARE SERVICES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div>

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#092E96] text-xs font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#092E96]" />
              <span>Full-Spectrum Pharmacy Care</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Personalized Healthcare Services
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Whether you need rapid prescription refills, walk-in vaccinations, or 1-on-1 medication reviews, our licensed pharmacists are here to support your daily wellness.
            </p>
          </div>

          {/* Services Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {servicesList.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 hover:shadow-lg ${service.isPrimary
                    ? 'border-blue-200 shadow-sm ring-1 ring-blue-500/10'
                    : 'border-slate-200/90 shadow-xs hover:border-slate-300'
                    }`}
                >
                  {/* Card Top Header & Content */}
                  <div className="p-6 sm:p-7 space-y-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-[#092E96] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#092E96] group-hover:text-white transition-all duration-200">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${service.badgeColor}`}>
                        {service.badge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#092E96] transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    {/* Key Highlights Checklist */}
                    <ul className="space-y-2.5 pt-2 border-t border-slate-100">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-6 sm:p-7 pt-0">
                    <Link
                      to={service.actionLink}
                      className={service.isPrimary
                        ? "group/btn relative w-full inline-flex items-center justify-between p-1.5 pr-3 rounded-xl bg-gradient-to-r from-[#0D38B5] via-[#092E96] to-[#061F66] text-white border border-blue-400/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_14px_-2px_rgba(9,46,150,0.35)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_8px_22px_-2px_rgba(9,46,150,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden"
                        : "group/btn relative w-full inline-flex items-center justify-between p-1.5 pr-3 rounded-xl bg-gradient-to-b from-white to-slate-50 text-slate-800 border border-slate-200/90 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_8px_rgba(15,23,42,0.05)] hover:border-blue-300 hover:shadow-[0_4px_16px_rgba(9,46,150,0.1)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden"
                      }
                    >
                      <span className={service.isPrimary
                        ? "w-7 h-7 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center shadow-inner group-hover/btn:bg-white group-hover/btn:text-[#092E96] transition-all text-white shrink-0"
                        : "w-7 h-7 rounded-lg bg-blue-50 border border-blue-100/80 flex items-center justify-center text-[#092E96] group-hover/btn:bg-[#092E96] group-hover/btn:text-white transition-all shrink-0"
                      }>
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <span className={service.isPrimary
                        ? "text-xs font-bold tracking-tight text-white flex-1 text-center"
                        : "text-xs font-bold tracking-tight text-slate-800 group-hover/btn:text-[#092E96] flex-1 text-center transition-colors"
                      }>
                        {service.actionText}
                      </span>
                      <span className={service.isPrimary
                        ? "w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-blue-100 group-hover/btn:bg-white/25 group-hover/btn:text-white transition-all shrink-0"
                        : "w-6 h-6 rounded-md bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-500 group-hover/btn:bg-blue-50 group-hover/btn:text-[#092E96] transition-all shrink-0"
                      }>
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pharmacist Direct Consultation Strip */}
          <div className="mt-12 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-[#092E96] flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">
                  Have questions about a specific medication or service?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Speak directly with our Minneapolis pharmacists. No waiting queues or robotic phone trees.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="tel:+16123543851"
                className="group relative inline-flex items-center gap-2.5 p-1.5 pr-3.5 rounded-xl bg-gradient-to-r from-[#0D38B5] via-[#092E96] to-[#061F66] text-white border border-blue-400/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_16px_-2px_rgba(9,46,150,0.4)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_8px_24px_-2px_rgba(9,46,150,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden"
              >
                <span className="w-7 h-7 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#092E96] transition-all">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold tracking-tight text-white">Call (612) 354-3851</span>
              </a>
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2.5 p-1.5 pr-3.5 rounded-xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 text-slate-800 hover:border-blue-300 hover:text-[#092E96] shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                <span className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#092E96] group-hover:bg-[#092E96] group-hover:text-white transition-all">
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold tracking-tight">Visit / Directions</span>
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* 5. WHY PATIENTS CHOOSE CEDER PHARMACY (IMPROVED SECTION TITLE) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Editorial Left Side */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-[#092E96] text-xs font-bold uppercase tracking-wider">
                <HeartPulse className="w-3.5 h-3.5 text-[#092E96]" />
                <span>The Ceder Advantage</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Why Minneapolis Families Choose Us Over Big Retail Chains
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Big retail chains treat prescriptions like numbers in an assembly line. At Ceder Pharmacy, we treat you as a neighbor. You always speak directly to a pharmacist who takes time to answer your questions.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">No Automated Phone Trees</h4>
                  <p className="text-xs text-slate-600">Call (612) 354-3851 and connect with a real local pharmacist immediately.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Insurance & Price Match Optimization</h4>
                  <p className="text-xs text-slate-600">We work to lower your copays and find manufacturer coupons whenever available.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Specialty Medication Sourcing</h4>
                  <p className="text-xs text-slate-600">If a medication is hard to find elsewhere, our team will source it rapidly.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Right Side */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 mb-2">What Our Community Says</h3>
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900">{t.author}</span>
                  <span className="text-slate-500">{t.location}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 6. SIMPLE 3-STEP PROCESS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200 text-[#092E96] text-xs font-bold uppercase tracking-wider shadow-xs">
              <Clock className="w-3.5 h-3.5 text-[#092E96]" />
              <span>Fast & Seamless Process</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              3 Simple Steps to Refill Your Prescription
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-[#092E96] text-white flex items-center justify-center font-extrabold mx-auto">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">Submit Your Request</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your Rx number online or give us a quick call at (612) 354-3851.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-[#092E96] text-white flex items-center justify-center font-extrabold mx-auto">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">Pharmacist Verification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our clinical team fills and double-checks your prescription within 5 to 10 minutes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-[#092E96] text-white flex items-center justify-center font-extrabold mx-auto">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">Easy Pickup or Delivery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pick up at 417 Cedar Ave or request safe home delivery straight to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 7. LOCATION & OPERATING HOURS GRID WITH IMPROVED TITLE */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* Location & Hours Info */}
            <div className="lg:col-span-7 p-8 lg:p-10 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-[#092E96] text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-[#092E96]" />
                  <span>Visit Our Minneapolis Store</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Location & Operating Hours
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#092E96] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900">Ceder Pharmacy</p>
                      <p className="text-slate-600">417 Cedar Ave</p>
                      <p className="text-slate-600">Minneapolis, MN 55454</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#092E96] shrink-0" />
                    <a href="tel:+16123543851" className="font-bold text-[#092E96] hover:underline">
                      (612) 354-3851
                    </a>
                  </div>
                </div>

                <div className="space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-600">Mon - Fri:</span>
                    <span className="font-bold text-slate-900">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-600">Saturday:</span>
                    <span className="font-bold text-slate-900">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-600">Sunday:</span>
                    <span className="font-bold text-rose-600">Closed</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="https://maps.google.com/?q=417+Cedar+Ave,+Minneapolis,+MN+55454"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2.5 p-1.5 pr-4 rounded-xl bg-gradient-to-r from-[#0D38B5] via-[#092E96] to-[#061F66] text-white border border-blue-400/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_16px_-2px_rgba(9,46,150,0.4)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_8px_24px_-2px_rgba(9,46,150,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden"
                >
                  <span className="w-7 h-7 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#092E96] transition-all">
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs font-bold tracking-tight text-white">Get Driving Directions</span>
                  <ArrowRight className="w-3 h-3 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center gap-2.5 p-1.5 pr-4 rounded-xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 text-slate-800 hover:border-blue-300 hover:text-[#092E96] shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                >
                  <span className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#092E96] group-hover:bg-[#092E96] group-hover:text-white transition-all">
                    <FileText className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs font-bold tracking-tight">Contact Form</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#092E96] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Interactive Embedded Google Map */}
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-slate-200 relative min-h-[360px] lg:min-h-full bg-slate-100">
              <iframe
                title="Ceder Pharmacy Location - 417 Cedar Ave, Minneapolis, MN 55454"
                src="https://maps.google.com/maps?q=417+Cedar+Ave,+Minneapolis,+MN+55454&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[360px] border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </section>


      {/* 8. FINAL CALL-TO-ACTION CARD */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-br from-[#092E96] to-[#061F69] rounded-2xl p-8 sm:p-12 text-white text-center shadow-lg space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready for Faster, More Caring Pharmacy Service?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Transfer your prescriptions to Cedar Pharmacy today or speak directly with our team.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/refill"
              className="group relative w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 p-2 pr-5 rounded-xl bg-gradient-to-b from-white to-slate-50 text-slate-900 border border-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden"
            >
              <span className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#092E96] group-hover:bg-[#092E96] group-hover:text-white group-hover:scale-105 transition-all duration-300 shrink-0">
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </span>
              <div className="text-left flex-1 sm:flex-none">
                <span className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400 group-hover:text-[#092E96]/70 block leading-none mb-0.5 transition-colors">
                  Fast 1-Min Process
                </span>
                <span className="text-sm font-extrabold tracking-tight text-slate-900 group-hover:text-[#092E96] block transition-colors">
                  Transfer Prescription Now
                </span>
              </div>
              <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-600 group-hover:bg-[#092E96] group-hover:text-white transition-all duration-300 shrink-0 ml-1">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            <Link
              to="/contact"
              className="group relative w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 p-2 pr-5 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md text-white border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-white/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden"
            >
              <span className="w-9 h-9 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#092E96] group-hover:scale-105 transition-all duration-300 shrink-0">
                <Phone className="w-4 h-4" />
              </span>
              <div className="text-left flex-1 sm:flex-none">
                <span className="text-[9px] font-black uppercase tracking-[0.16em] text-blue-200 block leading-none mb-0.5">
                  Direct Line
                </span>
                <span className="text-sm font-extrabold tracking-tight text-white block">
                  Call (612) 354–3851
                </span>
              </div>
              <span className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-blue-100 group-hover:bg-white/25 group-hover:text-white transition-all duration-300 shrink-0 ml-1">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
