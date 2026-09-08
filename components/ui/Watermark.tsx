"use client";

import React from "react";
import siteData from "@/content/site.json";

interface WatermarkProps {
  text?: string;
  opacity?: number;
  className?: string;
  angle?: number;
  repeat?: boolean;
}

export default function Watermark({
  text = siteData.watermark,
  opacity = 0.05,
  className = "",
  angle = -5,
  repeat = false,
}: WatermarkProps) {
  // Ensure opacity stays within the safe WCAG 2.1 AA range of 4% to 8%
  const safeOpacity = Math.min(Math.max(opacity, 0.03), 0.08);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden z-0 ${className}`}
      style={{ opacity: safeOpacity }}
    >
      <div
        className="w-full text-center transition-transform duration-700 ease-out"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <span className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-[0.2em] whitespace-nowrap text-brand-muted block">
          {text}
        </span>
        {repeat && (
          <span className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.25em] whitespace-nowrap text-brand-muted block mt-6 opacity-60">
            {siteData.tagline}
          </span>
        )}
      </div>
    </div>
  );
}
