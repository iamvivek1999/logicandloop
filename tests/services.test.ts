import { describe, expect, it } from "vitest";
import { groupName, groups, serviceBySlug, services, servicesIn } from "@/lib/services";

describe("service data", () => {
  it("has unique, URL-safe slugs", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("puts every service in a known group, and every group has services", () => {
    const ids = groups.map((g) => g.id);
    for (const s of services) expect(ids).toContain(s.group);
    for (const g of groups) expect(servicesIn(g.id).length).toBeGreaterThan(0);
    expect(groups.reduce((n, g) => n + servicesIn(g.id).length, 0)).toBe(services.length);
  });

  it("only relates services that exist, never to themselves", () => {
    for (const s of services) {
      for (const r of s.related) {
        expect(serviceBySlug(r), `${s.slug} relates to missing "${r}"`).toBeDefined();
        expect(r).not.toBe(s.slug);
      }
    }
  });

  it("fills in every field a service page renders", () => {
    for (const s of services) {
      for (const field of [s.name, s.short, s.intro, s.timeline, s.engagement]) expect(field.trim()).not.toBe("");
      expect(s.deliverables.length).toBeGreaterThan(0);
      expect(s.stack.length).toBeGreaterThan(0);
      for (const f of s.faqs) {
        expect(f.q.trim()).not.toBe("");
        expect(f.a.trim()).not.toBe("");
      }
    }
  });

  it("looks up services and group names", () => {
    expect(serviceBySlug(services[0].slug)).toBe(services[0]);
    expect(serviceBySlug("no-such-service")).toBeUndefined();
    for (const g of groups) expect(groupName(g.id)).toBe(g.name);
  });
});
