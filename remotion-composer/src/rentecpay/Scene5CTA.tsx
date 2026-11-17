import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = interpolate(frame, [0, 258], [1.0, 1.06], {
    extrapolateRight: "clamp",
  });

  const valueSpring = spring({ frame: frame - 6, fps, config: { damping: 14, stiffness: 85 } });
  const titleSpring = spring({ frame: frame - 24, fps, config: { damping: 14, stiffness: 90 } });
  const btnSpring = spring({ frame: frame - 48, fps, config: { damping: 12, stiffness: 95 } });

  const pulse = Math.sin(frame / 7) * 0.045 + 1.0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#040d21", overflow: "hidden" }}>
      {/* Poster Background */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={resolveAsset("rentecpay/poster.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.55) contrast(1.1)",
          }}
        />
      </AbsoluteFill>

      {/* Deep Blue Vignette */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(4, 13, 33, 0.92) 0%, rgba(4, 13, 33, 0.48) 38%, rgba(4, 13, 33, 0.9) 75%, rgba(4, 13, 33, 0.98) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 150,
          paddingLeft: 44,
          paddingRight: 44,
        }}
      >
        {/* Value Proposition Bar */}
        <div
          style={{
            opacity: interpolate(valueSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(valueSpring, [0, 1], [25, 0])}px)`,
            padding: "20px 32px",
            borderRadius: 24,
            background: "rgba(6, 20, 52, 0.92)",
            backdropFilter: "blur(12px)",
            border: "2px solid rgba(56, 189, 248, 0.7)",
            boxShadow: "0 12px 35px rgba(0, 0, 0, 0.65)",
            textAlign: "center",
            width: "100%",
            maxWidth: 880,
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 28,
              fontWeight: 800,
              color: "#e0f2fe",
              lineHeight: 1.4,
            }}
          >
            ⚡ Plus de contrôle • Moins d'impayés
            <br />
            Une gestion simple et moderne
          </span>
        </div>

        {/* Main CTA Headline */}
        <h2
          style={{
            marginTop: 70,
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(titleSpring, [0, 1], [0.9, 1])})`,
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: 64,
            fontWeight: 900,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.15,
            textShadow: "0 6px 25px rgba(0, 0, 0, 0.85), 0 0 30px rgba(56, 189, 248, 0.5)",
          }}
        >
          Passez au comptage intelligent !
        </h2>

        {/* Big Gold Commandez Maintenant Button */}
        <div
          style={{
            marginTop: 70,
            opacity: interpolate(btnSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(btnSpring, [0, 1], [0.85, 1]) * pulse})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            width: "100%",
            maxWidth: 780,
            padding: "28px 42px",
            background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 55%, #d97706 100%)",
            borderRadius: 999,
            border: "4px solid #fef3c7",
            boxShadow: "0 16px 45px rgba(245, 158, 11, 0.6), 0 0 35px rgba(251, 191, 36, 0.5)",
          }}
        >
          <span style={{ fontSize: 48 }}>🛒</span>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 44,
              fontWeight: 900,
              color: "#0f172a",
              letterSpacing: 1,
            }}
          >
            Commandez maintenant
          </span>
        </div>

        {/* Brand Lockup */}
        <div
          style={{
            marginTop: 70,
            opacity: interpolate(btnSpring, [0, 1], [0, 1]),
            padding: "16px 34px",
            borderRadius: 18,
            background: "rgba(6, 20, 52, 0.88)",
            border: "1.5px solid rgba(56, 189, 248, 0.5)",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 28,
              fontWeight: 800,
              color: "#38bdf8",
              letterSpacing: 2,
            }}
          >
            e-EnergieTEC • RENTecPay RT100
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
