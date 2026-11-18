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

export interface ProductSceneConfig {
  id: string;
  imageSrc: string;
  durationInFrames: number;
  mode?: 'flatlay' | 'lifestyle' | 'macro' | 'cta' | 'hero';
  title?: string;
  subtitle?: string;
  zoom?: 'in' | 'out' | 'none';
  pan?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export interface ProductShowcaseProps {
  scenes?: ProductSceneConfig[];
  narrationSrc?: string;
  soundtrackSrc?: string;
  musicVolume?: number;
  narrationVolume?: number;
  transitionFrames?: number;
  brandBadge?: string;
  accentColor?: string;
}

export const ProductShowcaseTemplate: React.FC<ProductShowcaseProps> = ({
  scenes = [],
  narrationSrc,
  soundtrackSrc,
  musicVolume = 0.22,
  narrationVolume = 1.0,
  transitionFrames = 15,
  brandBadge,
  accentColor = '#f59e0b',
}) => {
  const frame = useCurrentFrame();

  // Calculate accumulated frame offsets for each scene
  let currentStart = 0;
  const sceneSpans = scenes.map((s) => {
    const start = currentStart;
    const end = start + s.durationInFrames;
    currentStart = end;
    return { ...s, start, end };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', overflow: 'hidden' }}>
      {/* Background soundtrack */}
      {soundtrackSrc && (
        <Audio src={staticFile(soundtrackSrc)} volume={musicVolume} />
      )}

      {/* Synchronized narration */}
      {narrationSrc && (
        <Audio src={staticFile(narrationSrc)} volume={narrationVolume} />
      )}

      {/* Render Scenes with Cross-Dissolve Transitions */}
      {sceneSpans.map((scene, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === sceneSpans.length - 1;

        // Transition window
        const enterStart = isFirst ? scene.start : scene.start - transitionFrames;
        const exitEnd = isLast ? scene.end : scene.end + transitionFrames;

        if (frame < enterStart || frame > exitEnd) {
          return null;
        }

        // Relative frame within scene
        const localFrame = Math.max(0, frame - scene.start);
        const progress = Math.min(1, Math.max(0, localFrame / scene.durationInFrames));

        // Opacity crossfade
        let opacity = 1;
        if (!isFirst && frame < scene.start) {
          opacity = interpolate(frame, [enterStart, scene.start], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
        } else if (!isLast && frame > scene.end) {
          opacity = interpolate(frame, [scene.end, exitEnd], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
        }

        // Camera Dynamics (Zoom & Pan)
        const scaleFrom = scene.zoom === 'out' ? 1.15 : 1.0;
        const scaleTo = scene.zoom === 'in' ? 1.15 : (scene.zoom === 'out' ? 1.0 : 1.05);
        const scale = interpolate(progress, [0, 1], [scaleFrom, scaleTo], {
          easing: Easing.out(Easing.cubic),
        });

        let translateX = 0;
        if (scene.pan === 'left') {
          translateX = interpolate(progress, [0, 1], [25, -25]);
        } else if (scene.pan === 'right') {
          translateX = interpolate(progress, [0, 1], [-25, 25]);
        }

        let translateY = 0;
        if (scene.pan === 'up') {
          translateY = interpolate(progress, [0, 1], [20, -20]);
        } else if (scene.pan === 'down') {
          translateY = interpolate(progress, [0, 1], [-20, 20]);
        }

        return (
          <AbsoluteFill key={scene.id || idx} style={{ opacity, zIndex: idx + 1 }}>
            <Img
              src={staticFile(scene.imageSrc)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
                transformOrigin: '50% 50%',
              }}
            />

            {/* Optional Scene Badge / Title */}
            {(scene.title || brandBadge) && (
              <div
                style={{
                  position: 'absolute',
                  top: 70,
                  left: 60,
                  right: 60,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  pointerEvents: 'none',
                }}
              >
                {brandBadge && (
                  <div
                    style={{
                      background: 'rgba(0,0,0,0.65)',
                      backdropFilter: 'blur(8px)',
                      color: accentColor,
                      fontSize: 24,
                      fontWeight: 700,
                      padding: '8px 18px',
                      borderRadius: 24,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      border: `1px solid ${accentColor}44`,
                    }}
                  >
                    {brandBadge}
                  </div>
                )}
                {scene.title && (
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.92)',
                      color: '#0f172a',
                      fontSize: 22,
                      fontWeight: 600,
                      padding: '8px 16px',
                      borderRadius: 16,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    }}
                  >
                    {scene.title}
                  </div>
                )}
              </div>
            )}
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
