import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createRateLimiter, memoryLimiter } from "@/lib/rate-limit";

beforeEach(() => {
  for (const k of ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "KV_REST_API_URL", "KV_REST_API_TOKEN"]) vi.stubEnv(k, "");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("memoryLimiter", () => {
  it("allows up to the limit, then blocks until the window resets", () => {
    let t = 0;
    const allow = memoryLimiter({ windowMs: 1000, max: 2, now: () => t });
    expect([allow("a"), allow("a"), allow("a")]).toEqual([true, true, false]);
    expect(allow("b")).toBe(true);
    t = 1000;
    expect(allow("a")).toBe(true);
  });

  it("evicts expired visitors once it holds many", () => {
    let t = 0;
    const allow = memoryLimiter({ windowMs: 10, max: 1, now: () => t });
    for (let i = 0; i < 1500; i++) allow(`ip-${i}`);
    t = 20;
    expect(allow("ip-0")).toBe(true);
    expect(allow("ip-0")).toBe(false);
  });
});

describe("createRateLimiter", () => {
  it("uses memory when no Redis is configured", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const allow = createRateLimiter({ windowMs: 1000, max: 1 });
    expect(await allow("a")).toBe(true);
    expect(await allow("a")).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("counts in Redis when it is configured", async () => {
    vi.stubEnv("KV_REST_API_URL", "https://kv.example.com/");
    vi.stubEnv("KV_REST_API_TOKEN", "secret");
    let count = 0;
    const fetchSpy = vi.fn<(url: string, init: RequestInit) => Promise<Response>>(async () => Response.json([{ result: ++count }, { result: 1 }]));
    vi.stubGlobal("fetch", fetchSpy);

    const allow = createRateLimiter({ windowMs: 60000, max: 2, prefix: "contact" });
    expect([await allow("1.2.3.4"), await allow("1.2.3.4"), await allow("1.2.3.4")]).toEqual([true, true, false]);

    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("https://kv.example.com/pipeline");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer secret");
    expect(JSON.parse(init.body as string)).toEqual([["INCR", "contact:1.2.3.4"], ["PEXPIRE", "contact:1.2.3.4", "60000", "NX"]]);
  });

  it("falls back to memory when Redis fails", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example.com");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "secret");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("down", { status: 500 })));
    vi.spyOn(console, "error").mockImplementation(() => {});

    const allow = createRateLimiter({ windowMs: 1000, max: 1 });
    expect(await allow("a")).toBe(true);
    expect(await allow("a")).toBe(false);
  });
});
