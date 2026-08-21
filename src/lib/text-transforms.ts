export interface TransformResult {
  output: string;
  /** characters that had no equivalent and were preserved */
  preservedCount: number;
}

const zipMap = (pairs: Array<[string, string]>): Record<string, string> => {
  const m: Record<string, string> = {};
  for (const [k, v] of pairs) m[k] = v;
  return m;
};

// ─── Upside Down ───────────────────────────────────────────────

const UPSIDE_DOWN_MAP = zipMap([
  ["a", "ɐ"], ["b", "q"], ["c", "ɔ"], ["d", "p"], ["e", "ǝ"], ["f", "ɟ"], ["g", "ƃ"],
  ["h", "ɥ"], ["i", "ᴉ"], ["j", "ɾ"], ["k", "ʞ"], ["l", "ן"], ["m", "ɯ"], ["n", "u"],
  ["o", "o"], ["p", "d"], ["q", "b"], ["r", "ɹ"], ["s", "s"], ["t", "ʇ"], ["u", "n"],
  ["v", "ʌ"], ["w", "ʍ"], ["x", "x"], ["y", "ʎ"], ["z", "z"],
  ["A", "∀"], ["B", "ᗺ"], ["C", "Ɔ"], ["D", "ᗡ"], ["E", "Ǝ"], ["F", "Ⅎ"], ["G", "⅁"],
  ["H", "H"], ["I", "I"], ["J", "ſ"], ["K", "ʞ"], ["L", "˥"], ["M", "W"], ["N", "N"],
  ["O", "O"], ["P", "Ԁ"], ["Q", "Ò"], ["R", "ᴚ"], ["S", "S"], ["T", "⊥"], ["U", "∩"],
  ["V", "Λ"], ["W", "M"], ["X", "X"], ["Y", "⅄"], ["Z", "Z"],
  ["0", "0"], ["1", "Ɩ"], ["2", "ᄅ"], ["3", "Ɛ"], ["4", "ㄣ"], ["5", "ϛ"], ["6", "9"],
  ["7", "ㄥ"], ["8", "8"], ["9", "6"],
  [".", "˙"], [",", "'"], ["?", "¿"], ["!", "¡"], ["'", ","], ['"', "„"],
  ["(", ")"], [")", "("], ["[", "]"], ["]", "["], ["{", "}"], ["}", "{"],
  ["<", ">"], [">", "<"], ["&", "⅋"], ["_", "‾"], [";", "؛"], ["‿", "⁀"], ["⁅", "⁆"], ["∴", "∵"],
]);

export function upsideDown(text: string): TransformResult {
  let preserved = 0;
  const flipped: string[] = [];
  for (const ch of text) {
    const mapped = UPSIDE_DOWN_MAP[ch];
    if (mapped) {
      flipped.push(mapped);
    } else {
      flipped.push(ch);
      if (ch !== " " && ch !== "\n") preserved++;
    }
  }
  return { output: flipped.reverse().join(""), preservedCount: preserved };
}

// ─── Mirror Text ───────────────────────────────────────────────

const MIRROR_MAP = zipMap([
  ["(", ")"], [")", "("], ["[", "]"], ["]", "["], ["{", "}"], ["}", "{"],
  ["<", ">"], [">", "<"], ["/", "\\"], ["\\", "/"], ["(", ")"], ["¿", "?"], ["?", "¿"],
  ["b", "d"], ["d", "b"], ["p", "q"], ["q", "p"],
]);

export function mirrorText(text: string, flipLetters: boolean): TransformResult {
  let preserved = 0;
  const out: string[] = [];
  const chars = Array.from(text);
  for (let i = chars.length - 1; i >= 0; i--) {
    const ch = chars[i];
    if (flipLetters && MIRROR_MAP[ch]) {
      out.push(MIRROR_MAP[ch]);
    } else {
      out.push(ch);
      if (flipLetters && ch !== " " && ch !== "\n" && !/[a-zA-Z0-9]/.test(ch)) preserved++;
    }
  }
  return { output: out.join(""), preservedCount: 0 };
}

// ─── Tiny Text ─────────────────────────────────────────────────

