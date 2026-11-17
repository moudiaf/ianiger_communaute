import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const BitVsQubitScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 } });
  const rotateDeg = frame * 3.5;
  const pulseQubit = Math.sin(frame / 5) * 0.08 + 1;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "80px 40px",
        background: "radial-gradient(circle at 50% 50%, #15102a 0%, #060911 100%)",
        color: "#fff",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Background Matrix Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage: "linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top Header */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div
          style={{
            transform: `translateY(${(1 - entrance) * -30}px)`,
            opacity: entrance,
            padding: "8px 24px",
            borderRadius: 999,
            background: "rgba(139, 92, 246, 0.2)",
            border: "1px solid rgba(139, 92, 246, 0.6)",
            color: "#a78bfa",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          LA RÉVOLUTION DU CALCUL
        </div>
        <h2 style={{ fontSize: 48, fontWeight: 900, margin: 0, textAlign: "center" }}>
          BIT CLASSIQUE <span style={{ color: "#a78bfa" }}>VS</span> QUBIT
        </h2>
      </div>

      {/* Comparison Cards Stack */}
      <div style={{ display: "flex", flexDirection: "column", gap: 40, width: "100%", maxWidth: 940 }}>
        {/* Card 1: Bit Classique */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.8)",
            border: "2px solid rgba(148, 163, 184, 0.3)",
            borderRadius: 24,
            padding: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 22, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>
              Ordinateur Classique
            </div>
            <div style={{ fontSize: 38, fontWeight: 900, color: "#f8fafc", marginTop: 4 }}>
              LE BIT : <span style={{ color: "#38bdf8" }}>0</span> OU <span style={{ color: "#38bdf8" }}>1</span>
            </div>
            <div style={{ fontSize: 20, color: "#cbd5e1", marginTop: 8 }}>
              Explore une seule combinaison à la fois (séquentiel)
            </div>
          </div>
          {/* Binary Switch Visual */}
          <div
            style={{
              width: 140,
              height: 70,
              borderRadius: 35,
              background: "#1e293b",
              border: "3px solid #38bdf8",
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
              justifyContent: frame % 40 > 20 ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: "#38bdf8",
                boxShadow: "0 0 20px #38bdf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 24,
                color: "#0f172a",
              }}
            >
              {frame % 40 > 20 ? "1" : "0"}
            </div>
          </div>
        </div>

        {/* Card 2: Qubit Quantique (Bloch Sphere) */}
        <div
          style={{
            background: "radial-gradient(circle at 70% 50%, rgba(139, 92, 246, 0.25) 0%, rgba(15, 23, 42, 0.9) 100%)",
            border: "2px solid #8b5cf6",
            borderRadius: 24,
            padding: "36px",
            boxShadow: "0 0 50px rgba(139, 92, 246, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 22, color: "#c084fc", fontWeight: 700, textTransform: "uppercase" }}>
              Ordinateur Quantique
            </div>
            <div style={{ fontSize: 40, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              LE QUBIT : <span style={{ color: "#00f0ff" }}>SUPERPOSITION</span>
            </div>
            <div style={{ fontSize: 20, color: "#e2e8f0", marginTop: 8, maxWidth: 520 }}>
              0 ET 1 à la fois ! Explore des milliards d'états simultanément.
            </div>
            <div
              style={{
                marginTop: 16,
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: 8,
                background: "rgba(0, 240, 255, 0.15)",
                border: "1px solid #00f0ff",
                color: "#00f0ff",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              Puissance exponentielle : 2ⁿ
            </div>
          </div>

          {/* Bloch Sphere Animation */}
          <div
            style={{
              position: "relative",
              width: 200,
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${pulseQubit})`,
            }}
          >
            {/* Outer Ring */}
            <div
              style={{
                position: "absolute",
                width: 180,
                height: 180,
                borderRadius: "50%",
                border: "3px dashed #8b5cf6",
                transform: `rotate(${rotateDeg}deg)`,
                boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
              }}
            />
            {/* Horizontal Orbit */}
            <div
              style={{
                position: "absolute",
                width: 170,
                height: 70,
                borderRadius: "50%",
                border: "3px solid #00f0ff",
                transform: `rotate(${rotateDeg * -1}deg)`,
                boxShadow: "0 0 25px rgba(0, 240, 255, 0.6)",
              }}
            />
            {/* Core Superposition Sphere */}
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #00f0ff 0%, #8b5cf6 60%, #1e1b4b 100%)",
                boxShadow: "0 0 40px #00f0ff, 0 0 60px #8b5cf6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                fontWeight: 900,
                color: "#fff",
              }}
            >
              |ψ⟩
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary Pill */}
      <div
        style={{
          padding: "16px 36px",
          borderRadius: 999,
          background: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          fontSize: 22,
          color: "#e2e8f0",
          textAlign: "center",
          maxWidth: 900,
        }}
      >
        Tandis qu'un PC normal essaie clé par clé... le quantique teste toutes les clés à la fois !
      </div>
    </AbsoluteFill>
  );
};

