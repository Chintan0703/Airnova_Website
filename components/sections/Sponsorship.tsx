"use client";

import React from "react";
import Link from "next/link";
import { 
  Handshake, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Briefcase, 
  Layers,
  Award
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Watermark from "@/components/ui/Watermark";
import sponsorsData from "@/content/sponsors.json";

const tierColorStyles: Record<string, { badge: string; border: string; glow: string }> = {
  orange: {
    badge: "bg-brand-orange/15 text-brand-orange border-brand-orange/40",
    border: "border-brand-orange/50",
    glow: "shadow-orange-glow",
  },
  ion: {
    badge: "bg-brand-ion/15 text-brand-ion border-brand-ion/40",
    border: "border-brand-ion/50",
    glow: "shadow-ion-glow",
  },
  muted: {
    badge: "bg-brand-slate text-brand-light border-brand-border",
    border: "border-brand-slate/90",
    glow: "",
  },
};

export default function Sponsorship() {
  const valueIcons = [Briefcase, Sparkles, Layers];

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

        {/* 2. Sponsorship Tiers Matrix */}
        <div className="space-y-8 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brand-light">
              Partnership Tiers & Opportunities
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted mt-1 font-mono">
              TAILORED TIERS FOR INDUSTRY CORPORATIONS, LABS, AND HARDWARE PROVIDERS
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sponsorsData.tiers.map((tier, index) => {
              const styles = tierColorStyles[tier.badgeColor] || tierColorStyles.muted;
              return (
                <ScrollReveal key={tier.tierName} delay={0.1 * index} direction="up" className="h-full">
                  <div
                    className={`glass-panel rounded-2xl p-8 h-full flex flex-col justify-between border ${styles.border} ${styles.glow} relative overflow-hidden group`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`text-xs font-mono uppercase px-3 py-1 rounded-full border ${styles.badge}`}
                        >
                          {tier.tierName}
                        </span>
                        <ShieldCheck className="w-5 h-5 text-brand-muted group-hover:text-brand-orange transition-colors" />
                      </div>

                      <h4 className="font-heading font-bold text-xl sm:text-2xl text-brand-light mb-3">
                        {tier.tierName}
                      </h4>

                      <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-6 font-sans">
                        {tier.description}
                      </p>

                      {/* Sponsor Slots / Placeholders */}
                      <div className="space-y-2.5 mb-6">
                        <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider block">
                          Current & Reserved Slots:
                        </span>
                        {tier.sponsors.map((sp, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-center justify-between p-3 rounded-lg bg-brand-navy/80 border border-brand-slate/80 text-xs font-mono text-brand-light"
                          >
                            <span className="font-semibold">{sp.name}</span>
                            <span className="text-[10px] text-brand-orange">CONFIRMED</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-brand-slate/70">
                      <Link
                        href="#contact"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-semibold text-brand-light bg-brand-slate hover:bg-brand-orange hover:text-white border border-brand-border transition-all duration-200"
                      >
                        <span>Partner with this Tier</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <ScrollReveal delay={0.2} direction="up">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 text-center max-w-3xl mx-auto border border-brand-orange/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h4 className="font-heading font-bold text-lg text-brand-light">
                Request Our 2025 Sponsorship Brochure
              </h4>
              <p className="text-xs text-brand-muted mt-1 font-sans">
                Detailed EDR deliverables, hardware requirements, and airframe branding layouts.
              </p>
            </div>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold shadow-lg shadow-brand-orange/30 shrink-0 transition-all"
            >
              <span>Request Deck</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
