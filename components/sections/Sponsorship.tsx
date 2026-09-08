"use client";

import React, { useState } from "react";
import { 
  Handshake, 
  ArrowUpRight, 
  Sparkles, 
  Briefcase, 
  Layers,
  Building2
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Watermark from "@/components/ui/Watermark";
import sponsorsData from "@/content/sponsors.json";
import { SponsorCompany } from "@/lib/types";

function CompanyCard({ company }: { company: SponsorCompany }) {
  const [imgError, setImgError] = useState(false);

  const hasValidLogo =
    company.logoPlaceholder &&
    !imgError &&
    (company.logoPlaceholder.startsWith("/uploads/") ||
      company.logoPlaceholder.startsWith("http") ||
      company.logoPlaceholder.startsWith("data:"));

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 border border-brand-slate/90 flex flex-col justify-between h-full group hover:border-brand-orange/40 hover:shadow-orange-glow transition-all duration-300">
      <div>
        {/* Company Header: Logo / Avatar & Link */}
        <div className="flex items-center justify-between gap-3 mb-5">
          {hasValidLogo ? (
            <div className="w-14 h-10 rounded-lg bg-brand-navy border border-brand-slate p-1.5 flex items-center justify-center overflow-hidden">
              <img
                src={company.logoPlaceholder}
                alt={company.name}
                onError={() => setImgError(true)}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-brand-slate/80 border border-brand-orange/40 text-brand-orange flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          )}

          {company.websiteUrl && company.websiteUrl !== "https://example.com" && (
            <a
              href={company.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-brand-slate/60 text-brand-muted hover:text-brand-orange hover:bg-brand-slate border border-brand-slate transition-colors"
              aria-label={`Visit ${company.name} website`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Company Title */}
        <h4 className="font-heading font-bold text-lg sm:text-xl text-brand-light mb-2.5 group-hover:text-brand-orange transition-colors">
          {company.name}
        </h4>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans">
          {company.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-brand-slate/60 flex items-center justify-between text-[11px] font-mono">
        <span className="text-brand-muted">INDUSTRY PARTNER</span>
        <span className="text-brand-orange font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          <span>COLLABORATING</span>
        </span>
      </div>
    </div>
  );
}

export default function Sponsorship() {
  const valueIcons = [Briefcase, Sparkles, Layers];
  const companies: SponsorCompany[] = (sponsorsData as any).companies || [];

  return (
    <section
      id="sponsors"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-brand-slate/40 overflow-hidden bg-brand-navy"
    >
      {/* Background Watermark */}
      <Watermark text="CORPORATE PARTNERS • INDUSTRY ALLIANCES" opacity={0.04} angle={2} />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <ScrollReveal delay={0.1} direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-slate/80 border border-brand-orange/30 text-brand-orange text-xs font-mono uppercase tracking-widest mb-4">
              <Handshake className="w-3.5 h-3.5" />
              <span>Corporate Alliances</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="up">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-light tracking-tight">
              {sponsorsData.headline}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3} direction="up">
            <p className="text-brand-muted mt-4 text-base sm:text-lg leading-relaxed font-sans">
              {sponsorsData.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* 1. Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {sponsorsData.valueProposition.map((prop, idx) => {
            const Icon = valueIcons[idx % valueIcons.length];
            return (
              <ScrollReveal key={idx} delay={0.1 * idx} direction="up" className="h-full">
                <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 h-full border border-brand-slate/90 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand-navy border border-brand-orange/30 text-brand-orange flex items-center justify-center mb-5 group-hover:border-brand-orange group-hover:shadow-orange-glow transition-all">
                      <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xs font-mono text-brand-orange uppercase tracking-wider block mb-1">
                      Benefit 0{idx + 1}
                    </span>
                    <p className="text-sm sm:text-base font-medium text-brand-light leading-relaxed font-sans">
                      {prop}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* 2. Partner Companies Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brand-light">
              Our Industry & Hardware Partners
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted mt-1 font-mono">
              COLLABORATING WITH LEADING AEROSPACE AND HARDWARE ORGANIZATIONS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {companies.map((company, index) => (
              <ScrollReveal key={company.id || index} delay={0.1 * index} direction="up" className="h-full">
                <CompanyCard company={company} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
