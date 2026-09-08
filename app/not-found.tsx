import Link from "next/link";
import { Rocket, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-navy text-brand-light flex flex-col items-center justify-center px-4 bg-blueprint-grid">
      <div className="glass-panel max-w-md w-full rounded-2xl p-8 text-center border border-brand-orange/40 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-brand-navy border border-brand-orange/40 text-brand-orange mx-auto flex items-center justify-center mb-6 shadow-orange-glow">
          <Rocket className="w-8 h-8 rotate-45" />
        </div>
        <span className="text-xs font-mono text-brand-orange uppercase tracking-widest block mb-2">
          Telemetry Lost • Error 404
        </span>
        <h1 className="font-heading text-3xl font-bold text-brand-light mb-3">
          Airspace Coordinate Not Found
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted mb-6 leading-relaxed">
          The requested flight waypoint or sub-route does not exist in the squadron flight deck.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-mono font-semibold shadow-lg shadow-brand-orange/30 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Flight Deck</span>
        </Link>
      </div>
    </div>
  );
}
