import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Projects from "@/components/sections/Projects";
import { ArrowLeft, Rocket, ChevronRight, Layers, Cpu, Sparkles } from "lucide-react";
import siteData from "@/content/site.json";

export const metadata: Metadata = {
  title: "Flagship Projects & Aerial Fleet",
  description:
    "Explore the 2025 engineering cohort of Airnova aircraft — fixed-wing gliders, tilt-rotor VTOLs, sounding rockets, gesture quadcopters, and biomimetic MAVs.",
};

import projectsData from "@/content/projects.json";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-brand-navy text-brand-light flex flex-col relative overflow-hidden bg-blueprint-grid selection:bg-brand-orange selection:text-brand-navy">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        {/* Sub-page Breadcrumb & Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-brand-muted mb-6">
            <Link href="/" className="hover:text-brand-orange transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-brand-slate" />
            <span className="text-brand-orange font-semibold">Flagship Fleet Catalog</span>
          </nav>

          <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-brand-orange/30 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy border border-brand-orange/40 text-brand-orange text-xs font-mono uppercase tracking-widest mb-4">
                <Rocket className="w-3.5 h-3.5" />
                <span>Flight Fleet Catalog</span>
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-black text-brand-light tracking-tight mb-4">
                {projectsData.length} Flagship <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">Engineering</span> Builds
              </h1>
              <p className="text-base text-brand-muted leading-relaxed font-sans">
                A comprehensive technical portfolio of Airnova&apos;s active unmanned aerial vehicles, tilt-rotor prototypes, bio-mimetic flappers, and solid-propellant sounding rockets.
              </p>
            </div>
          </div>
        </div>

        {/* Section Component with Full Interactive Filtering and Modals */}
        <Projects />
      </main>

      <Footer />
    </div>
  );
}
