import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const LockRsaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 } });
  const pulse = Math.sin(frame / 6) * 0.05 + 1;
  const lockShake = frame > 280 ? Math.sin(frame * 2) * 4 : 0;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 40px",
        background: "radial-gradient(circle at 50% 35%, #131b2e 0%, #060911 100%)",
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
          backgroundImage: "linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top Cyber Badge */}
      <div
        style={{
          transform: `translateY(${(1 - entrance) * -40}px)`,
          opacity: entrance,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 24px",
          borderRadius: 999,
          background: "rgba(255, 0, 85, 0.15)",
          border: "1px solid rgba(255, 0, 85, 0.5)",
          color: "#ff3366",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 3,
          textTransform: "uppercase",
          marginBottom: 40,
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff3366", boxShadow: "0 0 10px #ff3366" }} />
        Alerte Sécurité Cyber
      </div>

      {/* Main Hook Title */}
      <h1
        style={{
          transform: `scale(${entrance})`,
          fontSize: 54,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.15,
          maxWidth: 950,
          margin: "0 0 30px 0",
          background: "linear-gradient(180deg, #ffffff 0%, #94a3b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        LE JOUR OÙ TOUS NOS MOTS DE PASSE SERONT DÉCHIFFRÉS
      </h1>

      {/* Giant Cyber Padlock Visual */}
      <div
        style={{
          transform: `translateY(${lockShake}px) scale(${pulse})`,
          position: "relative",
          width: 320,
          height: 380,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "30px 0",
        }}
      >
        {/* Padlock Shackle */}
        <div
          style={{
            width: 170,
            height: 160,
            border: "22px solid #00f0ff",
            borderBottom: "none",
            borderTopLeftRadius: 90,
            borderTopRightRadius: 90,
            boxShadow: "0 0 35px rgba(0, 240, 255, 0.5), inset 0 0 20px rgba(0, 240, 255, 0.3)",
          }}
        />
        {/* Padlock Body */}
        <div
          style={{
            width: 280,
            height: 220,
            marginTop: -20,
            borderRadius: 28,
            background: "linear-gradient(145deg, #1e293b, #0f172a)",
            border: "3px solid #00f0ff",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.8), 0 0 50px rgba(0, 240, 255, 0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Keyhole Glow */}
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: frame > 280 ? "#ff0055" : "#00f0ff",
              boxShadow: frame > 280 ? "0 0 25px #ff0055" : "0 0 25px #00f0ff",
            }}
          />
          <div
            style={{
              width: 14,
              height: 45,
              background: frame > 280 ? "#ff0055" : "#00f0ff",
              marginTop: -6,
              borderRadius: 6,
              boxShadow: frame > 280 ? "0 0 25px #ff0055" : "0 0 25px #00f0ff",
            }}
          />
          <div style={{ marginTop: 20, fontSize: 18, color: "#38bdf8", fontWeight: 700, letterSpacing: 2 }}>
            RSA-4096 BIT
          </div>
        </div>
      </div>

      {/* Time Comparison Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          background: "rgba(15, 23, 42, 0.85)",
          border: "1px solid rgba(56, 189, 248, 0.3)",
          backdropFilter: "blur(12px)",
          borderRadius: 24,
          padding: "30px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 24, color: "#94a3b8", fontWeight: 600 }}>Supercalculateur classique</span>
          <span style={{ fontSize: 32, color: "#ef4444", fontWeight: 900 }}>10 Milliards d'années</span>
        </div>
        <div style={{ width: "100%", height: 10, background: "rgba(255,255,255,0.1)", borderRadius: 5, overflow: "hidden" }}>
          <div style={{ width: "3%", height: "100%", background: "#ef4444" }} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
          <span style={{ fontSize: 24, color: "#00f0ff", fontWeight: 700 }}>Ordinateur Quantique</span>
          <span style={{ fontSize: 38, color: "#00f0ff", fontWeight: 900, textShadow: "0 0 20px rgba(0,240,255,0.7)" }}>
            &lt; 4 MINUTES
          </span>
        </div>
        <div style={{ width: "100%", height: 10, background: "rgba(255,255,255,0.1)", borderRadius: 5, overflow: "hidden" }}>
          <div style={{ width: `${Math.min(100, (frame / 200) * 100)}%`, height: "100%", background: "linear-gradient(90deg, #00f0ff, #8b5cf6)" }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

