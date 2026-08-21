export interface ToolEntity {
  id: string;
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  description: string[];
  icon: string;
  category: "converter" | "reference" | "transform";
  howToUse: Array<{ step: number; title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedTools: string[];
}

export const PHASE3_TOOLS: ToolEntity[] = [
  {
    id: "text-converter",
    slug: "text-converter",
    name: "Text Converter",
    seoTitle: "Text Converter — Convert Text to Stylish Unicode",
    seoDescription:
      "Convert normal text into any Unicode style instantly. Pick a style, watch the live output, check character and word counts, then copy with one tap.",
    h1: "Text Converter",
    intro:
      "One input, every style. The text converter transforms your writing into any supported Unicode style with live output and precise counts.",
    description: [
      "Unlike the multi-card generator, the converter focuses on one style at a time: choose it from a dropdown, see a single large live output, and copy when satisfied.",
      "Character and word counters update as you type — essential for bios with strict limits like Instagram (150) or TikTok (80).",
    ],
    icon: "swap_horiz",
    category: "converter",
    howToUse: [
      { step: 1, title: "Type or paste", description: "Enter any text — English converts fully; unsupported characters are preserved." },
      { step: 2, title: "Select a style", description: "Pick from all 16 styles in the dropdown; output updates live." },
      { step: 3, title: "Copy the result", description: "Use Copy All or copy individual lines; counts keep you within limits." },
    ],
    faqs: [
      { question: "How is this different from the font generator?", answer: "The generator shows many styles at once for comparison; the converter perfects one chosen style with detailed counts and a focused view." },
      { question: "Does conversion change my character count?", answer: "Styled characters count as one each on virtually all platforms, so counts stay accurate." },
      { question: "What happens to emoji?", answer: "Emoji have no styled forms and pass through untouched — by design." },
    ],
    relatedTools: ["letter-generator", "number-generator", "character-generator"],
  },
  {
    id: "letter-generator",
    slug: "letter-generator",
    name: "Letter Generator",
    seoTitle: "Letter Generator — Stylish Letters & Alphabet Text",
    seoDescription:
      "Explore any letter A–Z in every Unicode style — bold 𝐀, cursive 𝒜, gothic 𝔄, fullwidth Ａ and more. Copy single styled letters instantly.",
    h1: "Letter Generator",
    intro:
      "Pick a letter, see it in every style. The letter generator renders one alphabet character across all supported Unicode fonts side by side.",
    description: [
      "Perfect for building monograms, initials in bios, or understanding exactly which variants exist for a specific letter.",
      "Every cell is individually copyable, and letters without a variant in a given style are honestly omitted rather than faked.",
    ],
    icon: "abc",
    category: "reference",
    howToUse: [
      { step: 1, title: "Choose a letter", description: "Tap any letter tile to switch the displayed character." },
      { step: 2, title: "Browse styles", description: "See bold, italic, script, fraktur, circled, fullwidth and more variants." },
      { step: 3, title: "Copy what you need", description: "Each variant has its own copy button with the character's code point shown." },
    ],
    faqs: [
      { question: "Why do some styles miss certain letters?", answer: "Unicode's historical exceptions: for example, cursive has no plain e-g pair beyond special glyphs, and some style sets substitute look-alikes. We show only real characters." },
      { question: "Can I copy a whole styled word here?", answer: "For words use the Text Converter — this tool specializes in single characters." },
    ],
    relatedTools: ["text-converter", "number-generator", "character-generator"],
  },
  {
    id: "number-generator",
    slug: "number-generator",
    name: "Number Generator",
    seoTitle: "Stylish Number Generator — Cool Numbers Copy & Paste",
    seoDescription:
      "Stylish numbers 0–9 in every existing Unicode variant: bold, double-struck, monospace, circled, fullwidth, superscript and subscript. Real characters only.",
    h1: "Stylish Number Generator",
    intro:
      "Numbers have fewer style variants than letters — and this tool shows only the ones that genuinely exist.",
    description: [
      "Styles like Fraktur and Script include no digits at all, so they never appear here. What does exist: bold, double-struck, sans, monospace, circled, fullwidth, superscript and subscript digit sets.",
      "Great for dates in bios (𝟐𝟎𝟐𝟔), numbered lists (① ② ③), exponents (x²) and formulas (H₂O).",
    ],
    icon: "123",
    category: "reference",
    howToUse: [
      { step: 1, title: "Pick a digit", description: "Select 0–9 to focus its variants." },
      { step: 2, title: "Compare sets", description: "Each row shows one complete digit family with code points." },
      { step: 3, title: "Copy digits", description: "Copy single digits or entire sequences for dates and lists." },
    ],
    faqs: [
      { question: "Why is there no gothic 5?", answer: "The Fraktur block simply contains no digits — mathematicians never needed them. Any tool claiming otherwise is substituting fake look-alikes." },
      { question: "Do circled numbers work everywhere?", answer: "①–⑨ render broadly; ⑩ and above are less consistent on older devices." },
    ],
    relatedTools: ["letter-generator", "text-converter", "character-generator"],
  },
  {
    id: "character-generator",
    slug: "character-generator",
    name: "Character Generator",
    seoTitle: "Unicode Character Generator — Special Characters & Text",
    seoDescription:
      "Search and browse hundreds of Unicode characters — hearts, stars, arrows, math symbols and more. Copy any character with its name and code point.",
    h1: "Unicode Character Generator",
    intro:
      "A searchable library of useful Unicode characters with instant copy, names and code points.",
    description: [
      "Search by name ('heart', 'arrow', 'star') or browse curated categories. Every result shows the official Unicode name and code point so you know exactly what you are copying.",
      "This tool covers the same dataset as our character reference — optimized for quick search-and-copy instead of category browsing.",
    ],
    icon: "search_in_pages",
    category: "reference",
    howToUse: [
      { step: 1, title: "Search or filter", description: "Type a keyword or pick a category chip to narrow results." },
      { step: 2, title: "Inspect details", description: "Each card shows the glyph, its name and U+ code point." },
      { step: 3, title: "Copy instantly", description: "Click any card to copy the character — confirmation appears inline." },
    ],
    faqs: [
      { question: "How many characters are included?", answer: "Hundreds of hand-curated, genuinely useful characters across 13 categories — not an overwhelming dump of the whole standard." },
      { question: "Can I request new categories?", answer: "Yes — reach out via the contact page with suggestions." },
    ],
    relatedTools: ["text-converter", "letter-generator", "number-generator"],
  },
  {
    id: "upside-down-text",
    slug: "upside-down-text",
    name: "Upside Down Text",
    seoTitle: "Upside Down Text Generator — Flip Text 180°",
    seoDescription:
      "Flip your text upside down with real Unicode rotation. Type, get ¡ʇxǝʇ uʍop-ǝpısdn, copy and paste anywhere. Free, instant, mobile-friendly.",
    h1: "Upside Down Text",
    intro:
      "Turns your text both flipped and reversed — the two transformations that together read as true 180° rotation.",
    description: [
      "Real upside-down text needs two steps: replace each letter with its rotated look-alike (a → ɐ, b → q) and reverse the character order. Doing only one produces garbage.",
      "Characters without rotated equivalents (most punctuation, non-Latin scripts) are preserved in place.",
    ],
    icon: "flip",
    category: "transform",
    howToUse: [
      { step: 1, title: "Type your phrase", description: "Short phrases flip best — long sentences stay fun but harder to read." },
      { step: 2, title: "Copy the flip", description: "Output updates live as you type." },
      { step: 3, title: "Paste anywhere", description: "Bios, comments, chats — anywhere plain text works." },
    ],
    faqs: [
      { question: "Is this real flipping or just weird letters?", answer: "It uses genuine IPA and Latin extended characters that look like rotated letters — the standard technique behind every upside-down generator." },
      { question: "Why did my emoji not flip?", answer: "Emoji cannot rotate as characters. They stay in place while surrounding letters flip." },
    ],
    relatedTools: ["mirror-text", "tiny-text", "strikethrough-text"],
  },
  {
    id: "mirror-text",
    slug: "mirror-text",
    name: "Mirror Text",
    seoTitle: "Mirror Text Generator — Reverse & Flip Your Text",
    seoDescription:
      "Mirror your text online: reverse character order and flip bracket pairs for authentic mirror-writing effects. Instant copy, no sign-up.",
    h1: "Mirror Text",
    intro:
      "Creates mirror-writing effects by reversing text and swapping direction-aware characters like brackets and slashes.",
    description: [
      "True mirroring reverses the reading order (hello → olleh) and flips asymmetric characters: ( becomes ), < becomes >, / becomes \\.",
      "Letters themselves cannot be mirrored as single Unicode characters — honest tools reverse order and punctuation rather than inventing glyphs.",
    ],
    icon: "compare_arrows",
    category: "transform",
    howToUse: [
      { step: 1, title: "Enter text", description: "Any phrase works; brackets and slashes get mirrored automatically." },
      { step: 2, title: "Toggle options", description: "Choose pure reversal or full mirror with character flips." },
      { step: 3, title: "Copy the result", description: "Paste into bios, puzzles or escape-room clues." },
    ],
    faqs: [
      { question: "What is mirror text used for?", answer: "Puzzles, riddles, Leonardo-da-Vinci-style notes, and aesthetic username variations." },
      { question: "Why don't letters flip?", answer: "No Unicode block defines horizontally-mirrored Latin letters. Reversal plus symbol-flipping is the technically correct approach." },
    ],
    relatedTools: ["upside-down-text", "invisible-text", "tiny-text"],
  },
  {
    id: "tiny-text",
    slug: "tiny-text",
    name: "Tiny Text",
    seoTitle: "Tiny Text Generator — Small Superscript & Subscript Font",
    seoDescription:
      "Make tiny text with Unicode superscript and subscript characters. Two sizes of small text that paste into any bio, chat or username.",
    h1: "Tiny Text",
    intro:
      "Shrinks text using superscript and subscript Unicode characters — two flavors of small text with different vibes.",
    description: [
      "Superscript mode (ˢᵐᵃˡˡ) raises letters; subscript mode (ₛₘₐₗₗ) lowers them. Both use genuine modifier-letter characters, not scaled-down fonts.",
      "Coverage is partial by nature: letters like q and c lack small forms in some sets. Missing characters stay normal-sized so words remain readable.",
    ],
    icon: "compress",
    category: "transform",
    howToUse: [
      { step: 1, title: "Type normally", description: "Any Latin text works." },
      { step: 2, title: "Pick a size", description: "Switch between superscript and subscript outputs." },
      { step: 3, title: "Copy the tiny version", description: "Both versions appear simultaneously — copy either." },
    ],
    faqs: [
      { question: "Why are some letters big in my tiny text?", answer: "Those letters have no small Unicode form (like capital Q). Preservation keeps your word readable instead of dropping characters." },
      { question: "Does tiny text hurt accessibility?", answer: "Screen readers may spell modifier letters oddly. Use tiny text decoratively, never for critical information." },
    ],
    relatedTools: ["character-generator", "text-converter", "upside-down-text"],
  },
  {
    id: "strikethrough-text",
    slug: "strikethrough-text",
    name: "Strikethrough Text",
    seoTitle: "Strikethrough Text Generator — S̶t̶r̶i̶k̶e̶ ̶T̶h̶r̶o̶u̶g̶h̶ ̶T̶e̶x̶t̶",
    seoDescription:
      "Cross out text anywhere with Unicode combining strokes. True strikethrough that pastes into Instagram, Discord, WhatsApp and emails — no formatting needed.",
    h1: "Strikethrough Text",
    intro:
      "Adds a line through every character using combining Unicode marks — strikethrough that survives outside rich-text editors.",
    description: [
      "Platforms with formatting buttons handle strike-through natively, but bios, comments and most social fields do not. Combining characters (U+0336) attach to each letter, making the effect portable.",
      "Three stroke styles included: single strikeout, double slash and wavy underline effects via different combining marks.",
    ],
    icon: "strikethrough_s",
    category: "transform",
    howToUse: [
      { step: 1, title: "Type your text", description: "Watch it strike through live." },
      { step: 2, title: "Choose a stroke", description: "Single, double or wavy combining styles." },
      { step: 3, title: "Copy struck text", description: "Paste anywhere — the lines travel with the characters." },
    ],
    faqs: [
      { question: "Why does my struck text look spaced out?", answer: "Combining marks can widen spacing slightly in some fonts — a known trade-off of portable strikethrough." },
      { question: "Can I remove the strike later?", answer: "Not easily — the marks are part of the text. Keep an unstyled copy if you might need the original." },
    ],
    relatedTools: ["mirror-text", "invisible-text", "upside-down-text"],
  },
  {
    id: "invisible-text",
    slug: "invisible-text",
    name: "Invisible Text",
    seoTitle: "Invisible Text Generator — Blank & Empty Characters",
    seoDescription:
      "Generate invisible text with zero-width Unicode characters. Send blank messages, create empty bios and invisible names — length-controlled and safe.",
    h1: "Invisible Text",
    intro:
      "Produces blank-looking text built from zero-width Unicode characters — invisible to readers, visible to apps.",
    description: [
      "Zero-width characters (U+200B, U+200C, U+2060…) occupy no visual space but count as content, letting you send 'empty' messages or preserve formatting where platforms trim whitespace.",
      "Choose your character type and repeat count. Use responsibly: some platforms discourage blank-message spam.",
    ],
    icon: "visibility_off",
    category: "transform",
    howToUse: [
      { step: 1, title: "Set the length", description: "Slide to control how many invisible characters to generate." },
      { step: 2, title: "Copy the blank", description: "Looks empty — contains real characters." },
      { step: 3, title: "Paste as needed", description: "Blank messages, spacer bios, or format-preserving fills." },
    ],
    faqs: [
      { question: "Is sending blank messages allowed?", answer: "Technically yes — they contain valid characters. Respect friends and group rules; spam is spam regardless of visibility." },
      { question: "Why would I need invisible characters?", answer: "Common uses: keeping line breaks intact in Instagram bios, testing form validation, creating indent effects." },
    ],
    relatedTools: ["mirror-text", "strikethrough-text", "tiny-text"],
  },
];

export function getToolBySlug(slug: string): ToolEntity | undefined {
  return PHASE3_TOOLS.find((t) => t.slug === slug);
}
