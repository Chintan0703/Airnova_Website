"use client";

import React, { useState } from "react";
import { 
  Trophy, 
  Award, 
  Clock, 
  Users, 
  CheckCircle2, 
  Maximize2, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Watermark from "@/components/ui/Watermark";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Lightbox, { LightboxItem } from "@/components/ui/Lightbox";
import achievementsData from "@/content/achievements.json";

export default function Achievements() {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const stats = achievementsData.stats;
  const records = achievementsData.records;

  const currentItem: LightboxItem | null =
    activeLightboxIndex !== null ? (records[activeLightboxIndex] as LightboxItem) : null;

  const handleNext = () => {
    if (activeLightboxIndex !== null && activeLightboxIndex < records.length - 1) {
      setActiveLightboxIndex(activeLightboxIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeLightboxIndex !== null && activeLightboxIndex > 0) {
      setActiveLightboxIndex(activeLightboxIndex - 1);
    }
  };

  return (
    <section
      id="achievements"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-brand-slate/40 overflow-hidden bg-brand-navy"
    >
      {/* Background Watermark */}
      <Watermark text="VICTORIES • AWARDS & RECORDS" opacity={0.04} angle={-3} />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <ScrollReveal delay={0.1} direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-slate/80 border border-brand-orange/30 text-brand-orange text-xs font-mono uppercase tracking-widest mb-4">
              <Trophy className="w-3.5 h-3.5" />
              <span>Competitive Excellence</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="up">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-light tracking-tight">
              Achievements & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">Podiums</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3} direction="up">
            <p className="text-brand-muted mt-4 text-base sm:text-lg leading-relaxed font-sans mb-4">
              Our engineering solutions have been tested and proven at premier national and collegiate aerospace challenges.
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href="/achievements"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-orange hover:underline px-3 py-1.5 rounded-md bg-brand-orange/10 border border-brand-orange/30"
              >
                <span>View Dedicated Archive Page (/achievements)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* 1. Animated KPI Counters Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {/* Stat 1 */}
          <ScrollReveal delay={0.1} direction="up">
            <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 text-center border border-brand-slate/90">
              <div className="w-12 h-12 rounded-xl bg-brand-navy border border-brand-orange/40 text-brand-orange mx-auto flex items-center justify-center mb-4 shadow-orange-glow">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-brand-orange mb-1">
                <AnimatedCounter value={stats.competitionsAttended} suffix="+" duration={2} />
              </div>
              <p className="text-xs sm:text-sm font-mono text-brand-muted uppercase tracking-wider">
                Competitions Attended
              </p>
            </div>
          </ScrollReveal>

          {/* Stat 2 */}
          <ScrollReveal delay={0.2} direction="up">
            <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 text-center border border-brand-slate/90">
              <div className="w-12 h-12 rounded-xl bg-brand-navy border border-brand-ion/40 text-brand-ion mx-auto flex items-center justify-center mb-4 shadow-ion-glow">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-brand-ion mb-1">
                <AnimatedCounter value={stats.projectsCompleted} suffix="+" duration={2.2} />
              </div>
              <p className="text-xs sm:text-sm font-mono text-brand-muted uppercase tracking-wider">
                Projects Completed
              </p>
            </div>
          </ScrollReveal>

          {/* Stat 3 */}
          <ScrollReveal delay={0.3} direction="up">
            <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 text-center border border-brand-slate/90">
              <div className="w-12 h-12 rounded-xl bg-brand-navy border border-brand-border text-brand-light mx-auto flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-brand-light" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-brand-light mb-1">
                <AnimatedCounter value={stats.activeMembers} suffix="+" duration={2.4} />
              </div>
              <p className="text-xs sm:text-sm font-mono text-brand-muted uppercase tracking-wider">
                Active Flight Engineers
              </p>
            </div>
          </ScrollReveal>

          {/* Stat 4 */}
          <ScrollReveal delay={0.4} direction="up">
            <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 text-center border border-brand-slate/90">
              <div className="w-12 h-12 rounded-xl bg-brand-navy border border-amber-400/40 text-amber-400 mx-auto flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-amber-400 mb-1">
                <AnimatedCounter value={stats.flightHoursLogged} suffix="+" duration={2.5} />
              </div>
              <p className="text-xs sm:text-sm font-mono text-brand-muted uppercase tracking-wider">
                Flight Hours Logged
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* 2. Competition Trophies & Records Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {records.map((record, index) => (
            <ScrollReveal key={record.id} delay={0.1 * index} direction="up" className="h-full">
              <div
                onClick={() => setActiveLightboxIndex(index)}
                className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 border border-brand-slate/90 flex flex-col justify-between h-full cursor-pointer group relative overflow-hidden transition-all duration-300 hover:border-brand-orange/50 hover:shadow-orange-glow"
              >
                {/* Ambient Highlight */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl group-hover:bg-brand-orange/20 transition-all pointer-events-none"
                />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange uppercase font-semibold">
                      {record.rank}
                    </span>
                    <span className="text-xs font-mono text-brand-muted">
                      {record.year}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-brand-light mb-1 group-hover:text-brand-orange transition-colors">
                    {record.title}
                  </h3>

                  <p className="text-xs font-mono text-brand-ion mb-3">
                    Event: {record.event}
                  </p>

                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-6 font-sans">
                    {record.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-slate/70 flex items-center justify-between text-xs font-mono">
                  <span className="text-brand-muted">Division: {record.category}</span>
                  <span className="text-brand-orange font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect Record</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        item={currentItem}
        onClose={() => setActiveLightboxIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={activeLightboxIndex !== null && activeLightboxIndex < records.length - 1}
        hasPrev={activeLightboxIndex !== null && activeLightboxIndex > 0}
      />
    </section>
  );
}
