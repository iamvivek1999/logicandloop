import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const alt = "Minute One by Logic & Loop: new enquiries answered on WhatsApp within a minute.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OG() {
  return ogCard({
    kicker: "Minute One",
    title: "New enquiries answered within a minute.",
    footer: "WhatsApp lead response · Qualifies leads · Books the next step",
  });
}
