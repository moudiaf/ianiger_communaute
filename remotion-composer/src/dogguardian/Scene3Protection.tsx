import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene3Protection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle pan and Ken Burns scale
  const scale = interpolate(frame, [0, 285], [1.02, 1.11], {
    extrapolateRight: "clamp",
  });
  const translateX = interpolate(frame, [0, 285], [-10, 15], {
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Protective gentle golden aura pulsation
  const auraPulse = (Math.sin((frame / 25) * Math.PI * 2) + 1) / 2;
  const auraOpacity = 0.2 + auraPulse * 0.18;

  const badgeEntrance = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0a09", overflow: "hidden" }}>
      {/* Background Image with Pan & Scale */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translateX(${translateX}px)`,
          transformOrigin: "center center",
          opacity,
        }}
      >
        <Img
          src={resolveAsset("dogguardian/scene3.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.92) contrast(1.1) saturate(1.12)",
          }}
        />
      </AbsoluteFill>

      {/* Protective Golden Shield Aura */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 55%, rgba(251, 191, 36, ${auraOpacity}) 0%, rgba(245, 158, 11, 0.1) 45%, transparent 70%)`,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      {/* Cinematic Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(12, 10, 9, 0.8) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Chapter Badge */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 60,
          opacity: badgeEntrance,
          transform: `translateY(${interpolate(badgeEntrance, [0, 1], [30, 0])}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(18, 14, 12, 0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(251, 191, 36, 0.4)",
            borderRadius: 30,
            padding: "8px 22px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#f59e0b",
              boxShadow: "0 0 12px #f59e0b",
            }}
          />
          <span
            style={{
              color: "#fbbf24",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            ACTE 3 · LE BOUCLIER INSTINCTIF
          </span>
        </div>
        <div
          style={{
            color: "rgba(255, 255, 255, 0.9)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            paddingLeft: 6,
          }}
        >
          Dévouement Ancestral
        </div>
      </div>
    </AbsoluteFill>
  );
};

