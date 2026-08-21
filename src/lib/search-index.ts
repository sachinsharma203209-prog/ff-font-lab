import { PHASE3_TOOLS } from "../data/tools-registry";
import { USE_CASES } from "../data/use-cases";
import { SYMBOL_PAGES } from "../data/symbols";
import { CHARACTER_CATEGORIES } from "../data/characters";
import { LANGUAGES } from "../data/languages";
import { PLATFORM_COMPATIBILITY } from "../data/platforms";
import { getAllTools } from "../data/tools";
import { realPathForSlug } from "./tool-paths";

const ALL_TOOLS = getAllTools();

export interface SearchEntry {
  title: string;
  description: string;
  href: string;
  type: string;
  keywords: string;
}

function entry(
  title: string,
  description: string,
  href: string,
  type: string,
  keywords: string[] = []
): SearchEntry {
  return {
    title,
    description,
    href,
    type,
    keywords: [title.toLowerCase(), ...keywords.map((k) => k.toLowerCase())].join(" "),
  };
}

export function buildSearchIndex(): SearchEntry[] {
  const index: SearchEntry[] = [];

  index.push(
    entry(
      "Font Changer",
      "Convert text into stylish Unicode fonts instantly.",
      "/",
      "Generator",
      ["font changer", "fancy font", "stylish text", "fancy text"]
    )
  );

  for (const t of PHASE3_TOOLS) {
    index.push(entry(t.name, t.intro, `/tools/${t.slug}`, "Tool", [t.slug.replace(/-/g, " "), t.category]));
  }

  for (const t of ALL_TOOLS) {
    if (!t.slug || t.category === "home") continue;
    const realPath = realPathForSlug(t.slug);
    if (!realPath) continue;
    const typeLabel =
      t.category === "social" ? "Platform Fonts" : t.category === "gaming" ? "Gaming" : "Style Generator";
    index.push(entry(t.title, t.description, realPath, typeLabel, [t.id]));
  }

  for (const u of USE_CASES) {
    index.push(entry(u.name, u.intro, `/use-cases/${u.slug}`, "Use Case", [u.slug.replace(/-/g, " ")]));
  }

  for (const s of SYMBOL_PAGES) {
    index.push(
      entry(`${s.name} ${s.char}`, s.intro, `/symbols/${s.slug}`, "Symbol", [
        s.name.toLowerCase(),
        s.char,
        s.slug.replace(/-/g, " "),
      ])
    );
  }

  for (const c of CHARACTER_CATEGORIES) {
    index.push(
      entry(`${c.name} Characters`, c.shortDescription, `/characters/${c.slug}`, "Characters", [
        c.name.toLowerCase(),
        ...c.chars.slice(0, 12).map((ch) => ch.char),
      ])
    );
  }

  for (const p of PLATFORM_COMPATIBILITY) {
    index.push(
      entry(`${p.name} Compatibility`, p.intro, `/compatibility/${p.slug}`, "Compatibility", [
        `${p.name.toLowerCase()} fonts`,
        `${p.name.toLowerCase()} unicode`,
      ])
    );
  }

  for (const l of LANGUAGES) {
    index.push(
      entry(`${l.name} Font Support`, l.description[0], `/languages/${l.slug}`, "Language", [
        l.nativeName.toLowerCase(),
        `${l.name.toLowerCase()} font`,
        l.script.toLowerCase(),
      ])
    );
  }

  index.push(
    entry("Unicode Characters", "Browse every character category with copy-ready glyphs.", "/characters", "Reference", [
      "text symbols",
      "special characters",
    ]),
    entry("Text & Font Tools", "Every text transformation tool in one place.", "/tools", "Hub", ["tools"]),
    entry("Font & Unicode Compatibility", "Platform-by-platform Unicode support.", "/compatibility", "Compatibility", [
      "support",
    ]),
    entry("Font Changer Languages", "Language coverage and character preservation.", "/languages", "Languages", [
      "language support",
    ])
  );

  return index;
}

export const SEARCH_INDEX: SearchEntry[] = buildSearchIndex();

export function searchEntries(query: string, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored = SEARCH_INDEX.map((e) => {
    let score = 0;
    if (e.title.toLowerCase() === q) score += 100;
    else if (e.title.toLowerCase().startsWith(q)) score += 60;
    else if (e.title.toLowerCase().includes(q)) score += 40;
    if (e.keywords.includes(q)) score += 25;
    else if (e.keywords.includes(` ${q}`)) score += 15;
    return { e, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return scored.map((x) => x.e);
}
