const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

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
  if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
    return objectFromFormData(await request.formData());
  }

  // Safe fallback: try JSON first, then form-data.
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

const buildHtml = (payload) => {
  const rows = Object.entries(payload)
    .filter(([key, value]) => key && value !== undefined && value !== null && String(value).trim() !== "")
    .map(
      ([key, value]) => `<tr>
  <td style="padding:8px;border:1px solid #ddd;font-weight:600;">${escapeHtml(key)}</td>
  <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(value)}</td>
</tr>`
    )
    .join("");

  return `<h2>New Website Enquiry</h2>
<p>A new submission was sent from pmroofers.com.</p>
<table style="border-collapse:collapse;border:1px solid #ddd;">${rows}</table>`;
};

export async function onRequestPost(context) {
  const { request, env } = context;
  const payload = await normalizePayload(request);
  const source = payload.source || "website-form";

  const resendKey = env.RESEND_API_KEY;
  if (!resendKey) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "RESEND_API_KEY is not configured",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "PM Roofers Website <onboarding@resend.dev>",
      to: "pmcontracts99@gmail.com",
      subject: `New enquiry (${source})`,
      reply_to: payload.email || undefined,
      html: buildHtml(payload),
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    return new Response(JSON.stringify({ success: false, error: errorText }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
