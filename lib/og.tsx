import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { MARK } from "@/components/Icons";

// Brand type in the cards: Funnel Display (static .woff, which the image renderer reads).
const font = (w: number) =>
  readFileSync(path.join(process.cwd(), "node_modules/@fontsource/funnel-display/files", `funnel-display-latin-${w}-normal.woff`));

/* The social preview card every page shares. Each route's opengraph-image.tsx
   passes its own kicker, headline and footer line. */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type Card = { kicker?: string; title: string; footer: string };

export function ogCard({ kicker, title, footer }: Card) {
  // Long headlines step down so they stay on three lines or fewer.
  const fontSize = title.length > 60 ? 64 : title.length > 36 ? 76 : 84;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          background: "#FFFFFF", padding: 72, color: "#1B1E22", fontFamily: "Funnel Display",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 600, letterSpacing: -1, color: "#12363A" }}>
            <svg width="60" height="60" viewBox="0 0 100 100"><path d={MARK.l1} fill="none" stroke="#12363A" strokeWidth="14" strokeLinejoin="round" /><path d={MARK.l2} fill="none" stroke="#F0AB16" strokeWidth="14" strokeLinejoin="round" /><path d={MARK.loop} fill="none" stroke="#12363A" strokeWidth="5.5" strokeLinejoin="round" /></svg>
            Logic &amp; Loop
          </div>
          {kicker && (
            <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: "#12363A", background: "#EEF0EB", borderRadius: 999, padding: "10px 24px" }}>
              {kicker}
            </div>
          )}
        </div>
        <div style={{ display: "flex", borderLeft: "10px solid #F0AB16", paddingLeft: 40, fontSize, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3, maxWidth: 1020 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#5A655F" }}>{footer}</div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Funnel Display", data: font(600), weight: 600, style: "normal" }, { name: "Funnel Display", data: font(700), weight: 700, style: "normal" }] }
  );
}
