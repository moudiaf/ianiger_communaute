import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene1FlatLayPure: React.FC = () => {
  const frame = useCurrentFrame();

  // "vue strictement du dessus à 90 degrés."
  // "Le produit repose sur une surface claire, avec quelques accessoires décoratifs adaptés à sa nature."
  // "La caméra effectue un léger mouvement vertical et un zoom progressif."
  // 5 seconds = 150 frames.
  const scale = interpolate(frame, [0, 150], [1.02, 1.16], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, 150], [15, -20], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#f8f9fa", overflow: "hidden" }}>
      {/* Surface claire avec texture et ombrage studio naturel */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #ffffff 0%, #f1f5f9 60%, #e2e8f0 100%)",
        }}
      />

      {/* Ombre portée photoréaliste sous le produit (90° overhead lighting) */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 720,
            height: 720,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(15, 23, 42, 0.16) 0%, rgba(15, 23, 42, 0.04) 50%, transparent 75%)",
            filter: "blur(20px)",
            transform: `scale(${scale * 0.95}) translateY(${translateY + 25}px)`,
          }}
        />
      </AbsoluteFill>

      {/* Le produit de référence strictement conservé */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={resolveAsset("fanta/product_ref.jpg")}
          style={{
            width: "82%",
            height: "auto",
            maxHeight: "85%",
            objectFit: "contain",
            filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.12)) contrast(1.03)",
          }}
        />
      </AbsoluteFill>

      {/* Éclairage zénithal doux et élégant */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.4) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
