export interface FontStyle {
  id: string;
  name: string;
  category: 'bold' | 'italic' | 'script' | 'gothic' | 'monospace' | 'decorative' | 'enclosed' | 'effects';
  map: Record<string, string>;
  prefix?: string;
  suffix?: string;
}

const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const a = "abcdefghijklmnopqrstuvwxyz";
const d = "0123456789";

function zip(keys: string, values: string): Record<string, string> {
  const m: Record<string, string> = {};
  const keyCharacters = Array.from(keys);
  const valueCharacters = Array.from(values);
  for (let i = 0; i < keyCharacters.length && i < valueCharacters.length; i++) {
    m[keyCharacters[i]] = valueCharacters[i];
  }
  return m;
}

function union(...maps: Record<string, string>[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of maps) {
    for (const k in m) out[k] = m[k];
  }
  return out;
}

const boldSans: FontStyle = {
  id: "boldSans",
  name: "Bold Sans",
  category: "bold",
  map: union(
    zip(A, "\u{1D5D4}\u{1D5D5}\u{1D5D6}\u{1D5D7}\u{1D5D8}\u{1D5D9}\u{1D5DA}\u{1D5DB}\u{1D5DC}\u{1D5DD}\u{1D5DE}\u{1D5DF}\u{1D5E0}\u{1D5E1}\u{1D5E2}\u{1D5E3}\u{1D5E4}\u{1D5E5}\u{1D5E6}\u{1D5E7}\u{1D5E8}\u{1D5E9}\u{1D5EA}\u{1D5EB}\u{1D5EC}\u{1D5ED}"),
    zip(a, "\u{1D622}\u{1D623}\u{1D624}\u{1D625}\u{1D626}\u{1D627}\u{1D628}\u{1D629}\u{1D62A}\u{1D62B}\u{1D62C}\u{1D62D}\u{1D62E}\u{1D62F}\u{1D630}\u{1D631}\u{1D632}\u{1D633}\u{1D634}\u{1D635}\u{1D636}\u{1D637}\u{1D638}\u{1D639}\u{1D63A}\u{1D63B}"),
    zip(d, "\u{1D7EC}\u{1D7ED}\u{1D7EE}\u{1D7EF}\u{1D7F0}\u{1D7F1}\u{1D7F2}\u{1D7F3}\u{1D7F4}\u{1D7F5}")
  ),
};

const italic: FontStyle = {
  id: "italic",
  name: "Italic",
  category: "italic",
  map: union(
    zip(A, "\u{1D434}\u{1D435}\u{1D436}\u{1D437}\u{1D438}\u{1D439}\u{1D43A}\u{1D43B}\u{2110}\u{1D43D}\u{1D43E}\u{1D43F}\u{1D440}\u{1D441}\u{2112}\u{1D443}\u{1D444}\u{1D445}\u{1D446}\u{1D447}\u{1D448}\u{1D449}\u{1D44A}\u{1D44B}\u{212E}\u{1D44D}"),
    zip(a, "\u{1D44E}\u{1D44F}\u{1D450}\u{1D451}\u{1D452}\u{1D453}\u{1D454}\u{210E}\u{1D456}\u{1D457}\u{1D458}\u{1D459}\u{1D45A}\u{1D45B}\u{1D45C}\u{1D45D}\u{1D45E}\u{1D45F}"),
    zip(d, "\u{1D7E2}\u{1D7E3}\u{1D7E4}\u{1D7E5}\u{1D7E6}\u{1D7E7}\u{1D7E8}\u{1D7E9}\u{1D7EA}\u{1D7EB}")
  ),
};

const boldItalic: FontStyle = {
  id: "boldItalic",
  name: "Bold Italic",
  category: "bold",
  map: union(
    zip(A, "\u{1D468}\u{1D469}\u{1D46A}\u{1D46B}\u{1D46C}\u{1D46D}\u{1D46E}\u{1D46F}\u{2111}\u{1D471}\u{1D472}\u{1D473}\u{1D474}\u{1D475}\u{2113}\u{1D477}\u{1D478}\u{1D479}\u{1D47A}\u{1D47B}\u{1D47C}\u{1D47D}\u{1D47E}\u{1D47F}\u{212E}\u{1D481}"),
    zip(a, "\u{1D482}\u{1D483}\u{1D484}\u{1D485}\u{1D486}\u{1D487}\u{1D488}\u{1D489}\u{1D48A}\u{1D48B}\u{1D48C}\u{1D48D}\u{1D48E}\u{1D48F}\u{1D490}\u{1D491}\u{1D492}\u{1D493}")
    // No mathematical bold-italic digits exist in Unicode — digits are preserved as-is.
  ),
};

