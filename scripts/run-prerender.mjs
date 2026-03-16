import { spawn } from 'node:child_process';

const isTruthy = (value) => Boolean(value) && value !== '0' && value !== 'false';

const shouldSkipPrerender =
  isTruthy(process.env.SKIP_PRERENDER) ||
  isTruthy(process.env.CI) ||
  isTruthy(process.env.CF_PAGES);

if (shouldSkipPrerender) {
  console.log('Skipping prerender during CI/Cloudflare build.');
  process.exit(0);
}

const child = spawn('node', ['scripts/prerender.mjs'], {
  stdio: 'inherit',
  shell: false,
});

child.on('exit', (code) => {
  process.exit(code ?? 1);
});
