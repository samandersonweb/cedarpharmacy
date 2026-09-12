import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  ArrowRight,
  Clock,
  Pill,
  User,
  Building2,
  Calendar,
  Lock,
  FileCheck,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { useToast } from '../components/Toast';

export default function RefillPage() {
  const { addToast } = useToast();

  const getTodayFormatted = () => {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
    currentPharmacy: '',
    currentPharmacyPhone: '',
    transferMode: 'all', // 'all' or 'specific'
    specificMedications: '',
    authorized: false,
    typedSignature: '',
    signatureDate: getTodayFormatted()
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.authorized) {
      addToast({
        title: 'Consent Required',
        message: 'Please check the authorization box to allow us to transfer your prescriptions.',
        type: 'error'
      });
      return;
    }

    if (!formData.typedSignature.trim()) {
      addToast({
        title: 'Signature Required',
        message: 'Please type your full legal name as your digital signature.',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const trackingCode = 'CDR-TRF-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmationData({
        ...formData,
        trackingCode,
        submittedAt: new Date().toLocaleString()
      });
      addToast({
        title: 'Transfer Request Received',
        message: `Reference #${trackingCode}. We will contact your pharmacy shortly.`,
        type: 'success'
      });
    }, 700);
  };

  // GORGEOUS SUCCESS CONFIRMATION
  if (confirmationData) {
    return (
      <div className="flex-grow bg-[#F8FAFC] py-14 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-8 sm:p-10 space-y-7">
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#092E96]">
                Cedar Pharmacy Intake
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Transfer Request Received
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{confirmationData.firstName}</strong>. Our clinical team will contact <strong className="text-slate-900">{confirmationData.currentPharmacy}</strong> to complete your transfer.
              </p>
            </div>

            {/* Reference Tracking Banner */}
            <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-blue-50/80 border border-blue-100 p-5 rounded-xl text-center space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Transfer Reference Number
              </span>
              <p className="text-3xl font-black text-[#092E96] tracking-wider">
                {confirmationData.trackingCode}
              </p>
              <p className="text-[11px] text-slate-500">Submitted on {confirmationData.submittedAt}</p>
            </div>

            {/* Structured Summary Breakdown */}
            <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-100 space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-200/70">
                <span className="text-slate-500 font-medium">Patient:</span>
                <span className="text-slate-900 font-semibold">{confirmationData.firstName} {confirmationData.lastName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200/70">
                <span className="text-slate-500 font-medium">Date of Birth & Phone:</span>
                <span className="text-slate-900 font-semibold">{confirmationData.dob} • {confirmationData.phone}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200/70">
                <span className="text-slate-500 font-medium">Transferring From:</span>
                <span className="text-slate-900 font-semibold">{confirmationData.currentPharmacy}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200/70">
                <span className="text-slate-500 font-medium">Prescriptions:</span>
                <span className="text-slate-900 font-semibold">
                  {confirmationData.transferMode === 'all' ? 'All Active Prescriptions' : 'Specific Medications'}
                </span>
              </div>
              {confirmationData.transferMode === 'specific' && confirmationData.specificMedications && (
                <div className="py-1.5 border-b border-slate-200/70">
                  <span className="text-slate-500 font-medium block mb-1">Medication List:</span>
                  <p className="text-slate-900 font-medium bg-white p-2.5 rounded-lg border border-slate-200 whitespace-pre-line">{confirmationData.specificMedications}</p>
                </div>
              )}
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 font-medium">Digital Signature:</span>
                <span className="text-slate-900 font-semibold italic">{confirmationData.typedSignature} ({confirmationData.signatureDate})</span>
              </div>
            </div>

            {/* Next Steps Card */}
            <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100/80 flex items-start gap-3 text-xs text-slate-700">
              <Clock className="w-4 h-4 text-[#092E96] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block mb-0.5">What happens next?</strong>
                <span>Our pharmacist will reach out to your previous pharmacy and coordinate the transfer. We will send you an SMS notification the moment your medication is prepared.</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setConfirmationData(null);
                  setFormData({
                    firstName: '',
                    lastName: '',
                    dob: '',
                    phone: '',
                    email: '',
                    currentPharmacy: '',
                    currentPharmacyPhone: '',
                    transferMode: 'all',
                    specificMedications: '',
                    authorized: false,
                    typedSignature: '',
                    signatureDate: getTodayFormatted()
                  });
                }}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Submit Another Transfer
              </button>

              <Link
                to="/"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#092E96] hover:bg-[#061F69] text-center shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Return to Home</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-[#F8FAFC] text-slate-900">
      
      {/* 1. COMPACT, GORGEOUS HEADER */}
      <section className="relative bg-gradient-to-b from-white via-slate-50 to-blue-50/20 border-b border-slate-200/80 pt-10 pb-8 overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center relative z-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-bold text-[#092E96] tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#092E96]" />
            <span>Fast Online Transfer</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Prescription Transfer Request
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Takes about a minute. We'll contact your current pharmacy directly — no phone tag needed on your end.
          </p>
        </div>
      </section>

      {/* 2. MAIN 2-COLUMN HEALTHCARE LAYOUT */}
      <section className="py-10 sm:py-14 max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT SIDEBAR: WHY TRANSFER TO CEDAR */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-28">
            
            {/* How It Works Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-[#092E96] flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                <span>How It Works</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-[#092E96] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Submit Online</strong>
                    <span className="text-slate-600">Enter your name and current pharmacy information in this form.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-[#092E96] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-slate-900 block">We Call Your Old Pharmacy</strong>
                    <span className="text-slate-600">Our pharmacists contact them directly to transfer your active refills.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-[#092E96] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Prescription Ready</strong>
                    <span className="text-slate-600">We will notify you as soon as your medication is prepared and ready.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Pharmacy Care */}
            <div className="bg-gradient-to-br from-[#092E96] to-[#061F69] text-white rounded-2xl p-6 shadow-md space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
                <span>Community Care</span>
              </div>
              <h4 className="text-base font-bold text-white leading-snug">
                Patient-Centered Pharmacy Service
              </h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                At Cedar Pharmacy, we believe managing your prescriptions should be simple and stress-free. Our pharmacists take the time to answer your questions and provide caring, personal service for you and your family.
              </p>
            </div>

            {/* Direct Pharmacist Contact Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 text-xs space-y-2.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <HelpCircle className="w-4 h-4 text-[#092E96]" />
                <span>Prefer to transfer by phone?</span>
              </div>
              <p className="text-slate-600">
                Call our pharmacy team and we can process your transfer over the phone right now:
              </p>
              <a
                href="tel:+16123543851"
                className="inline-flex items-center gap-2 font-bold text-[#092E96] hover:underline text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>(612) 354-3851</span>
              </a>
            </div>

          </div>

          {/* RIGHT MAIN INTAKE FORM */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg shadow-slate-200/40 overflow-hidden">
              {/* Subtle top brand accent line */}
              <div className="h-1.5 w-full bg-[#092E96]" />

              <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
                
                {/* SECTION 1: PATIENT INFORMATION */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#092E96] flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        1. Patient Information
                      </h2>
                      <p className="text-[11px] text-slate-500">Who are these prescriptions for?</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="e.g. Jane"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#092E96] focus:border-[#092E96] focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="e.g. Smith"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#092E96] focus:border-[#092E96] focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Date of Birth *</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="dob"
                          required
                          value={formData.dob}
                          onChange={handleChange}
                          placeholder="MM/DD/YYYY"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#092E96] focus:border-[#092E96] focus:outline-none transition-all"
                        />
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(612) 000-0000"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#092E96] focus:border-[#092E96] focus:outline-none transition-all"
                        />
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block font-semibold text-slate-700 mb-1">
                      Email Address <span className="font-normal text-slate-500">(Optional, for notifications)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#092E96] focus:border-[#092E96] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* SECTION 2: CURRENT PHARMACY INFORMATION */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#092E96] flex items-center justify-center">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        2. Current Pharmacy Details
                      </h2>
                      <p className="text-[11px] text-slate-500">Where are your prescriptions currently held?</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Current Pharmacy Name & Location *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="currentPharmacy"
                          required
                          value={formData.currentPharmacy}
                          onChange={handleChange}
                          placeholder="e.g. CVS Pharmacy, Lake St, Minneapolis"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#092E96] focus:border-[#092E96] focus:outline-none transition-all"
                        />
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Pharmacy Phone Number <span className="font-normal text-slate-500">(Optional, speeds up the transfer)</span>
                      </label>
                      <input
                        type="tel"
                        name="currentPharmacyPhone"
                        value={formData.currentPharmacyPhone}
                        onChange={handleChange}
                        placeholder="e.g. (612) 555-0199"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#092E96] focus:border-[#092E96] focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: PRESCRIPTIONS SCOPE */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#092E96] flex items-center justify-center">
                      <Pill className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        3. What Would You Like to Transfer?
                      </h2>
                      <p className="text-[11px] text-slate-500">Choose to transfer all or specific medications</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Card A: All */}
                    <div
                      onClick={() => setFormData(prev => ({ ...prev, transferMode: 'all' }))}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                        formData.transferMode === 'all'
                          ? 'border-[#092E96] bg-blue-50/40 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="transferMode"
                        value="all"
                        checked={formData.transferMode === 'all'}
                        onChange={handleChange}
                        className="w-4 h-4 mt-0.5 text-[#092E96] focus:ring-[#092E96]"
                      />
                      <div className="text-xs">
                        <strong className="text-slate-900 block font-bold">Transfer All Active Prescriptions</strong>
                        <span className="text-slate-500 text-[11px] block mt-0.5">
                          Recommended. We will pull and transfer all refills currently on file.
                        </span>
                      </div>
                    </div>

                    {/* Card B: Specific */}
                    <div
                      onClick={() => setFormData(prev => ({ ...prev, transferMode: 'specific' }))}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                        formData.transferMode === 'specific'
                          ? 'border-[#092E96] bg-blue-50/40 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="transferMode"
                        value="specific"
                        checked={formData.transferMode === 'specific'}
                        onChange={handleChange}
                        className="w-4 h-4 mt-0.5 text-[#092E96] focus:ring-[#092E96]"
                      />
                      <div className="text-xs">
                        <strong className="text-slate-900 block font-bold">Specific Medications Only</strong>
                        <span className="text-slate-500 text-[11px] block mt-0.5">
                          List individual prescriptions or Rx numbers to move.
                        </span>
                      </div>
                    </div>
                  </div>

                  {formData.transferMode === 'specific' && (
                    <div className="pt-2 text-xs">
                      <label className="block font-semibold text-slate-700 mb-1">
                        List Medication Names or Rx Numbers *
                      </label>
                      <textarea
                        name="specificMedications"
                        rows={3}
                        required={formData.transferMode === 'specific'}
                        value={formData.specificMedications}
                        onChange={handleChange}
                        placeholder="e.g. Lisinopril 10mg, Metformin 500mg, Rx #123456"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#092E96] focus:border-[#092E96] focus:outline-none transition-all"
                      />
                    </div>
                  )}
                </div>

                {/* SECTION 4: AUTHORIZATION & SIGNATURE */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#092E96] flex items-center justify-center">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        4. Authorization & Digital Signature
                      </h2>
                      <p className="text-[11px] text-slate-500">Your consent to initiate the pharmacy transfer</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs">
                    <label className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/60 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        name="authorized"
                        required
                        checked={formData.authorized}
                        onChange={handleChange}
                        className="w-4 h-4 mt-0.5 text-[#092E96] rounded border-slate-300 focus:ring-[#092E96]"
                      />
                      <span className="text-slate-700 leading-relaxed font-medium">
                        I authorize Cedar Pharmacy to contact my previous pharmacy and request my prescription records, medications, and active refills on my behalf.
                      </span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Full Legal Name (Digital Signature) *
                        </label>
                        <input
                          type="text"
                          name="typedSignature"
                          required
                          value={formData.typedSignature}
                          onChange={handleChange}
                          placeholder="Your Full Legal Name"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#092E96] focus:border-[#092E96] focus:outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Date</label>
                        <input
                          type="text"
                          name="signatureDate"
                          readOnly
                          value={formData.signatureDate}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-600 bg-slate-100 cursor-not-allowed focus:outline-none font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* PRIMARY ACTION */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-[#092E96] hover:bg-[#061F69] disabled:opacity-60 shadow-md shadow-blue-900/10 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg"
                  >
                    {isSubmitting ? (
                      <span>Processing Transfer Request...</span>
                    ) : (
                      <>
                        <span>Submit Prescription Transfer Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* TRUST BADGE FOOTER */}
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Secure 256-Bit SSL Transmission • Direct Cedar Pharmacist Verification</span>
                </div>

              </form>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
