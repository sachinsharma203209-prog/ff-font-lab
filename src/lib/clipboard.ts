/**
 * Clipboard helper with graceful fallback for browsers/environments
 * where the async Clipboard API is unavailable (e.g. non-HTTPS).
 * Returns true on success, false when the user must copy manually.
 */
export async function copyText(text: string): Promise<boolean> {
  if (!text) return false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

/**
 * Web Share with clipboard fallback. Returns "shared" | "copied" | "failed".
 */
export async function shareOrCopy(text: string, title?: string): Promise<"shared" | "copied" | "failed"> {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ text, ...(title ? { title } : {}) });
      return "shared";
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return "failed";
      /* fall through to copy */
    }
  }
  const ok = await copyText(text);
  return ok ? "copied" : "failed";
}
