import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const OutroDevWebScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const logoProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const logoScale = interpolate(logoProgress, [0, 1], [0.7, 1]);
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);

  // Slogan entrance
  const sloganProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const sloganY = interpolate(sloganProgress, [0, 1], [30, 0]);
  const sloganOpacity = interpolate(sloganProgress, [0, 1], [0, 1]);

  // CTA button entrance
  const ctaProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 15, stiffness: 130 },
  });
  const ctaScale = interpolate(ctaProgress, [0, 1], [0.9, 1]);
  const ctaOpacity = interpolate(ctaProgress, [0, 1], [0, 1]);

  // Rotating cyber ring
  const haloRotate = interpolate(frame, [0, 450], [0, 90]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050914",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Grotesk', -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.22) 0%, rgba(139, 92, 246, 0.12) 40%, rgba(5, 9, 20, 0.98) 80%)",
        }}
      />

      {/* Rotating Cyber Ring */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: "2px dashed rgba(56, 189, 248, 0.15)",
          transform: `rotate(${haloRotate}deg)`,
        }}
      />

      {/* Main Lockup */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          zIndex: 10,
        }}
      >
        {/* Emblem */}
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: 36,
            background: "linear-gradient(135deg, #0284C7, #7C3AED)",
            boxShadow:
              "0 20px 60px rgba(14, 165, 233, 0.5), inset 0 2px 4px rgba(255,255,255,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 64,
            marginBottom: 24,
          }}
        >
          🚀
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: -1,
            textTransform: "uppercase",
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          Le Web Moderne <span style={{ color: "#38BDF8" }}>Propulsé par l'IA</span>
        </div>

        {/* Slogan */}
        <div
          style={{
            transform: `translateY(${sloganY}px)`,
            opacity: sloganOpacity,
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#FACC15",
            marginBottom: 32,
          }}
        >
          <span>Imaginer</span>
          <span style={{ color: "#64748B" }}>•</span>
          <span>Générer</span>
          <span style={{ color: "#64748B" }}>•</span>
          <span>Déployer</span>
        </div>

        {/* Tech Stack Pills */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 36,
          }}
        >
          {["v0", "Cursor", "Next.js 15", "Supabase", "Vercel"].map((tech) => (
            <div
              key={tech}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                padding: "8px 18px",
                borderRadius: 20,
                color: "#E2E8F0",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      {frame >= 60 && (
        <div
          style={{
            transform: `scale(${ctaScale})`,
            opacity: ctaOpacity,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              background: "linear-gradient(90deg, #38BDF8, #818CF8)",
              color: "#0B1120",
              padding: "18px 42px",
              borderRadius: 40,
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: 0.5,
              boxShadow: "0 10px 40px rgba(56, 189, 248, 0.5)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span>✨</span> Lancez votre site dès aujourd'hui !
          </div>
          <div style={{ fontSize: 16, color: "#94A3B8", fontWeight: 600 }}>
            Votre idée en ligne en moins de 60 secondes
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

