import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Img, staticFile } from 'remotion';

export const Scene2Lifestyle: React.FC = () => {
  const frame = useCurrentFrame();

  // Frames 140 to 300 (relativized in Sequence starting at frame 140 -> 0 to 160)
  // Smooth travelling / slow push + pan
  const scale = interpolate(frame, [0, 160], [1.14, 1.02], {
    easing: Easing.out(Easing.quad),
    extrapolateRight: 'clamp',
  });

  const translateX = interpolate(frame, [0, 160], [30, -20], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(frame, [0, 160], [-15, 10], {
    easing: Easing.inOut(Easing.quad),
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#f3efe8',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Img
        src={staticFile('rt100/scene2_lifestyle.jpg')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          transformOrigin: '50% 40%',
        }}
      />
    </AbsoluteFill>
  );
};
