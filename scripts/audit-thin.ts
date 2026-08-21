import * as fs from 'fs';
import * as path from 'path';

const DIST_DIR = path.resolve(process.cwd(), 'dist');

/** Minimum visible text (in characters) for a page to be considered substantial */
const MIN_TEXT_CHARS = 1200;
/** Warning threshold — between this and the minimum, flag as warning only */
const WARN_TEXT_CHARS = 2000;

function getAllHtmlFiles(dir: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

function filePathToUrlPath(filePath: string): string {
  const rel = path.relative(DIST_DIR, filePath).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'index.html'.length);
  return '/' + rel.replace(/\.html$/, '');
}

function extractVisibleText(html: string): string {
  let text = html;
  // Remove non-visible blocks
  text = text.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  text = text.replace(/<style[\s\S]*?<\/style>/gi, ' ');
  text = text.replace(/<!--[\s\S]*?-->/g, ' ');
  text = text.replace(/<(nav|header|footer)[\s\S]*?<\/\1>/gi, ' ');
  // Strip tags
  text = text.replace(/<[^>]+>/g, ' ');
  // Collapse whitespace
  return text.replace(/\s+/g, ' ').trim();
}

// ─── Main ───

/** Utility pages exempt from content-depth rules (not SEO landing pages) */
const EXEMPT = new Set(['/404', '/search', '/contact', '/terms', '/privacy']);

console.log('Thin Content Audit — Scanning dist/ ...\n');

if (!fs.existsSync(DIST_DIR)) {
  console.error('ERROR: dist/ directory not found. Run "astro build" first.');
  process.exit(1);
}

const htmlFiles = getAllHtmlFiles(DIST_DIR);
if (htmlFiles.length === 0) {
  console.error('ERROR: No HTML files found in dist/');
  process.exit(1);
}

interface ThinPage {
  page: string;
  chars: number;
  words: number;
  severity: 'error' | 'warning';
}

const thinPages: ThinPage[] = [];
let totalWords = 0;

for (const file of htmlFiles) {
  const rawPath = filePathToUrlPath(file);
  const pagePath = rawPath !== '/' && rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath;
  if (EXEMPT.has(pagePath)) continue;
  const html = fs.readFileSync(file, 'utf-8');
  const text = extractVisibleText(html);
  const words = text ? text.split(' ').length : 0;
  totalWords += words;

  if (text.length < MIN_TEXT_CHARS) {
    thinPages.push({ page: pagePath, chars: text.length, words, severity: 'error' });
  } else if (text.length < WARN_TEXT_CHARS) {
    thinPages.push({ page: pagePath, chars: text.length, words, severity: 'warning' });
  }
}

thinPages.sort((a, b) => a.chars - b.chars);

console.log('═══════════════════════════════════════════════════════');
console.log('                THIN CONTENT AUDIT RESULTS');
console.log('═══════════════════════════════════════════════════════\n');
console.log(`  Pages scanned: ${htmlFiles.length}`);
console.log(`  Total visible words: ${totalWords.toLocaleString()}`);
console.log(`  Thresholds: error < ${MIN_TEXT_CHARS} chars · warning < ${WARN_TEXT_CHARS} chars\n`);

if (thinPages.length === 0) {
  console.log('  \x1b[32m✔ No thin pages — all content meets the minimum depth.\x1b[0m\n');
  process.exit(0);
}

const errors = thinPages.filter((p) => p.severity === 'error');
const warnings = thinPages.filter((p) => p.severity === 'warning');

for (const p of [...errors, ...warnings]) {
  const icon = p.severity === 'error' ? '✗' : '⚠';
  console.log(`  ${icon} [${p.page}] ${p.chars} chars / ${p.words} words`);
}

console.log('\n═══════════════════════════════════════════════════════');
console.log(`  Errors: ${errors.length} · Warnings: ${warnings.length}`);
console.log('═══════════════════════════════════════════════════════\n');

process.exit(errors.length > 0 ? 1 : 0);
