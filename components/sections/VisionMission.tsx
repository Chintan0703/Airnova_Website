"use client";

import React from "react";
import { Compass, Rocket, Target, Cpu, CheckCircle2, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Watermark from "@/components/ui/Watermark";
import siteData from "@/content/site.json";

export default function VisionMission() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-brand-slate/40 overflow-hidden bg-brand-navy"
    >
      {/* Subtle backdrop watermark */}
      <Watermark text="PIONEER • BUILD • INNOVATE" opacity={0.04} angle={3} />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <ScrollReveal delay={0.1} direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-slate/80 border border-brand-orange/30 text-brand-orange text-xs font-mono uppercase tracking-widest mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Foundational Flight Creed</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="up">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-light tracking-tight">
              Our Vision & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">Mission</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3} direction="up">
            <p className="text-brand-muted mt-4 text-base sm:text-lg leading-relaxed font-sans">
              {siteData.fullDescription}
            </p>
          </ScrollReveal>
        </div>

        {/* Split-Card Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: Vision Statement */}
          <ScrollReveal delay={0.2} direction="left" className="h-full">
            <div className="glass-panel glass-panel-hover rounded-2xl p-8 sm:p-10 h-full flex flex-col justify-between border border-brand-slate/90 relative overflow-hidden group">
              {/* Ambient Accent Highlight */}
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-36 h-36 bg-brand-orange/10 rounded-full blur-2xl group-hover:bg-brand-orange/20 transition-all duration-500 pointer-events-none"
              />

              <div>
                {/* Header Icon + Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-brand-navy/90 border border-brand-orange/40 flex items-center justify-center text-brand-orange shadow-md group-hover:border-brand-orange group-hover:shadow-orange-glow transition-all duration-300">
                    <Target className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-orange px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30">
                    LONG-TERM HORIZON
                  </span>
                </div>

                <span className="text-xs font-mono text-brand-muted uppercase tracking-widest">
                  Strategic Directive
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brand-light mt-1 mb-4">
                  {siteData.vision.title}
                </h3>

                <blockquote className="text-lg sm:text-xl font-medium text-brand-orange italic mb-6 border-l-2 border-brand-orange pl-4">
                  &ldquo;{siteData.vision.statement}&rdquo;
                </blockquote>

                {/* Highlights List */}
                <ul className="space-y-3.5 mb-6 text-sm sm:text-base text-brand-muted">
                  {siteData.vision.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                      <span className="leading-snug text-brand-light/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-brand-slate/70 flex items-center justify-between text-xs font-mono text-brand-muted">
                <span>FOCUS: RESEARCH & AEROSPACE PRESTIGE</span>
                <ChevronRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Mission Statement */}
          <ScrollReveal delay={0.3} direction="right" className="h-full">
            <div className="glass-panel glass-panel-hover rounded-2xl p-8 sm:p-10 h-full flex flex-col justify-between border border-brand-slate/90 relative overflow-hidden group">
              {/* Ambient Accent Highlight */}
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-36 h-36 bg-brand-ion/10 rounded-full blur-2xl group-hover:bg-brand-ion/20 transition-all duration-500 pointer-events-none"
              />

              <div>
                {/* Header Icon + Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-brand-navy/90 border border-brand-ion/40 flex items-center justify-center text-brand-ion shadow-md group-hover:border-brand-ion group-hover:shadow-ion-glow transition-all duration-300">
                    <Rocket className="w-7 h-7 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-ion px-3 py-1 rounded-full bg-brand-ion/10 border border-brand-ion/30">
                    ENGINEERING EXECUTION
                  </span>
                </div>

                <span className="text-xs font-mono text-brand-muted uppercase tracking-widest">
                  Operational Mission
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brand-light mt-1 mb-4">
                  {siteData.mission.title}
                </h3>

                <blockquote className="text-lg sm:text-xl font-medium text-brand-ion italic mb-6 border-l-2 border-brand-ion pl-4">
                  &ldquo;{siteData.mission.statement}&rdquo;
                </blockquote>

                {/* Highlights List */}
                <ul className="space-y-3.5 mb-6 text-sm sm:text-base text-brand-muted">
                  {siteData.mission.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-ion shrink-0 mt-0.5" />
                      <span className="leading-snug text-brand-light/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-brand-slate/70 flex items-center justify-between text-xs font-mono text-brand-muted">
                <span>FOCUS: PROTOTYPING & AUTONOMOUS UAVs</span>
                <ChevronRight className="w-4 h-4 text-brand-ion group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
