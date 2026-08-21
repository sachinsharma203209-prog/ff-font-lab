export const SITE_CONFIG = {
  name: "Ff - Font Changer",
  title: "Font Changer — Fancy & Stylish Font Generator",
  description:
    "Instantly convert standard text into sophisticated, pro-level typography styles for social media, gaming, and creative projects.",
  url: "https://fontchange.co.in",
  ogImage: "/og-default.png",
  twitterHandle: "@ffontlab",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Social", href: "/social" },
    { label: "Styles", href: "/styles" },
    { label: "Gaming", href: "/gaming" },
    { label: "Tools", href: "/tools" },
    { label: "Characters", href: "/characters" },
  ],
  /**
   * Monetization & analytics. IDs come from env vars so production
   * secrets never live in the repo; empty string = feature disabled.
   */
  analytics: {
    ga4Id: import.meta.env.PUBLIC_GA4_ID ?? "",
  },
  adsense: {
    clientId: import.meta.env.PUBLIC_ADSENSE_CLIENT ?? "",
    /** Minimum posts before an ad slot renders (AdSense policy friendly) */
    enabledSlots: true,
  },
} as const;

export type NavLink = (typeof SITE_CONFIG.navLinks)[number];

export const isAnalyticsEnabled = () => SITE_CONFIG.analytics.ga4Id.length > 0;
export const isAdsEnabled = () => SITE_CONFIG.adsense.clientId.length > 0;
