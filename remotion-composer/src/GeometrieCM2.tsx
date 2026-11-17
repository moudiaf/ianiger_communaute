import React from "react";
import {
  AbsoluteFill,
  Audio,
  CalculateMetadataFunction,
  interpolate,
  Sequence,
  Series,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CaptionOverlay, WordCaption } from "./components/CaptionOverlay";
import { resolveAsset } from "./lib/resolveAsset";
import defaultDurations from "./geometrie_durations.json";
import defaultCaptions from "./geometrie/captions.json";

export interface GeometrieCM2Props {
  durations?: Record<string, number>;
  musicVolume?: number;
  narrationVolume?: number;
  showCaptions?: boolean;
}

const FPS = 30;
const PAUSE_BEFORE = 15; // 0.5s
const PAUSE_AFTER = 15;  // 0.5s
const REFLECTION_FRAMES = 120; // 4.0s silence de timeline pour l'exercice

const toFrames = (sec: number | undefined, fallbackSec: number) =>
  Math.ceil((sec ?? fallbackSec) * FPS);

export const calculateGeometrieMetadata: CalculateMetadataFunction<GeometrieCM2Props> = async ({
  props,
}) => {
  const d = props.durations || defaultDurations;
  const s1 = PAUSE_BEFORE + toFrames(d["voix-01.mp3"], 3.5) + PAUSE_AFTER;
  const s2 = PAUSE_BEFORE + toFrames(d["voix-02.mp3"], 5.5) + PAUSE_AFTER;
  const s3 = PAUSE_BEFORE + toFrames(d["voix-03.mp3"], 12.0) + PAUSE_AFTER;
  const s4 = PAUSE_BEFORE + toFrames(d["voix-04.mp3"], 17.0) + PAUSE_AFTER;
  const s5 = PAUSE_BEFORE + toFrames(d["voix-05.mp3"], 12.0) + PAUSE_AFTER;
  const s6 = PAUSE_BEFORE + toFrames(d["voix-06.mp3"], 16.0) + PAUSE_AFTER;
  const qDur = toFrames(d["voix-07-question.mp3"], 6.0);
  const aDur = toFrames(d["voix-07-reponse.mp3"], 7.0);
  const s7 = PAUSE_BEFORE + qDur + REFLECTION_FRAMES + aDur + PAUSE_AFTER;
  const s8 = PAUSE_BEFORE + toFrames(d["voix-08.mp3"], 8.0) + PAUSE_AFTER * 2;

  return {
    durationInFrames: s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8,
    props,
  };
};

const SceneWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill
      style={{
        opacity,
        background: "radial-gradient(circle at 50% 35%, #1e293b 0%, #0f172a 80%)",
        color: "#f8fafc",
        fontFamily: "Space Grotesk, sans-serif",
        padding: "60px 100px 130px 100px",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// 1. Titre
const TitreScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleSpring = spring({ frame: frame - 8, fps, config: { damping: 14, stiffness: 85 } });

  return (
    <SceneWrapper>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div
          style={{
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleSpring, [0, 1], [35, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
          }}
        >
          <span
            style={{
              padding: "12px 34px",
              borderRadius: 999,
              background: "rgba(245, 158, 11, 0.18)",
              border: "2px solid #f59e0b",
              color: "#fbbf24",
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: 3,
            }}
          >
            FORMATION PÉDAGOGIQUE • CM2 NIGER
          </span>
          <h1 style={{ fontSize: 96, fontWeight: 900, margin: 0, lineHeight: 1.1 }}>
            Géométrie CM2
          </h1>
          <h2 style={{ fontSize: 54, fontWeight: 700, color: "#38bdf8", margin: 0 }}>
            Les Figures Planes & Le Périmètre
          </h2>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};

// 2. Objectifs (calage relatif)
const ObjectifsScene: React.FC<{ clipFrames: number }> = ({ clipFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = [
    { icon: "🔺", text: "Reconnaître le triangle, le rectangle, le carré et le cercle", delay: Math.round(clipFrames * 0.08) },
    { icon: "📐", text: "Identifier leurs propriétés (côtés, sommets, angles droits, rayon)", delay: Math.round(clipFrames * 0.35) },
    { icon: "📏", text: "Calculer le périmètre de chaque figure avec méthode", delay: Math.round(clipFrames * 0.65) },
  ];

  return (
    <SceneWrapper>
      <h2 style={{ fontSize: 56, fontWeight: 900, color: "#38bdf8", marginBottom: 40 }}>
        Objectifs de la séance
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {items.map((item, idx) => {
          const sp = spring({ frame: frame - item.delay, fps, config: { damping: 14, stiffness: 90 } });
          return (
            <div
              key={idx}
              style={{
                opacity: interpolate(sp, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(sp, [0, 1], [-50, 0])}px)`,
                display: "flex",
                alignItems: "center",
                gap: 28,
                padding: "26px 40px",
                borderRadius: 24,
                background: "rgba(30, 41, 59, 0.9)",
                border: "2px solid rgba(56, 189, 248, 0.5)",
              }}
            >
              <span style={{ fontSize: 48 }}>{item.icon}</span>
              <span style={{ fontSize: 36, fontWeight: 700 }}>{item.text}</span>
            </div>
          );
        })}
      </div>
    </SceneWrapper>
  );
};

// 3. Triangle — pathLength={1} pour tracé 100% fermé sans gap !
const TriangleScene: React.FC<{ clipFrames: number }> = ({ clipFrames }) => {
  const frame = useCurrentFrame();
  const drawEnd = Math.round(clipFrames * 0.52);
  const drawProgress = interpolate(frame, [PAUSE_BEFORE, drawEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = Math.sin(frame / 8) * 4 + 14;

  return (
    <SceneWrapper>
      <div style={{ display: "flex", alignItems: "center", height: "100%", gap: 80 }}>
        <svg width="680" height="580" viewBox="0 0 680 600">
          <polygon
            points="340,70 90,510 590,510"
            pathLength={1}
            fill="rgba(56, 189, 248, 0.12)"
            stroke="#38bdf8"
            strokeWidth="10"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={1 - drawProgress}
          />
          {drawProgress > 0.15 && <circle cx="340" cy="70" r={pulse} fill="#fbbf24" />}
          {drawProgress > 0.45 && <circle cx="90" cy="510" r={pulse} fill="#fbbf24" />}
          {drawProgress > 0.78 && <circle cx="590" cy="510" r={pulse} fill="#fbbf24" />}
          <text x="340" y="42" fill="#fbbf24" fontSize="34" fontWeight="bold" textAnchor="middle">Sommet A</text>
          <text x="80" y="565" fill="#fbbf24" fontSize="34" fontWeight="bold" textAnchor="middle">Sommet B</text>
          <text x="600" y="565" fill="#fbbf24" fontSize="34" fontWeight="bold" textAnchor="middle">Sommet C</text>
        </svg>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 28 }}>
          <h2 style={{ fontSize: 64, fontWeight: 900, color: "#38bdf8", margin: 0 }}>1. Le Triangle</h2>
          <p style={{ fontSize: 38, lineHeight: 1.4, margin: 0 }}>
            • <strong>3 côtés</strong> droits<br />
            • <strong>3 sommets</strong> (points de rencontre)<br />
            • Forme fermée indéformable
          </p>
        </div>
      </div>
    </SceneWrapper>
  );
};

// 4. Rectangle & Carré (calage relatif sur le clip audio)
const RectanglesScene: React.FC<{ clipFrames: number }> = ({ clipFrames }) => {
  const frame = useCurrentFrame();
  const rectOpacity = interpolate(frame, [10, 35], [0, 1], { extrapolateRight: "clamp" });
  const squareStart = Math.round(clipFrames * 0.62);
  const squareOpacity = interpolate(frame, [squareStart, squareStart + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneWrapper>
      <h2 style={{ fontSize: 56, fontWeight: 900, color: "#38bdf8", marginBottom: 30 }}>
        2. Le Rectangle & Le Carré
      </h2>
      <div style={{ display: "flex", gap: 70, alignItems: "center", flex: 1 }}>
        <div style={{ flex: 1, opacity: rectOpacity, textAlign: "center" }}>
          <svg width="560" height="360" viewBox="0 0 560 380">
            <rect x="40" y="50" width="480" height="270" fill="rgba(34, 197, 94, 0.14)" stroke="#22c55e" strokeWidth="8" />
            <rect x="40" y="50" width="28" height="28" fill="none" stroke="#ef4444" strokeWidth="4" />
            <rect x="492" y="50" width="28" height="28" fill="none" stroke="#ef4444" strokeWidth="4" />
            <rect x="40" y="292" width="28" height="28" fill="none" stroke="#ef4444" strokeWidth="4" />
            <rect x="492" y="292" width="28" height="28" fill="none" stroke="#ef4444" strokeWidth="4" />
            <line x1="280" y1="35" x2="280" y2="65" stroke="#fbbf24" strokeWidth="6" />
            <line x1="280" y1="305" x2="280" y2="335" stroke="#fbbf24" strokeWidth="6" />
            <line x1="25" y1="180" x2="55" y2="180" stroke="#38bdf8" strokeWidth="6" />
            <line x1="25" y1="195" x2="55" y2="195" stroke="#38bdf8" strokeWidth="6" />
            <line x1="505" y1="180" x2="535" y2="180" stroke="#38bdf8" strokeWidth="6" />
            <line x1="505" y1="195" x2="535" y2="195" stroke="#38bdf8" strokeWidth="6" />
          </svg>
          <p style={{ fontSize: 32, fontWeight: 700, color: "#4ade80" }}>
            Rectangle : 4 angles droits, côtés opposés égaux
          </p>
        </div>

        <div style={{ flex: 1, opacity: squareOpacity, textAlign: "center" }}>
          <svg width="360" height="360" viewBox="0 0 380 380">
            <rect x="55" y="55" width="270" height="270" fill="rgba(251, 191, 36, 0.16)" stroke="#fbbf24" strokeWidth="8" />
            <line x1="190" y1="40" x2="190" y2="70" stroke="#ffffff" strokeWidth="6" />
            <line x1="190" y1="310" x2="190" y2="340" stroke="#ffffff" strokeWidth="6" />
            <line x1="40" y1="190" x2="70" y2="190" stroke="#ffffff" strokeWidth="6" />
            <line x1="310" y1="190" x2="340" y2="190" stroke="#ffffff" strokeWidth="6" />
          </svg>
          <p style={{ fontSize: 32, fontWeight: 700, color: "#fbbf24" }}>
            Carré : 4 côtés de même longueur
          </p>
        </div>
      </div>
    </SceneWrapper>
  );
};

// 5. Cercle (pathLength={1} + rotation calée sur clipFrames)
const CercleScene: React.FC<{ clipFrames: number }> = ({ clipFrames }) => {
  const frame = useCurrentFrame();
  const angleEnd = Math.round(clipFrames * 0.55);
  const progress = interpolate(frame, [PAUSE_BEFORE, angleEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const angle = progress * 360;
  const radius = 210;
  const rad = (angle * Math.PI) / 180;
  const rx = 300 + radius * Math.cos(rad);
  const ry = 300 + radius * Math.sin(rad);

  return (
    <SceneWrapper>
      <div style={{ display: "flex", alignItems: "center", height: "100%", gap: 80 }}>
        <svg width="580" height="580" viewBox="0 0 600 600">
          <circle
            cx="300"
            cy="300"
            r={radius}
            pathLength={1}
            fill="rgba(56, 189, 248, 0.12)"
            stroke="#38bdf8"
            strokeWidth="10"
            strokeDasharray={1}
            strokeDashoffset={1 - progress}
          />
          <line x1="300" y1="300" x2={rx} y2={ry} stroke="#fbbf24" strokeWidth="8" />
          <circle cx="300" cy="300" r="12" fill="#ef4444" />
          <text x="300" y="345" fill="#ef4444" fontSize="34" fontWeight="bold" textAnchor="middle">Centre O</text>
          <text x={(300 + rx) / 2} y={(300 + ry) / 2 - 18} fill="#fbbf24" fontSize="34" fontWeight="bold" textAnchor="middle">
            Rayon R
          </text>
        </svg>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 28 }}>
          <h2 style={{ fontSize: 64, fontWeight: 900, color: "#38bdf8", margin: 0 }}>3. Le Cercle</h2>
          <p style={{ fontSize: 38, lineHeight: 1.4, margin: 0 }}>
            • Ligne courbe fermée tracée au compas<br />
            • Tous les points sont à la même distance du <strong>centre</strong> (= le <strong>rayon</strong>)<br />
            • 0 côté, 0 sommet
          </p>
        </div>
      </div>
    </SceneWrapper>
  );
};

// 6. Périmètre (calage relatif de l'exemple)
const PerimetreScene: React.FC<{ clipFrames: number }> = ({ clipFrames }) => {
  const frame = useCurrentFrame();
  const exStart = Math.round(clipFrames * 0.64);
  const exampleOpacity = interpolate(frame, [exStart, exStart + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneWrapper>
      <h2 style={{ fontSize: 56, fontWeight: 900, color: "#fbbf24", marginBottom: 32 }}>
        4. Calculer le Périmètre
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        <div style={{ padding: "28px 40px", borderRadius: 24, background: "rgba(30, 41, 59, 0.9)", border: "2px solid #38bdf8" }}>
          <p style={{ fontSize: 38, margin: 0 }}>
            <strong>Définition :</strong> Le périmètre est la longueur totale du tour de la figure.
          </p>
        </div>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, padding: 32, borderRadius: 24, background: "rgba(56, 189, 248, 0.14)", border: "2px solid #38bdf8" }}>
            <h3 style={{ fontSize: 36, color: "#38bdf8", margin: "0 0 12px 0" }}>Triangle</h3>
            <p style={{ fontSize: 34, fontWeight: 800, margin: 0 }}>P = côté 1 + côté 2 + côté 3</p>
          </div>
          <div style={{ flex: 1, padding: 32, borderRadius: 24, background: "rgba(34, 197, 94, 0.14)", border: "2px solid #22c55e" }}>
            <h3 style={{ fontSize: 36, color: "#4ade80", margin: "0 0 12px 0" }}>Rectangle</h3>
            <p style={{ fontSize: 34, fontWeight: 800, margin: 0 }}>P = (2 × L) + (2 × l)</p>
          </div>
        </div>
        <div style={{ opacity: exampleOpacity, padding: "24px 36px", borderRadius: 22, background: "rgba(251, 191, 36, 0.18)", border: "2px solid #fbbf24" }}>
          <p style={{ fontSize: 36, fontWeight: 800, color: "#fef3c7", margin: 0 }}>
            Exemple : Triangle de 3 cm, 4 cm et 5 cm → P = 3 + 4 + 5 = 12 cm
          </p>
        </div>
      </div>
    </SceneWrapper>
  );
};

// 7. Exercice interactif avec pause de réflexion exacte de 4 secondes + chime
const ExerciceScene: React.FC<{ reflectionStart: number }> = ({ reflectionStart }) => {
  const frame = useCurrentFrame();
  const elapsedInReflection = frame - reflectionStart;
  const isReflecting = elapsedInReflection >= 0 && elapsedInReflection < REFLECTION_FRAMES;
  const secondsLeft = Math.max(0, Math.ceil((REFLECTION_FRAMES - elapsedInReflection) / FPS));
  const showSolution = elapsedInReflection >= REFLECTION_FRAMES;

  return (
    <SceneWrapper>
      <h2 style={{ fontSize: 56, fontWeight: 900, color: "#fbbf24", marginBottom: 28 }}>
        Exercice Pratique
      </h2>
      <div style={{ display: "flex", gap: 60, alignItems: "center", flex: 1 }}>
        <div style={{ flex: 1, padding: 36, borderRadius: 26, background: "rgba(30, 41, 59, 0.9)", border: "2px solid #38bdf8" }}>
          <p style={{ fontSize: 38, lineHeight: 1.4, margin: 0 }}>
            Un rectangle mesure <strong>8 cm</strong> de longueur et <strong>5 cm</strong> de largeur.
            <br /><br />
            <span style={{ color: "#38bdf8", fontWeight: 800 }}>Quel est son périmètre ?</span>
          </p>

          {isReflecting && (
            <div style={{ marginTop: 30, padding: "16px 28px", borderRadius: 18, background: "rgba(245, 158, 11, 0.2)", border: "2px solid #f59e0b", display: "inline-block" }}>
              <span style={{ fontSize: 40, fontWeight: 900, color: "#fbbf24" }}>
                ⏳ Réfléchissez... {secondsLeft} s
              </span>
            </div>
          )}

          {showSolution && (
            <div style={{ marginTop: 30, padding: "22px 30px", borderRadius: 20, background: "rgba(34, 197, 94, 0.2)", border: "2px solid #22c55e" }}>
              <p style={{ fontSize: 36, fontWeight: 800, color: "#4ade80", margin: 0 }}>
                8 + 8 = 16  |  5 + 5 = 10
                <br />
                ✅ Périmètre total = 26 cm
              </p>
            </div>
          )}
        </div>

        <svg width="480" height="340" viewBox="0 0 500 360">
          <rect x="60" y="60" width="380" height="230" fill="rgba(56, 189, 248, 0.16)" stroke="#38bdf8" strokeWidth="8" />
          <text x="250" y="42" fill="#fbbf24" fontSize="36" fontWeight="bold" textAnchor="middle">L = 8 cm</text>
          <text x="462" y="185" fill="#4ade80" fontSize="36" fontWeight="bold" textAnchor="middle" transform="rotate(90 462 185)">l = 5 cm</text>
        </svg>
      </div>
    </SceneWrapper>
  );
};

// 8. Récapitulatif
const RecapScene: React.FC = () => {
  const cards = [
    { icon: "🔺", name: "Triangle", desc: "3 côtés • 3 sommets" },
    { icon: "🟩", name: "Rectangle", desc: "4 angles droits • opposés égaux" },
    { icon: "🟨", name: "Carré", desc: "4 côtés égaux • 4 angles droits" },
    { icon: "⭕", name: "Cercle", desc: "Centre + Rayon" },
  ];
  return (
    <SceneWrapper>
      <h2 style={{ fontSize: 56, fontWeight: 900, color: "#38bdf8", textAlign: "center", marginBottom: 40 }}>
        À Retenir — Les Figures Planes
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {cards.map((c) => (
          <div
            key={c.name}
            style={{
              padding: "32px 36px",
              borderRadius: 24,
              background: "rgba(30, 41, 59, 0.92)",
              border: "2px solid rgba(251, 191, 36, 0.6)",
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <span style={{ fontSize: 60 }}>{c.icon}</span>
            <div>
              <h3 style={{ fontSize: 40, margin: "0 0 8px 0", color: "#fbbf24" }}>{c.name}</h3>
              <p style={{ fontSize: 28, margin: 0, color: "#e2e8f0" }}>{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </SceneWrapper>
  );
};

export const GeometrieCM2: React.FC<GeometrieCM2Props> = ({
  durations = defaultDurations,
  musicVolume = 0.14,
  narrationVolume = 1.0,
  showCaptions = true,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const f1 = toFrames(durations["voix-01.mp3"], 3.5);
  const f2 = toFrames(durations["voix-02.mp3"], 5.5);
  const f3 = toFrames(durations["voix-03.mp3"], 12.0);
  const f4 = toFrames(durations["voix-04.mp3"], 17.0);
  const f5 = toFrames(durations["voix-05.mp3"], 12.0);
  const f6 = toFrames(durations["voix-06.mp3"], 16.0);
  const f7q = toFrames(durations["voix-07-question.mp3"], 6.0);
  const f7a = toFrames(durations["voix-07-reponse.mp3"], 7.0);
  const f8 = toFrames(durations["voix-08.mp3"], 8.0);

  const chimeSfx = resolveAsset("sfx/chime.mp3");
  const dynamicMusicVol = interpolate(
    frame,
    [0, 30, Math.max(31, durationInFrames - 60), durationInFrames],
    [0, musicVolume, musicVolume, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a" }}>
      <Series>
        <Series.Sequence durationInFrames={PAUSE_BEFORE + f1 + PAUSE_AFTER}>
          <TitreScene />
          <Sequence from={PAUSE_BEFORE} durationInFrames={f1} layout="none">
            <Audio src={resolveAsset("geometrie/voix-01.mp3")} volume={narrationVolume} />
          </Sequence>
        </Series.Sequence>

        <Series.Sequence durationInFrames={PAUSE_BEFORE + f2 + PAUSE_AFTER}>
          <ObjectifsScene clipFrames={PAUSE_BEFORE + f2} />
          <Sequence from={PAUSE_BEFORE} durationInFrames={f2} layout="none">
            <Audio src={resolveAsset("geometrie/voix-02.mp3")} volume={narrationVolume} />
          </Sequence>
        </Series.Sequence>

        <Series.Sequence durationInFrames={PAUSE_BEFORE + f3 + PAUSE_AFTER}>
          <TriangleScene clipFrames={PAUSE_BEFORE + f3} />
          <Sequence from={PAUSE_BEFORE} durationInFrames={f3} layout="none">
            <Audio src={resolveAsset("geometrie/voix-03.mp3")} volume={narrationVolume} />
          </Sequence>
        </Series.Sequence>

        <Series.Sequence durationInFrames={PAUSE_BEFORE + f4 + PAUSE_AFTER}>
          <RectanglesScene clipFrames={PAUSE_BEFORE + f4} />
          <Sequence from={PAUSE_BEFORE} durationInFrames={f4} layout="none">
            <Audio src={resolveAsset("geometrie/voix-04.mp3")} volume={narrationVolume} />
          </Sequence>
        </Series.Sequence>

        <Series.Sequence durationInFrames={PAUSE_BEFORE + f5 + PAUSE_AFTER}>
          <CercleScene clipFrames={PAUSE_BEFORE + f5} />
          <Sequence from={PAUSE_BEFORE} durationInFrames={f5} layout="none">
            <Audio src={resolveAsset("geometrie/voix-05.mp3")} volume={narrationVolume} />
          </Sequence>
        </Series.Sequence>

        <Series.Sequence durationInFrames={PAUSE_BEFORE + f6 + PAUSE_AFTER}>
          <PerimetreScene clipFrames={PAUSE_BEFORE + f6} />
          <Sequence from={PAUSE_BEFORE} durationInFrames={f6} layout="none">
            <Audio src={resolveAsset("geometrie/voix-06.mp3")} volume={narrationVolume} />
          </Sequence>
        </Series.Sequence>

        <Series.Sequence durationInFrames={PAUSE_BEFORE + f7q + REFLECTION_FRAMES + f7a + PAUSE_AFTER}>
          <ExerciceScene reflectionStart={PAUSE_BEFORE + f7q} />
          <Sequence from={PAUSE_BEFORE} durationInFrames={f7q} layout="none">
            <Audio src={resolveAsset("geometrie/voix-07-question.mp3")} volume={narrationVolume} />
          </Sequence>
          {chimeSfx && (
            <Sequence from={PAUSE_BEFORE + f7q + REFLECTION_FRAMES - 4} durationInFrames={45} layout="none">
              <Audio src={chimeSfx} volume={0.28} />
            </Sequence>
          )}
          <Sequence from={PAUSE_BEFORE + f7q + REFLECTION_FRAMES} durationInFrames={f7a} layout="none">
            <Audio src={resolveAsset("geometrie/voix-07-reponse.mp3")} volume={narrationVolume} />
          </Sequence>
        </Series.Sequence>

        <Series.Sequence durationInFrames={PAUSE_BEFORE + f8 + PAUSE_AFTER * 2}>
          <RecapScene />
          <Sequence from={PAUSE_BEFORE} durationInFrames={f8} layout="none">
            <Audio src={resolveAsset("geometrie/voix-08.mp3")} volume={narrationVolume} />
          </Sequence>
        </Series.Sequence>
      </Series>

      {/* Sous-titres pédagogiques synchronisés */}
      {showCaptions && (
        <CaptionOverlay
          words={defaultCaptions as WordCaption[]}
          wordsPerPage={7}
          fontSize={36}
          highlightColor="#38bdf8"
          color="#ffffff"
          backgroundColor="rgba(15, 23, 42, 0.88)"
        />
      )}

      <Audio src={resolveAsset("soundtrack_rentecpay_soft.mp3")} volume={dynamicMusicVol} loop />
    </AbsoluteFill>
  );
};
