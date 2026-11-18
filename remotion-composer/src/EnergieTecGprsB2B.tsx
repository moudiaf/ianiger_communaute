import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CaptionOverlay, WordCaption } from "./components/CaptionOverlay";
import { resolveAsset } from "./lib/resolveAsset";
import defaultCaptions from "./gprs_b2b/captions.json";

export interface EnergieTecGprsB2BProps {
  narrationSrc?: string;
  soundtrackSrc?: string;
  narrationVolume?: number;
  musicVolume?: number;
  showCaptions?: boolean;
}

const Scene1Meters: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const textSpring = spring({ frame: frame - 6, fps, config: { damping: 14, stiffness: 85 } });
  const imgSpring = spring({ frame: frame - 12, fps, config: { damping: 15, stiffness: 80 } });
  const pulse = Math.sin(frame / 10) * 0.03 + 1.0;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 25% 50%, #0e3a75 0%, #090d16 78%)",
        fontFamily: "Space Grotesk, sans-serif",
        padding: "70px 100px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 70,
      }}
    >
      {/* Left: Meters Crop */}
      <div
        style={{
          opacity: interpolate(imgSpring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(imgSpring, [0, 1], [0.9, 1]) * pulse})`,
          padding: 20,
          borderRadius: 30,
          background: "rgba(255, 255, 255, 0.96)",
          border: "3px solid #38bdf8",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(56, 189, 248, 0.35)",
          flexShrink: 0,
        }}
      >
        <Img
          src={resolveAsset("gprs_b2b/meters_gprs.jpg")}
          style={{ width: 580, height: 520, objectFit: "contain", borderRadius: 16 }}
        />
      </div>

      {/* Right: B2B Headline */}
      <div
        style={{
          flex: 1,
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
          transform: `translateX(${interpolate(textSpring, [0, 1], [40, 0])}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <span
          style={{
            alignSelf: "flex-start",
            padding: "10px 28px",
            borderRadius: 999,
            background: "rgba(249, 115, 22, 0.2)",
            border: "2px solid #f97316",
            color: "#fb923c",
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: 2,
          }}
        >
          ⚡ COMPTEURS PRÉPAYÉS INTELLIGENTS • 2G / 4G
        </span>

        <h1 style={{ fontSize: 72, fontWeight: 900, color: "#ffffff", margin: 0, lineHeight: 1.12 }}>
          STE18-G & STE38-G
        </h1>
        <h2 style={{ fontSize: 40, fontWeight: 700, color: "#38bdf8", margin: 0 }}>
          Monophasé & Triphasé avec Module GPRS Intégré
        </h2>

        <p style={{ fontSize: 30, color: "#cbd5e1", lineHeight: 1.45, margin: 0 }}>
          Conçus pour les compagnies d'électricité et réseaux de distribution en Afrique.
        </p>
      </div>
    </AbsoluteFill>
  );
};

