import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const resendOk = () => vi.fn<(url: string, init: RequestInit) => Promise<Response>>(async () => Response.json({ id: "email_1" }));
const sentBody = (spy: ReturnType<typeof resendOk>) => JSON.parse(spy.mock.calls[0][1].body as string);

// Each test loads the route fresh, so its rate limiter starts empty.
async function loadRoute() {
  vi.resetModules();
  return (await import("@/app/api/contact/route")).POST;
}

const post = (body: unknown, ip = "203.0.113.7") =>
  new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

const enquiry = { name: "Asha Rao", email: "asha@example.com", topic: "Mobile apps", message: "We need an app for our clinic." };

beforeEach(() => {
  for (const k of ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "KV_REST_API_URL", "KV_REST_API_TOKEN", "CONTACT_FROM_EMAIL"]) vi.stubEnv(k, "");
  vi.stubEnv("RESEND_API_KEY", "re_test");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/contact", () => {
  it("sends a valid enquiry through Resend with reply-to set", async () => {
    const fetchSpy = resendOk();
    vi.stubGlobal("fetch", fetchSpy);
    const res = await (await loadRoute())(post(enquiry));
    expect(res.status).toBe(200);
    expect(fetchSpy.mock.calls[0][0]).toBe("https://api.resend.com/emails");
    const sent = sentBody(fetchSpy);
    expect(sent.reply_to).toBe("asha@example.com");
    expect(sent.subject).toBe("New enquiry: Mobile apps from Asha Rao");
  });

  it("escapes HTML in the email body", async () => {
    const fetchSpy = resendOk();
    vi.stubGlobal("fetch", fetchSpy);
    await (await loadRoute())(post({ ...enquiry, name: "<b>Asha</b>", message: "<script>alert(1)</script> hello" }));
    const { html } = sentBody(fetchSpy);
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("uses CONTACT_FROM_EMAIL as the sender when set", async () => {
    vi.stubEnv("CONTACT_FROM_EMAIL", "Logic & Loop <hello@example.com>");
    const fetchSpy = resendOk();
    vi.stubGlobal("fetch", fetchSpy);
    await (await loadRoute())(post(enquiry));
    expect(sentBody(fetchSpy).from).toBe("Logic & Loop <hello@example.com>");
  });

  it("returns 503 when email delivery isn't configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    expect((await (await loadRoute())(post(enquiry))).status).toBe(503);
  });

  it("rejects bad input", async () => {
    vi.stubGlobal("fetch", resendOk());
    const POST = await loadRoute();
    expect((await POST(post("not json"))).status).toBe(400);
    expect((await POST(post({ ...enquiry, _honey: "bot" }))).status).toBe(400);
    const res = await POST(post({ ...enquiry, email: "nope" }));
    expect(res.status).toBe(422);
    expect((await res.json()).errors.email).toBeDefined();
  });

  it("limits each visitor to five enquiries", async () => {
    vi.stubGlobal("fetch", resendOk());
    const POST = await loadRoute();
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) statuses.push((await POST(post(enquiry))).status);
    expect(statuses).toEqual([200, 200, 200, 200, 200, 429]);
    expect((await POST(post(enquiry, "198.51.100.1"))).status).toBe(200);
  });

  it("returns 502 when Resend refuses the email", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("nope", { status: 403 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect((await (await loadRoute())(post(enquiry))).status).toBe(502);
  });
});
