import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = interpolate(frame, [0, 96], [1.0, 1.05], {
    extrapolateRight: "clamp",
  });

  const titleSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  const buttonSpring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 12, stiffness: 95 },
  });

  const badgeSpring = spring({
    frame: frame - 24,
    fps,
    config: { damping: 15, stiffness: 90 },
  });

  // Pulsing scale on the CTA button
  const pulse = Math.sin(frame / 6) * 0.04 + 1.0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#021226", overflow: "hidden" }}>
      {/* Background Poster */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={resolveAsset("energietec/poster_energietec.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.65) contrast(1.15)",
          }}
        />
      </AbsoluteFill>

      {/* Cyber blue glow */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(2, 18, 38, 0.92) 0%, rgba(2, 18, 38, 0.4) 35%, rgba(2, 18, 38, 0.85) 75%, rgba(2, 18, 38, 0.98) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 140,
          paddingLeft: 44,
          paddingRight: 44,
        }}
      >
        {/* Banner */}
        <div
          style={{
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleSpring, [0, 1], [25, 0])}px)`,
            marginBottom: 24,
            padding: "12px 30px",
            borderRadius: 999,
            background: "rgba(3, 20, 48, 0.9)",
            border: "1px solid rgba(56, 189, 248, 0.6)",
            color: "#38bdf8",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontFamily: "Space Grotesk, sans-serif",
          }}
        >
          ⚡ PASSEZ AU COMPTAGE INTELLIGENT !
        </div>

        {/* Big Headline */}
        <h2
          style={{
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: 54,
            fontWeight: 900,
            color: "#ffffff",
            textAlign: "center",
            margin: "0 0 45px 0",
            textShadow: "0 4px 25px rgba(0, 0, 0, 0.9)",
            lineHeight: 1.25,
          }}
        >
          Plus de contrôle.
          <br />
          <span style={{ color: "#38bdf8" }}>Moins d'impayés.</span>
        </h2>

        {/* Golden Glowing CTA Button */}
        <div
          style={{
            opacity: interpolate(buttonSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(buttonSpring, [0, 1], [0.85, 1]) * pulse}) translateY(${interpolate(buttonSpring, [0, 1], [30, 0])}px)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            width: "100%",
            maxWidth: 780,
            padding: "26px 44px",
            background:
              "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
            borderRadius: 999,
            boxShadow:
              "0 16px 45px rgba(245, 158, 11, 0.55), 0 0 35px rgba(251, 191, 36, 0.5)",
            border: "3px solid #fef3c7",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 44 }}>🛒</span>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 48,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: 2,
              textTransform: "uppercase",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
            }}
          >
            Commandez maintenant
          </span>
        </div>

        {/* Footer Brand Info */}
        <div
          style={{
            marginTop: 50,
            opacity: interpolate(badgeSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(badgeSpring, [0, 1], [30, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 40px",
            background: "rgba(3, 20, 48, 0.9)",
            backdropFilter: "blur(14px)",
            borderRadius: 22,
            border: "1px solid rgba(56, 189, 248, 0.5)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5)",
            maxWidth: 720,
            textAlign: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 28,
              fontWeight: 900,
              color: "#38bdf8",
              letterSpacing: 2,
            }}
          >
            e-EnergieTEC • RENTecPay RT100
          </span>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 22,
              color: "#e2e8f0",
            }}
          >
            Une gestion simple, moderne et économique de votre énergie.
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
