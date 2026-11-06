import { ogCard, ogContentType, ogSize } from "@/lib/og";
import { groupName, serviceBySlug } from "@/lib/services";

export const size = ogSize;
export const contentType = ogContentType;

// One card per service, with the service name in its alt text.
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const s = serviceBySlug(params.slug);
  return [{ id: "card", size: ogSize, contentType: ogContentType, alt: s ? `${s.name} by Logic & Loop: ${s.short}` : "Logic & Loop" }];
}

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const s = serviceBySlug((await params).slug);
  if (!s) return ogCard({ title: "We write the logic. Your business runs the loop.", footer: "Web apps · Mobile apps · AI agents · Automations" });
  return ogCard({ kicker: groupName(s.group), title: s.name, footer: s.short });
}
