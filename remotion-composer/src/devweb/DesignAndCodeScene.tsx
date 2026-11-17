import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const DesignAndCodeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Left card entrance (Step 1: v0 / Bolt)
  const leftProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const leftX = interpolate(leftProgress, [0, 1], [-80, 0]);
  const leftOpacity = interpolate(leftProgress, [0, 1], [0, 1]);

  // Right card entrance (Step 2: Cursor / Code) - starts around frame 180 (~6s in scene)
  const rightProgress = spring({
    frame: frame - 160,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const rightX = interpolate(rightProgress, [0, 1], [80, 0]);
  const rightOpacity = interpolate(rightProgress, [0, 1], [0, 1]);

  // Animated Code Lines typing
  const codeLines = [
    '// ✨ Composant généré automatiquement par Cursor IA',
    'export default function Navbar() {',
    '  const { user } = useAuth();',
    '  return (',
    '    <header className="flex justify-between items-center p-6 bg-slate-900">',
    '      <Logo brand="NovaWeb" variant="gradient" />',
    '      <nav className="flex gap-6 text-slate-300">',
    '        <Link href="/pricing">Tarifs</Link>',
    '        <Button className="bg-cyan-500 hover:bg-cyan-400">Démarrer</Button>',
    '      </nav>',
    '    </header>',
    '  );',
    '}',
  ];

  const visibleCodeCount = Math.floor(
    interpolate(frame, [190, 420], [1, codeLines.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
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
            "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.18) 0%, rgba(7, 12, 24, 0.95) 75%)",
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
            backgroundColor: "rgba(139, 92, 246, 0.15)",
            border: "1px solid rgba(139, 92, 246, 0.4)",
            color: "#C084FC",
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          <span>🚀</span> LES DEUX PILIERS DU DÉVELOPPEMENT IA
        </div>
        <div style={{ fontSize: 40, fontWeight: 900, color: "#FFFFFF", letterSpacing: -0.5 }}>
          Design Génératif <span style={{ color: "#38BDF8" }}>+</span> Code Intelligent
        </div>
      </div>

      {/* Two Columns Grid */}
      <div style={{ display: "flex", width: "100%", maxWidth: 1600, gap: 36, zIndex: 10 }}>
        {/* Left Column: Step 1 (v0 / Bolt) */}
        <div
          style={{
            flex: 1,
            transform: `translateX(${leftX}px)`,
            opacity: leftOpacity,
            borderRadius: 24,
            backgroundColor: "#0F172A",
            border: "2px solid rgba(56, 189, 248, 0.4)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.2)",
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
                  backgroundColor: "#38BDF8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  color: "#0F172A",
                  fontWeight: 900,
                }}
              >
                🎨
              </div>
              <div>
                <div style={{ fontSize: 13, color: "#38BDF8", fontWeight: 800, textTransform: "uppercase" }}>Étape 1</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF" }}>Le Design Génératif</div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgba(56, 189, 248, 0.15)", border: "1px solid #38BDF8", padding: "6px 14px", borderRadius: 20, color: "#BAE6FD", fontSize: 13, fontWeight: 700 }}>
              v0.dev / Bolt.new
            </div>
          </div>

          <div style={{ fontSize: 16, color: "#94A3B8", marginBottom: 20, lineHeight: 1.5 }}>
            Décrivez votre vision en français ou en anglais. L'IA génère en quelques secondes des composants React modernes, totalement interactifs et responsives.
          </div>

          {/* Interactive Previews Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "auto" }}>
            <div style={{ backgroundColor: "#1E293B", borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, borderLeft: "4px solid #10B981" }}>
              <span style={{ fontSize: 20 }}>📱</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#F8FAFC" }}>100% Mobile First & Responsive</div>
                <div style={{ fontSize: 13, color: "#94A3B8" }}>Adaptation parfaite aux smartphones, tablettes et écrans larges</div>
              </div>
            </div>
            <div style={{ backgroundColor: "#1E293B", borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, borderLeft: "4px solid #38BDF8" }}>
              <span style={{ fontSize: 20 }}>🧩</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#F8FAFC" }}>Composants Shadcn & Tailwind v4</div>
                <div style={{ fontSize: 13, color: "#94A3B8" }}>Code propre et modulaire prêt pour la production</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Step 2 (Cursor / Code) */}
        <div
          style={{
            flex: 1,
            transform: `translateX(${rightX}px)`,
            opacity: frame >= 160 ? rightOpacity : 0.2,
            borderRadius: 24,
            backgroundColor: "#0B1120",
            border: "2px solid rgba(192, 132, 252, 0.4)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(192, 132, 252, 0.2)",
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
                  backgroundColor: "#C084FC",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  color: "#0F172A",
                  fontWeight: 900,
                }}
              >
                💻
              </div>
              <div>
                <div style={{ fontSize: 13, color: "#C084FC", fontWeight: 800, textTransform: "uppercase" }}>Étape 2</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF" }}>L'Édition Assistée par IA</div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgba(192, 132, 252, 0.15)", border: "1px solid #C084FC", padding: "6px 14px", borderRadius: 20, color: "#E9D5FF", fontSize: 13, fontWeight: 700 }}>
              Cursor / Claude Code
            </div>
          </div>

          {/* IDE Terminal Mockup */}
          <div
            style={{
              backgroundColor: "#030712",
              borderRadius: 14,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: 16,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: 13,
              lineHeight: 1.5,
              color: "#E2E8F0",
              flex: 1,
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", gap: 8, alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 8, marginBottom: 10, color: "#94A3B8", fontSize: 12 }}>
              <span style={{ color: "#38BDF8" }}>⚡ Cursor IDE</span>
              <span>• Navbar.tsx</span>
              <span style={{ marginLeft: "auto", color: "#10B981" }}>● Agent IA Actif</span>
            </div>

            {codeLines.slice(0, visibleCodeCount).map((line, idx) => (
              <div key={idx} style={{ whiteSpace: "pre", color: line.startsWith("//") ? "#64748B" : line.includes("export") || line.includes("return") ? "#C084FC" : line.includes("className") ? "#38BDF8" : "#E2E8F0" }}>
                {line}
              </div>
            ))}
            {frame >= 190 && visibleCodeCount < codeLines.length && (
              <span style={{ borderRight: "2px solid #38BDF8", animation: "blink 1s infinite" }}> </span>
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