const cursive: FontStyle = {
  id: "cursive",
  name: "Cursive",
  category: "script",
  map: union(
    zip(A, "\u{1D49C}\u212C\u{1D49E}\u{1D49F}\u{1D4A2}\u2131\u{1D4A4}\u{1D4A7}\u{1D4A8}\u2112\u{1D4AA}\u{1D4AB}\u{1D4AC}\u{1D4AD}\u2112\u{1D4AF}\u{1D4B0}\u{1D4B1}\u{1D4B2}\u{1D4B3}\u{1D4B4}\u{1D4B5}\u212E"),
    zip(a, "\u{1D4B6}\u{1D4B7}\u{1D4B8}\u{1D4B9}\u{1D4BA}\u{1D4BB}\u{1D4BC}\u{1D4BD}\u{1D4BE}\u{1D4BF}\u{1D4C0}\u{1D4C1}\u{1D4C2}\u{1D4C3}\u{1D4C4}\u{1D4C5}\u{1D4C6}\u{1D4C7}\u{1D4C8}\u{1D4C9}\u{1D4CA}\u{1D4CB}\u{1D4CC}\u{1D4CD}\u{1D4CE}\u{1D4CF}"),
    zip(d, "0123456789")
  ),
};

const boldScript: FontStyle = {
  id: "boldScript",
  name: "Bold Script",
  category: "script",
  map: union(
    zip(A, "\u{1D4D0}\u{1D4D1}\u{1D4D2}\u{1D4D3}\u{1D4D4}\u{1D4D5}\u{1D4D6}\u{1D4D7}\u{1D4D8}\u{1D4D9}\u{1D4DA}\u{1D4DB}\u{1D4DC}\u{1D4DD}\u{1D4DE}\u{1D4DF}\u{1D4E0}\u{1D4E1}\u{1D4E2}\u{1D4E3}\u{1D4E4}\u{1D4E5}\u{1D4E6}\u{1D4E7}\u{1D4E8}\u{1D4E9}"),
    zip(a, "\u{1D4EA}\u{1D4EB}\u{1D4EC}\u{1D4ED}\u{1D4EE}\u{1D4EF}\u{1D4F0}\u{1D4F1}\u{1D4F2}\u{1D4F3}\u{1D4F4}\u{1D4F5}\u{1D4F6}\u{1D4F7}\u{1D4F8}\u{1D4F9}\u{1D4FA}\u{1D4FB}\u{1D4FC}\u{1D4FD}\u{1D4FE}\u{1D4FF}\u{1D500}\u{1D501}\u{1D502}\u{1D503}"),
    zip(d, "0123456789")
  ),
};

const fraktur: FontStyle = {
  id: "fraktur",
  name: "Gothic",
  category: "gothic",
  map: union(
    zip(A, "\u{1D504}\u{1D505}\u212D\u{1D507}\u{1D508}\u{1D509}\u{1D50A}\u{1D50B}\u{1D50C}\u2111\u{1D50E}\u{1D50F}\u{1D510}\u{1D511}\u{1D512}\u{1D513}\u{1D514}\u{1D516}\u{1D517}\u{1D518}\u{1D519}\u{1D51A}\u{1D51B}\u{1D51C}\u212C"),
    zip(a, "\u{1D51E}\u{1D51F}\u{1D520}\u{1D521}\u{1D522}\u{1D523}\u{1D524}\u{1D525}\u{1D526}\u{1D527}\u{1D528}\u{1D529}\u{1D52A}\u{1D52B}\u{1D52C}\u{1D52D}\u{1D52E}\u{1D52F}\u{1D530}\u{1D531}\u{1D532}\u{1D533}\u{1D534}\u{1D535}\u{1D536}\u{1D537}"),
    zip(d, "0123456789")
  ),
};

