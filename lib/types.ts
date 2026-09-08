export interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
  isSubPage?: boolean;
}

export interface SiteConfig {
  name: string;
  logoImage?: string;
  tagline: string;
  watermark: string;
  shortDescription: string;
  fullDescription: string;
  establishedYear: number;
  collegeName: string;
  location: {
    address: string;
    campus: string;
    city: string;
    coordinates?: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  socials: {
    instagram: string;
    linkedin: string;
    twitter: string;
    youtube: string;
    github?: string;
  };
  navigation: NavigationItem[];
  cta: {
    primary: {
      label: string;
      href: string;
    };
    secondary: {
      label: string;
      href: string;
    };
  };
  vision: {
    title: string;
    statement: string;
    highlights: string[];
  };
  mission: {
    title: string;
    statement: string;
    highlights: string[];
  };
}

export interface SubsystemHead {
  name: string;
  role?: string;
}

export interface Subsystem {
  id: string;
  name: string;
  icon: string;
  description: string;
  focusAreas: string[];
  leadRole?: string;
  leadName?: string;
  heads?: SubsystemHead[];
}

export interface Milestone {
  year: string;
  title: string;
  summary: string;
  details: string[];
  highlight?: boolean;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  badgeVariant?: "ion" | "orange" | "purple" | "emerald" | "amber" | "pink" | "muted";
  description: string;
  fullOverview?: string;
  specifications: Record<string, string>;
  tags: string[];
  imagePlaceholder?: string;
  images?: string[];
  flightLogs?: string[];
  featured?: boolean;
}

export interface CaptainProfile {
  name: string;
  title: string;
  tenure: string;
  quote: string;
  bio: string;
  subsystemFocus: string;
  socials: {
    linkedin?: string;
    instagram?: string;
    email?: string;
    github?: string;
  };
  avatarPlaceholder: string;
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
  year: string;
  rank: string;
  category: string;
  description: string;
  fullStory?: string;
  details?: string[];
  imagePlaceholder?: string;
  images?: string[];
}

export interface AchievementStats {
  competitionsAttended: number;
  projectsCompleted: number;
  activeMembers: number;
  flightHoursLogged: number;
}

export interface AchievementsData {
  stats: AchievementStats;
  records: Achievement[];
}

export interface SponsorCompany {
  id: string;
  name: string;
  description: string;
  logoPlaceholder?: string;
  websiteUrl?: string;
}

export interface SponsorsData {
  headline: string;
  subtitle: string;
  valueProposition: string[];
  companies: SponsorCompany[];
}
