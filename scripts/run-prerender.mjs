import { spawn } from 'node:child_process';

const isTruthy = (value) => Boolean(value) && value !== '0' && value !== 'false';

const shouldSkipPrerender = isTruthy(process.env.SKIP_PRERENDER);

if (shouldSkipPrerender) {
  console.log('Skipping prerender because SKIP_PRERENDER is enabled.');
  process.exit(0);
}

const child = spawn('node', ['scripts/prerender.mjs'], {
  stdio: 'inherit',
  shell: false,
});

child.on('exit', (code) => {
  process.exit(code ?? 1);
});
