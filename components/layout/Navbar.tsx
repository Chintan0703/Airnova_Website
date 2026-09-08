"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Rocket, ChevronRight } from "lucide-react";
import siteData from "@/content/site.json";
import { NavigationItem } from "@/lib/types";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string>("#home");
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section synchronization on the home page
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = [
      "home",
      "subsystems",
      "projects",
      "achievements",
      "gallery",
      "sponsors",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveAnchor(`#${entry.target.id}`);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems: NavigationItem[] = siteData.navigation;

  // Helper to format href depending on whether user is on home page or sub-page
  const getHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-navy/90 backdrop-blur-md border-b border-brand-slate/80 shadow-lg shadow-black/40 py-3"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href={pathname === "/" ? "#home" : "/"}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-md p-1"
            onClick={() => setActiveAnchor("#home")}
          >
            <div className="w-10 h-10 rounded-lg bg-brand-slate border border-brand-orange/40 flex items-center justify-center text-brand-orange group-hover:border-brand-orange group-hover:shadow-orange-glow transition-all duration-300 overflow-hidden">
              {siteData.logoImage && !logoError ? (
                <img
                  src={siteData.logoImage}
                  alt={siteData.name}
                  onError={() => setLogoError(true)}
                  className="w-full h-full object-contain p-1"
                />
              ) : (
                <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold tracking-wider text-xl text-brand-light group-hover:text-brand-orange transition-colors leading-tight">
                {siteData.name}
              </span>
              <span className="text-[9.5px] uppercase font-mono tracking-wider text-brand-orange font-bold -mt-0.5 group-hover:text-amber-400 transition-colors">
                DREAM৹BUILD৹FLY
              </span>
              <span className="text-[8px] uppercase font-mono tracking-widest text-brand-muted group-hover:text-brand-light/80 transition-colors">
                FLYING BEYOND LIMITS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const formattedHref = getHref(item.href);
              const isActive =
                pathname === "/" ? activeAnchor === item.href : pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={formattedHref}
                  onClick={() => {
                    if (pathname === "/") setActiveAnchor(item.href);
                  }}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                    isActive
                      ? "text-brand-orange bg-brand-slate/60 shadow-sm shadow-brand-orange/20 font-semibold"
                      : "text-brand-muted hover:text-brand-light hover:bg-brand-slate/40"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Primary CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={getHref(siteData.cta.primary.href)}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-brand-orange hover:bg-brand-orange-hover rounded-md shadow-lg shadow-brand-orange/25 hover:shadow-orange-glow transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-orange"
            >
              <span>{siteData.cta.primary.label}</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-brand-slate/80 border border-brand-border text-brand-light hover:text-brand-orange hover:border-brand-orange/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Slide-Down Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="lg:hidden bg-brand-navy/98 border-b border-brand-slate/90 backdrop-blur-xl transition-all duration-300 px-4 pt-3 pb-6 shadow-2xl animate-in fade-in slide-in-from-top-4"
        >
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const formattedHref = getHref(item.href);
              const isActive =
                pathname === "/" ? activeAnchor === item.href : pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={formattedHref}
                  onClick={() => {
                    if (pathname === "/") setActiveAnchor(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-brand-orange bg-brand-slate font-semibold"
                      : "text-brand-muted hover:text-brand-light hover:bg-brand-slate/50"
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-brand-slate">
              <Link
                href={getHref(siteData.cta.primary.href)}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-base font-semibold text-white bg-brand-orange hover:bg-brand-orange-hover rounded-lg shadow-lg shadow-brand-orange/30 transition-colors"
              >
                <span>{siteData.cta.primary.label}</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
