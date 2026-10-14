# PM Contracts callback validation, 14 October 2026

PR [#4](https://github.com/jschof1/pm-contracts/pull/4) adds server-side name and plausible callback-number checks before forwarding or saving main, quote and discount requests. The website's quick form, quote wizard and both priority-request pages now explain HTTP 400 validation failures, retain entered details and allow a corrected retry. Whitespace-only wizard details cannot advance. Explicit international `+` and `00` country codes are preserved instead of receiving a UK prefix.

Validation checks format and length only. It cannot prove number ownership, notification delivery or that Peter received an alert. Existing GTM events, anonymous measurement, phone links, role-specific form bindings and optional feedback callback remain in place.

## Cloud checks

- Node 24.19.0 on Linux x86_64 in ChatGPT cloud; no laptop or Mac mini execution.
- 21 proxy, summary and ingest tests; five phone/tracking tests pass.
- Data validation, theme compliance and static production build pass. Full 117-route Chromium prerender is checked separately during release.
- Intercepted browser regression passes all four callback screens: clear HTTP 400 message, fields retained, zero false acceptance/conversions and exactly one successful retry. Quick contact is tested at desktop width because its hero form is hidden on mobile; the other screens use 390px width.
- Lint has zero errors and seven inherited Fast Refresh warnings. Application typecheck reports the same 11 existing errors on current main and this candidate, in unchanged footer/about/contact/service components. No clean typecheck claim is made.
- No real enquiry, SMS, client message or provider configuration change was made.

The public delivery audit of 8 October remains historical evidence. Its statement that the proxy lacks server validation is superseded when PR #4 is released. Its provider and owner-receipt gaps remain open.

## Owned follow-through

Jack should reconcile the next genuine enquiry's CRM name/number with Peter's SMS and app alert on his actual device. Review on 15 October 2026 or immediately on the next genuine enquiry. If controlled testing is needed, arrange Peter's availability and specific approval first. Preserve the open Work OS notification task until receipt and any remaining discount/feedback/missed-call/inbound-message gaps are verified.

Old consent PR #3 remains draft: current main contains newer GTM and direct website measurement absent from that draft's denial coverage, and rejecting after an earlier grant does not revoke injected scripts. Reconcile these separately with the current tracking owner before rollout. Older SEO issues #1 and #2 and the July orphan-link branch remain open/retained outside this callback scope. Do not merge obsolete Google Ads snippets or delete refs as part of this fix.