const boldFraktur: FontStyle = {
  id: "boldFraktur",
  name: "Bold Gothic",
  category: "gothic",
  map: union(
    zip(A, "\u{1D56C}\u{1D56D}\u{1D56E}\u{1D56F}\u{1D570}\u{1D571}\u{1D572}\u{1D573}\u{1D574}\u{1D575}\u{1D576}\u{1D577}\u{1D578}\u{1D579}\u{1D57A}\u{1D57B}\u{1D57C}\u{1D57D}\u{1D57E}\u{1D57F}\u{1D580}\u{1D581}\u{1D582}\u{1D583}\u{1D584}\u{1D585}"),
    zip(a, "\u{1D586}\u{1D587}\u{1D588}\u{1D589}\u{1D58A}\u{1D58B}\u{1D58C}\u{1D58D}\u{1D58E}\u{1D58F}\u{1D590}\u{1D591}\u{1D592}\u{1D593}\u{1D594}\u{1D595}\u{1D596}\u{1D597}\u{1D598}\u{1D599}\u{1D59A}\u{1D59B}\u{1D59C}\u{1D59D}\u{1D59E}\u{1D59F}"),
    zip(d, "0123456789")
  ),
};

const doubleStruck: FontStyle = {
  id: "doubleStruck",
  name: "Double-Struck",
  category: "bold",
  map: union(
    zip(A, "\u{1D538}\u{1D539}\u{2102}\u{1D53B}\u{1D53C}\u{1D53D}\u{1D53E}\u{210D}\u{1D540}\u{1D541}\u{1D542}\u{1D543}\u{1D544}\u{2115}\u{1D546}\u{1D547}\u{1D548}\u{1D549}\u{1D54A}\u{1D54B}\u{1D54C}\u{1D54D}\u{1D54E}\u{1D54F}\u{1D550}"),
    zip(a, "\u{1D552}\u{1D553}\u{1D554}\u{1D555}\u{1D556}\u{1D557}\u{1D558}\u{1D559}\u{1D55A}\u{1D55B}\u{1D55C}\u{1D55D}\u{1D55E}\u{1D55F}\u{1D560}\u{1D561}\u{1D562}\u{1D563}\u{1D564}\u{1D565}\u{1D566}\u{1D567}\u{1D568}\u{1D569}\u{1D56A}\u{1D56B}"),
    zip(d, "\u{1D7D8}\u{1D7D9}\u{1D7DA}\u{1D7DB}\u{1D7DC}\u{1D7DD}\u{1D7DE}\u{1D7DF}\u{1D7E0}\u{1D7E1}")
  ),
};

const monospace: FontStyle = {
  id: "monospace",
  name: "Monospace",
  category: "monospace",
  map: union(
    zip(A, "\u{1D670}\u{1D671}\u{1D672}\u{1D673}\u{1D674}\u{1D675}\u{1D676}\u{1D677}\u{1D678}\u{1D679}\u{1D67A}\u{1D67B}\u{1D67C}\u{1D67D}\u{1D67E}\u{1D67F}\u{1D680}\u{1D681}\u{1D682}\u{1D683}\u{1D684}\u{1D685}\u{1D686}\u{1D687}\u{1D688}\u{1D689}"),
    zip(a, "\u{1D68A}\u{1D68B}\u{1D68C}\u{1D68D}\u{1D68E}\u{1D68F}\u{1D690}\u{1D691}\u{1D692}\u{1D693}\u{1D694}\u{1D695}\u{1D696}\u{1D697}\u{1D698}\u{1D699}\u{1D69A}\u{1D69B}\u{1D69C}\u{1D69D}\u{1D69E}\u{1D69F}\u{1D6A0}\u{1D6A1}\u{1D6A2}\u{1D6A3}"),
    zip(d, "\u{1D7F6}\u{1D7F7}\u{1D7F8}\u{1D7F9}\u{1D7FA}\u{1D7FB}\u{1D7FC}\u{1D7FD}\u{1D7FE}\u{1D7FF}")
  ),
};

