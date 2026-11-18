import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { resolveAsset } from "./lib/resolveAsset";

export const Rt100FlatLayLifestyle: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene 1 (0 - 5s = frames 0 - 150): Strict 90-deg Flat Lay
  // Subtle vertical drift + progressive zoom-in
  const s1Scale = interpolate(frame, [0, 165], [1.02, 1.13], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s1TranslateY = interpolate(frame, [0, 165], [18, -18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Smooth cross-dissolve transition around frame 150 (5.0s)
  const transitionProgress = interpolate(frame, [140, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 2 (5 - 10s = frames 150 - 300): Lifestyle
  // Gentle horizontal dolly tracking + subtle scale
  const s2Scale = interpolate(frame, [140, 300], [1.08, 1.14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s2TranslateX = interpolate(frame, [140, 300], [-28, 28], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#e5e5e0", overflow: "hidden" }}>
      {/* 0 to 5s: FLAT LAY (90-degree overhead) */}
      <AbsoluteFill
        style={{
          opacity: 1 - transitionProgress,
          transform: `scale(${s1Scale}) translateY(${s1TranslateY}px)`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={resolveAsset("rt100_showcase/scene1_flatlay.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>

      {/* 5 to 10s: LIFESTYLE (real-world home integration) */}
      <AbsoluteFill
        style={{
          opacity: transitionProgress,
          transform: `scale(${s2Scale}) translateX(${s2TranslateX}px)`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={resolveAsset("rt100_showcase/scene2_lifestyle.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
