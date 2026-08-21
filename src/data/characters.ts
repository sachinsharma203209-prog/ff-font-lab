export interface UnicodeChar {
  char: string;
  name: string;
  codepoint: string;
}

export interface CharacterCategoryData {
  id: string;
  name: string;
  slug: string;
  icon: string;
  shortDescription: string;
  description: string[];
  relatedCategories: string[];
  relatedTools: Array<{ title: string; href: string }>;
  faqs: Array<{ question: string; answer: string }>;
  chars: UnicodeChar[];
}

const cp = (char: string): string => {
  const code = char.codePointAt(0);
  return code !== undefined ? `U+${code.toString(16).toUpperCase().padStart(4, "0")}` : "";
};

function named(chars: Array<[string, string]>): UnicodeChar[] {
  return chars.map(([char, name]) => ({ char, name, codepoint: cp(char) }));
}

function latinCase(prefix: string, start: number, count: number): UnicodeChar[] {
  const out: UnicodeChar[] = [];
  for (let i = 0; i < count; i++) {
    const char = String.fromCodePoint(start + i);
    out.push({ char, name: `${prefix} ${String.fromCharCode(65 + i)}`, codepoint: cp(char) });
  }
  return out;
}

function digitSet(prefix: string, chars: string): UnicodeChar[] {
  const labels = ["ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"];
  return chars.split("").map((char, i) => ({ char, name: `${prefix} ${labels[i]}`, codepoint: cp(char) }));
}

const asciiUpper = latinCase("LATIN CAPITAL LETTER", 65, 26);
const asciiLower = latinCase("LATIN SMALL LETTER", 97, 26);

const lettersCategory: CharacterCategoryData = {
  id: "letters",
  name: "Letters",
  slug: "letters",
  icon: "text_fields",
  shortDescription: "Latin alphabet letters A–Z and a–z with Unicode names and code points.",
  description: [
    "The Latin alphabet is the foundation of every font changer style. Each letter exists as a plain Unicode character, and most stylish fonts are simply alternate Unicode versions of these same letters.",
    "Use this reference to look up any letter, copy it instantly, and find its official Unicode name and code point.",
  ],
  relatedCategories: ["numbers", "superscript", "subscript"],
  relatedTools: [
    { title: "Letter Generator", href: "/tools/letter-generator" },
    { title: "Text Converter", href: "/tools/text-converter" },
    { title: "Font Changer", href: "/" },
  ],
  faqs: [
    { question: "Are styled letters different characters?", answer: "Yes. A bold 𝐀 or cursive 𝒜 is a completely separate Unicode character from the plain letter A, even though it represents the same letter. That is why styled text can be pasted anywhere plain text is accepted." },
    { question: "Where can I see one letter in many styles?", answer: "Open the Letter Generator to view a single letter rendered in every supported style side by side." },
  ],
  chars: [...asciiUpper, ...asciiLower],
};

const numbersCategory: CharacterCategoryData = {
  id: "numbers",
  name: "Numbers",
  slug: "numbers",
  icon: "pin",
  shortDescription: "Digits 0–9 plus circled, fullwidth, superscript and subscript number variants.",
  description: [
    "Numbers have fewer Unicode style variants than letters, but several useful sets exist: circled digits, fullwidth digits, superscripts and subscripts.",
    "Not every font style includes digits — styles without a digit set keep your original numbers unchanged when converting text.",
  ],
  relatedCategories: ["superscript", "subscript", "letters"],
  relatedTools: [
    { title: "Number Generator", href: "/tools/number-generator" },
    { title: "Text Converter", href: "/tools/text-converter" },
  ],
  faqs: [
    { question: "Why do some font styles leave my numbers unchanged?", answer: "Unicode only defines styled variants where mathematicians needed them. Sets such as Fraktur and Script have no digits, so converters preserve the original numbers instead of producing invalid output." },
    { question: "What are circled numbers used for?", answer: "Circled digits ①–⑨ are popular for step-by-step lists, bios and usernames because they render at the same size as normal text." },
  ],
  chars: [
    ...digitSet("DIGIT", "0123456789"),
    ...digitSet("CIRCLED DIGIT", "①②③④⑤⑥⑦⑧⑨⑩"),
    ...digitSet("FULLWIDTH DIGIT", "０１２３４５６７８９"),
    ...digitSet("SUPERSCRIPT", "⁰¹²³⁴⁵⁶⁷⁸⁹"),
    ...digitSet("SUBSCRIPT", "₀₁₂₃₄₅₆₇₈₉"),
    ...digitSet("MATHEMATICAL BOLD DIGIT", "𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"),
    ...digitSet("MATHEMATICAL DOUBLE-STRUCK DIGIT", "𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡"),
    ...digitSet("MATHEMATICAL MONOSPACE DIGIT", "𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿"),
  ],
};

