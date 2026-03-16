const WEBHOOK_ENV_BY_TYPE = {
  quote: "QUOTE_FORM_WEBHOOK",
  main: "MAIN_FORM_WEBHOOK",
  "negative-review": "NEGATIVE_REVIEW_WEBHOOK",
  discount: "DISCOUNT_FORM_WEBHOOK",
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
  const upstream = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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

  return jsonResponse({ success: true });
}
