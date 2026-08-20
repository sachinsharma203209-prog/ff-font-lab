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
  ],
} as const;

export type NavLink = (typeof SITE_CONFIG.navLinks)[number];
