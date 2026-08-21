import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { getAllStyles, convertText, type FontStyle } from "../lib/font-styles";
import { STYLE_TAGS } from "../lib/entities";
import { copyText, shareOrCopy } from "../lib/clipboard";
import { trackEvent } from "../lib/analytics";
import { getFavorites, toggleFavorite, pushRecent, getRecent } from "../lib/storage";

const ALL_STYLES = getAllStyles();

const TABS = [
  { id: "all", label: "All" },
  { id: "popular", label: "Popular" },
  { id: "social", label: "Social" },
  { id: "gaming", label: "Gaming" },
  { id: "aesthetic", label: "Aesthetic" },
  { id: "classic", label: "Classic" },
  { id: "fun", label: "Fun" },
] as const;

function tagsFor(styleId: string): string[] {
  return STYLE_TAGS[styleId] || [];
}

function preservedCount(text: string, style: FontStyle): number {
  let count = 0;
  for (const ch of text) {
    if (ch === "\n" || ch === " ") continue;
    if (!style.map[ch]) count++;
  }
  return count;
}

interface FontGeneratorProps {
  charLimit?: number;
  charLimitLabel?: string;
  styles?: string[];
  placeholder?: string;
  defaultText?: string;
}

export default function FontGeneratorIsland({
  charLimit,
  charLimitLabel,
  styles: styleFilter,
  placeholder = "Type or paste your text here...",
  defaultText = "",
}: FontGeneratorProps) {
  const [inputText, setInputText] = useState(defaultText);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shareState, setShareState] = useState<Record<string, string>>({});
  const generateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setFavorites(getFavorites());
    setRecent(getRecent());
  }, []);

  useEffect(() => {
    return () => {
      if (generateTimer.current) clearTimeout(generateTimer.current);
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    };
  }, []);

  const baseStyles = useMemo(
    () => (styleFilter ? ALL_STYLES.filter((s) => styleFilter.includes(s.id)) : ALL_STYLES),
    [styleFilter]
  );

  const displayStyles = useMemo(() => {
    if (activeTab === "all") return baseStyles;
    return baseStyles.filter((s) => tagsFor(s.id).includes(activeTab));
  }, [baseStyles, activeTab]);

  const recentStyles = useMemo(
    () => recent.map((id) => baseStyles.find((s) => s.id === id)).filter(Boolean) as FontStyle[],
    [recent, baseStyles]
  );

  const handleInput = useCallback((value: string) => {
    setInputText(value);
    if (generateTimer.current) clearTimeout(generateTimer.current);
    generateTimer.current = setTimeout(() => {
      trackEvent("font_generate", { tool: "main-generator" });
    }, 900);
  }, []);

  const handleCopy = useCallback(async (style: FontStyle, converted: string) => {
    const ok = await copyText(converted);
    trackEvent("font_copy", { tool: "main-generator", result: ok ? "success" : "fallback" });
    setRecent(pushRecent(style.id));
    setCopiedId(style.id);
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setCopiedId(null), 1500);
  }, []);

  const handleCopyAll = useCallback(async () => {
    if (!inputText.trim()) return;
    const all = displayStyles.map((s) => convertText(inputText, s)).join("\n");
    const ok = await copyText(all);
    trackEvent("copy_all", { tool: "main-generator", count: displayStyles.length, result: ok ? "success" : "fallback" });
  }, [displayStyles, inputText]);

  const handleShare = useCallback(async (style: FontStyle, converted: string) => {
    const result = await shareOrCopy(converted, `Generated with ${style.name} style on Ff Font Lab`);
    setShareState((prev) => ({ ...prev, [style.id]: result }));
    trackEvent("share_clicked", { tool: "main-generator", method: result });
    setTimeout(() => setShareState((prev) => ({ ...prev, [style.id]: "" })), 1600);
  }, []);

  const handleFavorite = useCallback((styleId: string) => {
    const nowFav = toggleFavorite(styleId);
    setFavorites(getFavorites());
    trackEvent("favorite_style", { style_id: styleId, action: nowFav ? "add" : "remove" });
  }, []);

  const handleTab = useCallback((tab: string) => {
    setActiveTab(tab);
    trackEvent("style_selected", { tool: "main-generator", option: tab });
  }, []);

  const isOverLimit = charLimit ? inputText.length > charLimit : false;
  const hasInput = inputText.length > 0;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  const cardKeyHandler = (style: FontStyle, converted: string) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCopy(style, converted);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 w-full mb-4">
        <div className="flex justify-between items-end">
          <label
            htmlFor="fg-input"
            className="text-[12px] font-medium tracking-[0.05em] text-[#4cd7f6]"
            style={{ fontFamily: "JetBrains Mono" }}
          >
            YOUR TEXT
          </label>
          <div className="flex gap-3 items-center">
            <span
              className={`text-[12px] font-medium ${isOverLimit ? "text-[#ffb4ab]" : "text-[#4cd7f6]"}`}
              style={{ fontFamily: "JetBrains Mono" }}
              aria-live="polite"
            >
              {charLimit ? `${inputText.length} / ${charLimit}` : `${inputText.length} chars · ${wordCount} words`}
            </span>
            <button
              type="button"
              onClick={handleCopyAll}
              disabled={!hasInput}
              className="text-[#bcc9cd] hover:text-[#4cd7f6] transition-colors text-[12px] font-medium flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] rounded"
              style={{ fontFamily: "JetBrains Mono" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }} aria-hidden="true">
                select_all
              </span>{" "}
              Copy All
            </button>
            <button
              type="button"
              onClick={() => handleInput("")}
              className="text-[#bcc9cd] hover:text-[#ffb4ab] transition-colors text-[12px] font-medium flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] rounded"
              style={{ fontFamily: "JetBrains Mono" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }} aria-hidden="true">
                backspace
              </span>{" "}
              Clear
            </button>
          </div>
        </div>
        <textarea
          id="fg-input"
          value={inputText}
          onChange={(e) => handleInput(e.target.value)}
          placeholder={placeholder}
          rows={3}
          aria-describedby={charLimit ? "fg-limit-note" : undefined}
          className={`w-full bg-[#0b1326] text-[#dae2fd] text-[18px] leading-[28px] p-4 rounded-lg border resize-none transition-colors focus:border-[#4cd7f6] focus:outline-none ${
            isOverLimit ? "border-[#ffb4ab]" : "border-[#3d494c]"
          }`}
          style={{ fontFamily: "Inter" }}
        />
        {!hasInput && (
          <p className="text-[12px] text-on-surface-variant flex items-center gap-1.5" style={{ fontFamily: "Inter" }}>
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">edit</span>
            Type something to generate styled text.
          </p>
        )}
        {isOverLimit && charLimitLabel && (
          <p id="fg-limit-note" className="text-[12px] text-[#ffb4ab]" style={{ fontFamily: "Inter" }}>
            {charLimitLabel}
          </p>
        )}
      </div>

      {recentStyles.length > 0 && (
        <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1" aria-label="Recently used styles">
          <span className="text-[11px] uppercase tracking-wider text-on-surface-variant whitespace-nowrap" style={{ fontFamily: "JetBrains Mono" }}>
            Recently used
          </span>
          {recentStyles.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleCopy(s, convertText(inputText || placeholder, s))}
              className="text-[12px] px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6]"
              style={{ fontFamily: "JetBrains Mono" }}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-5" role="tablist" aria-label="Style categories">
        {TABS.map((tab) => {
          const count =
            tab.id === "all" ? baseStyles.length : baseStyles.filter((s) => tagsFor(s.id).includes(tab.id)).length;
          if (count === 0) return null;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => handleTab(tab.id)}
              className={`text-[13px] px-3.5 py-1.5 rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] ${
                activeTab === tab.id
                  ? "bg-primary/15 text-primary border-primary/50 font-semibold"
                  : "border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary/40"
              }`}
              style={{ fontFamily: "JetBrains Mono" }}
            >
              {tab.label}
              <span className="ml-1 opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="tabpanel">
        {displayStyles.map((style) => {
          const previewText = inputText || placeholder;
          const converted = convertText(previewText, style);
          const preserved = hasInput ? preservedCount(inputText, style) : 0;
          const isFav = favorites.includes(style.id);
          const shareLabel =
            shareState[style.id] === "shared"
              ? "Shared"
              : shareState[style.id] === "copied"
                ? "Copied"
                : shareState[style.id] === "failed"
                  ? "Share failed"
                  : "Share";
          return (
            <div
              key={style.id}
              role="button"
              tabIndex={0}
              onClick={() => handleCopy(style, converted)}
              onKeyDown={cardKeyHandler(style, converted)}
              className={`surface-card rounded-lg p-4 flex flex-col gap-2 transition-colors cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] ${
                copiedId === style.id ? "!border-primary bg-primary/5" : ""
              }`}
              aria-label={`${style.name}: ${converted}. Press Enter to copy.`}
            >
              <div className="flex justify-between items-center gap-2">
                <span
                  className="text-[12px] font-medium bg-[#4cd7f6]/10 text-[#4cd7f6] px-2 py-1 rounded truncate"
                  style={{ fontFamily: "JetBrains Mono" }}
                >
                  {style.name.toUpperCase()}
                </span>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavorite(style.id);
                    }}
                    className={`transition-colors p-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] ${
                      isFav ? "text-[#ffb4ab]" : "text-[#bcc9cd]/50 hover:text-[#ffb4ab]"
                    }`}
                    aria-label={isFav ? `Remove ${style.name} from favorites` : `Add ${style.name} to favorites`}
                    aria-pressed={isFav}
                  >
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                      {isFav ? "favorite" : "favorite_border"}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(style, converted);
                    }}
                    className="text-[#bcc9cd]/70 hover:text-[#4cd7f6] transition-colors p-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6]"
                    aria-label={`Share ${style.name} text`}
                  >
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">share</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(style, converted);
                    }}
                    className={`transition-colors p-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] ${
                      copiedId === style.id ? "text-[#4cd7f6]" : "text-[#bcc9cd] group-hover:text-[#4cd7f6]"
                    }`}
                    aria-label={`Copy ${style.name}`}
                  >
                    <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                      {copiedId === style.id ? "check" : "content_copy"}
                    </span>
                  </button>
                </div>
              </div>
              <p
                className="text-[18px] leading-[28px] text-[#dae2fd] line-clamp-2 break-words min-h-[56px]"
                style={{ fontFamily: "Inter" }}
              >
                {converted}
              </p>
              {preserved > 0 && (
                <p className="text-[11px] text-on-surface-variant flex items-center gap-1" style={{ fontFamily: "Inter" }}>
                  <span className="material-symbols-outlined text-[13px]" aria-hidden="true">info</span>
                  Some characters cannot be converted into this style and were preserved.
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div aria-live="polite" className="sr-only">
        {copiedId ? `${copiedId} copied to clipboard` : ""}
      </div>
    </div>
  );
}
