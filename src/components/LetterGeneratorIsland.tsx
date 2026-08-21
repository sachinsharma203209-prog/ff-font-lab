import { useMemo, useState, useCallback } from "react";
import { getAllStyles } from "../lib/font-styles";
import { copyText } from "../lib/clipboard";
import { trackEvent } from "../lib/analytics";

const ALL = getAllStyles();
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";

export default function LetterGeneratorIsland() {
  const [letter, setLetter] = useState("A");
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const variants = useMemo(() => {
    const out: Array<{ styleName: string; char: string; codepoint: string; exists: boolean }> = [];
    for (const style of ALL) {
      const mapped = style.map[letter];
      const exists = Boolean(mapped) && mapped !== letter;
      const ch = exists ? mapped : letter;
      const code = ch.codePointAt(0);
      out.push({
        styleName: style.name,
        char: ch,
        codepoint: code !== undefined ? `U+${code.toString(16).toUpperCase().padStart(4, "0")}` : "",
        exists,
      });
    }
    return out;
  }, [letter]);

  const handleCopy = useCallback(async (char: string, styleName: string) => {
    const ok = await copyText(char);
    setCopiedValue(char + styleName);
    trackEvent("symbol_copied", { scope: "letter-generator", result: ok ? "success" : "fallback" });
    setTimeout(() => setCopiedValue(null), 1400);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-[12px] font-medium tracking-[0.05em] text-[#4cd7f6]" style={{ fontFamily: "JetBrains Mono" }}>
          CHOOSE A LETTER
        </span>
        <div className="flex flex-wrap gap-1.5">
          {UPPER.split("").map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLetter(l)}
              aria-pressed={letter === l}
              className={`w-9 h-9 rounded-md text-[15px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] ${
                letter === l ? "bg-primary text-[#003640]" : "bg-surface-container-high text-on-surface-variant hover:text-primary"
              }`}
              style={{ fontFamily: "JetBrains Mono" }}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {LOWER.split("").map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLetter(l)}
              aria-pressed={letter === l}
              className={`w-9 h-9 rounded-md text-[14px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] ${
                letter === l ? "bg-primary text-[#003640]" : "bg-surface-container text-on-surface-variant hover:text-primary"
              }`}
              style={{ fontFamily: "JetBrains Mono" }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[14px] font-semibold text-on-surface mb-3" style={{ fontFamily: "Sora" }}>
          Every style for “{letter}” — tap any tile to copy
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {variants.map((v) => (
            <button
              key={v.styleName}
              type="button"
              onClick={() => handleCopy(v.char, v.styleName)}
              className={`surface-card !p-3 flex flex-col items-center gap-1.5 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] ${
                copiedValue === v.char + v.styleName ? "!border-primary bg-primary/10" : ""
              } ${!v.exists ? "opacity-60" : ""}`}
              aria-label={v.exists ? `Copy ${v.styleName} version of ${letter}` : `${v.styleName} has no variant of ${letter} — original shown`}
            >
              <span className="text-[30px] leading-none text-on-surface">{v.char}</span>
              <span className="text-[10px] font-medium text-primary uppercase tracking-wide" style={{ fontFamily: "JetBrains Mono" }}>
                {v.styleName}
              </span>
              <span className="text-[9px] text-on-surface-variant" style={{ fontFamily: "JetBrains Mono" }}>
                {copiedValue === v.char + v.styleName ? "✓ Copied" : v.codepoint}
              </span>
            </button>
          ))}
        </div>
        <p className="text-[12px] text-on-surface-variant mt-3 flex items-start gap-1.5" style={{ fontFamily: "Inter" }}>
          <span className="material-symbols-outlined text-[14px] mt-0.5" aria-hidden="true">info</span>
          Tiles showing the original letter mean that style has no real Unicode variant for “{letter}” — we never fake missing characters.
        </p>
      </div>
    </div>
  );
}
