import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene1Brand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth Ken Burns push
  const scale = interpolate(frame, [0, 120], [1.0, 1.08], {
    extrapolateRight: "clamp",
  });

  const logoEntrance = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const subEntrance = spring({
    frame: frame - 20,
    fps,
    config: { damping: 16, stiffness: 80 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0804", overflow: "hidden" }}>
      {/* Visual Background - Poster with slow zoom */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center top",
        }}
      >
        <Img
          src={resolveAsset("fanta/poster.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.92) contrast(1.1)",
          }}
        />
      </AbsoluteFill>

      {/* Luxury Golden Atmospheric Gradient */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(12, 8, 4, 0.88) 0%, rgba(12, 8, 4, 0.25) 30%, rgba(12, 8, 4, 0.35) 60%, rgba(12, 8, 4, 0.92) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Top Banner: Sequence 1 Header */}
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 140 }}>
        <div
          style={{
            opacity: interpolate(logoEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(logoEntrance, [0, 1], [30, 0])}px) scale(${interpolate(logoEntrance, [0, 1], [0.92, 1])})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 44px",
            background: "rgba(18, 12, 6, 0.85)",
            backdropFilter: "blur(12px)",
            borderRadius: 24,
            border: "2px solid rgba(245, 158, 11, 0.65)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(245, 158, 11, 0.25)",
            maxWidth: "88%",
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 6,
              color: "#fbbf24",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            PARFUMERIE NATURELLE
          </span>
          <h1
            style={{
              fontFamily: "Space Grotesk, serif, sans-serif",
              fontSize: 78,
              fontWeight: 900,
              letterSpacing: 4,
              color: "#ffffff",
              margin: 0,
              textShadow: "0 4px 20px rgba(245, 158, 11, 0.5)",
            }}
          >
            FANT'A
          </h1>
          <div
            style={{
              width: 140,
              height: 3,
              background: "linear-gradient(90deg, transparent, #fbbf24, transparent)",
              margin: "12px 0",
            }}
          />
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 28,
              fontStyle: "italic",
              color: "#fef3c7",
              letterSpacing: 1.5,
            }}
          >
            D'ORIGINE DIFFA (NIGER)
          </span>
        </div>

        {/* Feature badge */}
        <div
          style={{
            marginTop: 40,
            opacity: interpolate(subEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(subEntrance, [0, 1], [20, 0])}px)`,
            padding: "12px 28px",
            borderRadius: 999,
            background: "linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.15) 100%)",
            border: "1px solid rgba(245, 158, 11, 0.5)",
            color: "#fde68a",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontFamily: "Space Grotesk, sans-serif",
          }}
        >
          ✨ Séquence 1 : Apparition de la Marque
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

