import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0B1220",
          slate: "#111A2E",
          orange: "#FF7A1A",
          "orange-hover": "#E0640D",
          ion: "#00D2FF",
          muted: "#8FA3C4",
          light: "#F5F7FB",
          border: "rgba(143, 163, 196, 0.2)",
          "border-glow": "rgba(255, 122, 26, 0.4)",
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        "orange-glow": "0 10px 25px -5px rgba(255, 122, 26, 0.25)",
        "orange-glow-lg": "0 15px 35px -5px rgba(255, 122, 26, 0.4)",
        "ion-glow": "0 10px 25px -5px rgba(0, 210, 255, 0.25)",
      },
      animation: {
        "spin-slow": "spin 6s linear infinite",
        "propeller": "spin 0.8s ease-in-out",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
