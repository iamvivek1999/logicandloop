import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const alt = "Careers at Logic & Loop: build the systems businesses run on.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OG() {
  return ogCard({
    kicker: "Careers",
    title: "Build the systems businesses run on.",
    footer: "Engineering, AI and data, design, delivery and talent assessment",
  });
}
