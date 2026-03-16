# Cloudflare form env setup

This project now expects the public forms to post to a Cloudflare Pages Function at:

- `/api/form-proxy?type=quote`
- `/api/form-proxy?type=main`
- `/api/form-proxy?type=negative-review`
- `/api/form-proxy?type=discount`

The Pages Function forwards each request to a server-side webhook stored in Cloudflare environment variables, so the GoHighLevel webhook URLs are no longer exposed in the frontend bundle.

## Required Cloudflare env vars

Set these on the Dominion EPC / Dominion Trade Pages project:

- `QUOTE_FORM_WEBHOOK`
- `MAIN_FORM_WEBHOOK`
- `NEGATIVE_REVIEW_WEBHOOK`
- `DISCOUNT_FORM_WEBHOOK`

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

## Deployment note

- Production domain stays on `dominionepc.com`.
- After setting the secrets above, trigger a new deployment so the Pages Functions pick up the env vars.

## Hosting transfer note

Client-provided hosting credentials and any registrar/login details should be stored in the team's password manager or other secure internal system, not committed to git.

Before the domain cutover:

1. Confirm the Cloudflare Pages project is serving the correct production build.
2. Confirm forms work against the Cloudflare env-backed webhook proxy.
3. Confirm DNS records required for `dominionepc.com`.
4. Lower TTL if needed before nameserver or record changes.
5. Schedule the switch and smoke test the live domain immediately after the change.
