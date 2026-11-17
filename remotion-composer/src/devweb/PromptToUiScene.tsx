import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const PromptToUiScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera zoom
  const scale = interpolate(frame, [0, 360], [1, 1.05], {
    extrapolateRight: "clamp",
  });

  // Prompt typing simulation
  const fullPrompt = "Crée une plateforme SaaS moderne avec dark mode, statistiques en temps réel et paiement Stripe...";
  const charsTyped = Math.floor(
    interpolate(frame, [15, 90], [0, fullPrompt.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const currentPrompt = fullPrompt.slice(0, charsTyped);

  // UI generation transition at frame 105 (~3.5s)
  const uiGenProgress = spring({
    frame: frame - 105,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const uiOpacity = interpolate(uiGenProgress, [0, 1], [0, 1]);
  const uiScale = interpolate(uiGenProgress, [0, 1], [0.92, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070c18",
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Grotesk', -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 30%, rgba(14, 165, 233, 0.22) 0%, rgba(7, 12, 24, 0.95) 75%)",
        }}
      />

      {/* Cyber Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.5,
        }}
      />

      {/* Top Header Tag */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 24px",
          borderRadius: 30,
          backgroundColor: "rgba(14, 165, 233, 0.15)",
          border: "1px solid rgba(14, 165, 233, 0.4)",
          color: "#38BDF8",
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          marginBottom: 20,
          zIndex: 10,
        }}
      >
        <span>⚡</span> LE DÉVELOPPEMENT WEB EN 2026
      </div>

      {/* Browser Window Mockup */}
      <div
        style={{
          width: 1400,
          height: 760,
          borderRadius: 24,
          backgroundColor: "#0F172A",
          border: "2px solid rgba(255, 255, 255, 0.15)",
          boxShadow:
            "0 30px 80px rgba(0, 0, 0, 0.7), 0 0 50px rgba(14, 165, 233, 0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        {/* Browser Chrome Header */}
        <div
          style={{
            height: 52,
            backgroundColor: "#1E293B",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            gap: 16,
          }}
        >
          {/* Traffic Lights */}
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#EF4444" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#10B981" }} />
          </div>

          {/* URL Bar */}
          <div
            style={{
              flex: 1,
              maxWidth: 600,
              height: 32,
              borderRadius: 8,
              backgroundColor: "#0F172A",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
              gap: 8,
              fontSize: 14,
              color: "#94A3B8",
            }}
          >
            <span>🔒</span>
            <span style={{ color: "#38BDF8", fontWeight: 600 }}>https://v0.dev/studio</span>
          </div>

          <div style={{ marginLeft: "auto", display: "flex", gap: 8, color: "#94A3B8", fontSize: 13, fontWeight: 700 }}>
            <span style={{ color: "#10B981" }}>● IA Prête</span>
          </div>
        </div>

        {/* Browser Content Area */}
        <div
          style={{
            flex: 1,
            position: "relative",
            backgroundColor: "#0B1120",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 30,
          }}
        >
          {/* Prompt Bar (Active in first part) */}
          {frame < 120 && (
            <div
              style={{
                width: 1000,
                borderRadius: 20,
                background: "linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))",
                border: "2px solid rgba(14, 165, 233, 0.5)",
                boxShadow: "0 10px 40px rgba(14, 165, 233, 0.25)",
                padding: "24px 30px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 800, color: "#38BDF8" }}>
                <span>✨</span> PROMPT IA GÉNÉRATIVE DE SITE WEB
              </div>
              <div style={{ fontSize: 24, fontWeight: 600, color: "#F8FAFC", minHeight: 70, lineHeight: 1.4 }}>
                {currentPrompt}
                <span style={{ borderRight: "3px solid #38BDF8", marginLeft: 4, animation: "blink 1s infinite" }}>|</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: "#64748B" }}>Génération React 19 + Tailwind v4 + Next.js</span>
                <div
                  style={{
                    backgroundColor: frame >= 90 ? "#10B981" : "#0284C7",
                    color: "#FFFFFF",
                    fontWeight: 800,
                    fontSize: 16,
                    padding: "10px 24px",
                    borderRadius: 12,
                    boxShadow: "0 0 20px rgba(14, 165, 233, 0.4)",
                  }}
                >
                  {frame >= 90 ? "🚀 Génération en cours..." : "✨ Générer le Site"}
                </div>
              </div>
            </div>
          )}

          {/* Generated UI Reveal (After frame 105) */}
          {frame >= 105 && (
            <div
              style={{
                position: "absolute",
                inset: 20,
                opacity: uiOpacity,
                transform: `scale(${uiScale})`,
                backgroundColor: "#0F172A",
                borderRadius: 16,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                flexDirection: "column",
                padding: 24,
                overflow: "hidden",
              }}
            >
              {/* Site Mock Nav */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: 16, marginBottom: 24 }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#FFFFFF", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#38BDF8" }}>❖</span> NovaSaaS <span style={{ fontSize: 13, backgroundColor: "#10B981", color: "#061325", padding: "2px 8px", borderRadius: 8 }}>v1.0 En ligne</span>
                </div>
                <div style={{ display: "flex", gap: 24, color: "#94A3B8", fontSize: 15, fontWeight: 600 }}>
                  <span>Fonctionnalités</span>
                  <span>Tarifs</span>
                  <span>Documentation</span>
                  <span style={{ color: "#38BDF8" }}>Connexion</span>
                </div>
              </div>

              {/* Site Hero Banner */}
              <div style={{ textAlign: "center", marginTop: 20, marginBottom: 30 }}>
                <div style={{ fontSize: 44, fontWeight: 900, color: "#F8FAFC", letterSpacing: -1, marginBottom: 10 }}>
                  Générez vos idées à la <span style={{ color: "#38BDF8" }}>vitesse de la lumière</span>
                </div>
                <div style={{ fontSize: 18, color: "#94A3B8", maxWidth: 700, margin: "0 auto" }}>
                  Plateforme tout-en-un conçue automatiquement par IA : code propre, base de données serverless et déploiement mondial instantané.
                </div>
              </div>

              {/* 3 Metric Cards */}
              <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
                <div style={{ flex: 1, backgroundColor: "#1E293B", padding: 20, borderRadius: 14, border: "1px solid rgba(14, 165, 233, 0.3)" }}>
                  <div style={{ fontSize: 14, color: "#94A3B8" }}>Temps de Création</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#38BDF8", marginTop: 4 }}>60 Secondes</div>
                </div>
                <div style={{ flex: 1, backgroundColor: "#1E293B", padding: 20, borderRadius: 14, border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                  <div style={{ fontSize: 14, color: "#94A3B8" }}>Performance Lighthouse</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#10B981", marginTop: 4 }}>100 / 100</div>
                </div>
                <div style={{ flex: 1, backgroundColor: "#1E293B", padding: 20, borderRadius: 14, border: "1px solid rgba(245, 158, 11, 0.3)" }}>
                  <div style={{ fontSize: 14, color: "#94A3B8" }}>Code Source</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#F59E0B", marginTop: 4 }}>React + Next.js</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

