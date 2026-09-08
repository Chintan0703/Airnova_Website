"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Watermark from "@/components/ui/Watermark";
import siteData from "@/content/site.json";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    inquiryType: "sponsorship",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please complete all required fields (Name, Email, Message).");
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable API / Formspree / EmailJS dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        organization: "",
        inquiryType: "sponsorship",
        message: "",
      });
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-brand-slate/40 overflow-hidden bg-brand-navy"
    >
      {/* Background Watermark */}
      <Watermark text="COMMUNICATIONS • RECRUITMENT & SPONSORSHIPS" opacity={0.04} angle={-2} />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <ScrollReveal delay={0.1} direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-slate/80 border border-brand-orange/30 text-brand-orange text-xs font-mono uppercase tracking-widest mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Squadron Communications</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="up">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-light tracking-tight">
              Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">Airnova</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3} direction="up">
            <p className="text-brand-muted mt-4 text-base sm:text-lg leading-relaxed font-sans">
              Whether you are an aspiring aerospace engineer, a potential sponsor, or a research collaborator, our communications channel is active.
            </p>
          </ScrollReveal>
        </div>

        {/* 2-Column Contact Deck: Contact Details & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Column 1: Coordinates & Credentials (5 cols) */}
          <ScrollReveal delay={0.2} direction="left" className="lg:col-span-5 h-full">
            <div className="glass-panel rounded-3xl p-8 sm:p-10 h-full flex flex-col justify-between border border-brand-slate/90 relative overflow-hidden">
              <div>
                <span className="text-xs font-mono text-brand-orange uppercase tracking-widest block mb-2">
                  Headquarters & Flight Lab
                </span>
                <h3 className="font-heading text-2xl font-bold text-brand-light mb-4">
                  Aero Flight Operations
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-8 font-sans">
                  Our lab is located inside the Advanced Aerospace Prototyping Facility, equipped with dynamic thrust benches, CFD workstations, and composite curing ovens.
                </p>

                {/* Contact Coordinates List */}
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy border border-brand-orange/30 text-brand-orange flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-brand-muted uppercase block">Campus Base</span>
                      <p className="text-xs sm:text-sm text-brand-light font-medium">{siteData.location.address}</p>
                      <p className="text-xs text-brand-muted">{siteData.location.campus}, {siteData.location.city}</p>
                      <p className="text-[10px] font-mono text-brand-orange mt-0.5">{siteData.location.coordinates}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy border border-brand-orange/30 text-brand-orange flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-brand-muted uppercase block">Direct Email</span>
                      <a
                        href={`mailto:${siteData.contact.email}`}
                        className="text-xs sm:text-sm text-brand-light hover:text-brand-orange transition-colors font-medium"
                      >
                        {siteData.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy border border-brand-orange/30 text-brand-orange flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-brand-muted uppercase block">Operations Telephony</span>
                      <p className="text-xs sm:text-sm text-brand-light font-mono">{siteData.contact.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Box */}
              <div className="mt-8 pt-6 border-t border-brand-slate/70">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>RECRUITMENT & SPONSORSHIP DESK ACTIVE</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Column 2: Interactive Form (7 cols) */}
          <ScrollReveal delay={0.3} direction="right" className="lg:col-span-7 h-full">
            <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-brand-orange/40 shadow-2xl relative">
              {isSuccess ? (
                <div className="text-center py-12 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-6 shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brand-light mb-2">
                    Transmission Dispatched!
                  </h3>
                  <p className="text-sm text-brand-muted max-w-md mx-auto mb-8 leading-relaxed font-sans">
                    Thank you for reaching out. The Airnova Squadron Operations Lead will review your transmission and reply within 24–48 hours.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-brand-slate hover:bg-brand-orange text-xs font-mono text-brand-light hover:text-white border border-brand-border transition-all"
                  >
                    <span>Send Another Transmission</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-brand-slate/80">
                    <span className="text-xs font-mono text-brand-orange uppercase tracking-wider">
                      Transmission Channel
                    </span>
                    <span className="text-[10px] font-mono text-brand-muted">
                      SSL ENCRYPTED
                    </span>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 font-mono">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Inquiry Type Radio / Pill Selector */}
                  <div>
                    <label className="block text-xs font-mono text-brand-muted uppercase mb-2">
                      Inquiry Category *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { id: "sponsorship", label: "Sponsorship & Partner" },
                        { id: "recruitment", label: "Recruitment Application" },
                        { id: "collaboration", label: "R&D Collaboration" },
                        { id: "general", label: "General Inquiry" },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, inquiryType: type.id })}
                          className={`px-3 py-2 rounded-lg text-xs font-mono text-left transition-all border ${
                            formData.inquiryType === type.id
                              ? "bg-brand-orange/15 border-brand-orange text-brand-orange font-semibold shadow-sm"
                              : "bg-brand-navy/60 border-brand-slate text-brand-muted hover:text-brand-light hover:border-brand-border"
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-brand-muted uppercase mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-brand-navy/90 border border-brand-slate focus:border-brand-orange focus:ring-1 focus:ring-brand-orange text-sm text-brand-light placeholder:text-brand-muted/50 focus:outline-none transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-brand-muted uppercase mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-brand-navy/90 border border-brand-slate focus:border-brand-orange focus:ring-1 focus:ring-brand-orange text-sm text-brand-light placeholder:text-brand-muted/50 focus:outline-none transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Organization / College */}
                  <div>
                    <label className="block text-xs font-mono text-brand-muted uppercase mb-1.5">
                      Organization / Institute (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aeronautics Lab / Tech Corp"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-brand-navy/90 border border-brand-slate focus:border-brand-orange focus:ring-1 focus:ring-brand-orange text-sm text-brand-light placeholder:text-brand-muted/50 focus:outline-none transition-all font-sans"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-brand-muted uppercase mb-1.5">
                      Message / Proposal Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your sponsorship interest, project proposal, or recruitment background..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-brand-navy/90 border border-brand-slate focus:border-brand-orange focus:ring-1 focus:ring-brand-orange text-sm text-brand-light placeholder:text-brand-muted/50 focus:outline-none transition-all resize-none font-sans"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold shadow-lg shadow-brand-orange/30 hover:shadow-orange-glow transition-all duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2 font-mono text-xs">
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        DISPATCHING TRANSMISSION...
                      </span>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
