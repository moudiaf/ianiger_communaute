import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene3AppModules: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Focus zoom on phone screen and modules (PLC, RF, GPRS)
  const scale = interpolate(frame, [0, 110], [1.35, 1.6], {
    extrapolateRight: "clamp",
  });
  const translateX = interpolate(frame, [0, 110], [140, 190], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, 110], [-40, -100], {
    extrapolateRight: "clamp",
  });

  const headerSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  const modulesSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#021226", overflow: "hidden" }}>
      {/* Zoomed Phone App visual */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={resolveAsset("energietec/poster_energietec.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.96) contrast(1.15)",
          }}
        />
      </AbsoluteFill>

      {/* Cyber blue glow spotlight on smartphone */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 45% 45%, rgba(56, 189, 248, 0.3) 0%, rgba(2, 18, 38, 0.8) 65%, rgba(2, 18, 38, 0.98) 100%)",
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 130,
          paddingLeft: 44,
          paddingRight: 44,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: interpolate(headerSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headerSpring, [0, 1], [30, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 42px",
            background: "rgba(3, 20, 48, 0.92)",
            backdropFilter: "blur(14px)",
            borderRadius: 22,
            border: "2px solid rgba(56, 189, 248, 0.75)",
            boxShadow:
              "0 12px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(56, 189, 248, 0.35)",
            marginBottom: 35,
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 4,
              color: "#38bdf8",
              textTransform: "uppercase",
            }}
          >
            APPLICATION MOBILE & TÉLÉGESTION
          </span>
          <h2
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 48,
              fontWeight: 900,
              color: "#ffffff",
              margin: "6px 0 0 0",
              textAlign: "center",
            }}
          >
            Gérez tout sur RENTecPay
          </h2>
        </div>

        {/* 3 Modules Badges (PLC, RF, GPRS) */}
        <div
          style={{
            opacity: interpolate(modulesSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(modulesSpring, [0, 1], [30, 0])}px)`,
            display: "flex",
            gap: 16,
            marginBottom: 26,
          }}
        >
          {["📡 PLC", "📶 RF Radio", "🌐 GPRS Mobile"].map((mod, i) => (
            <div
              key={i}
              style={{
                padding: "12px 24px",
                borderRadius: 16,
                background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
                border: "2px solid #7dd3fc",
                boxShadow: "0 6px 20px rgba(2, 132, 199, 0.5)",
                color: "#ffffff",
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: 1.5,
              }}
            >
              {mod}
            </div>
          ))}
        </div>

        {/* App features bullet card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            padding: "20px 32px",
            borderRadius: 20,
            background: "rgba(3, 20, 48, 0.88)",
            border: "1px solid rgba(56, 189, 248, 0.5)",
            backdropFilter: "blur(12px)",
            width: "100%",
            maxWidth: 620,
            alignSelf: "flex-end",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ color: "#38bdf8", fontSize: 24 }}>⚡</span>
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: 22,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Recharge instantanée sans déplacement
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ color: "#38bdf8", fontSize: 24 }}>📊</span>
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: 22,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Suivi de consommation kWh en direct
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ color: "#38bdf8", fontSize: 24 }}>🔔</span>
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: 22,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Alertes solde bas & coupures préventives
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
