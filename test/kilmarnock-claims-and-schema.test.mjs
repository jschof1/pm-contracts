import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readBuiltFile = (relativePath) =>
  readFile(new URL(`../dist/${relativePath}`, import.meta.url), 'utf8');

const visibleText = (html) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const schemasFrom = (html) =>
  [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].map((match) => JSON.parse(match[1]));

const includesType = (schema, type) => {
  const types = Array.isArray(schema?.['@type'])
    ? schema['@type']
    : [schema?.['@type']];
  return types.includes(type);
};

test('Kilmarnock uses one truthful business identity and evidence-safe claims', async () => {
  const html = await readBuiltFile('kilmarnock/index.html');
  const text = visibleText(html);
  const businesses = schemasFrom(html).filter((schema) =>
    includesType(schema, 'LocalBusiness'),
  );

  assert.equal(businesses.length, 1);
  assert.equal(businesses[0]['@id'], 'https://pmroofers.com/#business');
  assert.equal(businesses[0].name, 'PM Roofers');
  assert.deepEqual(businesses[0].address, {
    '@type': 'PostalAddress',
    streetAddress: '11 Lanrig Place',
    addressLocality: 'Glasgow',
    postalCode: 'G69 9AT',
    addressCountry: 'GB',
  });
  assert.ok(
    businesses[0].areaServed.some(
      (place) => place['@type'] === 'City' && place.name === 'Kilmarnock',
    ),
  );

  for (const unsupportedClaim of [
    '71+',
    '4.9',
    '5/5',
    'Google Rating',
    'Satisfaction Rate',
    'Limited availability',
    '24/7',
    'Same-Day Quotes Available',
    'Same-day response',
    'Response within 2 hours',
    'Workmanship Guarantee',
    'projects completed across this service area',
  ]) {
    const escapedClaim = unsupportedClaim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    assert.doesNotMatch(text, new RegExp(escapedClaim, 'i'));
  }

  assert.match(text, /Free, No-Obligation Quotes/i);
  assert.match(text, /Mon - Sat: 7:00 AM - 7:00 PM/i);
  assert.match(
    html,
    /<link[^>]+rel="canonical"[^>]+href="https:\/\/pmroofers\.com\/kilmarnock\/"/,
  );
  assert.match(
    html,
    /<meta[^>]+property="og:url"[^>]+content="https:\/\/pmroofers\.com\/kilmarnock\/"/,
  );
});

test('the prerendered areas hub and sitemap expose the final Kilmarnock URL', async () => {
  const [areasHtml, sitemap] = await Promise.all([
    readBuiltFile('areas/index.html'),
    readBuiltFile('sitemap.xml'),
  ]);

  assert.match(areasHtml, /href="\/kilmarnock\/"/);
  assert.doesNotMatch(visibleText(areasHtml), /71\+ Projects/i);
  assert.match(sitemap, /<loc>https:\/\/pmroofers\.com\/kilmarnock\/<\/loc>/);
  assert.doesNotMatch(sitemap, /<loc>https:\/\/pmroofers\.com\/kilmarnock<\/loc>/);
});
