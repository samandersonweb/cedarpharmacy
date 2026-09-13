import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
  HelpCircle,
  Plus,
  Trash2,
  Truck,
  ShoppingBag,
  Car
} from 'lucide-react';
import { useToast } from '../components/Toast';

export default function RefillPage({ initialMode = 'refill' }) {
  const { addToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  // Determine active tab: 'refill' or 'transfer'
  const urlTab = searchParams.get('tab') || searchParams.get('mode');
  const [activeTab, setActiveTab] = useState(urlTab === 'transfer' || initialMode === 'transfer' ? 'transfer' : 'refill');

  useEffect(() => {
    if (urlTab === 'transfer' || urlTab === 'refill') {
      setActiveTab(urlTab);
    }
  }, [urlTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
    setConfirmationData(null);
  };

  const getTodayFormatted = () => {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // State for REFILL form
  const [refillData, setRefillData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
    fulfillment: 'pickup', // 'pickup' | 'curbside' | 'delivery'
    deliveryAddress: '',
    notes: '',
    rxList: [{ rxNumber: '', medName: '' }]
  });

  // State for TRANSFER form
  const [transferData, setTransferData] = useState({
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

  // Handlers for Refill Form
  const handleRefillChange = (e) => {
    const { name, value } = e.target;
    setRefillData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRxItemChange = (index, field, value) => {
    setRefillData((prev) => {
      const updated = [...prev.rxList];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, rxList: updated };
    });
  };

  const addRxRow = () => {
    setRefillData((prev) => ({
      ...prev,
      rxList: [...prev.rxList, { rxNumber: '', medName: '' }]
    }));
  };

  const removeRxRow = (index) => {
    if (refillData.rxList.length <= 1) return;
    setRefillData((prev) => ({
      ...prev,
      rxList: prev.rxList.filter((_, i) => i !== index)
    }));
  };

  const handleRefillSubmit = (e) => {
    e.preventDefault();

    // Validate at least one Rx number
    const validRx = refillData.rxList.filter((item) => item.rxNumber.trim() !== '');
    if (validRx.length === 0) {
      addToast({
        title: 'Prescription Number Required',
        message: 'Please enter at least one Prescription (Rx) number from your bottle label.',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const trackingCode = 'CDR-RFL-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmationData({
        type: 'refill',
        trackingCode,
        submittedAt: new Date().toLocaleString(),
        ...refillData,
        rxList: validRx
      });
      addToast({
        title: 'Refill Request Received',
        message: `Reference #${trackingCode}. We are preparing your prescription.`,
        type: 'success'
      });
    }, 600);
  };

  // Handlers for Transfer Form
  const handleTransferChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTransferData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();

    if (!transferData.authorized) {
      addToast({
        title: 'Consent Required',
        message: 'Please check the authorization box to allow us to transfer your prescriptions.',
        type: 'error'
      });
      return;
    }

    if (!transferData.typedSignature.trim()) {
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
        type: 'transfer',
        trackingCode,
        submittedAt: new Date().toLocaleString(),
        ...transferData
      });
      addToast({
        title: 'Transfer Request Received',
        message: `Reference #${trackingCode}. We will contact your pharmacy shortly.`,
        type: 'success'
      });
    }, 600);
  };

  // Reset confirmation
  const resetForm = () => {
    setConfirmationData(null);
    if (activeTab === 'refill') {
      setRefillData({
        firstName: '',
        lastName: '',
        dob: '',
        phone: '',
        email: '',
        fulfillment: 'pickup',
        deliveryAddress: '',
        notes: '',
        rxList: [{ rxNumber: '', medName: '' }]
      });
    } else {
      setTransferData({
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
    }
  };

  // CONFIRMATION VIEW
  if (confirmationData) {
    const isRefill = confirmationData.type === 'refill';

    return (
      <div className="flex-grow bg-[#F8FAFC] py-14 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-8 sm:p-10 space-y-7">

            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#092E96]">
                Cedar Pharmacy Clinical Intake
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {isRefill ? 'Refill Request Received' : 'Transfer Request Received'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{confirmationData.firstName}</strong>. Our licensed pharmacists are processing your request.
              </p>
            </div>

            {/* Reference Tracking Banner */}
            <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-blue-50/80 border border-blue-100 p-5 rounded-xl text-center space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isRefill ? 'Refill Confirmation Code' : 'Transfer Reference Number'}
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

              {isRefill ? (
                <>
                  <div className="py-1.5 border-b border-slate-200/70">
                    <span className="text-slate-500 font-medium block mb-1">Prescriptions to Refill:</span>
                    <ul className="space-y-1 pl-1">
                      {confirmationData.rxList.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-900 font-semibold">
                          <span className="w-4 h-4 rounded-full bg-blue-100 text-[#092E96] text-[10px] flex items-center justify-center">{idx + 1}</span>
                          <span>Rx #{item.rxNumber} {item.medName && `(${item.medName})`}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500 font-medium">Fulfillment Method:</span>
                    <span className="text-slate-900 font-semibold capitalize">
                      {confirmationData.fulfillment === 'pickup' && 'In-Store Pickup (417 Cedar Ave)'}
                      {confirmationData.fulfillment === 'curbside' && 'Curbside Pickup'}
                      {confirmationData.fulfillment === 'delivery' && `Twin Cities Delivery (${confirmationData.deliveryAddress})`}
                    </span>
                  </div>
                </>
              ) : (
                <>
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
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500 font-medium">Digital Signature:</span>
                    <span className="text-slate-900 font-semibold italic">{confirmationData.typedSignature} ({confirmationData.signatureDate})</span>
                  </div>
                </>
              )}
            </div>

            {/* Next Steps Card */}
            <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100/80 flex items-start gap-3 text-xs text-slate-700">
              <Clock className="w-4 h-4 text-[#092E96] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block mb-0.5">What happens next?</strong>
                <span>
                  {isRefill
                    ? 'Our pharmacists will review and fill your medication. You will receive an SMS notification as soon as your order is packaged and ready.'
                    : 'Our team will contact your previous pharmacy to transfer the records. We will send you an SMS alert once the transfer is verified and ready.'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="group relative w-full sm:flex-1 inline-flex items-center justify-between p-2 pr-4 rounded-xl bg-gradient-to-b from-white to-slate-50 text-slate-800 border border-slate-200/90 shadow-xs hover:border-blue-300 hover:text-[#092E96] transition-all cursor-pointer"
              >
                <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#092E96] group-hover:bg-[#092E96] group-hover:text-white transition-all shrink-0">
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </span>
                <span className="text-xs font-bold tracking-tight flex-1 text-center">
                  Submit Another Request
                </span>
                <span className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#092E96] transition-all shrink-0">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>

              <Link
                to="/"
                className="group relative w-full sm:flex-1 inline-flex items-center justify-between p-2 pr-4 rounded-xl bg-gradient-to-r from-[#0D38B5] via-[#092E96] to-[#061F66] text-white border border-blue-400/35 shadow-sm hover:shadow-md transition-all"
              >
                <span className="w-8 h-8 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#092E96] transition-all shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold tracking-tight text-white flex-1 text-center">
                  Return to Home
                </span>
                <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-blue-100 group-hover:bg-white/25 group-hover:text-white transition-all shrink-0">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-[#F8FAFC] text-slate-900">

      {/* 1. HERO HEADER WITH TAB SWITCHER */}
      <section className="relative bg-gradient-to-b from-white via-slate-50 to-blue-50/20 border-b border-slate-200/80 pt-10 pb-8 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-bold text-[#092E96] tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#092E96]" />
            <span>Cedar Pharmacy Patient Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Prescription Refill & Transfer
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Quick, secure online request in less than two minutes. Dispensed with care at 417 Cedar Ave, Minneapolis.
          </p>

          {/* DUAL MODE TAB SWITCHER */}
          <div className="pt-3 flex justify-center">
            <div className="inline-flex p-1 rounded-2xl bg-slate-200/80 border border-slate-300/80 shadow-inner">
              <button
                type="button"
                onClick={() => handleTabChange('refill')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === 'refill'
                    ? 'bg-white text-[#092E96] shadow-md shadow-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Pill className="w-4 h-4 text-[#092E96]" />
                <span>Refill Prescription</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('transfer')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === 'transfer'
                    ? 'bg-white text-[#092E96] shadow-md shadow-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4 text-[#092E96]" />
                <span>Transfer From Another Pharmacy</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT AREA */}
      <section className="py-10 sm:py-14 max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-28">

            {/* How it works */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-[#092E96] flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                <span>{activeTab === 'refill' ? 'How Refills Work' : 'How Transfers Work'}</span>
              </h3>

              <div className="space-y-4 text-xs">
                {activeTab === 'refill' ? (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-[#092E96] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <strong className="text-slate-900 block">Enter Rx Number</strong>
                        <span className="text-slate-600">Find the 6 or 7 digit Rx number on your Cedar Pharmacy prescription bottle.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-[#092E96] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <strong className="text-slate-900 block">Pharmacist Dispensing</strong>
                        <span className="text-slate-600">Our pharmacists check insurance, refills on file, and prepare your medication.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-[#092E96] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <strong className="text-slate-900 block">Pickup or Delivery</strong>
                        <span className="text-slate-600">Receive an SMS alert as soon as your medication is ready for pickup or delivery.</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-[#092E96] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <strong className="text-slate-900 block">Submit Details</strong>
                        <span className="text-slate-600">Tell us your current pharmacy name and medications to transfer.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-[#092E96] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <strong className="text-slate-900 block">We Do The Calling</strong>
                        <span className="text-slate-600">Our clinical team contacts your previous pharmacy to transfer records directly.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-[#092E96] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <strong className="text-slate-900 block">Prescription Ready</strong>
                        <span className="text-slate-600">We notify you when your prescriptions are ready for pickup or courier delivery.</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Neighborhood Promise Card */}
            <div className="bg-gradient-to-br from-[#092E96] to-[#061F69] text-white rounded-2xl p-6 shadow-md space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
                <span>Community Care</span>
              </div>
              <h4 className="text-base font-bold text-white leading-snug">
                Personalized Care, Zero Hassle
              </h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                No long automated phone trees. When you contact Cedar Pharmacy, you speak directly with caring pharmacists who know your health history and community.
              </p>
            </div>

            {/* Direct Phone Support */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 text-xs space-y-2.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <HelpCircle className="w-4 h-4 text-[#092E96]" />
                <span>Prefer to call in your request?</span>
              </div>
              <p className="text-slate-600">
                Call our pharmacy team and we can process your refill or transfer over the phone in minutes:
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

          {/* RIGHT: MAIN FORM */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg shadow-slate-200/40 overflow-hidden">
              <div className="h-1.5 w-full bg-[#092E96]" />

              {/* -------------------- TAB 1: REFILL FORM -------------------- */}
              {activeTab === 'refill' && (
                <form onSubmit={handleRefillSubmit} className="p-6 sm:p-10 space-y-8">

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
                        <p className="text-[11px] text-slate-500">Name and phone for prescription records and SMS alerts</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={refillData.firstName}
                          onChange={handleRefillChange}
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
                          value={refillData.lastName}
                          onChange={handleRefillChange}
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
                            value={refillData.dob}
                            onChange={handleRefillChange}
                            placeholder="MM/DD/YYYY"
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#092E96] focus:border-[#092E96] focus:outline-none transition-all"
                          />
                          <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Phone Number (for SMS Ready Alert) *</label>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={refillData.phone}
                            onChange={handleRefillChange}
                            placeholder="(612) 000-0000"
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#092E96] focus:border-[#092E96] focus:outline-none transition-all"
                          />
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="text-xs">
                      <label className="block font-semibold text-slate-700 mb-1">
                        Email Address <span className="font-normal text-slate-500">(Optional, for digital receipt)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={refillData.email}
                        onChange={handleRefillChange}
                        placeholder="jane@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#092E96] focus:border-[#092E96] focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* SECTION 2: PRESCRIPTION DETAILS */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#092E96] flex items-center justify-center">
                          <Pill className="w-4 h-4" />
                        </div>
                        <div>
                          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                            2. Prescription (Rx) Numbers
                          </h2>
                          <p className="text-[11px] text-slate-500">Found on the Cedar Pharmacy bottle label above the patient name</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={addRxRow}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-[#092E96] hover:bg-blue-100 font-bold text-xs transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Another Rx</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {refillData.rxList.map((item, index) => (
                        <div key={index} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 relative space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-[#092E96] bg-blue-100/70 px-2 py-0.5 rounded-md">
                              Prescription #{index + 1}
                            </span>
                            {refillData.rxList.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeRxRow(index)}
                                className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                                title="Remove medication"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">
                                Rx Number *
                              </label>
                              <input
                                type="text"
                                required
                                value={item.rxNumber}
                                onChange={(e) => handleRxItemChange(index, 'rxNumber', e.target.value)}
                                placeholder="e.g. 7492103"
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#092E96] focus:border-[#092E96] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">
                                Medication Name & Strength <span className="font-normal text-slate-500">(Optional)</span>
                              </label>
                              <input
                                type="text"
                                value={item.medName}
                                onChange={(e) => handleRxItemChange(index, 'medName', e.target.value)}
                                placeholder="e.g. Atorvastatin 20mg"
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#092E96] focus:border-[#092E96] focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 3: PICKUP OR DELIVERY PREFERENCE */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#092E96] flex items-center justify-center">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                          3. Pickup or Delivery Preference
                        </h2>
                        <p className="text-[11px] text-slate-500">Choose how you would like to receive your medication</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      {/* In-store Pickup */}
                      <label
                        className={`p-3.5 rounded-xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                          refillData.fulfillment === 'pickup'
                            ? 'border-[#092E96] bg-blue-50/40 shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <input
                            type="radio"
                            name="fulfillment"
                            value="pickup"
                            checked={refillData.fulfillment === 'pickup'}
                            onChange={handleRefillChange}
                            className="text-[#092E96] focus:ring-[#092E96]"
                          />
                          <ShoppingBag className="w-4 h-4 text-[#092E96]" />
                        </div>
                        <div>
                          <strong className="text-slate-900 block font-bold">In-Store Pickup</strong>
                          <span className="text-slate-500 text-[11px] mt-0.5 block">417 Cedar Ave, Minneapolis</span>
                        </div>
                      </label>

                      {/* Curbside Pickup */}
                      <label
                        className={`p-3.5 rounded-xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                          refillData.fulfillment === 'curbside'
                            ? 'border-[#092E96] bg-blue-50/40 shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <input
                            type="radio"
                            name="fulfillment"
                            value="curbside"
                            checked={refillData.fulfillment === 'curbside'}
                            onChange={handleRefillChange}
                            className="text-[#092E96] focus:ring-[#092E96]"
                          />
                          <Car className="w-4 h-4 text-[#092E96]" />
                        </div>
                        <div>
                          <strong className="text-slate-900 block font-bold">Curbside Pickup</strong>
                          <span className="text-slate-500 text-[11px] mt-0.5 block">Call when parked in front</span>
                        </div>
                      </label>

                      {/* Local Delivery */}
                      <label
                        className={`p-3.5 rounded-xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                          refillData.fulfillment === 'delivery'
                            ? 'border-[#092E96] bg-blue-50/40 shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <input
                            type="radio"
                            name="fulfillment"
                            value="delivery"
                            checked={refillData.fulfillment === 'delivery'}
                            onChange={handleRefillChange}
                            className="text-[#092E96] focus:ring-[#092E96]"
                          />
                          <Truck className="w-4 h-4 text-[#092E96]" />
                        </div>
                        <div>
                          <strong className="text-slate-900 block font-bold">Twin Cities Courier</strong>
                          <span className="text-slate-500 text-[11px] mt-0.5 block">Delivered right to your door</span>
                        </div>
                      </label>
                    </div>

                    {refillData.fulfillment === 'delivery' && (
                      <div className="text-xs pt-1">
                        <label className="block font-semibold text-slate-700 mb-1">
                          Delivery Street Address (Twin Cities Metro) *
                        </label>
                        <input
                          type="text"
                          name="deliveryAddress"
                          required={refillData.fulfillment === 'delivery'}
                          value={refillData.deliveryAddress}
                          onChange={handleRefillChange}
                          placeholder="e.g. 123 4th St S, Minneapolis, MN 55401"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#092E96] focus:border-[#092E96] focus:outline-none transition-all"
                        />
                      </div>
                    )}
                  </div>

                  {/* SECTION 4: PHARMACIST NOTES */}
                  <div className="space-y-2 pt-2 text-xs">
                    <label className="block font-semibold text-slate-700">
                      Additional Notes or Special Instructions <span className="font-normal text-slate-500">(Optional)</span>
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      value={refillData.notes}
                      onChange={handleRefillChange}
                      placeholder="e.g. Easy-open caps, need 90-day supply, insurance change, etc."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#092E96] focus:border-[#092E96] focus:outline-none transition-all"
                    />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full inline-flex items-center justify-between p-2 pr-5 rounded-xl bg-gradient-to-r from-[#0D38B5] via-[#092E96] to-[#061F66] text-white border border-blue-400/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_6px_20px_-2px_rgba(9,46,150,0.4)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),0_10px_28px_-2px_rgba(9,46,150,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
                    >
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                      <span className="w-9 h-9 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center shadow-inner group-hover:bg-white group-hover:text-[#092E96] group-hover:scale-105 transition-all duration-300 shrink-0 text-white">
                        <Pill className="w-4 h-4 stroke-[2.5]" />
                      </span>
                      <div className="text-left flex-1 px-3">
                        <span className="text-[9px] font-black uppercase tracking-[0.16em] text-blue-200 block leading-none mb-0.5">
                          Fast Community Dispensing
                        </span>
                        <span className="text-sm font-extrabold tracking-tight text-white block">
                          {isSubmitting ? 'Processing Refill Request...' : 'Submit Prescription Refill Request'}
                        </span>
                      </div>
                      <span className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-blue-100 group-hover:bg-white/25 group-hover:text-white transition-all duration-300 shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </button>
                  </div>

                  {/* TRUST BADGE */}
                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>HIPAA Compliant & Secure 256-Bit SSL Transmission</span>
                  </div>

                </form>
              )}

              {/* -------------------- TAB 2: TRANSFER FORM -------------------- */}
              {activeTab === 'transfer' && (
                <form onSubmit={handleTransferSubmit} className="p-6 sm:p-10 space-y-8">

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
                          value={transferData.firstName}
                          onChange={handleTransferChange}
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
                          value={transferData.lastName}
                          onChange={handleTransferChange}
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
                            value={transferData.dob}
                            onChange={handleTransferChange}
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
                            value={transferData.phone}
                            onChange={handleTransferChange}
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
                        value={transferData.email}
                        onChange={handleTransferChange}
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
                            value={transferData.currentPharmacy}
                            onChange={handleTransferChange}
                            placeholder="e.g. CVS Pharmacy, Lake St, Minneapolis"
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#092E96] focus:border-[#092E96] focus:outline-none transition-all"
                          />
                          <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Pharmacy Phone Number <span className="font-normal text-slate-500">(Optional, speeds up transfer)</span>
                        </label>
                        <input
                          type="tel"
                          name="currentPharmacyPhone"
                          value={transferData.currentPharmacyPhone}
                          onChange={handleTransferChange}
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
                        <p className="text-[11px] text-slate-500">Choose to transfer all active refills or specific medications</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div
                        onClick={() => setTransferData((prev) => ({ ...prev, transferMode: 'all' }))}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                          transferData.transferMode === 'all'
                            ? 'border-[#092E96] bg-blue-50/40 shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="transferMode"
                          value="all"
                          checked={transferData.transferMode === 'all'}
                          onChange={handleTransferChange}
                          className="w-4 h-4 mt-0.5 text-[#092E96] focus:ring-[#092E96]"
                        />
                        <div className="text-xs">
                          <strong className="text-slate-900 block font-bold">Transfer All Active Prescriptions</strong>
                          <span className="text-slate-500 text-[11px] block mt-0.5">
                            Recommended. We will pull and transfer all refills currently on file.
                          </span>
                        </div>
                      </div>

                      <div
                        onClick={() => setTransferData((prev) => ({ ...prev, transferMode: 'specific' }))}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                          transferData.transferMode === 'specific'
                            ? 'border-[#092E96] bg-blue-50/40 shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="transferMode"
                          value="specific"
                          checked={transferData.transferMode === 'specific'}
                          onChange={handleTransferChange}
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

                    {transferData.transferMode === 'specific' && (
                      <div className="pt-2 text-xs">
                        <label className="block font-semibold text-slate-700 mb-1">
                          List Medication Names or Rx Numbers *
                        </label>
                        <textarea
                          name="specificMedications"
                          rows={3}
                          required={transferData.transferMode === 'specific'}
                          value={transferData.specificMedications}
                          onChange={handleTransferChange}
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
                          checked={transferData.authorized}
                          onChange={handleTransferChange}
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
                            value={transferData.typedSignature}
                            onChange={handleTransferChange}
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
                            value={transferData.signatureDate}
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
                      className="group relative w-full inline-flex items-center justify-between p-2 pr-5 rounded-xl bg-gradient-to-r from-[#0D38B5] via-[#092E96] to-[#061F66] text-white border border-blue-400/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_6px_20px_-2px_rgba(9,46,150,0.4)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),0_10px_28px_-2px_rgba(9,46,150,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
                    >
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                      <span className="w-9 h-9 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center shadow-inner group-hover:bg-white group-hover:text-[#092E96] group-hover:scale-105 transition-all duration-300 shrink-0 text-white">
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      </span>
                      <div className="text-left flex-1 px-3">
                        <span className="text-[9px] font-black uppercase tracking-[0.16em] text-blue-200 block leading-none mb-0.5">
                          Direct Pharmacist Verification
                        </span>
                        <span className="text-sm font-extrabold tracking-tight text-white block">
                          {isSubmitting ? 'Processing Transfer Request...' : 'Submit Prescription Transfer Request'}
                        </span>
                      </div>
                      <span className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-blue-100 group-hover:bg-white/25 group-hover:text-white transition-all duration-300 shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </button>
                  </div>

                  {/* TRUST BADGE FOOTER */}
                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Secure 256-Bit SSL Transmission • Direct Cedar Pharmacist Verification</span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
