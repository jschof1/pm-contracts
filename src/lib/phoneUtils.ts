/**
 * Normalizes a UK phone number to always include the +44 country code.
 * Handles various input formats:
 * - Already has +44: returns as-is
 * - Starts with 44: adds + prefix
 * - Starts with 0: removes 0 and adds +44
 * - Other formats: prepends +44
 */
export function normalizeUKPhone(phone: string): string {
  // Remove all whitespace and non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // If empty, return empty
  if (!cleaned) return '';
  
  // Already has +44
  if (cleaned.startsWith('+44')) {
    return cleaned;
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
