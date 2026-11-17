import React from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { Scene1Intro } from "./energietec/Scene1Intro";
import { Scene2Meter } from "./energietec/Scene2Meter";
import { Scene3AppModules } from "./energietec/Scene3AppModules";
import { Scene4Targets } from "./energietec/Scene4Targets";
import { Scene5CTA } from "./energietec/Scene5CTA";
import { CaptionOverlay, WordCaption } from "./components/CaptionOverlay";
import { resolveAsset } from "./lib/resolveAsset";
import defaultCaptions from "./energietec/captions.json";

export interface EnergieTecAdProps {
  narrationSrc?: string;
  soundtrackSrc?: string;
  captions?: WordCaption[];
}

export const EnergieTecAd: React.FC<EnergieTecAdProps> = ({
  narrationSrc = "energietec/narration_energietec.mp3",
  soundtrackSrc = "energietec/soundtrack_energietec.mp3",
  captions = defaultCaptions as WordCaption[],
}) => {
  const resolvedNarration = resolveAsset(narrationSrc);
  const resolvedSoundtrack = resolveAsset(soundtrackSrc);

  return (
    <AbsoluteFill style={{ backgroundColor: "#021226" }}>
      {/* Séquence 1 : 0 - 3.0s (0 - 90 frames) : Accroche & Marque RT100 e-EnergieTEC */}
      <Sequence from={0} durationInFrames={90}>
        <Scene1Intro />
      </Sequence>

      {/* Séquence 2 : 3.0 - 6.5s (90 - 195 frames) : Zoom sur le Compteur RT100 & Norme STS */}
      <Sequence from={90} durationInFrames={105}>
        <Scene2Meter />
      </Sequence>

      {/* Séquence 3 : 6.5 - 10.0s (195 - 300 frames) : Zoom Smartphone RENTecPay & Modules PLC/RF/GPRS */}
      <Sequence from={195} durationInFrames={105}>
        <Scene3AppModules />
      </Sequence>

      {/* Séquence 4 : 10.0 - 13.0s (300 - 390 frames) : Cibles (Maisons, Commerces, Bureaux) */}
      <Sequence from={300} durationInFrames={90}>
        <Scene4Targets />
      </Sequence>

      {/* Séquence 5 : 13.0 - 16.2s (390 - 486 frames) : Call to action & Bouton Commandez maintenant */}
      <Sequence from={390} durationInFrames={96}>
        <Scene5CTA />
      </Sequence>

      {/* Dynamic Word-by-Word Synchronized Subtitles in Cyan / Yellow Highlighting */}
      {captions && captions.length > 0 && (
        <CaptionOverlay
          words={captions}
          wordsPerPage={4}
          fontSize={44}
          highlightColor="#38bdf8"
          color="#ffffff"
          backgroundColor="rgba(2, 18, 38, 0.92)"
        />
      )}

      {/* Modern High-Tech Ambient Soundtrack */}
      {resolvedSoundtrack ? (
        <Audio src={resolvedSoundtrack} volume={0.22} />
      ) : null}

      {/* French Professional Voiceover Narration */}
      {resolvedNarration ? (
        <Audio src={resolvedNarration} volume={1.0} />
      ) : null}
    </AbsoluteFill>
  );
};
