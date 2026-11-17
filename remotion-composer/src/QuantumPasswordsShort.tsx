import React from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { LockRsaScene } from "./quantum/LockRsaScene";
import { BitVsQubitScene } from "./quantum/BitVsQubitScene";
import { ShorAlgorithmScene } from "./quantum/ShorAlgorithmScene";
import { PostQuantumDefenseScene } from "./quantum/PostQuantumDefenseScene";
import { CaptionOverlay, WordCaption } from "./components/CaptionOverlay";
import { resolveAsset } from "./lib/resolveAsset";
import defaultCaptions from "./quantum/captions.json";

export interface QuantumPasswordsShortProps {
  audioSrc?: string;
  captions?: WordCaption[];
}

export const QuantumPasswordsShort: React.FC<QuantumPasswordsShortProps> = ({
  audioSrc = "narration_quantum.mp3",
  captions = defaultCaptions as WordCaption[],
}) => {
  const resolvedAudio = resolveAsset(audioSrc);

  return (
    <AbsoluteFill style={{ backgroundColor: "#060911" }}>
      {/* Sequence 1: L'Alerte et le Cadenas RSA (0s - 14s = 0 - 420 frames) */}
      <Sequence from={0} durationInFrames={420}>
        <LockRsaScene />
      </Sequence>

      {/* Sequence 2: Le Saut Quantique Bit vs Qubit (14s - 30s = 420 - 900 frames) */}
      <Sequence from={420} durationInFrames={480}>
        <BitVsQubitScene />
      </Sequence>

      {/* Sequence 3: L'Algorithme de Shor et le Q-Day (30s - 45s = 900 - 1350 frames) */}
      <Sequence from={900} durationInFrames={450}>
        <ShorAlgorithmScene />
      </Sequence>

      {/* Sequence 4: La Défense Post-Quantique & CTA (45s - 60s = 1350 - 1800 frames) */}
      <Sequence from={1350} durationInFrames={450}>
        <PostQuantumDefenseScene />
      </Sequence>

      {/* Subtitles Overlay */}
      {captions && captions.length > 0 && (
        <CaptionOverlay
          words={captions}
          wordsPerPage={3}
          fontSize={48}
          highlightColor="#00f0ff"
          color="#ffffff"
          backgroundColor="rgba(6, 9, 17, 0.85)"
        />
      )}

      {/* Audio Narration */}
      {resolvedAudio ? <Audio src={resolvedAudio} /> : null}
    </AbsoluteFill>
  );
};

