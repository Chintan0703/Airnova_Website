"use client";

import React, { useState } from "react";
import { 
  Users, 
  Linkedin, 
  Instagram, 
  Mail, 
  Github, 
  Award, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  Layers,
  Sparkles
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Watermark from "@/components/ui/Watermark";
import captainData from "@/content/captain.json";
import subsystemsData from "@/content/subsystems.json";

export default function Leadership() {
  const [showSubsystemLeads, setShowSubsystemLeads] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="team"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-brand-slate/40 overflow-hidden bg-brand-navy"
    >
      {/* Background Watermark */}
      <Watermark text="COMMAND & FLIGHT CREW" opacity={0.04} angle={4} />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
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

        {/* Captain Spotlight Card (PRD §4.4) */}
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
                  {captainData.avatarPlaceholder && !imgError && (captainData.avatarPlaceholder.startsWith("/uploads/") || captainData.avatarPlaceholder.startsWith("http")) ? (
                    <img
                      src={captainData.avatarPlaceholder}
                      alt={captainData.name}
                      onError={() => setImgError(true)}
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
              {subsystemsData.map((sub, idx) => (
                <div
                  key={sub.id}
                  className="glass-panel p-5 rounded-xl border border-brand-slate hover:border-brand-orange/40 transition-all group"
                >
                  <span className="text-[10px] font-mono text-brand-orange uppercase block mb-1">
                    {sub.name}
                  </span>
                  <h4 className="font-heading font-bold text-sm text-brand-light group-hover:text-brand-orange transition-colors">
                    {sub.leadName || sub.leadRole}
                  </h4>
                  <p className="text-[11px] text-brand-muted mt-0.5 leading-snug font-mono">
                    {sub.leadRole}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
