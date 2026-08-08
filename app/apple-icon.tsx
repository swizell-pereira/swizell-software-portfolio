import { ImageResponse } from "next/og";
import { PROFILE_INITIALS } from "@/lib/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #2563eb 0%, #09090b 72%)",
          borderRadius: 36,
          color: "white",
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: "-0.03em",
        }}
      >
        {PROFILE_INITIALS}
      </div>
    ),
    { ...size }
  );
}
