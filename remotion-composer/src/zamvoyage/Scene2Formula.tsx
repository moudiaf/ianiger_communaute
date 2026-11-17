import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene2Formula: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = interpolate(frame, [0, 225], [1.02, 1.1], {
    extrapolateRight: "clamp",
  });

  const card1 = spring({ frame: frame - 10, fps, config: { damping: 15, stiffness: 90 } });
  const card2 = spring({ frame: frame - 25, fps, config: { damping: 15, stiffness: 90 } });
  const card3 = spring({ frame: frame - 40, fps, config: { damping: 15, stiffness: 90 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#06231a", overflow: "hidden" }}>
      {/* Background 3D Poster */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={resolveAsset("zamvoyage/poster3d.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.55) contrast(1.15) blur(2px)",
          }}
        />
      </AbsoluteFill>

      {/* Dark Emerald & Gold Tint */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(6, 35, 26, 0.88) 0%, rgba(6, 35, 26, 0.7) 50%, rgba(6, 35, 26, 0.95) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Section Header */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 60,
          right: 60,
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "#fbbf24",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          FORMULE SÉRÉNITÉ TOTALE
        </div>
        <div
          style={{
            color: "#ffffff",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: "-0.01em",
          }}
        >
          Tout est pris en charge
        </div>
      </div>

      {/* 3 Staggered Cards */}
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 60,
          right: 60,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Card 1: 15 Jours */}
        <div
          style={{
            opacity: card1,
            transform: `translateX(${interpolate(card1, [0, 1], [-40, 0])}px)`,
            background: "linear-gradient(135deg, rgba(10, 48, 36, 0.92) 0%, rgba(6, 30, 22, 0.95) 100%)",
            border: "1.5px solid rgba(251, 191, 36, 0.6)",
            borderRadius: 22,
            padding: "22px 28px",
            display: "flex",
            alignItems: "center",
            gap: 24,
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "rgba(251, 191, 36, 0.15)",
              border: "1.5px solid #fbbf24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              flexShrink: 0,
            }}
          >
            🌙
          </div>
          <div>
            <div style={{ color: "#fbbf24", fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: "0.1em" }}>
              DURÉE DU VOYAGE
            </div>
            <div style={{ color: "#ffffff", fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 800 }}>
              Séjour de 15 Jours
            </div>
          </div>
        </div>

        {/* Card 2: Hôtels Médine & Mecque */}
        <div
          style={{
            opacity: card2,
            transform: `translateX(${interpolate(card2, [0, 1], [40, 0])}px)`,
            background: "linear-gradient(135deg, rgba(10, 48, 36, 0.92) 0%, rgba(6, 30, 22, 0.95) 100%)",
            border: "1.5px solid rgba(251, 191, 36, 0.6)",
            borderRadius: 22,
            padding: "22px 28px",
            display: "flex",
            alignItems: "center",
            gap: 24,
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "rgba(251, 191, 36, 0.15)",
              border: "1.5px solid #fbbf24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              flexShrink: 0,
            }}
          >
            🏨
          </div>
          <div>
            <div style={{ color: "#fbbf24", fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: "0.1em" }}>
              HÉBERGEMENT DE QUALITÉ
            </div>
            <div style={{ color: "#ffffff", fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800 }}>
              Hôtel Médine & La Mecque
            </div>
          </div>
        </div>

        {/* Card 3: Vol & Encadrement */}
        <div
          style={{
            opacity: card3,
            transform: `translateX(${interpolate(card3, [0, 1], [-40, 0])}px)`,
            background: "linear-gradient(135deg, rgba(10, 48, 36, 0.92) 0%, rgba(6, 30, 22, 0.95) 100%)",
            border: "1.5px solid rgba(251, 191, 36, 0.6)",
            borderRadius: 22,
            padding: "22px 28px",
            display: "flex",
            alignItems: "center",
            gap: 24,
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "rgba(251, 191, 36, 0.15)",
              border: "1.5px solid #fbbf24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              flexShrink: 0,
            }}
          >
            ✈️
          </div>
          <div>
            <div style={{ color: "#fbbf24", fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: "0.1em" }}>
              TRANSPORT & GUIDES
            </div>
            <div style={{ color: "#ffffff", fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 800 }}>
              Vol A/R & Encadrement Total
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

