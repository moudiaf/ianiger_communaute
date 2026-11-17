import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene5Contact: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = interpolate(frame, [0, 120], [1.0, 1.06], {
    extrapolateRight: "clamp",
  });

  const badgeSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  const buttonSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 95 },
  });

  const infoSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 15, stiffness: 90 },
  });

  // Pulsing scale on the WhatsApp button
  const pulse = Math.sin(frame / 6) * 0.04 + 1.0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0804", overflow: "hidden" }}>
      {/* Background Poster */}
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
            filter: "brightness(0.65) contrast(1.1)",
          }}
        />
      </AbsoluteFill>

      {/* Atmospheric Vignette Overlay */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(12, 8, 4, 0.9) 0%, rgba(12, 8, 4, 0.4) 40%, rgba(12, 8, 4, 0.88) 80%, rgba(12, 8, 4, 0.98) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 130,
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        {/* Sequence tag */}
        <div
          style={{
            opacity: interpolate(badgeSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(badgeSpring, [0, 1], [25, 0])}px)`,
            marginBottom: 30,
            padding: "10px 28px",
            borderRadius: 999,
            background: "rgba(22, 15, 8, 0.85)",
            border: "1px solid rgba(245, 158, 11, 0.5)",
            color: "#fbbf24",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontFamily: "Space Grotesk, sans-serif",
          }}
        >
          SÉQUENCE 5 • CONTACT & COMMANDE
        </div>

        {/* Title */}
        <h2
          style={{
            opacity: interpolate(badgeSpring, [0, 1], [0, 1]),
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: 48,
            fontWeight: 900,
            color: "#ffffff",
            textAlign: "center",
            margin: "0 0 40px 0",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
          }}
        >
          Commandez vos parfums dès aujourd'hui
        </h2>

        {/* Big WhatsApp CTA Button */}
        <div
          style={{
            opacity: interpolate(buttonSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(buttonSpring, [0, 1], [0.85, 1]) * pulse}) translateY(${interpolate(buttonSpring, [0, 1], [30, 0])}px)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            width: "100%",
            maxWidth: 780,
            padding: "26px 40px",
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            borderRadius: 999,
            boxShadow:
              "0 16px 40px rgba(22, 163, 74, 0.55), 0 0 30px rgba(34, 197, 94, 0.4)",
            border: "3px solid #bbf7d0",
            cursor: "pointer",
          }}
        >
          {/* WhatsApp SVG Icon */}
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <span
            style={{
              fontFamily: "Space Grotesk, monospace, sans-serif",
              fontSize: 54,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: 2,
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            +227 88 46 85 76
          </span>
        </div>

        {/* Location & Delivery Details Card */}
        <div
          style={{
            marginTop: 50,
            opacity: interpolate(infoSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(infoSpring, [0, 1], [30, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "26px 40px",
            background: "rgba(20, 14, 8, 0.88)",
            backdropFilter: "blur(14px)",
            borderRadius: 22,
            border: "1px solid rgba(245, 158, 11, 0.45)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5)",
            maxWidth: 720,
            textAlign: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#fef3c7",
              letterSpacing: 1.5,
            }}
          >
            📍 DIFF A • EXPÉDITIONS PARTOUT AU NIGER
          </span>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 22,
              color: "#d1d5db",
            }}
          >
            Livraison rapide & sécurisée à Niamey et dans toutes les régions.
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

