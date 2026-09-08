"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Watermark from "@/components/ui/Watermark";
import { 
  ArrowLeft, 
  Trophy, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  Sparkles, 
  Maximize2, 
  CheckCircle2, 
  Calendar,
  X,
  Target,
  ExternalLink
} from "lucide-react";
import achievementsData from "@/content/achievements.json";
import { Achievement } from "@/lib/types";

export default function AchievementDetailPage() {
  const params = useParams();
  const achievementId = params?.id as string;

  const records = achievementsData.records as Achievement[];
  const currentIndex = records.findIndex((r) => r.id === achievementId);
  const record = currentIndex !== -1 ? records[currentIndex] : null;

  // Multi-image collection
  const allImages: string[] = [];
  if (record) {
    if (record.imagePlaceholder && !record.imagePlaceholder.includes("/images/achievements/")) {
      allImages.push(record.imagePlaceholder);
    }
    if (record.images && Array.isArray(record.images)) {
      record.images.forEach((img) => {
        if (img && !allImages.includes(img)) allImages.push(img);
      });
    }
  }

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  if (!record) {
    return (
      <div className="min-h-screen bg-brand-navy text-brand-light flex flex-col relative overflow-hidden bg-blueprint-grid">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4 pt-32 pb-16">
          <div className="glass-panel max-w-lg w-full rounded-3xl p-8 sm:p-12 text-center border border-brand-orange/40 shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-slate border border-brand-orange text-brand-orange mx-auto flex items-center justify-center shadow-orange-glow">
              <Trophy className="w-8 h-8" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-light">
              Competition Record Not Found
            </h1>
            <p className="text-sm text-brand-muted font-sans">
              The requested competition victory identifier ({achievementId}) could not be located in our records.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/achievements"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-mono font-bold transition-all shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Achievements Archive</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const prevRecord = currentIndex > 0 ? records[currentIndex - 1] : null;
  const nextRecord = currentIndex < records.length - 1 ? records[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-brand-navy text-brand-light flex flex-col relative overflow-hidden bg-blueprint-grid selection:bg-brand-orange selection:text-brand-navy">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-brand-muted mb-8">
            <Link href="/" className="hover:text-brand-orange transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-brand-slate" />
            <Link href="/achievements" className="hover:text-brand-orange transition-colors">
              Achievements
            </Link>
            <ChevronRight className="w-3 h-3 text-brand-slate" />
            <span className="text-brand-orange font-semibold truncate max-w-[200px] sm:max-w-none">
              {record.title}
            </span>
          </nav>

          {/* Achievement Hero Header Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-slate/90 shadow-2xl relative overflow-hidden mb-12">
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 w-96 h-96 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none"
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono px-3.5 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/40 text-brand-orange font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{record.rank}</span>
                  </span>
                  <span className="text-xs font-mono text-brand-ion px-3 py-1 rounded-full bg-brand-ion/10 border border-brand-ion/30 font-semibold">
                    {record.category}
                  </span>
                  <span className="text-xs font-mono text-brand-muted px-2.5 py-1 rounded bg-brand-navy border border-brand-slate">
                    Year: {record.year}
                  </span>
                </div>

                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-brand-light tracking-tight">
                  {record.title}
                </h1>

                <p className="text-sm font-mono text-brand-orange">
                  Host Challenge / Symposium: {record.event}
                </p>

                <p className="text-base sm:text-lg text-brand-muted leading-relaxed font-sans font-normal">
                  {record.description}
                </p>
              </div>

              {/* Victory Stats Overview Card */}
              <div className="p-5 rounded-2xl bg-brand-navy/90 border border-brand-slate shrink-0 lg:w-72 text-left space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-brand-slate/70 pb-2.5">
                  <span className="text-[11px] font-mono text-brand-muted uppercase">Laurel Status</span>
                  <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>OFFICIAL PODIUM</span>
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-brand-slate/70 pb-2.5">
                  <span className="text-[11px] font-mono text-brand-muted uppercase">Season Year</span>
                  <span className="text-xs font-mono text-brand-light font-bold">{record.year}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-brand-muted uppercase">Trophy Photos</span>
                  <span className="text-xs font-mono text-brand-orange font-bold">
                    {allImages.length > 0 ? `${allImages.length} Logged Photos` : "Archival Entry"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* TWO-COLUMN CONTENT GRID: Left (Trophy Photo Gallery) | Right (Detailed Story & Mission Highlights) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-16">
            {/* Left Column: Photo Gallery (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-brand-slate/90 shadow-2xl space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-light flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-brand-orange" />
                    <span>Victory Trophy & Flight Photos</span>
                  </h2>
                  {allImages.length > 0 && (
                    <span className="text-xs font-mono text-brand-muted">
                      Photo {activeImageIndex + 1} of {allImages.length}
                    </span>
                  )}
                </div>

                {allImages.length > 0 ? (
                  <div className="space-y-4">
                    <div
                      className="relative w-full h-80 sm:h-[400px] rounded-2xl overflow-hidden bg-brand-navy border border-brand-slate cursor-pointer group"
                      onClick={() => setLightboxOpen(true)}
                    >
                      <img
                        src={allImages[activeImageIndex]}
                        alt={`${record.title} Photo ${activeImageIndex + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                        <span className="text-xs font-mono text-white flex items-center gap-1.5">
                          <Maximize2 className="w-4 h-4 text-brand-orange" />
                          <span>Click to view full photo</span>
                        </span>
                      </div>
                    </div>

                    {/* Thumbnail Selector Bar */}
                    {allImages.length > 1 && (
                      <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                        {allImages.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveImageIndex(idx)}
                            className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                              activeImageIndex === idx
                                ? "border-brand-orange shadow-orange-glow scale-105"
                                : "border-brand-slate/80 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-64 sm:h-72 rounded-2xl bg-brand-navy border border-brand-slate flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-brand-slate border border-brand-orange/40 text-brand-orange flex items-center justify-center shadow-orange-glow">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <p className="text-sm text-brand-muted font-sans max-w-sm">
                      Official victory photography is recorded in our offline aerospace archives.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Mission Story & Technical Highlights (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-brand-slate/90 shadow-2xl space-y-6">
                <div className="border-b border-brand-slate pb-4">
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-light flex items-center gap-2">
                    <Target className="w-5 h-5 text-brand-orange" />
                    <span>Competition Challenge & Mission Recap</span>
                  </h2>
                  <p className="text-xs text-brand-muted mt-1 font-mono uppercase">
                    TECHNICAL SCORECARD & EXECUTION
                  </p>
                </div>

                <div className="space-y-4 text-sm text-brand-light/90 leading-relaxed font-sans">
                  {record.fullStory ? (
                    <p className="whitespace-pre-line">{record.fullStory}</p>
                  ) : (
                    <p>{record.description}</p>
                  )}
                </div>

                {/* Key Details Bullet Points if provided */}
                {record.details && record.details.length > 0 && (
                  <div className="pt-4 border-t border-brand-slate space-y-3">
                    <span className="text-xs font-mono text-brand-orange uppercase font-bold block">
                      Key Technical Benchmarks
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-brand-light/90">
                      {record.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="pt-8 border-t border-brand-slate/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevRecord ? (
              <Link
                href={`/achievements/${prevRecord.id}`}
                className="w-full sm:w-auto inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-slate/80 hover:bg-brand-slate border border-brand-border text-xs font-mono text-brand-light hover:text-brand-orange transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-brand-orange" />
                <span>Prev: {prevRecord.title}</span>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}

            <Link
              href="/achievements"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-mono font-bold shadow-lg shadow-brand-orange/30 hover:shadow-orange-glow transition-all"
            >
              <Award className="w-4 h-4" />
              <span>Explore All {records.length} Podiums & Records</span>
            </Link>

            {nextRecord ? (
              <Link
                href={`/achievements/${nextRecord.id}`}
                className="w-full sm:w-auto inline-flex items-center justify-end gap-2 px-5 py-3 rounded-xl bg-brand-slate/80 hover:bg-brand-slate border border-brand-border text-xs font-mono text-brand-light hover:text-brand-orange transition-colors"
              >
                <span>Next: {nextRecord.title}</span>
                <ChevronRight className="w-4 h-4 text-brand-orange" />
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxOpen && allImages.length > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close Lightbox"
            className="absolute top-6 right-6 p-3 rounded-full bg-brand-slate/80 text-brand-light hover:text-brand-orange border border-brand-border transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={allImages[activeImageIndex]}
              alt={`${record.title} Full View`}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-brand-orange/30 shadow-2xl"
            />
            <div className="mt-4 flex items-center justify-center gap-4">
              {allImages.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))
                    }
                    className="p-2 rounded-lg bg-brand-slate text-brand-light hover:text-brand-orange border border-brand-border"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-mono text-brand-muted">
                    {activeImageIndex + 1} / {allImages.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))
                    }
                    className="p-2 rounded-lg bg-brand-slate text-brand-light hover:text-brand-orange border border-brand-border"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
