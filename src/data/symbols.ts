export interface SymbolPageData {
  id: string;
  slug: string;
  name: string;
  char: string;
  codepoint: string;
  htmlEntity: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  description: string[];
  howToUse: Array<{ step: number; title: string; description: string }>;
  examples: Array<{ context: string; sample: string }>;
  variations: Array<{ char: string; label: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedSymbols: string[];
  relatedGenerators: Array<{ title: string; href: string }>;
}

const cp = (char: string): string => {
  const code = char.codePointAt(0);
  return code !== undefined ? `U+${code.toString(16).toUpperCase().padStart(4, "0")}` : "";
};

export const SYMBOL_PAGES: SymbolPageData[] = [
  {
    id: "heart-symbol",
    slug: "heart-symbol",
    name: "Heart Symbol",
    char: "♥",
    codepoint: cp("♥"),
    htmlEntity: "&hearts;",
    category: "hearts",
    seoTitle: "Heart Symbol ♥ — Copy & Paste, Meaning and Unicode",
    seoDescription:
      "Copy the ♥ heart symbol instantly. Learn its Unicode code point U+2665, meaning, platform support and how to use text hearts in bios, usernames and messages.",
    intro:
      "The heart symbol ♥ is the most copied decorative character on the internet. As a plain text character it inherits your font's color and style, making it perfect for usernames, bios and styled text.",
    description: [
      "♥ (U+2665, BLACK HEART SUIT) comes from the card-suit block of Unicode. Unlike heart emojis such as ❤️, it is a regular text character — so it renders in the same color as your text and works inside fields that reject emoji.",
      "Because it is plain text, ♥ combines cleanly with Unicode font styles. A bold 𝐁𝐨𝐥𝐝 ♥ or cursive 𝓁𝑜𝓋𝑒 ♥ keeps the heart consistent with the surrounding letters.",
    ],
    howToUse: [
      { step: 1, title: "Copy the heart", description: "Tap the copy button next to ♥ at the top of this page." },
      { step: 2, title: "Paste it anywhere", description: "Works in Instagram bios, TikTok captions, WhatsApp messages, Discord names and game nicknames." },
      { step: 3, title: "Combine with styles", description: "Generate styled text in any generator, then add ♥ before, after or between words." },
    ],
    examples: [
      { context: "Instagram bio", sample: "Dog mom ♥ Coffee addict ♥ Delhi" },
      { context: "Gaming nickname", sample: "♥Queen♥" },
      { context: "Message sign-off", sample: "See you tomorrow ♥" },
      { context: "Divider line", sample: "♥ ♥ ♥" },
    ],
    variations: [
      { char: "♡", label: "White heart outline" },
      { char: "❤", label: "Heavy black heart" },
      { char: "❥", label: "Rotated heart bullet" },
      { char: "❣", label: "Heart exclamation" },
      { char: "💕", label: "Two hearts emoji" },
      { char: "🖤", label: "Black heart emoji" },
    ],
    faqs: [
      { question: "Is ♥ an emoji?", answer: "No. ♥ is a standard text character (U+2665). It displays in your text color, while ❤️ is an emoji that always renders as a red image." },
      { question: "Why does ♥ sometimes appear red?", answer: "Some platforms automatically render ♥ with emoji presentation. Adding a text variation selector is not needed on most sites, but appearance can vary slightly by app." },
      { question: "Can I use hearts in my Free Fire or PUBG name?", answer: "Yes. ♥ is one of the few decorative characters accepted by most games because it belongs to a legacy symbol block." },
    ],
    relatedSymbols: ["star-symbol", "check-mark-symbol", "infinity-symbol"],
    relatedGenerators: [
      { title: "Cute Symbols", href: "/characters/hearts" },
      { title: "Gaming Nickname Generator", href: "/gaming/gaming-nickname-generator" },
      { title: "Instagram Bio Fonts", href: "/use-cases/instagram-bio-fonts" },
    ],
  },
  {
    id: "arrow-symbol",
    slug: "arrow-symbol",
    name: "Arrow Symbol",
    char: "→",
    codepoint: cp("→"),
    htmlEntity: "&rarr;",
    category: "arrows",
    seoTitle: "Arrow Symbol → — Copy, Paste and Unicode Reference",
    seoDescription:
      "Copy the → arrow symbol with one click. Unicode U+2192 explained: meaning, variations, platform support and creative uses in bios, menus and links.",
    intro:
      "The rightwards arrow → points readers toward links, lists and calls to action. It is a single text character that renders identically across devices.",
    description: [
      "→ (U+2192, RIGHTWARDS ARROW) is part of the original arrows block added in Unicode 1.1. It signals direction, progression or 'see next'.",
      "Arrows are layout workhorses: they act as bullets, separators between bio lines, and pointers before 'click the link' style CTAs.",
    ],
    howToUse: [
      { step: 1, title: "Copy the arrow", description: "Use the copy button beside → above." },
      { step: 2, title: "Choose the right direction", description: "Browse the arrows category for ← ↑ ↓ and double-stroke variants like ⇒." },
      { step: 3, title: "Structure your text", description: "Place arrows at line starts to build clean, aligned lists in bios and posts." },
    ],
    examples: [
      { context: "Bio link CTA", sample: "New video ↓" },
      { context: "Menu list", sample: "→ Pricing   → FAQ   → Contact" },
      { context: "Before / after", sample: "2024 → 2025 glow up" },
      { context: "Process steps", sample: "Idea → Build → Launch" },
    ],
    variations: [
      { char: "←", label: "Leftwards arrow" },
      { char: "↑", label: "Upwards arrow" },
      { char: "↓", label: "Downwards arrow" },
      { char: "⇒", label: "Double arrow" },
      { char: "➜", label: "Heavy round-tipped arrow" },
      { char: "➤", label: "Arrowhead" },
    ],
    faqs: [
      { question: "Do arrows count toward character limits?", answer: "Yes, each arrow counts as one character just like a letter. They are efficient ways to add visual structure." },
      { question: "Which arrow is best for Instagram bios?", answer: "→ ➜ and ↓ are the most reliable. Fancy emoji arrows can render differently on Android and iOS." },
    ],
    relatedSymbols: ["star-symbol", "heart-symbol", "check-mark-symbol"],
    relatedGenerators: [
      { title: "All Arrows", href: "/characters/arrows" },
      { title: "Aesthetic Bios", href: "/use-cases/aesthetic-bios" },
      { title: "Character Generator", href: "/tools/character-generator" },
    ],
  },
  {
    id: "star-symbol",
    slug: "star-symbol",
    name: "Star Symbol",
    char: "★",
    codepoint: cp("★"),
    htmlEntity: "&starf;",
    category: "stars",
    seoTitle: "Star Symbol ★ — Copy & Paste Black Star Unicode",
    seoDescription:
      "Copy the ★ black star symbol instantly. Unicode U+2605 reference with meanings, outline and sparkle variations, and where stars work best online.",
    intro:
      "The black star ★ is the classic rating and decoration star. As a text character it scales with your font and keeps its crisp shape everywhere.",
    description: [
      "★ (U+2605, BLACK STAR) has been part of Unicode since version 1.1. Its outline twin ☆ (U+2606) lets you create filled/empty contrast — the same trick used in rating widgets.",
      "Stars suit aesthetic layouts, achievement badges, divider rows and username decorations.",
    ],
    howToUse: [
      { step: 1, title: "Copy the star", description: "Hit the copy button next to ★." },
      { step: 2, title: "Mix fills and outlines", description: "Combine ★ ☆ ✦ ✧ for texture in dividers and borders." },
      { step: 3, title: "Rate anything", description: "Build text ratings like ★★★★☆ that paste into reviews, posts and bios." },
    ],
    examples: [
      { context: "Text rating", sample: "★★★★☆ 4/5" },
      { context: "Aesthetic divider", sample: "✦ ┈┈ ✦ ┈┈ ✦" },
      { context: "Username accent", sample: "★Nova★" },
      { context: "Achievement badge", sample: "Top 1% ★" },
    ],
    variations: [
      { char: "☆", label: "White star outline" },
      { char: "✦", label: "Four-pointed star" },
      { char: "✧", label: "White four-pointed star" },
      { char: "✯", label: "Pinwheel star" },
      { char: "⭐", label: "Star emoji" },
      { char: "✨", label: "Sparkles emoji" },
    ],
    faqs: [
      { question: "What does ★ mean in text?", answer: "It usually marks favorites, quality ratings or highlights. Five ★ in a row is universally read as a five-star rating." },
      { question: "Why do some stars render as emojis?", answer: "Characters like ⭐ are defined as emoji by default. Plain ★ and ☆ stay as text glyphs on all platforms." },
    ],
    relatedSymbols: ["heart-symbol", "arrow-symbol", "infinity-symbol"],
    relatedGenerators: [
      { title: "All Stars", href: "/characters/stars" },
      { title: "Aesthetic Text Generator", href: "/styles/aesthetic-text-generator" },
      { title: "Cool Usernames", href: "/use-cases/cool-usernames" },
    ],
  },
  {
    id: "infinity-symbol",
    slug: "infinity-symbol",
    name: "Infinity Symbol",
    char: "∞",
    codepoint: cp("∞"),
    htmlEntity: "&infin;",
    category: "math",
    seoTitle: "Infinity Symbol ∞ — Copy & Paste, Meaning and Unicode",
    seoDescription:
      "Copy the ∞ infinity symbol in one click. Its Unicode code point U+221E, mathematical origin, meanings and stylish uses in bios and usernames.",
    intro:
      "The infinity symbol ∞ represents something limitless and eternal — a favorite for couple bios, brand names and motivational profiles.",
    description: [
      "∞ (U+221E, INFINITY) was introduced by mathematician John Wallis in 1655 and later standardized in the Unicode math operators block.",
      "Beyond mathematics, it signals endless love, unlimited potential or loop-based aesthetics. It pairs well with hearts and stars in decorative text.",
    ],
    howToUse: [
      { step: 1, title: "Copy the symbol", description: "Click copy next to ∞ above." },
      { step: 2, title: "Pair it with words", description: "Use after words like 'us', 'loyal' or 'grind' for instant meaning." },
      { step: 3, title: "Style around it", description: "∞ itself has no styled variants, but surrounding text can be bold, cursive or gothic." },
    ],
    examples: [
      { context: "Couple bio", sample: "Riya ∞ Aarav" },
      { context: "Motivation", sample: "Hustle ∞" },
      { context: "Brand tagline", sample: "Loop forever ∞" },
      { context: "Friendship", sample: "Best friends ∞" },
    ],
    variations: [
      { char: "♾", label: "Infinity emoji" },
      { char: "∞", label: "Classic infinity" },
      { char: "○", label: "Circle (closed loop)" },
      { char: "◯", label: "Large circle" },
    ],
    faqs: [
      { question: "Does ∞ work on all phones?", answer: "Yes. It lives in the core math operators block and renders on every modern operating system." },
      { question: "Can the infinity symbol be styled like fonts?", answer: "No styled variant exists. To match it with fancy text, generate styled words separately and place ∞ between them." },
    ],
    relatedSymbols: ["heart-symbol", "star-symbol", "arrow-symbol"],
    relatedGenerators: [
      { title: "Math Symbols", href: "/characters/math" },
      { title: "Stylish Nicknames", href: "/use-cases/stylish-nicknames" },
      { title: "Font Changer", href: "/" },
    ],
  },
  {
    id: "check-mark-symbol",
    slug: "check-mark-symbol",
    name: "Check Mark Symbol",
    char: "✓",
    codepoint: cp("✓"),
    htmlEntity: "&check;",
    category: "miscellaneous",
    seoTitle: "Check Mark Symbol ✓ — Copy & Paste Tick Mark Unicode",
    seoDescription:
      "Copy the ✓ check mark symbol free. Unicode U+2713 tick mark with heavy ✔ and ballot ☑ variations, plus where each check style works best.",
    intro:
      "The check mark ✓ signals done, verified or correct. It is the fastest way to add visual confirmation to lists, bios and posts.",
    description: [
      "✓ (U+2713, CHECK MARK) is a lightweight text glyph. Heavier ✔ (U+2714) reads better at small sizes, while ☑ adds a checkbox frame.",
      "Check marks shine in 'what you get' lists, task updates and profile highlights — no images required.",
    ],
    howToUse: [
      { step: 1, title: "Copy the check", description: "Press the copy button next to ✓." },
      { step: 2, title: "Build checklists", description: "Start each line with ✓ to create scannable feature lists." },
      { step: 3, title: "Pick weight", description: "Use ✔ for bold statements and ✓ for subtle ticks." },
    ],
    examples: [
      { context: "Feature list", sample: "✓ Free  ✓ Fast  ✓ No login" },
      { context: "Task update", sample: "Design ✓  Code ✓  Launch ⏳" },
      { context: "Bio highlight", sample: "Verified seller ✓" },
      { context: "Poll result", sample: "Pizza ✓  Burger ✗" },
    ],
    variations: [
      { char: "✔", label: "Heavy check mark" },
      { char: "☑", label: "Ballot box with check" },
      { char: "✅", label: "Green check emoji" },
      { char: "❌", label: "Cross mark emoji" },
      { char: "✗", label: "Ballot X (opposite)" },
      { char: "✘", label: "Heavy ballot X" },
    ],
    faqs: [
      { question: "Which check mark looks verified?", answer: "None replace a real platform verification badge, but ✓ next to your niche (e.g. 'Artist ✓') communicates credibility informally." },
      { question: "Why did my check turn into a green box?", answer: "You pasted ✅, which is an emoji. Use text ✓ or ✔ when you want a monochrome glyph." },
    ],
    relatedSymbols: ["arrow-symbol", "star-symbol", "heart-symbol"],
    relatedGenerators: [
      { title: "Miscellaneous Symbols", href: "/characters/miscellaneous" },
      { title: "Character Generator", href: "/tools/character-generator" },
      { title: "Instagram Bio Fonts", href: "/use-cases/instagram-bio-fonts" },
    ],
  },
  {
    id: "copyright-symbol",
    slug: "copyright-symbol",
    name: "Copyright Symbol",
    char: "©",
    codepoint: cp("©"),
    htmlEntity: "&copy;",
    category: "punctuation",
    seoTitle: "Copyright Symbol © — Copy & Paste, Usage and Unicode",
    seoDescription:
      "Copy the © copyright symbol instantly. Correct usage with year and owner name, Unicode U+00A9 details, sound recording ℗ and related signs.",
    intro:
      "The copyright symbol © marks ownership of creative work. One tap copies it for watermarks, credits, footers and bios.",
    description: [
      "© (U+00A9, COPYRIGHT SIGN) dates back to US copyright law and is now part of Latin-1, making it one of the oldest and best-supported symbols.",
      "Proper form is © followed by the year and owner: © 2026 Ff Font Lab. On many platforms typing (c) auto-corrects to ©, but pasting the real character always works.",
    ],
    howToUse: [
      { step: 1, title: "Copy ©", description: "Use the button beside the symbol above." },
      { step: 2, title: "Add year and name", description: "Format as © Year Owner, e.g. © 2026 Studio Nine." },
      { step: 3, title: "Choose the right sibling", description: "Use ® only for federally registered trademarks; ℗ covers sound recordings." },
    ],
    examples: [
      { context: "Photo watermark", sample: "© 2026 A. Sharma" },
      { context: "Website footer", sample: "© 2026 Ff Font Lab. All rights reserved." },
      { context: "Beat credit", sample: "Prod. by KAZ ©" },
      { context: "Bio claim", sample: "My art © — no reposts" },
    ],
    variations: [
      { char: "®", label: "Registered trademark" },
      { char: "™", label: "Trademark" },
      { char: "℗", label: "Sound recording copyright" },
      { char: "℠", label: "Service mark" },
      { char: "🄯", label: "Copyleft style" },
      { char: "©️", label: "Copyright emoji form" },
    ],
    faqs: [
      { question: "Does using © actually copyright my work?", answer: "Your work is copyrighted when created in most countries. © declares that ownership publicly; formal registration gives extra legal remedies." },
      { question: "Can I put © in my Instagram bio?", answer: "Yes. It is a standard text character accepted in all social media text fields." },
    ],
    relatedSymbols: ["trademark-symbol", "check-mark-symbol", "infinity-symbol"],
    relatedGenerators: [
      { title: "Punctuation Symbols", href: "/characters/punctuation" },
      { title: "Currency Symbols", href: "/characters/currency" },
      { title: "Text Converter", href: "/tools/text-converter" },
    ],
  },
  {
    id: "trademark-symbol",
    slug: "trademark-symbol",
    name: "Trademark Symbol",
    char: "™",
    codepoint: cp("™"),
    htmlEntity: "&trade;",
    category: "punctuation",
    seoTitle: "Trademark Symbol ™ — Copy & Paste TM Sign Unicode",
    seoDescription:
      "Copy the ™ trademark symbol in one click. When to use TM vs ® vs SM, Unicode U+2122 facts and styling ideas for brands and creator names.",
    intro:
      "The trademark symbol ™ flags a name or logo you claim as a brand — no registration required, unlike ®.",
    description: [
      "™ (U+2122, TRADEMARK SYMBOL) announces unregistered trademark claims. ® may only be used after official registration, and misuse can be illegal in some jurisdictions.",
      "Creators use ™ playfully too: branding their username, catchphrase or squad name like a company.",
    ],
    howToUse: [
      { step: 1, title: "Copy ™", description: "Tap the copy button next to the symbol." },
      { step: 2, title: "Claim your brand", description: "Append ™ right after your name or phrase with no space: NovaCraft™." },
      { step: 3, title: "Stay legal", description: "Reserve ® for registered marks only; ™ and ℠ need no paperwork." },
    ],
    examples: [
      { context: "Creator brand", sample: "PixelForge™" },
      { context: "Catchphrase", sample: "Stay Sharp™" },
      { context: "Squad name", sample: "NightOwls™ Esports" },
      { context: "Product tease", sample: "Launching soon™" },
    ],
    variations: [
      { char: "®", label: "Registered trademark" },
      { char: "℠", label: "Service mark" },
      { char: "℗", label: "Phonogram copyright" },
      { char: "©", label: "Copyright" },
      { char: "™️", label: "TM emoji form" },
      { char: "🅣", label: "Negative squared T" },
    ],
    faqs: [
      { question: "Can anyone use ™?", answer: "Yes — using ™ asserts common-law rights in a mark you genuinely use in commerce. It requires no registration." },
      { question: "What is the difference between ™ and ®?", answer: "™ = unregistered claim anyone can use. ® = officially registered mark, protected by law, restricted to registrants." },
    ],
    relatedSymbols: ["copyright-symbol", "check-mark-symbol", "star-symbol"],
    relatedGenerators: [
      { title: "Punctuation Symbols", href: "/characters/punctuation" },
      { title: "Cool Usernames", href: "/use-cases/cool-usernames" },
      { title: "Letter Generator", href: "/tools/letter-generator" },
    ],
  },
];

export function getSymbolBySlug(slug: string): SymbolPageData | undefined {
  return SYMBOL_PAGES.find((s) => s.slug === slug);
}
