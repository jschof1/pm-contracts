/**
 * POST a test payload to /api/lead-submissions (requires LEADS_INGEST_SECRET in Cloudflare).
 *
 * Usage:
 *   LEADS_INGEST_SECRET='your-secret' node scripts/test-lead-ingest.mjs
 *
 * Optional:
 *   LEAD_INGEST_BASE_URL=https://pmroofers.com   (default: https://pmroofers.com)
 */

const base = (process.env.LEAD_INGEST_BASE_URL || "https://pmroofers.com").replace(/\/$/, "");
const secret = process.env.LEADS_INGEST_SECRET;

if (!secret) {
  console.error(
    "Missing LEADS_INGEST_SECRET.\n" +
      "Set it to the same value as the Cloudflare secret LEADS_INGEST_SECRET, e.g.:\n" +
      "  LEADS_INGEST_SECRET='your-value' node scripts/test-lead-ingest.mjs"
  );
  process.exit(1);
}

const payload = {
  source: "test-lead-ingest-script",
  name: "CLI test lead",
  email: "test@example.com",
  phone: "+44 7700 900000",
  message: `Smoke test at ${new Date().toISOString()}`,
};

const url = `${base}/api/lead-submissions`;
const res = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Leads-Ingest-Secret": secret,
  },
  body: JSON.stringify(payload),
});

const text = await res.text();
console.log(`${res.status} ${res.statusText}`);
console.log(text);

if (!res.ok) {
  if (res.status === 401) {
    console.error(
      "\n401: Cloudflare may be missing LEADS_INGEST_SECRET, or your header value does not match."
    );
  }
  process.exit(1);
}

console.log("\nOK — open /internal/leads (refresh) to see this submission.");
