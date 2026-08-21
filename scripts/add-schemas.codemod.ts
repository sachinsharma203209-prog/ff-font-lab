/**
 * One-shot codemod: injects HowTo + FAQPage JSON-LD into style/social/gaming
 * detail pages that already define `tips` and `faqs` arrays but only emit
 * a WebPage schema. Idempotent — skips files already containing howToSchema.
 */
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(process.cwd(), 'src', 'pages');
const DIRS = ['styles', 'social', 'gaming'];

let changed = 0;
let skipped = 0;

for (const dir of DIRS) {
  const dirPath = path.join(ROOT, dir);
  for (const file of fs.readdirSync(dirPath)) {
    if (!file.endsWith('.astro') || file === 'index.astro') continue;
    const filePath = path.join(dirPath, file);
    let src = fs.readFileSync(filePath, 'utf-8');

    if (src.includes('howToSchema')) {
      skipped++;
      continue;
    }

    // 1. Widen the schema import
    const importRe = /import \{ generateWebPageSchema \} from '[^']+lib\/schema';/;
    if (!importRe.test(src)) {
      console.warn(`SKIP (no std import): ${dir}/${file}`);
      skipped++;
      continue;
    }
    src = src.replace(importRe, (m) =>
      m.replace('generateWebPageSchema', 'generateWebPageSchema, generateHowToSchema, generateFAQSchema')
    );

    // 2. Locate the pageSchema block and pull its raw title/description literals
    const blockRe = /const pageSchema = generateWebPageSchema\(\{[\s\S]*?\n\}\);/;
    const blockMatch = src.match(blockRe);
    if (!blockMatch) {
      console.warn(`SKIP (no pageSchema block): ${dir}/${file}`);
      skipped++;
      continue;
    }
    const block = blockMatch[0];
    const titleLit = block.match(/\n\s*title: ("(?:[^"\\]|\\.)*")/);
    const descLit = block.match(/\n\s*description: ("(?:[^"\\]|\\.)*")/);
    if (!titleLit || !descLit) {
      console.warn(`SKIP (no title/description literals): ${dir}/${file}`);
      skipped++;
      continue;
    }
    const cleanTitle = JSON.parse(titleLit[1]).replace(/\s*\|\s*Ff Font Lab\s*$/, '');
    const desc = JSON.parse(descLit[1]);

    const injection = `\n\nconst howToSchema = generateHowToSchema({\n  name: ${JSON.stringify(cleanTitle)},\n  description: ${JSON.stringify(desc)},\n  steps: tips.map((t) => ({ name: t.title, text: t.description })),\n});\n\nconst faqSchema = generateFAQSchema(faqs);`;

    src = src.replace(blockRe, block + injection);

    // 3. Emit all three schemas
    src = src.replace('jsonLd={pageSchema}', 'jsonLd={[pageSchema, howToSchema, faqSchema]}');

    fs.writeFileSync(filePath, src, 'utf-8');
    changed++;
    console.log(`OK: ${dir}/${file}`);
  }
}

console.log(`\nDone. Changed: ${changed}, Skipped: ${skipped}`);
