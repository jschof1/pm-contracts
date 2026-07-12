# PM Contracts — Lead Recovery Summary

Checked: 12 July 2026

State: local operational summary only. No lead/client messages, test submissions or CRM mutations were made.

## Verified route

- Business: PM Contracts / PM Roofers
- Domain: `pmroofers.com`
- The exact client sub-account was verified before classification.

Exact contact, conversation and form identifiers stay in the private Work OS task record; they are deliberately not committed to this repository.

## Current 14-day result

- 14 inquiry candidates from the agency metric
- 5 current-window conversations
- 7 unread items, all on two conversations
- 0 current inbound conversations
- 1 confirmed chat-widget form submission
- 0 opportunities in the inspected window

The 14-candidate total is not a 14-lead outreach list. Nine entries are anonymous `external_form` contact shells with no current conversation or form body.

## Classification

- 1 confirmed urgent roof-repair enquiry reports internal water damage.
- 1 likely real missed-call/form signal has five unread items but no request detail in the current read.
- 1 possible form lead has only an automated acknowledgement.
- 2 identity patterns are likely spam or otherwise unsafe without contrary source evidence.
- 9 anonymous external-form shells are capture-quality investigation items, not outreach-ready leads.

## Website form-route check

- The site uses same-origin `/api/form-proxy` routes for main, quote, discount and negative-review forms.
- The Cloudflare function maps each form type to a separate server-side environment binding and returns success only after the upstream webhook accepts the payload.
- Successful proxy submissions can also be mirrored into the protected `LEADS_KV` internal inbox when that binding is available.
- The deployed site returned HTTP 200 and its current bundle contains the expected same-origin form routes and LeadConnector assets.
- No test submission was made. The anonymous shells alone do not prove the current proxy is broken.

## Next safe action

Peter should first handle the confirmed water-ingress enquiry and then reopen the missed-call/form history before deciding on a callback. The anonymous shells need protected-inbox, workflow-history and source-ID reconciliation. No outreach, deployment, environment change or CRM mutation should occur without the normal verification and approval route.
