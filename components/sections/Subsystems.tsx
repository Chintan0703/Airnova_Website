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
  X,
  Users, 
  Linkedin, 
  Instagram, 
  Mail, 
  Github, 
  Award, 
  Compass, 
  ChevronDown, 
  ChevronUp
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Watermark from "@/components/ui/Watermark";
import captainData from "@/content/captain.json";
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
  const [showSubsystemLeads, setShowSubsystemLeads] = useState(false);
  const [captainImgError, setCaptainImgError] = useState(false);

  const subsystems: Subsystem[] = subsystemsData;

  return (
    <section
      id="subsystems"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-brand-slate/40 overflow-hidden bg-brand-navy"
    >
      {/* Background Watermark */}
      <Watermark text={`COMMAND & ${subsystems.length} ENGINEERING WINGS`} opacity={0.04} angle={-3} />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* ========================================================================= */}
        {/* 1. SQUADRON LEADERSHIP & COMMAND (RENDERED FIRST AT VERY TOP)           */}
        {/* ========================================================================= */}
        <div className="mb-24 sm:mb-28">
          {/* Leadership Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <ScrollReveal delay={0.1} direction="down">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-slate/80 border border-brand-orange/30 text-brand-orange text-xs font-mono uppercase tracking-widest mb-4">
                <Users className="w-3.5 h-3.5" />
                <span>Squadron Leadership</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} direction="up">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-light tracking-tight">
                Squadron <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">Command</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3} direction="up">
              <p className="text-brand-muted mt-4 text-base sm:text-lg leading-relaxed font-sans">
                Meet the flight leads orchestrating autonomous UAV development, cross-subsystem integration, and national aerospace competition campaigns.
              </p>
            </ScrollReveal>
          </div>

          {/* Captain Spotlight Card */}
          <ScrollReveal delay={0.3} direction="up">
            <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-8 sm:p-12 border border-brand-orange/40 shadow-orange-glow relative overflow-hidden group">
              {/* Ambient Corner Glow */}
              <div
                aria-hidden="true"
                className="absolute -bottom-16 -right-16 w-56 h-56 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-orange/25 transition-all duration-500"
              />

              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-10 relative z-10">
                {/* Captain Avatar with Aerospace 2px Orange Ring */}
                <div className="relative shrink-0">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-brand-slate border-2 border-brand-orange/80 ring-4 ring-brand-navy shadow-2xl flex items-center justify-center text-brand-orange font-display font-black text-4xl group-hover:scale-105 group-hover:shadow-orange-glow transition-all duration-300 overflow-hidden">
                    {captainData.avatarPlaceholder && !captainImgError && (captainData.avatarPlaceholder.startsWith("/uploads/") || captainData.avatarPlaceholder.startsWith("http")) ? (
                      <img
                        src={captainData.avatarPlaceholder}
                        alt={captainData.name}
                        onError={() => setCaptainImgError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>
                        {captainData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    )}
                  </div>
                  {/* Flight Status Pill */}
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-brand-navy border border-brand-orange text-[10px] font-mono text-brand-orange whitespace-nowrap shadow-md">
                    CAPTAIN
                  </div>
                </div>

                {/* Bio & Details */}
                <div className="text-center md:text-left flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-light">
                        {captainData.name}
                      </h3>
                      <p className="text-sm font-mono text-brand-orange mt-0.5">
                        {captainData.title} • {captainData.tenure}
                      </p>
                    </div>

                    <span className="text-xs font-mono px-3 py-1 rounded bg-brand-slate text-brand-muted border border-brand-border/60 self-center md:self-start">
                      {captainData.subsystemFocus}
                    </span>
                  </div>

                  {/* Inspiring Quote */}
                  <blockquote className="my-4 text-sm sm:text-base italic text-brand-orange/95 border-l-2 border-brand-orange pl-4 leading-relaxed font-serif">
                    &ldquo;{captainData.quote}&rdquo;
                  </blockquote>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-brand-light/90 leading-relaxed mb-6 font-sans">
                    {captainData.bio}
                  </p>

                  {/* Social Channels */}
                  <div className="flex items-center justify-center md:justify-start gap-3 pt-4 border-t border-brand-slate/80">
                    {captainData.socials.linkedin && (
                      <a
                        href={captainData.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Captain LinkedIn"
                        className="w-9 h-9 rounded-lg bg-brand-slate border border-brand-border text-brand-muted hover:text-brand-orange hover:border-brand-orange/50 flex items-center justify-center transition-all"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {captainData.socials.instagram && (
                      <a
                        href={captainData.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Captain Instagram"
                        className="w-9 h-9 rounded-lg bg-brand-slate border border-brand-border text-brand-muted hover:text-brand-orange hover:border-brand-orange/50 flex items-center justify-center transition-all"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {captainData.socials.email && (
                      <a
                        href={`mailto:${captainData.socials.email}`}
                        aria-label="Captain Email"
                        className="w-9 h-9 rounded-lg bg-brand-slate border border-brand-border text-brand-muted hover:text-brand-orange hover:border-brand-orange/50 flex items-center justify-center transition-all"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {captainData.socials.github && (
                      <a
                        href={captainData.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Captain GitHub"
                        className="w-9 h-9 rounded-lg bg-brand-slate border border-brand-border text-brand-muted hover:text-brand-orange hover:border-brand-orange/50 flex items-center justify-center transition-all"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Extensible Subsystem Leads Toggle */}
          <div className="max-w-4xl mx-auto mt-12 text-center">
            <button
              onClick={() => setShowSubsystemLeads(!showSubsystemLeads)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-slate/80 hover:bg-brand-slate border border-brand-border hover:border-brand-orange/50 text-xs sm:text-sm font-mono text-brand-light transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              <Layers className="w-4 h-4 text-brand-orange" />
              <span>{showSubsystemLeads ? "Hide Subsystem Leads" : "Explore All Subsystem Leads Roster"}</span>
              {showSubsystemLeads ? (
                <ChevronUp className="w-4 h-4 text-brand-orange" />
              ) : (
                <ChevronDown className="w-4 h-4 text-brand-orange" />
              )}
            </button>

            {/* Subsystem Leads Roster Grid */}
            {showSubsystemLeads && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 animate-in fade-in slide-in-from-top-4 duration-300 text-left">
                {subsystemsData.map((sub) => (
                  <div
                    key={sub.id}
                    className="glass-panel p-5 rounded-xl border border-brand-slate hover:border-brand-orange/40 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-brand-orange uppercase block mb-1">
                        {sub.name}
                      </span>
                      {sub.heads && sub.heads.length > 0 ? (
                        <div className="space-y-2 mt-1">
                          {sub.heads.map((head, hIdx) => (
                            <div key={hIdx} className="border-b border-brand-slate/40 last:border-b-0 pb-1.5 last:pb-0">
                              <h4 className="font-heading font-bold text-sm text-brand-light group-hover:text-brand-orange transition-colors">
                                {head.name}
                              </h4>
                              <p className="text-[11px] text-brand-muted mt-0.5 leading-snug font-mono">
                                {head.role || sub.leadRole}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          <h4 className="font-heading font-bold text-sm text-brand-light group-hover:text-brand-orange transition-colors">
                            {sub.leadName || sub.leadRole}
                          </h4>
                          <p className="text-[11px] text-brand-muted mt-0.5 leading-snug font-mono">
                            {sub.leadRole}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. FUNCTIONAL SUBSYSTEMS GRID (FOLLOWED BELOW LEADERSHIP)                 */}
        {/* ========================================================================= */}
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
                      {sub.heads && sub.heads.length > 0 ? (
                        <div className="space-y-0.5">
                          {sub.heads.map((head, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-brand-light font-semibold text-[11px]">{head.name}</span>
                              {head.role && (
                                <span className="text-brand-orange text-[10px]">({head.role})</span>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          {sub.leadName && (
                            <span className="text-brand-light font-semibold text-[11px]">{sub.leadName}</span>
                          )}
                          <span className="text-brand-orange text-[10px]">{sub.leadRole}</span>
                        </>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-brand-muted group-hover:text-brand-orange group-hover:translate-x-1 transition-all shrink-0" />
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

            <div className="pt-4 border-t border-brand-slate flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-2">
              <span className="text-brand-muted">Wing Leadership:</span>
              <div className="text-left sm:text-right space-y-0.5">
                {selectedSubsystem.heads && selectedSubsystem.heads.length > 0 ? (
                  selectedSubsystem.heads.map((h, hIdx) => (
                    <div key={hIdx} className="text-brand-orange font-bold">
                      {h.name} {h.role ? `(${h.role})` : ""}
                    </div>
                  ))
                ) : (
                  <span className="text-brand-orange font-bold">
                    {selectedSubsystem.leadName ? `${selectedSubsystem.leadName} (${selectedSubsystem.leadRole})` : selectedSubsystem.leadRole}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
