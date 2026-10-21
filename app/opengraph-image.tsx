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
          background: "#EEF0EB", padding: 72, color: "#1B1E22",
                  }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 700 }}>
          <svg width="56" height="56" viewBox="0 0 40 40"><rect width="40" height="40" rx="10" fill="#12363A" /><circle cx="15.5" cy="20" r="7.8" fill="none" stroke="#EEF0EB" strokeWidth="3.2" /><circle cx="24.5" cy="20" r="7.8" fill="none" stroke="#F0AB16" strokeWidth="3.2" /></svg>
          Logic &amp; Loop
        </div>
        <div style={{ borderLeft: "10px solid #F0AB16", paddingLeft: 40, fontSize: 84, fontWeight: 800, lineHeight: 1, letterSpacing: -3, maxWidth: 980 }}>
          We write the logic. Your business runs the loop.
        </div>
        <div style={{ fontSize: 30, color: "#5A655F" }}>Web apps · Mobile apps · AI agents · Automations</div>
      </div>
    ),
    size
  );
}
