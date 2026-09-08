"use client";

import React, { useState } from "react";
import { 
  Wind, 
  Rocket, 
  Cpu, 
  Microscope, 
  Handshake, 
  FileText, 
  Wallet, 
  Megaphone,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Layers,
  X
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Watermark from "@/components/ui/Watermark";
import subsystemsData from "@/content/subsystems.json";
import { Subsystem } from "@/lib/types";

// Icon mapping helper
const iconMap: Record<string, React.ElementType> = {
  Wing: Wind,
  Rocket: Rocket,
  Cpu: Cpu,
  Microscope: Microscope,
  Handshake: Handshake,
  FileText: FileText,
  Wallet: Wallet,
  Megaphone: Megaphone,
};

export default function Subsystems() {
  const [selectedSubsystem, setSelectedSubsystem] = useState<Subsystem | null>(null);

  const subsystems: Subsystem[] = subsystemsData;

  return (
    <section
      id="subsystems"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-brand-slate/40 overflow-hidden bg-brand-navy"
    >
      {/* Background Watermark */}
      <Watermark text={`ENGINEERING WINGS • ${subsystems.length} SUBSYSTEMS`} opacity={0.04} angle={-3} />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <ScrollReveal delay={0.1} direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-slate/80 border border-brand-orange/30 text-brand-orange text-xs font-mono uppercase tracking-widest mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>Multidisciplinary Engineering Wings</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="up">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-light tracking-tight">
              {subsystems.length} Functional <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">Subsystems</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3} direction="up">
            <p className="text-brand-muted mt-4 text-base sm:text-lg leading-relaxed font-sans">
              From advanced composite airframe fabrication to autonomous autopilot loops and corporate sponsorship, our squadron operates through {subsystems.length} synchronized divisions.
            </p>
          </ScrollReveal>
        </div>

        {/* 8-Wing Responsive Grid: 4 cols (Desktop) -> 2 cols (Tablet) -> 1 col (Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subsystems.map((sub, index) => {
            const IconComponent = iconMap[sub.icon] || Layers;
            return (
              <ScrollReveal
                key={sub.id}
                delay={0.05 * index}
                direction="up"
                className="h-full"
              >
                <div
                  onClick={() => setSelectedSubsystem(sub)}
                  className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-full border border-brand-slate/90 cursor-pointer group relative overflow-hidden transition-all duration-300 hover:border-brand-orange/50 hover:shadow-orange-glow"
                >
                  {/* Subtle top-right ambient glow on hover */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-12 -right-12 w-28 h-28 bg-brand-orange/10 rounded-full blur-xl group-hover:bg-brand-orange/20 transition-all duration-500 pointer-events-none"
                  />

                  <div>
                    {/* Icon container with Propeller Spin Micro-Interaction */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-brand-navy border border-brand-orange/30 flex items-center justify-center text-brand-orange shadow-md group-hover:border-brand-orange group-hover:shadow-orange-glow transition-all duration-300">
                        <IconComponent className="w-6 h-6 propeller-spin" />
                      </div>
                      <span className="text-[10px] font-mono text-brand-muted uppercase px-2 py-0.5 rounded bg-brand-navy/80 border border-brand-border/60">
                        WING 0{index + 1}
                      </span>
                    </div>

                    {/* Subsystem Title */}
                    <h3 className="font-heading font-bold text-xl text-brand-light mb-2.5 group-hover:text-brand-orange transition-colors">
                      {sub.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-4">
                      {sub.description}
                    </p>

                    {/* Focus Area Pill Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {sub.focusAreas.slice(0, 2).map((focus, fIdx) => (
                        <span
                          key={fIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-slate text-brand-light/80 border border-brand-border/50"
                        >
                          {focus}
                        </span>
                      ))}
                      {sub.focusAreas.length > 2 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-slate/50 text-brand-orange">
                          +{sub.focusAreas.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-brand-slate/60 flex items-center justify-between text-xs font-mono">
                    <div className="flex flex-col">
                      {sub.leadName && (
                        <span className="text-brand-light font-semibold text-[11px]">{sub.leadName}</span>
                      )}
                      <span className="text-brand-orange text-[10px]">{sub.leadRole}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-brand-muted group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Subsystem Interactive Detail Modal */}
      {selectedSubsystem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedSubsystem(null)}
        >
          <div
            className="glass-panel rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-brand-orange/40 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedSubsystem(null)}
              aria-label="Close detail modal"
              className="absolute top-5 right-5 p-2 rounded-lg bg-brand-slate text-brand-muted hover:text-brand-light hover:bg-brand-slate/80 border border-brand-border transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand-navy border border-brand-orange flex items-center justify-center text-brand-orange shadow-orange-glow">
                {(() => {
                  const Icon = iconMap[selectedSubsystem.icon] || Layers;
                  return <Icon className="w-6 h-6" />;
                })()}
              </div>
              <div>
                <span className="text-xs font-mono text-brand-orange uppercase">Engineering Wing</span>
                <h3 className="font-heading text-2xl font-bold text-brand-light">
                  {selectedSubsystem.name}
                </h3>
              </div>
            </div>

            <p className="text-sm text-brand-light/90 leading-relaxed mb-6">
              {selectedSubsystem.description}
            </p>

            <div className="space-y-3 mb-6">
              <span className="text-xs font-mono text-brand-orange uppercase tracking-wider block">
                Core Specialization & Focus Areas
              </span>
              <ul className="space-y-2">
                {selectedSubsystem.focusAreas.map((area, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-brand-muted">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-brand-slate flex items-center justify-between text-xs font-mono">
              <span className="text-brand-muted">Wing Leadership:</span>
              <span className="text-brand-orange font-bold">
                {selectedSubsystem.leadName ? `${selectedSubsystem.leadName} (${selectedSubsystem.leadRole})` : selectedSubsystem.leadRole}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
