import { useMemo, useState, useCallback } from "react";
import type { UnicodeChar } from "../data/characters";
import { copyText } from "../lib/clipboard";
import { trackEvent } from "../lib/analytics";

interface CharGridProps {
  chars: UnicodeChar[];
  categories?: Array<{ id: string; name: string; slug: string }>;
  activeCategory?: string;
  showCategoryChips?: boolean;
  pageSize?: number;
}

export default function CharGrid({
  chars,
  categories,
  activeCategory,
  showCategoryChips = false,
  pageSize = 120,
}: CharGridProps) {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(pageSize);
  const [copiedChar, setCopiedChar] = useState<string | null>(null);
  const [announce, setAnnounce] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chars;
    return chars.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.codepoint.toLowerCase().includes(q) ||
        c.char === query.trim()
    );
  }, [chars, query]);

  const shown = useMemo(() => filtered.slice(0, visible), [filtered, visible]);

  const handleCopy = useCallback(async (char: string, name: string) => {
    const ok = await copyText(char);
    setCopiedChar(char);
    setAnnounce(ok ? `Copied ${name}` : "Copy failed. Please select and copy the text manually.");
    trackEvent("symbol_copied", { result: ok ? "success" : "fallback" });
    setTimeout(() => setCopiedChar(null), 1400);
  }, []);

  const onQueryChange = useCallback((q: string) => {
    setQuery(q);
    setVisible(pageSize);
    if (q.trim()) trackEvent("search_used", { scope: "character_grid" });
  }, [pageSize]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant" aria-hidden="true">
            search
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search characters by name or code point…"
            aria-label="Search characters"
            className="input-glow w-full pl-10 pr-9 text-[14px]"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary p-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6]"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">close</span>
            </button>
          )}
        </div>
        <span className="text-[12px] text-on-surface-variant" style={{ fontFamily: "JetBrains Mono" }} aria-live="polite">
          {filtered.length} characters
        </span>
      </div>

      {showCategoryChips && categories && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/characters/${cat.slug}`}
              className={`text-[12px] px-3 py-1.5 rounded-full border transition-colors ${
                cat.slug === activeCategory
                  ? "bg-primary/15 text-primary border-primary/50 font-semibold"
                  : "border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary/40"
              }`}
              style={{ fontFamily: "JetBrains Mono" }}
            >
              {cat.name}
            </a>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="surface-card rounded-lg p-8 text-center">
          <p className="text-[14px] text-on-surface-variant" style={{ fontFamily: "Inter" }}>
            No characters match “{query}”. Try a shorter keyword like “star” or “arrow”.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {shown.map((c, i) => (
            <button
              key={`${c.codepoint}-${i}`}
              type="button"
              onClick={() => handleCopy(c.char, c.name)}
              className={`surface-card !p-3 flex flex-col items-center gap-1.5 group cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] ${
                copiedChar === c.char ? "!border-primary bg-primary/10" : ""
              }`}
              aria-label={`Copy ${c.name} (${c.codepoint})`}
              title={c.name}
            >
              <span className="text-[26px] leading-none text-on-surface group-hover:text-primary transition-colors">
                {c.char}
              </span>
              <span className="text-[9px] text-on-surface-variant truncate w-full text-center" style={{ fontFamily: "JetBrains Mono" }}>
                {copiedChar === c.char ? "✓ Copied" : c.codepoint}
              </span>
            </button>
          ))}
        </div>
      )}

      {filtered.length > visible && (
        <button
          type="button"
          onClick={() => setVisible((v) => v + pageSize)}
          className="btn-primary self-center text-[13px] px-6 py-2.5"
        >
          Load more characters ({filtered.length - visible} remaining)
        </button>
      )}

      <div aria-live="polite" className="sr-only">{announce}</div>
    </div>
  );
}