const sansSerif: FontStyle = {
  id: "sansSerif",
  name: "Sans-Serif",
  category: "bold",
  map: union(
    zip(A, "\u{1D5A0}\u{1D5A1}\u{1D5A2}\u{1D5A3}\u{1D5A4}\u{1D5A5}\u{1D5A6}\u{1D5A7}\u{1D5A8}\u{1D5A9}\u{1D5AA}\u{1D5AB}\u{1D5AC}\u{1D5AD}\u{1D5AE}\u{1D5AF}\u{1D5B0}\u{1D5B1}\u{1D5B2}\u{1D5B3}\u{1D5B4}\u{1D5B5}\u{1D5B6}\u{1D5B7}\u{1D5B8}\u{1D5B9}"),
    zip(a, "\u{1D5BA}\u{1D5BB}\u{1D5BC}\u{1D5BD}\u{1D5BE}\u{1D5BF}\u{1D5C0}\u{1D5C1}\u{1D5C2}\u{1D5C3}\u{1D5C4}\u{1D5C5}\u{1D5C6}\u{1D5C7}\u{1D5C8}\u{1D5C9}\u{1D5CA}\u{1D5CB}\u{1D5CC}\u{1D5CD}\u{1D5CE}\u{1D5CF}\u{1D5D0}\u{1D5D1}\u{1D5D2}\u{1D5D3}"),
    zip(d, "\u{1D7E2}\u{1D7E3}\u{1D7E4}\u{1D7E5}\u{1D7E6}\u{1D7E7}\u{1D7E8}\u{1D7E9}\u{1D7EA}\u{1D7EB}")
  ),
};

