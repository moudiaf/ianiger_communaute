import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const IaNigerOutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const logoScale = interpolate(logoProgress, [0, 1], [0.6, 1]);
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);

  // Slogan entrance
  const sloganProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const sloganY = interpolate(sloganProgress, [0, 1], [30, 0]);
  const sloganOpacity = interpolate(sloganProgress, [0, 1], [0, 1]);

  // CTA Banner entrance
  const ctaProgress = spring({
    frame: frame - 55,
    fps,
    config: { damping: 15, stiffness: 130 },
  });
  const ctaScale = interpolate(ctaProgress, [0, 1], [0.9, 1]);
  const ctaOpacity = interpolate(ctaProgress, [0, 1], [0, 1]);

  // Subtle rotating halo
  const haloRotate = interpolate(frame, [0, 210], [0, 60]);

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
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(0, 154, 68, 0.15) 0%, rgba(255, 130, 0, 0.08) 40%, rgba(5, 9, 20, 0.98) 80%)",
        }}
      />

      {/* Rotating Cyber Ring */}
      <div
        style={{
          position: "absolute",
          width: 640,
          height: 640,
          borderRadius: "50%",
          border: "2px dashed rgba(255, 255, 255, 0.12)",
          transform: `rotate(${haloRotate}deg)`,
        }}
      />

      {/* Main Logo & Branding Lockup */}
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
        {/* Emblem: Niger Colors Shield + AI Brain */}
        <div
          style={{
            position: "relative",
            width: 140,
            height: 140,
            borderRadius: 36,
            background: "linear-gradient(135deg, #111a2e, #0c1220)",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 154, 68, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          {/* Niger tri-color accent bar at top of emblem */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 6,
              borderTopLeftRadius: 36,
              borderTopRightRadius: 36,
              display: "flex",
              overflow: "hidden",
            }}
          >
            <div style={{ flex: 1, backgroundColor: "#E05206" }} />
            <div style={{ flex: 1, backgroundColor: "#FFFFFF" }} />
            <div style={{ flex: 1, backgroundColor: "#0DB14B" }} />
          </div>

          <div
            style={{
              fontSize: 64,
              filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))",
            }}
          >
            🇳🇪
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: -1,
            textTransform: "uppercase",
            marginBottom: 8,
            textAlign: "center",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
          }}
        >
          IA Niger <span style={{ color: "#38BDF8" }}>Communauté</span>
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
            marginBottom: 36,
          }}
        >
          <span>Apprendre</span>
          <span style={{ color: "#94A3B8" }}>•</span>
          <span>Partager</span>
          <span style={{ color: "#94A3B8" }}>•</span>
          <span>Innover</span>
        </div>
      </div>

      {/* CTA Box */}
      {frame >= 55 && (
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
              background: "linear-gradient(90deg, #10B981, #06B6D4)",
              color: "#061325",
              padding: "16px 36px",
              borderRadius: 40,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 0.5,
              boxShadow: "0 10px 30px rgba(16, 185, 129, 0.4)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span>🛡️</span> Reste vigilant, protège tes données !
          </div>

          <div
            style={{
              fontSize: 16,
              color: "#94A3B8",
              fontWeight: 600,
              letterSpacing: 1,
              marginTop: 4,
            }}
          >
            Rejoignez-nous : <span style={{ color: "#FFFFFF" }}>ianiger.org</span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

