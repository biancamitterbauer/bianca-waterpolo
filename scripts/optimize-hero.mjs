import sharp from 'sharp';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const src = resolve(repoRoot, 'src/assets/images/logos/background3.png');

const outputs = [
  { file: 'background3.avif', format: 'avif', options: { quality: 65, effort: 6 } },
  { file: 'background3.webp', format: 'webp', options: { quality: 88 } },
];

const input = await readFile(src);

for (const { file, format, options } of outputs) {
  const out = resolve(repoRoot, 'src/assets/images/logos', file);
  const buf = await sharp(input).toFormat(format, options).toBuffer();
  await writeFile(out, buf);
  const size = (buf.length / 1024).toFixed(0);
  console.log(`wrote ${file}  (${size} KB)`);
}

const orig = await stat(src);
console.log(`(original PNG: ${(orig.size / 1024).toFixed(0)} KB)`);
