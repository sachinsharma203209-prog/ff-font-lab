import { useState, useCallback, useMemo } from "react";
import { invisibleText, getInvisibleCharInfo, type InvisibleChar } from "../lib/text-transforms";
import { copyText } from "../lib/clipboard";
import { trackEvent } from "../lib/analytics";

const KINDS: Array<{ id: InvisibleChar; label: string }> = [
  { id: "zwsp", label: "Zero-Width Space" },
  { id: "zwnj", label: "Zero-Width Non-Joiner" },
  { id: "wordJoiner", label: "Word Joiner" },
  { id: "braille", label: "Braille Blank" },
];

export default function InvisibleTextIsland() {
  const [count, setCount] = useState(10);
  const [kind, setKind] = useState<InvisibleChar>("zwsp");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  const output = useMemo(() => invisibleText(count, kind), [count, kind]);
  const info = useMemo(() => getInvisibleCharInfo(kind), [kind]);

  const handleCopy = useCallback(async () => {
    const ok = await copyText(output);
    setCopyState(ok ? "copied" : "failed");
    trackEvent("font_copy", { tool: "invisible-text", result: ok ? "success" : "fallback" });
    setTimeout(() => setCopyState("idle"), 1600);
  }, [output]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="inv-kind" className="text-[12px] font-medium tracking-[0.05em] text-[#4cd7f6]" style={{ fontFamily: "JetBrains Mono" }}>
          CHARACTER TYPE
        </label>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Invisible character type">
          {KINDS.map((k) => (
            <button
              key={k.id}
              type="button"
              role="radio"
              aria-checked={kind === k.id}
              onClick={() => {
                setKind(k.id);
                trackEvent("style_selected", { tool: "invisible-text", option: k.id });
              }}
              className={`text-[12px] px-3 py-1.5 rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] ${
                kind === k.id
                  ? "bg-primary/15 text-primary border-primary/50 font-semibold"
                  : "border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary/40"
              }`}
              style={{ fontFamily: "JetBrains Mono" }}
            >
              {k.label}
            </button>
          ))}
        </div>
        <p className="text-[12px] text-on-surface-variant flex items-center gap-1.5" style={{ fontFamily: "Inter" }}>
          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">data_object</span>
          {info}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label htmlFor="inv-count" className="text-[12px] font-medium tracking-[0.05em] text-[#4cd7f6]" style={{ fontFamily: "JetBrains Mono" }}>
            HOW MANY
          </label>
          <span className="text-[13px] font-semibold text-on-surface" style={{ fontFamily: "JetBrains Mono" }} aria-live="polite">
            {count}
          </span>
        </div>
        <input
          id="inv-count"
          type="range"
          min={1}
          max={500}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full accent-[#4cd7f6] cursor-pointer"
          aria-valuetext={`${count} invisible characters`}
        />
        <div className="flex justify-between text-[11px] text-on-surface-variant" style={{ fontFamily: "JetBrains Mono" }}>
          <span>1</span>
          <span>500</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <span className="text-[12px] font-medium tracking-[0.05em] text-[#4cd7f6]" style={{ fontFamily: "JetBrains Mono" }}>
            OUTPUT — LOOKS EMPTY, ISN'T
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={`btn-primary !py-1.5 !px-4 text-[13px] inline-flex items-center gap-1.5`}
            aria-live="polite"
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              {copyState === "copied" ? "check" : copyState === "failed" ? "error" : "content_copy"}
            </span>
            {copyState === "copied" ? "✓ Copied" : copyState === "failed" ? "Copy failed" : `Copy ${count} chars`}
          </button>
        </div>
        <div
          className="w-full h-[72px] bg-[#060e20] rounded-lg border border-outline-variant p-4 flex items-center justify-center"
          aria-label={`${count} invisible characters generated`}
        >
          <span className="text-[13px] text-on-surface-variant/60 select-none" style={{ fontFamily: "JetBrains Mono" }}>
            {copyState === "copied" ? "✓ Copied to clipboard — paste it anywhere" : "(nothing visible here — that's the point)"}
          </span>
        </div>
      </div>
    </div>
  );
}
