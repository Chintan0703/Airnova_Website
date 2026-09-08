"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Calendar, Compass, CheckCircle2, ChevronRight, Award, Zap, Rocket, Flag } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Watermark from "@/components/ui/Watermark";
import timelineData from "@/content/timeline.json";
import { Milestone } from "@/lib/types";

const milestoneIcons: Record<string, React.ElementType> = {
  "2019": Flag,
  "2021": Zap,
  "2023": Award,
  "2025": Rocket,
};

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
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

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-brand-slate/40 overflow-hidden bg-brand-navy"
    >
      {/* Background Watermark */}
      <Watermark text={`FLIGHT LOG • ${startYear} - ${endYear}`} opacity={0.04} angle={-2} />

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section Header */}
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

        {/* Interactive Milestone Rail Container */}
        <div className="relative">
          {/* Base Vertical Rail Line */}
          <div
            aria-hidden="true"
            className="absolute left-4 md:left-1/2 top-4 bottom-8 w-[2px] bg-brand-slate/80 -translate-x-1/2 rounded-full"
          />

          {/* Scroll-Driven Dynamic Glowing Progress Line (Developer C) */}
          <motion.div
            style={{ scaleY }}
            aria-hidden="true"
            className="absolute left-4 md:left-1/2 top-4 bottom-8 w-[2px] bg-gradient-to-b from-brand-orange via-orange-400 to-amber-300 -translate-x-1/2 origin-top shadow-[0_0_12px_rgba(255,122,26,0.8)]"
          />

          {/* Milestone Cards Flow */}
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
                  {/* Central Node Marker with Glowing Ring */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center top-6 md:top-auto">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-navy border-2 border-brand-orange ring-4 ring-brand-navy shadow-orange-glow flex items-center justify-center text-brand-orange">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>

                  {/* Milestone Content Card */}
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

                  {/* Desktop Balancing Spacer for Opposite Side */}
                  <div className="hidden md:block md:w-1/2" aria-hidden="true" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
