# Google Tag Manager and accepted enquiry tracking

Requested by Peter via Business WhatsApp on 6 October 2026, in two screenshots of Callum's “Google Tag Manager install and form tracking event” email.

- Site-wide GTM container: `GTM-KSM6MZKS`, head bootstrap and opening-body noscript fallback.
- All four public enquiry implementations emit `lead_form_submit` with `form_name: quote_form` after a successful HTTP response, never on button click or a failed response.
- Quick contact: selected service and entered phone. Quote wizard: selected service, email and phone. Both offer forms: phone; service/email are empty because those inputs are not collected. Empty values prevent stale fields carrying over between SPA submissions.
- Customer-feedback, staff/customer-import and internal-login forms are not new enquiries and do not emit lead conversions.
- No additional standalone Google/analytics scripts were added. Existing Plausible and HighLevel integrations are preserved.
- Prerender removes the dynamically inserted GTM loader before saving HTML, avoiding duplicate container loading.
- Tracking exceptions do not prevent the site's success confirmation. Contact fields are only exposed to GTM's data layer, not added to existing anonymous Plausible events or browser storage.

## Verification

Production build including 117 prerendered HTML pages; each has exactly one bootstrap and one noscript fallback. Existing Kilmarnock regression tests and focused lint pass. Controlled browser test: `node test/lead-tracking.browser.mjs`, with a local preview on port 4179. Form requests are intercepted and all external requests blocked, so tests create no leads or ad conversions.

The repository-wide type check has pre-existing errors in Footer, About, Contact and ServicePage content types. These files are unchanged by this work.

## Remaining external check

Callum must verify the GTM custom-event trigger and Google Ads conversion tag in his container, including enhanced-conversion hashing/consent configuration and receipt in Ads. Website event delivery does not establish Ads attribution or receipt. No message was sent to Peter or Callum.
