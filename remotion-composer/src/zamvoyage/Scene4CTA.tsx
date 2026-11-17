import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene4CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  const ctaSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 15, stiffness: 90 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#06231a", overflow: "hidden" }}>
      {/* Background Graphic Pattern */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at center, rgba(6, 45, 33, 0.95) 0%, rgba(3, 20, 14, 0.98) 100%)",
        }}
      />

      {/* Subtle Golden Ray Beams */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(251, 191, 36, 0.22) 0%, transparent 65%)",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      {/* Urgent Badge at Top */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 60,
          right: 60,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "#dc2626",
            color: "#ffffff",
            padding: "8px 28px",
            borderRadius: 30,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "0.15em",
            boxShadow: "0 0 25px rgba(220, 38, 38, 0.6)",
          }}
        >
          ⚡ PLACES STRICTEMENT LIMITÉES ⚡
        </div>
      </div>

      {/* Official ZAM Badge Logo Centered */}
      <div
        style={{
          position: "absolute",
          top: "34%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${interpolate(logoSpring, [0, 1], [0.75, 1])})`,
          opacity: logoSpring,
          width: 320,
          height: 320,
          borderRadius: "50%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(251, 191, 36, 0.35)",
          overflow: "hidden",
          border: "4px solid #fbbf24",
        }}
      >
        <Img
          src={resolveAsset("zamvoyage/logo_zam.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Contacts and Booking Card */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 50,
          right: 50,
          opacity: ctaSpring,
          transform: `translateY(${interpolate(ctaSpring, [0, 1], [30, 0])}px)`,
          background: "linear-gradient(135deg, rgba(10, 48, 36, 0.95) 0%, rgba(5, 25, 18, 0.98) 100%)",
          backdropFilter: "blur(20px)",
          border: "2px solid rgba(251, 191, 36, 0.7)",
          borderRadius: 28,
          padding: "28px 24px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "#fbbf24",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.12em",
            marginBottom: 6,
          }}
        >
          RÉSERVEZ VOTRE DÉPART
        </div>

        <div
          style={{
            color: "#ffffff",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 38,
            fontWeight: 900,
            letterSpacing: "0.04em",
            marginBottom: 4,
          }}
        >
          📞 91 88 21 21
        </div>

        <div
          style={{
            color: "rgba(255, 255, 255, 0.85)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 14,
          }}
        >
          WhatsApp : 96 46 91 77 / 80 91 92 12
        </div>

        <div
          style={{
            background: "rgba(251, 191, 36, 0.15)",
            border: "1px solid rgba(251, 191, 36, 0.4)",
            borderRadius: 14,
            padding: "10px 16px",
            color: "#fbbf24",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          📍 Yantala Tchini Habou · Niamey, Niger
        </div>
      </div>
    </AbsoluteFill>
  );
};