const Scene2Benefits: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cards = [
    {
      icon: "🚫",
      title: "Pas de passerelle DCU",
      desc: "Module GPRS intégré à l'intérieur : réduction immédiate du coût matériel.",
      color: "#f97316",
      delay: 12,
    },
    {
      icon: "🌍",
      title: "Aucune limite de distance",
      desc: "S'adapte à tous types de bâtiments, zones urbaines ou rurales isolées.",
      color: "#38bdf8",
      delay: 42,
    },
    {
      icon: "📡",
      title: "Réseau fiable 2G & 4G",
      desc: "Lecture des index, recharge STS et coupure/remise sous tension à distance.",
      color: "#22c55e",
      delay: 72,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 35%, #111827 0%, #090d16 80%)",
        fontFamily: "Space Grotesk, sans-serif",
        padding: "70px 100px",
      }}
    >
      <h2 style={{ fontSize: 56, fontWeight: 900, color: "#ffffff", margin: "0 0 46px 0", textAlign: "center" }}>
        Pourquoi choisir le comptage <span style={{ color: "#38bdf8" }}>GPRS 2G/4G</span> ?
      </h2>

      <div style={{ display: "flex", gap: 36, flex: 1, alignItems: "center" }}>
        {cards.map((c, idx) => {
          const sp = spring({ frame: frame - c.delay, fps, config: { damping: 14, stiffness: 90 } });
          return (
            <div
              key={idx}
              style={{
                flex: 1,
                height: 460,
                opacity: interpolate(sp, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(sp, [0, 1], [40, 0])}px)`,
                padding: "42px 34px",
                borderRadius: 28,
                background: "rgba(17, 24, 39, 0.92)",
                border: `2.5px solid ${c.color}`,
                boxShadow: `0 16px 45px rgba(0,0,0,0.6), 0 0 28px ${c.color}33`,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <span style={{ fontSize: 64 }}>{c.icon}</span>
              <h3 style={{ fontSize: 36, fontWeight: 900, color: c.color, margin: 0 }}>{c.title}</h3>
              <p style={{ fontSize: 28, color: "#e2e8f0", lineHeight: 1.45, margin: 0 }}>{c.desc}</p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Scene3Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dashSpring = spring({ frame: frame - 8, fps, config: { damping: 15, stiffness: 85 } });
  const zoom = interpolate(frame, [0, 256], [1.0, 1.07], { extrapolateRight: "clamp" });

  const kpis = [
    { label: "Disponibilité", val: "98.6%", color: "#22c55e" },
    { label: "Pertes Réseau", val: "1.4%", color: "#f97316" },
    { label: "Compteurs Actifs", val: "507 / 514", color: "#38bdf8" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 40%, #1c1008 0%, #090d16 80%)",
        fontFamily: "Space Grotesk, sans-serif",
        padding: "55px 80px 120px 80px",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 26 }}>
        <span
          style={{
            padding: "8px 24px",
            borderRadius: 999,
            background: "rgba(249, 115, 22, 0.2)",
            border: "2px solid #f97316",
            color: "#fb923c",
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          🇳🇪 SUPERVISION NATIONALE • NIGELEC
        </span>
        <h2 style={{ fontSize: 46, fontWeight: 900, color: "#ffffff", margin: 0 }}>
          e-EnergieTEC Smart Metering
        </h2>
      </div>

      {/* Dashboard Screenshot with subtle zoom */}
      <div
        style={{
          opacity: interpolate(dashSpring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(dashSpring, [0, 1], [0.94, 1])})`,
          width: "100%",
          maxWidth: 1460,
          height: 640,
          borderRadius: 26,
          overflow: "hidden",
          border: "2.5px solid rgba(249, 115, 22, 0.75)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.85), 0 0 36px rgba(249, 115, 22, 0.25)",
        }}
      >
        <Img
          src={resolveAsset("gprs_b2b/dashboard.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${zoom})`,
          }}
        />
      </div>

      {/* KPI Highlight Pills */}
      <div style={{ display: "flex", gap: 32, marginTop: 28 }}>
        {kpis.map((k) => (
          <div
            key={k.label}
            style={{
              padding: "14px 30px",
              borderRadius: 18,
              background: "rgba(17, 24, 39, 0.92)",
              border: `2px solid ${k.color}`,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span style={{ fontSize: 24, color: "#cbd5e1", fontWeight: 700 }}>{k.label} :</span>
            <span style={{ fontSize: 30, color: k.color, fontWeight: 900 }}>{k.val}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Scene4CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame: frame - 6, fps, config: { damping: 14, stiffness: 90 } });
  const pulse = Math.sin(frame / 7) * 0.04 + 1.0;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 45%, #0e3a75 0%, #090d16 80%)",
        fontFamily: "Space Grotesk, sans-serif",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
        textAlign: "center",
      }}
    >
      <div
        style={{
          opacity: interpolate(sp, [0, 1], [0, 1]),
          transform: `scale(${interpolate(sp, [0, 1], [0.92, 1])})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
        }}
      >
        <span
          style={{
            padding: "12px 32px",
            borderRadius: 999,
            background: "rgba(56, 189, 248, 0.18)",
            border: "2px solid #38bdf8",
            color: "#38bdf8",
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: 2,
          }}
        >
          COMPAGNIES D'ÉLECTRICITÉ & DISTRIBUTEURS
        </span>

        <h2 style={{ fontSize: 68, fontWeight: 900, color: "#ffffff", margin: 0, lineHeight: 1.15 }}>
          Passez au comptage intelligent
          <br />
          <span style={{ color: "#f97316" }}>e-EnergieTEC • STE18-G / STE38-G</span>
        </h2>

        <div
          style={{
            marginTop: 18,
            transform: `scale(${pulse})`,
            padding: "26px 56px",
            borderRadius: 999,
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            border: "3px solid #fed7aa",
            boxShadow: "0 16px 45px rgba(249, 115, 22, 0.55)",
          }}
        >
          <span style={{ fontSize: 40, fontWeight: 900, color: "#ffffff" }}>
            📩 Demandez votre fiche technique & devis
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const EnergieTecGprsB2B: React.FC<EnergieTecGprsB2BProps> = ({
  narrationSrc = "narration_gprs_b2b.mp3",
  soundtrackSrc = "soundtrack_gprs_b2b_ducked.mp3",
  narrationVolume = 1.0,
  musicVolume = 0.25,
  showCaptions = true,
}) => {
  const whooshSfx = resolveAsset("sfx/whoosh.mp3");
  const chimeSfx = resolveAsset("sfx/chime.mp3");

  return (
    <AbsoluteFill style={{ backgroundColor: "#090d16" }}>
      <Sequence from={0} durationInFrames={316}>
        <Scene1Meters />
      </Sequence>
      <Sequence from={316} durationInFrames={254}>
        <Scene2Benefits />
      </Sequence>
      <Sequence from={570} durationInFrames={256}>
        <Scene3Dashboard />
      </Sequence>
      <Sequence from={826} durationInFrames={224}>
        <Scene4CTA />
      </Sequence>

      {whooshSfx && (
        <>
          <Sequence from={312} durationInFrames={22}>
            <Audio src={whooshSfx} volume={0.28} />
          </Sequence>
          <Sequence from={566} durationInFrames={22}>
            <Audio src={whooshSfx} volume={0.28} />
          </Sequence>
        </>
      )}
      {chimeSfx && (
        <Sequence from={824} durationInFrames={45}>
          <Audio src={chimeSfx} volume={0.30} />
        </Sequence>
      )}

      {showCaptions && (
        <CaptionOverlay
          words={defaultCaptions as WordCaption[]}
          wordsPerPage={7}
          fontSize={38}
          highlightColor="#f97316"
          color="#ffffff"
          backgroundColor="rgba(9, 13, 22, 0.90)"
        />
      )}

      <Audio src={resolveAsset(soundtrackSrc)} volume={musicVolume} />
      <Audio src={resolveAsset(narrationSrc)} volume={narrationVolume} />
    </AbsoluteFill>
  );
};
