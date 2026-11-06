import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const alt = "Contact Logic & Loop: tell us what you want to build.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OG() {
  return ogCard({
    kicker: "Contact",
    title: "Tell us what you want to build.",
    footer: "We reply within one working day · WhatsApp, email or a call",
  });
}
