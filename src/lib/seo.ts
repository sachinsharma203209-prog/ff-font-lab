import { SITE_CONFIG } from "./site-config";

export interface SEOData {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  noindex?: boolean;
}

export function generateTitle(pageTitle: string): string {
  if (pageTitle === SITE_CONFIG.title) {
    return SITE_CONFIG.title;
  }
  return `${pageTitle} | ${SITE_CONFIG.name}`;
}

export function generateCanonical(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_CONFIG.url}${cleanPath}`;
}

export function generateMetaDescription(text: string): string {
  if (text.length <= 160) return text;
  return text.substring(0, 157).trimEnd() + "...";
}
