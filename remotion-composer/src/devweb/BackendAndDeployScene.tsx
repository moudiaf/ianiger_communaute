import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const BackendAndDeployScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Step 3 (Supabase) entrance
  const step3Progress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const step3X = interpolate(step3Progress, [0, 1], [-80, 0]);
  const step3Opacity = interpolate(step3Progress, [0, 1], [0, 1]);

  // Step 4 (Deploy Vercel) entrance - around frame 180 (~6s in scene)
  const step4Progress = spring({
    frame: frame - 170,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const step4X = interpolate(step4Progress, [0, 1], [80, 0]);
  const step4Opacity = interpolate(step4Progress, [0, 1], [0, 1]);

  // Deploy animation counter
  const deployStep = Math.min(
    3,
    Math.floor(interpolate(frame, [200, 360], [0, 3], { extrapolateRight: "clamp" }))
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070c18",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Grotesk', -apple-system, sans-serif",
        padding: "40px 60px",
        overflow: "hidden",
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.16) 0%, rgba(7, 12, 24, 0.95) 75%)",
        }}
      />

      {/* Header Banner */}
      <div style={{ textAlign: "center", marginBottom: 28, zIndex: 10 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 24px",
            borderRadius: 30,
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            color: "#34D399",
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          <span>🌐</span> LA PUISSANCE DU FULLSTACK MODERNE
        </div>
        <div style={{ fontSize: 40, fontWeight: 900, color: "#FFFFFF", letterSpacing: -0.5 }}>
          Données Temps Réel <span style={{ color: "#34D399" }}>&</span> Déploiement Mondial
        </div>
      </div>

      {/* Two Columns Grid */}
      <div style={{ display: "flex", width: "100%", maxWidth: 1600, gap: 36, zIndex: 10 }}>
        {/* Left Column: Step 3 (Supabase) */}
        <div
          style={{
            flex: 1,
            transform: `translateX(${step3X}px)`,
            opacity: step3Opacity,
            borderRadius: 24,
            backgroundColor: "#0F172A",
            border: "2px solid rgba(16, 185, 129, 0.4)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(16, 185, 129, 0.2)",
            padding: 30,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: "#10B981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  color: "#0F172A",
                  fontWeight: 900,
                }}
              >
                🗄️
              </div>
              <div>
                <div style={{ fontSize: 13, color: "#34D399", fontWeight: 800, textTransform: "uppercase" }}>Étape 3</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF" }}>Données & Backend Instantané</div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgba(16, 185, 129, 0.15)", border: "1px solid #10B981", padding: "6px 14px", borderRadius: 20, color: "#A7F3D0", fontSize: 13, fontWeight: 700 }}>
              Supabase / PostgreSQL
            </div>
          </div>

          <div style={{ fontSize: 16, color: "#94A3B8", marginBottom: 20, lineHeight: 1.5 }}>
            Une base de données serverless connectée en quelques secondes : authentification des utilisateurs, API instantanées et synchronisation temps réel.
          </div>

          {/* Database Schema Visual */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }}>
            <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: "4px solid #10B981" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#F8FAFC", fontWeight: 700, fontSize: 14 }}>
                <span>👥</span> table `users` (id, email, role, avatar)
              </div>
              <span style={{ fontSize: 12, color: "#10B981", backgroundColor: "rgba(16, 185, 129, 0.2)", padding: "2px 8px", borderRadius: 6 }}>Auth OK</span>
            </div>
            <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: "4px solid #38BDF8" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#F8FAFC", fontWeight: 700, fontSize: 14 }}>
                <span>📦</span> table `products` (title, price, stock, images)
              </div>
              <span style={{ fontSize: 12, color: "#38BDF8", backgroundColor: "rgba(56, 189, 248, 0.2)", padding: "2px 8px", borderRadius: 6 }}>Realtime</span>
            </div>
            <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: "4px solid #F59E0B" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#F8FAFC", fontWeight: 700, fontSize: 14 }}>
                <span>💳</span> table `orders` (stripe_id, total, status)
              </div>
              <span style={{ fontSize: 12, color: "#F59E0B", backgroundColor: "rgba(245, 158, 11, 0.2)", padding: "2px 8px", borderRadius: 6 }}>Webhooks</span>
            </div>
          </div>
        </div>

        {/* Right Column: Step 4 (Deploy Vercel) */}
        <div
          style={{
            flex: 1,
            transform: `translateX(${step4X}px)`,
            opacity: frame >= 170 ? step4Opacity : 0.2,
            borderRadius: 24,
            backgroundColor: "#0B1120",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 255, 255, 0.15)",
            padding: 30,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  color: "#0F172A",
                  fontWeight: 900,
                }}
              >
                ▲
              </div>
              <div>
                <div style={{ fontSize: 13, color: "#CBD5E1", fontWeight: 800, textTransform: "uppercase" }}>Étape 4</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF" }}>Déploiement Mondial en 1 Clic</div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", border: "1px solid rgba(255, 255, 255, 0.4)", padding: "6px 14px", borderRadius: 20, color: "#FFFFFF", fontSize: 13, fontWeight: 700 }}>
              Vercel / Netlify
            </div>
          </div>

          <div style={{ fontSize: 16, color: "#94A3B8", marginBottom: 20, lineHeight: 1.5 }}>
            Votre code est automatiquement compilé, optimisé et distribué sur un réseau CDN mondial ultra-rapide avec certificat SSL gratuit.
          </div>

          {/* Deployment Status Terminal */}
          <div
            style={{
              backgroundColor: "#030712",
              borderRadius: 14,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: 16,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: 13,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginTop: "auto",
            }}
          >
            <div style={{ color: "#94A3B8" }}>$ git push origin main</div>
            {deployStep >= 1 && <div style={{ color: "#38BDF8" }}>✓ Build Next.js réussi (11.4s)</div>}
            {deployStep >= 2 && <div style={{ color: "#10B981" }}>✓ Déployé sur 300+ Edge Nodes mondiaux</div>}
            {deployStep >= 3 && (
              <div
                style={{
                  marginTop: 6,
                  padding: "8px 12px",
                  borderRadius: 8,
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid #10B981",
                  color: "#34D399",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>🔗 https://mon-site.vercel.app</span>
                <span style={{ fontSize: 11, backgroundColor: "#10B981", color: "#061325", padding: "2px 6px", borderRadius: 4 }}>200 OK</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

