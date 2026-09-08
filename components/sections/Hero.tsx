"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Compass, Rocket, Shield, Activity } from "lucide-react";
import Watermark from "@/components/ui/Watermark";
import ScrollReveal from "@/components/ui/ScrollReveal";
import siteData from "@/content/site.json";
import achievementsData from "@/content/achievements.json";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[94vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden bg-radial-gradient"
    >
      {/* 1. Backdrop Watermark Layer (Developer C primitive) */}
      <Watermark
        text={siteData.watermark}
        opacity={0.06}
        angle={-4}
        repeat={true}
      />

      {/* 2. Ambient Aerospace Glow Orbs */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-orange/10 blur-[130px] rounded-full pointer-events-none z-0"
      />
      <div
        aria-hidden="true"
        className="absolute top-2/3 right-1/4 w-[400px] h-[250px] bg-brand-ion/10 blur-[120px] rounded-full pointer-events-none z-0"
      />

      {/* 3. Main Hero Interactive Content */}
      <div className="relative max-w-5xl mx-auto text-center z-10 my-auto">
        {/* Squadron Flight Readiness Badge */}
        <ScrollReveal delay={0.1} direction="down">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-slate/90 border border-brand-orange/40 text-brand-orange text-xs sm:text-sm font-mono tracking-widest uppercase mb-8 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
            <span className="text-brand-light font-semibold">AIRNOVA SQUADRON</span>
            <span className="text-brand-muted">•</span>
            <span className="text-brand-orange font-mono">EST. {siteData.establishedYear}</span>
          </div>
        </ScrollReveal>

        {/* Brand Display H1 Title */}
        <ScrollReveal delay={0.2} direction="up">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-brand-light leading-[1.08] mb-6">
            FLYING{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-400 to-amber-300 drop-shadow-[0_0_35px_rgba(255,122,26,0.35)]">
              BEYOND
            </span>{" "}
            LIMITS
          </h1>
        </ScrollReveal>

        {/* Tagline / Subtitle */}
        <ScrollReveal delay={0.3} direction="up">
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-brand-muted leading-relaxed mb-10 font-sans font-normal">
            {siteData.shortDescription}
          </p>
        </ScrollReveal>

        {/* Primary Call-to-Action Group */}
        <ScrollReveal delay={0.4} direction="up">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href={siteData.cta.secondary.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 text-base font-semibold text-white bg-brand-orange hover:bg-brand-orange-hover rounded-md shadow-lg shadow-brand-orange/30 hover:shadow-orange-glow transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              <span>{siteData.cta.secondary.label}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>

            <Link
              href={siteData.cta.primary.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-base font-medium text-brand-light bg-brand-slate hover:bg-brand-slate/80 border border-brand-border hover:border-brand-orange/60 rounded-md transition-all duration-300 shadow-md group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              <Rocket className="w-4 h-4 text-brand-orange group-hover:rotate-12 transition-transform duration-300" />
              <span>{siteData.cta.primary.label}</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Hero Quick Avionics Telemetry Bar */}
        <ScrollReveal delay={0.5} direction="up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto p-4 sm:p-5 rounded-xl glass-panel border border-brand-slate/90 shadow-2xl">
            <div className="p-3 text-center border-r border-brand-slate/60 last:border-none">
              <div className="text-2xl sm:text-3xl font-display font-black text-brand-orange">
                8
              </div>
              <div className="text-[11px] sm:text-xs font-mono text-brand-muted uppercase tracking-wider mt-0.5">
                Subsystems
              </div>
            </div>

            <div className="p-3 text-center sm:border-r border-brand-slate/60 last:border-none">
              <div className="text-2xl sm:text-3xl font-display font-black text-brand-ion">
                7
              </div>
              <div className="text-[11px] sm:text-xs font-mono text-brand-muted uppercase tracking-wider mt-0.5">
                Flagship Builds
              </div>
            </div>

            <div className="p-3 text-center border-r border-brand-slate/60 last:border-none">
              <div className="text-2xl sm:text-3xl font-display font-black text-brand-light">
                {achievementsData.stats.competitionsAttended}+
              </div>
              <div className="text-[11px] sm:text-xs font-mono text-brand-muted uppercase tracking-wider mt-0.5">
                Podiums & Events
              </div>
            </div>

            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-display font-black text-amber-400">
                {achievementsData.stats.flightHoursLogged}+
              </div>
              <div className="text-[11px] sm:text-xs font-mono text-brand-muted uppercase tracking-wider mt-0.5">
                Flight Hours
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* 4. Animated Scroll Down Chevron Indicator */}
      <div className="relative z-10 mt-8 mb-2">
        <Link
          href="#about"
          aria-label="Scroll down to About section"
          className="flex flex-col items-center gap-1.5 text-brand-muted hover:text-brand-orange transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded p-1"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-75 group-hover:opacity-100">
            Explore Flight Deck
          </span>
          <ChevronDown className="w-5 h-5 text-brand-orange animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
