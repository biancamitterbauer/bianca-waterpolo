import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const svgPath = resolve(repoRoot, 'src/assets/images/logos/Spandau_04_light.svg');
const iconsDir = resolve(repoRoot, 'public/icons');
const faviconPath = resolve(repoRoot, 'public/favicon.ico');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const icoSizes = [16, 32, 48, 64];
const padRatio = 0.12;

async function renderOnBlack(size) {
  const svg = await readFile(svgPath);
  const inner = Math.round(size * (1 - padRatio * 2));
  const logo = await sharp(svg, { density: 384 })
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    },
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toBuffer();
}

for (const size of sizes) {
  const buf = await renderOnBlack(size);
  const out = resolve(iconsDir, `icon-${size}x${size}.png`);
  await writeFile(out, buf);
  console.log('wrote', out);
}

const icoBuffers = await Promise.all(icoSizes.map((s) => renderOnBlack(s)));
const ico = await pngToIco(icoBuffers);
await writeFile(faviconPath, ico);
console.log('wrote', faviconPath);
