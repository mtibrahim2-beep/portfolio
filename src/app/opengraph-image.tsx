import { ImageResponse } from "next/og";
import { hero, person } from "@/content/profile";

export const alt = `${person.name}, finance professional in Dhaka`;
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
          justifyContent: "space-between",
          background: "#0f1b2d",
          color: "#ece8dd",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#a3adbd", fontFamily: "sans-serif" }}>{person.name}</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.05 }}>
          <span>{hero.headline[0]}</span>
          <span>{hero.headline[1]}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", height: 2, width: 220, background: "#c2a066" }} />
          <div style={{ display: "flex", height: 2, width: 220, background: "#c2a066" }} />
          <div style={{ display: "flex", marginTop: 18, fontSize: 26, color: "#a3adbd", fontFamily: "sans-serif" }}>
            Finance, WeGro Technologies, Dhaka
          </div>
        </div>
      </div>
    ),
    size,
  );
}
