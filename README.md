# Professional Corporate Serious Template

Production-oriented React + Vite template for UK trade service websites, with:

- data-driven page content (`src/data/*`)
- built-in SEO metadata + JSON-LD
- static route generation + sitemap generation
- prerendered pages for fast delivery on static hosting (Cloudflare Pages-friendly)

## Quick start

```sh
git clone <YOUR_REPO_URL>
cd professional-corporate-serious-template
npm install
npm run dev
```

## Build and quality commands

```sh
npm run validate:data
npm run check:theme-compliance
npm run lint
npm run build
```

## Template setup checklist

Before using this for a live client, update these first:

- `src/data/siteSettings.ts`
  - business name, phone, email, address
  - form webhook URLs
  - social links
- `src/data/content.ts`
  - brand copy, CTAs, route SEO titles/descriptions
- `src/data/theme.ts`
  - brand colours, tokens, and typography decisions
- `src/components/SEOHead.tsx`, `src/components/JsonLd.tsx`, `src/PageTemplate.tsx`, `src/data/routes.ts`
  - base domain (`https://example.com`) to production domain
- `src/pages/AddCustomer.tsx`
  - embedded external form ID (`REPLACE_WITH_FORM_ID`) if this page is used
- logos/images in `src/assets/*` and `public/*`

## Deployment

This project is built to deploy as static output.

- Primary command: `npm run build`
- Build output: `dist/`
- Suggested host: Cloudflare Pages

## Notes

- `npm run build` runs validation, theme checks, Vite build, SEO artifact generation, and prerendering.
- Current lint output includes existing baseline issues in this repository; build output is currently successful.