const smallCaps: FontStyle = {
  id: "smallCaps",
  name: "Small Caps",
  category: "decorative",
  map: union(
    zip(A, "ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
    zip(a, "\u{1D00}\u{0299}\u{1D04}\u{1D05}\u{1D07}\u{A730}\u{0262}\u{029C}\u{026A}\u{1D0A}\u{1D0B}\u{029F}\u{1D0D}\u{1D0E}\u{1D0F}\u{1D18}\u{A7AF}\u{0280}\u{A731}\u{1D1B}\u{1D1C}\u{1D20}\u{1D21}\u{1D22}\u{1D23}\u{A728}"),
    zip(d, "0123456789")
  ),
};

const circled: FontStyle = {
  id: "circled",
  name: "Circled",
  category: "enclosed",
  map: union(
    zip(A, "\u24B6\u24B7\u24B8\u24B9\u24BA\u24BB\u24BC\u24BD\u24BE\u24BF\u24C0\u24C1\u24C2\u24C3\u24C4\u24C5\u24C6\u24C7\u24C8\u24C9\u24CA\u24CB\u24CC\u24CD\u24CE\u24CF"),
    zip(a, "\u24D0\u24D1\u24D2\u24D3\u24D4\u24D5\u24D6\u24D7\u24D8\u24D9\u24DA\u24DB\u24DC\u24DD\u24DE\u24DF\u24E0\u24E1\u24E2\u24E3\u24E4\u24E5\u24E6\u24E7\u24E8\u24E9"),
    zip(d, "\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469")
  ),
};

const squared: FontStyle = {
  id: "squared",
  name: "Squared",
  category: "enclosed",
  map: union(
    zip(A, "\u{1F130}\u{1F131}\u{1F132}\u{1F133}\u{1F134}\u{1F135}\u{1F136}\u{1F137}\u{1F138}\u{1F139}\u{1F13A}\u{1F13B}\u{1F13C}\u{1F13D}\u{1F13E}\u{1F13F}\u{1F140}\u{1F141}\u{1F142}\u{1F143}\u{1F144}\u{1F145}\u{1F146}\u{1F147}\u{1F148}\u{1F149}"),
    zip(a, "\u{1F130}\u{1F131}\u{1F132}\u{1F133}\u{1F134}\u{1F135}\u{1F136}\u{1F137}\u{1F138}\u{1F139}\u{1F13A}\u{1F13B}\u{1F13C}\u{1F13D}\u{1F13E}\u{1F13F}\u{1F140}\u{1F141}\u{1F142}\u{1F143}\u{1F144}\u{1F145}\u{1F146}\u{1F147}\u{1F148}\u{1F149}"),
    zip(d, "\u{1F130}\u{1F131}\u{1F132}\u{1F133}\u{1F134}\u{1F135}\u{1F136}\u{1F137}\u{1F138}\u{1F139}\u{1F13A}")
  ),
};

const fullwidth: FontStyle = {
  id: "fullwidth",
  name: "Fullwidth",
  category: "decorative",
  map: union(
    zip(A, "\uFF21\uFF22\uFF23\uFF24\uFF25\uFF26\uFF27\uFF28\uFF29\uFF2A\uFF2B\uFF2C\uFF2D\uFF2E\uFF2F\uFF30\uFF31\uFF32\uFF33\uFF34\uFF35\uFF36\uFF37\uFF38\uFF39\uFF3A"),
    zip(a, "\uFF41\uFF42\uFF43\uFF44\uFF45\uFF46\uFF47\uFF48\uFF49\uFF4A\uFF4B\uFF4C\uFF4D\uFF4E\uFF4F\uFF50\uFF51\uFF52\uFF53\uFF54\uFF55\uFF56\uFF57\uFF58\uFF59\uFF5A"),
    zip(d, "\uFF10\uFF11\uFF12\uFF13\uFF14\uFF15\uFF16\uFF17\uFF18\uFF19")
  ),
};

const upsideDown: FontStyle = {
  id: "upsideDown",
  name: "Upside Down",
  category: "effects",
  map: union(
    zip(A, "\u{1D22}\u{0183}\u{0185}\u{018C}\u{1D4D}\u{0584}\u{01E1}\u{0195}\u{0268}\u{0279}\u{029E}\u{029F}\u{1D50}\u{0274}\u{00D8}\u{1D18}\u{0586}\u{0280}\u{0253}\u{01AD}\u{028C}\u{028A}\u{2038}\u{02B3}\u{027E}\u{1D51}"),
    zip(a, "\u{0250}\u{0183}\u{0183}\u{018C}\u{01DD}\u{025F}\u{0183}\u{0265}\u{0268}\u{0279}\u{029E}\u{029F}\u{026F}\u{0274}\u{00F8}\u{0278}\u{0586}\u{0280}\u{0253}\u{01AD}\u{028C}\u{028A}\u{2195}\u{0279}\u{027E}\u{03C5}"),
    zip(d, "0123456789")
  ),
};

const bubble: FontStyle = {
  id: "bubble",
  name: "Bubble",
  category: "enclosed",
  map: union(
    zip(A, "\u249C\u249D\u249E\u249F\u24A0\u24A1\u24A2\u24A3\u24A4\u24A5\u24A6\u24A7\u24A8\u24A9\u24AA\u24AB\u24AC\u24AD\u24AE\u24AF\u24B0\u24B1\u24B2\u24B3\u24B4\u24B5"),
    zip(a, "\u249C\u249D\u249E\u249F\u24A0\u24A1\u24A2\u24A3\u24A4\u24A5\u24A6\u24A7\u24A8\u24A9\u24AA\u24AB\u24AC\u24AD\u24AE\u24AF\u24B0\u24B1\u24B2\u24B3\u24B4\u24B5"),
    zip(d, "0123456789")
  ),
};

const ALL_STYLES: FontStyle[] = [
  boldSans,
  italic,
  boldItalic,
  cursive,
  boldScript,
  fraktur,
  boldFraktur,
  doubleStruck,
  monospace,
  sansSerif,
  smallCaps,
  circled,
  squared,
  fullwidth,
  upsideDown,
  bubble,
];

export function convertText(text: string, style: FontStyle): string {
  let result = "";
  for (const ch of text) {
    if (ch === "\n") {
      result += "\n";
    } else if (ch === " ") {
      result += " ";
    } else if (style.map[ch]) {
      result += style.map[ch];
    } else {
      result += ch;
    }
  }
  return `${style.prefix || ""}${result}${style.suffix || ""}`;
}

export function getAllStyles(): FontStyle[] {
  return ALL_STYLES;
}

export function getStylesByCategory(category: string): FontStyle[] {
  return ALL_STYLES.filter((s) => s.category === category);
}
