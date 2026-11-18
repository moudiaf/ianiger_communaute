import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
} from "remotion";
import { PhoneAlertScene } from "./cyber/PhoneAlertScene";
import { ThreeQuestionsScene } from "./cyber/ThreeQuestionsScene";
import { AiAnalysisScene } from "./cyber/AiAnalysisScene";
import { IaNigerOutroScene } from "./cyber/IaNigerOutroScene";
import { CaptionOverlay, WordCaption } from "./components/CaptionOverlay";
import { resolveAsset } from "./lib/resolveAsset";
import defaultCaptions from "./cyber/cyberCaptions.json";

export interface CyberPhishingProps {
  audioSrc?: string;
  captions?: WordCaption[];
}

const defaultWordCaptions: WordCaption[] = (
  defaultCaptions as unknown as Array<{ word: string; start_ms: number; end_ms: number }>
).map((c) => ({
  word: c.word,
  startMs: c.start_ms,
  endMs: c.end_ms,
}));

export const CyberPhishing: React.FC<CyberPhishingProps> = ({
  audioSrc = "narration_cyber.mp3",
  captions = defaultWordCaptions,
}) => {
  const resolvedAudio = resolveAsset(audioSrc);

  return (
    <AbsoluteFill style={{ backgroundColor: "#060a14" }}>
      {/* Scene 1: Smartphone Alert & STOP Stamp (0s - 5s = 0 - 150 frames) */}
      <Sequence from={0} durationInFrames={150}>
        <PhoneAlertScene />
      </Sequence>

      {/* Scene 2: 3 Questions Réflexes (5s - 15s = 150 - 450 frames) */}
      <Sequence from={150} durationInFrames={300}>
        <ThreeQuestionsScene />
      </Sequence>

      {/* Scene 3: Détection IA & Esprit Critique (15s - 23s = 450 - 690 frames) */}
      <Sequence from={450} durationInFrames={240}>
        <AiAnalysisScene />
      </Sequence>

      {/* Scene 4: Clôture & Logo IA Niger Communauté (23s - 30s = 690 - 900 frames) */}
      <Sequence from={690} durationInFrames={210}>
        <IaNigerOutroScene />
      </Sequence>

      {/* TikTok / Reel Style Dynamic Subtitles */}
      {captions && captions.length > 0 && (
        <CaptionOverlay
          words={captions}
          wordsPerPage={3}
          fontSize={48}
          highlightColor="#FACC15"
          color="#FFFFFF"
          backgroundColor="rgba(15, 23, 42, 0.85)"
        />
      )}

      {/* Synchronized French Narration Audio */}
      {resolvedAudio ? <Audio src={resolvedAudio} /> : null}
    </AbsoluteFill>
  );
};

