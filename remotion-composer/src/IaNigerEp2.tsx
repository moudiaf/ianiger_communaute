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
import defaultCaptions from "./ianiger_ep2/captions.json";

export interface IaNigerEp2Props {
  narrationSrc?: string;
  soundtrackSrc?: string;
  narrationVolume?: number;
  musicVolume?: number;
  showCaptions?: boolean;
}

const STYLES = [
  {
    num: "1",
    cmd: "/FlatLay",
    desc: "Présentation du dessus",
    img: "ianiger_ep2/style1_flatlay.jpg",
    color: "#38bdf8",
    from: 119,
    dur: 81,
  },
  {
    num: "2",
    cmd: "/Lifestyle",
    desc: "Produit en situation",
    img: "ianiger_ep2/style2_lifestyle.jpg",
    color: "#22c55e",
    from: 200,
    dur: 72,
  },
  {
    num: "3",
    cmd: "/KeyVisual",
    desc: "Visuel publicitaire principal",
    img: "ianiger_ep2/style3_keyvisual.jpg",
    color: "#fbbf24",
    from: 272,
    dur: 91,
  },
  {
    num: "4",
    cmd: "/Storyboard",
    desc: "Préparation d'une vidéo en scènes",
    img: "ianiger_ep2/style4_storyboard.jpg",
    color: "#f472b6",
    from: 363,
    dur: 87,
  },
];

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleSpring = spring({ frame: frame - 4, fps, config: { damping: 14, stiffness: 95 } });
  const gridScale = interpolate(frame, [0, 119], [0.96, 1.04], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 35%, #1e1b4b 0%, #090d16 80%)",
        overflow: "hidden",
        fontFamily: "Space Grotesk, sans-serif",
      }}
    >
      {/* Background 2x2 subtle preview */}
      <AbsoluteFill
        style={{
          opacity: 0.35,
          transform: `scale(${gridScale})`,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 12,
          padding: 24,
        }}
      >
        {STYLES.map((s) => (
          <Img
            key={s.num}
            src={resolveAsset(s.img)}
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 24 }}
          />
        ))}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(9, 13, 22, 0.85) 0%, rgba(9, 13, 22, 0.45) 50%, rgba(9, 13, 22, 0.92) 100%)",
        }}
      />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 48, textAlign: "center" }}>
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
              padding: "12px 30px",
              borderRadius: 999,
              background: "rgba(245, 158, 11, 0.2)",
              border: "2px solid #f59e0b",
              color: "#fbbf24",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            🇳🇪 IA NIGER COMMUNAUTÉ • ÉPISODE 2
          </span>

          <h1
            style={{
              fontSize: 78,
              fontWeight: 900,
              color: "#ffffff",
              margin: 0,
              lineHeight: 1.12,
              textShadow: "0 6px 28px rgba(0,0,0,0.8)",
            }}
          >
            4 Styles Créatifs
            <br />
            <span style={{ color: "#38bdf8" }}>à essayer avec l'IA</span>
          </h1>

          <div
            style={{
              padding: "16px 34px",
              borderRadius: 20,
              background: "rgba(15, 23, 42, 0.88)",
              border: "1.5px solid rgba(56, 189, 248, 0.6)",
              color: "#e2e8f0",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            📸 1 seule photo → 4 créations pro
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const StyleShowcaseScene: React.FC<{ styleItem: (typeof STYLES)[number] }> = ({ styleItem }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const imgScale = interpolate(frame, [0, styleItem.dur], [1.0, 1.1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 40%, #0f172a 0%, #030712 85%)",
        fontFamily: "Space Grotesk, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Top Style Header */}
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 110, paddingLeft: 44, paddingRight: 44 }}>
        <div
          style={{
            opacity: interpolate(cardSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(cardSpring, [0, 1], [25, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            marginBottom: 34,
          }}
        >
          <span
            style={{
              padding: "10px 28px",
              borderRadius: 999,
              background: `${styleItem.color}25`,
              border: `2px solid ${styleItem.color}`,
              color: styleItem.color,
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            STYLE {styleItem.num} / 4
          </span>
          <h2
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#ffffff",
              margin: 0,
              textShadow: `0 4px 24px ${styleItem.color}66`,
            }}
          >
            {styleItem.cmd}
          </h2>
          <span style={{ fontSize: 34, fontWeight: 700, color: "#cbd5e1" }}>
            {styleItem.desc}
          </span>
        </div>

        {/* Visual Showcase Frame */}
        <div
          style={{
            opacity: interpolate(cardSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(cardSpring, [0, 1], [0.92, 1])})`,
            width: "92%",
            height: 980,
            borderRadius: 34,
            overflow: "hidden",
            border: `3px solid ${styleItem.color}`,
            boxShadow: `0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px ${styleItem.color}44`,
          }}
        >
          <Img
            src={resolveAsset(styleItem.img)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${imgScale})`,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const gridSpring = spring({ frame: frame - 4, fps, config: { damping: 14, stiffness: 90 } });
  const pulse = Math.sin(frame / 6) * 0.04 + 1.0;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 40%, #1e1b4b 0%, #090d16 85%)",
        fontFamily: "Space Grotesk, sans-serif",
        padding: "100px 44px",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontSize: 58,
          fontWeight: 900,
          color: "#ffffff",
          textAlign: "center",
          margin: "0 0 34px 0",
        }}
      >
        Lequel préférez-vous ? 👇
      </h2>

      {/* 2x2 Recap Grid */}
      <div
        style={{
          opacity: interpolate(gridSpring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(gridSpring, [0, 1], [0.92, 1])})`,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 22,
          width: "100%",
        }}
      >
        {STYLES.map((s) => (
          <div
            key={s.num}
            style={{
              position: "relative",
              height: 410,
              borderRadius: 24,
              overflow: "hidden",
              border: `3px solid ${s.color}`,
              boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
            }}
          >
            <Img
              src={resolveAsset(s.img)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "14px 16px",
                background: "rgba(9, 13, 22, 0.88)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: s.color,
                  color: "#090d16",
                  fontSize: 28,
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {s.num}
              </span>
              <span style={{ fontSize: 26, fontWeight: 800, color: "#ffffff" }}>{s.cmd}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Comment CTA Button */}
      <div
        style={{
          marginTop: 46,
          transform: `scale(${pulse})`,
          padding: "22px 42px",
          borderRadius: 999,
          background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
          border: "3px solid #fef3c7",
          boxShadow: "0 12px 35px rgba(245, 158, 11, 0.55)",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 36, fontWeight: 900, color: "#090d16" }}>
          💬 Commentez 1, 2, 3 ou 4 !
        </span>
      </div>

      <span
        style={{
          marginTop: 32,
          fontSize: 26,
          fontWeight: 800,
          color: "#38bdf8",
          letterSpacing: 1.5,
        }}
      >
        🇳🇪 IA NIGER COMMUNAUTÉ • Apprendre • Partager • Innover
      </span>
    </AbsoluteFill>
  );
};

export const IaNigerEp2: React.FC<IaNigerEp2Props> = ({
  narrationSrc = "narration_ianiger_ep2.mp3",
  soundtrackSrc = "soundtrack_ianiger_ep2_ducked.mp3",
  narrationVolume = 1.0,
  musicVolume = 0.25,
  showCaptions = true,
}) => {
  const whooshSfx = resolveAsset("sfx/whoosh.mp3");
  const chimeSfx = resolveAsset("sfx/chime.mp3");

  return (
    <AbsoluteFill style={{ backgroundColor: "#090d16" }}>
      <Sequence from={0} durationInFrames={119}>
        <IntroScene />
      </Sequence>

      {STYLES.map((s) => (
        <Sequence key={s.num} from={s.from} durationInFrames={s.dur}>
          <StyleShowcaseScene styleItem={s} />
        </Sequence>
      ))}

      <Sequence from={450} durationInFrames={150}>
        <OutroScene />
      </Sequence>

      {/* Transition SFX */}
      {whooshSfx &&
        STYLES.map((s) => (
          <Sequence key={`sfx-${s.num}`} from={Math.max(0, s.from - 3)} durationInFrames={20}>
            <Audio src={whooshSfx} volume={0.28} />
          </Sequence>
        ))}
      {chimeSfx && (
        <Sequence from={448} durationInFrames={45}>
          <Audio src={chimeSfx} volume={0.30} />
        </Sequence>
      )}

      {showCaptions && (
        <CaptionOverlay
          words={defaultCaptions as WordCaption[]}
          wordsPerPage={4}
          fontSize={44}
          highlightColor="#fbbf24"
          color="#ffffff"
          backgroundColor="rgba(9, 13, 22, 0.90)"
        />
      )}

      <Audio src={resolveAsset(soundtrackSrc)} volume={musicVolume} />
      <Audio src={resolveAsset(narrationSrc)} volume={narrationVolume} />
    </AbsoluteFill>
  );
};
