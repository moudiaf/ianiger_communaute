import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene4Loyalty: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow orbital-like zoom
  const scale = interpolate(frame, [0, 225], [1.02, 1.12], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, 225], [0, -18], {
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const badgeEntrance = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  // Call to action banner at the end of the video
  const ctaSpring = spring({
    frame: frame - 110,
    fps,
    config: { damping: 16, stiffness: 80 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0a09", overflow: "hidden" }}>
      {/* Background Image */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: "center 45%",
          opacity,
        }}
      >
        <Img
          src={resolveAsset("dogguardian/scene4.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.95) contrast(1.1) saturate(1.2)",
          }}
        />
      </AbsoluteFill>

      {/* Golden Sunset Bloom & Light Flare */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 75% 20%, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.2) 40%, transparent 75%)",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      {/* Cinematic Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(12, 10, 9, 0.78) 100%)",
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
            ACTE 4 · L'ANGE GARDIEN
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
          Fidélité Inconditionnelle
        </div>
      </div>

      {/* Ending CTA Card */}
      {frame > 110 && (
        <div
          style={{
            position: "absolute",
            top: 280,
            left: 60,
            right: 60,
            opacity: ctaSpring,
            transform: `scale(${interpolate(ctaSpring, [0, 1], [0.92, 1])})`,
            background: "linear-gradient(135deg, rgba(28, 22, 18, 0.88) 0%, rgba(14, 11, 9, 0.92) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(251, 191, 36, 0.5)",
            borderRadius: 24,
            padding: "24px 30px",
            boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#fbbf24",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.08em",
              marginBottom: 6,
            }}
          >
            L'AMOUR D'UN CHIEN EST ÉTERNEL
          </div>
          <div
            style={{
              color: "rgba(255, 255, 255, 0.85)",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 400,
            }}
          >
            Partagez en commentaire l'histoire de votre fidèle protecteur ❤️
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

