import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene2Meter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dynamic progressive zoom on the meter on the right side of the poster
  const scale = interpolate(frame, [0, 110], [1.35, 1.65], {
    extrapolateRight: "clamp",
  });
  const translateX = interpolate(frame, [0, 110], [-180, -260], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, 110], [10, -50], {
    extrapolateRight: "clamp",
  });

  const headerSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  const badge1Spring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const badge2Spring = spring({
    frame: frame - 32,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#021226", overflow: "hidden" }}>
      {/* Zoomed Meter visual */}
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
            filter: "brightness(0.98) contrast(1.18)",
          }}
        />
      </AbsoluteFill>

      {/* Cyber blue glow spotlight around meter display */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 65% 42%, rgba(56, 189, 248, 0.3) 0%, rgba(2, 18, 38, 0.75) 60%, rgba(2, 18, 38, 0.95) 100%)",
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
        {/* Sequence Title Badge */}
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
            HAUTE PRÉCISION & SÉCURITÉ STS
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
            Compteur Prépayé RT100
          </h2>
        </div>

        {/* Feature Badges floating on left */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            width: "100%",
            maxWidth: 620,
            alignSelf: "flex-start",
          }}
        >
          <div
            style={{
              opacity: interpolate(badge1Spring, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(badge1Spring, [0, 1], [-40, 0])}px)`,
              display: "flex",
              alignItems: "center",
              gap: 18,
              padding: "18px 26px",
              borderRadius: 18,
              background: "rgba(3, 25, 60, 0.92)",
              border: "1.5px solid rgba(56, 189, 248, 0.6)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
            }}
          >
            <span style={{ fontSize: 34 }}>🎯</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#ffffff",
                }}
              >
                Mesure Ultra-Précise
              </span>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 19,
                  color: "#93c5fd",
                }}
              >
                Conforme aux normes internationales IEC & STS
              </span>
            </div>
          </div>

          <div
            style={{
              opacity: interpolate(badge2Spring, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(badge2Spring, [0, 1], [-40, 0])}px)`,
              display: "flex",
              alignItems: "center",
              gap: 18,
              padding: "18px 26px",
              borderRadius: 18,
              background: "rgba(3, 25, 60, 0.92)",
              border: "1.5px solid rgba(56, 189, 248, 0.6)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
            }}
          >
            <span style={{ fontSize: 34 }}>🛡️</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#ffffff",
                }}
              >
                Recharge Sécurisée (STS)
              </span>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 19,
                  color: "#93c5fd",
                }}
              >
                Protection anti-fraude & jetons cryptés
              </span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
