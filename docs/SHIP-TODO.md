# PM Contract - Site Status and Launch Checklist

Last checked: 2026-06-13.

## Current Verified Status

- [x] Repo is configured for PM Contract / PM Roofers rather than Dominion Trade.
- [x] Production site URL in code and generated SEO artifacts is `https://pmroofers.com`.
- [x] Cloudflare Pages project `pm-contracts` appears in the Jack Cloudflare account with domains `pm-contracts.pages.dev` and `pmroofers.com`.
- [x] `https://pmroofers.com/` returns HTTP 200.
- [x] `https://pmroofers.com/internal/leads` returns HTTP 200 and loads the password-gated lead inbox shell.
- [x] Contact and quote forms post to `/api/form-proxy` and depend on Cloudflare secrets for the GHL webhook URLs.
- [x] `wrangler.toml` defines the `LEADS_KV` binding needed by the internal lead inbox.
- [x] Local validation/build passes: `npm run validate:data`, `npm run check:theme-compliance`, and `npm run build`.

## Payment Proof

- [ ] Confirm externally that PM Contract payment proof has been received and stored in the work OS / client record.
- [ ] Do not commit payment screenshots, bank details, card details, or client portal credentials to this repo.
- [ ] If payment proof affects launch approval, mark the task blocked until the external record confirms it.

## Domain and DNS

- [x] Current repo canonical, sitemap, robots, OG URLs, analytics domain, and site settings use `pmroofers.com`.
- [x] Live Cloudflare Pages binding is `pmroofers.com`.
- [ ] Confirm whether `pmroofers.com` is the final approved production domain or whether the original requested `rooferglasgow.uk` should still be used.
- [ ] `https://rooferglasgow.uk/` did not connect during the 2026-06-13 check; do not switch canonicals without a confirmed DNS/Cloudflare plan.
- [ ] If switching domains, update `src/data/siteSettings.ts`, `index.html`, generated SEO artifacts, Cloudflare Pages custom domains, analytics domain, and any GHL links before launch.

## Login and Access Checklist

- [ ] Confirm Cloudflare account selection for non-interactive Wrangler commands. `wrangler pages project list` can verify the project, but secret/deployment subcommands selected the wrong account during this check.
- [ ] Verify Cloudflare Pages secrets without exposing values:
  - `QUOTE_FORM_WEBHOOK`
  - `MAIN_FORM_WEBHOOK`
  - `NEGATIVE_REVIEW_WEBHOOK`
  - `DISCOUNT_FORM_WEBHOOK`
  - `SECRET_LEADS_PAGE_PASSWORD`
  - `LEADS_INGEST_SECRET` only if using standalone lead ingest
  - `GHL_LEAD_WEBHOOK_FORWARD` only if using standalone lead ingest forwarding
- [ ] Confirm the `/internal/leads` password is stored in the team password manager and shared only through the approved secure channel.
- [ ] Confirm GoHighLevel sub-account access and webhook ownership before any production form smoke test that creates client-visible records.
- [ ] Confirm registrar/DNS login ownership for any future domain cutover.

## Final Pre-Launch Checks

- [ ] Submit one controlled test through each production form and confirm GHL receipt:
  - Quick contact form
  - Quote wizard
  - Discount form/page
  - Feedback form
- [ ] Open `/internal/leads` with the stored password and confirm recent form rows appear.
- [ ] Confirm notification recipients and subject lines in GHL.
- [ ] Confirm legal/contact details: phone, email, address, privacy policy, and terms.
- [ ] Browser QA key pages on desktop and mobile: home, services, one service detail, areas, one area detail, contact, get quote, reviews, and internal leads.
- [ ] Submit sitemap in Google Search Console after final domain decision.

## Post-Launch Monitoring

- [ ] Check live forms again after deployment.
- [ ] Check Cloudflare Pages deployment status and custom domain health.
- [ ] Monitor GHL for missed or malformed submissions.
- [ ] Monitor indexing and analytics for the final production domain.
