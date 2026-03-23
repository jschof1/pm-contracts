export interface FlatField {
  key: string;
  value: string;
}

/**
 * Flattens nested GHL / form payloads into label-friendly rows for display.
 */
export function flattenLeadPayload(obj: unknown, prefix = ""): FlatField[] {
  if (obj === null || obj === undefined) {
    return [];
  }

  if (typeof obj !== "object") {
    return [{ key: prefix || "value", value: String(obj) }];
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return prefix ? [{ key: prefix, value: "(empty)" }] : [];
    }
    return obj.flatMap((item, i) => flattenLeadPayload(item, `${prefix}[${i}]`));
  }

  const entries = Object.entries(obj as Record<string, unknown>);
  if (entries.length === 0) {
    return prefix ? [{ key: prefix, value: "{}" }] : [];
  }

  return entries.flatMap(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === "object" && !Array.isArray(v)) {
      return flattenLeadPayload(v, key);
    }
    if (Array.isArray(v)) {
      return flattenLeadPayload(v, key);
    }
    if (v === undefined) {
      return [{ key, value: "" }];
    }
    return [{ key, value: String(v) }];
  });
}

export function pickLeadTitle(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    return "Lead";
  }
  const p = payload as Record<string, unknown>;
  const contact = p.contact && typeof p.contact === "object" ? (p.contact as Record<string, unknown>) : null;
  const name =
    (typeof p.name === "string" && p.name) ||
    (typeof p.full_name === "string" && p.full_name) ||
    (contact && typeof contact.name === "string" && contact.name) ||
    (typeof p.firstName === "string" && typeof p.lastName === "string"
      ? `${p.firstName} ${p.lastName}`.trim()
      : "") ||
    (typeof p.first_name === "string" && typeof p.last_name === "string"
      ? `${p.first_name} ${p.last_name}`.trim()
      : "");
  if (name) return name;
  const email =
    (typeof p.email === "string" && p.email) ||
    (contact && typeof contact.email === "string" && contact.email);
  if (email) return String(email);
  const phone =
    (typeof p.phone === "string" && p.phone) ||
    (contact && typeof contact.phone === "string" && contact.phone);
  if (phone) return String(phone);
  return "Lead";
}
