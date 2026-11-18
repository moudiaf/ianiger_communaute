import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from 'remotion';
import { Scene1FlatLay } from './rt100/Scene1FlatLay';
import { Scene2Lifestyle } from './rt100/Scene2Lifestyle';

/**
 * 10-second educational product video demonstrating 2 distinct photographic styles:
 * 0 to 5 seconds: FLAT LAY (90° overhead view, studio daylight, accessories)
 * 5 to 10 seconds: LIFESTYLE (modern everyday interior setting, natural warm light)
 *
 * Strict prompt constraints respected:
 * - Exact same product in both scenes
 * - Shape, colors, LCD screen, buttons, labels strictly preserved
 * - No text on screen
 * - No voiceover
 * - No subtitles
 * - Smooth camera motion (vertical zoom-in for flat lay, travelling for lifestyle)
 */
export const ProductRT100FlatLayLifestyle10s: React.FC = () => {
  const frame = useCurrentFrame();

  // Smooth crossfade overlap between frame 140 and 160 (4.67s to 5.33s)
  const scene2Opacity = interpolate(frame, [140, 160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      {/* Scene 1: Flat Lay (0 to 160 frames) */}
      {frame <= 160 && (
        <AbsoluteFill>
          <Scene1FlatLay />
        </AbsoluteFill>
      )}

      {/* Scene 2: Lifestyle (140 to 300 frames) with crossfade entry */}
      {frame >= 140 && (
        <AbsoluteFill style={{ opacity: scene2Opacity }}>
          <Sequence from={140} durationInFrames={160}>
            <Scene2Lifestyle />
          </Sequence>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
