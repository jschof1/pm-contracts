import assert from "node:assert/strict";
import test from "node:test";

import { onRequestGet, onRequestPost } from "../functions/api/lead-submissions.js";

const makeKv = () => {
  let store = new Map();
  return {
    async get(key) {
      return store.get(key) ?? null;
    },
    async put(key, value) {
      store.set(key, value);
    },
    _clear() {
      store = new Map();
    },
  };
};

test("POST rejects missing or wrong ingest secret", async () => {
  const kv = makeKv();
  const request = new Request("https://example.com/api/lead-submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Leads-Ingest-Secret": "wrong" },
    body: JSON.stringify({ name: "Test" }),
  });
  const res = await onRequestPost({
    request,
    env: { LEADS_INGEST_SECRET: "secret", LEADS_KV: kv },
  });
  assert.equal(res.status, 401);
});

test("POST stores payload and forwards when GHL_LEAD_WEBHOOK_FORWARD is set", async () => {
  const kv = makeKv();
  let forwardedUrl;
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url, init) => {
    forwardedUrl = url;
    assert.equal(init.method, "POST");
    assert.equal(JSON.parse(init.body).name, "Ada");
    return new Response("ok", { status: 200 });
  };

  try {
    const request = new Request("https://example.com/api/lead-submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Leads-Ingest-Secret": "secret" },
      body: JSON.stringify({ name: "Ada", email: "ada@example.com" }),
    });
    const res = await onRequestPost({
      request,
      env: {
        LEADS_INGEST_SECRET: "secret",
        LEADS_KV: kv,
        GHL_LEAD_WEBHOOK_FORWARD: "https://hooks.example.com/forward",
      },
    });
    assert.equal(res.status, 200);
    assert.equal(forwardedUrl, "https://hooks.example.com/forward");

    const getRes = await onRequestGet({
      request: new Request("https://example.com/api/lead-submissions", {
        headers: { Authorization: "Bearer pass" },
      }),
      env: { SECRET_LEADS_PAGE_PASSWORD: "pass", LEADS_KV: kv },
    });
    assert.equal(getRes.status, 200);
    const body = await getRes.json();
    assert.equal(body.submissions.length, 1);
    assert.equal(body.submissions[0].payload.name, "Ada");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GET rejects wrong page password", async () => {
  const kv = makeKv();
  const res = await onRequestGet({
    request: new Request("https://example.com/api/lead-submissions", {
      headers: { Authorization: "Bearer wrong" },
    }),
    env: { SECRET_LEADS_PAGE_PASSWORD: "right", LEADS_KV: kv },
  });
  assert.equal(res.status, 401);
});
