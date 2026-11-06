/* Fixed-window rate limiter.

   In production it counts in Upstash Redis, so the limit holds across every
   serverless instance and survives cold starts. Set either pair in Vercel:
     UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN   (Upstash integration)
     KV_REST_API_URL + KV_REST_API_TOKEN                 (Vercel KV / Upstash via Vercel)
   Without them (local dev, previews) it falls back to an in-memory count. */

type Options = { windowMs: number; max: number; prefix?: string; now?: () => number };

export type RateLimiter = (key: string) => Promise<boolean>;

const redisConfig = () => {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
};

export function createRateLimiter({ windowMs, max, prefix = "rl", now = Date.now }: Options): RateLimiter {
  const memory = memoryLimiter({ windowMs, max, now });

  return async (key) => {
    const redis = redisConfig();
    if (!redis) return memory(key);
    try {
      // INCR counts this request; PEXPIRE ... NX starts the window on the first one only.
      const id = `${prefix}:${key}`;
      const res = await fetch(`${redis.url}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${redis.token}`, "Content-Type": "application/json" },
        body: JSON.stringify([["INCR", id], ["PEXPIRE", id, String(windowMs), "NX"]]),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Redis responded ${res.status}`);
      const [incr] = await res.json() as { result?: number; error?: string }[];
      if (typeof incr?.result !== "number") throw new Error(incr?.error || "Unexpected Redis reply");
      return incr.result <= max;
    } catch (error) {
      // Don't turn away real enquiries because the counter is down.
      console.error("Rate limit store unavailable, using in-memory limit", error);
      return memory(key);
    }
  };
}

const SWEEP_AT = 1000;

export function memoryLimiter({ windowMs, max, now = Date.now }: Omit<Options, "prefix">) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return (key: string) => {
    const t = now();
    if (hits.size >= SWEEP_AT) {
      for (const [k, v] of hits) if (v.resetAt <= t) hits.delete(k);
    }
    const current = hits.get(key);
    if (!current || current.resetAt <= t) {
      hits.set(key, { count: 1, resetAt: t + windowMs });
      return true;
    }
    if (current.count >= max) return false;
    current.count += 1;
    return true;
  };
}
