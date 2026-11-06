import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const alt = "About Logic & Loop: a technology services company in India.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OG() {
  return ogCard({
    kicker: "About",
    title: "Technology services, built in India.",
    footer: "Client work, plus two products of our own: Minute One and Loop OS",
  });
}
