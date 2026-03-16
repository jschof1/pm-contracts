# Brief-to-File Mapping

Use this after normalizing a messy brief. Treat `src/data/*` as primary.

## Business Identity
- `content.brand.*`
- `siteSettings.businessName`

## Contact + Operations
- `siteSettings.phone`, `phoneFormatted`, `email`, `address`, `serviceArea`
- Relevant text in `content.contactPage`
- Footer/header strings in `content.layout.*`

## Services
- `src/data/services.ts` entries
- Service list labels in `content.layout.header.servicesMenu` and `content.layout.footer.servicesLinks`

## Areas
- `src/data/areas.ts` entries
- Area menu snippets in `content.layout.header.areasMenu` and `content.layout.footer.areasLinks`

## Core Pages
- Home/About/FAQ/Services/Areas/Contact text in `src/data/content.ts`

## SEO
- Static route metadata: `routeSeo` in `src/data/content.ts`
- Dynamic helper SEO: `src/data/seoData.ts`
- Route inventory: `src/data/routes.ts` (only when route structure changes)

## Theme
- Add preset in `src/data/theme.ts`
- Set active export: `export const theme = <newThemePreset>;`
- If new font families are introduced: update Google Fonts import in `src/index.css`

## Build Artifacts
- Regenerate with commands, do not hand-edit:
  - `npm run generate:seo` => updates sitemap + prerender routes
  - `npm run build` => validates + builds + prerenders

## URL Extraction Inputs (When Provided)
- Scraped contact details -> verify/update `src/data/siteSettings.ts`
- Scraped service/area lists -> verify/update `src/data/services.ts` and `src/data/areas.ts`
- Scraped marketing copy patterns -> adapt into `src/data/content.ts` (do not blindly copy)
- Scraped image candidates -> add to asset plan; only include directly if rights are clear

## Critical Template Placeholders (Must Replace)
- `src/components/SEOHead.tsx` -> base URL
- `src/components/JsonLd.tsx` -> base URL
- `src/PageTemplate.tsx` -> base URL
- `src/data/routes.ts` -> `SITE_BASE_URL`
- `src/data/content.ts` -> any template `ogImage` base URL
- `src/data/siteSettings.ts` -> placeholder contact + webhook URLs
- `src/pages/AddCustomer.tsx` -> external form ID placeholder

## Update Order (No Guesswork)
1. `src/data/siteSettings.ts` (contact and operational truth)
2. `src/data/content.ts` (global copy and static SEO text)
3. `src/data/services.ts` (service data and slugs)
4. `src/data/areas.ts` (location data and slugs)
5. `src/data/theme.ts` (+ `src/index.css` fonts only if required)
6. Placeholder cleanup in SEO/base URL/contact integration files
7. Regenerate outputs + verify

## Completion Criteria
- All template placeholders removed/replaced.
- Service and area slugs are lowercase-hyphen and internally consistent.
- `routeSeo` entries are present for indexable static routes.
- Any URL-sourced content/assets are either approved for use or clearly flagged for manual replacement.
- Commands pass:
  - `npm run validate:data`
  - `npm run generate:seo`
  - `npm run build`
