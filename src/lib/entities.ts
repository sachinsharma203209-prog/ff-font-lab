import { PHASE3_TOOLS } from "../data/tools-registry";
import { USE_CASES } from "../data/use-cases";
import { SYMBOL_PAGES } from "../data/symbols";
import { CHARACTER_CATEGORIES } from "../data/characters";
import { LANGUAGES } from "../data/languages";
import { PLATFORM_COMPATIBILITY } from "../data/platforms";
import { getAllTools } from "../data/tools";
import { realPathForSlug } from "./tool-paths";

const ALL_TOOLS = getAllTools();
import { getAllStyles } from "./font-styles";

export type EntityType =
  | "tool"
  | "styleVariant"
  | "stylePage"
  | "socialPage"
  | "gamingPage"
  | "useCase"
  | "symbol"
  | "characterCategory"
  | "language"
  | "platform"
  | "hub";

export interface Entity {
  id: string;
  type: EntityType;
  name: string;
  path: string;
  description: string;
  category?: string;
  keywords?: string[];
  relations: string[];
}

const STYLE_PAGE_MAP: Record<string, { slug: string; category: string }> = {
  cursive: { slug: "/styles/cursive-text-generator", category: "script" },
  boldScript: { slug: "/styles/script-text-generator", category: "script" },
  fraktur: { slug: "/styles/gothic-font-generator", category: "gothic" },
  boldFraktur: { slug: "/styles/gothic-font-generator", category: "gothic" },
  boldSans: { slug: "/styles/bold-text-generator", category: "bold" },
  doubleStruck: { slug: "/styles/bold-text-generator", category: "bold" },
  monospace: { slug: "/styles/monospace-text-generator", category: "monospace" },
  fullwidth: { slug: "/styles/aesthetic-text-generator", category: "aesthetic" },
};

export const STYLE_TAGS: Record<string, string[]> = {
  boldSans: ["popular", "social"],
  italic: ["classic"],
  boldItalic: ["classic"],
  cursive: ["popular", "aesthetic"],
  boldScript: ["aesthetic", "social"],
  fraktur: ["gaming", "popular"],
  boldFraktur: ["gaming"],
  doubleStruck: ["popular", "classic"],
  monospace: ["classic", "social"],
  sansSerif: ["classic"],
  smallCaps: ["social", "aesthetic"],
  circled: ["aesthetic"],
  squared: ["gaming"],
  fullwidth: ["aesthetic", "popular"],
  upsideDown: ["fun"],
  bubble: ["aesthetic", "fun"],
};

