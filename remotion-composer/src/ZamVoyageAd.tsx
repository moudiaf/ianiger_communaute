import React from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { Scene1Hook } from "./zamvoyage/Scene1Hook";
import { Scene2Formula } from "./zamvoyage/Scene2Formula";
import { Scene3Price } from "./zamvoyage/Scene3Price";
import { Scene4CTA } from "./zamvoyage/Scene4CTA";
import { CaptionOverlay, WordCaption } from "./components/CaptionOverlay";
import { resolveAsset } from "./lib/resolveAsset";
import defaultCaptions from "./zamvoyage/captions.json";

export interface ZamVoyageAdProps {
  narrationSrc?: string;
  soundtrackSrc?: string;
  captions?: WordCaption[];
}

export const ZamVoyageAd: React.FC<ZamVoyageAdProps> = ({
  narrationSrc = "narration_zam.mp3",
  soundtrackSrc = "soundtrack_zam.mp3",
  captions = defaultCaptions as WordCaption[],
}) => {
  const resolvedNarration = resolveAsset(narrationSrc);
  const resolvedSoundtrack = resolveAsset(soundtrackSrc);

  return (
    <AbsoluteFill style={{ backgroundColor: "#06231a" }}>
      {/* Sequence 1: L'Accroche Omrah Ramadan (0s - 7.5s = 0 - 225 frames) */}
      <Sequence from={0} durationInFrames={225}>
        <Scene1Hook />
      </Sequence>

      {/* Sequence 2: La Formule Sérénité 15 Jours (7.5s - 15s = 225 - 450 frames) */}
      <Sequence from={225} durationInFrames={225}>
        <Scene2Formula />
      </Sequence>

      {/* Sequence 3: Le Tarif d'Exception 1 850 000 FCFA (15s - 22.5s = 450 - 675 frames) */}
      <Sequence from={450} durationInFrames={225}>
        <Scene3Price />
      </Sequence>

      {/* Sequence 4: Appel à l'Action & Contacts ZAM (22.5s - 30s = 675 - 900 frames) */}
      <Sequence from={675} durationInFrames={225}>
        <Scene4CTA />
      </Sequence>

      {/* Dynamic Word-by-Word Synchronized Subtitles */}
      {captions && captions.length > 0 && (
        <CaptionOverlay
          words={captions}
          wordsPerPage={3}
          fontSize={48}
          highlightColor="#fbbf24"
          color="#ffffff"
          backgroundColor="rgba(6, 35, 26, 0.90)"
        />
      )}

      {/* Spiritual Ambient Soundtrack */}
      {resolvedSoundtrack ? (
        <Audio src={resolvedSoundtrack} volume={0.20} />
      ) : null}

      {/* French Voiceover Narration */}
      {resolvedNarration ? (
        <Audio src={resolvedNarration} volume={1.0} />
      ) : null}
    </AbsoluteFill>
  );
};

