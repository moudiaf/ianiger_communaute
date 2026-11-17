import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene4Connectivity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame: frame - 4, fps, config: { damping: 14, stiffness: 90 } });
  const modulesSpring = spring({ frame: frame - 14, fps, config: { damping: 15, stiffness: 85 } });
  const targetSpring = spring({ frame: frame - 45, fps, config: { damping: 15, stiffness: 90 } });

  const protocols = ["PLC", "RF", "GPRS"];
  const targets = [
    { icon: "🏠", label: "Maisons" },
    { icon: "🏪", label: "Commerces" },
    { icon: "🏢", label: "Bureaux" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 40%, #0d3a73 0%, #040d21 82%)",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 100 }}>
        {/* Tag */}
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
          e-EnergieTEC / CONNECTIVITÉ
        </div>

        <h2
          style={{
            opacity: interpolate(headerSpring, [0, 1], [0, 1]),
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: 58,
            fontWeight: 900,
            color: "#ffffff",
            margin: "20px 0 8px 0",
            letterSpacing: 2,
          }}
        >
          COMMUNICATION
        </h2>
        <span
          style={{
            opacity: interpolate(headerSpring, [0, 1], [0, 1]),
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: 26,
            fontWeight: 700,
            color: "#7dd3fc",
            letterSpacing: 3,
          }}
        >
          MODULES MULTI-PROTOCOLES
        </span>

        {/* Modules Spotlight Image */}
        <div
          style={{
            marginTop: 40,
            opacity: interpolate(modulesSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(modulesSpring, [0, 1], [0.9, 1])})`,
            padding: 18,
            borderRadius: 28,
            background: "rgba(6, 20, 52, 0.9)",
            border: "2.5px solid rgba(56, 189, 248, 0.75)",
            boxShadow: "0 18px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(56, 189, 248, 0.3)",
            width: "88%",
          }}
        >
          <Img
            src={resolveAsset("rentecpay/modules.jpg")}
            style={{
              width: "100%",
              height: 250,
              objectFit: "cover",
              borderRadius: 16,
            }}
          />
        </div>

        {/* 3 Protocol Pills */}
        <div
          style={{
            marginTop: 32,
            display: "flex",
            gap: 24,
            justifyContent: "center",
            width: "88%",
          }}
        >
          {protocols.map((p, idx) => {
            const sp = spring({ frame: frame - (22 + idx * 10), fps, config: { damping: 12, stiffness: 100 } });
            return (
              <div
                key={p}
                style={{
                  opacity: interpolate(sp, [0, 1], [0, 1]),
                  transform: `scale(${interpolate(sp, [0, 1], [0.8, 1])})`,
                  flex: 1,
                  padding: "20px 10px",
                  borderRadius: 20,
                  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  border: "2px solid #93c5fd",
                  boxShadow: "0 10px 25px rgba(37, 99, 235, 0.45)",
                  textAlign: "center",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 38,
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: 2,
                }}
              >
                {p}
              </div>
            );
          })}
        </div>

        {/* Idéal Pour Card */}
        <div
          style={{
            marginTop: 50,
            opacity: interpolate(targetSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(targetSpring, [0, 1], [30, 0])}px)`,
            width: "88%",
            padding: "28px 24px",
            borderRadius: 26,
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(12px)",
            border: "2px solid rgba(251, 191, 36, 0.65)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 22,
          }}
        >
          <span
            style={{
              padding: "8px 28px",
              borderRadius: 999,
              background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
              color: "#0f172a",
              fontSize: 24,
              fontWeight: 900,
              fontFamily: "Space Grotesk, sans-serif",
              textTransform: "uppercase",
            }}
          >
            Idéal pour
          </span>

          <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
            {targets.map((t) => (
              <div
                key={t.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 54 }}>{t.icon}</span>
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: 26,
                    fontWeight: 800,
                    color: "#f8fafc",
                  }}
                >
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
