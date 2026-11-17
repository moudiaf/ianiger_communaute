import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene4Slogan: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = interpolate(frame, [0, 120], [1.05, 1.15], {
    extrapolateRight: "clamp",
  });

  const ribbonSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  const textSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  // Gentle gold shimmer pulse
  const shimmer = Math.sin(frame / 10) * 0.15 + 0.85;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0804", overflow: "hidden" }}>
      {/* Background Poster */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={resolveAsset("fanta/poster.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.7) contrast(1.15)",
          }}
        />
      </AbsoluteFill>

      {/* Dramatic Golden Radial Glow */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(245, 158, 11, 0.4) 0%, rgba(12, 8, 4, 0.85) 65%, rgba(12, 8, 4, 0.98) 100%)",
        }}
      />

      {/* Center Slogan Showcase */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        {/* Sequence tag */}
        <div
          style={{
            marginBottom: 36,
            padding: "10px 26px",
            borderRadius: 999,
            background: "rgba(22, 15, 8, 0.85)",
            border: "1px solid rgba(245, 158, 11, 0.5)",
            color: "#fbbf24",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontFamily: "Space Grotesk, sans-serif",
          }}
        >
          SÉQUENCE 4 • LE SLOGAN
        </div>

        {/* Master Gold Ribbon Box */}
        <div
          style={{
            opacity: interpolate(ribbonSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(ribbonSpring, [0, 1], [0.85, 1])}) translateY(${interpolate(ribbonSpring, [0, 1], [30, 0])}px)`,
            width: "100%",
            maxWidth: 880,
            padding: "48px 36px",
            background:
              "linear-gradient(135deg, rgba(245, 158, 11, 0.95) 0%, rgba(217, 119, 6, 0.95) 50%, rgba(180, 83, 9, 0.95) 100%)",
            borderRadius: 28,
            boxShadow: `0 16px 50px rgba(0, 0, 0, 0.7), 0 0 ${40 * shimmer}px rgba(245, 158, 11, ${0.5 * shimmer})`,
            border: "3px solid #fef3c7",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 40,
              marginBottom: 12,
            }}
          >
            ⚜️
          </div>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 4,
              color: "#3b1e05",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            PARFUMERIE FANT'A
          </span>
          <h2
            style={{
              opacity: interpolate(textSpring, [0, 1], [0, 1]),
              transform: `scale(${interpolate(textSpring, [0, 1], [0.92, 1])})`,
              fontFamily: "Space Grotesk, serif, sans-serif",
              fontSize: 48,
              fontWeight: 900,
              lineHeight: 1.25,
              color: "#ffffff",
              margin: 0,
              textShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
              letterSpacing: 2,
            }}
          >
            « L'ESSENCE DE LA NATURE,
            <br />
            L'ÉLÉGANCE EN PLUS. »
          </h2>
        </div>

        <span
          style={{
            marginTop: 36,
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: 24,
            color: "#fef3c7",
            fontStyle: "italic",
            letterSpacing: 1.5,
          }}
        >
          L'alliance du raffinement et de l'authenticité
        </span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