const mathCategory: CharacterCategoryData = {
  id: "math",
  name: "Mathematical",
  slug: "math",
  icon: "function",
  shortDescription: "Math symbols — operators, set notation, Greek letters and number-set characters with code points.",
  description: [
    "Mathematical symbols are the origin of most fancy text styles — the Unicode Mathematical Alphanumeric block was designed for equations, which is why it covers the whole alphabet.",
    "These operators and constants are also widely used as decorative symbols in bios, usernames and messages.",
  ],
  relatedCategories: ["letters", "numbers", "technical"],
  relatedTools: [
    { title: "Character Generator", href: "/tools/character-generator" },
    { title: "Infinity Symbol", href: "/symbols/infinity-symbol" },
  ],
  faqs: [
    { question: "Do math symbols work on social media?", answer: "Most do. Common operators like ± × ÷ ≈ and ∞ are part of core Unicode and render on virtually every modern device." },
    { question: "Why does the infinity symbol appear here?", answer: "∞ comes from the mathematical operators block, so it is grouped with math even though it is also a popular decorative symbol." },
  ],
  chars: named([
    ["±", "PLUS-MINUS SIGN"], ["×", "MULTIPLICATION SIGN"], ["÷", "DIVISION SIGN"], ["¬", "NOT SIGN"],
    ["√", "SQUARE ROOT"], ["∑", "N-ARY SUMMATION"], ["∏", "N-ARY PRODUCT"], ["∫", "INTEGRAL"],
    ["≈", "ALMOST EQUAL TO"], ["≠", "NOT EQUAL TO"], ["≤", "LESS-THAN OR EQUAL TO"], ["≥", "GREATER-THAN OR EQUAL TO"],
    ["∞", "INFINITY"], ["∂", "PARTIAL DIFFERENTIAL"], ["∆", "INCREMENT"], ["Π", "GREEK CAPITAL LETTER PI"],
    ["π", "GREEK SMALL LETTER PI"], ["µ", "MICRO SIGN"], ["Ω", "GREEK CAPITAL LETTER OMEGA"], ["°", "DEGREE SIGN"],
    ["′", "PRIME"], ["″", "DOUBLE PRIME"], ["∈", "ELEMENT OF"], ["∉", "NOT AN ELEMENT OF"],
    ["⊂", "SUBSET OF"], ["⊃", "SUPERSET OF"], ["∪", "UNION"], ["∩", "INTERSECTION"],
    ["∅", "EMPTY SET"], ["∀", "FOR ALL"], ["∃", "THERE EXISTS"], ["ℕ", "DOUBLE-STRUCK CAPITAL N"],
    ["ℤ", "DOUBLE-STRUCK CAPITAL Z"], ["ℚ", "DOUBLE-STRUCK CAPITAL Q"], ["ℝ", "DOUBLE-STRUCK CAPITAL R"], ["ℂ", "DOUBLE-STRUCK CAPITAL C"],
    ["⊥", "UP TACK"], ["∥", "PARALLEL TO"], ["∝", "PROPORTIONAL TO"], ["∴", "THEREFORE"],
  ]),
};

const arrowsCategory: CharacterCategoryData = {
  id: "arrows",
  name: "Arrows",
  slug: "arrows",
  icon: "arrow_forward",
  shortDescription: "Directional arrows for pointers, links, menus and decorative dividers.",
  description: [
    "Arrows are among the most copied Unicode symbols. They work as visual pointers in bios, list bullets, menu separators and call-to-action lines.",
    "All arrows here are single Unicode characters, so they paste cleanly into any text field.",
  ],
  relatedCategories: ["shapes", "miscellaneous", "punctuation"],
  relatedTools: [
    { title: "Arrow Symbol Guide", href: "/symbols/arrow-symbol" },
    { title: "Character Generator", href: "/tools/character-generator" },
  ],
  faqs: [
    { question: "Which arrow should I use in an Instagram bio?", answer: "Simple arrows like → ➜ ➤ render reliably everywhere and keep their shape on both iOS and Android." },
    { question: "Do arrow emojis count as two characters?", answer: "Some emoji-style arrows are followed by an invisible variation selector. The plain text arrows listed here are always a single character." },
  ],
  chars: named([
    ["←", "LEFTWARDS ARROW"], ["→", "RIGHTWARDS ARROW"], ["↑", "UPWARDS ARROW"], ["↓", "DOWNWARDS ARROW"],
    ["↔", "LEFT RIGHT ARROW"], ["↕", "UP DOWN ARROW"], ["↖", "NORTH WEST ARROW"], ["↗", "NORTH EAST ARROW"],
    ["↘", "SOUTH EAST ARROW"], ["↙", "SOUTH WEST ARROW"], ["⇐", "LEFTWARDS DOUBLE ARROW"], ["⇒", "RIGHTWARDS DOUBLE ARROW"],
    ["⇑", "UPWARDS DOUBLE ARROW"], ["⇓", "DOWNWARDS DOUBLE ARROW"], ["⇔", "LEFT RIGHT DOUBLE ARROW"], ["↦", "RIGHTWARDS ARROW FROM BAR"],
    ["↰", "LEFTWARDS ARROW WITH HOOK"], ["↱", "RIGHTWARDS ARROW WITH HOOK"], ["↻", "CLOCKWISE OPEN CIRCLE ARROW"], ["↺", "ANTICLOCKWISE OPEN CIRCLE ARROW"],
    ["⇦", "LEFTWARDS WHITE ARROW"], ["⇨", "RIGHTWARDS WHITE ARROW"], ["⬅", "LEFTWARDS BLACK ARROW"], ["➡", "RIGHTWARDS BLACK ARROW"],
    ["⬆", "UPWARDS BLACK ARROW"], ["⬇", "DOWNWARDS BLACK ARROW"], ["➜", "HEAVY ROUND-TIPPED RIGHTWARDS ARROW"], ["➔", "HEAVY WIDE-HEADED RIGHTWARDS ARROW"],
    ["➤", "BLACK RIGHTWARDS ARROWHEAD"], ["⤴", "ARROW POINTING RIGHTWARDS THEN CURVING UPWARDS"], ["⤵", "ARROW POINTING RIGHTWARDS THEN CURVING DOWNWARDS"], ["↩", "LEFTWARDS ARROW WITH HOOK"],
  ]),
};

