import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import VisionMission from "@/components/sections/VisionMission";
import Subsystems from "@/components/sections/Subsystems";
import Leadership from "@/components/sections/Leadership";
import Timeline from "@/components/sections/Timeline";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Sponsorship from "@/components/sections/Sponsorship";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-navy text-brand-light flex flex-col relative overflow-hidden bg-blueprint-grid selection:bg-brand-orange selection:text-brand-navy">
      {/* 1. Sticky Navigation (Developer A) */}
      <Navbar />

      {/* 2. Main Flight Deck Content Flow */}
      <main className="flex-grow">
        {/* Hero Landing Deck (Developer A + Developer C) */}
        <Hero />

        {/* Vision & Mission Split Cards (Developer B + Developer C) */}
        <VisionMission />

        {/* 8-Wing Subsystems Grid (Developer A + Developer C) */}
        <Subsystems />

        {/* Leadership & Captain Spotlight (Developer B) */}
        <Leadership />

        {/* Interactive Milestone Journey (Developer A + Developer C) */}
        <Timeline />

        {/* 7 Flagship Projects Showcase (Developer B + Developer C) */}
        <Projects />

        {/* Achievements, KPI Counters & Lightbox (Developer B + Developer C) */}
        <Achievements />

        {/* Corporate Sponsorship & Alliances (Developer B) */}
        <Sponsorship />
      </main>

      {/* 3. Rich Aerospace Footer (Developer B) */}
      <Footer />
    </div>
  );
}
