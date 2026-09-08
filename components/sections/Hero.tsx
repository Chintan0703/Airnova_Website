"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Watermark from "@/components/ui/Watermark";
import ScrollReveal from "@/components/ui/ScrollReveal";
import siteData from "@/content/site.json";
import achievementsData from "@/content/achievements.json";
import subsystemsData from "@/content/subsystems.json";
import projectsData from "@/content/projects.json";

export default function Hero() {
  const tagline = (siteData.tagline || "Flying Beyond Limits").toUpperCase().trim();
  const words = tagline.split(/\s+/).filter(Boolean);

  const renderTagline = () => {
    if (words.length <= 1) {
      return (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-400 to-amber-300 drop-shadow-[0_0_35px_rgba(255,122,26,0.35)]">
          {words[0] || "FLYING"}
        </span>
      );
    }
    if (words.length === 2) {
      return (
        <>
          {words[0]}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-400 to-amber-300 drop-shadow-[0_0_35px_rgba(255,122,26,0.35)]">
            {words[1]}
          </span>
        </>
      );
    }
    const midIdx = Math.floor(words.length / 2);
    const firstPart = words.slice(0, midIdx).join(" ");
    const highlightWord = words[midIdx];
    const lastPart = words.slice(midIdx + 1).join(" ");

    return (
      <>
        {firstPart}{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-400 to-amber-300 drop-shadow-[0_0_35px_rgba(255,122,26,0.35)]">
          {highlightWord}
        </span>{" "}
        {lastPart}
      </>
    );
  };

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
      <div className="relative max-w-5xl mx-auto text-center z-10 my-auto pt-8">
        {/* Brand Display H1 Title */}
        <ScrollReveal delay={0.2} direction="up">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-brand-light leading-[1.08] mb-6">
            {renderTagline()}
          </h1>
        </ScrollReveal>

        {/* Tagline / Subtitle */}
        <ScrollReveal delay={0.3} direction="up">
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-brand-muted leading-relaxed mb-12 font-sans font-normal">
            {siteData.shortDescription}
          </p>
        </ScrollReveal>

        {/* Hero Quick Avionics Telemetry Bar */}
        <ScrollReveal delay={0.5} direction="up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto p-4 sm:p-5 rounded-xl glass-panel border border-brand-slate/90 shadow-2xl">
            <div className="p-3 text-center border-r border-brand-slate/60 last:border-none">
              <div className="text-2xl sm:text-3xl font-display font-black text-brand-orange">
                {subsystemsData.length}
              </div>
              <div className="text-[11px] sm:text-xs font-mono text-brand-muted uppercase tracking-wider mt-0.5">
                Subsystems
              </div>
            </div>

            <div className="p-3 text-center sm:border-r border-brand-slate/60 last:border-none">
              <div className="text-2xl sm:text-3xl font-display font-black text-brand-ion">
                {projectsData.length}
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
