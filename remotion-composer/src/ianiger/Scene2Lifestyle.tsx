import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene2Lifestyle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "un produit posé dans un environnement quotidien élégant."
  // Smooth slow pan and zoom
  const scale = interpolate(frame, [0, 150], [1.05, 1.16], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, 150], [0, -20], {
    extrapolateRight: "clamp",
  });

  const badgeSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0a09", overflow: "hidden" }}>
      {/* Background Image: Lifestyle */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={resolveAsset("ianiger/lifestyle.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.95) contrast(1.12)",
          }}
        />
      </AbsoluteFill>

      {/* Atmospheric Vignette */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(12, 10, 9, 0.85) 0%, rgba(12, 10, 9, 0.1) 35%, rgba(12, 10, 9, 0.25) 65%, rgba(12, 10, 9, 0.95) 100%)",
        }}
      />

      <AbsoluteFill style={{ alignItems: "center", paddingTop: 140 }}>
        {/* Style Tag Card: 2 — /Lifestyle */}
        <div
          style={{
            opacity: interpolate(badgeSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(badgeSpring, [0, 1], [30, 0])}px) scale(${interpolate(badgeSpring, [0, 1], [0.92, 1])})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 44px",
            background: "rgba(24, 18, 12, 0.92)",
            backdropFilter: "blur(16px)",
            borderRadius: 24,
            border: "2px solid rgba(245, 158, 11, 0.8)",
            boxShadow:
              "0 14px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.35)",
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, monospace, sans-serif",
              fontSize: 64,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: 2,
              margin: 0,
              textShadow: "0 4px 20px rgba(245, 158, 11, 0.5)",
            }}
          >
            2 — /Lifestyle
          </span>
          <div
            style={{
              width: 140,
              height: 3,
              background:
                "linear-gradient(90deg, transparent, #fbbf24, transparent)",
              margin: "10px 0",
            }}
          />
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 26,
              fontWeight: 700,
              color: "#fde68a",
              textAlign: "center",
            }}
          >
            Dans une situation de la vie quotidienne
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
