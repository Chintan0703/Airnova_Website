"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  Unlock,
  Save,
  Rocket,
  Globe,
  UserCheck,
  Layers,
  Plane,
  Trophy,
  Calendar,
  Handshake,
  Image as ImageIcon,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Download,
  UploadCloud,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  RefreshCw,
  LogOut,
  Sliders,
  Sparkles,
  Eye,
  Share2,
  Link2,
  Linkedin,
  Instagram,
  Twitter,
  Youtube,
  Github,
  Mail,
  Phone,
  MessageSquare
} from "lucide-react";

export default function AdminDashboard() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  // Navigation tab
  const [activeTab, setActiveTab] = useState<string>("site");

  // Content state loaded from server
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // Upload manager state
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [activeUploadTarget, setActiveUploadTarget] = useState<string | null>(null);

  // Check existing session on mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("airnova_admin_auth");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
      fetchContentData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "airnova2025" || passcode.trim() === "airnova") {
      setIsAuthenticated(true);
      sessionStorage.setItem("airnova_admin_auth", "true");
      setAuthError("");
      fetchContentData();
    } else {
      setAuthError("Invalid access passcode. Please check committee credentials.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("airnova_admin_auth");
    setIsAuthenticated(false);
    setPasscode("");
  };

  const fetchContentData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/content");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        setSaveError(json.error || "Failed to load content from server");
      }
    } catch (err: any) {
      setSaveError(err.message || "Failed to connect to API");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    setSaveSuccess(null);
    setSaveError(null);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: data }),
      });

      const result = await res.json();
      if (result.success) {
        setSaveSuccess("All changes persisted successfully to content stores!");
        setHasUnsavedChanges(false);
        setTimeout(() => setSaveSuccess(null), 4000);
      } else {
        setSaveError(result.error || "Failed to save changes");
      }
    } catch (err: any) {
      setSaveError(err.message || "Failed to transmit update payload");
    } finally {
      setIsSaving(false);
    }
  };

  const uploadFileDirectly = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success) return json.url;
      alert(json.error || "Upload failed");
    } catch (err: any) {
      alert("Error uploading file: " + err.message);
    }
    return null;
  };

  const handleImageUploadGeneric = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadedUrl(null);
    const url = await uploadFileDirectly(file);
    if (url) {
      setUploadedUrl(url);
    }
    setIsUploading(false);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `airnova_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // State helper updater
  const updateNestedState = (section: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setHasUnsavedChanges(true);
  };

  const updateSubsystem = (index: number, field: string, value: any) => {
    const updated = [...data.subsystems];
    updated[index] = { ...updated[index], [field]: value };
    setData((prev: any) => ({ ...prev, subsystems: updated }));
    setHasUnsavedChanges(true);
  };

  const addSubsystem = () => {
    const newWing = {
      id: `wing_${Date.now()}`,
      name: "New Subsystem Wing",
      icon: "Wing",
      description: "Enter engineering description of this wing...",
      focusAreas: ["Focus Area 1", "Focus Area 2"],
      leadName: "Subsystem Head Name",
      leadRole: "Division Lead",
      heads: [
        {
          name: "Subsystem Head Name",
          role: "Division Lead",
        },
      ],
    };
    setData((prev: any) => ({ ...prev, subsystems: [...prev.subsystems, newWing] }));
    setHasUnsavedChanges(true);
  };

  const removeSubsystem = (index: number) => {
    const updated = data.subsystems.filter((_: any, i: number) => i !== index);
    setData((prev: any) => ({ ...prev, subsystems: updated }));
    setHasUnsavedChanges(true);
  };

  const moveSubsystem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= (data.subsystems || []).length) return;
    const updated = [...data.subsystems];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setData((prev: any) => ({ ...prev, subsystems: updated }));
    setHasUnsavedChanges(true);
  };

  const addSubsystemHead = (subIndex: number) => {
    const updated = [...data.subsystems];
    const currentHeads =
      updated[subIndex].heads ||
      (updated[subIndex].leadName
        ? [{ name: updated[subIndex].leadName, role: updated[subIndex].leadRole || "Lead" }]
        : []);
    const newHeads = [...currentHeads, { name: "New Subsystem Head", role: "Division Co-Lead" }];
    updated[subIndex] = {
      ...updated[subIndex],
      heads: newHeads,
      leadName: newHeads.map((h: any) => h.name).filter(Boolean).join(" & "),
    };
    setData((prev: any) => ({ ...prev, subsystems: updated }));
    setHasUnsavedChanges(true);
  };

  const updateSubsystemHead = (
    subIndex: number,
    headIndex: number,
    field: "name" | "role",
    value: string
  ) => {
    const updated = [...data.subsystems];
    const currentHeads = [
      ...(updated[subIndex].heads ||
        (updated[subIndex].leadName
          ? [{ name: updated[subIndex].leadName, role: updated[subIndex].leadRole || "Lead" }]
          : [{ name: "", role: "" }])),
    ];
    currentHeads[headIndex] = { ...currentHeads[headIndex], [field]: value };
    updated[subIndex] = {
      ...updated[subIndex],
      heads: currentHeads,
      leadName: currentHeads.map((h: any) => h.name).filter(Boolean).join(" & "),
    };
    setData((prev: any) => ({ ...prev, subsystems: updated }));
    setHasUnsavedChanges(true);
  };

  const removeSubsystemHead = (subIndex: number, headIndex: number) => {
    const updated = [...data.subsystems];
    const currentHeads = (updated[subIndex].heads || []).filter(
      (_: any, i: number) => i !== headIndex
    );
    updated[subIndex] = {
      ...updated[subIndex],
      heads: currentHeads,
      leadName: currentHeads.map((h: any) => h.name).filter(Boolean).join(" & "),
    };
    setData((prev: any) => ({ ...prev, subsystems: updated }));
    setHasUnsavedChanges(true);
  };

  const moveProject = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= (data.projects || []).length) return;
    const updated = [...data.projects];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setData((prev: any) => ({ ...prev, projects: updated }));
    setHasUnsavedChanges(true);
  };

  const moveAchievementRecord = (fromIndex: number, toIndex: number) => {
    const list = data.achievements?.records || [];
    if (toIndex < 0 || toIndex >= list.length) return;
    const updated = [...list];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setData((prev: any) => ({
      ...prev,
      achievements: { ...prev.achievements, records: updated },
    }));
    setHasUnsavedChanges(true);
  };

  const moveSponsorCompany = (fromIndex: number, toIndex: number) => {
    const list = data.sponsors?.companies || [];
    if (toIndex < 0 || toIndex >= list.length) return;
    const updated = [...list];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setData((prev: any) => ({
      ...prev,
      sponsors: { ...prev.sponsors, companies: updated },
    }));
    setHasUnsavedChanges(true);
  };

  const updateProject = (index: number, field: string, value: any) => {
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [field]: value };
    setData((prev: any) => ({ ...prev, projects: updated }));
    setHasUnsavedChanges(true);
  };

  const addProject = () => {
    const newProj = {
      id: `proj_${Date.now()}`,
      name: "New Aircraft Build",
      category: "Fixed-wing / Aerodynamics",
      badgeVariant: "orange",
      description: "Technical build description...",
      fullOverview: "Detailed aeronautical architecture, propulsion analysis, and flight testing notes for the dedicated vehicle page...",
      specifications: {
        "Wingspan": "1200 mm",
        "Cruise Speed": "60 km/h",
      },
      tags: ["Aerodynamics", "2025 Fleet"],
      imagePlaceholder: "",
      images: [],
      flightLogs: ["Flight Readiness Certified", "Maiden Autonomous Waypoint Mission Passed"],
      featured: false,
    };
    setData((prev: any) => ({ ...prev, projects: [...prev.projects, newProj] }));
    setHasUnsavedChanges(true);
  };

  const removeProject = (index: number) => {
    const updated = data.projects.filter((_: any, i: number) => i !== index);
    setData((prev: any) => ({ ...prev, projects: updated }));
    setHasUnsavedChanges(true);
  };

  const addProjectImage = (pIdx: number, url: string) => {
    if (!url) return;
    const updated = [...data.projects];
    const currentImages = updated[pIdx].images || [];
    updated[pIdx] = { ...updated[pIdx], images: [...currentImages, url] };
    setData((prev: any) => ({ ...prev, projects: updated }));
    setHasUnsavedChanges(true);
  };

  const removeProjectImage = (pIdx: number, imgIdx: number) => {
    const updated = [...data.projects];
    const currentImages = updated[pIdx].images || [];
    updated[pIdx] = {
      ...updated[pIdx],
      images: currentImages.filter((_: any, i: number) => i !== imgIdx),
    };
    setData((prev: any) => ({ ...prev, projects: updated }));
    setHasUnsavedChanges(true);
  };

  const updateAchievementRecord = (index: number, field: string, value: any) => {
    const updated = [...(data.achievements?.records || [])];
    updated[index] = { ...updated[index], [field]: value };
    setData((prev: any) => ({
      ...prev,
      achievements: { ...prev.achievements, records: updated },
    }));
    setHasUnsavedChanges(true);
  };

  const addAchievementRecord = () => {
    const newRecord = {
      id: `record_${Date.now()}`,
      title: "New Competition Victory",
      event: "National Aeronautics / UAV Challenge",
      year: new Date().getFullYear().toString(),
      rank: "1st Place — Gold Trophy",
      category: "Autonomous UAV Systems",
      description: "Official description of the flight mission, competition challenge, and technical laurels achieved.",
      fullStory: "Comprehensive competition recap, technical hurdles overcome during flight rounds, and judges' commendations...",
      imagePlaceholder: "",
      images: [],
      details: ["Achieved 99.4% autonomous waypoint accuracy", "Fastest course completion time among 45 collegiate teams"],
    };
    setData((prev: any) => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        records: [...(prev.achievements?.records || []), newRecord],
      },
    }));
    setHasUnsavedChanges(true);
  };

  const removeAchievementRecord = (index: number) => {
    const updated = (data.achievements?.records || []).filter((_: any, i: number) => i !== index);
    setData((prev: any) => ({
      ...prev,
      achievements: { ...prev.achievements, records: updated },
    }));
    setHasUnsavedChanges(true);
  };

  const addAchievementImage = (aIdx: number, url: string) => {
    if (!url) return;
    const updated = [...(data.achievements?.records || [])];
    const currentImages = updated[aIdx].images || [];
    updated[aIdx] = { ...updated[aIdx], images: [...currentImages, url] };
    setData((prev: any) => ({
      ...prev,
      achievements: { ...prev.achievements, records: updated },
    }));
    setHasUnsavedChanges(true);
  };

  const removeAchievementImage = (aIdx: number, imgIdx: number) => {
    const updated = [...(data.achievements?.records || [])];
    const currentImages = updated[aIdx].images || [];
    updated[aIdx] = {
      ...updated[aIdx],
      images: currentImages.filter((_: any, i: number) => i !== imgIdx),
    };
    setData((prev: any) => ({
      ...prev,
      achievements: { ...prev.achievements, records: updated },
    }));
    setHasUnsavedChanges(true);
  };

  const updateSponsorCompany = (index: number, field: string, value: any) => {
    const updated = [...(data.sponsors?.companies || [])];
    updated[index] = { ...updated[index], [field]: value };
    setData((prev: any) => ({
      ...prev,
      sponsors: { ...prev.sponsors, companies: updated },
    }));
    setHasUnsavedChanges(true);
  };

  const addSponsorCompany = () => {
    const newCompany = {
      id: `company_${Date.now()}`,
      name: "New Partner Corporation",
      description: "Brief technical description of company engineering capabilities or hardware contributions...",
      logoPlaceholder: "",
      websiteUrl: "https://example.com",
    };
    setData((prev: any) => ({
      ...prev,
      sponsors: {
        ...prev.sponsors,
        companies: [...(prev.sponsors?.companies || []), newCompany],
      },
    }));
    setHasUnsavedChanges(true);
  };

  const removeSponsorCompany = (index: number) => {
    const updated = (data.sponsors?.companies || []).filter((_: any, i: number) => i !== index);
    setData((prev: any) => ({
      ...prev,
      sponsors: { ...prev.sponsors, companies: updated },
    }));
    setHasUnsavedChanges(true);
  };

  const updateMilestone = (index: number, field: string, value: any) => {
    const updated = [...data.timeline];
    updated[index] = { ...updated[index], [field]: value };
    setData((prev: any) => ({ ...prev, timeline: updated }));
    setHasUnsavedChanges(true);
  };

  const addMilestone = () => {
    const newMilestone = {
      year: new Date().getFullYear().toString(),
      title: "New Epoch & Milestone",
      summary: "Summary of technological achievements and missions...",
      details: ["Key engineering highlight 1", "Key flight milestone 2"],
      highlight: false,
    };
    setData((prev: any) => ({
      ...prev,
      timeline: [...(prev.timeline || []), newMilestone],
    }));
    setHasUnsavedChanges(true);
  };

  const removeMilestone = (index: number) => {
    const updated = data.timeline.filter((_: any, i: number) => i !== index);
    setData((prev: any) => ({ ...prev, timeline: updated }));
    setHasUnsavedChanges(true);
  };

  // 1. Passcode Barrier View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-navy text-brand-light flex items-center justify-center p-4 bg-blueprint-grid">
        <div className="glass-panel max-w-md w-full rounded-3xl p-8 sm:p-10 border border-brand-orange/40 shadow-2xl relative text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-slate border border-brand-orange text-brand-orange mx-auto flex items-center justify-center mb-6 shadow-orange-glow">
            <Lock className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono text-brand-orange uppercase tracking-widest block mb-1">
            Restricted Clearance Area
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-light mb-3">
            Admin Flight Deck
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mb-8">
            Enter the authorized committee passcode to access the central content management controls.
          </p>

          {authError && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 font-mono text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Admin Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-brand-navy border border-brand-slate focus:border-brand-orange focus:ring-1 focus:ring-brand-orange text-sm text-brand-light placeholder:text-brand-muted/50 focus:outline-none transition-all font-mono text-center"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold shadow-lg shadow-brand-orange/30 hover:shadow-orange-glow transition-all"
            >
              <Unlock className="w-4 h-4" />
              <span>Authenticate & Access Deck</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-brand-slate/70">
            <Link
              href="/"
              className="text-xs font-mono text-brand-muted hover:text-brand-orange transition-colors inline-flex items-center gap-1"
            >
              <span>← Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Loading State
  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-brand-navy text-brand-light flex items-center justify-center p-4 bg-blueprint-grid">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-brand-orange border-t-transparent animate-spin mx-auto" />
          <p className="font-mono text-xs text-brand-muted uppercase tracking-widest">
            Syncing Flight Deck Content Stores...
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "site", label: "Site & Branding", icon: Globe },
    { id: "links", label: "Links & Social Hub", icon: Share2 },
    { id: "captain", label: "Captain & Leadership", icon: UserCheck },
    { id: "subsystems", label: "8 Subsystems Wings", icon: Layers },
    { id: "projects", label: "Flagship Fleet (7)", icon: Plane },
    { id: "achievements", label: "Achievements & Records", icon: Trophy },
    { id: "timeline", label: "Journey Timeline", icon: Calendar },
    { id: "sponsors", label: "Partner Companies", icon: Handshake },
    { id: "media", label: "Media & Image Uploader", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-brand-navy text-brand-light flex flex-col bg-blueprint-grid">
      {/* Top Cockpit Command Bar */}
      <header className="sticky top-0 z-40 bg-brand-navy/95 border-b border-brand-slate backdrop-blur-md px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-slate border border-brand-orange/40 text-brand-orange flex items-center justify-center shadow-orange-glow">
            <Rocket className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-brand-light">
                AIRNOVA FLIGHT DECK
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-orange/15 text-brand-orange border border-brand-orange/30">
                CMS CONTROL
              </span>
            </div>
            <p className="text-[10px] font-mono text-brand-muted -mt-0.5">
              LIVE PERSISTENCE • REAL-TIME CONFIGURATION
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {hasUnsavedChanges && (
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2.5 py-1 rounded-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Unsaved Changes
            </span>
          )}

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-slate hover:bg-brand-slate/80 text-xs font-mono text-brand-light border border-brand-border transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-brand-orange" />
          </Link>

          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-xs font-mono font-bold text-white shadow-lg shadow-brand-orange/30 transition-all disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>SAVING...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>SAVE CHANGES</span>
              </>
            )}
          </button>

          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 rounded-lg bg-brand-slate/80 text-brand-muted hover:text-red-400 border border-brand-border transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Floating Alerts */}
      {saveSuccess && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-mono flex items-center gap-3 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {saveError && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs sm:text-sm font-mono flex items-center gap-3 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Main Body with Sidebar and Edit Forms */}
      <div className="flex-grow flex flex-col lg:flex-row max-w-7xl mx-auto w-full p-4 sm:p-6 gap-6">
        {/* Sidebar Tabs */}
        <aside className="lg:w-64 shrink-0 space-y-1">
          <div className="p-2.5 rounded-xl glass-panel border border-brand-slate mb-4">
            <span className="text-[10px] font-mono text-brand-orange uppercase tracking-widest block mb-2 px-2">
              Control Stations
            </span>
            <div className="space-y-1">
              {tabs.map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-mono text-left transition-all ${
                      isActive
                        ? "bg-brand-orange text-white font-bold shadow-md shadow-brand-orange/20"
                        : "text-brand-muted hover:text-brand-light hover:bg-brand-slate/60"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-3 rounded-xl glass-panel border border-brand-slate space-y-2 text-xs font-mono">
            <button
              onClick={handleExportJSON}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-brand-slate hover:bg-brand-slate/80 text-brand-light border border-brand-border transition-colors"
            >
              <span>Backup Data JSON</span>
              <Download className="w-3.5 h-3.5 text-brand-orange" />
            </button>
          </div>
        </aside>

        {/* Dynamic Editor Panel */}
        <main className="flex-grow glass-panel rounded-2xl p-6 sm:p-8 border border-brand-slate/90 shadow-2xl overflow-hidden">
          {/* TAB 1: SITE & BRANDING */}
          {activeTab === "site" && data.site && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-light flex items-center gap-2">
                  <Globe className="w-5 h-5 text-brand-orange" />
                  <span>Site Identity, Logo & Contact Coordinates</span>
                </h2>
                <p className="text-xs text-brand-muted mt-1 font-sans">
                  Edit foundational branding strings, custom logo image, hero taglines, watermark text, and mission statements.
                </p>
              </div>

              {/* Logo Manager & Preview */}
              <div className="p-4 rounded-xl bg-brand-navy/80 border border-brand-slate space-y-3">
                <span className="text-xs font-mono text-brand-orange uppercase font-bold block">
                  Website Emblem / Logo Image
                </span>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-brand-slate border border-brand-orange/40 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
                    {data.site.logoImage ? (
                      <img
                        src={data.site.logoImage}
                        alt="Logo Preview"
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <Rocket className="w-8 h-8 text-brand-orange" />
                    )}
                  </div>
                  <div className="flex-grow space-y-2 w-full">
                    <input
                      type="text"
                      placeholder="Logo Image URL (e.g. /uploads/logo.png)"
                      value={data.site.logoImage || ""}
                      onChange={(e) => updateNestedState("site", "logoImage", e.target.value)}
                      className="w-full px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light font-mono"
                    />
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-brand-orange/15 hover:bg-brand-orange text-brand-orange hover:text-white text-xs font-mono cursor-pointer border border-brand-orange/30 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload New Logo File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const url = await uploadFileDirectly(file);
                          if (url) updateNestedState("site", "logoImage", url);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase mb-1">
                    Committee Brand Name
                  </label>
                  <input
                    type="text"
                    value={data.site.name || ""}
                    onChange={(e) => updateNestedState("site", "name", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-brand-navy border border-brand-slate text-sm text-brand-light focus:border-brand-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase mb-1">
                    Established Year
                  </label>
                  <input
                    type="number"
                    value={data.site.establishedYear || 2019}
                    onChange={(e) => updateNestedState("site", "establishedYear", Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-lg bg-brand-navy border border-brand-slate text-sm text-brand-light focus:border-brand-orange focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-muted uppercase mb-1">
                  Hero Primary Tagline / H1 Display Headline
                </label>
                <input
                  type="text"
                  value={data.site.tagline || ""}
                  onChange={(e) => updateNestedState("site", "tagline", e.target.value)}
                  placeholder="e.g. Flying Beyond Limits"
                  className="w-full px-3.5 py-2 rounded-lg bg-brand-navy border border-brand-slate text-sm text-brand-light focus:border-brand-orange focus:outline-none"
                />
                <p className="text-[11px] font-mono text-brand-muted mt-1">
                  Rendered dynamically as the giant H1 title on the Hero flight deck with aerospace gradient highlight.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-muted uppercase mb-1">
                  Backdrop Watermark Phrase
                </label>
                <input
                  type="text"
                  value={data.site.watermark || ""}
                  onChange={(e) => updateNestedState("site", "watermark", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-brand-navy border border-brand-slate text-sm text-brand-light focus:border-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-muted uppercase mb-1">
                  Hero Short Description
                </label>
                <textarea
                  rows={2}
                  value={data.site.shortDescription || ""}
                  onChange={(e) => updateNestedState("site", "shortDescription", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-brand-navy border border-brand-slate text-sm text-brand-light focus:border-brand-orange focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-muted uppercase mb-1">
                  Full Vision & Mission Overview
                </label>
                <textarea
                  rows={3}
                  value={data.site.fullDescription || ""}
                  onChange={(e) => updateNestedState("site", "fullDescription", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-brand-navy border border-brand-slate text-sm text-brand-light focus:border-brand-orange focus:outline-none resize-none"
                />
              </div>

              {/* Vision & Mission Statements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-brand-slate">
                <div className="p-4 rounded-xl bg-brand-navy/60 border border-brand-slate space-y-3">
                  <span className="text-xs font-mono text-brand-orange uppercase font-bold block">
                    Vision Card Configuration
                  </span>
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">Title</label>
                    <input
                      type="text"
                      value={data.site.vision?.title || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            vision: { ...prev.site.vision, title: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">Statement Creed</label>
                    <input
                      type="text"
                      value={data.site.vision?.statement || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            vision: { ...prev.site.vision, statement: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">
                      Key Highlights (One per line)
                    </label>
                    <textarea
                      rows={3}
                      value={(data.site.vision?.highlights || []).join("\n")}
                      onChange={(e) => {
                        const lines = e.target.value.split("\n");
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            vision: { ...prev.site.vision, highlights: lines },
                          },
                        }));
                      }}
                      className="w-full px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light resize-none font-sans"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-brand-navy/60 border border-brand-slate space-y-3">
                  <span className="text-xs font-mono text-brand-ion uppercase font-bold block">
                    Mission Card Configuration
                  </span>
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">Title</label>
                    <input
                      type="text"
                      value={data.site.mission?.title || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            mission: { ...prev.site.mission, title: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">Statement Creed</label>
                    <input
                      type="text"
                      value={data.site.mission?.statement || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            mission: { ...prev.site.mission, statement: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">
                      Key Highlights (One per line)
                    </label>
                    <textarea
                      rows={3}
                      value={(data.site.mission?.highlights || []).join("\n")}
                      onChange={(e) => {
                        const lines = e.target.value.split("\n");
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            mission: { ...prev.site.mission, highlights: lines },
                          },
                        }));
                      }}
                      className="w-full px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light resize-none font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Campus Location & Coordinates */}
              <div className="pt-4 border-t border-brand-slate space-y-3">
                <span className="text-xs font-mono text-brand-orange uppercase font-bold block">
                  Campus Hangar Location & Coordinates
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">Hangar Address / Lab</label>
                    <input
                      type="text"
                      value={data.site.location?.address || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            location: { ...prev.site.location, address: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-navy border border-brand-slate text-xs text-brand-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">Campus Quad</label>
                    <input
                      type="text"
                      value={data.site.location?.campus || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            location: { ...prev.site.location, campus: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-navy border border-brand-slate text-xs text-brand-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">City, State, Country</label>
                    <input
                      type="text"
                      value={data.site.location?.city || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            location: { ...prev.site.location, city: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-navy border border-brand-slate text-xs text-brand-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">Official Email</label>
                    <input
                      type="text"
                      value={data.site.contact?.email || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            contact: { ...prev.site.contact, email: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-navy border border-brand-slate text-xs text-brand-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">Operations Phone</label>
                    <input
                      type="text"
                      value={data.site.contact?.phone || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            contact: { ...prev.site.contact, phone: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-navy border border-brand-slate text-xs text-brand-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">GPS Coordinates</label>
                    <input
                      type="text"
                      value={data.site.location?.coordinates || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            location: { ...prev.site.location, coordinates: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-navy border border-brand-slate text-xs text-brand-light"
                    />
                  </div>
                </div>
              </div>

              {/* Squadron Social Channels */}
              <div className="pt-4 border-t border-brand-slate space-y-3">
                <span className="text-xs font-mono text-brand-orange uppercase font-bold block">
                  Squadron Social & Public Media Channels
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">Instagram URL</label>
                    <input
                      type="text"
                      value={data.site.socials?.instagram || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            socials: { ...prev.site.socials, instagram: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={data.site.socials?.linkedin || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            socials: { ...prev.site.socials, linkedin: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">Twitter / X URL</label>
                    <input
                      type="text"
                      value={data.site.socials?.twitter || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            socials: { ...prev.site.socials, twitter: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">YouTube URL</label>
                    <input
                      type="text"
                      value={data.site.socials?.youtube || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            socials: { ...prev.site.socials, youtube: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">GitHub Repo URL</label>
                    <input
                      type="text"
                      value={data.site.socials?.github || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            socials: { ...prev.site.socials, github: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: LINKS & SOCIAL CHANNELS */}
          {activeTab === "links" && data.site && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-light flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-brand-orange" />
                    <span>Links & Social Media Command Hub</span>
                  </h2>
                  <p className="text-xs text-brand-muted mt-1 font-sans">
                    Manage and live-test all squadron official social URLs, professional LinkedIn pages, captain communication channels, and partner links.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Real-time Sync Active</span>
                  </span>
                </div>
              </div>

              {/* SECTION 1: SQUADRON OFFICIAL SOCIAL PLATFORMS */}
              <div className="p-6 rounded-2xl bg-brand-navy/80 border border-brand-slate space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-brand-orange" />
                    <span className="text-xs font-mono text-brand-orange uppercase font-bold">
                      Official Squadron Social Platforms
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-brand-muted uppercase">
                    Appears in Footer & Navigation
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* LinkedIn */}
                  <div className="p-3.5 rounded-xl bg-brand-slate/40 border border-brand-slate space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-bold text-brand-light flex items-center gap-2">
                        <Linkedin className="w-4 h-4 text-[#0077B5]" />
                        <span>LinkedIn Page URL</span>
                      </label>
                      {data.site.socials?.linkedin && (
                        <a
                          href={data.site.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-brand-orange hover:underline inline-flex items-center gap-1"
                        >
                          <span>Test Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <input
                      type="url"
                      value={data.site.socials?.linkedin || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            socials: { ...prev.site.socials, linkedin: e.target.value },
                          },
                        }))
                      }
                      placeholder="https://linkedin.com/company/airnova-aerospace"
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono focus:border-brand-orange focus:outline-none"
                    />
                  </div>

                  {/* Instagram */}
                  <div className="p-3.5 rounded-xl bg-brand-slate/40 border border-brand-slate space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-bold text-brand-light flex items-center gap-2">
                        <Instagram className="w-4 h-4 text-[#E1306C]" />
                        <span>Instagram Profile URL</span>
                      </label>
                      {data.site.socials?.instagram && (
                        <a
                          href={data.site.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-brand-orange hover:underline inline-flex items-center gap-1"
                        >
                          <span>Test Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <input
                      type="url"
                      value={data.site.socials?.instagram || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            socials: { ...prev.site.socials, instagram: e.target.value },
                          },
                        }))
                      }
                      placeholder="https://instagram.com/airnova_aerospace"
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono focus:border-brand-orange focus:outline-none"
                    />
                  </div>

                  {/* Twitter / X */}
                  <div className="p-3.5 rounded-xl bg-brand-slate/40 border border-brand-slate space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-bold text-brand-light flex items-center gap-2">
                        <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                        <span>Twitter / X Profile URL</span>
                      </label>
                      {data.site.socials?.twitter && (
                        <a
                          href={data.site.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-brand-orange hover:underline inline-flex items-center gap-1"
                        >
                          <span>Test Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <input
                      type="url"
                      value={data.site.socials?.twitter || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            socials: { ...prev.site.socials, twitter: e.target.value },
                          },
                        }))
                      }
                      placeholder="https://twitter.com/airnova_aero"
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono focus:border-brand-orange focus:outline-none"
                    />
                  </div>

                  {/* YouTube */}
                  <div className="p-3.5 rounded-xl bg-brand-slate/40 border border-brand-slate space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-bold text-brand-light flex items-center gap-2">
                        <Youtube className="w-4 h-4 text-[#FF0000]" />
                        <span>YouTube Channel URL</span>
                      </label>
                      {data.site.socials?.youtube && (
                        <a
                          href={data.site.socials.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-brand-orange hover:underline inline-flex items-center gap-1"
                        >
                          <span>Test Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <input
                      type="url"
                      value={data.site.socials?.youtube || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            socials: { ...prev.site.socials, youtube: e.target.value },
                          },
                        }))
                      }
                      placeholder="https://youtube.com/@airnova_aerospace"
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono focus:border-brand-orange focus:outline-none"
                    />
                  </div>

                  {/* GitHub */}
                  <div className="p-3.5 rounded-xl bg-brand-slate/40 border border-brand-slate space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-bold text-brand-light flex items-center gap-2">
                        <Github className="w-4 h-4 text-brand-light" />
                        <span>GitHub Org / Repo URL</span>
                      </label>
                      {data.site.socials?.github && (
                        <a
                          href={data.site.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-brand-orange hover:underline inline-flex items-center gap-1"
                        >
                          <span>Test Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <input
                      type="url"
                      value={data.site.socials?.github || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            socials: { ...prev.site.socials, github: e.target.value },
                          },
                        }))
                      }
                      placeholder="https://github.com/NiharikaRaut-02/Airnova_Website"
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono focus:border-brand-orange focus:outline-none"
                    />
                  </div>

                  {/* Discord */}
                  <div className="p-3.5 rounded-xl bg-brand-slate/40 border border-brand-slate space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-bold text-brand-light flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-[#5865F2]" />
                        <span>Discord Community Server URL</span>
                      </label>
                      {data.site.socials?.discord && (
                        <a
                          href={data.site.socials.discord}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-brand-orange hover:underline inline-flex items-center gap-1"
                        >
                          <span>Test Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <input
                      type="url"
                      value={data.site.socials?.discord || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            socials: { ...prev.site.socials, discord: e.target.value },
                          },
                        }))
                      }
                      placeholder="https://discord.gg/airnova"
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: CAPTAIN & LEADERSHIP PROFESSIONAL PROFILES */}
              {data.captain && (
                <div className="p-6 rounded-2xl bg-brand-navy/80 border border-brand-slate space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs font-mono text-brand-orange uppercase font-bold">
                        Captain & Leadership Professional Channels ({data.captain.name || "Captain"})
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-brand-muted uppercase">
                      Appears on Captain Spotlight Card
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Captain LinkedIn */}
                    <div className="p-3.5 rounded-xl bg-brand-slate/40 border border-brand-slate space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold text-brand-light flex items-center gap-2">
                          <Linkedin className="w-4 h-4 text-[#0077B5]" />
                          <span>Captain LinkedIn Profile</span>
                        </label>
                        {data.captain.socials?.linkedin && (
                          <a
                            href={data.captain.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-mono text-brand-orange hover:underline inline-flex items-center gap-1"
                          >
                            <span>Test Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <input
                        type="url"
                        value={data.captain.socials?.linkedin || ""}
                        onChange={(e) =>
                          setData((prev: any) => ({
                            ...prev,
                            captain: {
                              ...prev.captain,
                              socials: { ...prev.captain.socials, linkedin: e.target.value },
                            },
                          }))
                        }
                        placeholder="https://linkedin.com/in/captain-airnova"
                        className="w-full px-3 py-2 rounded-lg bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono focus:border-brand-orange focus:outline-none"
                      />
                    </div>

                    {/* Captain Instagram */}
                    <div className="p-3.5 rounded-xl bg-brand-slate/40 border border-brand-slate space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold text-brand-light flex items-center gap-2">
                          <Instagram className="w-4 h-4 text-[#E1306C]" />
                          <span>Captain Instagram Profile</span>
                        </label>
                        {data.captain.socials?.instagram && (
                          <a
                            href={data.captain.socials.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-mono text-brand-orange hover:underline inline-flex items-center gap-1"
                          >
                            <span>Test Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <input
                        type="url"
                        value={data.captain.socials?.instagram || ""}
                        onChange={(e) =>
                          setData((prev: any) => ({
                            ...prev,
                            captain: {
                              ...prev.captain,
                              socials: { ...prev.captain.socials, instagram: e.target.value },
                            },
                          }))
                        }
                        placeholder="https://instagram.com/captain_airnova"
                        className="w-full px-3 py-2 rounded-lg bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono focus:border-brand-orange focus:outline-none"
                      />
                    </div>

                    {/* Captain Email */}
                    <div className="p-3.5 rounded-xl bg-brand-slate/40 border border-brand-slate space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold text-brand-light flex items-center gap-2">
                          <Mail className="w-4 h-4 text-brand-orange" />
                          <span>Captain Direct Email</span>
                        </label>
                        {data.captain.socials?.email && (
                          <a
                            href={`mailto:${data.captain.socials.email}`}
                            className="text-[11px] font-mono text-brand-orange hover:underline inline-flex items-center gap-1"
                          >
                            <span>Test Mailto</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <input
                        type="email"
                        value={data.captain.socials?.email || ""}
                        onChange={(e) =>
                          setData((prev: any) => ({
                            ...prev,
                            captain: {
                              ...prev.captain,
                              socials: { ...prev.captain.socials, email: e.target.value },
                            },
                          }))
                        }
                        placeholder="captain@airnova.org"
                        className="w-full px-3 py-2 rounded-lg bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono focus:border-brand-orange focus:outline-none"
                      />
                    </div>

                    {/* Captain GitHub */}
                    <div className="p-3.5 rounded-xl bg-brand-slate/40 border border-brand-slate space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold text-brand-light flex items-center gap-2">
                          <Github className="w-4 h-4 text-brand-light" />
                          <span>Captain GitHub Profile</span>
                        </label>
                        {data.captain.socials?.github && (
                          <a
                            href={data.captain.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-mono text-brand-orange hover:underline inline-flex items-center gap-1"
                          >
                            <span>Test Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <input
                        type="url"
                        value={data.captain.socials?.github || ""}
                        onChange={(e) =>
                          setData((prev: any) => ({
                            ...prev,
                            captain: {
                              ...prev.captain,
                              socials: { ...prev.captain.socials, github: e.target.value },
                            },
                          }))
                        }
                        placeholder="https://github.com/captain-aero"
                        className="w-full px-3 py-2 rounded-lg bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono focus:border-brand-orange focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 3: OPERATIONS & DISPATCH CONTACT POINTS */}
              <div className="p-6 rounded-2xl bg-brand-navy/80 border border-brand-slate space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-orange" />
                    <span className="text-xs font-mono text-brand-orange uppercase font-bold">
                      Hangar Operations & Dispatch Contact Points
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-brand-muted uppercase">
                    Official Inquiries & Base Location
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Official Email */}
                  <div className="p-3.5 rounded-xl bg-brand-slate/40 border border-brand-slate space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-bold text-brand-light flex items-center gap-2">
                        <Mail className="w-4 h-4 text-brand-orange" />
                        <span>Official Committee Email</span>
                      </label>
                      {data.site.contact?.email && (
                        <a
                          href={`mailto:${data.site.contact.email}`}
                          className="text-[11px] font-mono text-brand-orange hover:underline inline-flex items-center gap-1"
                        >
                          <span>Test Mail</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <input
                      type="email"
                      value={data.site.contact?.email || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            contact: { ...prev.site.contact, email: e.target.value },
                          },
                        }))
                      }
                      placeholder="contact@airnova.org"
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono focus:border-brand-orange focus:outline-none"
                    />
                  </div>

                  {/* Operations Phone */}
                  <div className="p-3.5 rounded-xl bg-brand-slate/40 border border-brand-slate space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-bold text-brand-light flex items-center gap-2">
                        <Phone className="w-4 h-4 text-brand-orange" />
                        <span>Operations Phone</span>
                      </label>
                      {data.site.contact?.phone && (
                        <a
                          href={`tel:${data.site.contact.phone.replace(/\s+/g, "")}`}
                          className="text-[11px] font-mono text-brand-orange hover:underline inline-flex items-center gap-1"
                        >
                          <span>Test Call</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <input
                      type="text"
                      value={data.site.contact?.phone || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            contact: { ...prev.site.contact, phone: e.target.value },
                          },
                        }))
                      }
                      placeholder="+91 (022) 5550-AERO"
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono focus:border-brand-orange focus:outline-none"
                    />
                  </div>

                  {/* GPS Coordinates */}
                  <div className="p-3.5 rounded-xl bg-brand-slate/40 border border-brand-slate space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-bold text-brand-light flex items-center gap-2">
                        <Globe className="w-4 h-4 text-brand-orange" />
                        <span>Hangar GPS Coordinates</span>
                      </label>
                      {data.site.location?.coordinates && (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            data.site.location.coordinates
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-brand-orange hover:underline inline-flex items-center gap-1"
                        >
                          <span>Open Map</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <input
                      type="text"
                      value={data.site.location?.coordinates || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          site: {
                            ...prev.site,
                            location: { ...prev.site.location, coordinates: e.target.value },
                          },
                        }))
                      }
                      placeholder="19.0760° N, 72.8777° E"
                      className="w-full px-3 py-2 rounded-lg bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: INDUSTRY & SPONSOR PARTNER EXTERNAL WEBSITES */}
              {data.sponsors?.companies && (
                <div className="p-6 rounded-2xl bg-brand-navy/80 border border-brand-slate space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Handshake className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs font-mono text-brand-orange uppercase font-bold">
                        Industry & Sponsor Partner Websites ({data.sponsors.companies.length})
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-brand-muted uppercase">
                      Direct Partner Destination Links
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {data.sponsors.companies.map((comp: any, cIdx: number) => (
                      <div
                        key={comp.id || cIdx}
                        className="p-3.5 rounded-xl bg-brand-slate/40 border border-brand-slate space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-brand-light truncate max-w-[160px]">
                            {comp.name || `Partner #${cIdx + 1}`}
                          </span>
                          {comp.websiteUrl && comp.websiteUrl !== "https://example.com" && (
                            <a
                              href={comp.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] font-mono text-brand-orange hover:underline inline-flex items-center gap-1"
                            >
                              <span>Visit</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        <input
                          type="url"
                          value={comp.websiteUrl || ""}
                          onChange={(e) => updateSponsorCompany(cIdx, "websiteUrl", e.target.value)}
                          placeholder="https://company.com"
                          className="w-full px-2.5 py-1.5 rounded bg-brand-navy border border-brand-slate text-[11px] text-brand-light font-mono focus:border-brand-orange focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CAPTAIN & LEADERSHIP */}
          {activeTab === "captain" && data.captain && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-light flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-brand-orange" />
                  <span>Captain Spotlight & Leadership Roster</span>
                </h2>
                <p className="text-xs text-brand-muted mt-1 font-sans">
                  Update Captain credentials, portrait photo, philosophy quote, and biography.
                </p>
              </div>

              {/* Avatar Uploader with Live Preview */}
              <div className="p-4 rounded-xl bg-brand-navy/80 border border-brand-slate space-y-3">
                <span className="text-xs font-mono text-brand-orange uppercase font-bold block">
                  Captain Portrait Photo
                </span>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-brand-slate border-2 border-brand-orange/80 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
                    {data.captain.avatarPlaceholder && !data.captain.avatarPlaceholder.includes("/images/team/captain.jpg") ? (
                      <img
                        src={data.captain.avatarPlaceholder}
                        alt="Captain Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-display font-black text-brand-orange">
                        {data.captain.name?.split(" ").map((n: string) => n[0]).join("") || "AS"}
                      </span>
                    )}
                  </div>
                  <div className="flex-grow space-y-2 w-full">
                    <input
                      type="text"
                      placeholder="Photo URL (e.g. /uploads/captain-photo.jpg)"
                      value={data.captain.avatarPlaceholder || ""}
                      onChange={(e) => updateNestedState("captain", "avatarPlaceholder", e.target.value)}
                      className="w-full px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light font-mono"
                    />
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-brand-orange/15 hover:bg-brand-orange text-brand-orange hover:text-white text-xs font-mono cursor-pointer border border-brand-orange/30 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Captain Portrait File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const url = await uploadFileDirectly(file);
                          if (url) updateNestedState("captain", "avatarPlaceholder", url);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase mb-1">
                    Captain Name
                  </label>
                  <input
                    type="text"
                    value={data.captain.name || ""}
                    onChange={(e) => updateNestedState("captain", "name", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-brand-navy border border-brand-slate text-sm text-brand-light focus:border-brand-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase mb-1">
                    Command Title
                  </label>
                  <input
                    type="text"
                    value={data.captain.title || ""}
                    onChange={(e) => updateNestedState("captain", "title", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-brand-navy border border-brand-slate text-sm text-brand-light focus:border-brand-orange focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase mb-1">
                    Command Tenure
                  </label>
                  <input
                    type="text"
                    value={data.captain.tenure || ""}
                    onChange={(e) => updateNestedState("captain", "tenure", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-brand-navy border border-brand-slate text-sm text-brand-light focus:border-brand-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase mb-1">
                    Subsystem Specialization
                  </label>
                  <input
                    type="text"
                    value={data.captain.subsystemFocus || ""}
                    onChange={(e) => updateNestedState("captain", "subsystemFocus", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-brand-navy border border-brand-slate text-sm text-brand-light focus:border-brand-orange focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-muted uppercase mb-1">
                  Philosophy Quote
                </label>
                <textarea
                  rows={2}
                  value={data.captain.quote || ""}
                  onChange={(e) => updateNestedState("captain", "quote", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-brand-navy border border-brand-slate text-sm text-brand-light focus:border-brand-orange focus:outline-none resize-none italic"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-muted uppercase mb-1">
                  Captain Biography
                </label>
                <textarea
                  rows={4}
                  value={data.captain.bio || ""}
                  onChange={(e) => updateNestedState("captain", "bio", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-brand-navy border border-brand-slate text-sm text-brand-light focus:border-brand-orange focus:outline-none resize-none font-sans"
                />
              </div>

              {/* Captain Social Channels */}
              <div className="pt-4 border-t border-brand-slate space-y-3">
                <span className="text-xs font-mono text-brand-orange uppercase font-bold block">
                  Captain Direct Communication & Social Handles
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">LinkedIn Profile</label>
                    <input
                      type="text"
                      value={data.captain.socials?.linkedin || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          captain: {
                            ...prev.captain,
                            socials: { ...prev.captain.socials, linkedin: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">Instagram Profile</label>
                    <input
                      type="text"
                      value={data.captain.socials?.instagram || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          captain: {
                            ...prev.captain,
                            socials: { ...prev.captain.socials, instagram: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">Direct Email</label>
                    <input
                      type="text"
                      value={data.captain.socials?.email || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          captain: {
                            ...prev.captain,
                            socials: { ...prev.captain.socials, email: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-brand-muted mb-1">GitHub Profile</label>
                    <input
                      type="text"
                      value={data.captain.socials?.github || ""}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          captain: {
                            ...prev.captain,
                            socials: { ...prev.captain.socials, github: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 8 SUBSYSTEM WINGS */}
          {activeTab === "subsystems" && data.subsystems && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-light flex items-center gap-2">
                    <Layers className="w-5 h-5 text-brand-orange" />
                    <span>8 Functional Subsystems ({data.subsystems.length} Active)</span>
                  </h2>
                  <p className="text-xs text-brand-muted mt-1 font-sans">
                    Configure divisions, icon bindings, descriptions, subsystem head names, and operational lead roles.
                  </p>
                </div>

                <button
                  onClick={addSubsystem}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-orange/15 hover:bg-brand-orange text-xs font-mono text-brand-orange hover:text-white border border-brand-orange/40 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Wing</span>
                </button>
              </div>

              <div className="space-y-4">
                {data.subsystems.map((sub: any, idx: number) => (
                  <div
                    key={sub.id || idx}
                    className="p-5 rounded-xl bg-brand-navy/80 border border-brand-slate space-y-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-grow">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-brand-slate text-brand-orange font-bold shrink-0">
                          WING 0{idx + 1}
                        </span>
                        <input
                          type="text"
                          value={sub.name}
                          onChange={(e) => updateSubsystem(idx, "name", e.target.value)}
                          className="px-2.5 py-1 rounded bg-brand-slate border border-brand-border text-sm font-bold text-brand-light flex-grow max-w-sm"
                        />
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Reorder Buttons */}
                        <div className="flex items-center gap-1 bg-brand-navy rounded-lg p-0.5 border border-brand-slate">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveSubsystem(idx, idx - 1)}
                            className="p-1.5 rounded text-brand-muted hover:text-brand-orange disabled:opacity-20 disabled:hover:text-brand-muted transition-colors"
                            title="Move Wing Up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === (data.subsystems || []).length - 1}
                            onClick={() => moveSubsystem(idx, idx + 1)}
                            className="p-1.5 rounded text-brand-muted hover:text-brand-orange disabled:opacity-20 disabled:hover:text-brand-muted transition-colors"
                            title="Move Wing Down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeSubsystem(idx)}
                          className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/30 transition-colors"
                          title="Delete Subsystem"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-brand-muted mb-1">
                          Icon Glyph (Wing, Rocket, Cpu, etc.)
                        </label>
                        <input
                          type="text"
                          value={sub.icon}
                          onChange={(e) => updateSubsystem(idx, "icon", e.target.value)}
                          className="w-full px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-brand-muted mb-1">
                          Focus Areas (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={Array.isArray(sub.focusAreas) ? sub.focusAreas.join(", ") : (sub.focusAreas || "")}
                          onChange={(e) =>
                            updateSubsystem(
                              idx,
                              "focusAreas",
                              e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean)
                            )
                          }
                          placeholder="e.g. CFD Optimization, Carbon Fiber Monocoque"
                          className="w-full px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-brand-muted mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={sub.description}
                        onChange={(e) => updateSubsystem(idx, "description", e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light resize-none"
                      />
                    </div>

                    {/* Subsystem Heads & Co-Leads (Multiple Heads Support) */}
                    <div className="p-3.5 rounded-xl bg-brand-slate/40 border border-brand-slate space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono text-brand-orange uppercase font-bold block">
                            Division Heads & Co-Leads ({((sub.heads && sub.heads.length > 0) ? sub.heads : (sub.leadName ? [{ name: sub.leadName, role: sub.leadRole || "Division Lead" }] : [])).length})
                          </span>
                          <span className="text-[10px] font-mono text-brand-muted">
                            Supports single head or multiple co-leads (e.g. Aerodynamics Head & Structure Head)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => addSubsystemHead(idx)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-brand-orange/15 hover:bg-brand-orange text-brand-orange hover:text-white text-xs font-mono transition-colors border border-brand-orange/30"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Co-Lead</span>
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {((sub.heads && sub.heads.length > 0)
                          ? sub.heads
                          : (sub.leadName ? [{ name: sub.leadName, role: sub.leadRole || "Division Lead" }] : [{ name: "", role: "Division Lead" }])
                        ).map((head: any, hIdx: number) => (
                          <div
                            key={hIdx}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 rounded-lg bg-brand-navy/60 border border-brand-slate/80"
                          >
                            <span className="text-[10px] font-mono text-brand-muted w-14 shrink-0">
                              Lead #{hIdx + 1}
                            </span>
                            <input
                              type="text"
                              placeholder="Head / Lead Full Name (e.g. Nitish Mishra)"
                              value={head.name || ""}
                              onChange={(e) => updateSubsystemHead(idx, hIdx, "name", e.target.value)}
                              className="flex-grow px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light font-bold"
                            />
                            <input
                              type="text"
                              placeholder="Role / Title (e.g. Aerodynamics Head)"
                              value={head.role || ""}
                              onChange={(e) => updateSubsystemHead(idx, hIdx, "role", e.target.value)}
                              className="sm:w-56 px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => removeSubsystemHead(idx, hIdx)}
                              className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/30 transition-colors shrink-0 self-end sm:self-auto"
                              title="Remove Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FLAGSHIP FLEET */}
          {activeTab === "projects" && data.projects && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-light flex items-center gap-2">
                    <Plane className="w-5 h-5 text-brand-orange" />
                    <span>Flagship Aerial Fleet ({data.projects.length} Builds)</span>
                  </h2>
                  <p className="text-xs text-brand-muted mt-1 font-sans">
                    Edit aircraft builds, categories, multiple high-res photos, specifications, and dedicated page architecture.
                  </p>
                </div>

                <button
                  onClick={addProject}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-orange/15 hover:bg-brand-orange text-xs font-mono text-brand-orange hover:text-white border border-brand-orange/40 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Vehicle</span>
                </button>
              </div>

              <div className="space-y-4">
                {data.projects.map((proj: any, idx: number) => (
                  <div
                    key={proj.id || idx}
                    className="p-5 sm:p-6 rounded-xl bg-brand-navy/80 border border-brand-slate space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-slate/60 pb-3">
                      <div className="flex items-center gap-2 flex-grow">
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => updateProject(idx, "name", e.target.value)}
                          className="px-2.5 py-1 rounded bg-brand-slate border border-brand-border text-base font-bold text-brand-light flex-grow max-w-sm"
                        />
                        <span className="text-[11px] font-mono text-brand-muted px-2 py-0.5 rounded bg-brand-navy border border-brand-slate shrink-0">
                          ID: {proj.id}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Reorder Buttons */}
                        <div className="flex items-center gap-1 bg-brand-navy rounded-lg p-0.5 border border-brand-slate">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveProject(idx, idx - 1)}
                            className="p-1.5 rounded text-brand-muted hover:text-brand-orange disabled:opacity-20 disabled:hover:text-brand-muted transition-colors"
                            title="Move Vehicle Up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === (data.projects || []).length - 1}
                            onClick={() => moveProject(idx, idx + 1)}
                            className="p-1.5 rounded text-brand-muted hover:text-brand-orange disabled:opacity-20 disabled:hover:text-brand-muted transition-colors"
                            title="Move Vehicle Down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <Link
                          href={`/projects/${proj.id}`}
                          target="_blank"
                          className="text-xs font-mono text-brand-orange hover:underline inline-flex items-center gap-1 shrink-0"
                        >
                          <span>View Dedicated Page</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>

                        <label className="flex items-center gap-1.5 text-xs font-mono text-brand-orange cursor-pointer shrink-0">
                          <input
                            type="checkbox"
                            checked={proj.featured || false}
                            onChange={(e) => updateProject(idx, "featured", e.target.checked)}
                            className="rounded bg-brand-slate border-brand-border text-brand-orange focus:ring-0"
                          />
                          <span>Featured</span>
                        </label>

                        <button
                          onClick={() => removeProject(idx)}
                          className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/30 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Primary Vehicle Banner Photo */}
                    <div className="p-3.5 rounded-xl bg-brand-slate/40 border border-brand-slate space-y-2">
                      <label className="block text-xs font-mono text-brand-orange uppercase font-bold">
                        Primary Cover Image / Render
                      </label>
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div className="w-20 h-14 rounded-lg bg-brand-navy border border-brand-slate overflow-hidden shrink-0 flex items-center justify-center">
                          {proj.imagePlaceholder && !proj.imagePlaceholder.includes("/images/projects/") ? (
                            <img
                              src={proj.imagePlaceholder}
                              alt={proj.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Plane className="w-6 h-6 text-brand-muted" />
                          )}
                        </div>
                        <div className="flex-grow space-y-1 w-full">
                          <input
                            type="text"
                            placeholder="Primary Cover Image URL (e.g. /uploads/vtol-render.jpg)"
                            value={proj.imagePlaceholder || ""}
                            onChange={(e) => updateProject(idx, "imagePlaceholder", e.target.value)}
                            className="w-full px-2.5 py-1 rounded bg-brand-navy border border-brand-slate text-xs text-brand-light font-mono"
                          />
                          <div className="flex items-center gap-2">
                            <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-orange/15 hover:bg-brand-orange text-brand-orange hover:text-white text-[11px] font-mono cursor-pointer transition-colors">
                              <Upload className="w-3 h-3" />
                              <span>Upload Cover Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  const url = await uploadFileDirectly(file);
                                  if (url) updateProject(idx, "imagePlaceholder", url);
                                }}
                                className="hidden"
                              />
                            </label>
                            {proj.imagePlaceholder && (
                              <button
                                type="button"
                                onClick={() => updateProject(idx, "imagePlaceholder", "")}
                                className="text-[11px] text-red-400 hover:text-red-300 font-mono"
                              >
                                Clear Cover
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* MULTI-PHOTO GALLERY MANAGER */}
                    <div className="p-3.5 rounded-xl bg-brand-slate/40 border border-brand-slate space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-mono text-brand-orange uppercase font-bold">
                          Multi-Photo Gallery & Telemetry Frames ({(proj.images || []).length} photos)
                        </label>
                        <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-mono cursor-pointer transition-colors shadow-sm">
                          <Plus className="w-3.5 h-3.5" />
                          <span>Upload & Add Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const url = await uploadFileDirectly(file);
                              if (url) addProjectImage(idx, url);
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Display Gallery Grid */}
                      {proj.images && proj.images.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                          {proj.images.map((imgUrl: string, imgIdx: number) => (
                            <div
                              key={imgIdx}
                              className="relative group rounded-lg overflow-hidden border border-brand-slate bg-brand-navy aspect-video"
                            >
                              <img
                                src={imgUrl}
                                alt={`Gallery ${imgIdx + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => removeProjectImage(idx, imgIdx)}
                                className="absolute top-1 right-1 p-1 rounded bg-black/80 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove photo"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs font-mono text-brand-muted italic">
                          No extra gallery photos uploaded yet. Use the button above to add high-resolution photos for the dedicated project page!
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-brand-muted mb-1">Category</label>
                        <input
                          type="text"
                          value={proj.category}
                          onChange={(e) => updateProject(idx, "category", e.target.value)}
                          className="w-full px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-brand-muted mb-1">
                          Badge Variant (ion, orange, purple, emerald, amber, pink, muted)
                        </label>
                        <input
                          type="text"
                          value={proj.badgeVariant || "orange"}
                          onChange={(e) => updateProject(idx, "badgeVariant", e.target.value)}
                          className="w-full px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-brand-muted mb-1">
                        Short Card Description
                      </label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => updateProject(idx, "description", e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-brand-orange uppercase font-bold mb-1">
                        Dedicated Page Full Engineering Overview & Architecture Notes
                      </label>
                      <textarea
                        rows={4}
                        value={proj.fullOverview || ""}
                        onChange={(e) => updateProject(idx, "fullOverview", e.target.value)}
                        placeholder="Comprehensive aerodynamic breakdown, propulsion dynamics, flight computer telemetry, and subsystem contributions for the dedicated project page..."
                        className="w-full px-3 py-2 rounded bg-brand-slate border border-brand-border text-xs text-brand-light font-sans"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ACHIEVEMENTS & STATS */}
          {activeTab === "achievements" && data.achievements && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-light flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-brand-orange" />
                    <span>Key Statistics & Competition Accolades</span>
                  </h2>
                  <p className="text-xs text-brand-muted mt-1 font-sans">
                    Edit live numerical stat counters, upload trophy photo galleries, and manage dedicated victory pages ({data.achievements.records?.length || 0} records).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addAchievementRecord}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold shadow-md shadow-brand-orange/30 hover:shadow-orange-glow transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Record</span>
                </button>
              </div>

              {/* KPI Stat Counters */}
              <div className="p-5 rounded-2xl bg-brand-navy/80 border border-brand-slate space-y-3">
                <span className="text-xs font-mono text-brand-orange uppercase font-bold block">
                  Live KPI Counter Values
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-brand-muted uppercase mb-1">
                      Competitions Attended
                    </label>
                    <input
                      type="number"
                      value={data.achievements.stats?.competitionsAttended || 0}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          achievements: {
                            ...prev.achievements,
                            stats: {
                              ...prev.achievements.stats,
                              competitionsAttended: Number(e.target.value),
                            },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-brand-slate border border-brand-border text-sm text-brand-light font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-brand-muted uppercase mb-1">
                      Projects Built
                    </label>
                    <input
                      type="number"
                      value={data.achievements.stats?.projectsCompleted || 0}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          achievements: {
                            ...prev.achievements,
                            stats: {
                              ...prev.achievements.stats,
                              projectsCompleted: Number(e.target.value),
                            },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-brand-slate border border-brand-border text-sm text-brand-light font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-brand-muted uppercase mb-1">
                      Active Flight Members
                    </label>
                    <input
                      type="number"
                      value={data.achievements.stats?.activeMembers || 0}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          achievements: {
                            ...prev.achievements,
                            stats: {
                              ...prev.achievements.stats,
                              activeMembers: Number(e.target.value),
                            },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-brand-slate border border-brand-border text-sm text-brand-light font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-brand-muted uppercase mb-1">
                      Flight Hours Logged
                    </label>
                    <input
                      type="number"
                      value={data.achievements.stats?.flightHoursLogged || 0}
                      onChange={(e) =>
                        setData((prev: any) => ({
                          ...prev,
                          achievements: {
                            ...prev.achievements,
                            stats: {
                              ...prev.achievements.stats,
                              flightHoursLogged: Number(e.target.value),
                            },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-brand-slate border border-brand-border text-sm text-brand-light font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Records List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-brand-orange uppercase font-bold">
                    Official Competition Records ({data.achievements.records?.length || 0})
                  </span>
                  <button
                    type="button"
                    onClick={addAchievementRecord}
                    className="text-xs font-mono text-brand-orange hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Record</span>
                  </button>
                </div>

                {(!data.achievements.records || data.achievements.records.length === 0) && (
                  <div className="p-8 rounded-2xl border border-dashed border-brand-slate text-center text-brand-muted">
                    <p className="text-sm mb-3">No achievement records configured.</p>
                    <button
                      type="button"
                      onClick={addAchievementRecord}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-orange text-white text-xs font-semibold"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create First Record</span>
                    </button>
                  </div>
                )}

                {data.achievements.records?.map((rec: any, idx: number) => (
                  <div
                    key={rec.id || idx}
                    className="p-5 sm:p-6 rounded-2xl bg-brand-navy/80 border border-brand-slate hover:border-brand-orange/40 transition-colors space-y-4"
                  >
                    {/* Record Card Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-slate/60 pb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="w-6 h-6 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-mono font-bold flex items-center justify-center">
                          #{idx + 1}
                        </span>
                        <span className="font-heading font-bold text-sm text-brand-light">
                          {rec.title || "Untitled Accolade"}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-orange/15 text-brand-orange border border-brand-orange/30">
                          {rec.rank || "RECORD"}
                        </span>
                        <span className="text-[11px] font-mono text-brand-muted px-2 py-0.5 rounded bg-brand-navy border border-brand-slate">
                          ID: {rec.id}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Reorder Buttons */}
                        <div className="flex items-center gap-1 bg-brand-navy rounded-lg p-0.5 border border-brand-slate">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveAchievementRecord(idx, idx - 1)}
                            className="p-1.5 rounded text-brand-muted hover:text-brand-orange disabled:opacity-20 disabled:hover:text-brand-muted transition-colors"
                            title="Move Record Up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === (data.achievements?.records || []).length - 1}
                            onClick={() => moveAchievementRecord(idx, idx + 1)}
                            className="p-1.5 rounded text-brand-muted hover:text-brand-orange disabled:opacity-20 disabled:hover:text-brand-muted transition-colors"
                            title="Move Record Down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <Link
                          href={`/achievements/${rec.id}`}
                          target="_blank"
                          className="text-xs font-mono text-brand-orange hover:underline inline-flex items-center gap-1 shrink-0"
                        >
                          <span>View Dedicated Page</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => removeAchievementRecord(idx)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Form Fields Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-brand-muted mb-1">
                          Record / Title
                        </label>
                        <input
                          type="text"
                          value={rec.title}
                          onChange={(e) => updateAchievementRecord(idx, "title", e.target.value)}
                          placeholder="e.g. National Drone Conclave 2024"
                          className="w-full px-3 py-2 rounded-lg bg-brand-slate border border-brand-border text-xs font-bold text-brand-light"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-brand-muted mb-1">
                          Rank / Award Laurel
                        </label>
                        <input
                          type="text"
                          value={rec.rank}
                          onChange={(e) => updateAchievementRecord(idx, "rank", e.target.value)}
                          placeholder="e.g. 1st Place — Gold Trophy"
                          className="w-full px-3 py-2 rounded-lg bg-brand-slate border border-brand-border text-xs text-brand-orange font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-brand-muted mb-1">
                          Year
                        </label>
                        <input
                          type="text"
                          value={rec.year}
                          onChange={(e) => updateAchievementRecord(idx, "year", e.target.value)}
                          placeholder="e.g. 2024"
                          className="w-full px-3 py-2 rounded-lg bg-brand-slate border border-brand-border text-xs text-brand-light font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-brand-muted mb-1">
                          Competition Event / Challenge
                        </label>
                        <input
                          type="text"
                          value={rec.event || ""}
                          onChange={(e) => updateAchievementRecord(idx, "event", e.target.value)}
                          placeholder="e.g. Autonomous Waypoint Precision Challenge"
                          className="w-full px-3 py-2 rounded-lg bg-brand-slate border border-brand-border text-xs text-brand-light"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-brand-muted mb-1">
                          Engineering Category / Division
                        </label>
                        <input
                          type="text"
                          value={rec.category || ""}
                          onChange={(e) => updateAchievementRecord(idx, "category", e.target.value)}
                          placeholder="e.g. Autonomous UAV Navigation"
                          className="w-full px-3 py-2 rounded-lg bg-brand-slate border border-brand-border text-xs text-brand-light"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-brand-muted mb-1">
                        Accomplishment Short Description
                      </label>
                      <textarea
                        rows={2}
                        value={rec.description || ""}
                        onChange={(e) => updateAchievementRecord(idx, "description", e.target.value)}
                        placeholder="Detailed technical description of the flight achievements, telemetry, or awards won..."
                        className="w-full px-3 py-2 rounded-lg bg-brand-slate border border-brand-border text-xs text-brand-light resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-brand-orange uppercase font-bold mb-1">
                        Dedicated Page Full Challenge & Victory Story
                      </label>
                      <textarea
                        rows={4}
                        value={rec.fullStory || ""}
                        onChange={(e) => updateAchievementRecord(idx, "fullStory", e.target.value)}
                        placeholder="In-depth narrative of the competition challenge, technical breakthroughs during flight rounds, judges' praise, and subsystem highlights..."
                        className="w-full px-3 py-2 rounded-lg bg-brand-slate border border-brand-border text-xs text-brand-light font-sans"
                      />
                    </div>

                    {/* Primary Trophy Photo */}
                    <div className="pt-2 border-t border-brand-slate/50 space-y-2">
                      <label className="block text-[11px] font-mono text-brand-muted">
                        Primary Trophy / Competition Victory Photo (Optional)
                      </label>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        {rec.imagePlaceholder && (
                          <div className="w-16 h-12 rounded-lg bg-brand-slate border border-brand-orange/40 overflow-hidden relative group shrink-0">
                            <img
                              src={rec.imagePlaceholder}
                              alt="Trophy preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <input
                          type="text"
                          value={rec.imagePlaceholder || ""}
                          onChange={(e) => updateAchievementRecord(idx, "imagePlaceholder", e.target.value)}
                          placeholder="e.g. /uploads/trophy_photo.jpg or upload below"
                          className="flex-1 px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light font-mono"
                        />
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-slate hover:bg-brand-slate/80 border border-brand-border text-brand-light text-xs font-mono cursor-pointer shrink-0">
                          <Upload className="w-3.5 h-3.5 text-brand-orange" />
                          <span>Upload Trophy Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadFileDirectly(file);
                                if (url) {
                                  updateAchievementRecord(idx, "imagePlaceholder", url);
                                }
                              }
                            }}
                          />
                        </label>
                        {rec.imagePlaceholder && (
                          <button
                            type="button"
                            onClick={() => updateAchievementRecord(idx, "imagePlaceholder", "")}
                            className="text-xs text-red-400 hover:text-red-300 font-mono"
                          >
                            Remove Photo
                          </button>
                        )}
                      </div>
                    </div>

                    {/* MULTI-PHOTO TROPHY GALLERY MANAGER */}
                    <div className="p-3.5 rounded-xl bg-brand-slate/40 border border-brand-slate space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-mono text-brand-orange uppercase font-bold">
                          Multi-Photo Trophy & Event Gallery ({(rec.images || []).length} photos)
                        </label>
                        <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-mono cursor-pointer transition-colors shadow-sm">
                          <Plus className="w-3.5 h-3.5" />
                          <span>Upload & Add Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const url = await uploadFileDirectly(file);
                              if (url) addAchievementImage(idx, url);
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Display Gallery Grid */}
                      {rec.images && rec.images.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                          {rec.images.map((imgUrl: string, imgIdx: number) => (
                            <div
                              key={imgIdx}
                              className="relative group rounded-lg overflow-hidden border border-brand-slate bg-brand-navy aspect-video"
                            >
                              <img
                                src={imgUrl}
                                alt={`Trophy Gallery ${imgIdx + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => removeAchievementImage(idx, imgIdx)}
                                className="absolute top-1 right-1 p-1 rounded bg-black/80 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove photo"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs font-mono text-brand-muted italic">
                          No extra event photos uploaded yet. Use the button above to add podium and flight test photos for the dedicated achievement page!
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: JOURNEY TIMELINE */}
          {activeTab === "timeline" && data.timeline && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-light flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-brand-orange" />
                    <span>Journey Milestones & Epochs ({data.timeline.length})</span>
                  </h2>
                  <p className="text-xs text-brand-muted mt-1 font-sans">
                    Configure landmark milestone years, accomplishment summaries, bullet highlights, and key epoch flags.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addMilestone}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold shadow-md shadow-brand-orange/30 hover:shadow-orange-glow transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Journey Milestone</span>
                </button>
              </div>

              <div className="space-y-4">
                {data.timeline.map((item: any, idx: number) => (
                  <div
                    key={item.year || idx}
                    className="p-5 rounded-xl bg-brand-navy/80 border border-brand-slate space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-grow">
                        <input
                          type="text"
                          value={item.year}
                          onChange={(e) => updateMilestone(idx, "year", e.target.value)}
                          placeholder="Year (e.g. 2025)"
                          className="w-24 px-2.5 py-1.5 rounded bg-brand-slate border border-brand-border text-sm font-display font-black text-brand-orange"
                        />
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateMilestone(idx, "title", e.target.value)}
                          placeholder="Milestone Title"
                          className="flex-grow px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-sm font-bold text-brand-light"
                        />
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <label className="flex items-center gap-1.5 text-xs font-mono text-brand-orange cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.highlight || false}
                            onChange={(e) => updateMilestone(idx, "highlight", e.target.checked)}
                            className="rounded bg-brand-slate border-brand-border text-brand-orange focus:ring-0"
                          />
                          <span>Key Epoch</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => removeMilestone(idx)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/30 transition-colors"
                          title="Remove Milestone"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-brand-muted mb-1">
                        Milestone Summary
                      </label>
                      <textarea
                        rows={2}
                        value={item.summary || ""}
                        onChange={(e) => updateMilestone(idx, "summary", e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-brand-muted mb-1">
                        Detailed Accomplishments / Key Bullet Points (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={(item.details || []).join("\n")}
                        onChange={(e) => {
                          const lines = e.target.value.split("\n");
                          updateMilestone(idx, "details", lines);
                        }}
                        placeholder="Bullet highlight 1&#10;Bullet highlight 2"
                        className="w-full px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light resize-none font-sans"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SPONSORS & ALLIANCES */}
          {activeTab === "sponsors" && data.sponsors && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-light flex items-center gap-2">
                    <Handshake className="w-5 h-5 text-brand-orange" />
                    <span>Industry & Hardware Partners</span>
                  </h2>
                  <p className="text-xs text-brand-muted mt-1 font-sans">
                    Manage collaborating aerospace companies, hardware partners, descriptions, and corporate logos ({data.sponsors.companies?.length || 0} companies).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addSponsorCompany}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold shadow-md shadow-brand-orange/30 hover:shadow-orange-glow transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Sponsor Company</span>
                </button>
              </div>

              {/* Headline & Subtitle */}
              <div className="p-5 rounded-2xl bg-brand-navy/80 border border-brand-slate space-y-4">
                <span className="text-xs font-mono text-brand-orange uppercase font-bold block">
                  Header Content & Value Proposition
                </span>

                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase mb-1">
                    Sponsorship Section Headline
                  </label>
                  <input
                    type="text"
                    value={data.sponsors.headline || ""}
                    onChange={(e) => updateNestedState("sponsors", "headline", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-brand-slate border border-brand-border text-sm text-brand-light focus:border-brand-orange focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase mb-1">
                    Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={data.sponsors.subtitle || ""}
                    onChange={(e) => updateNestedState("sponsors", "subtitle", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-brand-slate border border-brand-border text-xs sm:text-sm text-brand-light focus:border-brand-orange focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Companies List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-brand-orange uppercase font-bold">
                    Partner Companies List ({data.sponsors.companies?.length || 0})
                  </span>
                  <button
                    type="button"
                    onClick={addSponsorCompany}
                    className="text-xs font-mono text-brand-orange hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Partner</span>
                  </button>
                </div>

                {(!data.sponsors.companies || data.sponsors.companies.length === 0) && (
                  <div className="p-8 rounded-2xl border border-dashed border-brand-slate text-center text-brand-muted">
                    <p className="text-sm mb-3">No sponsor companies configured.</p>
                    <button
                      type="button"
                      onClick={addSponsorCompany}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-orange text-white text-xs font-semibold"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add First Company</span>
                    </button>
                  </div>
                )}

                {data.sponsors.companies?.map((comp: any, idx: number) => (
                  <div
                    key={comp.id || idx}
                    className="p-5 sm:p-6 rounded-2xl bg-brand-navy/80 border border-brand-slate hover:border-brand-orange/40 transition-colors space-y-4"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 border-b border-brand-slate/60 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-mono font-bold flex items-center justify-center">
                          #{idx + 1}
                        </span>
                        <span className="font-heading font-bold text-sm text-brand-light">
                          {comp.name || "Untitled Company"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Reorder Buttons */}
                        <div className="flex items-center gap-1 bg-brand-navy rounded-lg p-0.5 border border-brand-slate">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveSponsorCompany(idx, idx - 1)}
                            className="p-1.5 rounded text-brand-muted hover:text-brand-orange disabled:opacity-20 disabled:hover:text-brand-muted transition-colors"
                            title="Move Company Up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === (data.sponsors?.companies || []).length - 1}
                            onClick={() => moveSponsorCompany(idx, idx + 1)}
                            className="p-1.5 rounded text-brand-muted hover:text-brand-orange disabled:opacity-20 disabled:hover:text-brand-muted transition-colors"
                            title="Move Company Down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeSponsorCompany(idx)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove Company</span>
                        </button>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-brand-muted mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={comp.name}
                          onChange={(e) => updateSponsorCompany(idx, "name", e.target.value)}
                          placeholder="e.g. Aerospace Dynamics Corp"
                          className="w-full px-3 py-2 rounded-lg bg-brand-slate border border-brand-border text-xs font-bold text-brand-light"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-brand-muted mb-1">
                          Website URL
                        </label>
                        <input
                          type="text"
                          value={comp.websiteUrl || ""}
                          onChange={(e) => updateSponsorCompany(idx, "websiteUrl", e.target.value)}
                          placeholder="e.g. https://company.com"
                          className="w-full px-3 py-2 rounded-lg bg-brand-slate border border-brand-border text-xs text-brand-light font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-brand-muted mb-1">
                        Little / Brief Description
                      </label>
                      <textarea
                        rows={2}
                        value={comp.description || ""}
                        onChange={(e) => updateSponsorCompany(idx, "description", e.target.value)}
                        placeholder="Brief description of partner contributions or engineering focus..."
                        className="w-full px-3 py-2 rounded-lg bg-brand-slate border border-brand-border text-xs text-brand-light resize-none"
                      />
                    </div>

                    {/* Logo Uploader */}
                    <div className="pt-2 border-t border-brand-slate/50">
                      <label className="block text-[11px] font-mono text-brand-muted mb-1.5">
                        Company Logo (SVG, PNG, JPG, WebP)
                      </label>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        {comp.logoPlaceholder && (
                          <div className="w-16 h-10 rounded-lg bg-brand-slate border border-brand-orange/40 p-1 flex items-center justify-center overflow-hidden shrink-0">
                            <img
                              src={comp.logoPlaceholder}
                              alt="Logo preview"
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        )}
                        <input
                          type="text"
                          value={comp.logoPlaceholder || ""}
                          onChange={(e) => updateSponsorCompany(idx, "logoPlaceholder", e.target.value)}
                          placeholder="e.g. /uploads/company_logo.svg or upload below"
                          className="flex-1 px-3 py-1.5 rounded bg-brand-slate border border-brand-border text-xs text-brand-light font-mono"
                        />
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-slate hover:bg-brand-slate/80 border border-brand-border text-brand-light text-xs font-mono cursor-pointer shrink-0">
                          <Upload className="w-3.5 h-3.5 text-brand-orange" />
                          <span>Upload Company Logo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await uploadFileDirectly(file);
                                if (url) {
                                  updateSponsorCompany(idx, "logoPlaceholder", url);
                                }
                              }
                            }}
                          />
                        </label>
                        {comp.logoPlaceholder && (
                          <button
                            type="button"
                            onClick={() => updateSponsorCompany(idx, "logoPlaceholder", "")}
                            className="text-xs text-red-400 hover:text-red-300 font-mono"
                          >
                            Remove Logo
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: MEDIA & IMAGE UPLOADER */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-light flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-brand-orange" />
                  <span>Media & Asset Uploader</span>
                </h2>
                <p className="text-xs text-brand-muted mt-1 font-sans">
                  Upload images (Captain portraits, project renders, sponsor SVGs, logos). Uploaded assets are saved to <code className="text-brand-orange font-mono">public/uploads/</code> and can be linked anywhere on the site.
                </p>
              </div>

              <div className="p-8 rounded-2xl border-2 border-dashed border-brand-slate/90 hover:border-brand-orange/60 transition-colors text-center bg-brand-navy/60">
                <UploadCloud className="w-12 h-12 text-brand-orange mx-auto mb-4 animate-bounce" />
                <h3 className="font-heading font-bold text-lg text-brand-light mb-1">
                  Select an image to upload
                </h3>
                <p className="text-xs text-brand-muted mb-4">
                  PNG, JPG, SVG, WebP up to 10MB
                </p>

                <label className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-mono font-bold cursor-pointer shadow-lg shadow-brand-orange/30 transition-all">
                  <Upload className="w-4 h-4" />
                  <span>{isUploading ? "UPLOADING ASSET..." : "BROWSE IMAGE FILE"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUploadGeneric}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              </div>

              {uploadedUrl && (
                <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 animate-in fade-in">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Asset successfully uploaded!</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-brand-navy border border-emerald-500/40 overflow-hidden shrink-0">
                      <img
                        src={uploadedUrl}
                        alt="Uploaded Asset"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <label className="block text-[10px] font-mono text-brand-muted uppercase mb-1">
                        Public URL Path:
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={uploadedUrl}
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                        className="w-full px-3 py-1.5 rounded bg-brand-navy border border-brand-slate text-xs font-mono text-brand-orange cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
