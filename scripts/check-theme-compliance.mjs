import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const roots = ['src/components', 'src/pages'];
const extensions = new Set(['.tsx', '.ts', '.jsx', '.js']);

const rules = [
  {
    id: 'legacy-button-alias',
    description: 'Legacy button alias found. Use action-* semantic classes.',
    regex: /\bbtn-(?:primary|secondary|cta|dark|navy)\b/g,
  },
  {
    id: 'legacy-action-alias',
    description: 'Legacy action alias found. Use action-primary/action-secondary/action-inverse.',
    regex: /\baction-inverse-alt\b/g,
  },
  {
    id: 'legacy-badge-alias',
    description: 'Legacy badge alias found. Use label-solid or theme surface classes.',
    regex: /\bbadge-sharp(?:-filled)?\b/g,
  },
  {
    id: 'hardcoded-brand-color',
    description: 'Hardcoded palette utility found. Use theme semantic tokens/classes.',
    regex: /\b(?:bg|text|border)-(?:blue|indigo|violet|purple|fuchsia|pink|rose|cyan|teal|emerald|lime|yellow|amber|orange|red|stone|neutral|zinc|gray|grey|slate)-\d{2,3}\b/g,
  },
];

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    if (extensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
};

const run = async () => {
  const files = (await Promise.all(roots.map((root) => walk(root)))).flat();
  const violations = [];

  for (const filePath of files) {
    const content = await readFile(filePath, 'utf8');
    const lines = content.split(/\r?\n/);

    lines.forEach((line, lineIdx) => {
      for (const rule of rules) {
        rule.regex.lastIndex = 0;
        const matches = [...line.matchAll(rule.regex)];
        for (const match of matches) {
          violations.push({
            filePath,
            line: lineIdx + 1,
            token: match[0],
            rule: rule.id,
            description: rule.description,
          });
        }
      }
    });
  }

  if (violations.length > 0) {
    console.error('\nTheme compliance check failed.\n');
    for (const violation of violations) {
      console.error(
        `- ${violation.filePath}:${violation.line} [${violation.rule}] ${violation.description} Found: \"${violation.token}\"`,
      );
    }
    process.exit(1);
  }

  console.log(`Theme compliance check passed (${files.length} files scanned).`);
};

run().catch((error) => {
  console.error('Theme compliance check crashed:', error);
  process.exit(1);
});
