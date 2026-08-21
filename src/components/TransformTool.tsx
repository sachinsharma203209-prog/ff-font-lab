import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { copyText, shareOrCopy } from "../lib/clipboard";
import { trackEvent } from "../lib/analytics";

export interface TransformOption {
  id: string;
  label: string;
}

interface TransformToolProps {
  /** computes the transformed output for the current input + option */
  transform: (text: string, option: string) => string;
  options?: TransformOption[];
  defaultOption?: string;
  placeholder?: string;
  toolId: string;
  outputLabel?: string;
  /** render output in mono for code-like results */
  monoOutput?: boolean;
  maxLength?: number;
}

export default function TransformTool({
  transform,
  options,
  defaultOption,
  placeholder = "Type or paste your text here…",
  toolId,
  outputLabel = "Result",
  monoOutput = false,
  maxLength = 2000,
}: TransformToolProps) {
  const [input, setInput] = useState("");
  const [option, setOption] = useState(defaultOption || options?.[0]?.id || "");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [shareState, setShareState] = useState<"idle" | "shared" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const output = useMemo(() => (input ? transform(input, option) : ""), [input, option, transform]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    const ok = await copyText(output);
    setCopyState(ok ? "copied" : "failed");
    trackEvent("font_copy", { tool: toolId, result: ok ? "success" : "fallback" });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyState("idle"), 1600);
  }, [output, toolId]);

  const handleShare = useCallback(async () => {
    if (!output) return;
    const result = await shareOrCopy(output, "Styled with Ff Font Lab");
    setShareState(result);
    trackEvent("share_clicked", { tool: toolId, method: result });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setShareState("idle"), 1600);
  }, [output, toolId]);

  const charCount = input.length;
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <label htmlFor={`tt-input-${toolId}`} className="text-[12px] font-medium tracking-[0.05em] text-[#4cd7f6]" style={{ fontFamily: "JetBrains Mono" }}>
            YOUR TEXT
          </label>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-on-surface-variant" style={{ fontFamily: "JetBrains Mono" }}>
              {charCount} chars · {wordCount} words
            </span>
            <button
              type="button"
              onClick={() => setInput("")}
              className="text-[12px] font-medium text-on-surface-variant hover:text-error transition-colors flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] rounded"
              style={{ fontFamily: "JetBrains Mono" }}
              aria-label="Clear input text"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">backspace</span>
              Clear
            </button>
          </div>
        </div>
        <textarea
          id={`tt-input-${toolId}`}
          value={input}
          onChange={(e) => {
            setInput(e.target.value.slice(0, maxLength));
            trackEvent("font_generate", { tool: toolId });
          }}
          placeholder={placeholder}
          rows={3}
          maxLength={maxLength}
          className="w-full bg-[#0b1326] text-[#dae2fd] text-[18px] leading-[28px] p-4 rounded-lg border border-[#3d494c] resize-none transition-colors focus:border-[#4cd7f6] focus:outline-none"
          style={{ fontFamily: "Inter" }}
        />
      </div>

      {options && options.length > 1 && (
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Transformation style">
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={option === opt.id}
              onClick={() => {
                setOption(opt.id);
                trackEvent("style_selected", { tool: toolId, option: opt.id });
              }}
              className={`text-[12px] px-3 py-1.5 rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] ${
                option === opt.id
                  ? "bg-primary/15 text-primary border-primary/50 font-semibold"
                  : "border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary/40"
              }`}
              style={{ fontFamily: "JetBrains Mono" }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <span className="text-[12px] font-medium tracking-[0.05em] text-[#4cd7f6]" style={{ fontFamily: "JetBrains Mono" }}>
            {outputLabel.toUpperCase()}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleShare}
              disabled={!output}
              className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-[13px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] disabled:opacity-40 disabled:cursor-not-allowed ${
                shareState === "shared" || shareState === "copied"
                  ? "bg-primary/20 text-primary"
                  : "bg-surface-container-high text-on-surface-variant hover:text-primary"
              }`}
              aria-label="Share result"
              style={{ fontFamily: "JetBrains Mono" }}
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">share</span>
              {shareState === "copied" ? "Copied link text" : shareState === "shared" ? "Shared" : "Share"}
            </button>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!output}
              className={`btn-primary !py-1.5 !px-4 text-[13px] inline-flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-white`}
              aria-live="polite"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                {copyState === "copied" ? "check" : copyState === "failed" ? "error" : "content_copy"}
              </span>
              {copyState === "copied" ? "✓ Copied" : copyState === "failed" ? "Copy failed" : "Copy"}
            </button>
          </div>
        </div>
        <div
          className={`font-unicode w-full min-h-[64px] bg-[#060e20] rounded-lg border border-outline-variant p-4 break-words ${
            output ? "text-[#dae2fd]" : "text-on-surface-variant/50"
          } ${monoOutput ? "text-[16px]" : "text-[20px]"}`}
          style={{ lineHeight: 1.6 }}
          aria-live="polite"
        >
          {output || <span className="text-[14px]">Type something to generate styled text.</span>}
        </div>
      </div>
    </div>
  );
}
