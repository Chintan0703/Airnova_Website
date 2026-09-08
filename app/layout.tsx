import type { Metadata, Viewport } from "next";
import { Orbitron, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import siteData from "@/content/site.json";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#0B1220",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${siteData.name} — ${siteData.tagline}`,
    template: `%s | ${siteData.name}`,
  },
  description: siteData.shortDescription,
  keywords: [
    "Airnova",
    "Drone Committee",
    "Aerospace Engineering",
    "Autonomous UAV",
    "VTOL",
    "Rocketry",
    "Biomimetic Flight",
    "Ornithopter",
    "Aeronautics",
  ],
  authors: [{ name: "Airnova Engineering Team" }],
  openGraph: {
    title: `${siteData.name} — ${siteData.tagline}`,
    description: siteData.shortDescription,
    url: "https://airnova.org",
    siteName: siteData.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteData.name} — ${siteData.tagline}`,
    description: siteData.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="bg-brand-navy text-brand-light font-sans antialiased min-h-screen selection:bg-brand-orange selection:text-brand-navy">
        {children}
      </body>
    </html>
  );
}
