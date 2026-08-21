/**
 * Fix codemod: moves the injected howToSchema/faqSchema block to the END of
 * frontmatter so it runs after `tips` and `faqs` are declared (TDZ fix).
 */
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(process.cwd(), 'src', 'pages');
const DIRS = ['styles', 'social', 'gaming'];

const BLOCK_RE = /\n*const howToSchema = generateHowToSchema\(\{[\s\S]*?const faqSchema = generateFAQSchema\(faqs\);\n*/;
const FRONTMATTER_RE = /^---\n[\s\S]*?\n---/;

let fixed = 0;

for (const dir of DIRS) {
  const dirPath = path.join(ROOT, dir);
  for (const file of fs.readdirSync(dirPath)) {
    if (!file.endsWith('.astro') || file === 'index.astro') continue;
    const filePath = path.join(dirPath, file);
    let src = fs.readFileSync(filePath, 'utf-8');

    const m = src.match(BLOCK_RE);
    if (!m) continue;

    const fm = src.match(FRONTMATTER_RE);
    if (!fm) {
      console.warn(`SKIP (no frontmatter): ${dir}/${file}`);
      continue;
    }

    const block = m[0].trim();
    let frontmatter = fm[0].replace(BLOCK_RE, '\n');
    frontmatter = frontmatter + '\n\n' + block;

    src = src.replace(FRONTMATTER_RE, frontmatter);
    fs.writeFileSync(filePath, src, 'utf-8');
    fixed++;
    console.log(`FIXED: ${dir}/${file}`);
  }
}

console.log(`\nDone. Fixed: ${fixed}`);
