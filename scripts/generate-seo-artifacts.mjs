import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getIndexableRoutes, getPrerenderRoutes, SITE_BASE_URL } from '../src/data/routes.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

const toAbsoluteUrl = (routePath) => {
  if (routePath === '/') {
    return `${SITE_BASE_URL}/`;
  }
  return `${SITE_BASE_URL}${routePath}`;
};

const buildSitemapXml = (routes) => {
  const lines = routes
    .map((routePath) => {
      const loc = toAbsoluteUrl(routePath);
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        '    <changefreq>weekly</changefreq>',
        '    <priority>0.8</priority>',
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${lines}\n</urlset>\n`;
};

const run = async () => {
  const indexableRoutes = getIndexableRoutes();
  const prerenderRoutes = getPrerenderRoutes();

  const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');
  const distSitemapPath = path.join(distDir, 'sitemap.xml');
  const prerenderRoutesPath = path.join(projectRoot, 'scripts', 'generated', 'prerender-routes.json');
  const sitemapXml = buildSitemapXml(indexableRoutes);

  await fs.mkdir(path.dirname(prerenderRoutesPath), { recursive: true });
  await fs.writeFile(sitemapPath, sitemapXml, 'utf8');
  await fs.mkdir(distDir, { recursive: true });
  await fs.writeFile(distSitemapPath, sitemapXml, 'utf8');
  await fs.writeFile(
    prerenderRoutesPath,
    `${JSON.stringify(prerenderRoutes, null, 2)}\n`,
    'utf8',
  );

  console.log(`Generated sitemap with ${indexableRoutes.length} indexable routes at ${sitemapPath}`);
  console.log(`Updated built sitemap at ${distSitemapPath}`);
  console.log(`Generated prerender routes (${prerenderRoutes.length}) at ${prerenderRoutesPath}`);
};

run().catch((error) => {
  console.error('Failed to generate SEO artifacts:', error);
  process.exit(1);
});
