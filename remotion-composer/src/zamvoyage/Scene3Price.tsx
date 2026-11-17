import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene3Price: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = interpolate(frame, [0, 225], [1.02, 1.12], {
    extrapolateRight: "clamp",
  });

  const badgeSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 13, stiffness: 85 },
  });

  const pulse = Math.sin((frame / 20) * Math.PI * 2);
  const pulseScale = 1 + pulse * 0.03;

  return (
    <AbsoluteFill style={{ backgroundColor: "#06231a", overflow: "hidden" }}>
      {/* Background Poster Kaaba */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center 40%",
        }}
      >
        <Img
          src={resolveAsset("zamvoyage/poster_omrah.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.7) contrast(1.1)",
          }}
        />
      </AbsoluteFill>

      {/* Golden Aura & Dark Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at center, rgba(251, 191, 36, 0.25) 0%, rgba(6, 35, 26, 0.75) 60%, rgba(6, 35, 26, 0.95) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Top Banner */}
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
            display: "inline-block",
            background: "rgba(6, 35, 26, 0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(251, 191, 36, 0.5)",
            borderRadius: 30,
            padding: "8px 24px",
            color: "#fbbf24",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.15em",
            marginBottom: 10,
          }}
        >
          OFFRE SPÉCIALE RAMADAN
        </div>
        <div
          style={{
            color: "#ffffff",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 46,
            fontWeight: 800,
            textShadow: "0 4px 15px rgba(0,0,0,0.8)",
          }}
        >
          Un Tarif Tout Compris
        </div>
      </div>

      {/* Huge Golden Price Emblem */}
      <div
        style={{
          position: "absolute",
          top: "44%",
          left: 50,
          right: 50,
          transform: `translateY(-50%) scale(${interpolate(badgeSpring, [0, 1], [0.8, 1]) * pulseScale})`,
          opacity: badgeSpring,
          background: "linear-gradient(145deg, #f59e0b 0%, #d97706 40%, #b45309 100%)",
          borderRadius: 36,
          padding: "44px 30px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(245, 158, 11, 0.5)",
          textAlign: "center",
          border: "3px solid #fef3c7",
        }}
      >
        <div
          style={{
            color: "#06231a",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: "0.2em",
            marginBottom: 8,
          }}
        >
          PRIX TOTAL TTC
        </div>

        <div
          style={{
            color: "#ffffff",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 66,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            lineHeight: 1.0,
            textShadow: "0 4px 18px rgba(0,0,0,0.4)",
          }}
        >
          1 850 000
        </div>

        <div
          style={{
            color: "#06231a",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 34,
            fontWeight: 900,
            letterSpacing: "0.1em",
            marginTop: 6,
          }}
        >
          FCFA SEULEMENT
        </div>

        <div
          style={{
            marginTop: 20,
            display: "inline-block",
            background: "rgba(6, 35, 26, 0.9)",
            color: "#fbbf24",
            padding: "8px 24px",
            borderRadius: 20,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.06em",
          }}
        >
          ✓ Aucun frais caché · 100% garanti
        </div>
      </div>
    </AbsoluteFill>
  );
};

