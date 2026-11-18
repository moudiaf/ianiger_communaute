import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  Audio,
  Img,
  interpolate,
  Easing,
  useCurrentFrame,
  staticFile,
} from 'remotion';

export const BilmaSelBlanc15s: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene 1: 0 to 125 (0 - 4.17s) - Vue aérienne du Ténéré
  const s1Scale = interpolate(frame, [0, 125], [1.0, 1.09], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: 'clamp',
  });
  const s1TranslateY = interpolate(frame, [0, 125], [10, -18], {
    easing: Easing.inOut(Easing.quad),
    extrapolateRight: 'clamp',
  });
  const s1Opacity = interpolate(frame, [110, 125], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Scene 2: 115 to 275 (3.83s - 9.17s) - Gros plan sur le sel et sac
  const f2 = frame - 115;
  const s2Scale = interpolate(f2, [0, 160], [1.02, 1.12], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const s2TranslateY = interpolate(f2, [0, 160], [12, -15], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const s2Opacity = interpolate(frame, [115, 125, 260, 275], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Scene 3: 265 to 395 (8.83s - 13.17s) - Présentation avec dattiers
  const f3 = frame - 265;
  const s3Scale = interpolate(f3, [0, 130], [1.0, 1.08], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const s3TranslateX = interpolate(f3, [0, 130], [25, -20], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const s3Opacity = interpolate(frame, [265, 275, 385, 395], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Scene 4: 385 to 450 (12.83s - 15.00s) - Titre final doré
  const f4 = frame - 385;
  const s4Scale = interpolate(f4, [0, 65], [1.06, 1.0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const s4Opacity = interpolate(frame, [385, 395], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Golden glow pulse for scene 4
  const glowPulse = interpolate(
    Math.sin((frame / 10) * Math.PI),
    [-1, 1],
    [0.9, 1.1]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#c8a268', overflow: 'hidden' }}>
      {/* Background Soundtrack (Instrumentale saharienne) */}
      <Audio
        src={staticFile('bilma/soundtrack.mp3')}
        volume={0.25}
      />

      {/* --- SCENE 1 : Ténéré & Bilma (0-4s) --- */}
      {frame <= 125 && (
        <AbsoluteFill style={{ opacity: s1Opacity }}>
          <Img
            src={staticFile('bilma/scene1_tenere.jpg')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${s1Scale}) translateY(${s1TranslateY}px)`,
              transformOrigin: '50% 45%',
            }}
          />
        </AbsoluteFill>
      )}

      {/* --- SCENE 2 : Gros plan cristaux & sac (4-9s) --- */}
      {frame >= 115 && frame <= 275 && (
        <AbsoluteFill style={{ opacity: s2Opacity }}>
          <Img
            src={staticFile('bilma/scene2_grosplan.jpg')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${s2Scale}) translateY(${s2TranslateY}px)`,
              transformOrigin: '50% 50%',
            }}
          />
        </AbsoluteFill>
      )}

      {/* --- SCENE 3 : Oasis & Dattiers (9-13s) --- */}
      {frame >= 265 && frame <= 395 && (
        <AbsoluteFill style={{ opacity: s3Opacity }}>
          <Img
            src={staticFile('bilma/scene3_dattiers.jpg')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${s3Scale}) translateX(${s3TranslateX}px)`,
              transformOrigin: '50% 55%',
            }}
          />
        </AbsoluteFill>
      )}

      {/* --- SCENE 4 : Titre signature doré (13-15s) --- */}
      {frame >= 385 && (
        <AbsoluteFill style={{ opacity: s4Opacity }}>
          <Img
            src={staticFile('bilma/scene4_titre_final.jpg')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${s4Scale * glowPulse})`,
              transformOrigin: '50% 50%',
            }}
          />
        </AbsoluteFill>
      )}

      {/* --- VOIX OFF SYNCHRONISÉE --- */}
      {/* Scene 1 (0 à 4s) : "Au cœur du désert du Niger, découvrez le sel blanc de Bilma !" */}
      <Sequence from={5} durationInFrames={115}>
        <Audio src={staticFile('bilma/scene1.mp3')} volume={1.0} />
      </Sequence>

      {/* Scene 2 (4 à 9s) : "Le sel blanc de Bilma, un produit de notre terroir." */}
      <Sequence from={120} durationInFrames={145}>
        <Audio src={staticFile('bilma/scene2.mp3')} volume={1.0} />
      </Sequence>

      {/* Scene 3 (9 à 13s) : "Bilma, une origine qui mérite d'être connue." */}
      <Sequence from={270} durationInFrames={115}>
        <Audio src={staticFile('bilma/scene3.mp3')} volume={1.0} />
      </Sequence>

      {/* Scene 4 (13 à 15s) : "Sel blanc de Bilma !" */}
      <Sequence from={390} durationInFrames={60}>
        <Audio src={staticFile('bilma/scene4.mp3')} volume={1.0} />
      </Sequence>
    </AbsoluteFill>
  );
};
