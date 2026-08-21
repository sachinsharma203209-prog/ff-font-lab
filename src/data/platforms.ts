export interface PlatformCompatibilityData {
  id: string;
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  canUseFancyText: string;
  whereToPaste: Array<{ field: string; support: "yes" | "partial" | "no"; note: string }>;
  stylesThatWork: Array<{ style: string; styleId: string; note: string }>;
  limitations: string[];
  troubleshooting: Array<{ problem: string; solution: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedGenerators: Array<{ title: string; href: string }>;
}

export const PLATFORM_COMPATIBILITY: PlatformCompatibilityData[] = [
  {
    id: "instagram",
    slug: "instagram",
    name: "Instagram",
    seoTitle: "Instagram Font Compatibility — Which Unicode Styles Work",
    seoDescription:
      "Which fancy fonts work on Instagram? Field-by-field compatibility for bio, captions, comments and name, plus fixes when characters do not display.",
    intro:
      "Instagram accepts Unicode text in nearly every field. Styled letters render for all viewers because they are characters, not installed fonts.",
    canUseFancyText:
      "Yes. Instagram treats styled Unicode exactly like normal text in bios, captions, comments, Reels descriptions and the profile name field.",
    whereToPaste: [
      { field: "Bio", support: "yes", note: "150-character limit; all core styles render" },
      { field: "Name field", support: "yes", note: "Searchable — light styles like Small Caps keep you findable" },
      { field: "Captions & comments", support: "yes", note: "Full Unicode accepted" },
      { field: "Reels text overlay", support: "partial", note: "Uses Instagram's own font picker; paste works in captions instead" },
      { field: "Username (@handle)", support: "no", note: "Restricted to letters, numbers, periods and underscores" },
    ],
    stylesThatWork: [
      { style: "Bold Sans", styleId: "boldSans", note: "Renders everywhere including older Androids" },
      { style: "Cursive", styleId: "cursive", note: "Popular for bios; readable at bio font size" },
      { style: "Small Caps", styleId: "smallCaps", note: "Best balance of style + searchability" },
      { style: "Fullwidth", styleId: "fullwidth", note: "Aesthetic look; counts double width visually" },
      { style: "Squared", styleId: "squared", note: "Emoji-block glyphs may show colored boxes on some devices" },
    ],
    limitations: [
      "Bio is capped at 150 characters — styled characters count as one each but fullwidth glyphs occupy double visual width.",
      "Some emoji-presentation symbols (like ⭐) always render as color images regardless of styling.",
      "Rare mathematical symbols outside popular ranges may display as □ on outdated system fonts.",
      "Hashtags and mentions must stay unstyled to be clickable.",
    ],
    troubleshooting: [
      { problem: "A character shows as an empty box (□)", solution: "Your device font lacks that glyph. Choose a more common style like Bold Sans or Monospace." },
      { problem: "Styled hashtag is not clickable", solution: "Retype the hashtag in plain letters — Instagram only links plain-text hashtags." },
      { problem: "Line breaks disappeared from my bio", solution: "Use the Edit Profile screen (not a third-party app) and add breaks with the return key; some apps strip them." },
    ],
    faqs: [
      { question: "Can everyone see my fancy Instagram font?", answer: "Yes on modern devices. The styling lives in the characters themselves, so no app or font installation is needed on the viewer's side." },
      { question: "Do Instagram bio fonts affect reach?", answer: "No penalty exists for Unicode text. Keep your name field lightly styled so search still matches it." },
      { question: "Why did my bio get cut off?", answer: "You crossed 150 characters. Symbols count individually — check the generator's counter before pasting." },
    ],
    relatedGenerators: [
      { title: "Instagram Font Generator", href: "/social/instagram-font-generator" },
      { title: "Instagram Bio Fonts", href: "/use-cases/instagram-bio-fonts" },
      { title: "Font Changer", href: "/" },
    ],
  },
  {
    id: "discord",
    slug: "discord",
    name: "Discord",
    seoTitle: "Discord Font Compatibility — Display Names, Nicknames & Markdown",
    seoDescription:
      "What fancy text works on Discord? Display names vs handles, server nicknames, markdown combos and fixes for missing glyphs.",
    intro:
      "Discord is one of the most Unicode-friendly platforms — with one catch: your @handle stays plain while display names go wild.",
    canUseFancyText:
      "Yes in display names, server nicknames, messages, channel topics and server descriptions. No in the @username handle, which allows only lowercase letters, numbers, underscores and periods.",
    whereToPaste: [
      { field: "Display name", support: "yes", note: "Full Unicode across all clients" },
      { field: "Server nickname", support: "yes", note: "Per-server; requires permission where restricted" },
      { field: "Messages", support: "yes", note: "Unicode plus native markdown (**bold**, `code`)" },
      { field: "@handle", support: "no", note: "ASCII-only by design for tagging reliability" },
      { field: "Channel names", support: "partial", note: "Most symbols allowed; spaces become dashes" },
    ],
    stylesThatWork: [
      { style: "Monospace", styleId: "monospace", note: "Pairs perfectly with code blocks for terminal vibes" },
      { style: "Double-Struck", styleId: "doubleStruck", note: "High contrast, renders on every client" },
      { style: "Gothic", styleId: "fraktur", note: "Server-brand favorite for gaming communities" },
      { style: "Small Caps", styleId: "smallCaps", note: "Subtle moderator-tag aesthetic" },
    ],
    limitations: [
      "Handles cannot be styled — Discord enforces ASCII for @usernames.",
      "Very rare glyphs may show as boxes for members with older system fonts.",
      "Bots parse raw Unicode; commands should be typed plainly to avoid parsing issues.",
      "Some servers restrict nickname changes via permissions.",
    ],
    troubleshooting: [
      { problem: "My styled name shows boxes to friends", solution: "Their OS font lacks those glyphs. Switch to Bold Sans, Double-Struck or Monospace which ship with every major OS." },
      { problem: "Bot does not respond to my styled command", solution: "Type commands in plain text. Style only display elements like nicknames." },
      { problem: "Cannot change server nickname", solution: "The server may lock nicknames. Ask a moderator or style your global display name instead." },
    ],
    faqs: [
      { question: "Does Discord allow fancy fonts?", answer: "Yes — anywhere free text exists except the @handle. Display names, nicknames and messages all accept Unicode styles." },
      { question: "How do I get code-style text in Discord?", answer: "Two ways: generate monospace Unicode here, or wrap normal text in backticks (`like this`) for Discord's native code formatting." },
      { question: "Will styled names break pings?", answer: "Pings use your account, not the visible name — @mentions work regardless of styling." },
    ],
    relatedGenerators: [
      { title: "Monospace Text Generator", href: "/styles/monospace-text-generator" },
      { title: "Discord Usernames Guide", href: "/use-cases/discord-usernames" },
      { title: "Character Generator", href: "/tools/character-generator" },
    ],
  },
  {
    id: "tiktok",
    slug: "tiktok",
    name: "TikTok",
    seoTitle: "TikTok Font Compatibility — Bio, Nickname & Caption Support",
    seoDescription:
      "Which Unicode fonts work on TikTok? Bio limits, nickname rules, caption behavior and what to do when styled text fails to save.",
    intro:
      "TikTok accepts styled Unicode in your nickname, bio and captions — but its 80-character bio fills up faster than you think.",
    canUseFancyText:
      "Yes. TikTok renders Unicode styles in nicknames, bios and video captions. The @handle remains plain ASCII.",
    whereToPaste: [
      { field: "Nickname", support: "yes", note: "Accepts all common styles; shown on profile and comments" },
      { field: "Bio", support: "yes", note: "80 characters — style one keyword, not everything" },
      { field: "Captions", support: "yes", note: "Full Unicode; hashtags must stay plain to link" },
      { field: "Comments", support: "yes", note: "All styles work" },
      { field: "@handle", support: "no", note: "Letters, numbers, underscores, periods only" },
    ],
    stylesThatWork: [
      { style: "Bold Sans", styleId: "boldSans", note: "Safest choice for the tight bio limit" },
      { style: "Cursive", styleId: "cursive", note: "Creator-favorite for soft aesthetics" },
      { style: "Small Caps", styleId: "smallCaps", note: "Readable at comment sizes" },
      { style: "Fullwidth", styleId: "fullwidth", note: "Strong aesthetic; eats bio space quickly" },
    ],
    limitations: [
      "Bio limit is 80 characters — fullwidth and symbol-heavy layouts consume it fast.",
      "On-screen video text uses TikTok's built-in fonts; paste styled text into captions instead.",
      "Styled hashtags do not become clickable links.",
      "Some decorative glyphs may not survive TikTok's input filters on certain regional versions.",
    ],
    troubleshooting: [
      { problem: "Bio rejected part of my text", solution: "A regional filter may block specific symbols. Remove them one by one to find the culprit, or switch to plainer styles." },
      { problem: "Styled caption broke my hashtag", solution: "Keep #tags in plain letters directly attached — style only surrounding words." },
      { problem: "Nickname looks different after saving", solution: "TikTok sometimes normalizes exotic glyphs. Popular math-alphanumeric styles persist reliably." },
    ],
    faqs: [
      { question: "How many characters is a TikTok bio?", answer: "80. Every styled letter counts as one character, so budget carefully and prioritize one styled phrase." },
      { question: "Do TikTok fonts work on viewers' phones?", answer: "Yes — they are Unicode characters rendered by each viewer's own system fonts." },
      { question: "Can I style my TikTok handle?", answer: "No. Handles are technical identifiers. Your nickname is the place for styled text." },
    ],
    relatedGenerators: [
      { title: "TikTok Font Generator", href: "/social/tiktok-font-generator" },
      { title: "Aesthetic Bios", href: "/use-cases/aesthetic-bios" },
      { title: "Compatibility Hub", href: "/compatibility" },
    ],
  },
  {
    id: "facebook",
    slug: "facebook",
    name: "Facebook",
    seoTitle: "Facebook Font Compatibility — Posts, Comments & Profile Fields",
    seoDescription:
      "Do fancy fonts work on Facebook? Where styled Unicode is accepted — posts, comments, bio and pages — plus name-field restrictions explained.",
    intro:
      "Facebook accepts Unicode text broadly, but is stricter than most apps about profile names — posts and comments are fully open.",
    canUseFancyText:
      "Yes in posts, comments, Stories text, page descriptions and your bio/intro. Profile names follow real-name standards, so heavy styling there may trigger review.",
    whereToPaste: [
      { field: "Posts & comments", support: "yes", note: "Every common style renders" },
      { field: "Intro / bio", support: "yes", note: "101-char short description accepts styles" },
      { field: "Page name & about", support: "yes", note: "Pages have more naming freedom than profiles" },
      { field: "Profile name", support: "partial", note: "Facebook may flag heavily styled names; light accents usually pass" },
      { field: "Messenger messages", support: "yes", note: "Full Unicode; nicknames accept styles too" },
    ],
    stylesThatWork: [
      { style: "Bold Sans", styleId: "boldSans", note: "Universal rendering, great for post emphasis" },
      { style: "Italic", styleId: "italic", note: "Elegant quotes and status lines" },
      { style: "Monospace", styleId: "monospace", note: "Code snippets and techy posts" },
      { style: "Double-Struck", styleId: "doubleStruck", note: "Statement headers inside long posts" },
    ],
    limitations: [
      "Profile names must reflect authentic identity — decorative-only names risk temporary locks.",
      "Facebook search indexes plain text best; styled words may not match searches.",
      "Marketplace listings should stay unstyled for trust and readability.",
      "Older Facebook Lite builds may miss rare glyph ranges.",
    ],
    troubleshooting: [
      { problem: "Name change rejected", solution: "Reduce styling in the profile name — keep decorations in the bio or intro instead." },
      { problem: "Boxes appear in old comments", solution: "Viewers on very old devices lack those glyphs; nothing you can change retroactively except editing the comment." },
      { problem: "Styled text not searchable", solution: "Expected behavior. Put key searchable terms in plain text somewhere in the post." },
    ],
    faqs: [
      { question: "Can I use fancy fonts in my Facebook name?", answer: "Lightly. Facebook enforces authenticity rules on names — most users style their bio and posts instead." },
      { question: "Do styled fonts show in the Facebook app and desktop?", answer: "Yes. Both clients render the same underlying Unicode characters." },
      { question: "Are styled fonts safe against bans?", answer: "Using Unicode text violates nothing. Only impersonation or policy-breaking content causes action." },
    ],
    relatedGenerators: [
      { title: "Facebook Font Style", href: "/social/facebook-font-style" },
      { title: "Text Converter", href: "/tools/text-converter" },
      { title: "Compatibility Hub", href: "/compatibility" },
    ],
  },
  {
    id: "whatsapp",
    slug: "whatsapp",
    name: "WhatsApp",
    seoTitle: "WhatsApp Font Compatibility — Chats, Status & About Styling",
    seoDescription:
      "Which stylish fonts work on WhatsApp? Chat messages, Status, About field and group names — plus native bold/italic tricks combined with Unicode.",
    intro:
      "WhatsApp is fully Unicode-friendly in chats, Status and the About field — and it layers native formatting on top.",
    canUseFancyText:
      "Yes everywhere text goes: messages, Status, About (139 chars), group names and contact nicknames. Native *bold* _italic_ ~strikethrough~ ~mono~ also stack with Unicode styles.",
    whereToPaste: [
      { field: "Chat messages", support: "yes", note: "All styles render; combine with native formatting" },
      { field: "Status", support: "yes", note: "Text statuses accept Unicode freely" },
      { field: "About", support: "yes", note: "139-character limit" },
      { field: "Group name", support: "yes", note: "Admins can style group titles" },
      { field: "Contact nickname", support: "yes", note: "Private to your device" },
    ],
    stylesThatWork: [
      { style: "Bold Script", styleId: "boldScript", note: "Eye-catching Status headlines" },
      { style: "Bubble", styleId: "bubble", note: "Playful contact names" },
      { style: "Fullwidth", styleId: "fullwidth", note: "Distinct About-section aesthetic" },
      { style: "Monospace", styleId: "monospace", note: "Mirrors WhatsApp's native mono formatting" },
    ],
    limitations: [
      "About section caps at 139 characters.",
      "Native formatting (*bold*) triggers on plain asterisks — styled Unicode never conflicts.",
      "Extremely old Android 4.x devices may miss newer glyph blocks.",
      "Status text uses WhatsApp's editor font for typed overlays; paste into the text status body instead.",
    ],
    troubleshooting: [
      { problem: "Friend sees squares instead of my styled text", solution: "Their phone's fonts are outdated. Suggest updating their system WebView, or use Bold Sans which renders everywhere." },
      { problem: "My *asterisks* showed literally", solution: "Native formatting needs exact syntax with no spaces. Or skip it and send pre-styled Unicode from the generator." },
      { problem: "Group name edit lost symbols", solution: "Some admin clients normalize rare glyphs. Re-add using popular styles like Double-Struck." },
    ],
    faqs: [
      { question: "Can I change my WhatsApp font permanently?", answer: "There is no global font setting. Send styled Unicode per message, or use native *bold* _italic_ markers inline." },
      { question: "Do both sides need the same phone brand?", answer: "No. Unicode renders through each device's own fonts — iPhone and Android both display standard styled sets correctly." },
      { question: "Will styled text forward cleanly?", answer: "Yes. Forwarded messages carry the exact characters, styling included." },
    ],
    relatedGenerators: [
      { title: "WhatsApp Font Generator", href: "/social/whatsapp-font-generator" },
      { title: "Stylish Nicknames", href: "/use-cases/stylish-nicknames" },
      { title: "Invisible Text Tool", href: "/tools/invisible-text" },
    ],
  },
];

export function getPlatformBySlug(slug: string): PlatformCompatibilityData | undefined {
  return PLATFORM_COMPATIBILITY.find((p) => p.slug === slug);
}
