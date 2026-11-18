import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene1FlatLay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "une photographie de produit vue du dessus, avec un léger zoom."
  const scale = interpolate(frame, [0, 155], [1.02, 1.14], {
    extrapolateRight: "clamp",
  });
  const rotate = interpolate(frame, [0, 155], [0, 1.5], {
    extrapolateRight: "clamp",
  });

  const headerSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  const badgeSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0a09", overflow: "hidden" }}>
      {/* Background Image: FlatLay vue du dessus */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) rotate(${rotate}deg)`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={resolveAsset("ianiger/flatlay.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.92) contrast(1.1)",
          }}
        />
      </AbsoluteFill>

      {/* Elegant Warm Amber & Dark Gradient */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(12, 10, 9, 0.85) 0%, rgba(12, 10, 9, 0.15) 35%, rgba(12, 10, 9, 0.3) 65%, rgba(12, 10, 9, 0.95) 100%)",
        }}
      />

      <AbsoluteFill style={{ alignItems: "center", paddingTop: 130 }}>
        {/* Community Header Badge */}
        <div
          style={{
            opacity: interpolate(headerSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headerSpring, [0, 1], [30, 0])}px)`,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 24px",
            borderRadius: 999,
            background: "rgba(20, 15, 10, 0.85)",
            backdropFilter: "blur(12px)",
            border: "1.5px solid rgba(245, 158, 11, 0.6)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
            marginBottom: 26,
          }}
        >
          <span style={{ fontSize: 24 }}>🇳🇪</span>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 3,
              color: "#fbbf24",
              textTransform: "uppercase",
            }}
          >
            IA NIGER COMMUNAUTÉ • ÉPISODE 2
          </span>
        </div>

        {/* Style Tag Card: 1 — /FlatLay */}
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
            1 — /FlatLay
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
            Photographiez vos produits du dessus
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
