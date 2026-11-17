import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene2Products: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Strong dynamic zoom focused on the perfume flasks and pots
  const scale = interpolate(frame, [0, 120], [1.2, 1.45], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, 120], [-80, -140], {
    extrapolateRight: "clamp",
  });

  const cardEntrance = spring({
    frame: frame - 6,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0804", overflow: "hidden" }}>
      {/* Visual Background - Zoomed on perfume jars and crystal bottles */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={resolveAsset("fanta/poster.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.96) contrast(1.15)",
          }}
        />
      </AbsoluteFill>

      {/* Warm Golden Glow Focus */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(245, 158, 11, 0.25) 0%, rgba(12, 8, 4, 0.7) 70%, rgba(12, 8, 4, 0.95) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Header Pill */}
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 130 }}>
        <div
          style={{
            opacity: interpolate(cardEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(cardEntrance, [0, 1], [30, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 38px",
            background: "rgba(18, 12, 6, 0.88)",
            backdropFilter: "blur(14px)",
            borderRadius: 22,
            border: "2px solid rgba(245, 158, 11, 0.7)",
            boxShadow: "0 10px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(245, 158, 11, 0.3)",
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
              color: "#fbbf24",
              textTransform: "uppercase",
            }}
          >
            SÉQUENCE 2 • ZOOM PRODUITS
          </span>
          <h2
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 42,
              fontWeight: 800,
              color: "#ffffff",
              margin: "6px 0 0 0",
              textAlign: "center",
            }}
          >
            Flacons & Pots d'Essences Rares
          </h2>
        </div>

        {/* Floating Details tags */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 16,
            opacity: interpolate(frame, [15, 35], [0, 1]),
          }}
        >
          <div
            style={{
              padding: "10px 20px",
              borderRadius: 14,
              background: "rgba(30, 20, 10, 0.85)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              color: "#fef3c7",
              fontSize: 20,
              fontWeight: 600,
              fontFamily: "Space Grotesk, sans-serif",
            }}
          >
            🏺 Chourra Traditionnel
          </div>
          <div
            style={{
              padding: "10px 20px",
              borderRadius: 14,
              background: "rgba(30, 20, 10, 0.85)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              color: "#fef3c7",
              fontSize: 20,
              fontWeight: 600,
              fontFamily: "Space Grotesk, sans-serif",
            }}
          >
            🌸 Krouss & Huiles Pures
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

