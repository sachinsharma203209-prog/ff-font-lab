export interface BreadcrumbItem {
  label: string;
  href: string;
}

const BREADCRUMB_MAP: Record<string, BreadcrumbItem[]> = {
  "/": [],
  "/social": [
    { label: "Home", href: "/" },
    { label: "Social Media", href: "/social" },
  ],
  "/styles": [
    { label: "Home", href: "/" },
    { label: "Font Styles", href: "/styles" },
  ],
  "/gaming": [
    { label: "Home", href: "/" },
    { label: "Gaming", href: "/gaming" },
  ],
  "/social/instagram-font-generator": [
    { label: "Home", href: "/" },
    { label: "Social Media", href: "/social" },
    { label: "Instagram", href: "/social/instagram-font-generator" },
  ],
  "/social/facebook-font-style": [
    { label: "Home", href: "/" },
    { label: "Social Media", href: "/social" },
    { label: "Facebook", href: "/social/facebook-font-style" },
  ],
  "/social/whatsapp-font-generator": [
    { label: "Home", href: "/" },
    { label: "Social Media", href: "/social" },
    { label: "WhatsApp", href: "/social/whatsapp-font-generator" },
  ],
  "/social/tiktok-font-generator": [
    { label: "Home", href: "/" },
    { label: "Social Media", href: "/social" },
    { label: "TikTok", href: "/social/tiktok-font-generator" },
  ],
  "/social/twitter-font-generator": [
    { label: "Home", href: "/" },
    { label: "Social Media", href: "/social" },
    { label: "Twitter / X", href: "/social/twitter-font-generator" },
  ],
  "/social/linkedin-font-generator": [
    { label: "Home", href: "/" },
    { label: "Social Media", href: "/social" },
    { label: "LinkedIn", href: "/social/linkedin-font-generator" },
  ],
  "/styles/cursive-text-generator": [
    { label: "Home", href: "/" },
    { label: "Font Styles", href: "/styles" },
    { label: "Cursive", href: "/styles/cursive-text-generator" },
  ],
  "/styles/bold-text-generator": [
    { label: "Home", href: "/" },
    { label: "Font Styles", href: "/styles" },
    { label: "Bold", href: "/styles/bold-text-generator" },
  ],
  "/styles/gothic-font-generator": [
    { label: "Home", href: "/" },
    { label: "Font Styles", href: "/styles" },
    { label: "Gothic", href: "/styles/gothic-font-generator" },
  ],
  "/styles/calligraphy-font-generator": [
    { label: "Home", href: "/" },
    { label: "Font Styles", href: "/styles" },
    { label: "Calligraphy", href: "/styles/calligraphy-font-generator" },
  ],
  "/styles/aesthetic-text-generator": [
    { label: "Home", href: "/" },
    { label: "Font Styles", href: "/styles" },
    { label: "Aesthetic", href: "/styles/aesthetic-text-generator" },
  ],
  "/gaming/gaming-nickname-generator": [
    { label: "Home", href: "/" },
    { label: "Gaming", href: "/gaming" },
    { label: "Gaming Nickname", href: "/gaming/gaming-nickname-generator" },
  ],
  "/gaming/free-fire-nickname": [
    { label: "Home", href: "/" },
    { label: "Gaming", href: "/gaming" },
    { label: "Free Fire", href: "/gaming/free-fire-nickname" },
  ],
  "/gaming/pubg-nickname": [
    { label: "Home", href: "/" },
    { label: "Gaming", href: "/gaming" },
    { label: "PUBG", href: "/gaming/pubg-nickname" },
  ],
  "/gaming/roblox-username": [
    { label: "Home", href: "/" },
    { label: "Gaming", href: "/gaming" },
    { label: "Roblox", href: "/gaming/roblox-username" },
  ],
  "/social/snapchat-font-generator": [
    { label: "Home", href: "/" },
    { label: "Social Media", href: "/social" },
    { label: "Snapchat", href: "/social/snapchat-font-generator" },
  ],
  "/social/telegram-font-generator": [
    { label: "Home", href: "/" },
    { label: "Social Media", href: "/social" },
    { label: "Telegram", href: "/social/telegram-font-generator" },
  ],
  "/social/threads-font-generator": [
    { label: "Home", href: "/" },
    { label: "Social Media", href: "/social" },
    { label: "Threads", href: "/social/threads-font-generator" },
  ],
  "/social/pinterest-font-generator": [
    { label: "Home", href: "/" },
    { label: "Social Media", href: "/social" },
    { label: "Pinterest", href: "/social/pinterest-font-generator" },
  ],
  "/social/hindi-font-generator": [
    { label: "Home", href: "/" },
    { label: "Social Media", href: "/social" },
    { label: "Hindi", href: "/social/hindi-font-generator" },
  ],
  "/social/bengali-font-generator": [
    { label: "Home", href: "/" },
    { label: "Social Media", href: "/social" },
    { label: "Bengali", href: "/social/bengali-font-generator" },
  ],
  "/social/arabic-font-generator": [
    { label: "Home", href: "/" },
    { label: "Social Media", href: "/social" },
    { label: "Arabic", href: "/social/arabic-font-generator" },
  ],
  "/styles/monospace-text-generator": [
    { label: "Home", href: "/" },
    { label: "Font Styles", href: "/styles" },
    { label: "Monospace", href: "/styles/monospace-text-generator" },
  ],
  "/styles/script-text-generator": [
    { label: "Home", href: "/" },
    { label: "Font Styles", href: "/styles" },
    { label: "Script", href: "/styles/script-text-generator" },
  ],
  "/gaming/valorant-nickname": [
    { label: "Home", href: "/" },
    { label: "Gaming", href: "/gaming" },
    { label: "Valorant", href: "/gaming/valorant-nickname" },
  ],
  "/gaming/fortnite-username": [
    { label: "Home", href: "/" },
    { label: "Gaming", href: "/gaming" },
    { label: "Fortnite", href: "/gaming/fortnite-username" },
  ],
  "/gaming/minecraft-username": [
    { label: "Home", href: "/" },
    { label: "Gaming", href: "/gaming" },
    { label: "Minecraft", href: "/gaming/minecraft-username" },
  ],
  "/privacy": [
    { label: "Home", href: "/" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  "/terms": [
    { label: "Home", href: "/" },
    { label: "Terms of Service", href: "/terms" },
  ],
  "/contact": [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
  ],
};

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const normalized = pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname;

  if (BREADCRUMB_MAP[normalized]) {
    return BREADCRUMB_MAP[normalized];
  }

  const segments = normalized.split("/").filter(Boolean);
  const crumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  let builtPath = "";
  for (let i = 0; i < segments.length; i++) {
    builtPath += `/${segments[i]}`;
    const label = segments[i]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({
      label,
      href: builtPath,
    });
  }

  return crumbs;
}
