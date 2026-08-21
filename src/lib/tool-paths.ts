/**
 * Maps legacy short slugs from data/tools.ts to the real static routes.
 * tools.ts slugs predate the final URL structure; this keeps search index
 * and entity paths pointing at pages that actually exist.
 */
export const TOOL_PATH_MAP: Record<string, string> = {
  "font-changer": "/",
  "social/instagram": "/social/instagram-font-generator",
  "social/facebook": "/social/facebook-font-style",
  "social/whatsapp": "/social/whatsapp-font-generator",
  "social/tiktok": "/social/tiktok-font-generator",
  "social/twitter": "/social/twitter-font-generator",
  "social/linkedin": "/social/linkedin-font-generator",
  "social/snapchat": "/social/snapchat-font-generator",
  "social/telegram": "/social/telegram-font-generator",
  "social/threads": "/social/threads-font-generator",
  "social/pinterest": "/social/pinterest-font-generator",
  "styles/cursive": "/styles/cursive-text-generator",
  "styles/bold": "/styles/bold-text-generator",
  "styles/gothic": "/styles/gothic-font-generator",
  "styles/calligraphy": "/styles/calligraphy-font-generator",
  "styles/aesthetic": "/styles/aesthetic-text-generator",
  "styles/monospace": "/styles/monospace-text-generator",
  "styles/script": "/styles/script-text-generator",
  "gaming/nickname": "/gaming/gaming-nickname-generator",
  "gaming/free-fire": "/gaming/free-fire-nickname",
  "gaming/pubg": "/gaming/pubg-nickname",
  "gaming/fortnite": "/gaming/fortnite-username",
  "gaming/roblox": "/gaming/roblox-username",
  "gaming/minecraft": "/gaming/minecraft-username",
};

export function realPathForSlug(slug: string): string | undefined {
  return TOOL_PATH_MAP[slug];
}
