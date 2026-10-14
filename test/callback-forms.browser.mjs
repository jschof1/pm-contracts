import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import net from 'node:net';

const executablePath = [process.env.PUPPETEER_EXECUTABLE_PATH, process.env.CHROME_PATH,
  '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find(p => p && existsSync(p));
assert.ok(executablePath, 'Set PUPPETEER_EXECUTABLE_PATH to an installed Chromium browser');
const server = net.createServer();
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
await new Promise(resolve => server.close(resolve));
const base = `http://127.0.0.1:${port}`;
const preview = spawn(process.execPath,
  ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
  {stdio: 'ignore'});
let browser;
try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { if ((await fetch(base)).ok) {ready = true; break;} } catch {}
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(ready, 'Built site preview must start');
  browser = await puppeteer.launch({executablePath, headless: true, pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']});
  for (const route of ['/', '/get-quote', '/special-offer', '/discount']) {
    const page = await browser.newPage();
    await page.setViewport({width: route === '/' ? 1440 : 390, height: 844});
    let status = 400, posts = 0, payload;
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.method() === 'POST' && request.url().includes('/api/form-proxy')) {
        posts++;
        payload = JSON.parse(request.postData());
        return request.respond({status, contentType: 'application/json', body: JSON.stringify({success: status === 200})});
      }
      if (new URL(request.url()).origin !== base) return request.abort();
      return request.continue();
    });
    await page.evaluateOnNewDocument(() => {
      window.acceptedEnquiries = 0;
      document.addEventListener('uktl:enquiry-accepted', () => window.acceptedEnquiries++);
    });
    await page.goto(base + route, {waitUntil: 'networkidle0'});
    if (route === '/get-quote') {
      for (const id of ['residential', 'small', 'roof-repairs', 'repair']) {
        await page.waitForSelector('#' + id);
        await page.click('#' + id);
        await page.evaluate(() => [...document.querySelectorAll('button')].find(b => b.textContent.includes('Next'))?.click());
      }
      await page.waitForSelector('input[type="email"]');
    }
    await page.evaluate(() => {
      const set = (input, value) => {
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, value);
        input.dispatchEvent(new Event('input', {bubbles: true}));
      };
      for (const input of document.querySelectorAll('input')) {
        if (input.type === 'tel') set(input, '+353 87 1234567');
        else if (input.type === 'email') set(input, 'callback-test@example.com');
        else if (input.type === 'text') set(input, 'Callback test');
      }
    });
    if (route === '/') {
      await page.evaluate(() => [...document.querySelectorAll('button[role="combobox"]')].find(b => b.getBoundingClientRect().width)?.click());
      await page.waitForSelector('[role="option"]');
      await page.click('[role="option"]');
    }
    const submit = async () => {
      await page.evaluate(wizard => {
        if (wizard) [...document.querySelectorAll('button')].find(b => b.textContent.includes('Get My Free Quote'))?.click();
        else document.querySelector('form').requestSubmit();
      }, route === '/get-quote');
      await new Promise(resolve => setTimeout(resolve, 400));
    };
    const counts = () => page.evaluate(() => ({
      accepted: window.acceptedEnquiries,
      conversions: window.dataLayer?.filter(event => event.event === 'lead_form_submit').length || 0,
    }));
    await submit();
    assert.equal(posts, 1, route + ' rejected request intercepted');
    assert.deepEqual(await counts(), {accepted: 0, conversions: 0}, route + ' no false success');
    assert.ok(await page.evaluate(() => document.body.textContent.includes('Please enter your name and a valid phone number.')), route + ' actionable validation guidance');
    assert.equal(await page.$eval('input[type="tel"]', input => input.value), '+353 87 1234567', route + ' details retained for retry');
    status = 200;
    await submit();
    assert.equal(posts, 2, route + ' valid retry intercepted');
    assert.deepEqual(await counts(), {accepted: 1, conversions: 1}, route + ' exactly one success');
    assert.equal(payload.phone, route === '/discount' ? '+353 87 1234567' : '+353871234567', route + ' international callback preserved');
    assert.equal(await page.evaluate(() => document.querySelectorAll('script[src^="https://www.googletagmanager.com/gtm.js"]').length), 1, route + ' existing GTM retained');
    console.log('PASS', route, '400 guidance, retry, callback country code and accepted conversion');
    await page.close();
  }
} finally {
  if (browser) await browser.close();
  preview.kill('SIGTERM');
}
