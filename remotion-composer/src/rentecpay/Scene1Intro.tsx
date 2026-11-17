import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = interpolate(frame, [0, 192], [1.0, 1.09], {
    extrapolateRight: "clamp",
  });

  const headerSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const badgeSpring = spring({
    frame: frame - 24,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#040d21", overflow: "hidden" }}>
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
            filter: "brightness(0.88) contrast(1.08)",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(4, 13, 33, 0.88) 0%, rgba(4, 13, 33, 0.22) 32%, rgba(4, 13, 33, 0.35) 68%, rgba(4, 13, 33, 0.94) 100%)",
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill style={{ alignItems: "center", paddingTop: 110 }}>
        <div
          style={{
            opacity: interpolate(headerSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headerSpring, [0, 1], [30, 0])}px) scale(${interpolate(headerSpring, [0, 1], [0.92, 1])})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "26px 46px",
            background: "rgba(6, 20, 52, 0.88)",
            backdropFilter: "blur(14px)",
            borderRadius: 26,
            border: "2px solid rgba(56, 189, 248, 0.7)",
            boxShadow: "0 14px 40px rgba(0, 0, 0, 0.65), 0 0 32px rgba(56, 189, 248, 0.3)",
            maxWidth: "88%",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: 4,
              color: "#38bdf8",
              textTransform: "uppercase",
            }}
          >
            e-EnergieTEC • RENTecPay
          </span>
          <h1
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: 4,
              color: "#ffffff",
              margin: "4px 0",
              textShadow: "0 4px 24px rgba(56, 189, 248, 0.6)",
            }}
          >
            RT100
          </h1>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 28,
              fontWeight: 700,
              color: "#e0f2fe",
            }}
          >
            Compteur intelligent prépayé Monophasé
          </span>
        </div>

        <div
          style={{
            marginTop: 34,
            opacity: interpolate(badgeSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(badgeSpring, [0, 1], [20, 0])}px)`,
            padding: "14px 32px",
            borderRadius: 999,
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            border: "2px solid #fef3c7",
            color: "#ffffff",
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: 1,
            boxShadow: "0 8px 25px rgba(245, 158, 11, 0.45)",
            fontFamily: "Space Grotesk, sans-serif",
          }}
        >
          ⚡ Contrôlez votre énergie en toute simplicité !
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
