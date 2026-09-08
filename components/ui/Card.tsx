import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowVariant?: "orange" | "ion" | "subtle" | "none";
  hoverLift?: boolean;
}

export default function Card({
  children,
  className = "",
  glowVariant = "orange",
  hoverLift = true,
  ...props
}: CardProps) {
  const getGlowStyles = () => {
    switch (glowVariant) {
      case "orange":
        return "hover:border-brand-orange/60 hover:shadow-orange-glow";
      case "ion":
        return "hover:border-brand-ion/60 hover:shadow-ion-glow";
      case "subtle":
        return "hover:border-brand-border hover:shadow-md";
      case "none":
        return "";
      default:
        return "hover:border-brand-orange/60 hover:shadow-orange-glow";
    }
  };

  return (
    <div
      className={cn(
        "glass-panel rounded-2xl p-6 sm:p-8 border border-brand-slate/90 transition-all duration-300 relative overflow-hidden",
        hoverLift && "hover:-translate-y-1.5",
        getGlowStyles(),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
