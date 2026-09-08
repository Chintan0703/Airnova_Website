"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Compass,
  Rocket,
  Target,
  CheckCircle2,
  Calendar,
  Award,
  Zap,
  Flag,
} from "lucide-react";
import Watermark from "@/components/ui/Watermark";
import ScrollReveal from "@/components/ui/ScrollReveal";
import siteData from "@/content/site.json";
import achievementsData from "@/content/achievements.json";
import subsystemsData from "@/content/subsystems.json";
import projectsData from "@/content/projects.json";
import timelineData from "@/content/timeline.json";
import { Milestone } from "@/lib/types";

const milestoneIcons: Record<string, React.ElementType> = {
  "2019": Flag,
  "2021": Zap,
  "2023": Award,
  "2025": Rocket,
};

export default function Hero() {
  const tagline = (siteData.tagline || "Flying Beyond Limits").toUpperCase().trim();
  const words = tagline.split(/\s+/).filter(Boolean);

  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineContainerRef,
    offset: ["start 75%", "end 80%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  const milestones: Milestone[] = timelineData;
  const startYear = milestones[0]?.year || "2019";
  const endYear = milestones[milestones.length - 1]?.year || "2025";

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
    <div id="home" className="relative flex flex-col">
      {/* 1. Hero Landing Deck */}
      <section className="relative min-h-[94vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden bg-radial-gradient">
        {/* Backdrop Watermark Layer */}
        <Watermark
          text={siteData.watermark || "Flying Limitless"}
          opacity={0.06}
          angle={-4}
        />

        {/* Ambient Aerospace Glow Orbs */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-orange/10 blur-[130px] rounded-full pointer-events-none z-0"
        />
        <div
          aria-hidden="true"
          className="absolute top-2/3 right-1/4 w-[400px] h-[250px] bg-brand-ion/10 blur-[120px] rounded-full pointer-events-none z-0"
        />

        {/* Main Hero Interactive Content */}
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

        {/* Animated Scroll Down Chevron Indicator */}
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

      {/* 2. Merged Vision & Mission (About) */}
      <section
        id="about"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-brand-slate/40 overflow-hidden bg-brand-navy"
      >
        <Watermark text="PIONEER • BUILD • INNOVATE" opacity={0.04} angle={3} />

        <div className="relative max-w-7xl mx-auto z-10">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Card 1: Vision Statement */}
            <ScrollReveal delay={0.2} direction="left" className="h-full">
              <div className="glass-panel glass-panel-hover rounded-2xl p-8 sm:p-10 h-full flex flex-col justify-between border border-brand-slate/90 relative overflow-hidden group">
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 w-36 h-36 bg-brand-orange/10 rounded-full blur-2xl group-hover:bg-brand-orange/20 transition-all duration-500 pointer-events-none"
                />

                <div>
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
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 w-36 h-36 bg-brand-ion/10 rounded-full blur-2xl group-hover:bg-brand-ion/20 transition-all duration-500 pointer-events-none"
                />

                <div>
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

      {/* 3. Merged Journey Timeline */}
      <section
        id="journey"
        ref={timelineContainerRef}
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-brand-slate/40 overflow-hidden bg-brand-navy"
      >
        <Watermark text={`FLIGHT LOG • ${startYear} - ${endYear}`} opacity={0.04} angle={-2} />

        <div className="relative max-w-6xl mx-auto z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
            <ScrollReveal delay={0.1} direction="down">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-slate/80 border border-brand-orange/30 text-brand-orange text-xs font-mono uppercase tracking-widest mb-4">
                <Calendar className="w-3.5 h-3.5" />
                <span>Chronological Flight Log</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} direction="up">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-light tracking-tight">
                Our Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">({startYear} – {endYear})</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3} direction="up">
              <p className="text-brand-muted mt-4 text-base sm:text-lg leading-relaxed font-sans">
                From foundational balsa-wood gliders to autonomous VTOL platforms and sounding rocketry, explore the defining milestones shaping Airnova.
              </p>
            </ScrollReveal>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute left-4 md:left-1/2 top-4 bottom-8 w-[2px] bg-brand-slate/80 -translate-x-1/2 rounded-full"
            />

            <motion.div
              style={{ scaleY }}
              aria-hidden="true"
              className="absolute left-4 md:left-1/2 top-4 bottom-8 w-[2px] bg-gradient-to-b from-brand-orange via-orange-400 to-amber-300 -translate-x-1/2 origin-top shadow-[0_0_12px_rgba(255,122,26,0.8)]"
            />

            <div className="space-y-12 sm:space-y-16">
              {milestones.map((milestone, index) => {
                const isEven = index % 2 === 0;
                const IconComponent = milestoneIcons[milestone.year] || Compass;

                return (
                  <div
                    key={milestone.year}
                    className={`relative flex flex-col md:flex-row items-start md:items-center ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center top-6 md:top-auto">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-navy border-2 border-brand-orange ring-4 ring-brand-navy shadow-orange-glow flex items-center justify-center text-brand-orange">
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>

                    <div
                      className={`w-full md:w-1/2 pl-12 ${
                        isEven ? "md:pl-0 md:pr-12" : "md:pl-12 md:pr-0"
                      }`}
                    >
                      <ScrollReveal delay={0.1} direction={isEven ? "left" : "right"}>
                        <div
                          className={`glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 border ${
                            milestone.highlight
                              ? "border-brand-orange/50 shadow-orange-glow"
                              : "border-brand-slate/90"
                          } relative overflow-hidden group`}
                        >
                          <div
                            className={`flex items-center gap-2 mb-2 ${
                              isEven ? "md:justify-end" : "justify-start"
                            }`}
                          >
                            <span className="text-2xl sm:text-3xl font-display font-black text-brand-orange">
                              {milestone.year}
                            </span>
                            {milestone.highlight && (
                              <span className="text-[10px] font-mono uppercase tracking-wider text-brand-orange px-2 py-0.5 rounded bg-brand-orange/10 border border-brand-orange/30">
                                KEY EPOCH
                              </span>
                            )}
                          </div>

                          <h3
                            className={`font-heading text-xl sm:text-2xl font-bold text-brand-light mb-3 ${
                              isEven ? "md:text-right" : "text-left"
                            }`}
                          >
                            {milestone.title}
                          </h3>

                          <p
                            className={`text-xs sm:text-sm text-brand-muted leading-relaxed mb-5 ${
                              isEven ? "md:text-right" : "text-left"
                            }`}
                          >
                            {milestone.summary}
                          </p>

                          <ul className="space-y-2 text-xs sm:text-sm text-brand-light/85 text-left">
                            {milestone.details.map((detail, dIdx) => (
                              <li
                                key={dIdx}
                                className={`flex items-start gap-2.5 ${
                                  isEven ? "md:flex-row-reverse md:text-right" : ""
                                }`}
                              >
                                <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </ScrollReveal>
                    </div>

                    <div className="hidden md:block md:w-1/2" aria-hidden="true" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
