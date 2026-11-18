import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Scene1FlatLayPure } from "./fanta/Scene1FlatLayPure";
import { Scene2LifestylePure } from "./fanta/Scene2LifestylePure";

export const ProductFlatLayLifestyle10s: React.FC = () => {
  const frame = useCurrentFrame();

  // Total duration: 10.0 seconds = 300 frames at 30 fps.
  // Transition between frame 140 and 160 (smooth crossfade over 20 frames = ~0.66s)
  const transitionStart = 140;
  const transitionDuration = 20;

  const scene2Opacity = interpolate(
    frame,
    [transitionStart, transitionStart + transitionDuration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* De 0 à 5 secondes (0 - 160 frames) — FLAT LAY (vue strictement du dessus à 90°, surface claire, mouvement vertical et zoom progressif) */}
      <Sequence from={0} durationInFrames={160}>
        <Scene1FlatLayPure />
      </Sequence>

      {/* De 5 à 10 secondes (140 - 300 frames) — LIFESTYLE (situation de la vie quotidienne avec travelling doux fluide) */}
      <Sequence from={140} durationInFrames={160}>
        <div style={{ width: "100%", height: "100%", opacity: scene2Opacity }}>
          <Scene2LifestylePure />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
