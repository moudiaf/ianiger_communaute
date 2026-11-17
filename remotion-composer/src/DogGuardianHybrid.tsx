import React from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { Scene1Child } from "./dogguardian/Scene1Child";
import { Scene2DogGuardian } from "./dogguardian/Scene2DogGuardian";
import { Scene3Protection } from "./dogguardian/Scene3Protection";
import { Scene4Loyalty } from "./dogguardian/Scene4Loyalty";
import { CaptionOverlay, WordCaption } from "./components/CaptionOverlay";
import { resolveAsset } from "./lib/resolveAsset";
import defaultCaptions from "./dogguardian/captions.json";

export interface DogGuardianHybridProps {
  narrationSrc?: string;
  soundtrackSrc?: string;
  captions?: WordCaption[];
}

export const DogGuardianHybrid: React.FC<DogGuardianHybridProps> = ({
  narrationSrc = "narration_dog.mp3",
  soundtrackSrc = "soundtrack_dog.mp3",
  captions = defaultCaptions as WordCaption[],
}) => {
  const resolvedNarration = resolveAsset(narrationSrc);
  const resolvedSoundtrack = resolveAsset(soundtrackSrc);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0a09" }}>
      {/* Sequence 1: L'Innocence de l'Enfant (0s - 8.5s = 0 - 255 frames) */}
      <Sequence from={0} durationInFrames={255}>
        <Scene1Child />
      </Sequence>

      {/* Sequence 2: Le Gardien Silencieux (8.5s - 18s = 255 - 540 frames) */}
      <Sequence from={255} durationInFrames={285}>
        <Scene2DogGuardian />
      </Sequence>

      {/* Sequence 3: Le Bouclier Instinctif (18s - 27.5s = 540 - 825 frames) */}
      <Sequence from={540} durationInFrames={285}>
        <Scene3Protection />
      </Sequence>

      {/* Sequence 4: L'Ange Gardien Loyal (27.5s - 35s = 825 - 1050 frames) */}
      <Sequence from={825} durationInFrames={225}>
        <Scene4Loyalty />
      </Sequence>

      {/* Dynamic Word-by-Word Synchronized Subtitles */}
      {captions && captions.length > 0 && (
        <CaptionOverlay
          words={captions}
          wordsPerPage={3}
          fontSize={52}
          highlightColor="#fbbf24"
          color="#ffffff"
          backgroundColor="rgba(12, 10, 9, 0.85)"
        />
      )}

      {/* Background Cinematic Soundtrack */}
      {resolvedSoundtrack ? (
        <Audio src={resolvedSoundtrack} volume={0.22} />
      ) : null}

      {/* French Spoken Narration */}
      {resolvedNarration ? (
        <Audio src={resolvedNarration} volume={1.0} />
      ) : null}
    </AbsoluteFill>
  );
};

