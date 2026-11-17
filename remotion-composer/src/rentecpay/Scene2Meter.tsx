import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene2Meter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame: frame - 4, fps, config: { damping: 14, stiffness: 90 } });
  const meterSpring = spring({ frame: frame - 10, fps, config: { damping: 15, stiffness: 80 } });

  const features = [
    { icon: "🎯", title: "Mesure précise", delay: 18 },
    { icon: "🛡️", title: "Recharge sécurisée (STS)", delay: 34 },
    { icon: "📊", title: "Suivi en temps réel", delay: 50 },
    { icon: "💻", title: "Alertes & gestion à distance", delay: 66 },
    { icon: "🔧", title: "Installation facile", delay: 82 },
  ];

  const meterPulse = Math.sin(frame / 12) * 0.02 + 1.0;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 70% 35%, #0e3a75 0%, #040d21 75%)",
        overflow: "hidden",
      }}
    >
      {/* Top Pill */}
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 90 }}>
        <div
          style={{
            opacity: interpolate(headerSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headerSpring, [0, 1], [20, 0])}px)`,
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
          e-EnergieTEC • COMPTEUR RT100
        </div>

        <h2
          style={{
            opacity: interpolate(headerSpring, [0, 1], [0, 1]),
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: 52,
            fontWeight: 900,
            color: "#ffffff",
            marginTop: 18,
            textAlign: "center",
            textShadow: "0 4px 18px rgba(0,0,0,0.6)",
          }}
        >
          Performance & Fiabilité
        </h2>

        {/* Meter Spotlight */}
        <div
          style={{
            marginTop: 24,
            opacity: interpolate(meterSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(meterSpring, [0, 1], [0.88, 1]) * meterPulse})`,
            padding: 16,
            borderRadius: 30,
            background: "rgba(255, 255, 255, 0.08)",
            border: "2px solid rgba(56, 189, 248, 0.65)",
            boxShadow: "0 16px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(56, 189, 248, 0.35)",
          }}
        >
          <Img
            src={resolveAsset("rentecpay/meter.jpg")}
            style={{
              width: 390,
              height: 490,
              objectFit: "cover",
              borderRadius: 20,
            }}
          />
        </div>

        {/* 5 Staggered Feature Pills */}
        <div
          style={{
            marginTop: 36,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: "86%",
          }}
        >
          {features.map((f, idx) => {
            const sp = spring({ frame: frame - f.delay, fps, config: { damping: 14, stiffness: 95 } });
            return (
              <div
                key={idx}
                style={{
                  opacity: interpolate(sp, [0, 1], [0, 1]),
                  transform: `translateX(${interpolate(sp, [0, 1], [-45, 0])}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "16px 26px",
                  borderRadius: 18,
                  background: "linear-gradient(90deg, rgba(14, 58, 117, 0.9) 0%, rgba(6, 20, 52, 0.9) 100%)",
                  border: "1.5px solid rgba(56, 189, 248, 0.55)",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.45)",
                }}
              >
                <span style={{ fontSize: 32 }}>{f.icon}</span>
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#f0f9ff",
                  }}
                >
                  {f.title}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
