import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { industries } from "@/lib/industries";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/services", "/products/minute-one", "/products/loop-os", "/about", "/careers", "/contact", "/faq", "/hours-calculator", "/industries", "/privacy", "/terms", ...services.map((s) => `/services/${s.slug}`), ...industries.map((i) => `/industries/${i.slug}`)];
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
