import * as fs from 'fs';
import * as path from 'path';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const SITE_URL = 'https://fontchange.co.in';

interface Issue {
  file: string;
  check: string;
  message: string;
  severity: 'error' | 'warning';
}

const issues: Issue[] = [];

function addIssue(file: string, check: string, message: string, severity: 'error' | 'warning' = 'error') {
  issues.push({ file, check, message, severity });
}

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

function extractTag(html: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}[^>]*>`, 'i');
  const match = html.match(regex);
  return match ? match[0] : null;
}

function extractMetaContent(html: string, name: string): string | null {
  const regex1 = new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content="([^"]*)"`, 'i');
  const match1 = html.match(regex1);
  if (match1) return match1[1];
  const regex2 = new RegExp(`<meta[^>]*content="([^"]*)"[^>]*name=["']${name}["']`, 'i');
  const match2 = html.match(regex2);
  if (match2) return match2[1];
  const regex3 = new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content='([^']*)'`, 'i');
  const match3 = html.match(regex3);
  if (match3) return match3[1];
  const regex4 = new RegExp(`<meta[^>]*content='([^']*)'[^>]*name=["']${name}["']`, 'i');
  const match4 = html.match(regex4);
  return match4 ? match4[1] : null;
}

function extractPropertyContent(html: string, property: string): string | null {
  const regex1 = new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content="([^"]*)"`, 'i');
  const match1 = html.match(regex1);
  if (match1) return match1[1];
  const regex2 = new RegExp(`<meta[^>]*content="([^"]*)"[^>]*property=["']${property}["']`, 'i');
  const match2 = html.match(regex2);
  if (match2) return match2[1];
  const regex3 = new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content='([^']*)'`, 'i');
  const match3 = html.match(regex3);
  if (match3) return match3[1];
  const regex4 = new RegExp(`<meta[^>]*content='([^']*)'[^>]*property=["']${property}["']`, 'i');
  const match4 = html.match(regex4);
  return match4 ? match4[1] : null;
}

function extractAllH1Tags(html: string): string[] {
  const regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
  const matches: string[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1].replace(/<[^>]+>/g, '').trim());
  }
  return matches;
}

function extractAllScriptJsonLd(html: string): string[] {
  const regex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const matches: string[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1]);
  }
  return matches;
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

function extractImages(html: string): { tag: string; hasAlt: boolean }[] {
  const regex = /<img[^>]*>/gi;
  const images: { tag: string; hasAlt: boolean }[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const tag = match[0];
    const hasAlt = /\balt\s*=\s*["'][^"']+["']/i.test(tag);
    images.push({ tag, hasAlt });
  }
  return images;
}

function checkFile(filePath: string, html: string) {
  const relPath = path.relative(DIST_DIR, filePath);

  // 1. Missing <title> tag
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    addIssue(relPath, 'title', 'Missing or empty <title> tag');
  }

  // 2. Missing <meta name="description">
  const description = extractMetaContent(html, 'description');
  if (!description) {
    addIssue(relPath, 'meta-description', 'Missing <meta name="description">');
  } else if (description.length < 70) {
    addIssue(relPath, 'meta-description', `Meta description too short (${description.length} chars, minimum 70)`, 'warning');
  } else if (description.length > 160) {
    addIssue(relPath, 'meta-description', `Meta description too long (${description.length} chars, maximum 160)`, 'warning');
  }

  // 3. Missing <link rel="canonical">
  const canonical = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)
    || html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  if (!canonical) {
    addIssue(relPath, 'canonical', 'Missing <link rel="canonical">');
  }

  // 4. Missing <h1> tag
  const h1Tags = extractAllH1Tags(html);
  if (h1Tags.length === 0) {
    addIssue(relPath, 'h1', 'Missing <h1> tag');
  }

  // 5. Multiple <h1> tags
  if (h1Tags.length > 1) {
    addIssue(relPath, 'h1-multiple', `Multiple <h1> tags found (${h1Tags.length})`, 'warning');
  }

  // 6. Missing Open Graph tags
  const ogTitle = extractPropertyContent(html, 'og:title');
  const ogDescription = extractPropertyContent(html, 'og:description');
  const ogUrl = extractPropertyContent(html, 'og:url');

  if (!ogTitle) {
    addIssue(relPath, 'og-title', 'Missing og:title');
  }
  if (!ogDescription) {
    addIssue(relPath, 'og-description', 'Missing og:description');
  }
  if (!ogUrl) {
    addIssue(relPath, 'og-url', 'Missing og:url');
  }

  // 7. Missing Twitter card tags
  const twitterCard = extractMetaContent(html, 'twitter:card')
    || extractPropertyContent(html, 'twitter:card');
  const twitterTitle = extractMetaContent(html, 'twitter:title')
    || extractPropertyContent(html, 'twitter:title');

  if (!twitterCard) {
    addIssue(relPath, 'twitter-card', 'Missing twitter:card meta tag', 'warning');
  }
  if (!twitterTitle) {
    addIssue(relPath, 'twitter-title', 'Missing twitter:title meta tag', 'warning');
  }

  // 8. Invalid JSON-LD
  const jsonLdBlocks = extractAllScriptJsonLd(html);
  for (const block of jsonLdBlocks) {
    try {
      JSON.parse(block);
    } catch {
      addIssue(relPath, 'jsonld-invalid', 'Invalid JSON-LD script content');
    }
  }

  // 9. (Duplicates checked later)

  // 10. Broken internal links
  const internalLinks = extractInternalLinks(html);
  for (const link of internalLinks) {
    const cleanLink = link.split('#')[0].split('?')[0];
    if (!cleanLink) continue;
    const targetPath = path.join(DIST_DIR, cleanLink);
    const targetAsDir = path.join(DIST_DIR, cleanLink, 'index.html');
    const targetAsFile = targetPath;
    if (!fs.existsSync(targetAsDir) && !fs.existsSync(targetAsFile)) {
      addIssue(relPath, 'broken-link', `Broken internal link: ${link}`);
    }
  }

  // 11. Missing alt attributes on images
  const images = extractImages(html);
  for (const img of images) {
    if (!img.hasAlt) {
      addIssue(relPath, 'missing-alt', `Image missing alt attribute: ${img.tag.substring(0, 80)}...`);
    }
  }
}