const heartsCategory: CharacterCategoryData = {
  id: "hearts",
  name: "Hearts",
  slug: "hearts",
  icon: "favorite",
  shortDescription: "Heart symbols ♥ ♡ and heart emojis for bios, nicknames and messages — text vs emoji explained.",
  description: [
    "Hearts are the most searched-for symbol family. Text hearts like ♥ and ♡ render in the platform's own font, while colored heart emojis render as images.",
    "Text hearts are safer inside usernames and styled text because they inherit the surrounding font style.",
    "Here is the practical difference. Paste ♥ into a Free Fire nickname and it stays crisp at every size. Paste ❤️ into the same field and some games strip it or show a fallback box, because emoji support inside usernames is inconsistent.",
    "A quick rule of thumb: if you are decorating a bio or caption, emojis are fine. If you are building a username, gamertag or styled font text, stick to the plain text hearts at the top of this list.",
    "Pairing works well too. A single ♡ after a cursive name reads subtle; three hearts in a row reads loud. Choose based on where the name will live.",
  ],
  relatedCategories: ["stars", "shapes", "miscellaneous"],
  relatedTools: [
    { title: "Heart Symbol Guide", href: "/symbols/heart-symbol" },
    { title: "Cute Symbols", href: "/characters/miscellaneous" },
  ],
  faqs: [
    { question: "What is the difference between ♥ and ❤️?", answer: "♥ is a text character that follows your font's color and style. ❤️ is an emoji that always renders as a red heart image regardless of styling." },
    { question: "Can I use hearts in my username?", answer: "On most platforms yes — ♥ ♡ ❥ are accepted almost everywhere emojis sometimes are not." },
  ],
  chars: named([
    ["♥", "BLACK HEART SUIT"], ["♡", "WHITE HEART SUIT"], ["❤", "HEAVY BLACK HEART"], ["❥", "ROTATED HEAVY BLACK HEART BULLET"],
    ["❣", "HEAVY HEART EXCLAMATION MARK ORNAMENT"], ["💕", "TWO HEARTS"], ["💖", "SPARKLING HEART"], ["💘", "HEART WITH ARROW"],
    ["💙", "BLUE HEART"], ["💚", "GREEN HEART"], ["💛", "YELLOW HEART"], ["🧡", "ORANGE HEART"],
    ["💜", "PURPLE HEART"], ["🖤", "BLACK HEART"], ["🤍", "WHITE HEART"], ["💔", "BROKEN HEART"],
    ["❦", "FLORAL HEART"], ["❧", "ROTATED FLORAL HEART BULLET"],
  ]),
};

const starsCategory: CharacterCategoryData = {
  id: "stars",
  name: "Stars",
  slug: "stars",
  icon: "star",
  shortDescription: "Star symbols from outline ☆ to filled ★ plus sparkles ✨ — copy stars for bios, ratings and usernames.",
  description: [
    "Stars range from tiny five-point outlines to glowing emoji sparkles. They are a favorite for aesthetic bios, rating displays and username decorations.",
    "Mix outline stars (☆ ✦) with filled stars (★ ⭐) to create contrast in decorative text.",
    "Not every star is equal. ★ and ☆ have existed since the earliest Unicode blocks, so they render on virtually every phone, game and browser. The fancier four-pointed stars like ✦ and ✧ come from the dingbats block and are almost as reliable.",
    "The emoji stars — ⭐ 🌟 ✨ — are a different story. They always render in full color, ignore your font style, and occasionally get filtered out of usernames entirely. Discord allows them in display names; some games do not.",
    "One more tip: stars pair naturally with divider lines. A row like ─── ⋆ ─── uses nothing but two characters repeated, and it survives copy-paste into any plain-text field.",
  ],
  relatedCategories: ["hearts", "shapes", "miscellaneous"],
  relatedTools: [
    { title: "Star Symbol Guide", href: "/symbols/star-symbol" },
    { title: "Aesthetic Text Generator", href: "/styles/aesthetic-text-generator" },
  ],
  faqs: [
    { question: "Which star works best in a username?", answer: "★ and ☆ are the safest choices — they are plain text characters supported by nearly every platform." },
    { question: "Do sparkles ✨ work in styled text?", answer: "✨ is an emoji, so it keeps its own colorful appearance next to any Unicode font style." },
  ],
  chars: named([
    ["★", "BLACK STAR"], ["☆", "WHITE STAR"], ["✦", "FOUR POINTED STAR"], ["✧", "WHITE FOUR POINTED STAR"],
    ["✩", "STRESS OUTLINED WHITE STAR"], ["✪", "CIRCLED WHITE STAR"], ["✫", "OPEN CENTRE BLACK STAR"], ["✬", "BLACK CENTRE WHITE STAR"],
    ["✭", "OUTLINED BLACK STAR"], ["✮", "HEAVY OUTLINED BLACK STAR"], ["✯", "PINWHEEL STAR"], ["✰", "SHADOWED WHITE STAR"],
    ["⋆", "STAR OPERATOR"], ["⭐", "WHITE MEDIUM STAR"], ["🌟", "GLOWING STAR"], ["✨", "SPARKLES"],
    ["💫", "DIZZY"], ["☄", "COMET"],
  ]),
};

