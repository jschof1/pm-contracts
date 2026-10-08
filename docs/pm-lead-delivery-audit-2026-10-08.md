# PM Contracts lead delivery audit — 8 October 2026

## Outcome

Two confirmed configuration defects repaired in the live HighLevel account:

- Chat Widget Lead In -> Confirmation: replaced the literal phone placeholder with Contact Phone, and added a dedicated in-app notification targeting Peter McPhee. The notification carries name, phone and inbound message and opens the conversation. Saved, published and reloaded; provider readback is version 3.
- Quote Form Submission -> Confirmation: changed Create Contact / Your Message from the selected service to the actual inbound message. Saved, published and reloaded; provider readback is version 7. The persisted value is only `{{inboundWebhookRequest.message}}`; no unrelated text or Worker source remains.

No synthetic enquiry, test SMS, historical request replay or client message was sent by this audit. The existing checkout's unrelated edits were preserved by using a clean worktree based on canonical main.

## Evidence and limits

- The owner request and acknowledgement were recovered from current Business WhatsApp and the complete readable GHL owner conversation (67 records). The request was for enquiries to arrive with name and number, following difficulty finding a chat enquirer's phone.
- The live account contains 15 published workflows. Publication is not execution or receipt proof.
- Existing provider SMS records establish delivery to the owner's supplied number for a real October quote containing name, phone, email, postcode, service and message. The October chat alert also has a delivered receipt, but its phone line was the literal app placeholder. This narrows that incident to missing alert content rather than proving total notification failure.
- The owner's supplied number is stored on a contact with an unrelated display name. Route matching used the verified number, not that display name. No contact was renamed because the record's mixed history needs reconciliation first.
- Main form contact mapping, dedicated Peter app notification and phone-bearing SMS persisted from the 1 October repair. Quote's Peter app alert carries the full inbound fields.
- The ten-day follow-up is an internal SMS to account users with the enquirer's name and phone. It does not send the contractor's marketing form to the customer.
- The new chat notification has no post-change genuine enquiry/handset confirmation yet. A saved app notification does not establish that Peter's device has push enabled or that he read it.

## Wider routes needing work

| Route | Verified finding | Next action |
| --- | --- | --- |
| Discount | Published workflow has an inbound-trigger warning, no saved mapping reference and no existing sample returned after fetching. SMS template includes contact name/phone but there is no dedicated app action. | Recover an authentic payload reference or separately authorise a controlled sample; verify contact mapping, both website payload variants and owner receipt. Do not replay customer requests. |
| Negative feedback | Published workflow shows warnings on webhook and survey triggers. Two contact branches exist. Inspected internal SMS omits callback phone and uses copy claiming a public review was blocked. | Inspect each warning and mapping, add usable callback details, and replace unsupported review-blocking wording; verify with an authorised controlled check when appropriate. |
| Missed calls | Incoming busy/cancelled/voicemail/no-answer trigger leads to a wait and caller SMS. No dedicated owner-notification action exists in this workflow. | Verify native Peter call/SMS push settings and forwarding, then add explicit owner alert if needed. Name cannot be guaranteed for an unknown caller. |
| Incoming SMS | Two substantive customer conversations remain without a recorded human reply or resolution. Form/webhook alerts do not establish visibility of ordinary inbound texts. | Verify Peter's inbound-message notification settings and reconcile the open conversations with real-world outcomes. |
| Social | FB/IG confirmation workflows are published. Their action details and provider-account linkage were not fully audited in this run. | Verify channel connection and actual owner alerts before claiming full multi-channel coverage. |

Website `functions/api/form-proxy.js` forwards to separate server-side bindings, returns success after upstream acceptance and mirrors into KV. It does not validate required payload fields on the server. Anonymous CRM contact shells are not proof that the current proxy lost valid forms; invalid/empty input handling remains a capture-quality hardening item. The unused Resend endpoint is not a verified backup delivery channel.

## Hosting and inbox readback

- Canonical production deployment was successful on 7 October at commit `9a737e240a4914381b9ad03df55f57daf2ae7c9f`.
- Live homepage returned HTTP 200 and contains the corrected direct-call number and requested GTM container.
- Cloudflare production lists main, quote, discount and negative-review webhook secrets plus the protected inbox password and LEADS_KV binding. Secret values are redacted by Cloudflare: this proves binding presence, not every destination's equality.
- Authenticated KV read returned 17 retained submissions, all with name and phone. Retained main/quote entries include a real quote and separate test-labelled records made outside this audit. There are no retained discount/negative-review rows in that list. Chat-widget submissions use GHL directly and are not expected in this proxy mirror.
- Readable PM conversations totalled 61, rather than only the recent-window dashboard subset. Numbers of contacts, unread items or enquiry candidates are not confirmed jobs.

## Prior work reconciliation

Reviewed 13 earlier locally discoverable relevant Codex chats, the referenced ChatGPT conversation, current Business WhatsApp history (40 readable records, including the older voice note) and the full GHL owner history. A personal chat called Peter had no readable messages and was not assumed to be the same client. This is available-history coverage, not a claim that deleted, inaccessible or other-device chats were recovered.

- 1 October callback repair remains saved; today's defect was the separate chat-widget route.
- IQ Plumbing / Tom & Jerry notification repairs reinforce the same check: explicit owner app action and actual phone/details in the SMS. No claim that one client's saved fix proves another client's receipt.
- 6 October direct-call correction is live; the requested real handset ringing confirmation remains unproved.
- 7 October GTM and successful-form events are live. Callum's Google Ads conversion setup, enhanced conversions/consent and receipt still require his verification.
- Domain access was requested in August. An older voice note said a colleague had been asked to grant access, but no accepted invitation was recovered. Existing access task remains open.
- Older SEO/orphan-link and payment reconciliation tasks remain separate; this audit does not close them or infer unpaid amounts from stale snapshots.

## Ownership and next verification

The existing PM owner task remains open and linked to this audit. Jack/Peter must reconcile the two urgent customer issues and provide the next genuine chat alert/phone receipt; Codex retains the configuration gaps above. Review at the next genuine enquiry or next working-day check, whichever happens first. Complaint escalation uses the existing complaint task. Exact customer records and phone numbers remain in private evidence/Work OS, not this public repository.
