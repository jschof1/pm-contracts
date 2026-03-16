# New Client From Messy Brief (One-Prompt Playbook)

Use this when you only have a rough markdown brief and want the AI agent to implement everything with minimal back-and-forth.

## 1) What you provide

- One markdown file with client notes (can be messy, unordered, incomplete).
- Optional: one or more source URLs to scrape for additional copy, structure, and image candidates.

## 2) One prompt to use

Paste this into the agent chat (replace the path):

```text
Use docs/skills/client-project-from-brief/SKILL.md and fully implement this new client from @<PATH_TO_BRIEF.md>.

Requirements:
1) Normalize messy input and proceed even if sections are incomplete.
2) If source URLs are provided, scrape them and extract useful business data, service/area info, and candidate image references.
3) Update all required files for content, services, areas, contact settings, theme, SEO, and template placeholders.
4) Use conservative defaults where data is missing and list every assumption.
5) Regenerate SEO artifacts and run full verification commands.
6) Return:
   - changed files
   - assumptions/defaults used
   - anything I still need to manually replace
   - what was extracted from URLs vs what came from the brief
   - command results
```

## 3) What the implementation must update

At minimum, the execution should touch:

- `src/data/siteSettings.ts`
- `src/data/content.ts`
- `src/data/services.ts`
- `src/data/areas.ts`
- `src/data/theme.ts`

And where relevant:

- `src/index.css` (fonts import only)
- `src/data/routes.ts` (if route structure changes)
- `src/data/seoData.ts` (if dynamic SEO helpers need updates)
- `src/components/SEOHead.tsx`
- `src/components/JsonLd.tsx`
- `src/PageTemplate.tsx`
- `src/pages/AddCustomer.tsx` (if embedded external form is used)

Generated outputs (never hand-edit):

- `public/sitemap.xml`
- `scripts/generated/prerender-routes.json`

## 4) Critical placeholder replacement checklist

Before shipping a client project, confirm these are not left as template defaults:

- `https://example.com`
- `hello@yourdomain.co.uk`
- `+44 7700 900123`
- `123 Example Street, City, POSTCODE`
- `https://example.com/webhooks/...`
- `REPLACE_WITH_FORM_ID`

## 5) Required verification commands

Run in this order:

```bash
npm run validate:data
npm run generate:seo
npm run build
```

Success criteria:

- data validation passes
- SEO artifacts regenerate
- build and prerender complete without failure

## 6) Handoff format (must be included)

The final response should always include:

1. Changed files list
2. Assumptions/defaults used due to missing brief info
3. Manual replacements still required (if any)
4. Extracted URL data summary (copy points, services, areas, contacts, image candidates)
5. Verification command outcomes

## 7) URL scraping guardrails

- Use URLs as supporting inputs, not single-source truth.
- Prefer client-owned assets; do not assume third-party images are reusable without permission.
- If image licensing is unclear, import as "reference only" and flag for manual replacement.
- Do not scrape gated/private pages requiring auth.
