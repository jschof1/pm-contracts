const WEBHOOK_ENV_BY_TYPE = {
  quote: "QUOTE_FORM_WEBHOOK",
  main: "MAIN_FORM_WEBHOOK",
  "negative-review": "NEGATIVE_REVIEW_WEBHOOK",
  discount: "DISCOUNT_FORM_WEBHOOK",
};

const QUOTE_VALUE_LABELS = {
  propertyType: {
    residential: "Residential Property",
    commercial: "Commercial Property",
  },
  projectSize: {
    small: "Small Job / Single Area",
    medium: "Multi-Area Roofing Repair",
    large: "Full Roof Replacement Project",
    commercial: "Commercial Project",
    unsure: "Not Sure - Need Survey",
  },
  serviceInterest: {
    "roof-replacement": "Roof Replacement",
    "roof-repairs": "Roof Repairs",
    "emergency-roof-repairs": "Emergency Roof Repairs",
    leadwork: "Leadwork",
    "chimney-repairs": "Chimney Repairs",
    roughcasting: "Roughcasting",
    "upvc-gutters": "UPVC Gutters",
    other: "Other Roofing or Exterior Work",
  },
  preferredStyle: {
    repair: "Repair Existing Roof",
    replacement: "Full Roof Replacement",
    maintenance: "Preventative Maintenance",
    "exterior-upgrade": "Exterior Upgrade / Protection",
    unsure: "Need Expert Advice",
  },
};

const formatQuoteValue = (key, value) => {
  if (value === undefined || value === null) {
    return "";
  }

  const trimmedValue = String(value).trim();
  if (!trimmedValue) {
    return "";
  }

  return QUOTE_VALUE_LABELS[key]?.[trimmedValue] ?? trimmedValue;
};

const buildQuoteSummary = (payload) => {
  const lines = [
    "Info:",
  ];

  const fields = [
    ["Name", formatQuoteValue("name", payload.name)],
    ["Phone", formatQuoteValue("phone", payload.phone)],
    ["Email", formatQuoteValue("email", payload.email)],
    ["Postcode", formatQuoteValue("postcode", payload.postcode)],
    ["Property Type", formatQuoteValue("propertyType", payload.propertyType)],
    ["Service Required", formatQuoteValue("serviceInterest", payload.serviceInterest)],
    ["Project Size", formatQuoteValue("projectSize", payload.projectSize)],
    ["Preferred Style", formatQuoteValue("preferredStyle", payload.preferredStyle)],
    ["Message", formatQuoteValue("message", payload.message)],
  ];

  for (const [label, value] of fields) {
    if (value) {
      lines.push(`- ${label}: ${value}`);
    }
  }

  return lines.join("\n");
};

const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });

const objectFromFormData = (formData) => {
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = typeof value === "string" ? value : value?.name ?? "";
  }
  return data;
};

const normalizePayload = async (request) => {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return await request.json();
  }

  if (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    return objectFromFormData(await request.formData());
  }

  try {
    return await request.json();
  } catch {
    try {
      return objectFromFormData(await request.formData());
    } catch {
      return {};
    }
  }
};

export async function onRequestPost(context) {
  const { request, env } = context;
  const { searchParams } = new URL(request.url);
  const formType = searchParams.get("type") || "";
  const envKey = WEBHOOK_ENV_BY_TYPE[formType];

  if (!envKey) {
    return jsonResponse(
      {
        success: false,
        error: "Unknown form type.",
      },
      400
    );
  }

  const webhookUrl = env[envKey];
  if (!webhookUrl) {
    return jsonResponse(
      {
        success: false,
        error: `${envKey} is not configured.`,
      },
      500
    );
  }

  const payload = await normalizePayload(request);
  const forwardedPayload =
    formType === "quote"
      ? {
          ...payload,
          summary: buildQuoteSummary(payload),
        }
      : payload;

  const upstream = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(forwardedPayload),
  });

  if (!upstream.ok) {
    return jsonResponse(
      {
        success: false,
        error: "Webhook forward failed.",
      },
      502
    );
  }

  // Optional: mirror successful forwards into the same KV list as /api/lead-submissions
  // so /internal/leads shows quote, contact, discount, and feedback forms without a second GHL webhook.
  if (env.LEADS_KV) {
    const KV_KEY = "pm_lead_submissions_v1";
    const MAX = 100;
    try {
      const raw = await env.LEADS_KV.get(KV_KEY);
      let list = [];
      try {
        const parsed = raw ? JSON.parse(raw) : [];
        list = Array.isArray(parsed) ? parsed : [];
      } catch {
        list = [];
      }
      list.unshift({
        id: crypto.randomUUID(),
        receivedAt: new Date().toISOString(),
        payload: {
          formType,
          ...forwardedPayload,
        },
      });
      await env.LEADS_KV.put(KV_KEY, JSON.stringify(list.slice(0, MAX)));
    } catch {
      // Non-fatal: GHL forward already succeeded.
    }
  }

  return jsonResponse({ success: true });
}
