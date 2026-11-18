import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene3KeyVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "présentation publicitaire du produit avec un éclairage spectaculaire."
  // Dynamic slow zoom and lighting pulse
  const scale = interpolate(frame, [0, 150], [1.02, 1.15], {
    extrapolateRight: "clamp",
  });
  const glowPulse = Math.sin(frame / 8) * 0.15 + 0.85;

  const badgeSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0a09", overflow: "hidden" }}>
      {/* Background Image: KeyVisual */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={resolveAsset("ianiger/keyvisual.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.95) contrast(1.15)",
          }}
        />
      </AbsoluteFill>

      {/* Dramatic Golden Flare overlay */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(245, 158, 11, ${0.25 * glowPulse}) 0%, rgba(12, 10, 9, 0.7) 65%, rgba(12, 10, 9, 0.95) 100%)`,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill style={{ alignItems: "center", paddingTop: 140 }}>
        {/* Style Tag Card: 3 — /KeyVisual */}
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
              "0 14px 40px rgba(0, 0, 0, 0.8), 0 0 35px rgba(245, 158, 11, 0.4)",
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
            3 — /KeyVisual
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
            L'image principale de votre campagne
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
