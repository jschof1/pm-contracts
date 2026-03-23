const MAX_ENTRIES = 100;
const KV_KEY = "pm_lead_submissions_v1";

const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });

const parseSubmissions = (raw) => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/**
 * POST: ingest a webhook payload (e.g. duplicate GHL / LeadConnector webhook).
 * Header: X-Leads-Ingest-Secret must match LEADS_INGEST_SECRET.
 * Optionally forwards the same JSON to GHL_LEAD_WEBHOOK_FORWARD (your LeadConnector URL).
 *
 * GET: list stored submissions. Header: Authorization: Bearer <SECRET_LEADS_PAGE_PASSWORD>
 */
export async function onRequestPost(context) {
  const { request, env } = context;
  const secret = request.headers.get("x-leads-ingest-secret") || "";
  if (!env.LEADS_INGEST_SECRET || secret !== env.LEADS_INGEST_SECRET) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const forwardUrl = env.GHL_LEAD_WEBHOOK_FORWARD;
  if (forwardUrl) {
    const upstream = await fetch(forwardUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!upstream.ok) {
      const text = await upstream.text();
      return jsonResponse(
        { error: "Forward to LeadConnector webhook failed.", detail: text.slice(0, 500) },
        502
      );
    }
  }

  if (env.LEADS_KV) {
    const prev = await env.LEADS_KV.get(KV_KEY);
    const list = parseSubmissions(prev);
    const entry = {
      id: crypto.randomUUID(),
      receivedAt: new Date().toISOString(),
      payload,
    };
    list.unshift(entry);
    await env.LEADS_KV.put(KV_KEY, JSON.stringify(list.slice(0, MAX_ENTRIES)));
  }

  return jsonResponse({ ok: true, stored: Boolean(env.LEADS_KV) });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!env.SECRET_LEADS_PAGE_PASSWORD || token !== env.SECRET_LEADS_PAGE_PASSWORD) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  if (!env.LEADS_KV) {
    return jsonResponse(
      {
        error: "Lead storage is not configured (bind a KV namespace as LEADS_KV).",
        submissions: [],
      },
      503
    );
  }

  const raw = await env.LEADS_KV.get(KV_KEY);
  const submissions = parseSubmissions(raw);
  return jsonResponse({ submissions });
}
