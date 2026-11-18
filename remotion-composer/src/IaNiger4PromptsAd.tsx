import React from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { Scene1FlatLay } from "./ianiger/Scene1FlatLay";
import { Scene2Lifestyle } from "./ianiger/Scene2Lifestyle";
import { Scene3KeyVisual } from "./ianiger/Scene3KeyVisual";
import { Scene4Storyboard } from "./ianiger/Scene4Storyboard";
import { CaptionOverlay, WordCaption } from "./components/CaptionOverlay";
import { resolveAsset } from "./lib/resolveAsset";
import defaultCaptions from "./ianiger/captions.json";

export interface IaNiger4PromptsAdProps {
  soundtrackSrc?: string;
  captions?: WordCaption[];
}

export const IaNiger4PromptsAd: React.FC<IaNiger4PromptsAdProps> = ({
  soundtrackSrc = "ianiger/soundtrack_ianiger.mp3",
  captions = defaultCaptions as WordCaption[],
}) => {
  const resolvedSoundtrack = resolveAsset(soundtrackSrc);
  const audioScene1 = resolveAsset("ianiger/scene1_flatlay.mp3");
  const audioScene2 = resolveAsset("ianiger/scene2_lifestyle.mp3");
  const audioScene3 = resolveAsset("ianiger/scene3_keyvisual.mp3");
  const audioScene4 = resolveAsset("ianiger/scene4_storyboard.mp3");

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0a09" }}>
      {/* Séquence 1 : 0 - 5.0s (0 - 150 frames) : Accroche & FlatLay */}
      <Sequence from={0} durationInFrames={150}>
        <Scene1FlatLay />
        {audioScene1 ? <Audio src={audioScene1} volume={1.0} /> : null}
      </Sequence>

      {/* Séquence 2 : 5.0 - 10.0s (150 - 300 frames) : Lifestyle */}
      <Sequence from={150} durationInFrames={150}>
        <Scene2Lifestyle />
        {audioScene2 ? <Audio src={audioScene2} volume={1.0} /> : null}
      </Sequence>

      {/* Séquence 3 : 10.0 - 15.0s (300 - 450 frames) : KeyVisual */}
      <Sequence from={300} durationInFrames={150}>
        <Scene3KeyVisual />
        {audioScene3 ? <Audio src={audioScene3} volume={1.0} /> : null}
      </Sequence>

      {/* Séquence 4 : 15.0 - 20.0s (450 - 600 frames) : Storyboard & 1, 2, 3 ou 4 ? */}
      <Sequence from={450} durationInFrames={150}>
        <Scene4Storyboard />
        {audioScene4 ? <Audio src={audioScene4} volume={1.0} /> : null}
      </Sequence>

      {/* Dynamic Word-by-Word Subtitles with Gold Highlighting */}
      {captions && captions.length > 0 && (
        <CaptionOverlay
          words={captions}
          wordsPerPage={4}
          fontSize={44}
          highlightColor="#fbbf24"
          color="#ffffff"
          backgroundColor="rgba(12, 10, 9, 0.90)"
        />
      )}

      {/* Discreet Atmospheric Background Music */}
      {resolvedSoundtrack ? (
        <Audio src={resolvedSoundtrack} volume={0.16} />
      ) : null}
    </AbsoluteFill>
  );
};
