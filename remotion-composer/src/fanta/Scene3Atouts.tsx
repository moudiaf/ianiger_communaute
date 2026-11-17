import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene3Atouts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = interpolate(frame, [0, 120], [1.02, 1.08], {
    extrapolateRight: "clamp",
  });

  const titleSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  const card1Spring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const card2Spring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const card3Spring = spring({
    frame: frame - 42,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const atouts = [
    {
      spring: card1Spring,
      icon: "🌿",
      title: "INGRÉDIENTS NATURELS",
      subtitle: "Sélection rigoureuse de plantes et graines parfumées",
    },
    {
      spring: card2Spring,
      icon: "✨",
      title: "PARFUMS AUTHENTIQUES",
      subtitle: "Recettes originales préservées au fil des générations",
    },
    {
      spring: card3Spring,
      icon: "🏺",
      title: "SAVOIR-FAIRE TRADITIONNEL",
      subtitle: "Artisanat ancestral d'exception d'origine Diffa",
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0804", overflow: "hidden" }}>
      {/* Background Poster darkened to give prominence to cards */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={resolveAsset("fanta/poster.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.55) blur(3px)",
          }}
        />
      </AbsoluteFill>

      {/* Amber/Gold Tint Overlay */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(12, 8, 4, 0.92) 0%, rgba(20, 14, 8, 0.75) 50%, rgba(12, 8, 4, 0.95) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 130,
          paddingLeft: 48,
          paddingRight: 48,
        }}
      >
        {/* Header */}
        <div
          style={{
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleSpring, [0, 1], [25, 0])}px)`,
            textAlign: "center",
            marginBottom: 50,
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
              color: "#fbbf24",
              textTransform: "uppercase",
            }}
          >
            SÉQUENCE 3 • NOS ENGAGEMENTS
          </span>
          <h2
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 52,
              fontWeight: 900,
              color: "#ffffff",
              margin: "6px 0 0 0",
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
            }}
          >
            Les 3 Atouts FANT'A
          </h2>
        </div>

        {/* 3 Staggered Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%", maxWidth: 840 }}>
          {atouts.map((item, idx) => (
            <div
              key={idx}
              style={{
                opacity: interpolate(item.spring, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(item.spring, [0, 1], [50, 0])}px) scale(${interpolate(item.spring, [0, 1], [0.95, 1])})`,
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "24px 32px",
                background: "rgba(22, 15, 8, 0.9)",
                backdropFilter: "blur(14px)",
                borderRadius: 20,
                border: "2px solid rgba(245, 158, 11, 0.75)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(245, 158, 11, 0.2)",
              }}
            >
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 18,
                  background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 38,
                  boxShadow: "0 4px 15px rgba(217, 119, 6, 0.5)",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: 30,
                    fontWeight: 800,
                    color: "#fef3c7",
                    letterSpacing: 1.5,
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: 20,
                    color: "#d1d5db",
                    fontWeight: 500,
                  }}
                >
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

