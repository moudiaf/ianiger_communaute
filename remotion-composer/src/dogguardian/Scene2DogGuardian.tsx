import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene2DogGuardian: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow, intense push-in towards the dog's eyes
  const scale = interpolate(frame, [0, 285], [1.03, 1.14], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, 285], [0, -15], {
    extrapolateRight: "clamp",
  });

  // Fade-in transition
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Pulsing focus ring (representing sharp canine senses & alertness)
  const pulse = Math.sin((frame / 30) * Math.PI * 2);
  const ringScale = 1 + pulse * 0.08;
  const ringOpacity = 0.45 + pulse * 0.25;

  const badgeEntrance = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0a09", overflow: "hidden" }}>
      {/* Background Image with Slow Push-In */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: "52% 40%",
          opacity,
        }}
      >
        <Img
          src={resolveAsset("dogguardian/scene2.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.9) contrast(1.12) saturate(1.1)",
          }}
        />
      </AbsoluteFill>

      {/* Subtle Vigilance Focus Ring Overlay */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: "52%",
          transform: `translate(-50%, -50%) scale(${ringScale})`,
          width: 240,
          height: 240,
          borderRadius: "50%",
          border: `2px dashed rgba(251, 191, 36, ${ringOpacity})`,
          boxShadow: `0 0 35px rgba(245, 158, 11, ${ringOpacity * 0.5})`,
          pointerEvents: "none",
        }}
      />

      {/* Cinematic Rim Lighting and Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(12, 10, 9, 0.82) 100%)",
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%)",
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
            ACTE 2 · LE GARDIEN SILENCIEUX
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
          Vigilance Instinctive
        </div>
      </div>
    </AbsoluteFill>
  );
};

