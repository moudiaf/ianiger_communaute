import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const AiAnalysisScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Assistant Window entrance
  const winProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const winY = interpolate(winProgress, [0, 1], [60, 0]);
  const winOpacity = interpolate(winProgress, [0, 1], [0, 1]);

  // AI response line 1
  const line1Progress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Clues breakdown
  const clue1 = spring({ frame: frame - 45, fps, config: { damping: 14 } });
  const clue2 = spring({ frame: frame - 65, fps, config: { damping: 14 } });
  const clue3 = spring({ frame: frame - 85, fps, config: { damping: 14 } });

  // Human Vigilance Transition (starts at frame 115 / ~19s)
  const humanProgress = spring({
    frame: frame - 115,
    fps,
    config: { damping: 15, stiffness: 110 },
  });
  const humanOpacity = interpolate(humanProgress, [0, 1], [0, 1]);
  const humanScale = interpolate(humanProgress, [0, 1], [0.85, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070c18",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Grotesk', -apple-system, sans-serif",
        padding: "40px 60px",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, rgba(7, 12, 24, 0.95) 75%)",
        }}
      />

      {/* Main Grid: Shows AI Assistant UI on left/center, then Human Mind Shield */}
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: 1600,
          gap: 40,
          zIndex: 10,
        }}
      >
        {/* Left Card: AI Assistant Interface */}
        <div
          style={{
            flex: 1,
            transform: `translateY(${winY}px)`,
            opacity: winOpacity,
            borderRadius: 24,
            background: "linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))",
            border: "1.5px solid rgba(16, 185, 129, 0.35)",
            boxShadow:
              "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(16, 185, 129, 0.2)",
            padding: 30,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              paddingBottom: 16,
              marginBottom: 20,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: "#10B981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0F172A",
                  fontWeight: 900,
                  fontSize: 18,
                }}
              >
                🤖
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#F8FAFC" }}>
                  Assistant IA • Détection Phishing
                </div>
                <div style={{ fontSize: 13, color: "#10B981", fontWeight: 600 }}>
                  ● Analyse sémantique en temps réel
                </div>
              </div>
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#94A3B8",
                background: "rgba(15, 23, 42, 0.6)",
                padding: "6px 14px",
                borderRadius: 20,
              }}
            >
              GPT-4 / Modèle de sécurité
            </div>
          </div>

          {/* User Prompt */}
          <div
            style={{
              backgroundColor: "rgba(51, 65, 85, 0.5)",
              borderRadius: 14,
              padding: "12px 18px",
              marginBottom: 18,
              borderLeft: "4px solid #38BDF8",
            }}
          >
            <div style={{ fontSize: 13, color: "#94A3B8", marginBottom: 4 }}>VOUS :</div>
            <div style={{ fontSize: 16, color: "#F1F5F9", fontStyle: "italic" }}>
              « Peux-tu analyser ce message : 'Félicitations ! Vous avez gagné 500 000 FCFA...' ? »
            </div>
          </div>

          {/* AI Critical Response */}
          {frame >= 25 && (
            <div
              style={{
                opacity: line1Progress,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.15)",
                  border: "1.5px solid #EF4444",
                  borderRadius: 12,
                  padding: "12px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 24 }}>🚨</span>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#FCA5A5" }}>
                    ALERTE : TENTATIVE D'ESCROQUERIE (99.8%)
                  </div>
                  <div style={{ fontSize: 13, color: "#FEE2E2" }}>
                    Indices d'ingénierie sociale confirmés. Ne cliquez sous aucun prétexte.
                  </div>
                </div>
              </div>

              {/* Clues */}
              {frame >= 45 && (
                <div
                  style={{
                    opacity: clue1,
                    transform: `translateX(${interpolate(clue1, [0, 1], [-20, 0])}px)`,
                    background: "rgba(15, 23, 42, 0.6)",
                    padding: "10px 16px",
                    borderRadius: 10,
                    borderLeft: "4px solid #EF4444",
                    fontSize: 15,
                    color: "#F8FAFC",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span style={{ color: "#EF4444", fontWeight: 800 }}>❌ INDICE 1 :</span>
                  <span>Fausse promesse de gain soudain sans participation préalable.</span>
                </div>
              )}

              {frame >= 65 && (
                <div
                  style={{
                    opacity: clue2,
                    transform: `translateX(${interpolate(clue2, [0, 1], [-20, 0])}px)`,
                    background: "rgba(15, 23, 42, 0.6)",
                    padding: "10px 16px",
                    borderRadius: 10,
                    borderLeft: "4px solid #F59E0B",
                    fontSize: 15,
                    color: "#F8FAFC",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span style={{ color: "#F59E0B", fontWeight: 800 }}>❌ INDICE 2 :</span>
                  <span>Lien URL frauduleux ne correspondant à aucun organisme officiel.</span>
                </div>
              )}

              {frame >= 85 && (
                <div
                  style={{
                    opacity: clue3,
                    transform: `translateX(${interpolate(clue3, [0, 1], [-20, 0])}px)`,
                    background: "rgba(15, 23, 42, 0.6)",
                    padding: "10px 16px",
                    borderRadius: 10,
                    borderLeft: "4px solid #38BDF8",
                    fontSize: 15,
                    color: "#F8FAFC",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span style={{ color: "#38BDF8", fontWeight: 800 }}>❌ INDICE 3 :</span>
                  <span>Fautes de ponctuation et sentiment d'urgence trompeur.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Card: Critical Thinking / Human Vigilance */}
        {frame >= 115 && (
          <div
            style={{
              width: 580,
              opacity: humanOpacity,
              transform: `scale(${humanScale})`,
              borderRadius: 24,
              background: "linear-gradient(145deg, rgba(30, 58, 138, 0.4), rgba(15, 23, 42, 0.95))",
              border: "2px solid #38BDF8",
              boxShadow: "0 0 40px rgba(56, 189, 248, 0.3)",
              padding: 36,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "radial-gradient(circle, #38BDF8 0%, #1E3A8A 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 50,
                marginBottom: 20,
                boxShadow: "0 0 30px rgba(56, 189, 248, 0.6)",
              }}
            >
              🧠
            </div>

            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: "#38BDF8",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Le Rôle de l'Humain
            </div>

            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: "#FFFFFF",
                lineHeight: 1.2,
                marginBottom: 16,
              }}
            >
              L'IA Détecte, <br />
              <span style={{ color: "#FACC15" }}>Votre Vigilance Décide</span>
            </div>

            <div
              style={{
                fontSize: 17,
                color: "#CBD5E1",
                lineHeight: 1.5,
                fontWeight: 500,
              }}
            >
              L'intelligence artificielle est un allié précieux pour analyser les menaces, mais votre esprit critique reste votre premier et meilleur rempart.
            </div>

            <div
              style={{
                marginTop: 24,
                padding: "8px 20px",
                borderRadius: 20,
                backgroundColor: "rgba(56, 189, 248, 0.15)",
                border: "1px solid rgba(56, 189, 248, 0.4)",
                fontSize: 14,
                fontWeight: 700,
                color: "#BAE6FD",
              }}
            >
              🛡️ Esprit critique actif
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

