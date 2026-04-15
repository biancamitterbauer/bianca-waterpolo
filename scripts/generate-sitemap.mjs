import { writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const baseUrl = 'https://biancamitterbauer.de';

const routes = [
  { path: '', changefreq: 'weekly', priority: '1.0' },
  { path: 'about', changefreq: 'monthly', priority: '0.8' },
  { path: 'achievements', changefreq: 'weekly', priority: '0.9' },
  { path: 'news', changefreq: 'weekly', priority: '0.8' },
  { path: 'training', changefreq: 'monthly', priority: '0.6' },
  { path: 'tournaments', changefreq: 'weekly', priority: '0.9' },
  { path: 'bundesliga-weibl', changefreq: 'weekly', priority: '0.9' },
  { path: 'media', changefreq: 'monthly', priority: '0.7' },
  { path: 'sponsor-pitch', changefreq: 'monthly', priority: '0.6' },
  { path: 'contact', changefreq: 'yearly', priority: '0.5' },
  { path: 'presse', changefreq: 'monthly', priority: '0.7' },
  { path: 'datenschutz', changefreq: 'yearly', priority: '0.3' },
  { path: 'impressum', changefreq: 'yearly', priority: '0.3' },
];

const today = new Date().toISOString().slice(0, 10);

const urls = routes
  .map(({ path, changefreq, priority }) => {
    const loc = path ? `${baseUrl}/${path}` : baseUrl;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const out = resolve(repoRoot, 'public/sitemap.xml');
await writeFile(out, xml);
console.log('wrote', out);
