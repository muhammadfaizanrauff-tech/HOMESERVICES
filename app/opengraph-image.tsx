import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#1B3A5B",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ color: "#E08A2B", fontSize: 22, fontWeight: 700, letterSpacing: 2, marginBottom: 24 }}>
          HOME SERVICES · BY CHRIS ALCHEMY CONSULTING
        </div>
        <div style={{ color: "white", fontSize: 60, fontWeight: 800, lineHeight: 1.15, maxWidth: 900 }}>
          Stop losing jobs to missed calls.
        </div>
        <div style={{ color: "#B9C4CF", fontSize: 28, marginTop: 28, maxWidth: 820 }}>
          AI follow-up, booking, and review automation for home services companies.
        </div>
      </div>
    ),
    size,
  );
}
