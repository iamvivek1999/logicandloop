import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Search engines and AI assistants are all welcome: being cited by ChatGPT,
// Claude, Perplexity and Gemini is how many buyers now find a vendor.
// Only the API routes are kept out. Non-production hosts (*.vercel.app previews)
// are kept out of indexes by an X-Robots-Tag header in next.config.ts.
const aiCrawlers = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot",
  "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: aiCrawlers, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
