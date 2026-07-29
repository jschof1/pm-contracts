import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readProjectFile = (relativePath) =>
  readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8');

test('the prerendered areas hub links to every generated area page', async () => {
  const [areaSource, areasHtml] = await Promise.all([
    readProjectFile('src/data/areas.ts'),
    readProjectFile('dist/areas/index.html'),
  ]);
  const areaSlugs = [
    ...areaSource.matchAll(/^\s+slug: "([^"]+)",$/gm),
  ].map((match) => match[1]);

  assert.ok(areaSlugs.length > 80, 'expected the complete area catalogue');

  for (const slug of areaSlugs) {
    assert.match(
      areasHtml,
      new RegExp(`href="/${slug}/"`),
      `missing internal link to /${slug}/`,
    );
  }
});
