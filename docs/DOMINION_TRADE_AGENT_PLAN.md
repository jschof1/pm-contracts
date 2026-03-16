# Dominion Trade - Multi-Agent Delivery Plan

## Goal

Complete the remaining Dominion Trade website launch work with parallel agents, while making it obvious which items are done, blocked, or still need external access.

This plan is based on a repo audit already completed against:

- `docs/skills/NEW-CLIENT-INFO.md`
- `docs/SHIP-TODO.md`
- `src/data/*`
- `src/pages/*`
- `src/assets/*`

## Current repo-grounded reality

### Confirmed in the repo

- Core business contact details are populated in `src/data/siteSettings.ts`.
- GHL webhook URLs are present for quick contact, quote, discount, and feedback forms.
- The repo is intended for `https://dominionepc.com`.
- The project already has a ship checklist in `docs/SHIP-TODO.md`.

### Confirmed problems

- `src/assets/images/` and `src/assets/brand/` do not contain the final Dominion-owned media pack.
- `src/data/images.ts` references missing and/or roofing/template assets.
- `src/data/projects.ts`, `src/data/content.ts`, `src/data/seoData.ts`, `src/pages/Services.tsx`, `src/pages/Areas.tsx`, `src/pages/areas/AreaPage.tsx`, and `src/pages/Reviews.tsx` still contain template/roofing or otherwise incorrect content.
- `src/data/areas.ts` is incomplete against Roy's supplied service areas.
- `src/pages/Reviews.tsx` assumes reviews/social proof that the client does not currently have.
- `src/pages/AddCustomer.tsx` is still a placeholder fallback page.
- `src/data/siteSettings.ts` still has a generic Google search review URL and blank social URLs.
- Cloudflare Pages deployment is implied but not confirmed from the repo alone.

### External blockers

The following work cannot be fully completed from the repo alone:

- Gmail/Google Drive access for Roy's photos, videos, leaflet attachments, and logo email
- GoHighLevel access for sub-account verification, widget confirmation, workflow checks, missed-call text-back, referral automation, and past-client import
- Cloudflare access for Pages project status, environment variables, and domain bindings
- Google Business access if a review link is ever introduced

## Agent layout

Use five agents in this order. Agents 2, 3, and 4 can run in parallel after Agent 1 has clarified media and brand inputs.

### Agent 1 - Media intake and asset ingestion

**Primary objective**

- Download Roy's photos/videos from Gmail and Drive
- Download and assess the 3 Mar leaflet attachments
- Verify the real Dominion logo
- Convert approved image assets to `.webp`
- Populate `src/assets/images/`, `src/assets/brand/`, and `src/assets/logos/`
- Regenerate `src/data/images.ts`
- Rewrite `src/data/projects.ts` from real jobs/media

**Files in scope**

- `src/assets/images/`
- `src/assets/brand/`
- `src/assets/logos/`
- `src/data/images.ts`
- `src/data/projects.ts`

**Depends on**

- Gmail/Drive access

**Definition of done**

- No roofing/template media remains in active use
- All image references resolve to real committed files
- Logo and leaflet assets are committed and verified
- Project/gallery entries use Roy's real work

### Agent 2 - Core content and services rewrite

**Primary objective**

- Replace remaining template/roofing copy with Dominion cleaning content
- Align services with Roy's offer: exterior/interior cleaning, steam cleaning USP, insured, risk assessments, 15 years experience
- Remove fake/team/template wording
- Fix service descriptions and homepage/service page messaging

**Files in scope**

- `src/data/content.ts`
- `src/data/services.ts`
- `src/data/seoData.ts`
- `src/pages/Index.tsx`
- `src/pages/Services.tsx`

**Depends on**

- Agent 1 for final asset names

**Definition of done**

- No roofing/template copy remains
- Steam cleaning is clearly positioned as the lead USP
- Service names, descriptions, and SEO all match Dominion Trade

### Agent 3 - Areas and local SEO completion

**Primary objective**

- Add all Roy service areas to `src/data/areas.ts`
- Ensure area pages exist logically through the dynamic page system
- Remove broken fallbacks and placeholder local content
- Align area SEO to cleaning, Peterborough, and target towns

**Files in scope**

- `src/data/areas.ts`
- `src/pages/Areas.tsx`
- `src/pages/areas/AreaPage.tsx`
- `src/data/seoData.ts`

**Depends on**

- No hard dependency on Agent 1, but benefits from final imagery

**Definition of done**

- Roy's area list is covered
- No area route falls back to irrelevant Manchester/building copy
- Area titles/descriptions target cleaning keywords, not roofing

### Agent 4 - Forms, reviews, and GHL alignment

