import assert from 'node:assert/strict';
import test from 'node:test';
import { onRequestPost } from '../functions/api/form-proxy.js';

const keys = {
  main: 'MAIN_FORM_WEBHOOK', quote: 'QUOTE_FORM_WEBHOOK',
  discount: 'DISCOUNT_FORM_WEBHOOK', 'negative-review': 'NEGATIVE_REVIEW_WEBHOOK'
};
async function run(type, payload, contentType = 'application/json') {
  let posts = 0, saved = 0, forwarded = null;
  const oldFetch = globalThis.fetch;
  globalThis.fetch = async (_, init) => {
    posts++; forwarded = JSON.parse(init.body);
    return new Response('ok', {status: 200});
  };
  try {
    const request = new Request(`https://example.com/api/form-proxy?type=${type}`, {
      method: 'POST', headers: {'Content-Type': contentType},
      body: typeof payload === 'string' ? payload : JSON.stringify(payload)
    });
    const response = await onRequestPost({request, env: {
      [keys[type]]: 'https://example.com/mock',
      LEADS_KV: {async get(){return '[]';}, async put(){saved++;}}
    }});
    return {status: response.status, body: await response.json(), posts, saved, forwarded};
  } finally {globalThis.fetch = oldFetch;}
}

for (const type of ['main', 'quote', 'discount']) {
  test(`${type}: accepts valid name and UK callback number`, async () => {
    const r = await run(type, {name:'A Customer', phone:'07700 900123', service:'Roof Repairs'});
    assert.equal(r.status, 200); assert.equal(r.posts, 1); assert.equal(r.saved, 1);
    assert.equal(r.forwarded.phone, '07700 900123');
  });
  test(`${type}: rejects blank name before posting or saving`, async () => {
    const r = await run(type, {name:'  ', phone:'+447700900123'});
    assert.equal(r.status, 400); assert.equal(r.posts, 0); assert.equal(r.saved, 0);
  });
  test(`${type}: rejects missing/invalid callback number before posting or saving`, async () => {
    for (const phone of ['', '123', 'CALL ME', undefined]) {
      const r = await run(type, {name:'A Customer', phone});
      assert.equal(r.status, 400); assert.equal(r.posts, 0); assert.equal(r.saved, 0);
    }
  });
}
test('quote: preserves formatted summary after valid submission', async () => {
  const r = await run('quote', {name:'A Customer', phone:'+447700900123', serviceInterest:'roof-repairs'});
  assert.match(r.forwarded.summary, /Service Required: Roof Repairs/);
});
test('feedback: phone remains optional', async () => {
  const r = await run('negative-review', {name:'Concerned customer', email:'example@example.com', feedback:'Complaint', rating:2});
  assert.equal(r.status, 200); assert.equal(r.posts, 1);
});
test('rejects malformed JSON and non-object callback payload', async () => {
  for (const payload of ['{ bad json', 'null', '[1,2]', '"hello"']) {
    const r = await run('main', payload);
    assert.equal(r.status, 400); assert.equal(r.posts, 0); assert.equal(r.saved, 0);
  }
});

test('permits ordinary UK and international number formatting without rewriting fields', async () => {
  for (const phone of ['020 7946 0123', '+44 (0)20 7946 0123', '0044 7700 900123', '+353 87 1234567', '+1 (202) 555-0123']) {
    const r = await run('main', {name:'A Customer', phone});
    assert.equal(r.status, 200); assert.equal(r.forwarded.phone, phone);
  }
});
test('rejects misplaced plus signs and structured contact fields', async () => {
  for (const phone of ['++447700900123', '07700+900123', {number:'07700900123'}, 7700900123]) {
    const r = await run('quote', {name:'A Customer', phone});
    assert.equal(r.status, 400); assert.equal(r.posts, 0); assert.equal(r.saved, 0);
  }
});
test('URL-encoded submissions retain the existing supported route', async () => {
  const r = await run('main', 'name=A+Customer&phone=%2B447700900123&service=Roof+Repairs', 'application/x-www-form-urlencoded');
  assert.equal(r.status, 200); assert.equal(r.forwarded.service, 'Roof Repairs');
});
test('malformed feedback objects are rejected without requiring a feedback phone', async () => {
  for (const value of ['null', '[]', '"not-an-object"']) {
    const r = await run('negative-review', value);
    assert.equal(r.status, 400); assert.equal(r.posts, 0);
  }
});
