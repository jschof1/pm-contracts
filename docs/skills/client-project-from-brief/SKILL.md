---
name: client-project-from-brief
description: Use when creating a new client version of this template from a single business markdown brief, including content, theme, SEO metadata, and build artifact updates.
---

# Client Project From Brief

## Overview
Convert one business brief markdown file into a complete client-ready data update for this template.

This skill is for this repository's architecture: data-first content and theme with build-time SEO/prerender artifacts.

Messy, unstructured briefs are allowed. Do not block on format quality.

## Required Input
A single markdown file containing business information.

Preferred structure:
- `references/business-brief-template.md`

If sections are missing, use safe defaults and log assumptions explicitly.

Optional supporting input:
- One or more public URLs for extraction (existing site, service pages, about page, gallery pages, etc.).

## First Action (Mandatory): Normalize The Brief
Before editing files, convert the brief into this normalized shape:

1. Business identity (name, short name, tagline)
2. Contact and operations (phone, email, address, region, hours)
3. Services (names, slugs, summaries)
4. Areas (names, slugs, summaries)
5. Core page copy intent (home/about/contact/FAQ)
6. SEO direction (title/meta preferences, noindex pages)
7. Theme direction (color mood, typography, style keywords)
8. Social proof (reviews/certifications)
9. Constraints (must keep/avoid/compliance)
10. Assets (logos, photos, style references)

If a field is missing, continue with conservative defaults.

If URLs are provided, extract supporting data before normalization:
- contact details
- services and service language
- area names and local references
- testimonials/trust badges
- image candidates and alt/context notes

## Files You Must Update
Always treat `src/data` as the primary editing surface.

1. Core business + page copy
- `src/data/content.ts`

2. Contact and operational details
- `src/data/siteSettings.ts`

3. Dynamic pages data
- `src/data/services.ts`
- `src/data/areas.ts`

4. Theme presets and active theme selection
- `src/data/theme.ts`
- If new fonts are needed: `src/index.css` (Google Fonts import only)

5. SEO + route/indexing consistency
- `src/data/seoData.ts` (if needed for dynamic helpers)
- `src/data/routes.ts` (only if route structure changes)
- Generated artifacts via commands (never hand-edit outputs):
  - `public/sitemap.xml`
  - `scripts/generated/prerender-routes.json`

6. Template placeholders (must not leak to client output)
- `src/components/SEOHead.tsx`
- `src/components/JsonLd.tsx`
- `src/PageTemplate.tsx`
- `src/pages/AddCustomer.tsx` (if used)

## Execution Workflow
1. Read and normalize the brief.
2. If URLs are provided, scrape/extract supporting data and merge with brief notes.
3. Map normalized fields using `references/file-map.md`.
4. Update data files first (`src/data/*`).
5. Update theme preset and active export in `src/data/theme.ts`.
6. Replace template placeholders in SEO/base URL/contact integration files.
7. Only touch components if a required brief field has no data binding path.
8. Regenerate artifacts.
9. Run full verification.
10. Return handoff with assumptions + remaining manual actions.

## Non-Negotiable Constraints
- Prefer data changes over component rewrites.
- Keep route slugs lowercase-hyphen format.
- Keep color tokens in HSL-compatible values expected by this codebase.
- Preserve SEO completeness: title + description + canonical path coverage for indexable routes.
- Do not manually edit generated files unless debugging; regenerate with scripts.
- Never leave template defaults in client delivery (`example.com`, placeholder webhooks, placeholder form IDs).
- Treat URL-scraped content as input, not guaranteed truth; prefer brief instructions when there is conflict.
- Do not assume third-party image reuse rights; flag unclear licensing for manual replacement.

## Missing Data Defaults (Use When Needed)
- Missing legal name: use provided trading name.
- Missing short brand name: derive a concise short name from business name.
- Missing service descriptions: write neutral, benefit-led summaries.
- Missing area long copy: generate local-intent generic copy without fake claims.
- Missing social URLs: leave empty strings.
- Missing opening hours: use stated business hours from brief; if absent, do not invent precise claims.
- Missing assets: keep template assets and flag as follow-up.

## Verification Commands
Run in this order:

```bash
npm run validate:data
npm run generate:seo
npm run build
```

Expected outcomes:
- Data validation passes
- SEO artifacts regenerate
- Build and prerender complete without failures

## Output Contract (for final agent response)
Include:
1. Changed files list
2. Normalized brief summary (what was inferred vs explicit)
3. Assumptions/defaults used due to missing input
4. Verification commands run and pass/fail result
5. Any manual follow-up replacements still required
6. URL extraction summary (what was used, what was ignored, image/license follow-ups)
7. Optional follow-up recommendations
