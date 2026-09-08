# Airnova Website — Committee Content Management Guide

> **For Committee Leads & Non-Developer Contributors**  
> This guide explains how to update website copy, add competition trophies, upload new flagship vehicle specifications, update leadership biographies, and manage sponsor logos **without writing code**.

---

## 📁 Content Store Overview

All website copy and structured data are located inside the [`content/`](file:///c:/Users/chint/Documents/Airnova_Website/content) directory in standard JSON format:

| File | What It Controls | Responsible Role |
|---|---|---|
| [`content/site.json`](file:///c:/Users/chint/Documents/Airnova_Website/content/site.json) | Taglines, Watermark text, Vision & Mission, Campus address, Email, Social media links | Executive Board / PR Lead |
| [`content/captain.json`](file:///c:/Users/chint/Documents/Airnova_Website/content/captain.json) | Captain name, title, quote, bio, and social handles | Captain / Vice-Captain |
| [`content/subsystems.json`](file:///c:/Users/chint/Documents/Airnova_Website/content/subsystems.json) | The 8 engineering and operational wings, focus areas, and division leads | Subsystem Leads |
| [`content/projects.json`](file:///c:/Users/chint/Documents/Airnova_Website/content/projects.json) | 7 flagship aircraft builds, technical specs (Wingspan, Cruise speed, Weight), and tags | Technical Project Leads |
| [`content/achievements.json`](file:///c:/Users/chint/Documents/Airnova_Website/content/achievements.json) | KPI statistics (competitions, flight hours), trophies, podium medals, and records | Documentation / Flight Ops Lead |
| [`content/timeline.json`](file:///c:/Users/chint/Documents/Airnova_Website/content/timeline.json) | Journey milestones from 2019 to 2025 | Documentation Lead |
| [`content/sponsors.json`](file:///c:/Users/chint/Documents/Airnova_Website/content/sponsors.json) | Sponsor tiers (Title, Platinum, Gold), partner names, and value proposition | Sponsorship & Relations Lead |

---

## 🛠️ Step-by-Step Editing Instructions

### 1. How to Update the Captain Profile (`content/captain.json`)

To update the Captain's bio, philosophy quote, or social profiles, open [`content/captain.json`](file:///c:/Users/chint/Documents/Airnova_Website/content/captain.json):

```json
{
  "name": "Aarav Sharma",
  "title": "Captain & Flight Operations Lead",
  "tenure": "2024 – Present",
  "quote": "Aerospace engineering is not merely about beating gravity; it is about orchestrating aerodynamics, precision avionics, and team synergy into seamless flight.",
  "bio": "Aerospace engineering senior specializing in autonomous VTOL transition dynamics...",
  "subsystemFocus": "Flight Dynamics & Autonomous Systems",
  "socials": {
    "linkedin": "https://linkedin.com/in/aarav-sharma",
    "instagram": "https://instagram.com/aarav_aero",
    "email": "captain@airnova.org",
    "github": "https://github.com/aarav-sharma"
  },
  "avatarPlaceholder": "/images/team/captain.jpg"
}
```
*Note: Make sure all strings are wrapped in double quotes (`"`).*

---

### 2. How to Add a New Competition Achievement (`content/achievements.json`)

When Airnova wins a new podium or attends a competition:

1. Open [`content/achievements.json`](file:///c:/Users/chint/Documents/Airnova_Website/content/achievements.json).
2. Increment the numerical statistics in the `"stats"` block:
```json
"stats": {
  "competitionsAttended": 15,
  "projectsCompleted": 23,
  "activeMembers": 48,
  "flightHoursLogged": 420
}
```
3. Add a new record entry to the `"records"` array:
```json
{
  "id": "intl-uav-2025",
  "title": "International Collegiate UAV Challenge 2025",
  "event": "Autonomous VTOL Long-Range Delivery",
  "year": "2025",
  "rank": "1st Place — Overall Champions",
  "category": "Autonomous UAV Systems",
  "description": "Achieved a flawless 45-minute autonomous transition flight with live sensor telemetry.",
  "imagePlaceholder": "/images/achievements/intl-uav-2025.jpg"
}
```

---

### 3. How to Update Flagship Vehicle Specifications (`content/projects.json`)

To update aircraft specifications (e.g. changing cruising speed, wingspan, or battery setup):

1. Open [`content/projects.json`](file:///c:/Users/chint/Documents/Airnova_Website/content/projects.json).
2. Locate the project entry by its `"id"` (e.g. `"vtol"`, `"gliders"`, `"rocketry"`) and modify the `"specifications"` dictionary:
```json
"specifications": {
  "Wingspan": "1450 mm",
  "Cruise Speed": "70 km/h",
  "Hover Endurance": "20 min",
  "Cruise Endurance": "50 min",
  "Autopilot": "ArduPlane Dual-Core v4.5"
}
```

---

### 4. How to Add Onboarded Sponsors (`content/sponsors.json`)

To add a new corporate partner or hardware sponsor:

1. Open [`content/sponsors.json`](file:///c:/Users/chint/Documents/Airnova_Website/content/sponsors.json).
2. Locate the appropriate tier under `"tiers"` (`"Title Partner"`, `"Platinum Tier"`, or `"Gold & Hardware Partners"`).
3. Add the company's name and website link to the `"sponsors"` list:
```json
{
  "name": "New Aerospace Sponsor Corp",
  "logoPlaceholder": "/images/sponsors/new-sponsor.svg",
  "websiteUrl": "https://sponsor-website.com"
}
```

---

### 5. How to Update Campus Location & Contact Details (`content/site.json`)

1. Open [`content/site.json`](file:///c:/Users/chint/Documents/Airnova_Website/content/site.json).
2. Update the `"location"` or `"contact"` fields:
```json
"location": {
  "address": "Aeronautical Systems Hangar & Lab",
  "campus": "North Innovation Quad",
  "city": "Mumbai, Maharashtra, India",
  "coordinates": "19.0760° N, 72.8777° E"
},
"contact": {
  "email": "contact@airnova.org",
  "phone": "+91 (022) 5550-AERO"
}
```

---

## ⚡ Verifying Changes Locally

After editing any JSON file:
1. Open PowerShell and run:
   ```powershell
   npm.cmd run dev
   ```
2. Open **`http://localhost:3000`** in your browser to verify that your changes appear immediately without restarting the server.
3. Commit and push your changes to GitHub to trigger the automatic Vercel deployment!
