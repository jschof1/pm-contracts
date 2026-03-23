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

Replace `<pages-project-name>` with the live Cloudflare Pages project name before running:

```bash
npx wrangler pages secret put QUOTE_FORM_WEBHOOK --project-name <pages-project-name>
npx wrangler pages secret put MAIN_FORM_WEBHOOK --project-name <pages-project-name>
npx wrangler pages secret put NEGATIVE_REVIEW_WEBHOOK --project-name <pages-project-name>
npx wrangler pages secret put DISCOUNT_FORM_WEBHOOK --project-name <pages-project-name>
```

If needed:

```bash
npx wrangler pages secret put RESEND_API_KEY --project-name <pages-project-name>
```

## Internal lead inbox (`/internal/leads`)

**How it works with your existing quote/contact/discount forms:** The site still posts only to `/api/form-proxy?type=…`. That function **still forwards to the same Go High Level webhook URLs** as today. If **`LEADS_KV`** is bound, each **successful** forward is also appended to KV, so the team page can list submissions **without** changing GHL or adding a second webhook.

**Standalone ingest** (`POST /api/lead-submissions`) is optional: use it only for automations that cannot go through `form-proxy` (then set `LEADS_INGEST_SECRET` and optionally `GHL_LEAD_WEBHOOK_FORWARD`).

### Setup order (use your real Pages project name everywhere)

1. **Keep existing form webhooks working** — Ensure these secrets are already set (re-run `put` if you are rotating values). No change to behaviour when you add KV.

```bash
PROJECT="<pages-project-name>"

npx wrangler pages secret put QUOTE_FORM_WEBHOOK --project-name "$PROJECT"
npx wrangler pages secret put MAIN_FORM_WEBHOOK --project-name "$PROJECT"
npx wrangler pages secret put NEGATIVE_REVIEW_WEBHOOK --project-name "$PROJECT"
npx wrangler pages secret put DISCOUNT_FORM_WEBHOOK --project-name "$PROJECT"
```

2. **Create a KV namespace** (once per account; pick any label):

```bash
npx wrangler kv namespace create "PM_LEADS"
```

Copy the **`id`** from the command output.

3. **Bind KV to the Pages project** — In Cloudflare: **Workers & Pages** → your Pages project → **Settings** → **Functions** → **KV namespace bindings** → **Add binding** → variable name **`LEADS_KV`** → select the namespace you created. (Wrangler cannot attach this binding for hosted Pages in one line; the dashboard step is required.)

4. **Password for the internal page** — Pick a strong password; the team will enter it on `/internal/leads`.

```bash
npx wrangler pages secret put SECRET_LEADS_PAGE_PASSWORD --project-name "$PROJECT"
```

5. **(Optional) Standalone webhook ingest** — Only if something will `POST` directly to `/api/lead-submissions` (not needed for quote/contact forms via `form-proxy`):

```bash
npx wrangler pages secret put LEADS_INGEST_SECRET --project-name "$PROJECT"
npx wrangler pages secret put GHL_LEAD_WEBHOOK_FORWARD --project-name "$PROJECT"
```

6. **Deploy** — Trigger a new production deployment so Functions see `LEADS_KV` and secrets.

7. **Smoke test** — Submit a test quote on the live site; confirm it still appears in GHL, then open `https://pmroofers.com/internal/leads`, enter the password, and confirm the submission appears with `formType` in the payload.

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
