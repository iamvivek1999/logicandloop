import { ImageResponse } from "next/og";

export const alt = "Logic & Loop: we write the logic, your business runs the loop.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          background: "#EEF1F5", padding: 72, color: "#0F1A2E",
          backgroundImage: "linear-gradient(#D3DAE4 1px, transparent 1px), linear-gradient(90deg, #D3DAE4 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 700 }}>
          <svg width="56" height="56" viewBox="0 0 40 40"><circle cx="15" cy="20" r="9" fill="none" stroke="#0F1A2E" strokeWidth="3.4" /><circle cx="25" cy="20" r="9" fill="none" stroke="#2340FF" strokeWidth="3.4" /></svg>
          Logic &amp; Loop
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1, letterSpacing: -3, maxWidth: 980 }}>
          We write the logic. Your business runs the loop.
        </div>
        <div style={{ fontSize: 30, color: "#56617A" }}>Web apps · Mobile apps · AI agents · Automations</div>
      </div>
    ),
    size
  );
}
