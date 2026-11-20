## UK Trade Leads website work

When working from the original standalone checkout, resolve client website development and releases in the monorepo. This checkout remains available for original source evidence, review bots and guarded content sync. The website workroot is `jschof1/uktl-client-sites/sites/pm-contracts`. Read the monorepo's `AGENTS.md`, `README.md` and `docs/cutover.md` for current lifecycle, publisher and site-specific instructions. Add the site to the MacBook sparse checkout as needed, or use a fresh Mini worktree from `origin/main`.

Treat file paths and template procedures below as relative to the selected site folder. For an active monorepo site run the root `node tools/sites.mjs check --site pm-contracts`, `node tools/sites.mjs build --site pm-contracts --test` and `npm test` under the light resource guard. For any release, follow the monorepo's build, check-readback, prepare and deploy dry run. Execution requires Jack's explicit go-ahead for the site. Check the registry gates for sites still awaiting cutover.

# PM Contract — Agent Context

## Learned Workspace Facts

- This is a roofing company website for PM Contract (Glasgow, Scotland), built with Vite + React + Tailwind + shadcn
- Theme source of truth is `pmContractTheme` in `src/data/theme.ts`, applied at runtime via `applyTheme()` in `main.tsx`; `src/index.css` holds CSS variable fallbacks
- Current theme palette is blue and navy (accent `210 85% 50%`, primary navy `220 45% 14%`)
- Site images live in `src/assets/pm-contracts/imageN.webp` and are referenced via `new URL('../assets/pm-contracts/imageN.webp', import.meta.url).href` in data files
- Centralized image exports in `src/data/images.ts` — components import from there, not directly from assets
- Logo variants (wordmark, mark, horizontal) are managed in `src/data/images.ts`; `headerLogo` and `footerLogo` exports control which logo appears where
- When generating images with nano-banana, output is PNG — convert to webp with `cwebp -q 85` before placing in assets
- Build command is `npm run build` which runs Vite build followed by SEO artifact generation (sitemap, prerender routes)
- Deploy target is Cloudflare Pages
- Content data is centralized in `src/data/content.ts`; service definitions in `src/data/services.ts`; area definitions in `src/data/areas.ts`

## Learned User Preferences

- Prefers direct, brief instructions — acts on them without extensive clarification
- Uses nano-banana for AI image generation on this project
