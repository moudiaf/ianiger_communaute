import React from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { z } from "zod";
import { Scene1Intro } from "./rentecpay/Scene1Intro";
import { Scene2Meter } from "./rentecpay/Scene2Meter";
import { Scene3App } from "./rentecpay/Scene3App";
import { Scene4Connectivity } from "./rentecpay/Scene4Connectivity";
import { Scene5CTA } from "./rentecpay/Scene5CTA";
import { CaptionOverlay, WordCaption } from "./components/CaptionOverlay";
import { resolveAsset } from "./lib/resolveAsset";
import defaultCaptions from "./rentecpay/captions.json";

export const rentecPaySchema = z.object({
  narrationSrc: z.enum([
    "narration_rentecpay_remy.mp3",
    "narration_rentecpay_vivienne.mp3",
    "narration_rentecpay.mp3",
  ]),
  soundtrackSrc: z.enum([
    "soundtrack_rentecpay_ducked.mp3",
    "soundtrack_rentecpay.mp3",
    "soundtrack_rentecpay_soft.mp3",
  ]),
  narrationVolume: z.number().min(0).max(1.5).step(0.05),
  musicVolume: z.number().min(0).max(1).step(0.05),
  enableSfx: z.boolean(),
  sfxVolume: z.number().min(0).max(1).step(0.05),
  showCaptions: z.boolean(),
  captionHighlightColor: z.enum(["#38bdf8", "#fbbf24", "#22c55e", "#ffffff"]),
});

export type RentecPayRT100AdProps = z.infer<typeof rentecPaySchema> & {
  captions?: WordCaption[];
};

export const RentecPayRT100Ad: React.FC<RentecPayRT100AdProps> = ({
  narrationSrc = "narration_rentecpay_remy.mp3",
  soundtrackSrc = "soundtrack_rentecpay_ducked.mp3",
  narrationVolume = 1.0,
  musicVolume = 0.25,
  enableSfx = true,
  sfxVolume = 0.30,
  showCaptions = true,
  captionHighlightColor = "#38bdf8",
  captions = defaultCaptions as WordCaption[],
}) => {
  const resolvedNarration = resolveAsset(narrationSrc);
  const resolvedSoundtrack = resolveAsset(soundtrackSrc);
  const whooshSfx = resolveAsset("sfx/whoosh.mp3");
  const chimeSfx = resolveAsset("sfx/chime.mp3");

  return (
    <AbsoluteFill style={{ backgroundColor: "#040d21" }}>
      {/* Séquence 1 : Intro & Accroche (0.0s - 6.4s = 0 - 192 frames) */}
      <Sequence from={0} durationInFrames={192}>
        <Scene1Intro />
      </Sequence>

      {/* Séquence 2 : Compteur RT100 & 5 Atouts (6.4s - 13.2s = 192 - 396 frames) */}
      <Sequence from={192} durationInFrames={204}>
        <Scene2Meter />
      </Sequence>

      {/* Séquence 3 : Application Mobile RENTecPay (13.2s - 19.3s = 396 - 579 frames) */}
      <Sequence from={396} durationInFrames={183}>
        <Scene3App />
      </Sequence>

      {/* Séquence 4 : Modules PLC / RF / GPRS & Cibles (19.3s - 25.4s = 579 - 762 frames) */}
      <Sequence from={579} durationInFrames={183}>
        <Scene4Connectivity />
      </Sequence>

      {/* Séquence 5 : Conclusion & Appel à l'Action (25.4s - 34.0s = 762 - 1020 frames) */}
      <Sequence from={762} durationInFrames={258}>
        <Scene5CTA />
      </Sequence>

      {/* Transition Sound Effects (SFX) */}
      {enableSfx && whooshSfx && (
        <>
          <Sequence from={188} durationInFrames={24}>
            <Audio src={whooshSfx} volume={sfxVolume} />
          </Sequence>
          <Sequence from={392} durationInFrames={24}>
            <Audio src={whooshSfx} volume={sfxVolume} />
          </Sequence>
          <Sequence from={575} durationInFrames={24}>
            <Audio src={whooshSfx} volume={sfxVolume} />
          </Sequence>
        </>
      )}
      {enableSfx && chimeSfx && (
        <Sequence from={760} durationInFrames={45}>
          <Audio src={chimeSfx} volume={sfxVolume} />
        </Sequence>
      )}

      {/* Dynamic Word-by-Word Subtitles */}
      {showCaptions && captions && captions.length > 0 && (
        <CaptionOverlay
          words={captions}
          wordsPerPage={4}
          fontSize={44}
          highlightColor={captionHighlightColor}
          color="#ffffff"
          backgroundColor="rgba(4, 13, 33, 0.90)"
        />
      )}

      {/* Sidechain-Ducked Music Bed */}
      {resolvedSoundtrack ? (
        <Audio src={resolvedSoundtrack} volume={musicVolume} />
      ) : null}

      {/* Studio-Mastered French Voiceover Narration */}
      {resolvedNarration ? (
        <Audio src={resolvedNarration} volume={narrationVolume} />
      ) : null}
    </AbsoluteFill>
  );
};
