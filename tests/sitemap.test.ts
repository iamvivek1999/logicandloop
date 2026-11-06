import { readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

const appDir = join(process.cwd(), "app");

// Every app/**/page.tsx route, e.g. "" for the homepage and "/services/[slug]".
function appRoutes(dir = appDir): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === "api" ? [] : appRoutes(full);
    if (entry.name !== "page.tsx") return [];
    const parts = relative(appDir, dir).split(sep).filter(Boolean);
    return [parts.length ? `/${parts.join("/")}` : ""];
  });
}

describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);

  it("lists every page in the app", () => {
    const expected = appRoutes().flatMap((r) =>
      r === "/services/[slug]" ? services.map((s) => `/services/${s.slug}`) : [r]
    );
    // A new dynamic route needs its own expansion above.
    expect(expected.filter((r) => r.includes("["))).toEqual([]);
    expect([...urls].sort()).toEqual(expected.map((r) => `${site.url}${r}`).sort());
  });

  it("has no duplicates and only URLs on this site", () => {
    expect(new Set(urls).size).toBe(urls.length);
    for (const url of urls) expect(url.startsWith(site.url)).toBe(true);
  });

  it("ranks the homepage first", () => {
    expect(entries.find((e) => e.url === site.url)?.priority).toBe(1);
  });
});
