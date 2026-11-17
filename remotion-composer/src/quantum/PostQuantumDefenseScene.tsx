import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const PostQuantumDefenseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 } });
  const pulseShield = Math.sin(frame / 6) * 0.05 + 1;
  const ctaPop = spring({ frame: frame - 150, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "80px 40px",
        background: "radial-gradient(circle at 50% 40%, #062a22 0%, #060911 100%)",
        color: "#fff",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Background Matrix Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          backgroundImage: "linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top Badge */}
      <div
        style={{
          transform: `translateY(${(1 - entrance) * -30}px)`,
          opacity: entrance,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 28px",
          borderRadius: 999,
          background: "rgba(16, 185, 129, 0.2)",
          border: "2px solid #10b981",
          color: "#34d399",
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: 3,
          textTransform: "uppercase",
          boxShadow: "0 0 30px rgba(16, 185, 129, 0.4)",
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }} />
        La Forteresse Post-Quantique
      </div>

      {/* Title */}
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 50, fontWeight: 900, margin: "0 0 14px 0", lineHeight: 1.15 }}>
          INTERNET EST <span style={{ color: "#34d399" }}>DÉJÀ PROTÉGÉ</span>
        </h2>
        <p style={{ fontSize: 24, color: "#cbd5e1", margin: 0 }}>
          Les nouveaux standards mondiaux du NIST basés sur les réseaux euclidiens
        </p>
      </div>

      {/* Futuristic Shield Visual */}
      <div
        style={{
          position: "relative",
          width: 340,
          height: 380,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${pulseShield})`,
        }}
      >
        {/* Outer Glow Shield Shape */}
        <div
          style={{
            width: 260,
            height: 320,
            borderRadius: "50% 50% 50% 50% / 30% 30% 70% 70%",
            background: "radial-gradient(circle at 50% 30%, rgba(16, 185, 129, 0.4) 0%, rgba(6, 78, 59, 0.9) 100%)",
            border: "4px solid #10b981",
            boxShadow: "0 0 60px rgba(16, 185, 129, 0.6), inset 0 0 30px rgba(16, 185, 129, 0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Shield Emblem Icon */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 35px #10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              color: "#022c22",
              fontWeight: 900,
            }}
          >
            ✓
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginTop: 18, letterSpacing: 2 }}>
            NIST FIPS 2024
          </div>
          <div style={{ fontSize: 16, color: "#a7f3d0", marginTop: 4, fontWeight: 700 }}>
            ML-KEM & ML-DSA
          </div>
        </div>
      </div>

      {/* Call to Action Bar */}
      <div
        style={{
          transform: `scale(${Math.max(0, ctaPop)})`,
          opacity: Math.max(0, ctaPop),
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "20px 48px",
          borderRadius: 999,
          background: "linear-gradient(90deg, #ef4444 0%, #b91c1c 100%)",
          boxShadow: "0 10px 40px rgba(239, 68, 68, 0.6)",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: 32 }}>🔔</span>
        <span style={{ fontSize: 32, fontWeight: 900, color: "#ffffff", letterSpacing: 2 }}>
          ABONNE-TOI POUR TOUT COMPRENDRE
        </span>
      </div>
    </AbsoluteFill>
  );
};

