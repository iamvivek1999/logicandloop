import { ogCard, ogContentType, ogSize } from "@/lib/og";
import { groups } from "@/lib/services";

export const alt = "Logic & Loop services: 20+ services, one accountable team.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OG() {
  return ogCard({
    kicker: "Services",
    title: "20+ services, one accountable team.",
    footer: groups.map((g) => g.name).join(" · "),
  });
}
