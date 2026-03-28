/**
 * Generates unique IDs
 */
export function generateId() {
  return "id-" + Math.random().toString(36).substring(2, 9);
}