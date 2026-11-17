import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow smooth Ken Burns push-in on the plane
  const scale = interpolate(frame, [0, 225], [1.02, 1.12], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, 225], [0, -15], {
    extrapolateRight: "clamp",
  });

  const entrance = spring({
    frame: frame - 5,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  const badgeSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#06231a", overflow: "hidden" }}>
      {/* Background Plane Image */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={resolveAsset("zamvoyage/plane.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.95) contrast(1.1)",
          }}
        />
      </AbsoluteFill>

      {/* Golden Light Flare & Emerald Gradient */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(6, 35, 26, 0.85) 0%, rgba(6, 35, 26, 0.2) 35%, rgba(6, 35, 26, 0.4) 70%, rgba(6, 35, 26, 0.9) 100%)",
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.35) 0%, transparent 60%)",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      {/* Top Agency Header */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: entrance,
          transform: `translateY(${interpolate(entrance, [0, 1], [-30, 0])}px)`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(6, 35, 26, 0.88)",
            backdropFilter: "blur(14px)",
            border: "1.5px solid rgba(251, 191, 36, 0.6)",
            borderRadius: 30,
            padding: "10px 24px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#fbbf24",
              boxShadow: "0 0 14px #fbbf24",
            }}
          />
          <span
            style={{
              color: "#ffffff",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}
          >
            ZAM AGENCE DE VOYAGE · NIAMEY
          </span>
        </div>
      </div>

      {/* Center Commercial Hero Banner */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: 60,
          right: 60,
          transform: `translateY(-50%) scale(${interpolate(badgeSpring, [0, 1], [0.85, 1])})`,
          opacity: badgeSpring,
          background: "linear-gradient(135deg, rgba(6, 45, 33, 0.92) 0%, rgba(4, 25, 18, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          border: "2px solid rgba(251, 191, 36, 0.7)",
          borderRadius: 28,
          padding: "36px 30px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(251, 191, 36, 0.2)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "#fbbf24",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          ★ ÉVÉNEMENT SACRÉ ★
        </div>
        <div
          style={{
            color: "#ffffff",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 54,
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            textShadow: "0 4px 20px rgba(0,0,0,0.8)",
          }}
        >
          OMRAH RAMADAN
        </div>
        <div
          style={{
            marginTop: 14,
            display: "inline-block",
            background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
            color: "#06231a",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: "0.08em",
            padding: "8px 28px",
            borderRadius: 20,
          }}
        >
          VIVEZ UNE EXPÉRIENCE UNIQUE
        </div>
      </div>
    </AbsoluteFill>
  );
};

