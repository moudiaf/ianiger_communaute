import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Img, staticFile } from 'remotion';

export const Scene1FlatLay: React.FC = () => {
  const frame = useCurrentFrame();

  // 0 to 160 frames (0 to ~5.3s)
  // Progressive zoom-in from 1.0 to 1.15
  const scale = interpolate(frame, [0, 160], [1.0, 1.15], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: 'clamp',
  });

  // Vertical drift
  const translateY = interpolate(frame, [0, 160], [0, -40], {
    easing: Easing.inOut(Easing.quad),
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#e6ded4',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Img
        src={staticFile('rt100/scene1_flatlay.jpg')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: '50% 45%',
        }}
      />
    </AbsoluteFill>
  );
};