function checkDuplicates(allFiles: { relPath: string; html: string }[]) {
  const titles: Record<string, string[]> = {};
  const descriptions: Record<string, string[]> = {};

  for (const { relPath, html } of allFiles) {
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (titleMatch && titleMatch[1].trim()) {
      const title = titleMatch[1].trim();
      if (!titles[title]) titles[title] = [];
      titles[title].push(relPath);
    }

    const desc = extractMetaContent(html, 'description');
    if (desc) {
      if (!descriptions[desc]) descriptions[desc] = [];
      descriptions[desc].push(relPath);
    }
  }

  for (const [title, files] of Object.entries(titles)) {
    if (files.length > 1) {
      addIssue(files[0], 'duplicate-title', `Duplicate <title> across pages: ${files.join(', ')}`);
    }
  }

  for (const [desc, files] of Object.entries(descriptions)) {
    if (files.length > 1) {
      addIssue(files[0], 'duplicate-description', `Duplicate meta description across pages: ${files.join(', ')}`);
    }
  }
}

// ─── Main ───

console.log('SEO Check — Scanning dist/ ...\n');

if (!fs.existsSync(DIST_DIR)) {
  console.error('ERROR: dist/ directory not found. Run "astro build" first.');
  process.exit(1);
}

const htmlFiles = getAllHtmlFiles(DIST_DIR);

if (htmlFiles.length === 0) {
  console.error('ERROR: No HTML files found in dist/');
  process.exit(1);
}

console.log(`Found ${htmlFiles.length} HTML file(s)\n`);

const fileData: { relPath: string; html: string }[] = [];

for (const filePath of htmlFiles) {
  const html = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(DIST_DIR, filePath);
  fileData.push({ relPath, html });
  checkFile(filePath, html);
}

checkDuplicates(fileData);

// ─── Report ───

const errors = issues.filter(i => i.severity === 'error');
const warnings = issues.filter(i => i.severity === 'warning');

const groupedByCheck: Record<string, Issue[]> = {};
for (const issue of issues) {
  if (!groupedByCheck[issue.check]) groupedByCheck[issue.check] = [];
  groupedByCheck[issue.check].push(issue);
}

const checkLabels: Record<string, string> = {
  'title': 'Title Tag',
  'meta-description': 'Meta Description',
  'canonical': 'Canonical Link',
  'h1': 'H1 Tag (Missing)',
  'h1-multiple': 'H1 Tag (Multiple)',
  'og-title': 'OG: Title',
  'og-description': 'OG: Description',
  'og-url': 'OG: URL',
  'twitter-card': 'Twitter Card',
  'twitter-title': 'Twitter Title',
  'jsonld-invalid': 'JSON-LD Validity',
  'duplicate-title': 'Duplicate Titles',
  'duplicate-description': 'Duplicate Descriptions',
  'broken-link': 'Broken Internal Links',
  'missing-alt': 'Image Alt Attributes',
};

const allChecks = [
  'title', 'meta-description', 'canonical', 'h1', 'h1-multiple',
  'og-title', 'og-description', 'og-url',
  'twitter-card', 'twitter-title',
  'jsonld-invalid', 'duplicate-title', 'duplicate-description',
  'broken-link', 'missing-alt',
];

console.log('═══════════════════════════════════════════════════════');
console.log('                   SEO CHECK RESULTS');
console.log('═══════════════════════════════════════════════════════\n');

for (const check of allChecks) {
  const label = checkLabels[check] || check;
  const checkIssues = groupedByCheck[check] || [];
  const errorCount = checkIssues.filter(i => i.severity === 'error').length;
  const warnCount = checkIssues.filter(i => i.severity === 'warning').length;

  let status: string;
  if (errorCount > 0) {
    status = '\x1b[31mFAIL\x1b[0m';
  } else if (warnCount > 0) {
    status = '\x1b[33mWARN\x1b[0m';
  } else {
    status = '\x1b[32mPASS\x1b[0m';
  }

  const details = [];
  if (errorCount > 0) details.push(`${errorCount} error(s)`);
  if (warnCount > 0) details.push(`${warnCount} warning(s)`);
  const detailStr = details.length > 0 ? ` — ${details.join(', ')}` : '';

  console.log(`  ${status}  ${label}${detailStr}`);

  for (const issue of checkIssues) {
    const icon = issue.severity === 'error' ? '  ✗' : '  ⚠';
    console.log(`       ${icon} [${issue.file}] ${issue.message}`);
  }
}

console.log('\n═══════════════════════════════════════════════════════');
console.log(`  Files scanned: ${htmlFiles.length}`);
console.log(`  Errors: ${errors.length}`);
console.log(`  Warnings: ${warnings.length}`);
console.log('═══════════════════════════════════════════════════════\n');

if (errors.length > 0) {
  console.log('\x1b[31m✖ SEO check failed — critical issues found.\x1b[0m');
  process.exit(1);
} else if (warnings.length > 0) {
  console.log('\x1b[33m⚠ SEO check passed with warnings.\x1b[0m');
  process.exit(0);
} else {
  console.log('\x1b[32m✔ All SEO checks passed.\x1b[0m');
  process.exit(0);
}
