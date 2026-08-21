export interface LanguageData {
  id: string;
  slug: string;
  name: string;
  nativeName: string;
  script: string;
  /** full = complete styled coverage; partial = base letters style, accents preserved; preserved = no styled equivalents, text kept as-is */
  supportLevel: "full" | "partial" | "preserved";
  supportLabel: string;
  sampleText: string;
  unsupportedSample: string[];
  description: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const LANGUAGES: LanguageData[] = [
  {
    id: "english",
    slug: "english",
    name: "English",
    nativeName: "English",
    script: "Latin",
    supportLevel: "full",
    supportLabel: "Full support",
    sampleText: "Hello World 123",
    unsupportedSample: [],
    description: [
      "English uses the basic Latin alphabet (A–Z, a–z) plus digits — the exact set that every Unicode font style was designed to cover. All 16 generator styles transform English text completely.",
      "This is why font changers were effectively built for English: bold 𝐛𝐨𝐥𝐝, cursive 𝓬𝓾𝓻𝓼𝓲𝓿𝓮 and gothic 𝔤𝔬𝔱𝔥𝔦𝔠 all map one-to-one from plain English letters.",
    ],
    faqs: [
      { question: "Do all styles work with English?", answer: "Yes. Every mathematical alphanumeric style covers all 26 letters in both cases, and most include digits too." },
      { question: "Are there any exceptions?", answer: "A few letters in a few styles use look-alike characters from other blocks (like ℎ for italic h), but visually everything converts." },
    ],
  },
  {
    id: "spanish",
    slug: "spanish",
    name: "Spanish",
    nativeName: "Español",
    script: "Latin (extended)",
    supportLevel: "partial",
    supportLabel: "Partial support",
    sampleText: "Hola Mundo",
    unsupportedSample: ["ñ", "á", "é", "í", "ó", "ú", "ü", "¿", "¡"],
    description: [
      "Spanish base letters convert fully into every style. Accented characters like ñ, á and ü have no equivalents in the Unicode mathematical blocks, so they are preserved exactly as typed.",
      "The inverted punctuation ¿ and ¡ also stay unchanged. A word like 'mañana' becomes 𝐦𝐚ñ𝐚𝐧𝐚 in bold — readable, valid, and never broken.",
    ],
    faqs: [
      { question: "Why does ñ not become fancy?", answer: "Unicode's styled alphabets only cover the unaccented English set. There is no mathematical bold ñ, so converters keep your original ñ rather than inventing invalid characters." },
      { question: "Is mixed output safe to paste?", answer: "Yes. Preserved characters are normal Unicode; the result pastes cleanly everywhere plain Spanish text does." },
    ],
  },
  {
    id: "french",
    slug: "french",
    name: "French",
    nativeName: "Français",
    script: "Latin (extended)",
    supportLevel: "partial",
    supportLabel: "Partial support",
    sampleText: "Bonjour le Monde",
    unsupportedSample: ["é", "è", "ê", "à", "ç", "ù", "ô", "î"],
    description: [
      "French words written with plain letters transform completely. Accents — é, è, ê, à, ç and friends — are preserved because the styled Unicode sets contain no accented forms.",
      "'Très chic' becomes 𝓉𝓇ès 𝒸𝒽𝒾𝒸 in cursive: the styled letters flow while è stays crisp and correct.",
    ],
    faqs: [
      { question: "Can I remove accents before converting?", answer: "You could type the unaccented form first, but we recommend keeping accents — correctness beats styling for names like Élodie or Céline." },
      { question: "Does œ or æ convert?", answer: "No. Ligatures are single pre-composed characters outside the styled sets, so they are preserved." },
    ],
  },
  {
    id: "german",
    slug: "german",
    name: "German",
    nativeName: "Deutsch",
    script: "Latin (extended)",
    supportLevel: "partial",
    supportLabel: "Partial support",
    sampleText: "Guten Tag",
    unsupportedSample: ["ä", "ö", "ü", "ß"],
    description: [
      "German umlauts ä, ö, ü and the sharp s ß are preserved during conversion. Everything else — the core Latin letters — transforms into any of the 16 styles.",
      "'Grüße' turns into 𝔊rüße in gothic: an authentic-looking mix where the umlaut and ß remain typographically correct.",
    ],
    faqs: [
      { question: "Why is there no styled ß?", answer: "The mathematical alphanumeric block deliberately excludes it. Writing ss instead would change meaning in German, so preservation is the correct behavior." },
      { question: "Should I write ue/oe/ae instead?", answer: "Only if you prefer full conversion over correct spelling. Both approaches produce pasteable text." },
    ],
  },
  {
    id: "portuguese",
    slug: "portuguese",
    name: "Portuguese",
    nativeName: "Português",
    script: "Latin (extended)",
    supportLevel: "partial",
    supportLabel: "Partial support",
    sampleText: "Ola Mundo",
    unsupportedSample: ["ã", "õ", "ç", "á", "é", "í", "ó", "ú", "â", "ê"],
    description: [
      "Portuguese tildes and accents (ã, õ, ç) stay untouched while base letters convert fully. 'Não' becomes 𝗡ão in sans-bold — instantly recognizable and shareable.",
      "Brazilian usernames often embrace this mixed look: styled consonants frame the preserved accented vowels.",
    ],
    faqs: [
      { question: "Will ç ever get a styled version?", answer: "There is no cedilla in the mathematical blocks today. If Unicode adds one, converters can adopt it — until then ç is preserved." },
      { question: "Is the mixed text accessible?", answer: "Screen readers handle preserved accented characters normally; heavily styled Latin letters can be read letter-by-letter, which is true for all Unicode fonts." },
    ],
  },
  {
    id: "italian",
    slug: "italian",
    name: "Italian",
    nativeName: "Italiano",
    script: "Latin (extended)",
    supportLevel: "partial",
    supportLabel: "Partial support",
    sampleText: "Ciao Mondo",
    unsupportedSample: ["à", "è", "ì", "ò", "ù"],
    description: [
      "Italian needs fewer accents than most Romance languages, so nearly all everyday words convert completely. Only à è ì ò ù remain unchanged.",
      "'Perché' becomes 𝐏𝐞𝐫𝐜𝐡è — one preserved accent inside fully styled letters.",
    ],
    faqs: [
      { question: "Do Italian capital accents differ?", answer: "É appears in some loanwords and is likewise preserved. Everything else follows the same rule." },
      { question: "Is this real translation?", answer: "No — this page explains character coverage, not translation. The tool transforms how text looks, never what it says." },
    ],
  },
  {
    id: "indonesian",
    slug: "indonesian",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    script: "Latin",
    supportLevel: "full",
    supportLabel: "Full support",
    sampleText: "Selamat Datang",
    unsupportedSample: [],
    description: [
      "Indonesian is written with the 26-letter basic Latin alphabet and no diacritics — identical coverage to English. Every style converts Indonesian text completely.",
      "'Aku cinta kamu' renders flawlessly in any style, which is why Indonesian users are among the most active font-changer audiences.",
    ],
    faqs: [
      { question: "Does Malay work the same?", answer: "Yes. Bahasa Malaysia shares the same plain-Latin writing system, so coverage is identical." },
      { question: "What about loanwords with foreign spelling?", answer: "Words borrowed from Dutch/Sanskrit keep standard Latin spelling in modern usage, so they convert fully too." },
    ],
  },
  {
    id: "hindi",
    slug: "hindi",
    name: "Hindi",
    nativeName: "हिन्दी",
    script: "Devanagari",
    supportLevel: "preserved",
    supportLabel: "Preserved safely",
    sampleText: "नमस्ते दोस्तों",
    unsupportedSample: ["न", "म", "स", "त", "े"],
    description: [
      "Hindi uses Devanagari script, which has no styled Unicode equivalents — there is no 'bold न' or 'cursive म'. Our converter preserves every Devanagari character exactly as typed instead of producing broken output.",
      "Mixed Hindi + English text works beautifully: the English part converts to any style while Hindi stays intact. 'नमस्ते Style' becomes 'नमस्ते 𝐒𝐭𝐲𝐥𝐞' in bold.",
      "For decorative Hindi typography, creators typically combine preserved Hindi text with symbol decorations (♥ ★ ﻭ) or use platform-native formatting where available.",
    ],
    faqs: [
      { question: "Why doesn't my Hindi text change?", answer: "Styled Unicode fonts exist only for Latin-based scripts. Rather than corrupting your words with invalid characters, the tool keeps Devanagari intact — this is deliberate, correct behavior." },
      { question: "How do people make stylish Hindi bios then?", answer: "Common techniques: convert only the English words, add decorative symbols around Hindi text, or use fullwidth Latin for a distinct look alongside Devanagari." },
      { question: "Is preserving characters better than fake conversion?", answer: "Absolutely. Some tools substitute random look-alike glyphs that break words and confuse readers. Preservation keeps your text meaningful and searchable." },
    ],
  },
];

export function getLanguageBySlug(slug: string): LanguageData | undefined {
  return LANGUAGES.find((l) => l.slug === slug);
}
