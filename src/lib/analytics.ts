export type AnalyticsEvent =
  | "font_generate"
  | "font_copy"
  | "copy_all"
  | "style_selected"
  | "search_used"
  | "symbol_copied"
  | "platform_page_view"
  | "use_case_page_view"
  | "share_clicked"
  | "favorite_style";

/**
 * Privacy-first event tracking. Tracks actions only — never the user's
 * actual input or generated text. Forwards to window.dataLayer (GTM) and
 * gtag() when present; silently no-ops otherwise.
 */
export function trackEvent(event: AnalyticsEvent, params: Record<string, string | number> = {}): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  const payload = { event, ...params };
  if (!w.dataLayer) w.dataLayer = [];
  w.dataLayer.push(payload);
  if (typeof w.gtag === "function") {
    w.gtag("event", event, params);
  }
}
