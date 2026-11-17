import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = interpolate(frame, [0, 90], [1.0, 1.08], {
    extrapolateRight: "clamp",
  });

  const logoEntrance = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const tagEntrance = spring({
    frame: frame - 18,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#021226", overflow: "hidden" }}>
      {/* Background Poster with slight pulse */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center top",
        }}
      >
        <Img
          src={resolveAsset("energietec/poster_energietec.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.9) contrast(1.1)",
          }}
        />
      </AbsoluteFill>

      {/* High-Tech Cyber Blue Neon Vignette */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(2, 18, 38, 0.85) 0%, rgba(2, 18, 38, 0.2) 30%, rgba(2, 18, 38, 0.3) 60%, rgba(2, 18, 38, 0.95) 100%)",
        }}
      />

      {/* Radial Blue Flare on Top Header */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 18%, rgba(14, 165, 233, 0.45) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill style={{ alignItems: "center", paddingTop: 140 }}>
        {/* Animated Brand Card */}
        <div
          style={{
            opacity: interpolate(logoEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(logoEntrance, [0, 1], [40, 0])}px) scale(${interpolate(logoEntrance, [0, 1], [0.92, 1])})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "26px 48px",
            background: "rgba(3, 20, 48, 0.88)",
            backdropFilter: "blur(16px)",
            borderRadius: 24,
            border: "2px solid rgba(56, 189, 248, 0.75)",
            boxShadow:
              "0 14px 45px rgba(0, 0, 0, 0.7), 0 0 35px rgba(56, 189, 248, 0.4)",
            maxWidth: "88%",
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: 6,
              color: "#38bdf8",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            ⚡ e-EnergieTEC • RENTecPay
          </span>
          <h1
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 88,
              fontWeight: 900,
              letterSpacing: 4,
              color: "#ffffff",
              margin: 0,
              textShadow: "0 4px 25px rgba(56, 189, 248, 0.6)",
            }}
          >
            RT100
          </h1>
          <div
            style={{
              width: 180,
              height: 4,
              background:
                "linear-gradient(90deg, transparent, #38bdf8, transparent)",
              margin: "12px 0",
            }}
          />
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 32,
              fontWeight: 700,
              color: "#e0f2fe",
              textAlign: "center",
            }}
          >
            Compteur Intelligent Prépayé Monophasé
          </span>
        </div>

        {/* Hook Tagline */}
        <div
          style={{
            marginTop: 40,
            opacity: interpolate(tagEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(tagEntrance, [0, 1], [25, 0])}px)`,
            padding: "16px 36px",
            borderRadius: 999,
            background:
              "linear-gradient(135deg, rgba(14, 165, 233, 0.35) 0%, rgba(2, 132, 199, 0.2) 100%)",
            border: "1.5px solid rgba(56, 189, 248, 0.7)",
            color: "#bae6fd",
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: 2,
            fontFamily: "Space Grotesk, sans-serif",
            boxShadow: "0 0 25px rgba(14, 165, 233, 0.3)",
          }}
        >
          « Contrôlez votre énergie en toute simplicité ! »
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
