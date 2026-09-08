"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  Wind, 
  Cpu, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  SlidersHorizontal,
  X,
  Layers,
  Activity,
  Maximize2
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Watermark from "@/components/ui/Watermark";
import projectsData from "@/content/projects.json";
import { Project } from "@/lib/types";

// Category badge styles mapping from Theme.md §7
const categoryBadgeStyles: Record<string, string> = {
  ion: "border-[#00D2FF]/40 text-[#00D2FF] bg-[#00D2FF]/10",
  orange: "border-[#FF7A1A]/40 text-[#FF7A1A] bg-[#FF7A1A]/10",
  muted: "border-[#8FA3C4]/40 text-[#8FA3C4] bg-[#8FA3C4]/10",
  purple: "border-purple-400/40 text-purple-300 bg-purple-500/10",
  emerald: "border-emerald-400/40 text-emerald-300 bg-emerald-500/10",
  amber: "border-amber-400/40 text-amber-300 bg-amber-500/10",
  pink: "border-pink-400/40 text-pink-300 bg-pink-500/10",
};

const filterTabs = [
  { id: "all", label: "All Vehicles (7)" },
  { id: "fixed-wing", label: "Fixed-Wing & VTOL" },
  { id: "propulsion", label: "Propulsion & Rocketry" },
  { id: "biomimetic", label: "Biomimetic Flight" },
  { id: "controls", label: "Autonomous & HCI" },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = projectsData as unknown as Project[];

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "all") return true;
    if (activeTab === "fixed-wing") {
      return project.id === "gliders" || project.id === "vtol" || project.id === "rc-planes";
    }
    if (activeTab === "propulsion") {
      return project.id === "rocketry";
    }
    if (activeTab === "biomimetic") {
      return project.id === "ornithopter" || project.id === "bionic-butterfly";
    }
    if (activeTab === "controls") {
      return project.id === "gesture-drone";
    }
    return true;
  });

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-brand-slate/40 overflow-hidden bg-brand-navy"
    >
      {/* Background Watermark */}
      <Watermark text="FLAGSHIP ENGINEERING • 7 BUILDS" opacity={0.04} angle={3} />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <ScrollReveal delay={0.1} direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-slate/80 border border-brand-orange/30 text-brand-orange text-xs font-mono uppercase tracking-widest mb-4">
              <Rocket className="w-3.5 h-3.5" />
              <span>2025 Engineering Fleet</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="up">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-light tracking-tight">
              7 Flagship <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">Vehicles</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3} direction="up">
            <p className="text-brand-muted mt-4 text-base sm:text-lg leading-relaxed font-sans mb-4">
              Explore our fleet spanning bio-mimetic flappers, dual-mode tilt-rotor VTOLs, sounding rockets, and gesture-controlled autonomous quadcopters.
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-orange hover:underline px-3 py-1.5 rounded-md bg-brand-orange/10 border border-brand-orange/30"
              >
                <span>View Dedicated Catalog Page (/projects)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Category Filter Tabs with Animated Pill */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-xl bg-brand-slate/80 border border-brand-border/60 gap-1 sm:gap-2">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                    isActive
                      ? "text-brand-light font-semibold"
                      : "text-brand-muted hover:text-brand-light hover:bg-brand-navy/50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectTab"
                      className="absolute inset-0 bg-brand-orange rounded-lg shadow-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Staggered Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const badgeStyle = categoryBadgeStyles[project.badgeVariant || "ion"];
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedProject(project)}
                  className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-brand-slate/90 cursor-pointer group relative overflow-hidden transition-all duration-300 hover:border-brand-orange/50 hover:shadow-orange-glow"
                >
                  {/* Ambient Glow Orb */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-12 -right-12 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl group-hover:bg-brand-orange/20 transition-all pointer-events-none"
                  />

                  <div>
                    {/* Category Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`text-[11px] font-mono px-3 py-1 rounded-full border ${badgeStyle}`}
                      >
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="text-[10px] font-mono uppercase text-brand-orange flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>FEATURED</span>
                        </span>
                      )}
                    </div>

                    {/* Vehicle Title */}
                    <h3 className="font-heading font-bold text-2xl text-brand-light mb-2.5 group-hover:text-brand-orange transition-colors">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-6 font-sans">
                      {project.description}
                    </p>

                    {/* Quick Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-6 p-3 rounded-lg bg-brand-navy/80 border border-brand-slate/70">
                      {Object.entries(project.specifications)
                        .slice(0, 2)
                        .map(([key, val]) => (
                          <div key={key} className="text-left">
                            <span className="text-[10px] font-mono text-brand-muted uppercase block">
                              {key}
                            </span>
                            <span className="text-xs font-mono font-semibold text-brand-light">
                              {val}
                            </span>
                          </div>
                        ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-slate text-brand-muted"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-brand-slate/70 flex items-center justify-between text-xs font-mono">
                    <span className="text-brand-orange font-medium flex items-center gap-1">
                      <span>Telemetry & Specs</span>
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                    <ChevronRight className="w-4 h-4 text-brand-muted group-hover:text-brand-orange group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Technical Specifications Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-panel rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-brand-orange/40 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close specifications modal"
              className="absolute top-5 right-5 p-2 rounded-lg bg-brand-slate text-brand-muted hover:text-brand-light hover:bg-brand-slate/80 border border-brand-border transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-4">
              <span
                className={`text-[11px] font-mono px-3 py-1 rounded-full border inline-block mb-2 ${
                  categoryBadgeStyles[selectedProject.badgeVariant || "ion"]
                }`}
              >
                {selectedProject.category}
              </span>
              <h3 className="font-heading text-3xl font-extrabold text-brand-light">
                {selectedProject.name}
              </h3>
            </div>

            <p className="text-sm text-brand-muted leading-relaxed mb-6 font-sans">
              {selectedProject.description}
            </p>

            {/* Full Specifications Matrix */}
            <div className="space-y-2 mb-6">
              <span className="text-xs font-mono text-brand-orange uppercase tracking-wider block">
                Full Technical Specifications Matrix
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-4 rounded-xl bg-brand-navy/90 border border-brand-slate">
                {Object.entries(selectedProject.specifications).map(([key, value]) => (
                  <div key={key} className="p-2 rounded bg-brand-slate/50">
                    <span className="text-[10px] font-mono text-brand-muted uppercase block">
                      {key}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-semibold text-brand-light">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2.5 py-1 rounded bg-brand-slate text-brand-orange border border-brand-orange/30"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-brand-slate flex items-center justify-between text-xs font-mono">
              <span className="text-brand-muted">Airframe Classification:</span>
              <span className="text-brand-orange font-bold">2025 COMPETITION FLEET</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
