import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene4Storyboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "quatre petites vignettes illustrant les étapes d'une publicité."
  // Followed by: "Lequel préférez-vous ? 1, 2, 3 ou 4 ?"
  const scale = interpolate(frame, [0, 160], [1.02, 1.1], {
    extrapolateRight: "clamp",
  });

  const badgeSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Call to action prompt at 2.5s (frame 75)
  const ctaSpring = spring({
    frame: frame - 70,
    fps,
    config: { damping: 12, stiffness: 95 },
  });

  const pulse = Math.sin(frame / 5) * 0.05 + 1.0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0a09", overflow: "hidden" }}>
      {/* Background Image: Storyboard grid */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={resolveAsset("ianiger/storyboard.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.92) contrast(1.1)",
          }}
        />
      </AbsoluteFill>

      {/* Atmospheric Vignette */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(12, 10, 9, 0.88) 0%, rgba(12, 10, 9, 0.2) 35%, rgba(12, 10, 9, 0.35) 65%, rgba(12, 10, 9, 0.95) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 130,
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        {/* Style Tag Card: 4 — /Storyboard */}
        <div
          style={{
            opacity: interpolate(badgeSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(badgeSpring, [0, 1], [30, 0])}px) scale(${interpolate(badgeSpring, [0, 1], [0.92, 1])})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 42px",
            background: "rgba(24, 18, 12, 0.92)",
            backdropFilter: "blur(16px)",
            borderRadius: 24,
            border: "2px solid rgba(245, 158, 11, 0.8)",
            boxShadow:
              "0 14px 40px rgba(0, 0, 0, 0.8), 0 0 35px rgba(245, 158, 11, 0.4)",
            marginBottom: 35,
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, monospace, sans-serif",
              fontSize: 60,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: 2,
              margin: 0,
              textShadow: "0 4px 20px rgba(245, 158, 11, 0.5)",
            }}
          >
            4 — /Storyboard
          </span>
          <div
            style={{
              width: 140,
              height: 3,
              background:
                "linear-gradient(90deg, transparent, #fbbf24, transparent)",
              margin: "8px 0",
            }}
          />
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 24,
              fontWeight: 700,
              color: "#fde68a",
              textAlign: "center",
            }}
          >
            Préparez votre vidéo en images
          </span>
        </div>

        {/* Call To Action Box: « Lequel préférez-vous ? 1, 2, 3 ou 4 ? » */}
        <div
          style={{
            opacity: interpolate(ctaSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(ctaSpring, [0, 1], [0.85, 1]) * pulse}) translateY(${interpolate(ctaSpring, [0, 1], [40, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "28px 44px",
            background:
              "linear-gradient(135deg, rgba(245, 158, 11, 0.96) 0%, rgba(217, 119, 6, 0.96) 100%)",
            borderRadius: 28,
            border: "3px solid #fef3c7",
            boxShadow:
              "0 16px 50px rgba(0, 0, 0, 0.8), 0 0 40px rgba(245, 158, 11, 0.6)",
            maxWidth: 760,
            width: "100%",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 34,
              fontWeight: 900,
              color: "#3b1e05",
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 12,
            }}
          >
            Lequel préférez-vous ?
          </span>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              margin: "6px 0 14px 0",
            }}
          >
            {["1", "2", "3", "4"].map((n) => (
              <div
                key={n}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  fontWeight: 900,
                  color: "#b45309",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
                }}
              >
                {n}
              </div>
            ))}
          </div>
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: 1.5,
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            💬 Dites-le nous en commentaire !
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