const shapesCategory: CharacterCategoryData = {
  id: "shapes",
  name: "Shapes",
  slug: "shapes",
  icon: "category",
  shortDescription: "Geometric shapes — squares, circles, triangles, diamonds and block elements for dividers and layouts.",
  description: [
    "Geometric shapes are perfect for building dividers, bullet lists and minimal aesthetic layouts using nothing but text.",
    "Filled and outlined pairs (■ □, ● ○) let you create on/off indicators, progress bars and patterns.",
    "The block elements at the bottom of this list — █ ▓ ▒ ░ — deserve a special mention. Repeated in a row they draw solid bars and gradients, which is how people build text-based loading bars and pixel-art borders in Discord messages.",
    "Alignment is the one thing to watch. Shapes sit on different baselines depending on the font, so a row of mixed shapes can look slightly uneven. Test your pattern once in the app where it will actually appear before committing to it.",
    "Circles and squares also work as bullet points when standard dashes feel too plain. ● reads heavier; ○ reads lighter. Small squares ▪ ▫ sit neatly against lowercase text.",
  ],
  relatedCategories: ["arrows", "stars", "technical"],
  relatedTools: [
    { title: "Character Generator", href: "/tools/character-generator" },
    { title: "Aesthetic Text Generator", href: "/styles/aesthetic-text-generator" },
  ],
  faqs: [
    { question: "How do people make aesthetic dividers?", answer: "By repeating shape characters like ┊ ─ ▫ ● between spaces. Try combining them with fullwidth text for a vaporwave layout." },
    { question: "Will shapes align on every device?", answer: "Basic geometric shapes render consistently, but exact glyph design varies slightly by platform font." },
  ],
  chars: named([
    ["■", "BLACK SQUARE"], ["□", "WHITE SQUARE"], ["▪", "BLACK SMALL SQUARE"], ["▫", "WHITE SMALL SQUARE"],
    ["●", "BLACK CIRCLE"], ["○", "WHITE CIRCLE"], ["◐", "CIRCLE WITH LEFT HALF BLACK"], ["◑", "CIRCLE WITH RIGHT HALF BLACK"],
    ["▲", "BLACK UP-POINTING TRIANGLE"], ["△", "WHITE UP-POINTING TRIANGLE"], ["▼", "BLACK DOWN-POINTING TRIANGLE"], ["▽", "WHITE DOWN-POINTING TRIANGLE"],
    ["◆", "BLACK DIAMOND"], ["◇", "WHITE DIAMOND"], ["◈", "WHITE DIAMOND CONTAINING BLACK SMALL DIAMOND"], ["◊", "LOZENGE"],
    ["█", "FULL BLOCK"], ["▓", "DARK SHADE"], ["▒", "MEDIUM SHADE"], ["░", "LIGHT SHADE"],
    ["🔶", "LARGE ORANGE DIAMOND"], ["🔷", "LARGE BLUE DIAMOND"], ["🔴", "RED CIRCLE"], ["🔵", "BLUE CIRCLE"],
    ["⬟", "BLACK PENTAGON"], ["⬢", "BLACK HEXAGON"], ["⬡", "WHITE HEXAGON"],
  ]),
};

