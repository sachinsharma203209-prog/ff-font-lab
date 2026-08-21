import { useMemo, useState, useCallback } from "react";
import { copyText } from "../lib/clipboard";
import { trackEvent } from "../lib/analytics";

interface NumberSet {
  id: string;
  name: string;
  digits: string[]; // index 0..9
}

const SETS: NumberSet[] = [
  { id: "bold", name: "Bold", digits: Array.from("𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗") },
  { id: "doubleStruck", name: "Double-Struck", digits: Array.from("𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡") },
  { id: "sans", name: "Sans-Serif", digits: Array.from("𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫") },
  { id: "sansBold", name: "Sans Bold", digits: Array.from("𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵") },
  { id: "monospace", name: "Monospace", digits: Array.from("𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿") },
  { id: "superscript", name: "Superscript", digits: Array.from("⁰¹²³⁴⁵⁶⁷⁸⁹") },
  { id: "subscript", name: "Subscript", digits: Array.from("₀₁₂₃₄₅₆₇₈₉") },
  { id: "circled", name: "Circled", digits: ["⓪", "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"] },
  { id: "negativeCircled", name: "Negative Circled", digits: ["⓿", "❶", "❷", "❸", "❹", "❺", "❻", "❼", "❽", "❾"] },
  { id: "fullwidth", name: "Fullwidth", digits: Array.from("０１２３４５６７８９") },
];

const cpOf = (ch: string): string => {
  const code = ch.codePointAt(0);
  return code !== undefined ? `U+${code.toString(16).toUpperCase().padStart(4, "0")}` : "";
};

export default function NumberGeneratorIsland() {
  const [digit, setDigit] = useState(0);
  const [sequence, setSequence] = useState("");
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const validSequence = useMemo(() => {
    const cleaned = sequence.replace(/[^0-9]/g, "");
    return cleaned.slice(0, 12);
  }, [sequence]);

  const handleCopy = useCallback(async (value: string, label: string) => {
    const ok = await copyText(value);
    setCopiedValue(value + label);
    trackEvent("symbol_copied", { scope: "number-generator", result: ok ? "success" : "fallback" });
    setTimeout(() => setCopiedValue(null), 1400);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-[12px] font-medium tracking-[0.05em] text-[#4cd7f6]" style={{ fontFamily: "JetBrains Mono" }}>
          CHOOSE A DIGIT
        </span>
        <div className="flex flex-wrap gap-1.5">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setDigit(n)}
              aria-pressed={digit === n}
              className={`w-10 h-10 rounded-md text-[16px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] ${
                digit === n ? "bg-primary text-[#003640]" : "bg-surface-container-high text-on-surface-variant hover:text-primary"
              }`}
              style={{ fontFamily: "JetBrains Mono" }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[14px] font-semibold text-on-surface mb-3" style={{ fontFamily: "Sora" }}>
          Every real variant of “{digit}” — tap to copy
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {SETS.map((set) => {
            const ch = set.digits[digit];
            return (
              <button
                key={set.id}
                type="button"
                onClick={() => handleCopy(ch, set.name)}
                className={`surface-card !p-3 flex flex-col items-center gap-1 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] ${
                  copiedValue === ch + set.name ? "!border-primary bg-primary/10" : ""
                }`}
                aria-label={`Copy ${set.name} version of ${digit}`}
              >
                <span className="font-unicode text-[30px] leading-none text-on-surface">{ch}</span>
                <span className="text-[10px] font-medium text-primary uppercase tracking-wide text-center" style={{ fontFamily: "JetBrains Mono" }}>
                  {set.name}
                </span>
                <span className="text-[9px] text-on-surface-variant" style={{ fontFamily: "JetBrains Mono" }}>
                  {copiedValue === ch + set.name ? "✓ Copied" : cpOf(ch)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 surface-card !bg-[#131b2e]">
        <label htmlFor="num-seq" className="text-[12px] font-medium tracking-[0.05em] text-[#4cd7f6]" style={{ fontFamily: "JetBrains Mono" }}>
          CONVERT A NUMBER SEQUENCE
        </label>
        <input
          id="num-seq"
          type="text"
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          placeholder="Try your birth year, e.g. 2026"
          inputMode="numeric"
          pattern="[0-9]*"
          className="input-glow w-full max-w-[320px] text-[16px]"
          style={{ fontFamily: "JetBrains Mono" }}
          aria-describedby="num-seq-help"
        />
        <p id="num-seq-help" className="text-[11px] text-on-surface-variant -mt-1" style={{ fontFamily: "Inter" }}>
          Digits only · up to 12 numbers
        </p>
        {validSequence && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SETS.map((set) => {
              const converted = Array.from(validSequence)
                .map((d) => set.digits[Number(d)])
                .join("");
              return (
                <button
                  key={set.id}
                  type="button"
                  onClick={() => handleCopy(converted, set.name)}
                  className={`floating-layer !p-3 flex items-center justify-between gap-2 cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6] ${
                    copiedValue === converted + set.name ? "!border-primary" : ""
                  }`}
                  aria-label={`Copy ${validSequence} in ${set.name} style`}
                >
                  <span className="font-unicode text-[18px] text-on-surface break-all">{converted}</span>
                  <span className="text-[10px] font-medium text-primary uppercase whitespace-nowrap" style={{ fontFamily: "JetBrains Mono" }}>
                    {copiedValue === converted + set.name ? "✓ Copied" : set.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
