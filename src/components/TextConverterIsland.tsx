import { useMemo, useState, useCallback } from "react";
import { getAllStyles, convertText } from "../lib/font-styles";
import { copyText } from "../lib/clipboard";
import { trackEvent } from "../lib/analytics";

const ALL = getAllStyles();

export default function TextConverterIsland({ defaultText = "" }: { defaultText?: string }) {
  const [input, setInput] = useState(defaultText);
  const [styleId, setStyleId] = useState(ALL[0]?.id || "");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  const style = useMemo(() => ALL.find((s) => s.id === styleId) || ALL[0], [styleId]);
  const output = useMemo(() => (input ? convertText(input, style) : ""), [input, style]);

  const preserved = useMemo(() => {
    if (!input) return 0;
    let count = 0;
    for (const ch of input) {
      if (ch === "\n" || ch === " ") continue;
      if (!style.map[ch]) count++;
    }
    return count;
  }, [input, style]);

  const charCount = input.length;
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  const handleCopy = useCallback(async () => {
    if (!output) return;
    const ok = await copyText(output);
    setCopyState(ok ? "copied" : "failed");
    trackEvent("font_copy", { tool: "text-converter", result: ok ? "success" : "fallback" });
    setTimeout(() => setCopyState("idle"), 1600);
  }, [output]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <label htmlFor="tc-input" className="text-[12px] font-medium tracking-[0.05em] text-[#4cd7f6]" style={{ fontFamily: "JetBrains Mono" }}>
            INPUT
          </label>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-on-surface-variant" style={{ fontFamily: "JetBrains Mono" }} aria-live="polite">
              {charCount} chars · {wordCount} words
            </span>
            <button
              type="button"
              onClick={() => setInput("")}
              className="text-[12px] font-medium text-on-surface-variant hover:text-error transition-colors flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] rounded"
              style={{ fontFamily: "JetBrains Mono" }}
              aria-label="Clear input"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">backspace</span>
              Clear
            </button>
          </div>
        </div>
        <textarea
          id="tc-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste your text here…"
          rows={3}
          className="w-full bg-[#0b1326] text-[#dae2fd] text-[18px] leading-[28px] p-4 rounded-lg border border-[#3d494c] resize-none transition-colors focus:border-[#4cd7f6] focus:outline-none"
          style={{ fontFamily: "Inter" }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="tc-style" className="text-[12px] font-medium tracking-[0.05em] text-[#4cd7f6]" style={{ fontFamily: "JetBrains Mono" }}>
          STYLE
        </label>
        <select
          id="tc-style"
          value={styleId}
          onChange={(e) => {
            setStyleId(e.target.value);
            trackEvent("style_selected", { tool: "text-converter", option: e.target.value });
          }}
          className="input-glow w-full sm:w-auto sm:max-w-[320px] text-[14px] cursor-pointer"
        >
          {ALL.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <span className="text-[12px] font-medium tracking-[0.05em] text-[#4cd7f6]" style={{ fontFamily: "JetBrains Mono" }}>
            OUTPUT — {style.name.toUpperCase()}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!output}
            className={`btn-primary !py-1.5 !px-4 text-[13px] inline-flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed`}
            aria-live="polite"
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              {copyState === "copied" ? "check" : copyState === "failed" ? "error" : "content_copy"}
            </span>
            {copyState === "copied" ? "✓ Copied" : copyState === "failed" ? "Copy failed" : "Copy"}
          </button>
        </div>
        <div
          className="w-full min-h-[72px] bg-[#060e20] rounded-lg border border-outline-variant p-4 break-words text-[20px]"
          style={{ fontFamily: "Inter", lineHeight: 1.6 }}
          aria-live="polite"
        >
          {output || <span className="text-[14px] text-on-surface-variant/50">Type something to generate styled text.</span>}
        </div>
        {preserved > 0 && (
          <p className="text-[12px] text-tertiary flex items-center gap-1.5" style={{ fontFamily: "Inter" }}>
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">info</span>
            Some characters cannot be converted into this style and were preserved.
          </p>
        )}
      </div>
    </div>
  );
}
