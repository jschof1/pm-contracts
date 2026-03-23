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

The LeadConnector webhook URL is **inbound only** (it receives POSTs; it does not return a list of leads). To show submissions on the private page:

1. Create a **KV namespace** in Cloudflare and bind it to your Pages project as **`LEADS_KV`** (Pages → Settings → Functions → KV namespace bindings).
2. Set these **secrets** (or vars where noted):

- `SECRET_LEADS_PAGE_PASSWORD` — password for `/internal/leads` (team enters this in the browser; validated on `GET /api/lead-submissions`).
- `LEADS_INGEST_SECRET` — shared secret; send as header `X-Leads-Ingest-Secret` on ingest POSTs.
- `GHL_LEAD_WEBHOOK_FORWARD` — optional; your LeadConnector webhook URL. When set, each ingest POST is forwarded there after storage so GHL automations still run.

3. Point your automation at **`POST https://<your-domain>/api/lead-submissions`** with header `X-Leads-Ingest-Secret: <same as LEADS_INGEST_SECRET>` and the same JSON body you would send to LeadConnector. If `GHL_LEAD_WEBHOOK_FORWARD` is set, the function stores the payload and forwards it to LeadConnector.

Alternatively, add a **second** webhook action in GHL that POSTs to `/api/lead-submissions` (with the secret header) in addition to the existing LeadConnector URL.

```bash
npx wrangler pages secret put SECRET_LEADS_PAGE_PASSWORD --project-name <pages-project-name>
npx wrangler pages secret put LEADS_INGEST_SECRET --project-name <pages-project-name>
npx wrangler pages secret put GHL_LEAD_WEBHOOK_FORWARD --project-name <pages-project-name>
```

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
