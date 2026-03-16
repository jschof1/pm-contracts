# Dominion Trade - Ship TODOs

## Phase 1 - Must Do Before Launch

- [ ] Replace all template images with Dominion Trade-owned media.
- [ ] Add final logo assets (header, footer, favicon, OG/social image).
- [ ] Verify image usage rights and keep source notes for all media.
- [ ] Set `RESEND_API_KEY` in Cloudflare Pages environment variables.
- [ ] Test all forms end-to-end:
  - [ ] Quick contact form
  - [ ] Quote wizard
  - [ ] Discount form/page
  - [ ] Feedback form
- [ ] Confirm form notification recipients and subject lines.
- [ ] Replace fallback Google review URL with real Google Business review link.
- [ ] Rewrite remaining legacy roofing copy in page components to cleaning-focused copy.
- [ ] Verify primary navigation and footer links match final services/areas.
- [ ] Decide whether `/add-customer` should stay as fallback or be replaced with final integration.
- [ ] Run final SEO/build checks:
  - [ ] `npm run validate:data`
  - [ ] `npm run generate:seo`
  - [ ] `npm run build`
- [ ] Confirm key legal/contact details are accurate on privacy and terms pages.
- [ ] Smoke test all core pages on desktop and mobile.

## Phase 2 - Recommended Post-Launch Improvements

- [ ] Replace placeholder/generated testimonials with real client testimonials.
- [ ] Improve copy polish/tone consistency across all pages.
- [ ] Add analytics/tracking and conversion events for forms/calls.
- [ ] Submit sitemap to Google Search Console.
- [ ] Improve performance:
  - [ ] Compress/resize large images
  - [ ] Review JS bundle size and code splitting opportunities
- [ ] Run accessibility pass (headings, alt text, contrast, form labels).
- [ ] Browser QA pass (Chrome, Safari, mobile browsers).
- [ ] Add a post-launch monitoring checklist (forms, uptime, indexing, page health).

## Final Go/No-Go Checklist

- [ ] Contact details correct everywhere (phone, email, address).
- [ ] Domain/canonical URLs set to `https://dominionepc.com`.
- [ ] No template placeholders remain.
- [ ] Form submissions confirmed in production.
- [ ] Homepage + services + contact pages reviewed and approved.
