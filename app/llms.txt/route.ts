import { groups, servicesIn } from "@/lib/services";
import { site } from "@/lib/site";

// A plain-text guide to the site for AI assistants (https://llmstxt.org).
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Logic & Loop is based in India and works with clients everywhere. Every engagement starts with a fixed scope and a fixed quote, the code and accounts are in the client's name, and a person replies to every enquiry within one working day.",
    "",
    ...groups.flatMap((g) => [
      `## ${g.name}`,
      "",
      ...servicesIn(g.id).map((s) => `- [${s.name}](${site.url}/services/${s.slug}): ${s.short} Typical timeline: ${s.timeline}.`),
      "",
    ]),
    "## Products",
    "",
    `- [Minute One](${site.url}/products/minute-one): a WhatsApp lead-response agent that replies within a minute, qualifies the lead and books the next step.`,
    `- [Loop OS](${site.url}/products/loop-os): a crew of AI agents and the harness that runs them safely on company tools and data. In early access.`,
    "",
    "## Company",
    "",
    `- [About](${site.url}/about)`,
    `- [Careers](${site.url}/careers)`,
    `- [Contact](${site.url}/contact): ${site.email}`,
    "",
    "More than 20 services, with more added over time.",
  ];
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