function buildRegistry(): Map<string, Entity> {
  const registry = new Map<string, Entity>();
  const pending: Array<{ id: string; hrefs: string[] }> = [];
  const add = (e: Entity) => {
    if (!registry.has(e.id)) registry.set(e.id, e);
  };

  add({
    id: "core:home",
    type: "hub",
    name: "Font Changer",
    path: "/",
    description: "The central font changer — convert text into stylish Unicode fonts instantly.",
    category: "root",
    keywords: ["font changer", "fancy font generator", "font generator"],
    relations: ["tool:text-converter", "hub:tools", "hub:characters", "hub:styles", "hub:social", "hub:gaming"],
  });

  add({
    id: "hub:tools",
    type: "hub",
    name: "Text & Font Tools",
    path: "/tools",
    description: "Every text transformation tool in one place.",
    category: "tools",
    keywords: ["tools", "text tools"],
    relations: PHASE3_TOOLS.map((t) => `tool:${t.id}`),
  });

  for (const t of PHASE3_TOOLS) {
    const relToolIds = (t.relatedTools || [])
      .filter((r) => PHASE3_TOOLS.some((p) => p.id === r))
      .map((r) => `tool:${r}`);
    add({
      id: `tool:${t.id}`,
      type: "tool",
      name: t.name,
      path: `/tools/${t.slug}`,
      description: t.intro,
      category: t.category,
      keywords: [t.name.toLowerCase(), t.slug.replace(/-/g, " ")],
      relations: [...relToolIds, "core:home"],
    });
  }

  for (const u of USE_CASES) {
    const hrefs = u.relatedGenerators.map((g) => g.href);
    pending.push({ id: `useCase:${u.id}`, hrefs });
    add({
      id: `useCase:${u.id}`,
      type: "useCase",
      name: u.name,
      path: `/use-cases/${u.slug}`,
      description: u.intro,
      category: u.slug.split("-")[0],
      keywords: [u.name.toLowerCase()],
      relations: [...u.relatedUseCases.map((r) => `useCase:${r}`), "core:home"],
    });
  }

  for (const s of SYMBOL_PAGES) {
    const hrefs = s.relatedGenerators.map((g) => g.href);
    pending.push({ id: `symbol:${s.id}`, hrefs });
    add({
      id: `symbol:${s.id}`,
      type: "symbol",
      name: `${s.name} ${s.char}`,
      path: `/symbols/${s.slug}`,
      description: s.intro,
      category: s.category,
      keywords: [s.name.toLowerCase(), s.char],
      relations: [
        ...s.relatedSymbols.map((r) => `symbol:${r}`),
        `characterCategory:${s.category}`,
      ],
    });
  }

  for (const c of CHARACTER_CATEGORIES) {
    const hrefs = c.relatedTools.map((g) => g.href);
    pending.push({ id: `characterCategory:${c.id}`, hrefs });
    add({
      id: `characterCategory:${c.id}`,
      type: "characterCategory",
      name: `${c.name} Characters`,
      path: `/characters/${c.slug}`,
      description: c.shortDescription,
      category: c.id,
      keywords: [c.name.toLowerCase(), "characters", "symbols"],
      relations: [...c.relatedCategories.map((r) => `characterCategory:${r}`), "hub:characters"],
    });
  }

  add({
    id: "hub:characters",
    type: "hub",
    name: "Unicode Characters",
    path: "/characters",
    description: "Browse every character category — letters, numbers, symbols and more.",
    category: "characters",
    keywords: ["unicode characters", "text symbols"],
    relations: CHARACTER_CATEGORIES.map((c) => `characterCategory:${c.id}`),
  });

  for (const p of PLATFORM_COMPATIBILITY) {
    const hrefs = p.relatedGenerators.map((g) => g.href);
    pending.push({ id: `platform:${p.id}`, hrefs });
    add({
      id: `platform:${p.id}`,
      type: "platform",
      name: `${p.name} Compatibility`,
      path: `/compatibility/${p.slug}`,
      description: p.intro,
      category: p.id,
      keywords: [`${p.name.toLowerCase()} fonts`, `${p.name.toLowerCase()} compatibility`],
      relations: ["hub:compatibility"],
    });
  }

  add({
    id: "hub:compatibility",
    type: "hub",
    name: "Font & Unicode Compatibility",
    path: "/compatibility",
    description: "Platform-by-platform Unicode support explained honestly.",
    category: "compatibility",
    keywords: ["compatibility", "unicode support"],
    relations: PLATFORM_COMPATIBILITY.map((p) => `platform:${p.id}`),
  });

  for (const l of LANGUAGES) {
    add({
      id: `language:${l.id}`,
      type: "language",
      name: `${l.name} Font Support`,
      path: `/languages/${l.slug}`,
      description: l.description[0],
      category: l.supportLevel,
      keywords: [`${l.name.toLowerCase()} fonts`, l.nativeName.toLowerCase()],
      relations: ["hub:languages", "tool:text-converter"],
    });
  }

  add({
    id: "hub:languages",
    type: "hub",
    name: "Font Changer Languages",
    path: "/languages",
    description: "Which languages can be styled — and what happens to unsupported characters.",
    category: "languages",
    keywords: ["languages", "hindi font", "spanish font"],
    relations: LANGUAGES.map((l) => `language:${l.id}`),
  });

  for (const style of getAllStyles()) {
    const page = STYLE_PAGE_MAP[style.id];
    const hrefs = page ? [page.slug] : [];
    pending.push({ id: `styleVariant:${style.id}`, hrefs });
    add({
      id: `styleVariant:${style.id}`,
      type: "styleVariant",
      name: `${style.name} Style`,
      path: page ? page.slug : "/tools/text-converter",
      description: `Convert text into the ${style.name} Unicode style.`,
      category: style.category,
      keywords: [style.name.toLowerCase(), "font style"],
      relations: [page ? "tool:text-converter" : "tool:text-converter", "core:home"],
    });
  }

  for (const t of ALL_TOOLS) {
    if (!t.slug || t.category === "home") continue;
    const realPath = realPathForSlug(t.slug);
    if (!realPath) continue;
    const type: EntityType =
      t.category === "social" ? "socialPage" : t.category === "gaming" ? "gamingPage" : "stylePage";
    add({
      id: `${type}:${t.id}`,
      type,
      name: t.title,
      path: realPath,
      description: t.description,
      category: t.platform || t.id,
      keywords: [t.title.toLowerCase()],
      relations: ["core:home"],
    });
  }

  add({
    id: "hub:styles",
    type: "hub",
    name: "Font Styles",
    path: "/styles",
    description: "All Unicode font styles — cursive, bold, gothic, aesthetic and more.",
    category: "styles",
    keywords: ["font styles"],
    relations: [],
  });
  add({
    id: "hub:social",
    type: "hub",
    name: "Social Media Fonts",
    path: "/social",
    description: "Font generators for every major social platform.",
    category: "social",
    keywords: ["social media fonts"],
    relations: [],
  });
  add({
    id: "hub:gaming",
    type: "hub",
    name: "Gaming Names",
    path: "/gaming",
    description: "Styled nicknames for every major game.",
    category: "gaming",
    keywords: ["gaming names"],
    relations: [],
  });

  for (const p of pending) {
    const entity = registry.get(p.id);
    if (!entity) continue;
    for (const href of p.hrefs) {
      const resolved = findByPath(registry, href);
      if (resolved && !entity.relations.includes(resolved)) entity.relations.push(resolved);
    }
  }

  return registry;
}

function findByPath(map: Map<string, Entity>, path: string): string | undefined {
  const normalized = path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
  for (const [id, e] of map.entries()) {
    if (e.path === normalized) return id;
  }
  return undefined;
}

export const REGISTRY: Map<string, Entity> = buildRegistry();

export function getEntity(id: string): Entity | undefined {
  return REGISTRY.get(id);
}

export function getEntitiesByType(type: EntityType): Entity[] {
  return Array.from(REGISTRY.values()).filter((e) => e.type === type);
}

export function entityIdByPath(path: string): string | undefined {
  return findByPath(REGISTRY, path);
}
