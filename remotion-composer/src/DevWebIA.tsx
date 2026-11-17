import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
} from "remotion";
import { PromptToUiScene } from "./devweb/PromptToUiScene";
import { DesignAndCodeScene } from "./devweb/DesignAndCodeScene";
import { BackendAndDeployScene } from "./devweb/BackendAndDeployScene";
import { OutroDevWebScene } from "./devweb/OutroDevWebScene";
import { CaptionOverlay, WordCaption } from "./components/CaptionOverlay";
import { resolveAsset } from "./lib/resolveAsset";
import defaultCaptions from "./devweb/devWebCaptions.json";

export interface DevWebIAProps {
  audioSrc?: string;
  captions?: WordCaption[];
}

export const DevWebIA: React.FC<DevWebIAProps> = ({
  audioSrc = "narration_devweb.mp3",
  captions = defaultCaptions as WordCaption[],
}) => {
  const resolvedAudio = resolveAsset(audioSrc);

  return (
    <AbsoluteFill style={{ backgroundColor: "#060a14" }}>
      {/* Sequence 1: Hero & Prompt to UI (0s - 12s = 0 - 360 frames) */}
      <Sequence from={0} durationInFrames={360}>
        <PromptToUiScene />
      </Sequence>

      {/* Sequence 2: Design Génératif & Code IA (12s - 28s = 360 - 840 frames) */}
      <Sequence from={360} durationInFrames={480}>
        <DesignAndCodeScene />
      </Sequence>

      {/* Sequence 3: Backend & Déploiement Vercel (28s - 45s = 840 - 1350 frames) */}
      <Sequence from={840} durationInFrames={510}>
        <BackendAndDeployScene />
      </Sequence>

      {/* Sequence 4: Outro & Appel à l'Action (45s - 60s = 1350 - 1800 frames) */}
      <Sequence from={1350} durationInFrames={450}>
        <OutroDevWebScene />
      </Sequence>

      {/* Modern High-Impact Subtitles */}
      {captions && captions.length > 0 && (
        <CaptionOverlay
          words={captions}
          wordsPerPage={3}
          fontSize={46}
          highlightColor="#38BDF8"
          color="#FFFFFF"
          backgroundColor="rgba(15, 23, 42, 0.85)"
        />
      )}

      {/* High Quality French Audio Narration */}
      {resolvedAudio ? <Audio src={resolvedAudio} /> : null}
    </AbsoluteFill>
  );
};