const SUPERSCRIPT_MAP = zipMap([
  ["a", "ᵃ"], ["b", "ᵇ"], ["c", "ᶜ"], ["d", "ᵈ"], ["e", "ᵉ"], ["f", "ᶠ"], ["g", "ᵍ"],
  ["h", "ʰ"], ["i", "ⁱ"], ["j", "ʲ"], ["k", "ᵏ"], ["l", "ˡ"], ["m", "ᵐ"], ["n", "ⁿ"],
  ["o", "ᵒ"], ["p", "ᵖ"], ["r", "ʳ"], ["s", "ˢ"], ["t", "ᵗ"], ["u", "ᵘ"], ["v", "ᵛ"],
  ["w", "ʷ"], ["x", "ˣ"], ["y", "ʸ"], ["z", "ᶻ"],
  ["A", "ᴬ"], ["B", "ᴮ"], ["D", "ᴰ"], ["E", "ᴱ"], ["G", "ᴳ"], ["H", "ᴴ"], ["I", "ᴵ"],
  ["J", "ᴶ"], ["K", "ᴷ"], ["L", "ᴸ"], ["M", "ᴹ"], ["N", "ᴺ"], ["O", "ᴼ"], ["P", "ᴾ"],
  ["R", "ᴿ"], ["T", "ᵀ"], ["U", "ᵁ"], ["V", "ⱽ"], ["W", "ᵂ"],
  ["0", "⁰"], ["1", "¹"], ["2", "²"], ["3", "³"], ["4", "⁴"], ["5", "⁵"],
  ["6", "⁶"], ["7", "⁷"], ["8", "⁸"], ["9", "⁹"],
  ["+", "⁺"], ["-", "⁻"], ["=", "⁼"], ["(", "⁽"], [")", "⁾"],
]);

const SUBSCRIPT_MAP = zipMap([
  ["a", "ₐ"], ["e", "ₑ"], ["h", "ₕ"], ["i", "ᵢ"], ["j", "ⱼ"], ["k", "ₖ"], ["l", "ₗ"],
  ["m", "ₘ"], ["n", "ₙ"], ["o", "ₒ"], ["p", "ₚ"], ["r", "ᵣ"], ["s", "ₛ"], ["t", "ₜ"],
  ["u", "ᵤ"], ["v", "ᵥ"], ["x", "ₓ"],
  ["0", "₀"], ["1", "₁"], ["2", "₂"], ["3", "₃"], ["4", "₄"], ["5", "₅"],
  ["6", "₆"], ["7", "₇"], ["8", "₈"], ["9", "₉"],
  ["+", "₊"], ["-", "₋"], ["=", "₌"], ["(", "₍"], [")", "₎"],
]);

export function tinyText(text: string, mode: "superscript" | "subscript"): TransformResult {
  const map = mode === "superscript" ? SUPERSCRIPT_MAP : SUBSCRIPT_MAP;
  let preserved = 0;
  let out = "";
  for (const ch of text) {
    const mapped = map[ch];
    if (mapped) {
      out += mapped;
    } else {
      out += ch;
      if (ch !== " " && ch !== "\n") preserved++;
    }
  }
  return { output: out, preservedCount: preserved };
}

// ─── Strikethrough ─────────────────────────────────────────────

export type StrikeStyle = "single" | "short" | "underline";

const STRIKE_MARKS: Record<StrikeStyle, string> = {
  single: "\u0336",
  short: "\u0335",
  underline: "\u0332",
};

export function strikeText(text: string, style: StrikeStyle): string {
  const mark = STRIKE_MARKS[style] || STRIKE_MARKS.single;
  return Array.from(text)
    .map((ch) => (/\s/.test(ch) ? ch : ch + mark))
    .join("");
}

// ─── Invisible Text ────────────────────────────────────────────

export type InvisibleChar = "zwsp" | "zwnj" | "wordJoiner" | "braille";

const INVISIBLE_CHARS: Record<InvisibleChar, { char: string; label: string }> = {
  zwsp: { char: "\u200B", label: "Zero Width Space (U+200B)" },
  zwnj: { char: "\u200C", label: "Zero Width Non-Joiner (U+200C)" },
  wordJoiner: { char: "\u2060", label: "Word Joiner (U+2060)" },
  braille: { char: "\u2800", label: "Braille Blank (U+2800)" },
};

export function invisibleText(count: number, kind: InvisibleChar): string {
  const info = INVISIBLE_CHARS[kind] || INVISIBLE_CHARS.zwsp;
  return info.char.repeat(Math.max(1, Math.min(500, count)));
}

export function getInvisibleCharInfo(kind: InvisibleChar): string {
  return (INVISIBLE_CHARS[kind] || INVISIBLE_CHARS.zwsp).label;
}
