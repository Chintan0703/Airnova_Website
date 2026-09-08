"use client";

import React from "react";
import Link from "next/link";
import { 
  Rocket, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube, 
  Github,
  MessageSquare,
  Compass, 
  ExternalLink 
} from "lucide-react";
import siteData from "@/content/site.json";
import subsystemsData from "@/content/subsystems.json";

export default function Footer() {
  const [logoError, setLogoError] = React.useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: siteData.socials?.instagram },
    { icon: Linkedin, label: "LinkedIn", href: siteData.socials?.linkedin },
    { icon: Twitter, label: "Twitter / X", href: siteData.socials?.twitter },
    { icon: Youtube, label: "YouTube", href: siteData.socials?.youtube },
    { icon: Github, label: "GitHub", href: siteData.socials?.github },
    { icon: MessageSquare, label: "Discord", href: (siteData.socials as any)?.discord },
  ].filter((s) => s.href && s.href.trim() !== "" && s.href !== "#");

  return (
    <footer className="bg-brand-navy border-t border-brand-slate relative overflow-hidden text-brand-muted z-10">
      {/* Decorative Blueprint Top Border Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-orange/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Column 1: Brand & Identity (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="#home"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-md inline-flex"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-slate border border-brand-orange/40 flex items-center justify-center text-brand-orange group-hover:border-brand-orange group-hover:shadow-orange-glow transition-all overflow-hidden">
                {siteData.logoImage && !logoError ? (
                  <img
                    src={siteData.logoImage}
                    alt={siteData.name}
                    onError={() => setLogoError(true)}
                    className="w-full h-full object-contain p-1"
                  />
                ) : (
                  <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold tracking-wider text-xl text-brand-light">
                  {siteData.name}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-orange">
                  Drone & Aerospace Committee
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-brand-muted max-w-sm font-sans">
              {siteData.shortDescription}
            </p>

            <div className="pt-2">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-light block mb-3">
                Squadron Channels
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-9 h-9 rounded-lg bg-brand-slate/80 border border-brand-border text-brand-muted hover:text-brand-orange hover:border-brand-orange/50 hover:bg-brand-slate flex items-center justify-center transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Flight Anchors */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm text-brand-light uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {siteData.navigation.slice(0, 5).map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-brand-orange hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Engineering Subsystems */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm text-brand-light uppercase tracking-wider">
              Subsystems (8)
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              {subsystemsData.slice(0, 5).map((sub) => (
                <li key={sub.id}>
                  <Link
                    href="#subsystems"
                    className="hover:text-brand-orange hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#subsystems"
                  className="text-brand-orange hover:underline inline-flex items-center gap-1 mt-1"
                >
                  <span>+ View All 8 Wings</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Flight Hangar & Contact */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm text-brand-light uppercase tracking-wider">
              Hangar Base
            </h3>
            <div className="space-y-2.5 text-xs text-brand-muted">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <p className="text-brand-light font-medium">{siteData.location.address}</p>
                  <p>{siteData.location.campus}</p>
                  <p>{siteData.location.city}</p>
                  <p className="font-mono text-[10px] text-brand-orange mt-1">
                    {siteData.location.coordinates}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <a
                  href={`mailto:${siteData.contact.email}`}
                  className="hover:text-brand-orange transition-colors"
                >
                  {siteData.contact.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="font-mono">{siteData.contact.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-slate/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {siteData.name} — Drone & Aerospace Committee. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px] text-brand-muted hidden sm:inline">
              Motto: &ldquo;{siteData.tagline}&rdquo;
            </span>

            <Link
              href="/admin"
              className="text-brand-muted hover:text-brand-orange text-[11px] font-mono transition-colors"
            >
              [Admin Flight Deck]
            </Link>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-brand-slate/80 border border-brand-border text-brand-light hover:text-brand-orange hover:border-brand-orange/50 transition-all font-mono text-[11px]"
              aria-label="Scroll back to top of page"
            >
              <span>TOP OF DECK</span>
              <ArrowUp className="w-3.5 h-3.5 text-brand-orange" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
