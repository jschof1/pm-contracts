import assert from 'node:assert/strict';
import test from 'node:test';
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
