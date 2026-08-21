import * as fs from 'fs';
import * as path from 'path';

const DIST_DIR = path.resolve(process.cwd(), 'dist');

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

function extractInternalLinks(html: string): string[] {
  const regex = /href=["'](\/[^"']*?)["']/gi;
  const links: string[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    links.push(match[1]);
  }
  return links;
}

// ─── Main ───

function normalizeUrlPath(p: string): string {
  return p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p;
}

console.log('Orphan Page Audit — Scanning dist/ ...\n');

if (!fs.existsSync(DIST_DIR)) {
  console.error('ERROR: dist/ directory not found. Run "astro build" first.');
  process.exit(1);
}

const htmlFiles = getAllHtmlFiles(DIST_DIR);
if (htmlFiles.length === 0) {
  console.error('ERROR: No HTML files found in dist/');
  process.exit(1);
}

// Map every page URL
const allPages = new Set<string>();
for (const file of htmlFiles) {
  allPages.add(normalizeUrlPath(filePathToUrlPath(file)));
}

// Count inbound internal links per page
const inbound = new Map<string, string[]>();
for (const page of allPages) inbound.set(page, []);

for (const file of htmlFiles) {
  const sourcePath = filePathToUrlPath(file);
  const html = fs.readFileSync(file, 'utf-8');
  const links = extractInternalLinks(html);
  for (const raw of links) {
    const clean = raw.split('#')[0].split('?')[0];
    if (!clean || clean === sourcePath) continue;
    const normalized = normalizeUrlPath(clean);
    if (inbound.has(normalized)) {
      inbound.get(normalized)!.push(sourcePath);
    }
  }
}

// Pages exempt from orphan status: home, error page, noindex search utility
const EXEMPT = new Set(['/', '/404', '/search']);

const orphans: Array<{ page: string }> = [];
for (const [page, sources] of inbound) {
  if (EXEMPT.has(page)) continue;
  if (sources.length === 0) {
    orphans.push({ page });
  }
}

orphans.sort((a, b) => a.page.localeCompare(b.page));

console.log('═══════════════════════════════════════════════════════');
console.log('                ORPHAN PAGE AUDIT RESULTS');
console.log('═══════════════════════════════════════════════════════\n');
console.log(`  Pages scanned: ${allPages.size}`);

if (orphans.length === 0) {
  console.log('\n  \x1b[32m✔ No orphan pages — every page has at least one internal link.\x1b[0m\n');
  process.exit(0);
}

console.log(`  \x1b[33m⚠ ${orphans.length} orphan page(s) found (zero inbound internal links):\x1b[0m\n`);
for (const o of orphans) {
  console.log(`       ✗ ${o.page}`);
}
console.log('\n═══════════════════════════════════════════════════════\n');
process.exit(1);
