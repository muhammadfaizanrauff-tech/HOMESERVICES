import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B3A5B",
          borderRadius: 6,
        }}
      >
        <span style={{ color: "#E08A2B", fontSize: 18, fontWeight: 800, fontFamily: "sans-serif" }}>
          HS
        </span>
      </div>
    ),
    size,
  );
}
