import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { resolveAsset } from "../lib/resolveAsset";

export const Scene2LifestylePure: React.FC = () => {
  const frame = useCurrentFrame();

  // "Effectue une transition fluide vers une scène réaliste de la vie quotidienne dans laquelle le même produit est naturellement intégré."
  // "La caméra réalise un travelling doux pour mettre le produit en valeur."
  // "Conserver fidèlement le même produit dans les deux scènes."
  // 5 seconds = 150 frames.
  // Smooth cinematic horizontal & subtle depth travelling:
  const scale = interpolate(frame, [0, 150], [1.08, 1.18], {
    extrapolateRight: "clamp",
  });
  const translateX = interpolate(frame, [0, 150], [-25, 25], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, 150], [10, -10], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1e1b18", overflow: "hidden" }}>
      {/* Environnement réaliste de la vie quotidienne élégant (bois noble, lumière naturelle, flou cinématique de profondeur) */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(135deg, #2d2620 0%, #1f1a16 50%, #14110e 100%)",
        }}
      />

      {/* Lumière douce de fenêtre en fin d'après-midi (lumière chaude lifestyle) */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 80% 25%, rgba(251, 191, 36, 0.18) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Ombre de table de salon / coiffeuse élégante */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 780,
            height: 380,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.15) 50%, transparent 75%)",
            filter: "blur(28px)",
            transform: `translate(${translateX * 0.7}px, ${translateY + 140}px)`,
          }}
        />
      </AbsoluteFill>

      {/* Le produit fidèlement intégré dans la situation quotidienne avec travelling cinématique */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          transformOrigin: "center 60%",
        }}
      >
        <Img
          src={resolveAsset("fanta/product_ref.jpg")}
          style={{
            width: "82%",
            height: "auto",
            maxHeight: "85%",
            objectFit: "contain",
            filter: "drop-shadow(0 25px 35px rgba(0, 0, 0, 0.35)) brightness(0.98) contrast(1.08)",
          }}
        />
      </AbsoluteFill>

      {/* Reflet doux et vignette cinématographique naturelle */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(20, 17, 14, 0.25) 0%, transparent 40%, rgba(10, 8, 6, 0.5) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