const currencyCategory: CharacterCategoryData = {
  id: "currency",
  name: "Currency",
  slug: "currency",
  icon: "payments",
  shortDescription: "World currency signs — dollar, euro, rupee, yen, bitcoin and more, with Unicode names and support notes.",
  description: [
    "Currency symbols are fully supported Unicode characters used in prices, financial content and usernames with a money theme.",
    "Newer signs like ₿ (bitcoin) may not render on very old systems, while classics like $ € £ ¥ work everywhere.",
    "For traders, crypto pages and finance creators, the newer signs carry real meaning: ₹ for rupee pricing, ₽ for ruble, ₺ for lira. Each was added in a specific Unicode version, which is exactly why support varies — ₿ arrived in Unicode 10 (2017), so a device that stopped updating before then simply has no glyph for it.",
    "If you need guaranteed rendering, $ is still the safest character on this page. It exists in ASCII itself, meaning every system ever built can display it.",
    "These signs also combine well with styled text. A bold 𝐏𝐫𝐢𝐜𝐞 followed by ₹ or $ keeps the currency symbol readable while the word around it changes style — currency signs have no styled variants of their own.",
  ],
  relatedCategories: ["punctuation", "math", "miscellaneous"],
  relatedTools: [
    { title: "Copyright Symbol Guide", href: "/symbols/copyright-symbol" },
    { title: "Character Generator", href: "/tools/character-generator" },
  ],
  faqs: [
    { question: "Is there a bitcoin symbol?", answer: "Yes — ₿ was added to Unicode 10. It renders on all modern devices but may show as a box on outdated systems." },
    { question: "Can currency signs be styled?", answer: "Currency signs themselves have no styled variants, but they can be combined freely with any Unicode font style around them." },
  ],
  chars: named([
    ["$", "DOLLAR SIGN"], ["¢", "CENT SIGN"], ["£", "POUND SIGN"], ["¤", "CURRENCY SIGN"],
    ["¥", "YEN SIGN"], ["€", "EURO SIGN"], ["₹", "INDIAN RUPEE SIGN"], ["₽", "RUBLE SIGN"],
    ["₩", "WON SIGN"], ["₫", "DONG SIGN"], ["₿", "BITCOIN SIGN"], ["₺", "TURKISH LIRA SIGN"],
    ["₴", "HRYVNIA SIGN"], ["₱", "PESO SIGN"], ["₡", "COLON SIGN"], ["₲", "GUARANI SIGN"],
    ["₭", "KIP SIGN"], ["₦", "NAIRA SIGN"], ["﷼", "RIAL SIGN"],
  ]),
};

const punctuationCategory: CharacterCategoryData = {
  id: "punctuation",
  name: "Punctuation",
  slug: "punctuation",
  icon: "more_horiz",
  shortDescription: "Typographic punctuation — em dashes, curly quotes, bullets, section marks and elegant ornaments.",
  description: [
    "Typographic punctuation adds polish to headings, bios and posts — proper dashes, curly quotes, elegant bullets and section marks.",
    "These characters are part of general punctuation blocks and render reliably across platforms.",
  ],
  relatedCategories: ["currency", "miscellaneous", "letters"],
  relatedTools: [
    { title: "Trademark Symbol Guide", href: "/symbols/trademark-symbol" },
    { title: "Check Mark Symbol Guide", href: "/symbols/check-mark-symbol" },
  ],
  faqs: [
    { question: "What is the difference between -, – and —?", answer: "They are three distinct characters: hyphen-minus, en dash and em dash. The em dash — is longest and most common in stylish writing." },
    { question: "Are curly quotes safe to paste anywhere?", answer: "Yes. “ ” ‘ ’ are standard Unicode and behave exactly like straight quotes in every text field." },
  ],
  chars: named([
    ["…", "HORIZONTAL ELLIPSIS"], ["–", "EN DASH"], ["—", "EM DASH"], ["―", "HORIZONTAL BAR"],
    ["«", "LEFT-POINTING DOUBLE ANGLE QUOTATION MARK"], ["»", "RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK"], ["‹", "SINGLE LEFT-POINTING ANGLE QUOTATION MARK"], ["›", "SINGLE RIGHT-POINTING ANGLE QUOTATION MARK"],
    ["“", "LEFT DOUBLE QUOTATION MARK"], ["”", "RIGHT DOUBLE QUOTATION MARK"], ["‘", "LEFT SINGLE QUOTATION MARK"], ["’", "RIGHT SINGLE QUOTATION MARK"],
    ["„", "DOUBLE LOW-9 QUOTATION MARK"], ["‚", "SINGLE LOW-9 QUOTATION MARK"], ["¡", "INVERTED EXCLAMATION MARK"], ["¿", "INVERTED QUESTION MARK"],
    ["•", "BULLET"], ["‣", "TRIANGULAR BULLET"], ["·", "MIDDLE DOT"], ["§", "SECTION SIGN"],
    ["¶", "PILCROW SIGN"], ["©", "COPYRIGHT SIGN"], ["®", "REGISTERED SIGN"], ["™", "TRADEMARK SYMBOL"],
    ["†", "DAGGER"], ["‡", "DOUBLE DAGGER"], ["❝", "HEAVY DOUBLE TURNED COMMA QUOTATION MARK ORNAMENT"], ["❞", "HEAVY DOUBLE COMMA QUOTATION MARK ORNAMENT"],
  ]),
};

