/**
 * Normalizes UK local numbers while preserving an explicit international code.
 * Handles various input formats:
 * - Already has +: preserves the country code
 * - Starts with 00: converts the international prefix to +
 * - Starts with 44: adds + prefix
 * - Starts with 0: removes 0 and adds +44
 * - Other formats: prepends +44
 */
export function normalizeUKPhone(phone: string): string {
  // Remove all whitespace and non-digit characters except +
  // UK numbers are often printed as +44 (0)20...; the (0) is not dialled internationally.
  // Strip that explicit optional trunk before removing other formatting.
  const withoutOptionalUkTrunk = phone.replace(/^(\s*(?:\+44|0044|44))[\s.-]*\(0\)/, '$1');
  const cleaned = withoutOptionalUkTrunk.replace(/[^\d+]/g, '');
  
  // If empty, return empty
  if (!cleaned) return '';
  
  // An explicit international code must never be prefixed with +44.
  if (cleaned.startsWith('+')) {
    return cleaned;
  }

  if (cleaned.startsWith('00')) {
    return '+' + cleaned.slice(2);
  }
  
  // Starts with 44 (without +)
  if (cleaned.startsWith('44') && cleaned.length > 2) {
    return '+' + cleaned;
  }
  
  // Starts with 0 (UK local format)
  if (cleaned.startsWith('0')) {
    return '+44' + cleaned.slice(1);
  }
  
  // Any other format - prepend +44
  return '+44' + cleaned;
}
