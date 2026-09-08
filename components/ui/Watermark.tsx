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
  opacity = 0.04,
  className = "",
  angle = -5,
}: WatermarkProps) {
  // Ensure opacity stays within safe ambient texture range of 2% to 6%
  const safeOpacity = Math.min(Math.max(opacity, 0.02), 0.06);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden max-w-full z-0 ${className}`}
      style={{ opacity: safeOpacity }}
    >
      <div
        className="w-full text-center transition-transform duration-700 ease-out select-none flex items-center justify-center"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <span className="font-display text-[clamp(2.5rem,7.5vw,8.5rem)] font-black uppercase tracking-[0.18em] whitespace-nowrap text-brand-muted/70 block select-none blur-[1px] md:blur-[1.5px] leading-none pointer-events-none">
          {text}
        </span>
      </div>
    </div>
  );
}
