export interface UseCaseData {
  id: string;
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  description: string[];
  recommendedStyles: string[];
  platforms: Array<{ label: string; note: string }>;
  examples: string[];
  tips: Array<{ step: number; title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedUseCases: string[];
  relatedGenerators: Array<{ title: string; href: string }>;
}

export const USE_CASES: UseCaseData[] = [
  {
    id: "instagram-bio-fonts",
    slug: "instagram-bio-fonts",
    name: "Instagram Bio Fonts",
    seoTitle: "Instagram Bio Fonts — Stylish Unicode Text for Your Bio",
    seoDescription:
      "Free Instagram bio fonts in bold, cursive and aesthetic styles. Generate Unicode text under the 150-character bio limit and paste it straight into your profile.",
    intro:
      "Your Instagram bio is 150 characters of prime profile real estate. Styled fonts make every character count — bold for names, cursive for taglines, symbols for structure.",
    description: [
      "Instagram accepts Unicode text everywhere plain text works: the bio, your name field, captions, comments, Reels descriptions and even Highlights covers (via cover text).",
      "The name field is a hidden weapon — it is searchable, so styling it with readable styles like small caps keeps you discoverable while standing out.",
    ],
    recommendedStyles: ["boldSans", "cursive", "smallCaps", "fullwidth"],
    platforms: [
      { label: "Bio", note: "150 characters — style short phrases, not paragraphs" },
      { label: "Name field", note: "Searchable; use subtle styles like Small Caps" },
      { label: "Captions & comments", note: "All styles work; avoid over-styling long captions" },
    ],
    examples: [
      "𝐑𝐢𝐲𝐚 ✦ Mumbai → Delhi",
      "𝒟𝓇𝑒𝒶𝓂𝑒𝓇 • 𝒞𝓇𝑒𝒶𝓉𝑜𝓇",
      "ᴄᴏɴᴛᴇɴᴛ ᴄʀᴇᴀᴛᴏʀ | 𝐃𝐌 𝐟𝐨𝐫 𝐜𝐨𝐥𝐥𝐚𝐛𝐬",
      "ｍａｋｉｎｇ ａｅｓｔｈｅｔｉｃｓ ♥",
    ],
    tips: [
      { step: 1, title: "Draft in plain text", description: "Write your bio first without styles so you can focus on the message." },
      { step: 2, title: "Style key words only", description: "Convert your name or one keyword — fully styled bios are hard to read." },
      { step: 3, title: "Check the counter", description: "Keep the result within 150 characters including symbols and line breaks." },
    ],
    faqs: [
      { question: "Do Instagram bio fonts actually work?", answer: "Yes — they are Unicode characters, not installed fonts. Instagram treats them as normal text and shows them to every viewer." },
      { question: "Will styled text hurt my searchability?", answer: "Instagram search matches your name field text. Heavily styled characters may not match searches, so keep the name field lightly styled or plain." },
      { question: "Why did part of my bio not convert?", answer: "Accented letters and non-Latin scripts have no styled equivalents — they are preserved automatically so nothing breaks." },
    ],
    relatedUseCases: ["aesthetic-bios", "cool-usernames", "stylish-nicknames"],
    relatedGenerators: [
      { title: "Instagram Font Generator", href: "/social/instagram-font-generator" },
      { title: "Text Converter", href: "/tools/text-converter" },
      { title: "Compatibility: Instagram", href: "/compatibility/instagram" },
    ],
  },
  {
    id: "gaming-usernames",
    slug: "gaming-usernames",
    name: "Gaming Usernames",
    seoTitle: "Gaming Usernames — Styled Names That Work In-Game",
    seoDescription:
      "Create gaming usernames with gothic, bold and squared Unicode styles. Character limits and support notes for Free Fire, PUBG, Valorant, Roblox and more.",
    intro:
      "A styled gaming username is your first impression in every lobby. The right font makes a simple name look like a clan brand.",
    description: [
      "Games differ wildly in what they accept. Display names usually allow rich Unicode, while account handles often restrict to A–Z, 0–9 and underscores.",
      "Our generator helps you test quickly: generate, copy, paste into the game's name field. If the game rejects it, try a simpler style like Bold Sans instead of decorative ones.",
    ],
    recommendedStyles: ["fraktur", "boldFraktur", "boldSans", "squared", "doubleStruck"],
    platforms: [
      { label: "Free Fire", note: "12-character limit; supports most symbol blocks" },
      { label: "PUBG / BGMI", note: "14 characters; rename card required" },
      { label: "Valorant", note: "Riot ID allows Unicode in display names" },
      { label: "Roblox", note: "20-character display names; chat is filtered" },
    ],
    examples: [
      "𝕯𝖆𝖗𝖐𝖘𝖙𝖗𝖎𝖐𝖊",
      "⧼Vortex⧽",
      "𝐒𝐡𝐚𝐝𝐨𝐰 𝐊𝐢𝐧𝐠",
      "☾ Phantom",
    ],
    tips: [
      { step: 1, title: "Know your limit", description: "Check the game's character limit before styling — decoration never beats fitting the field." },
      { step: 2, title: "Test before buying renames", description: "Paste into a clan chat or custom lobby name first to confirm the glyphs render." },
      { step: 3, title: "Keep one readable fallback", description: "Save an unstyled variant of your name for forms, friend requests and support tickets." },
    ],
    faqs: [
      { question: "Why was my styled name rejected?", answer: "Some games whitelist specific character ranges. Decorative math symbols are commonly blocked; legacy symbols like ★ ♥ pass more often." },
      { question: "Do other players see my styled name correctly?", answer: "On modern devices yes. Very old phones may show boxes for rare glyphs." },
      { question: "Can I get banned for Unicode names?", answer: "No — Unicode names are standard text. Only impersonation or offensive content breaks rules, styled or not." },
    ],
    relatedUseCases: ["cool-usernames", "discord-usernames", "stylish-nicknames"],
    relatedGenerators: [
      { title: "Gaming Nickname Generator", href: "/gaming/gaming-nickname-generator" },
      { title: "Free Fire Names", href: "/gaming/free-fire-nickname" },
      { title: "PUBG Names", href: "/gaming/pubg-nickname" },
    ],
  },
  {
    id: "discord-usernames",
    slug: "discord-usernames",
    name: "Discord Usernames",
    seoTitle: "Discord Usernames & Display Names — Styled Text Guide",
    seoDescription:
      "Style your Discord display name and server nickname with Unicode fonts. What works in handles vs display names, plus monospace tricks with markdown.",
    intro:
      "Discord separates your unchangeable handle from your flexible display name — and display names are where styled text shines.",
    description: [
      "Since the username migration, handles (@name) allow only lowercase letters, numbers, underscores and periods. Display names and per-server nicknames, however, accept full Unicode.",
      "Discord also supports native markdown: **bold**, *italic*, __underline__ and `code blocks` render in messages. Combining monospace Unicode inside code blocks creates a terminal aesthetic no other platform matches.",
    ],
    recommendedStyles: ["monospace", "doubleStruck", "fraktur", "smallCaps"],
    platforms: [
      { label: "Display name", note: "Full Unicode support across all plans" },
      { label: "Server nickname", note: "Per-server; needs Manage Nickname permission on some servers" },
      { label: "Handle (@username)", note: "Plain ASCII only — keep it unstyled" },
      { label: "Messages", note: "Unicode + native markdown both work" },
    ],
    examples: [
      "𝕯𝖗𝖆𝖌𝖔𝖓#0001 vibes",
      "`𝚖𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎` bot-style name",
      "★ Mod ★ ᴹᵃʳⁱᵃ",
      "𝐝𝐞𝐯 | building in public",
    ],
    tips: [
      { step: 1, title: "Style the display name only", description: "Keep your @handle plain so friends can find and tag you reliably." },
      { step: 2, title: "Use server nicknames", description: "Match each community's vibe by styling your nickname per server." },
      { step: 3, title: "Try mono + code block", description: "Wrap monospace Unicode in backticks for a convincing terminal look." },
    ],
    faqs: [
      { question: "Can I put fancy fonts in my Discord username?", answer: "Not in the @handle — Discord restricts it to basic characters. Display names and nicknames accept styled Unicode freely." },
      { question: "Why do some members see boxes?", answer: "Their device font lacks those glyphs. Popular styles like bold and monospace render for virtually everyone." },
      { question: "Do bots read styled names correctly?", answer: "Bots see raw Unicode. Commands should be typed plainly; styled text is best kept in display elements." },
    ],
    relatedUseCases: ["gaming-usernames", "cool-usernames", "stylish-nicknames"],
    relatedGenerators: [
      { title: "Monospace Generator", href: "/styles/monospace-text-generator" },
      { title: "Compatibility: Discord", href: "/compatibility/discord" },
      { title: "Character Generator", href: "/tools/character-generator" },
    ],
  },
  {
    id: "stylish-nicknames",
    slug: "stylish-nicknames",
    name: "Stylish Nicknames",
    seoTitle: "Stylish Nicknames — Cute Styled Names for Any App",
    seoDescription:
      "Generate stylish nicknames with hearts, stars and soft Unicode styles. Perfect for WhatsApp, Telegram, Snapchat contact names and couple nicknames.",
    intro:
      "Nicknames are personal. Soft styles, tiny hearts and gentle symbols turn a plain contact name into something affectionate and unique.",
    description: [
      "Messaging apps store nicknames locally, so styled names appear exactly how you save them — WhatsApp, Telegram, Snapchat and Signal all accept full Unicode in contact names and group titles.",
      "The best nickname styles stay readable at a glance in a crowded chat list: script for elegance, circled letters for playfulness, hearts as accents rather than replacements.",
    ],
    recommendedStyles: ["cursive", "bubble", "circled", "boldScript"],
    platforms: [
      { label: "WhatsApp", note: "Contact names & group names accept all styles" },
      { label: "Telegram", note: "Contact names, bios and channel titles work" },
      { label: "Snapchat", note: "Display names accept Unicode; streaks unaffected" },
      { label: "Phone contacts", note: "iOS/Android address books store any Unicode" },
    ],
    examples: [
      "♡ Ananya ♡",
      "𝐁𝐞𝐬𝐭𝐢𝐞 🌸",
      "✿ cutie patootie ✿",
      "❥ mera jaanu ❥",
    ],
    tips: [
      { step: 1, title: "Keep it short", description: "Chat lists truncate long names — two styled words maximum." },
      { step: 2, title: "One accent symbol", description: "A single heart or flower reads sweeter than a wall of decorations." },
      { step: 3, title: "Stay searchable", description: "Keep at least the core name recognizable so you can find contacts fast." },
    ],
    faqs: [
      { question: "Will the nickname show for the other person?", answer: "Usually not — contact names are private to your device. They see their own saved name or your profile name." },
      { question: "Can I use these as my own display name?", answer: "Yes, the same styles work in your WhatsApp About, Telegram bio and Snapchat display name." },
    ],
    relatedUseCases: ["aesthetic-bios", "instagram-bio-fonts", "cool-usernames"],
    relatedGenerators: [
      { title: "WhatsApp Fonts", href: "/social/whatsapp-font-generator" },
      { title: "Hearts Collection", href: "/characters/hearts" },
      { title: "Heart Symbol Guide", href: "/symbols/heart-symbol" },
    ],
  },
  {
    id: "aesthetic-bios",
    slug: "aesthetic-bios",
    name: "Aesthetic Bios",
    seoTitle: "Aesthetic Bios — Vaporwave & Soft Unicode Layouts",
    seoDescription:
      "Build aesthetic bios with fullwidth text, sparkles and shape dividers. Copy-paste layouts for TikTok, Instagram and Pinterest profiles.",
    intro:
      "Aesthetic bios are layout art: fullwidth letters, shape dividers and emoji accents arranged like typography posters.",
    description: [
      "The signature ingredients: fullwidth text (ｌｉｋｅ ｔｈｉｓ) for that dreamy vaporwave width, geometric shapes ─ ◦ ▹ as dividers, and restrained sparkle accents ✦ ✧.",
      "Whitespace does the heavy lifting. Line breaks between short styled lines create rhythm that plain paragraphs cannot match.",
    ],
    recommendedStyles: ["fullwidth", "smallCaps", "cursive", "upsideDown"],
    platforms: [
      { label: "TikTok", note: "80-char bio; fullwidth counts per glyph, plan tightly" },
      { label: "Instagram", note: "Line breaks preserved in bios via the edit screen" },
      { label: "Pinterest", note: "500-char about section fits full layouts" },
    ],
    examples: [
      "ｖｉｂｉｎｇ ｉｎ ２０２６",
      "▒░ dreamer ░▒\n◦ soft hours ◦",
      "✧ she/her ✧ 19\n▔▔▔▔▔▔▔\n𝓁𝑜𝓋𝑒 𝓎𝑜𝓊𝓇𝓈𝑒𝓁𝒻",
      "┊ ┊ ┊ ┊\n┊ ┊ ✦ ┊\n┊ ★ ┊\n✧",
    ],
    tips: [
      { step: 1, title: "Pick a palette of 2 symbols", description: "Limit yourself to two accent glyphs so the layout stays clean." },
      { step: 2, title: "Use line breaks as borders", description: "Characters like ▔ ─ ┈ make horizontal rules between sections." },
      { step: 3, title: "Preview on mobile", description: "Most viewers see your bio on a phone — check wrapping before saving." },
    ],
    faqs: [
      { question: "Why does fullwidth text look spaced out?", answer: "That is intentional — fullwidth characters occupy double width, originally designed for CJK alignment. It creates the airy aesthetic look." },
      { question: "Do aesthetic symbols slow down apps?", answer: "No. They are ordinary characters; performance impact is zero." },
    ],
    relatedUseCases: ["instagram-bio-fonts", "stylish-nicknames", "cool-usernames"],
    relatedGenerators: [
      { title: "Aesthetic Text Generator", href: "/styles/aesthetic-text-generator" },
      { title: "Shapes Collection", href: "/characters/shapes" },
      { title: "Star Symbol Guide", href: "/symbols/star-symbol" },
    ],
  },
  {
    id: "cool-usernames",
    slug: "cool-usernames",
    name: "Cool Usernames",
    seoTitle: "Cool Usernames — Stand Out on Every Platform",
    seoDescription:
      "Generate cool usernames with bold, squared and double-struck Unicode styles. Works for TikTok, X, Instagram and gaming profiles — with honest limits explained.",
    intro:
      "A cool username is memorable at a glance. Styled letters add instant personality — where the platform allows them.",
    description: [
      "Profile display names almost always accept Unicode. Account handles are stricter: X, TikTok and Instagram handles strip to plain letters, digits and underscores.",
      "Strategy: keep the handle clean for tagging, then style the display name above it. You get discoverability and aesthetics in one profile.",
    ],
    recommendedStyles: ["boldSans", "squared", "doubleStruck", "monospace"],
    platforms: [
      { label: "TikTok", note: "Nickname accepts styles; @handle does not" },
      { label: "X / Twitter", note: "Name field accepts styles; @handle stays plain" },
      { label: "Instagram", note: "Name field is searchable — light styling advised" },
      { label: "YouTube", note: "Channel names accept full Unicode" },
    ],
    examples: [
      "𝐍𝐢𝐭𝐫𝐨 ⚡",
      "🅂🅀🅄🄰🅁🄴 up",
      "𝔻𝕒𝕣𝕜 ℂ𝕠𝕕𝕖𝕣",
      "mon0.ttf",
    ],
    tips: [
      { step: 1, title: "Handle plain, name styled", description: "Style only the display name so mentions and tags still work." },
      { step: 2, title: "Test legibility", description: "Squint test: if the styled name is unreadable small, choose a cleaner style." },
      { step: 3, title: "Consistency wins", description: "Reuse the same base name across platforms so fans can find you everywhere." },
    ],
    faqs: [
      { question: "Why won't TikTok accept styled characters in my handle?", answer: "Handles must be URL-safe identifiers. Style your nickname instead — it appears prominently on your profile." },
      { question: "Are styled usernames bad for growth?", answer: "Not if the handle stays plain. Search and tags rely on the handle; the display name is pure branding." },
    ],
    relatedUseCases: ["gaming-usernames", "discord-usernames", "instagram-bio-fonts"],
    relatedGenerators: [
      { title: "Fancy Font Changer", href: "/" },
      { title: "Letter Generator", href: "/tools/letter-generator" },
      { title: "Number Generator", href: "/tools/number-generator" },
    ],
  },
];

export function getUseCaseBySlug(slug: string): UseCaseData | undefined {
  return USE_CASES.find((u) => u.slug === slug);
}
