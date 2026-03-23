# Cloudflare form env setup

This project now expects the public forms to post to a Cloudflare Pages Function at:

- `/api/form-proxy?type=quote`
- `/api/form-proxy?type=main`
- `/api/form-proxy?type=negative-review`
- `/api/form-proxy?type=discount`

The Pages Function forwards each request to a server-side webhook stored in Cloudflare environment variables, so the GoHighLevel webhook URLs are no longer exposed in the frontend bundle.

## Required Cloudflare env vars

Set these on the PM Roofers Cloudflare Pages project:

- `QUOTE_FORM_WEBHOOK=https://services.leadconnectorhq.com/hooks/lgMnKq09kTzFVsHzOjd3/webhook-trigger/t9vDXCdo1uXVOq7ntXC7`
- `MAIN_FORM_WEBHOOK=https://services.leadconnectorhq.com/hooks/lgMnKq09kTzFVsHzOjd3/webhook-trigger/QOpFlrRpMKgmjShfVwUR`
- `NEGATIVE_REVIEW_WEBHOOK=https://services.leadconnectorhq.com/hooks/lgMnKq09kTzFVsHzOjd3/webhook-trigger/SIDrDVRQ135NPZl0UgbS`
- `DISCOUNT_FORM_WEBHOOK=https://services.leadconnectorhq.com/hooks/lgMnKq09kTzFVsHzOjd3/webhook-trigger/b8Rq77KyHvC3YYRGwCB1`

If the legacy email function is still used, also set:

- `RESEND_API_KEY`

## Wrangler commands

**Pages project name:** `pm-contracts` (domain: `pmroofers.com`).

If Wrangler reports multiple accounts, set the account that owns this project (Workers & Pages → overview URL contains the id, or use `npx wrangler whoami`):

```bash
export CLOUDFLARE_ACCOUNT_ID="<your-account-id>"
```

Install project dev dependencies so `npm run cf:*` works:

```bash
npm install
```

### Existing form webhooks (already set on production)

These four secrets are **already configured** on `pm-contracts` (verify with `npm run cf:secrets:list`). Re-run `put` only when rotating URLs:

```bash
npx wrangler pages secret put QUOTE_FORM_WEBHOOK --project-name pm-contracts
npx wrangler pages secret put MAIN_FORM_WEBHOOK --project-name pm-contracts
npx wrangler pages secret put NEGATIVE_REVIEW_WEBHOOK --project-name pm-contracts
npx wrangler pages secret put DISCOUNT_FORM_WEBHOOK --project-name pm-contracts
```

If needed:

```bash
npx wrangler pages secret put RESEND_API_KEY --project-name pm-contracts
```

## Internal lead inbox (`/internal/leads`)

**How it works with your existing quote/contact/discount forms:** The site still posts only to `/api/form-proxy?type=…`. That function **still forwards to the same Go High Level webhook URLs** as today. If **`LEADS_KV`** is bound, each **successful** forward is also appended to KV, so the team page can list submissions **without** changing GHL or adding a second webhook.

**Standalone ingest** (`POST /api/lead-submissions`) is optional: use it only for automations that cannot go through `form-proxy` (then set `LEADS_INGEST_SECRET` and optionally `GHL_LEAD_WEBHOOK_FORWARD`).

### Setup order (`pm-contracts`)

1. **Form webhooks** — Already present in Cloudflare (`npm run cf:secrets:list`). No change required for GHL forwarding.

2. **KV for the inbox** — A KV namespace is defined in repo root `wrangler.toml` as binding **`LEADS_KV`**. After you merge and deploy, confirm under **Workers & Pages** → **pm-contracts** → **Settings** → **Functions** that **`LEADS_KV`** is listed (Git deploys pick up `wrangler.toml`; if the binding is missing, add it manually and select namespace id `c798ad7590824ce9b3b7fb914b547d1e`).

3. **Password for `/internal/leads`** — Run locally (Wrangler will prompt; value is not echoed in the terminal history if you type interactively):

```bash
npm run cf:secret:leads-password
```

4. **(Optional) Standalone `POST /api/lead-submissions`** — Only if an external system posts to that URL (not needed for normal site forms):

```bash
npm run cf:secret:ingest
npm run cf:secret:ghl-forward
```

5. **Deploy** — Push to `main` or **Retry deployment** in Cloudflare so production loads `wrangler.toml` + new secret.

6. **Smoke test** — Submit a test quote; confirm GHL receives it; open `https://pmroofers.com/internal/leads`, enter the password, confirm the row appears (`formType` in the stored payload).

## Deployment note

- Production domain should be `pmroofers.com`.
- After setting the secrets above, trigger a new deployment so the Pages Functions pick up the env vars.

## Hosting transfer note

Client-provided hosting credentials and any registrar/login details should be stored in the team's password manager or other secure internal system, not committed to git.

Before the domain cutover:

1. Confirm the Cloudflare Pages project is serving the correct production build.
2. Confirm forms work against the Cloudflare env-backed webhook proxy.
3. Confirm DNS records required for `pmroofers.com`.
4. Lower TTL if needed before nameserver or record changes.
5. Schedule the switch and smoke test the live domain immediately after the change.
