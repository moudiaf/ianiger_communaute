import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene1Child: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth cinematic Ken Burns zoom (1.0 to 1.10) and subtle pan
  const scale = interpolate(frame, [0, 255], [1.02, 1.12], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, 255], [0, -20], {
    extrapolateRight: "clamp",
  });

  // Entrance fade-in and badge spring
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const badgeEntrance = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0a09", overflow: "hidden" }}>
      {/* Background Image with Ken Burns */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: "center center",
          opacity,
        }}
      >
        <Img
          src={resolveAsset("dogguardian/scene1.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.92) contrast(1.08) saturate(1.15)",
          }}
        />
      </AbsoluteFill>

      {/* Cinematic Golden Hour Light Bloom */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 85% 15%, rgba(251, 191, 36, 0.35) 0%, rgba(245, 158, 11, 0.15) 40%, transparent 75%)",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      {/* Cinematic Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at center, transparent 45%, rgba(12, 10, 9, 0.75) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Atmospheric Warm Sunbeams Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(135deg, rgba(253, 224, 71, 0.12) 0%, transparent 50%, rgba(0,0,0,0.4) 100%)",
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
            ACTE 1 · L'INNOCENCE
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
          Seul dans la pièce
        </div>
      </div>
    </AbsoluteFill>
  );
};

