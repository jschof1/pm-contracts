import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { normalizeUKPhone } from '../src/lib/phoneUtils.ts';

test('normalizes UK callback formats', () => {
  for (const phone of ['07700 900123', '+44 7700 900123', '447700900123', '7700900123']) {
    assert.equal(normalizeUKPhone(phone), '+447700900123');
  }
});

test('preserves international callback country codes', () => {
  assert.equal(normalizeUKPhone('+353 87 1234567'), '+353871234567');
  assert.equal(normalizeUKPhone('00353 87 1234567'), '+353871234567');
  assert.equal(normalizeUKPhone('+1 (202) 555-0123'), '+12025550123');
  assert.equal(normalizeUKPhone('0044 7700 900123'), '+447700900123');
});

test('keeps empty callback inputs empty', () => {
  assert.equal(normalizeUKPhone(''), '');
  assert.equal(normalizeUKPhone('   '), '');
});


test('normalizes UK numbers printed with an optional (0) trunk', () => {
  assert.equal(normalizeUKPhone('+44 (0)20 7946 0123'), '+442079460123');
  assert.equal(normalizeUKPhone('0044 (0)7700 900123'), '+447700900123');
  assert.equal(normalizeUKPhone('44 (0)7700 900123'), '+447700900123');
});

test('priority quote page submits the same normalized callback format as the other forms', () => {
  const page = readFileSync(new URL('../src/pages/DiscountPage.tsx', import.meta.url), 'utf8');
  assert.match(page, /phone:\s*normalizeUKPhone\(formData\.phone\.trim\(\)\)/);
});
