import { describe, expect, it } from "vitest";
import { services } from "@/lib/services";
import { searchTitle, searchTitles } from "@/lib/search-titles";

describe("search titles", () => {
  it("has a title for every service and none for a missing one", () => {
    const slugs = services.map((s) => s.slug).sort();
    expect(Object.keys(searchTitles).sort()).toEqual(slugs);
  });

  it("keeps each title short enough to show in full with the site name", () => {
    for (const s of services) {
      expect(searchTitle(s).length, s.slug).toBeLessThanOrEqual(52);
    }
  });

  it("uses no em dash", () => {
    for (const t of Object.values(searchTitles)) expect(t).not.toContain("\u2014");
  });
});
