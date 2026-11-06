import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const alt = "Logic & Loop: we write the logic, your business runs the loop.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OG() {
  return ogCard({
    title: "We write the logic. Your business runs the loop.",
    footer: "Software engineering · AI · Automation · Talent assessment",
  });
}
