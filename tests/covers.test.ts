import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { covers } from "@/components/Photo";
import { services } from "@/lib/services";
import { industries } from "@/lib/industries";

const file = (id: string) => join(process.cwd(), "public", "images", "gen", `${id}.webp`);

describe("generated covers", () => {
  it("has a file in public/images/gen for every cover", () => {
    expect(Object.keys(covers).filter((id) => !existsSync(file(id)))).toEqual([]);
  });

  it("covers every service and industry page", () => {
    const pages = [...services.map((s) => s.slug), ...industries.map((i) => i.slug)];
    expect(pages.filter((slug) => !(slug in covers))).toEqual([]);
  });
});
