"use client";

import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Award, Calendar, Layers } from "lucide-react";

export interface LightboxItem {
  id: string;
  title: string;
  event: string;
  year: string;
  rank?: string;
  category?: string;
  description: string;
  imagePlaceholder?: string;
}

interface LightboxProps {
  item: LightboxItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export default function Lightbox({
  item,
  onClose,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
}: LightboxProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && hasNext && onNext) onNext();
      if (e.key === "ArrowLeft" && hasPrev && onPrev) onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose, onNext, onPrev, hasNext, hasPrev]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="glass-panel rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-brand-orange/40 shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange uppercase">
              {item.rank || "FLIGHT RECORD"}
            </span>
            <span className="text-xs font-mono text-brand-muted">
              {item.year}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {hasPrev && onPrev && (
              <button
                onClick={onPrev}
                aria-label="Previous Record"
                className="p-1.5 rounded-lg bg-brand-slate text-brand-muted hover:text-brand-light hover:bg-brand-slate/80 border border-brand-border transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {hasNext && onNext && (
              <button
                onClick={onNext}
                aria-label="Next Record"
                className="p-1.5 rounded-lg bg-brand-slate text-brand-muted hover:text-brand-light hover:bg-brand-slate/80 border border-brand-border transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close Lightbox Modal"
              className="p-1.5 rounded-lg bg-brand-slate text-brand-muted hover:text-brand-light hover:bg-brand-slate/80 border border-brand-border transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Simulated Hangar Photo Display */}
        <div className="w-full h-56 sm:h-64 rounded-xl bg-brand-navy border border-brand-slate/80 mb-5 relative overflow-hidden flex items-center justify-center group">
          {item.imagePlaceholder && (item.imagePlaceholder.startsWith("/uploads/") || item.imagePlaceholder.startsWith("http")) ? (
            <img
              src={item.imagePlaceholder}
              alt={item.title}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-blueprint-grid opacity-30"
              />
              <div className="text-center z-10 p-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-slate/80 border border-brand-orange/40 text-brand-orange mx-auto flex items-center justify-center mb-3 shadow-orange-glow">
                  <Award className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-brand-light font-bold block">
                  {item.event}
                </span>
                <span className="text-[10px] font-mono text-brand-muted mt-1 block">
                  COMPETITION ARCHIVE VERIFIED • {item.year}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-light mb-2">
          {item.title}
        </h3>

        <p className="text-sm font-mono text-brand-orange mb-3">
          Category: {item.category || "Aerospace Engineering"}
        </p>

        <p className="text-sm text-brand-light/90 leading-relaxed font-sans mb-6">
          {item.description}
        </p>

        <div className="pt-4 border-t border-brand-slate/80 flex items-center justify-between text-xs font-mono text-brand-muted">
          <span>AIRNOVA COMPETITION LOG</span>
          <span className="text-brand-orange">OFFICIAL RECORD #AIR-{item.id.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}
