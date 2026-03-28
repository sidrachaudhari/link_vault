/**
 * Tracks usage metrics for links
 */
export function incrementUsage(link) {
  link.usageCount = (link.usageCount || 0) + 1;
  link.lastUsed = Date.now();
}