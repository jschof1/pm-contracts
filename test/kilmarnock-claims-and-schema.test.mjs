import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routePath = new URL("../dist/kilmarnock/index.html", import.meta.url);

const includesType = (schema, type) => {
  const types = Array.isArray(schema?.["@type"])
    ? schema["@type"]
    : [schema?.["@type"]];
  return types.includes(type);
};

test("Kilmarnock uses one consistent business identity and evidence-safe claims", async () => {
  const html = await readFile(routePath, "utf8");
  const visibleText = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const schemas = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].map((match) => JSON.parse(match[1]));
  const businesses = schemas.filter((schema) =>
    includesType(schema, "LocalBusiness"),
  );

  assert.equal(businesses.length, 1);
  assert.equal(businesses[0]["@id"], "https://pmroofers.com/#business");
  assert.equal(businesses[0].name, "PM Roofers");
  assert.deepEqual(businesses[0].address, {
    "@type": "PostalAddress",
    streetAddress: "11 Lanrig Place",
    addressLocality: "Glasgow",
    postalCode: "G69 9AT",
    addressCountry: "GB",
  });

  for (const unsupportedClaim of [
    "71+",
    "4.9",
    "5/5",
    "Google Rating",
    "Satisfaction Rate",
    "Limited availability",
    "24/7",
    "Same-Day Quotes Available",
    "Same-day response",
    "Response within 2 hours",
  ]) {
    const escapedClaim = unsupportedClaim.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.doesNotMatch(visibleText, new RegExp(escapedClaim, "i"));
  }

  assert.match(visibleText, /Free, No-Obligation Quotes/);
  assert.match(visibleText, /Mon - Sat: 7:00 AM - 7:00 PM/);
});
