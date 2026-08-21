const FAVORITES_KEY = "ff_favorites";
const RECENT_KEY = "ff_recent_styles";
const MAX_RECENT = 6;

function read(key: string): string[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function write(key: string, value: string[]): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode) — feature silently disabled */
  }
}

export function getFavorites(): string[] {
  return read(FAVORITES_KEY);
}

export function isFavorite(styleId: string): boolean {
  return getFavorites().includes(styleId);
}

export function toggleFavorite(styleId: string): boolean {
  const current = getFavorites();
  const next = current.includes(styleId) ? current.filter((id) => id !== styleId) : [...current, styleId];
  write(FAVORITES_KEY, next);
  return next.includes(styleId);
}

/** Records a style as recently used. Stores style IDs only — never user text. */
export function pushRecent(styleId: string): string[] {
  const current = read(RECENT_KEY).filter((id) => id !== styleId);
  const next = [styleId, ...current].slice(0, MAX_RECENT);
  write(RECENT_KEY, next);
  return next;
}

export function getRecent(): string[] {
  return read(RECENT_KEY);
}
