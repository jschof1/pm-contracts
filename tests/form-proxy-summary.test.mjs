import assert from "node:assert/strict";
import test from "node:test";

import { onRequestPost } from "../functions/api/form-proxy.js";

test("quote submissions include a formatted summary in the forwarded payload", async () => {
  let forwardedBody;
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (_url, init) => {
    forwardedBody = JSON.parse(init.body);
    return new Response("ok", { status: 200 });
  };

  try {
    const request = new Request("https://example.com/api/form-proxy?type=quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Jack Smith",
        phone: "+447700900123",
        email: "jack@example.com",
        postcode: "G1 2AB",
        propertyType: "residential",
        projectSize: "small",
        serviceInterest: "roof-repairs",
        preferredStyle: "repair",
        message: "Leak around chimney after heavy rain",
        source: "quote-wizard",
      }),
    });

    const response = await onRequestPost({
      request,
      env: {
        QUOTE_FORM_WEBHOOK: "https://example.com/webhook",
      },
    });

    assert.equal(response.status, 200);
    assert.equal(forwardedBody.name, "Jack Smith");
    assert.match(forwardedBody.summary, /^Info:/);
    assert.match(forwardedBody.summary, /- Name: Jack Smith/);
    assert.match(forwardedBody.summary, /- Phone: \+447700900123/);
    assert.match(forwardedBody.summary, /- Email: jack@example.com/);
    assert.match(forwardedBody.summary, /- Postcode: G1 2AB/);
    assert.match(forwardedBody.summary, /- Property Type: Residential Property/);
    assert.match(forwardedBody.summary, /- Service Required: Roof Repairs/);
    assert.match(forwardedBody.summary, /- Project Size: Small Job \/ Single Area/);
    assert.match(forwardedBody.summary, /- Preferred Style: Repair Existing Roof/);
    assert.match(forwardedBody.summary, /- Message: Leak around chimney after heavy rain/);
    assert.doesNotMatch(forwardedBody.summary, /We've let them know/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("non-quote submissions do not get a generated summary", async () => {
  let forwardedBody;
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (_url, init) => {
    forwardedBody = JSON.parse(init.body);
    return new Response("ok", { status: 200 });
  };

  try {
    const request = new Request("https://example.com/api/form-proxy?type=main", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Jack Smith",
        phone: "+447700900123",
        service: "Roof Repairs",
      }),
    });

    const response = await onRequestPost({
      request,
      env: {
        MAIN_FORM_WEBHOOK: "https://example.com/webhook",
      },
    });

    assert.equal(response.status, 200);
    assert.equal(forwardedBody.summary, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
