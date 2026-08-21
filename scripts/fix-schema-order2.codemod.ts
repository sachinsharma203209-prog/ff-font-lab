/**
 * Fix codemod #2: the schema block landed AFTER the frontmatter closing
 * delimiter. Moves it back inside, right before the closing `---`.
 */
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(process.cwd(), 'src', 'pages');
const DIRS = ['styles', 'social', 'gaming'];

const BLOCK_RE = /\n*const howToSchema = generateHowToSchema\(\{[\s\S]*?const faqSchema = generateFAQSchema\(faqs\);\n*/;

let fixed = 0;

for (const dir of DIRS) {
  const dirPath = path.join(ROOT, dir);
  for (const file of fs.readdirSync(dirPath)) {
    if (!file.endsWith('.astro') || file === 'index.astro') continue;
    const filePath = path.join(dirPath, file);
    let src = fs.readFileSync(filePath, 'utf-8');

    const m = src.match(BLOCK_RE);
    if (!m) continue;

    const closeIdx = src.indexOf('\n---\n', 4);
    if (closeIdx === -1) {
      console.warn(`SKIP (no closing ---): ${dir}/${file}`);
      continue;
    }

    const blockStart = src.indexOf('const howToSchema');
    if (blockStart !== -1 && blockStart < closeIdx) {
      console.log(`ALREADY OK: ${dir}/${file}`);
      continue;
    }

    // Remove misplaced block (it sits after the closing delimiter)
    src = src.replace(BLOCK_RE, '\n');

    // Re-insert just before the closing delimiter
    src = src.slice(0, closeIdx) + '\n\n' + m[0].trim() + '\n' + src.slice(closeIdx);

    fs.writeFileSync(filePath, src, 'utf-8');
    fixed++;
    console.log(`FIXED: ${dir}/${file}`);
  }
}

console.log(`\nDone. Fixed: ${fixed}`);
