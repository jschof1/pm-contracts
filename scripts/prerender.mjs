import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import http from 'node:http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const routesFile = path.join(__dirname, 'generated', 'prerender-routes.json');
const previewHost = '127.0.0.1';
const previewPort = 4173;
const baseUrl = `http://${previewHost}:${previewPort}`;
const browserArgs = ['--no-sandbox', '--disable-setuid-sandbox'];

const resolveChromeExecutablePath = () => {
  const envCandidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    process.env.CHROME_PATH,
    process.env.GOOGLE_CHROME_BIN,
  ].filter(Boolean);

  const platformCandidates = process.platform === 'darwin'
    ? [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
      ]
    : process.platform === 'win32'
      ? [
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
          'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
          'C:\\Program Files\\Chromium\\Application\\chrome.exe',
        ]
      : [
          '/usr/bin/google-chrome-stable',
          '/usr/bin/google-chrome',
          '/usr/local/bin/google-chrome',
          '/usr/bin/chromium-browser',
          '/usr/bin/chromium',
        ];

  for (const candidate of [...envCandidates, ...platformCandidates]) {
    if (candidate && fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
};

const waitForServer = (processHandle, timeoutMs = 60000) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error(`Preview server did not become reachable within ${timeoutMs}ms`));
    }, timeoutMs);

    const pollServer = () => {
      const request = http.get(baseUrl, (response) => {
        response.resume();
        cleanup();
        resolve(baseUrl);
      });

      request.on('error', () => {
        if (processHandle.exitCode !== null) {
          cleanup();
          reject(new Error(`Preview process exited before ready (code ${processHandle.exitCode ?? 'unknown'})`));
          return;
        }

        setTimeout(pollServer, 500);
      });
    };

    const onExit = (code) => {
      cleanup();
      reject(new Error(`Preview process exited before ready (code ${code ?? 'unknown'})`));
    };

    const cleanup = () => {
      clearTimeout(timer);
      processHandle.off('exit', onExit);
    };

    processHandle.on('exit', onExit);
    pollServer();
  });

const startPreviewServer = async () => {
  const preview = spawn('node', ['node_modules/vite/bin/vite.js', 'preview', '--host', previewHost, '--port', String(previewPort), '--strictPort'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe',
    shell: false,
  });

  preview.stdout.on('data', (chunk) => process.stdout.write(chunk));
  preview.stderr.on('data', (chunk) => process.stderr.write(chunk));

  preview.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Preview process exited early with code ${code}`);
    }
  });

  const url = await waitForServer(preview);
  return { processHandle: preview, url };
};

const stopPreviewServer = (processHandle) => {
  if (!processHandle || processHandle.killed) {
    return;
  }
  processHandle.kill('SIGTERM');
};

const loadRoutes = () => {
  if (!fs.existsSync(routesFile)) {
    throw new Error(`Missing generated routes file: ${routesFile}. Run generate-seo-artifacts first.`);
  }

  const raw = fs.readFileSync(routesFile, 'utf8');
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed) || parsed.some((route) => typeof route !== 'string')) {
    throw new Error('Invalid prerender routes format. Expected a string array.');
  }
  return parsed;
};

async function prerender() {
  const routes = loadRoutes();
  const executablePath = resolveChromeExecutablePath();

  if (!executablePath) {
    throw new Error(
      'No Chrome executable detected for prerendering. ' +
      'Set PUPPETEER_EXECUTABLE_PATH or install Chrome so production builds ship crawlable HTML.'
    );
  }

  const { processHandle: previewServer, url: baseUrl } = await startPreviewServer();

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath,
    args: browserArgs,
  });

  console.log(`Starting prerender for ${routes.length} routes...`);

  try {
    for (const route of routes) {
      const url = `${baseUrl}${route}`;
      console.log(`Prerendering: ${url}`);

      try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 45000 });

        const html = await page.content();
        const outputPath = route === '/'
          ? path.join(distDir, 'index.html')
          : path.join(distDir, route, 'index.html');

        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, html);
        console.log(`  ✓ Saved to ${outputPath}`);

        await page.close();
      } catch (error) {
        console.error(`  ✗ Failed ${route}: ${error.message}`);
        throw error;
      }
    }
  } finally {
    await browser.close();
    stopPreviewServer(previewServer);
  }

  console.log('Prerendering complete.');
}

prerender().catch((error) => {
  console.error('Prerender failed:', error);
  process.exit(1);
});
