#!/usr/bin/env node
/**
 * Generate favicon set from brand square logo.
 * Outputs to public/favicons/ in all recommended formats and sizes.
 * Run: node scripts/generate-favicons.mjs
 */
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const LOGO_SRC = join(ROOT, 'src/assets/brand/square-logo.png');
const OUT_DIR = join(ROOT, 'public/favicons');

const SIZES = {
  png: [16, 32, 48, 96, 180, 192, 512],
  ico: [16, 32, 48],
};

async function main() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.error('Run: npm install --save-dev sharp to-ico');
    process.exit(1);
  }

  let toIco;
  try {
    toIco = (await import('to-ico')).default;
  } catch {
    console.error('Run: npm install --save-dev to-ico');
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });

  const inputBuffer = await readFile(LOGO_SRC);
  const image = sharp(inputBuffer);

  // Generate PNGs
  for (const size of SIZES.png) {
    const buf = await image
      .clone()
      .resize(size, size)
      .png()
      .toBuffer();
    const name = size === 180 ? 'apple-touch-icon.png' : size === 192 ? 'web-app-manifest-192x192.png' : size === 512 ? 'web-app-manifest-512x512.png' : `favicon-${size}x${size}.png`;
    await writeFile(join(OUT_DIR, name), buf);
    console.log('Written', name);
  }

  // Generate ICO (multi-size)
  const icoBuffers = await Promise.all(
    SIZES.ico.map((size) =>
      image
        .clone()
        .resize(size, size)
        .png()
        .toBuffer()
    )
  );
  const ico = await toIco(icoBuffers, { sizes: SIZES.ico });
  await writeFile(join(OUT_DIR, 'favicon.ico'), ico);
  console.log('Written favicon.ico');
  // Legacy: copy to site root so /favicon.ico works
  await writeFile(join(ROOT, 'public/favicon.ico'), ico);
  console.log('Written public/favicon.ico (legacy)');

  console.log('Favicons generated in public/favicons/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
