import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Subsystems from "@/components/sections/Subsystems";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Sponsorship from "@/components/sections/Sponsorship";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-navy text-brand-light flex flex-col relative overflow-hidden bg-blueprint-grid selection:bg-brand-orange selection:text-brand-navy">
      {/* 1. Sticky Navigation */}
      <Navbar />

      {/* 2. Main Flight Deck Content Flow */}
      <main className="flex-grow">
        {/* Hero Landing Deck with Merged Vision/Mission and Journey Timeline */}
        <Hero />

        {/* Leadership Command & 8-Wing Subsystems Grid */}
        <Subsystems />

        {/* Flagship Projects Showcase */}
        <Projects />

        {/* Achievements, KPI Counters & Lightbox / Gallery */}
        <Achievements />

        {/* Corporate Sponsorship & Alliances */}
        <Sponsorship />
      </main>

      {/* 3. Rich Aerospace Footer */}
      <Footer />
    </div>
  );
}
