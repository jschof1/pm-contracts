# Theming Handover: Current Configuration

## Purpose
This project now supports runtime theme presets via tokenized CSS variables.
A new agent can add/switch themes by editing data-only files without changing component markup.

For full new-client onboarding from a messy brief, start with:
- `docs/new-client-from-messy-brief.md`
- `docs/skills/client-project-from-brief/SKILL.md`

## Source of Truth
- Theme type contract: `src/types/theme.ts`
- Theme presets + active theme selection: `src/data/theme.ts`
- Runtime theme application utility: `src/lib/applyTheme.ts`
- Runtime theme bootstrap call: `src/main.tsx`
- Base CSS variable defaults (fallback only): `src/index.css`

## How It Works
1. `theme` is imported from `src/data/theme.ts` in `src/main.tsx`.
2. `applyTheme(theme)` runs before React render.
3. `applyTheme` sets `theme.cssVariables` onto `document.documentElement.style`.
4. If `darkCssVariables` exists, it injects/updates a style tag for `.dark { ... }` overrides.
5. Components keep using existing Tailwind/CSS variable tokens (`--primary`, `--accent`, etc.).

## Current Presets
In `src/data/theme.ts`:
- `professionalCorporateTheme` (legacy baseline)
- `dominionTradeTheme` (new active theme)
- Active export is currently:
  - `export const theme = dominionTradeTheme;`

## Token Expectations
All themes should define at minimum:
- Core semantic tokens: `--background`, `--foreground`, `--card`, `--primary`, `--secondary`, `--muted`, `--accent`, `--border`, `--input`, `--ring`
- Shape token: `--radius` (critical for curved vs sharp theme variants)
- Typography: `--font-display`, `--font-body`
- Brand/util tokens used in components: `--slate-*`, `--amber*`, `--navy*`, `--glass-*`
- Sidebar tokens: `--sidebar-*`

If a token is missing, fallback values from `src/index.css` may apply, causing inconsistent results.

## Theme Compliance Rules (Important)
To ensure components actually change when theme presets change:

- Do not use hardcoded brand/style classes in components (examples: `btn-navy`, one-off color classes like `bg-blue-500/5`, fixed custom button looks).
- Prefer semantic component classes defined in `src/index.css`:
  - Cards/surfaces: `surface-card`, `surface-panel`, `surface-panel-accent`, `surface-inverse`
  - Buttons: `action-primary`, `action-secondary`, `action-inverse`
  - Labels/icons: `label-solid`, `surface-icon`
- Avoid fixed radius utilities for theme-driven elements:
  - Avoid: `rounded-xl`, `rounded-2xl`, etc. on reusable card/button primitives.
  - Prefer semantic classes whose radius is controlled centrally.
- For decorative corner lines/brackets, use theme-aware helpers:
  - `theme-corner-tl`, `theme-corner-tr`, `theme-corner-bl`, `theme-corner-br`
  - These keep corners consistent when `--radius` changes.
- Avoid stacking multiple accent systems on the same card (for example top accent border + animated accent line + extra divider + bracket treatment) unless intentionally designed; this caused visual noise in `ProjectsSection`.

## Component Refactor Pattern
When aligning a section with theme behavior:

1. Replace hardcoded surface/button classes with semantic `surface-*` and `action-*` classes.
2. Replace hardcoded color utilities with tokens (`text-primary-foreground`, `bg-accent-secondary/5`, etc.).
3. Remove one-off radius overrides unless they are truly section-specific and desired in all themes.
4. Keep card structure consistent across sibling sections (for example `ProjectsSection` should follow `ServicesSection` card anatomy).

## How To Add A New Theme
1. Open `src/data/theme.ts`.
2. Duplicate `dominionTradeTheme` and rename (e.g. `acmeTheme`).
3. Update `name`, `cssVariables`, and optionally `darkCssVariables`.
4. Switch active export:
   - `export const theme = acmeTheme;`
5. If using new fonts, add them to the Google Fonts import in `src/index.css`.
6. Run verification commands.

## Verification Commands
- Quick compile/build check:
  - `npm run build:static`
- Full pipeline (includes data validation, SEO artifacts, prerender):
  - `npm run build`
- Theme compliance only:
  - `npm run check:theme-compliance`

`build` and `build:static` now run `check:theme-compliance` automatically.

## Theme Verification Checklist (UI)
After changing theme tokens or refactoring classes, manually verify:

- Cards across homepage sections all respond to radius changes from `--radius`.
- Hero form + CTA buttons follow `action-*` styles and change with theme shape/colors.
- Section corner decorations still align with card/button curvature (`theme-corner-*`).
- No obvious hardcoded color leftovers (`bg-blue-*`, `text-white` where semantic token exists, etc.).
- `ProjectsSection` cards remain visually cohesive with `ServicesSection` (same surface and footer treatment style).

## Automated Guardrails
- `scripts/check-theme-compliance.mjs` scans `src/components` and `src/pages` and fails on:
  - legacy aliases like `btn-*`, `action-inverse-alt`, `badge-sharp*`
  - hardcoded palette utility classes like `bg-blue-500`, `text-red-300`, etc.
- `scripts/validate-data.mjs` now validates required token presence across all theme presets (`professionalCorporateTheme`, `dominionTradeTheme`, `dominionTradeRoundedTheme`), not just the active export.

## Known Implementation Notes
- Theming is runtime-driven; no rebuild is needed to switch token values, but build verification is still recommended.
- `src/index.css` still contains default `:root` values; runtime theme overrides them on app load.
- The app assumes HSL-based variable values for color tokens.

## Safe Change Checklist For Another Agent
- Keep token names unchanged; only change values.
- Preserve contrast for CTA tokens (`--accent`, `--accent-foreground`, `--accent-text-on-light`).
- Preserve typography token format (quoted font family strings).
- Run `npm run build:static` before handing back.
- If touching SEO/build scripts too, run `npm run build`.
