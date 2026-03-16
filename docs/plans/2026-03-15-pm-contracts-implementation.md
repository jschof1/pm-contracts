# PM Contracts Client Copy Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create `/Users/jack/Documents/GitHub/pm-contracts` as a standalone client copy of this project, fully rebranded and repopulated for PM Contract.

**Architecture:** Duplicate the current repo into a sibling folder, then update the new project's data-first content layer first (`src/data/*`), followed by hard-coded SEO/base URL files and client-owned assets. Finish by regenerating artifacts and verifying the new build end-to-end.

**Tech Stack:** React 18, Vite 5, TypeScript, Tailwind CSS, static prerender scripts, data-driven content files

---

### Task 1: Create the sibling project copy

**Files:**
- Create: `/Users/jack/Documents/GitHub/pm-contracts/**`

**Step 1: Copy the repository into a sibling folder**

Run: `cp -R /Users/jack/Documents/GitHub/Dominian-Trade /Users/jack/Documents/GitHub/pm-contracts`

Expected: new sibling folder exists with the same project structure.

**Step 2: Remove source-control noise from the copied folder**

Run: `rm -rf /Users/jack/Documents/GitHub/pm-contracts/.git`

Expected: the new folder is a clean working copy rather than a nested clone of Dominion.

### Task 2: Ingest PM Contract brief and assets into the new project

**Files:**
- Create: `/Users/jack/Documents/GitHub/pm-contracts/docs/client-inputs/pm-contract-brief.md`
- Create: `/Users/jack/Documents/GitHub/pm-contracts/src/assets/pm-contracts/**`

**Step 1: Copy the provided markdown brief into the new project**

Run: `cp '/Users/jack/Downloads/PM Contract (1).md' /Users/jack/Documents/GitHub/pm-contracts/docs/client-inputs/pm-contract-brief.md`

Expected: the PM Contract brief is preserved alongside the project.

**Step 2: Copy the synced Drive assets into the new project**

Run: `mkdir -p /Users/jack/Documents/GitHub/pm-contracts/src/assets/pm-contracts && cp '/Users/jack/Library/CloudStorage/GoogleDrive-jack@aspectstudio.net/My Drive/UK Trade Leads Clients/PM Contract/Assets/'*.webp /Users/jack/Documents/GitHub/pm-contracts/src/assets/pm-contracts/`

Expected: the PM Contract image pack is committed locally inside the new project.

### Task 3: Replace business settings and route base URLs

**Files:**
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/src/data/siteSettings.ts`
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/src/data/routes.ts`
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/src/components/SEOHead.tsx`
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/src/components/JsonLd.tsx`
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/src/PageTemplate.tsx`
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/index.html`
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/public/robots.txt`
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/public/favicons/site.webmanifest`

**Step 1: Update PM Contract business identity and contact details**

Set the new business name, phone, email, address, social links if available, and Glasgow service-area label.

**Step 2: Replace all Dominion base URLs with `https://rooferglasgow.uk`**

Update every canonical/JSON-LD/site URL source that still points at `dominionepc.com`.

**Step 3: Update document title and social preview metadata**

Replace Dominion-specific titles, descriptions, authors, and OG image references in `index.html` and manifest/robots outputs.

### Task 4: Rebuild content and SEO around roofing-first messaging

**Files:**
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/src/data/content.ts`

**Step 1: Replace brand and CTA copy**

Update brand naming, straplines, calls to action, footer copy, and all home/about/FAQ/services/areas page copy to PM Contract.

**Step 2: Rebuild homepage messaging around roofing demand**

Lead with roof repairs, roof replacement, emergency roofing, 24/7 response, 30 years experience, family-run trust, and liability insurance.

**Step 3: Remove unsupported Dominion-specific claims**

Delete cleaning-specific content, fake placeholder reviews, and any Peterborough-focused language.

### Task 5: Replace services with PM Contract service inventory

**Files:**
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/src/data/services.ts`
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/src/data/images.ts`

**Step 1: Replace the cleaning service list with PM Contract services**

Create roofing-led service entries for roof replacement, roof repairs, emergency roof repairs, leadwork, chimney repairs, skylight work, roughcasting, wall/roof coating, gutters/UPVC, dry rot repair, damp proofing, jet washing, and optionally general joinery/media walls as secondary.

**Step 2: Map service imagery to copied PM Contract assets**

Use the imported PM Contract image pack in place of Dominion cleaning imagery for hero/gallery/service cards.

**Step 3: Rewrite FAQs, benefits, and process copy**

Use roofing-relevant process language, including emergency callout handling and free quotes.

### Task 6: Replace area coverage with Scottish target locations

**Files:**
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/src/data/areas.ts`

**Step 1: Swap the East England areas for the Scottish target list**

Use the 15 areas from the brief as the initial area set.

**Step 2: Rebuild area descriptions**

Use Glasgow-region roofing language, avoiding fake hyperlocal claims while still making each area page locally relevant.

**Step 3: Align popular services and trust facts**

Point area pages to roofing services and PM Contract trust signals rather than cleaning.

### Task 7: Replace media and page-level Dominion remnants

**Files:**
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/src/data/projects.ts`
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/src/pages/About.tsx`
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/src/pages/Contact.tsx`
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/src/pages/Reviews.tsx`
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/src/pages/Feedback.tsx`
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/src/pages/DiscountPage.tsx`
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/src/pages/DiscountForm.tsx`
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/src/pages/AddCustomer.tsx`
- Modify: `/Users/jack/Documents/GitHub/pm-contracts/functions/api/submit-form.js`

**Step 1: Replace or neutralize hard-coded Dominion references**

Search the new project for `Dominion`, `dominionepc`, and related identifiers and remove them.

**Step 2: Align review/discount/reputation wording to PM Contract**

Keep statements factual: GBP presence, review incentive, referral offer, but no fabricated review counts or star ratings.

**Step 3: Update project/gallery references**

Use PM Contract image pack entries rather than Dominion cleaning project examples.

### Task 8: Regenerate outputs and verify the new project

**Files:**
- Regenerate: `/Users/jack/Documents/GitHub/pm-contracts/public/sitemap.xml`
- Regenerate: `/Users/jack/Documents/GitHub/pm-contracts/scripts/generated/prerender-routes.json`

**Step 1: Run validation**

Run: `npm run validate:data`

Expected: PASS

**Step 2: Regenerate SEO artifacts**

Run: `npm run generate:seo`

Expected: PASS and regenerated sitemap/prerender route manifest

**Step 3: Run production build**

Run: `npm run build`

Expected: PASS with successful Vite build and prerender output

**Step 4: Summarize assumptions and manual follow-ups**

Document any unresolved items such as missing standalone logo files, missing social links, or public-review-link cleanup.
