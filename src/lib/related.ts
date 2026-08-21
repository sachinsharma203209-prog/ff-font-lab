import { REGISTRY, getEntity, type Entity } from "./entities";

export interface RelatedItem {
  id: string;
  name: string;
  path: string;
  description: string;
  type: string;
  score: number;
}

const TYPE_LABELS: Record<string, string> = {
  tool: "Tool",
  styleVariant: "Font Style",
  stylePage: "Style Generator",
  socialPage: "Platform Fonts",
  gamingPage: "Gaming Names",
  useCase: "Use Case",
  symbol: "Symbol Guide",
  characterCategory: "Characters",
  language: "Language",
  platform: "Compatibility",
  hub: "Hub",
};

export function typeLabel(type: string): string {
  return TYPE_LABELS[type] || type;
}

/**
 * Semantic related-content selection.
 * Priority order:
 *   1. Explicitly declared relations
 *   2. Same entity type + same category
 *   3. Same entity type
 *   4. Sibling relation (shares a related entity)
 *   5. Parent hubs of the same section
 */
export function getRelatedContent(entityId: string, limit = 6): RelatedItem[] {
  const source = getEntity(entityId);
  if (!source) return [];

  const scores = new Map<string, number>();

  const bump = (id: string, amount: number) => {
    if (id === entityId) return;
    scores.set(id, (scores.get(id) || 0) + amount);
  };

  for (const rel of source.relations || []) {
    bump(rel, 10);
  }

  for (const [id, candidate] of REGISTRY.entries()) {
    if (id === entityId) continue;
    if (candidate.type === "hub" && candidate.category !== "root") {
      // Hubs are weak signals unless explicitly related
      continue;
    }
    if (candidate.type === source.type) {
      bump(id, candidate.category && candidate.category === source.category ? 6 : 3);
    }
    const shared = (candidate.relations || []).some((r) => source.relations?.includes(r));
    if (shared) bump(id, 2);
  }

  const parentHubs = (source.relations || []).filter((r) => r.startsWith("hub:"));
  for (const hubId of parentHubs) {
    const hub = getEntity(hubId);
    if (!hub) continue;
    for (const [id, candidate] of REGISTRY.entries()) {
      if (candidate.relations?.includes(hubId)) bump(id, 1);
    }
  }

  return Array.from(scores.entries())
    .map(([id, score]) => {
      const e: Entity | undefined = getEntity(id);
      return e ? { id, name: e.name, path: e.path, description: e.description, type: e.type, score } : null;
    })
    .filter((x): x is RelatedItem => x !== null)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .slice(0, limit);
}