const superscriptCategory: CharacterCategoryData = {
  id: "superscript",
  name: "Superscripts",
  slug: "superscript",
  icon: "north_east",
  shortDescription: "Superscript letters and numbers ᵃ¹² for tiny text, exponents, footnotes and raised-style writing.",
  description: [
    "Superscript characters render smaller and raised above the baseline. They power tiny-text generators and real exponents like x².",
    "Coverage is partial — not every Latin letter has a superscript form, which is why tiny text tools preserve unsupported letters.",
  ],
  relatedCategories: ["subscript", "numbers", "letters"],
  relatedTools: [
    { title: "Tiny Text Tool", href: "/tools/tiny-text" },
    { title: "Number Generator", href: "/tools/number-generator" },
  ],
  faqs: [
    { question: "Why is there no superscript q?", answer: "Unicode never defined one. Superscript letters were added individually over time, so a few letters like q and capital C simply do not exist in superscript form." },
    { question: "Can I make my whole bio tiny?", answer: "Only if it avoids letters without superscript forms. The Tiny Text tool automatically keeps missing letters normal-sized." },
  ],
  chars: named([
    ["⁰", "SUPERSCRIPT ZERO"], ["¹", "SUPERSCRIPT ONE"], ["²", "SUPERSCRIPT TWO"], ["³", "SUPERSCRIPT THREE"],
    ["⁴", "SUPERSCRIPT FOUR"], ["⁵", "SUPERSCRIPT FIVE"], ["⁶", "SUPERSCRIPT SIX"], ["⁷", "SUPERSCRIPT SEVEN"],
    ["⁸", "SUPERSCRIPT EIGHT"], ["⁹", "SUPERSCRIPT NINE"], ["⁺", "SUPERSCRIPT PLUS SIGN"], ["⁻", "SUPERSCRIPT MINUS"],
    ["⁼", "SUPERSCRIPT EQUALS SIGN"], ["⁽", "SUPERSCRIPT LEFT PARENTHESIS"], ["⁾", "SUPERSCRIPT RIGHT PARENTHESIS"],
    ["ᵃ", "MODIFIER LETTER SMALL A"], ["ᵇ", "MODIFIER LETTER SMALL B"], ["ᶜ", "MODIFIER LETTER SMALL C"], ["ᵈ", "MODIFIER LETTER SMALL D"],
    ["ᵉ", "MODIFIER LETTER SMALL E"], ["ᶠ", "MODIFIER LETTER SMALL F"], ["ᵍ", "MODIFIER LETTER SMALL G"], ["ʰ", "MODIFIER LETTER SMALL H"],
    ["ⁱ", "MODIFIER LETTER SMALL I"], ["ʲ", "MODIFIER LETTER SMALL J"], ["ᵏ", "MODIFIER LETTER SMALL K"], ["ˡ", "MODIFIER LETTER SMALL L"],
    ["ᵐ", "MODIFIER LETTER SMALL M"], ["ⁿ", "SUPERSCRIPT LATIN SMALL LETTER N"], ["ᵒ", "MODIFIER LETTER SMALL O"], ["ᵖ", "MODIFIER LETTER SMALL P"],
    ["ʳ", "MODIFIER LETTER SMALL R"], ["ˢ", "MODIFIER LETTER SMALL S"], ["ᵗ", "MODIFIER LETTER SMALL T"], ["ᵘ", "MODIFIER LETTER SMALL U"],
    ["ᵛ", "MODIFIER LETTER SMALL V"], ["ʷ", "MODIFIER LETTER SMALL W"], ["ˣ", "MODIFIER LETTER SMALL X"], ["ʸ", "MODIFIER LETTER SMALL Y"],
    ["ᶻ", "MODIFIER LETTER SMALL Z"], ["ᴬ", "MODIFIER LETTER CAPITAL A"], ["ᴮ", "MODIFIER LETTER CAPITAL B"], ["ᴰ", "MODIFIER LETTER CAPITAL D"],
    ["ᴱ", "MODIFIER LETTER CAPITAL E"], ["ᴳ", "MODIFIER LETTER CAPITAL G"], ["ᴴ", "MODIFIER LETTER CAPITAL H"], ["ᴵ", "MODIFIER LETTER CAPITAL I"],
    ["ᴶ", "MODIFIER LETTER CAPITAL J"], ["ᴷ", "MODIFIER LETTER CAPITAL K"], ["ᴸ", "MODIFIER LETTER CAPITAL L"], ["ᴹ", "MODIFIER LETTER CAPITAL M"],
    ["ᴺ", "MODIFIER LETTER CAPITAL N"], ["ᴼ", "MODIFIER LETTER CAPITAL O"], ["ᴾ", "MODIFIER LETTER CAPITAL P"], ["ᴿ", "MODIFIER LETTER CAPITAL R"],
    ["ᵀ", "MODIFIER LETTER CAPITAL T"], ["ᵁ", "MODIFIER LETTER CAPITAL U"], ["ⱽ", "MODIFIER LETTER CAPITAL V"], ["ᵂ", "MODIFIER LETTER CAPITAL W"],
  ]),
};