**Primary objective**

- Verify `GetQuote` field handling against `GHL_GET_QUOTE_PROPERTIES.md`
- Confirm `AddCustomer`, `Feedback`, and review flow behavior
- Remove or redesign the reviews experience until real reviews/GBP exist
- Resolve discount/referral wording conflicts
- Verify widget IDs and live webhook usage where possible

**Files in scope**

- `src/pages/AddCustomer.tsx`
- `src/pages/Feedback.tsx`
- `src/pages/GetQuote.tsx`
- `src/pages/Reviews.tsx`
- `src/pages/DiscountPage.tsx`
- `src/components/QuoteWizard.tsx`
- `src/components/SimpleContactForm.tsx`
- `src/data/siteSettings.ts`
- `index.html`

**Depends on**

- GHL access for full verification

**Definition of done**

- Quote flow matches the documented webhook schema
- Feedback flow does not send users to a fake review target
- Reviews page is truthful for current business state
- Discount/referral messaging is consistent with Roy's instructions or explicitly marked pending confirmation

### Agent 5 - Deployment and launch QA

**Primary objective**

- Confirm or set up Cloudflare Pages deployment
- Verify environment variables, build output, and domain/canonical setup
- Clean up deployment-facing leftovers such as robots/canonical/template naming issues
- Run final validation and smoke tests

**Files in scope**

- `package.json`
- `public/robots.txt`
- `public/sitemap.xml`
- `src/data/routes.ts`
- `src/components/SEOHead.tsx`
- `src/PageTemplate.tsx`
- `functions/api/submit-form.js`
- deployment config if added

**Depends on**

- Agents 1-4 complete or at least content-stable
- Cloudflare access for final verification

**Definition of done**

- Deployment target is confirmed
- Domain/canonical values are correct
- Final build succeeds
- Core forms and key pages are smoke-tested

## Parallel execution order

### Phase A - unblockers

1. Agent 1 starts immediately
2. Agent 4 can begin repo-side review immediately, but must mark GHL-only steps as blocked pending access

### Phase B - content production

3. Agent 2 starts once Agent 1 finalizes asset naming
4. Agent 3 runs in parallel with Agent 2

### Phase C - launch

5. Agent 5 runs after Agents 1-4 have either completed or clearly marked external blockers

## Tracker

Status values:

- `DONE` - verified and complete
- `IN PROGRESS` - actively being worked
- `NEEDS WORK` - repo issue confirmed, not yet fixed
- `BLOCKED` - cannot finish without external access or client input
- `VERIFY EXTERNALLY` - code looks wired, but the live system must be checked

| # | Task | Owner agent | Status now | Done signal |
|---|---|---|---|---|
| 1 | Replace roofing/template images with Roy media | Agent 1 | BLOCKED | Real Dominion media committed under `src/assets/images/` |
| 2 | Regenerate `src/data/images.ts` to match real filenames | Agent 1 | NEEDS WORK | All imports map to existing image files |
| 3 | Replace placeholder/roofing `src/data/projects.ts` | Agent 1 | NEEDS WORK | Real Dominion projects/gallery entries committed |
| 4 | Assess 3 Mar leaflet attachments and add brand assets | Agent 1 | BLOCKED | Leaflet assets added to `src/assets/brand/` or explicitly rejected |
| 5 | Verify real Dominion logo in `src/assets/logos/` / `src/assets/brand/` | Agent 1 | BLOCKED | Real logo confirmed and committed |
| 6 | Audit and rewrite `src/data/content.ts` | Agent 2 | NEEDS WORK | No roofing/template copy remains |
| 7 | Verify and align `src/data/services.ts` | Agent 2 | NEEDS WORK | Services reflect Dominion cleaning offer only |
| 8 | Complete all Roy service areas in `src/data/areas.ts` | Agent 3 | NEEDS WORK | Roy's area list covered |
| 9 | Fix `siteSettings.ts` socials and review URL policy | Agent 4 | NEEDS WORK | Empty socials confirmed or updated; review URL handled truthfully |
| 10 | Clean Dominion-specific SEO in `src/data/seoData.ts` | Agent 2 + 3 | NEEDS WORK | Titles/descriptions target cleaning, not roofing |
| 11 | Verify homepage content via `src/pages/Index.tsx` and shared data | Agent 2 | NEEDS WORK | Hero/USP/services are Dominion-specific |
| 12 | Rewrite `src/pages/Services.tsx` | Agent 2 | NEEDS WORK | Services page is fully cleaning-focused |
| 13 | Fix `src/pages/Areas.tsx` and dynamic area page behavior | Agent 3 | NEEDS WORK | Area pages are complete and non-placeholder |
| 14 | Replace/remove misleading `src/pages/Reviews.tsx` content | Agent 4 | NEEDS WORK | Reviews page is truthful or intentionally hidden/coming soon |
| 15 | Verify `src/pages/AddCustomer.tsx` integration target | Agent 4 | VERIFY EXTERNALLY | Correct GHL/customer portal embed confirmed or page intentionally left fallback |
| 16 | Verify `src/pages/Feedback.tsx` webhook and redirect flow | Agent 4 | NEEDS WORK | Feedback flow works without fake GBP redirect |
| 17 | Verify `src/pages/GetQuote.tsx` matches `GHL_GET_QUOTE_PROPERTIES.md` | Agent 4 | DONE | Repo mapping matches documented schema |
| 18 | Confirm GHL sub-account and live endpoints | Agent 4 | VERIFY EXTERNALLY | GHL sub-account and workflows verified live |
| 19 | Confirm missed-call text-back message in GHL | Agent 4 | BLOCKED | GHL automation shows Roy's exact message |
| 20 | Confirm referral automation values in GHL | Agent 4 | BLOCKED | Workflow uses agreed discount logic |
| 21 | Resolve review incentive automation | Agent 4 | BLOCKED | Specific incentive agreed or placeholder policy approved |
| 22 | Check/import past client list into GHL | Agent 4 | BLOCKED | Client list found and imported |
| 23 | Confirm Cloudflare Pages deployment | Agent 5 | VERIFY EXTERNALLY | Pages project exists and auto-deploy works |
| 24 | Note repo typo `Dominian-Trade` | Agent 5 | NEEDS WORK | Documented decision on whether to rename later |
| 25 | Decide domain strategy for `dominionepc.com` vs new domain | Agent 5 | BLOCKED | Domain decision made and documented |

