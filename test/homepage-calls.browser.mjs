import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import net from 'node:net';

const executablePath = [process.env.PUPPETEER_EXECUTABLE_PATH, process.env.CHROME_PATH,
  '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find(p => p && existsSync(p));
assert.ok(executablePath, 'An installed Chromium browser is required');
const server = net.createServer();
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
await new Promise(resolve => server.close(resolve));
const base = `http://127.0.0.1:${port}`;
const preview = spawn(process.execPath,
  ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
  { stdio: 'ignore' });
let browser;
try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { if ((await fetch(base)).ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(ready, 'Built site preview must start');
  browser = await puppeteer.launch({ executablePath, headless: true, pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  for (const width of [1440, 390, 320]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setRequestInterception(true);
    page.on('request', request => {
      // No analytics, chat widgets, calls or enquiries leave the test runner.
      if (new URL(request.url()).origin !== base || request.method() !== 'GET') return request.abort();
      return request.continue();
    });
    await page.evaluateOnNewDocument(() => {
      window.callEvents = [];
      window.dialClicks = [];
      window.$wc_leads = { track: { event: (...args) => window.callEvents.push(args) } };
    });
    await page.goto(base, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      // Run after React's delegated listener, including stopPropagation on cards.
      document.getElementById('root').addEventListener('click', event => {
        const link = event.target.closest('a[href^="tel:"]');
        if (!link) return;
        window.dialClicks.push({ href: link.getAttribute('href'), blocked: event.defaultPrevented });
        // Observe the site's default behaviour before preventing an actual call.
        event.preventDefault();
      });
    });
    const links = await page.$$eval('a[href^="tel:"]', elements => elements.map(link => ({
      text: link.textContent.trim(), href: link.getAttribute('href'),
    })));
    assert.ok(links.length >= 18, 'Homepage includes all existing and new call links');
    for (const link of links) {
      assert.ok(link.text.includes('07748 391835'), 'Every call link exposes readable number text');
      assert.equal(link.href, 'tel:+447748391835', 'Every call link uses the correct UK number');
    }
    for (const heading of ['A Simple', 'Selected', 'Recommend PM Roofers']) {
      const selector = await page.evaluate(heading => {
        const section = [...document.querySelectorAll('section')].find(s => s.querySelector('h2')?.textContent.includes(heading));
        if (!section) return false;
        section.querySelector('a[href^="tel:"]').scrollIntoView({ block: 'center' });
        return true;
      }, heading);
      assert.ok(selector, `Call section ${heading} exists`);
      await page.waitForFunction(heading => {
        const section = [...document.querySelectorAll('section')].find(s => s.querySelector('h2')?.textContent.includes(heading));
        const link = section.querySelector('a[href^="tel:"]');
        return link.checkVisibility({ checkOpacity: true });
      }, {}, heading);
      const bounds = await page.evaluate(heading => {
        const section = [...document.querySelectorAll('section')].find(s => s.querySelector('h2')?.textContent.includes(heading));
        const rect = section.querySelector('a[href^="tel:"]').getBoundingClientRect();
        return { x: rect.x, right: rect.right, height: rect.height };
      }, heading);
      assert.ok(bounds.x >= 0 && bounds.right <= width + 1 && bounds.height >= 44, `${heading} fits with a touch-sized target at ${width}px`);
    }
    await page.evaluate(() => document.querySelectorAll('a[href^="tel:"]').forEach(link => link.click()));
    const result = await page.evaluate(() => ({ events: window.callEvents, clicks: window.dialClicks, path: location.pathname }));
    assert.equal(result.events.length, links.length, 'Exactly one tracking event per call link');
    assert.ok(result.events.every(args => JSON.stringify(args) === JSON.stringify(['Lead', 'Click', 'Call Now'])));
    assert.equal(result.clicks.length, links.length);
    assert.ok(result.clicks.every(click => !click.blocked), 'Site never cancels native dialling');
    assert.equal(result.path, '/', 'Service-card calls do not navigate to a service page');
    await page.evaluate(() => {
      const link = document.querySelector('main a[href^="tel:"]');
      const walker = document.createTreeWalker(link, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) walker.currentNode.textContent = walker.currentNode.textContent.replace('07748 391835', '0141 496 0123');
      link.setAttribute('href', 'tel:+441414960123');
      link.click();
      window.$wc_leads = undefined;
      link.click();
      window.$wc_leads = { track: { event: () => { throw new Error('Tracker unavailable'); } } };
      link.click();
    });
    assert.ok(await page.evaluate(() => window.dialClicks.slice(-3).every(click => click.href === 'tel:+441414960123' && !click.blocked)), 'Replacement tel survives click handlers and missing/broken tracking');
    await page.goto(base + '/upvc-gutters', { waitUntil: 'networkidle0' });
    const hero = await page.$eval('main section img[fetchpriority="high"]', img => ({ src: img.getAttribute('src'), loaded: img.complete && img.naturalWidth > 0 }));
    assert.match(hero.src, /image16-.*\.webp$/, 'Gutters hero uses the inspected gutter photograph');
    assert.ok(hero.loaded, 'Gutter photograph loads');
    assert.deepEqual(errors, [], 'No uncaught page errors');
    console.log(`PASS ${width}px: ${links.length} readable call links, events, native dialling, number replacement, gutter hero`);
    await page.close();
  }
} finally {
  if (browser) await browser.close();
  preview.kill('SIGTERM');
}