const subscriptCategory: CharacterCategoryData = {
  id: "subscript",
  name: "Subscripts",
  slug: "subscript",
  icon: "south_east",
  shortDescription: "Subscript letters and numbers ₐ₁₂ for chemical formulas like H₂O, math indexes and small text.",
  description: [
    "Subscript characters sit below the baseline. They are essential for formulas like H₂O and give a subtle small-text effect.",
    "Like superscripts, subscripts cover a limited letter set — unsupported characters stay unchanged during conversion.",
  ],
  relatedCategories: ["superscript", "numbers", "letters"],
  relatedTools: [
    { title: "Tiny Text Tool", href: "/tools/tiny-text" },
    { title: "Number Generator", href: "/tools/number-generator" },
  ],
  faqs: [
    { question: "How do I write H₂O?", answer: "Type H, then copy the subscript ₂ from this page, then O. Or just type H2O into the Tiny Text tool with subscript mode." },
    { question: "Which letters have subscript forms?", answer: "Only a subset: a, e, h, i, j, k, l, m, n, o, p, r, s, t, u, v, x plus all digits. Everything else stays normal." },
  ],
  chars: named([
    ["₀", "SUBSCRIPT ZERO"], ["₁", "SUBSCRIPT ONE"], ["₂", "SUBSCRIPT TWO"], ["₃", "SUBSCRIPT THREE"],
    ["₄", "SUBSCRIPT FOUR"], ["₅", "SUBSCRIPT FIVE"], ["₆", "SUBSCRIPT SIX"], ["₇", "SUBSCRIPT SEVEN"],
    ["₈", "SUBSCRIPT EIGHT"], ["₉", "SUBSCRIPT NINE"], ["₊", "SUBSCRIPT PLUS SIGN"], ["₋", "SUBSCRIPT MINUS"],
    ["₌", "SUBSCRIPT EQUALS SIGN"], ["₍", "SUBSCRIPT LEFT PARENTHESIS"], ["₎", "SUBSCRIPT RIGHT PARENTHESIS"],
    ["ₐ", "LATIN SUBSCRIPT SMALL LETTER A"], ["ₑ", "LATIN SUBSCRIPT SMALL LETTER E"], ["ₕ", "LATIN SUBSCRIPT SMALL LETTER H"], ["ᵢ", "LATIN SUBSCRIPT SMALL LETTER I"],
    ["ⱼ", "LATIN SUBSCRIPT SMALL LETTER J"], ["ₖ", "LATIN SUBSCRIPT SMALL LETTER K"], ["ₗ", "LATIN SUBSCRIPT SMALL LETTER L"], ["ₘ", "LATIN SUBSCRIPT SMALL LETTER M"],
    ["ₙ", "LATIN SUBSCRIPT SMALL LETTER N"], ["ₒ", "LATIN SUBSCRIPT SMALL LETTER O"], ["ₚ", "LATIN SUBSCRIPT SMALL LETTER P"], ["ᵣ", "LATIN SUBSCRIPT SMALL LETTER R"],
    ["ₛ", "LATIN SUBSCRIPT SMALL LETTER S"], ["ₜ", "LATIN SUBSCRIPT SMALL LETTER T"], ["ᵤ", "LATIN SUBSCRIPT SMALL LETTER U"], ["ᵥ", "LATIN SUBSCRIPT SMALL LETTER V"],
    ["ₓ", "LATIN SUBSCRIPT SMALL LETTER X"],
  ]),
};

const technicalCategory: CharacterCategoryData = {
  id: "technical",
  name: "Technical Symbols",
  slug: "technical",
  icon: "settings",
  shortDescription: "Technical symbols — keyboard keys ⌘ ⌥, power signs, warnings ⚠ and tech icons for profiles and servers.",
  description: [
    "Technical symbols include keyboard modifiers (⌘ ⌥ ⇧), status icons (⚡ ⚙) and warning signs (⚠ ☢).",
    "They give profiles and server names a techy, hacker or engineering aesthetic.",
    "The keyboard symbols come from Apple's old technical block, which is why ⌘ ⌥ ⌫ feel native to Mac users and slightly exotic to everyone else. That contrast is part of the appeal — a Discord server named with ⌥ or ⇧ instantly reads as developer culture.",
    "Honest warning: this category has the widest support gap of any on the site. ⚙ and ⚡ render almost everywhere, but ⎋ and ␣ are missing from many Android fonts. If your audience is mostly mobile, test before you commit.",
    "For server roles and channel names, the status icons work best: ⚙ for settings channels, 🔒 for private ones, ⚠ for rules. Readers parse them at a glance without any explanation.",
  ],
  relatedCategories: ["shapes", "math", "miscellaneous"],
  relatedTools: [
    { title: "Monospace Text Generator", href: "/styles/monospace-text-generator" },
    { title: "Character Generator", href: "/tools/character-generator" },
  ],
  faqs: [
    { question: "Does ⌘ mean Command?", answer: "Yes — it is the Place of Interest Sign, famously used as the Command key symbol on Apple keyboards." },
    { question: "Why do some technical symbols show as boxes?", answer: "Older system fonts lack glyphs for rarer symbols. If a character shows as □, the viewer's device simply has no glyph for it." },
  ],
  chars: named([
    ["⌘", "PLACE OF INTEREST SIGN"], ["⌥", "OPTION KEY"], ["⇧", "UPWARDS WHITE ARROW"], ["⌫", "ERASE TO THE LEFT"],
    ["⏎", "RETURN SYMBOL"], ["⎋", "BREAKING CONTROL CHARACTER"], ["␣", "OPEN BOX"], ["⌂", "HOUSE"],
    ["⚙", "GEAR"], ["⚡", "HIGH VOLTAGE SIGN"], ["⚠", "WARNING SIGN"], ["⛔", "NO ENTRY"],
    ["☢", "RADIOACTIVE SIGN"], ["☣", "BIOHAZARD SIGN"], ["♻", "BLACK UNIVERSAL RECYCLING SYMBOL"], ["🔒", "LOCK"],
    ["🔓", "OPEN LOCK"], ["🔋", "BATTERY"], ["💻", "PERSONAL COMPUTER"], ["🖥", "DESKTOP COMPUTER"],
    ["⌨", "KEYBOARD"], ["🖱", "COMPUTER MOUSE"], ["⌚", "WATCH"], ["📡", "SATELLITE ANTENNA"],
  ]),
};

