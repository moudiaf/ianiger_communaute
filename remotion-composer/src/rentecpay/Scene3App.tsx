import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene3App: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame: frame - 4, fps, config: { damping: 14, stiffness: 90 } });
  const phoneSpring = spring({ frame: frame - 12, fps, config: { damping: 14, stiffness: 85 } });

  const pills = [
    { icon: "💳", label: "Recharge instantanée STS", delay: 28 },
    { icon: "📈", label: "Suivi de consommation en direct", delay: 44 },
    { icon: "🔔", label: "Alertes utiles & notifications", delay: 60 },
  ];

  const floatY = Math.sin(frame / 14) * 8;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 45%, #0c356a 0%, #040d21 80%)",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 95 }}>
        {/* Top Tag */}
        <div
          style={{
            opacity: interpolate(headerSpring, [0, 1], [0, 1]),
            padding: "10px 28px",
            borderRadius: 999,
            background: "rgba(15, 35, 80, 0.85)",
            border: "1px solid rgba(56, 189, 248, 0.5)",
            color: "#38bdf8",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontFamily: "Space Grotesk, sans-serif",
          }}
        >
          e-EnergieTEC / APPLICATION MOBILE
        </div>

        {/* Title */}
        <h2
          style={{
            opacity: interpolate(headerSpring, [0, 1], [0, 1]),
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: 64,
            fontWeight: 900,
            color: "#ffffff",
            margin: "18px 0 6px 0",
            textShadow: "0 4px 20px rgba(56, 189, 248, 0.5)",
          }}
        >
          RENTecPay
        </h2>
        <span
          style={{
            opacity: interpolate(headerSpring, [0, 1], [0, 1]),
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 2,
            color: "#7dd3fc",
            textTransform: "uppercase",
          }}
        >
          VOTRE COMPTEUR À PORTÉE DE MAIN
        </span>

        {/* Smartphone Spotlight Card */}
        <div
          style={{
            marginTop: 36,
            opacity: interpolate(phoneSpring, [0, 1], [0, 1]),
            transform: `translateY(${floatY}px) scale(${interpolate(phoneSpring, [0, 1], [0.88, 1])})`,
            padding: 18,
            borderRadius: 36,
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(14, 58, 117, 0.5) 100%)",
            border: "2.5px solid rgba(56, 189, 248, 0.75)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.75), 0 0 40px rgba(56, 189, 248, 0.35)",
          }}
        >
          <Img
            src={resolveAsset("rentecpay/phone.jpg")}
            style={{
              width: 340,
              height: 580,
              objectFit: "cover",
              borderRadius: 24,
            }}
          />
        </div>

        {/* 3 Stacked Feature Pills */}
        <div
          style={{
            marginTop: 42,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            width: "84%",
          }}
        >
          {pills.map((p, idx) => {
            const sp = spring({ frame: frame - p.delay, fps, config: { damping: 14, stiffness: 95 } });
            return (
              <div
                key={idx}
                style={{
                  opacity: interpolate(sp, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(sp, [0, 1], [25, 0])}px)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  padding: "18px 28px",
                  borderRadius: 999,
                  background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                  border: "2px solid #60a5fa",
                  boxShadow: "0 8px 25px rgba(29, 78, 216, 0.5)",
                }}
              >
                <span style={{ fontSize: 30 }}>{p.icon}</span>
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#ffffff",
                  }}
                >
                  {p.label}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
