const rateLimitMap = new Map();

export function rateLimit(ip, { windowMs = 60000, maxRequests = 10 } = {}) {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || [];

  // Filter out expired timestamps
  const recent = record.filter((ts) => now - ts < windowMs);

  if (recent.length >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: Math.ceil((recent[0] + windowMs - now) / 1000),
    };
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);

  // Periodic cleanup to prevent memory leaks
  if (rateLimitMap.size > 10000) {
    for (const [key, timestamps] of rateLimitMap.entries()) {
      if (timestamps.every((ts) => now - ts > windowMs)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return { allowed: true, remaining: maxRequests - recent.length };
}