const miscellaneousCategory: CharacterCategoryData = {
  id: "miscellaneous",
  name: "Miscellaneous",
  slug: "miscellaneous",
  icon: "auto_awesome",
  shortDescription: "Popular misc symbols — music notes ♪, checks ✓, crosses ✗, weather icons and dice for any bio or name.",
  description: [
    "A curated mix of the most-loved leftover symbols: music notes, weather icons, check marks, crosses, dice and planes.",
    "These are the characters that round out bios, usernames and decorative dividers.",
    "The music notes ♪ ♫ ♬ are probably the single most copied characters on this page after hearts. They survive in nearly every game and social platform because they have been part of Unicode since the beginning.",
    "Check marks deserve a note of caution. ✓ ✔ ☑ look similar but behave differently: the first two are plain text, while ☑ is a boxed emoji-style glyph that some platforms recolor or replace. If you need a check inside styled text, use ✓ — it inherits the surrounding font like any letter would.",
    "The dice faces ⚀ through ⚅ are an underrated pick for gaming profiles. Few people use them, they render as clean monochrome glyphs, and they read instantly as 'game' to anyone who sees them.",
  ],
  relatedCategories: ["stars", "hearts", "arrows"],
  relatedTools: [
    { title: "Check Mark Symbol Guide", href: "/symbols/check-mark-symbol" },
    { title: "Character Generator", href: "/tools/character-generator" },
  ],
  faqs: [
    { question: "Which check mark should I copy?", answer: "✓ is the classic thin check. ✔ and ✅ are heavier versions — ✅ renders as a green emoji box." },
    { question: "Do music notes work in usernames?", answer: "♪ ♫ are plain text characters and are accepted by most platforms, including Discord display names and Free Fire." },
  ],
  chars: named([
    ["♪", "EIGHTH NOTE"], ["♫", "BEAMED EIGHTH NOTES"], ["♬", "BEAMED SIXTEENTH NOTES"], ["♩", "QUARTER NOTE"],
    ["♭", "MUSIC FLAT SIGN"], ["♯", "MUSIC SHARP SIGN"], ["✓", "CHECK MARK"], ["✔", "HEAVY CHECK MARK"],
    ["✕", "MULTIPLICATION X"], ["✖", "HEAVY MULTIPLICATION X"], ["✗", "BALLOT X"], ["✘", "HEAVY BALLOT X"],
    ["☑", "BALLOT BOX WITH CHECK"], ["☒", "BALLOT BOX WITH X"], ["☀", "BLACK SUN WITH RAYS"], ["☁", "CLOUD"],
    ["☂", "UMBRELLA"], ["☔", "UMBRELLA WITH RAIN DROPS"], ["☠", "SKULL AND CROSSBONES"], ["☮", "PEACE SYMBOL"],
    ["☯", "YIN YANG"], ["✈", "AIRPLANE"], ["⚓", "ANCHOR"], ["⚑", "BLACK FLAG"],
    ["⚀", "DIE FACE-1"], ["⚁", "DIE FACE-2"], ["⚂", "DIE FACE-3"], ["⚃", "DIE FACE-4"],
    ["⚄", "DIE FACE-5"], ["⚅", "DIE FACE-6"], ["°", "DEGREE SIGN"], ["❄", "SNOWFLAKE"],
  ]),
};

export const CHARACTER_CATEGORIES: CharacterCategoryData[] = [
  lettersCategory,
  numbersCategory,
  mathCategory,
  arrowsCategory,
  heartsCategory,
  starsCategory,
  shapesCategory,
  currencyCategory,
  punctuationCategory,
  superscriptCategory,
  subscriptCategory,
  technicalCategory,
  miscellaneousCategory,
];

export function getCategory(slug: string): CharacterCategoryData | undefined {
  return CHARACTER_CATEGORIES.find((c) => c.slug === slug);
}

export function getAllCharacters(): UnicodeChar[] {
  return CHARACTER_CATEGORIES.flatMap((c) => c.chars);
}