## Suggested agent prompts

These are the prompts to use if you want to relaunch implementation agents with tight scopes.

### Prompt - Agent 1

Audit Gmail/Drive-delivered Dominion Trade media, download approved logo/photos/leaflet assets, convert selected images to `.webp`, place them into `src/assets/images`, `src/assets/brand`, and `src/assets/logos`, then update `src/data/images.ts` and `src/data/projects.ts` so all references point to real committed Dominion-owned media. Remove or stop using any roofing/template assets. Return a short completion summary plus any remaining blocked items.

### Prompt - Agent 2

Rewrite Dominion Trade copy across `src/data/content.ts`, `src/data/services.ts`, `src/data/seoData.ts`, `src/pages/Index.tsx`, and `src/pages/Services.tsx` so the site reflects exterior/interior cleaning, steam cleaning leadership, insured status, risk assessments, and 15 years of experience. Remove all roofing/template copy, fake testimonials, fake team references, and irrelevant geography. Keep content factual and ready for launch.

### Prompt - Agent 3

Complete Dominion Trade local area coverage by updating `src/data/areas.ts`, `src/pages/Areas.tsx`, `src/pages/areas/AreaPage.tsx`, and any related SEO data so Roy's service areas are covered and every area route shows cleaning-specific content rather than placeholder or fallback copy. Return a list of added areas and any still needing client confirmation.

### Prompt - Agent 4

Verify Dominion Trade forms and GHL-facing flows by auditing `src/pages/AddCustomer.tsx`, `src/pages/Feedback.tsx`, `src/pages/GetQuote.tsx`, `src/pages/Reviews.tsx`, `src/pages/DiscountPage.tsx`, `src/components/QuoteWizard.tsx`, `src/components/SimpleContactForm.tsx`, `src/data/siteSettings.ts`, and `index.html`. Keep only truthful review/reputation claims, align discount wording to Roy's instructions, and identify which items require live GHL verification.

### Prompt - Agent 5

Prepare the repo for launch by validating deployment assumptions, cleaning canonical/domain/robots leftovers, confirming Cloudflare Pages readiness, and running final validation/build/smoke tests. Document any steps that still require Cloudflare dashboard access or domain decisions.

## Launch gates

Do not treat the site as launch-ready until all of the following are true:

1. No template/roofing copy remains
2. All visible media is Dominion-owned and committed
3. Reviews/reputation claims are truthful for the current business state
4. Area coverage matches Roy's operating footprint
5. Forms are verified end-to-end
6. Cloudflare deployment and domain decisions are confirmed

## Recommended first actions right now

1. Get Gmail/Drive access or export Roy's media into the repo workspace for Agent 1
2. Get GHL access for workflow/widget verification
3. Decide whether the reviews page should be removed, hidden, or set to a "coming soon" state until a GBP exists
4. Decide whether the production domain remains `dominionepc.com` or moves to a new Dominion Trade domain
