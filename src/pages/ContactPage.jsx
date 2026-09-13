import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Printer
} from 'lucide-react';
import { useToast } from '../components/Toast';

export default function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      addToast({
        title: 'Missing Required Fields',
        message: 'Please provide your name and phone number.',
        type: 'error'
      });
      return;
    }

    setSubmitted(true);
    addToast({
      title: 'Message Received',
      message: 'Thank you for reaching out. A pharmacist will respond shortly.',
      type: 'success'
    });
  };

  return (
    <div className="flex-grow bg-[#F8FAFC] text-slate-900">

      {/* HERO */}
      <section className="relative py-14 sm:py-20 border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-blue-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-[#092E96] text-xs font-bold uppercase tracking-wider shadow-xs">
            <Phone className="w-3.5 h-3.5 text-[#092E96]" />
            <span>Direct Access to Pharmacists</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Contact <span className="text-[#092E96]">Ceder Pharmacy</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have a prescription question, transfer request, or immunization inquiry? Reach out to our Minneapolis team today.
          </p>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6">

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Pharmacy Location & Details
              </h2>

              <ul className="space-y-4 text-xs">
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#092E96] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Address</p>
                    <p className="text-slate-600">417 Cedar Ave, Minneapolis, MN 55454</p>
                    <p className="text-[11px] text-slate-400">Cedar-Riverside Community</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#092E96] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Phone</p>
                    <a href="tel:+16123543851" className="text-[#092E96] font-bold hover:underline">
                      +1 (612) 354-3851
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#092E96] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Compliance</p>
                    <p className="text-slate-600">HIPAA Compliant & Fully Licensed Dispensary</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#092E96]" />
                Operating Hours
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Monday – Friday</span>
                  <span className="font-bold text-slate-900">9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Saturday</span>
                  <span className="font-bold text-slate-900">9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-600">Sunday</span>
                  <span className="font-bold text-rose-600">Closed</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Send an Inquiry to Our Pharmacists</h2>
              <p className="text-xs text-slate-600 mb-6">
                Fill out the form below and our clinical team will get back to you promptly.
              </p>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-lg text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="text-base font-bold">Message Sent Successfully!</h3>
                  <p className="text-xs">
                    We have received your message. If urgent, please call us directly at (612) 354-3851.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-bold text-[#092E96] hover:underline"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-[#092E96] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="(612) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-[#092E96] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-[#092E96] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Inquiry Type</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-[#092E96] focus:outline-none bg-white"
                      >
                        <option value="general">General Question</option>
                        <option value="transfer">Rx Transfer Inquiry</option>
                        <option value="vaccine">Vaccine / Immunization</option>
                        <option value="delivery">Metro Home Delivery</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Message or Notes</label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Details regarding your prescription or health question..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-[#092E96] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg text-sm font-bold text-white bg-[#092E96] hover:bg-[#061F69] shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
