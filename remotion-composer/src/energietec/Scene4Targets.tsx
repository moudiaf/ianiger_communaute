import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene4Targets: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = interpolate(frame, [0, 90], [1.02, 1.08], {
    extrapolateRight: "clamp",
  });

  const headerSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  const card1Spring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 90 },
  });
  const card2Spring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 14, stiffness: 90 },
  });
  const card3Spring = spring({
    frame: frame - 32,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const targets = [
    {
      icon: "🏡",
      title: "MAISONS",
      desc: "Maîtrise budgétaire totale pour les familles",
      spring: card1Spring,
    },
    {
      icon: "🏪",
      title: "COMMERCES",
      desc: "Gestion précise sans surprise d'impayés",
      spring: card2Spring,
    },
    {
      icon: "🏢",
      title: "BUREAUX",
      desc: "Télégestion multi-sites fluide et moderne",
      spring: card3Spring,
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#021226", overflow: "hidden" }}>
      {/* Background Poster darkened */}
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
            filter: "brightness(0.4) blur(4px)",
          }}
        />
      </AbsoluteFill>

      {/* Cyber blue glow */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(2, 18, 38, 0.95) 0%, rgba(3, 30, 68, 0.8) 50%, rgba(2, 18, 38, 0.98) 100%)",
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
        {/* Header */}
        <div
          style={{
            opacity: interpolate(headerSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headerSpring, [0, 1], [30, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 44,
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
            ADAPTÉ À TOUS VOS BESOINS
          </span>
          <h2
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 52,
              fontWeight: 900,
              color: "#ffffff",
              margin: "6px 0 0 0",
              textAlign: "center",
            }}
          >
            Idéal pour vos espaces
          </h2>
        </div>

        {/* 3 Target Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 26,
            width: "100%",
            maxWidth: 780,
          }}
        >
          {targets.map((t, idx) => (
            <div
              key={idx}
              style={{
                opacity: interpolate(t.spring, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(t.spring, [0, 1], [40, 0])}px)`,
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "24px 32px",
                background: "rgba(3, 22, 54, 0.92)",
                backdropFilter: "blur(14px)",
                borderRadius: 22,
                border: "2px solid rgba(56, 189, 248, 0.7)",
                boxShadow:
                  "0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.2)",
              }}
            >
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 20,
                  background:
                    "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                  boxShadow: "0 6px 18px rgba(2, 132, 199, 0.5)",
                  flexShrink: 0,
                }}
              >
                {t.icon}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: 32,
                    fontWeight: 900,
                    letterSpacing: 2,
                    color: "#ffffff",
                  }}
                >
                  {t.title}
                </span>
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: 22,
                    color: "#93c5fd",
                    fontWeight: 500,
                  }}
                >
                  {t.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
