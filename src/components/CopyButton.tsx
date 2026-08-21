import { useCallback, useState, useEffect, useRef } from "react";
import { copyText } from "../lib/clipboard";
import { trackEvent } from "../lib/analytics";

interface CopyButtonProps {
  text: string;
  label?: string;
  eventName?: "font_copy" | "symbol_copied" | "copy_all";
  eventMeta?: Record<string, string | number>;
  className?: string;
  compact?: boolean;
}

export default function CopyButton({
  text,
  label,
  eventName = "font_copy",
  eventMeta,
  className = "",
  compact = false,
}: CopyButtonProps) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleCopy = useCallback(
    async (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
      const ok = await copyText(text);
      setState(ok ? "copied" : "failed");
      trackEvent(eventName, { ...(eventMeta || {}), result: ok ? "success" : "fallback" });
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setState("idle"), 1600);
    },
    [text, eventName, eventMeta]
  );

  const ariaLabel = label
    ? state === "copied"
      ? `${label} — copied`
      : `Copy ${label}`
    : "Copy";

  return (
    <button
      type="button"
      onClick={handleCopy}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleCopy(e);
        }
      }}
      className={`copy-btn inline-flex items-center gap-1 rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] ${
        compact ? "px-2 py-1 text-[12px]" : "px-3 py-1.5 text-[13px]"
      } ${
        state === "copied"
          ? "bg-[#4cd7f6]/20 text-[#4cd7f6]"
          : state === "failed"
            ? "bg-[#ffb4ab]/10 text-[#ffb4ab]"
            : "bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-primary/10"
      } ${className}`}
      aria-label={ariaLabel}
      aria-live="polite"
    >
      <span className="material-symbols-outlined" style={{ fontSize: compact ? "14px" : "16px" }} aria-hidden="true">
        {state === "copied" ? "check" : state === "failed" ? "error" : "content_copy"}
      </span>
      {!compact && (
        <span style={{ fontFamily: "JetBrains Mono" }}>
          {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy"}
        </span>
      )}
    </button>
  );
}
