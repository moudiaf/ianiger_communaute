import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const ShorAlgorithmScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 } });
  const shatterProgress = Math.min(1, Math.max(0, (frame - 120) / 60));
  const flash = frame > 120 && frame < 135 ? 0.3 : 0;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "80px 40px",
        background: `radial-gradient(circle at 50% 45%, #2a0b18 0%, #060911 100%)`,
        color: "#fff",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Light Flash Effect on Shatter */}
      {flash > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#ffffff",
            opacity: flash,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Background Matrix */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage: "linear-gradient(#ff0055 1px, transparent 1px), linear-gradient(90deg, #ff0055 1px, transparent 1px)",
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
          background: "rgba(255, 0, 85, 0.2)",
          border: "2px solid #ff0055",
          color: "#ff0055",
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: 3,
          textTransform: "uppercase",
          boxShadow: "0 0 30px rgba(255, 0, 85, 0.4)",
        }}
      >
        L'ALGORITHME DE SHOR (1994)
      </div>

      {/* Main Punch Title */}
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 52, fontWeight: 900, margin: "0 0 16px 0", lineHeight: 1.15 }}>
          LE CHOC RSA : <span style={{ color: "#ff0055" }}>PULVÉRISÉ</span>
        </h2>
        <p style={{ fontSize: 24, color: "#cbd5e1", margin: 0 }}>
          Un calcul qui demandait des millénaires résolu pendant votre café
        </p>
      </div>

      {/* Shattering Padlock / Key Breakdown */}
      <div
        style={{
          position: "relative",
          width: 380,
          height: 380,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Intact Shackle opening */}
        <div
          style={{
            position: "absolute",
            width: 180,
            height: 180,
            border: "22px solid #ff0055",
            borderBottom: "none",
            borderTopLeftRadius: 90,
            borderTopRightRadius: 90,
            transform: `translateY(${-40 - shatterProgress * 80}px) rotate(${shatterProgress * 35}deg)`,
            opacity: 1 - shatterProgress * 0.4,
            boxShadow: "0 0 40px rgba(255, 0, 85, 0.6)",
          }}
        />

        {/* Lock Body Fissured */}
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 240,
            top: 140,
            borderRadius: 24,
            background: "linear-gradient(145deg, #1f1118, #0d060a)",
            border: "3px solid #ff0055",
            boxShadow: "0 0 60px rgba(255, 0, 85, 0.5)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${1 + shatterProgress * 0.1})`,
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 900,
              color: frame > 120 ? "#ff0055" : "#00f0ff",
              letterSpacing: 3,
            }}
          >
            {frame > 120 ? "DÉVERROUILLÉ !" : "RSA-4096 BIT"}
          </div>
          <div style={{ fontSize: 18, color: "#94a3b8", marginTop: 8 }}>
            Facteurs premiers trouvés en O(n³)
          </div>
        </div>
      </div>

      {/* Q-Day Countdown / Threat Banner */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          borderRadius: 20,
          background: "rgba(255, 0, 85, 0.1)",
          border: "2px solid rgba(255, 0, 85, 0.6)",
          padding: "24px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ fontSize: 20, color: "#ff80aa", fontWeight: 700, textTransform: "uppercase" }}>
            Menace Cybersécurité Mondiale
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
            LE "Q-DAY" APPROCHE
          </div>
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: "#ff0055",
            textShadow: "0 0 30px #ff0055",
            letterSpacing: 2,
          }}
        >
          04:00 MIN
        </div>
      </div>
    </AbsoluteFill>
  );
};

