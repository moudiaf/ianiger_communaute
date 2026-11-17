import React from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { Scene1Brand } from "./fanta/Scene1Brand";
import { Scene2Products } from "./fanta/Scene2Products";
import { Scene3Atouts } from "./fanta/Scene3Atouts";
import { Scene4Slogan } from "./fanta/Scene4Slogan";
import { Scene5Contact } from "./fanta/Scene5Contact";
import { CaptionOverlay, WordCaption } from "./components/CaptionOverlay";
import { resolveAsset } from "./lib/resolveAsset";
import defaultCaptions from "./fanta/captions.json";

export interface FantaParfumerieAdProps {
  narrationSrc?: string;
  soundtrackSrc?: string;
  captions?: WordCaption[];
}

export const FantaParfumerieAd: React.FC<FantaParfumerieAdProps> = ({
  narrationSrc = "narration_fanta.mp3",
  soundtrackSrc = "soundtrack_fanta.mp3",
  captions = defaultCaptions as WordCaption[],
}) => {
  const resolvedNarration = resolveAsset(narrationSrc);
  const resolvedSoundtrack = resolveAsset(soundtrackSrc);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0804" }}>
      {/* Séquence 1: 0 - 4 s (0 - 120 frames) : Apparition du nom et de la marque */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1Brand />
      </Sequence>

      {/* Séquence 2: 4 - 8 s (120 - 240 frames) : Mise en valeur des produits (zoom progressif) */}
      <Sequence from={120} durationInFrames={120}>
        <Scene2Products />
      </Sequence>

      {/* Séquence 3: 8 - 12 s (240 - 360 frames) : Présentation des 3 atouts */}
      <Sequence from={240} durationInFrames={120}>
        <Scene3Atouts />
      </Sequence>

      {/* Séquence 4: 12 - 16 s (360 - 480 frames) : Mise en avant du slogan */}
      <Sequence from={360} durationInFrames={120}>
        <Scene4Slogan />
      </Sequence>

      {/* Séquence 5: 16 - 20 s (480 - 600 frames) : Contact et conclusion (WhatsApp) */}
      <Sequence from={480} durationInFrames={120}>
        <Scene5Contact />
      </Sequence>

      {/* Dynamic Word-by-Word Subtitles Highlighted in Gold */}
      {captions && captions.length > 0 && (
        <CaptionOverlay
          words={captions}
          wordsPerPage={4}
          fontSize={44}
          highlightColor="#fbbf24"
          color="#ffffff"
          backgroundColor="rgba(12, 8, 4, 0.90)"
        />
      )}

      {/* Ambient Oriental Luxury Music Bed */}
      {resolvedSoundtrack ? (
        <Audio src={resolvedSoundtrack} volume={0.22} />
      ) : null}

      {/* French Voiceover Narration */}
      {resolvedNarration ? (
        <Audio src={resolvedNarration} volume={1.0} />
      ) : null}
    </AbsoluteFill>
  );
};

