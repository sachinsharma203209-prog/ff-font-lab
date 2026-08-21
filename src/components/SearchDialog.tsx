import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SEARCH_INDEX, searchEntries, type SearchEntry } from "../lib/search-index";
import { trackEvent } from "../lib/analytics";

const TYPE_COLORS: Record<string, string> = {
  Generator: "bg-primary/15 text-primary",
  Tool: "bg-secondary/15 text-secondary",
  "Style Generator": "bg-tertiary/15 text-tertiary",
  "Platform Fonts": "bg-primary/10 text-primary",
  Gaming: "bg-error/15 text-error",
  "Use Case": "bg-secondary/10 text-secondary",
  Symbol: "bg-tertiary/10 text-tertiary",
  Characters: "bg-primary/15 text-primary",
  Compatibility: "bg-surface-container-high text-on-surface-variant",
  Language: "bg-secondary/10 text-secondary",
  Reference: "bg-surface-container-high text-on-surface-variant",
  Hub: "bg-surface-container-high text-on-surface-variant",
};

function ResultRow({
  entry,
  active,
  onSelect,
  onHover,
}: {
  entry: SearchEntry;
  active: boolean;
  onSelect: () => void;
  onHover: () => void;
}) {
  return (
    <a
      href={entry.href}
      onClick={onSelect}
      onMouseEnter={onHover}
      role="option"
      aria-selected={active}
      className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
        active ? "bg-primary/10" : ""
      }`}
    >
      <span
        className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded whitespace-nowrap ${
          TYPE_COLORS[entry.type] || "bg-surface-container-high text-on-surface-variant"
        }`}
        style={{ fontFamily: "JetBrains Mono" }}
      >
        {entry.type}
      </span>
      <span className="flex flex-col min-w-0">
        <span className="text-[14px] font-medium text-on-surface truncate">{entry.title}</span>
        <span className="text-[12px] text-on-surface-variant truncate">{entry.description}</span>
      </span>
    </a>
  );
}

export function useSearchCore() {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const results = useMemo(() => searchEntries(query), [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  return { query, setQuery, results, activeIndex, setActiveIndex };
}

interface SearchDialogProps {
  /** Optional controlled mode; omit to let the dialog manage itself */
  open?: boolean;
  onClose?: () => void;
}

export default function SearchDialog(props: SearchDialogProps) {
  const controlled = typeof props.open === "boolean";
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlled ? (props.open as boolean) : internalOpen;
  const onClose = props.onClose || (() => setInternalOpen(false));

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-search-trigger]")) {
        e.preventDefault();
        setInternalOpen(true);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setInternalOpen((v) => !v);
      }
    };
    document.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return <SearchDialogBody open={open} onClose={onClose} />;
}

function SearchDialogBody({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { query, setQuery, results, activeIndex, setActiveIndex } = useSearchCore();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const trackedQuery = useRef("");

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, setQuery]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[activeIndex]) {
        e.preventDefault();
        trackSearch();
        window.location.href = results[activeIndex].href;
      }
    },
    [results, activeIndex, setActiveIndex]
  );

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const trackSearch = useCallback(() => {
    if (trackedQuery.current !== query && query.trim()) {
      trackedQuery.current = query;
      trackEvent("search_used", { scope: "global", result_count: results.length });
    }
  }, [query, results.length]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[8vh] px-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div
        className="w-full max-w-[560px] bg-surface border border-outline-variant rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant" aria-hidden="true">
            search
          </span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search fonts, tools, symbols…"
            aria-label="Search fonts, tools and symbols"
            className="w-full bg-transparent text-[16px] text-on-surface pl-12 pr-12 py-4 outline-none placeholder:text-on-surface-variant/50"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-on-surface-variant hover:text-primary rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6]"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">close</span>
          </button>
        </div>

        <div ref={listRef} role="listbox" aria-label="Search results" className="max-h-[52vh] overflow-y-auto border-t border-outline-variant">
          {query.trim() === "" ? (
            <div className="px-4 py-6">
              <p className="text-[12px] uppercase tracking-wider text-on-surface-variant mb-3" style={{ fontFamily: "JetBrains Mono" }}>
                Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {["heart", "cursive", "instagram", "arrow", "gothic", "tiny text"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQuery(s)}
                    className="text-[13px] px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <span className="material-symbols-outlined text-[32px] text-on-surface-variant/40" aria-hidden="true">search_off</span>
              <p className="text-[14px] text-on-surface-variant mt-2">
                Nothing found for “{query}”.
              </p>
              <p className="text-[12px] text-on-surface-variant/70 mt-1">
                Try “heart”, “bold”, “discord” or “symbols”.
              </p>
            </div>
          ) : (
            Array.from({ length: results.length }, (_, i) => {
              const entry = results[i];
              return (
                <div key={entry.href + i} data-index={i}>
                  <ResultRow
                    entry={entry}
                    active={i === activeIndex}
                    onSelect={() => {
                      trackSearch();
                    }}
                    onHover={() => setActiveIndex(i)}
                  />
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t border-outline-variant text-[11px] text-on-surface-variant" style={{ fontFamily: "JetBrains Mono" }}>
          <span>↑↓ navigate · ↵ open · esc close</span>
          <span>{results.length > 0 ? `${results.length} result${results.length === 1 ? "" : "s"}` : ""}</span>
        </div>
      </div>
    </div>
  );
}

/** Lightweight inline search for the /search page */
export function SearchPageIsland() {
  const { query, setQuery, results, activeIndex, setActiveIndex } = useSearchCore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (query.trim()) {
      trackEvent("search_used", { scope: "page", result_count: results.length });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant" aria-hidden="true">
          search
        </span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((i) => Math.min(i + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
            }
          }}
          placeholder="Search fonts, tools, symbols, platforms…"
          aria-label="Search fonts, tools and symbols"
          className="input-glow w-full pl-12 pr-10 py-3.5 text-[16px]"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-on-surface-variant hover:text-primary rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6]"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">close</span>
          </button>
        )}
      </div>

      {query.trim() === "" ? (
        <div className="surface-card !p-6">
          <p className="text-[14px] text-on-surface-variant mb-3" style={{ fontFamily: "Inter" }}>
            Search across every tool, style, symbol, platform guide and language on the site.
          </p>
          <div className="flex flex-wrap gap-2">
            {["heart", "cursive", "instagram bio", "arrow", "gothic", "tiny text", "hindi", "discord"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className="text-[13px] px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6]"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <div className="surface-card !p-8 text-center">
          <span className="material-symbols-outlined text-[36px] text-on-surface-variant/40" aria-hidden="true">search_off</span>
          <p className="text-[15px] text-on-surface mt-2">Nothing found for “{query}”.</p>
          <p className="text-[13px] text-on-surface-variant mt-1">Try a broader keyword like “font”, “star” or “bio”.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="listbox" aria-label="Search results">
          {results.map((entry, i) => (
            <ResultRow
              key={entry.href + i}
              entry={entry}
              active={false}
              onSelect={() => trackEvent("search_used", { scope: "page_click" })}
              onHover={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { SEARCH_INDEX };
