import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const alt = "Loop OS by Logic & Loop: your own crew of AI agents, licensed.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OG() {
  return ogCard({
    kicker: "Loop OS",
    title: "Your own crew of AI agents, licensed.",
    footer: "AI agents · Encoded workflows · Your cloud or ours",
  });
}
