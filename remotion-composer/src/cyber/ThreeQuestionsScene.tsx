import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface QuestionCardProps {
  number: number;
  icon: string;
  question: string;
  explanation: string;
  tag: string;
  tagColor: string;
  startFrame: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  number,
  icon,
  question,
  explanation,
  tag,
  tagColor,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  const x = interpolate(progress, [0, 1], [80, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.92, 1]);

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        transform: `translateX(${x}px) scale(${scale})`,
        opacity,
        background: "linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))",
        borderRadius: 20,
        border: `2px solid ${tagColor}44`,
        boxShadow: `0 12px 30px rgba(0,0,0,0.4), 0 0 20px ${tagColor}22`,
        padding: "20px 28px",
        display: "flex",
        alignItems: "center",
        gap: 24,
        marginBottom: 20,
        width: 1050,
      }}
    >
      {/* Icon Badge */}
      <div
        style={{
          width: 76,
          height: 76,
          borderRadius: 22,
          background: `radial-gradient(circle, ${tagColor}33 0%, rgba(15, 23, 42, 0.8) 100%)`,
          border: `2px solid ${tagColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 38,
          flexShrink: 0,
          boxShadow: `0 0 15px ${tagColor}55`,
        }}
      >
        {icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              padding: "4px 12px",
              borderRadius: 20,
              backgroundColor: tagColor,
              color: "#0F172A",
              textTransform: "uppercase",
              letterSpacing: 0.8,
            }}
          >
            Question {number}
          </span>
          <span style={{ fontSize: 14, color: "#94A3B8", fontWeight: 600 }}>{tag}</span>
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#F8FAFC",
            letterSpacing: -0.5,
            marginBottom: 6,
          }}
        >
          {question}
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#CBD5E1",
            lineHeight: 1.4,
            fontWeight: 500,
          }}
        >
          {explanation}
        </div>
      </div>
    </div>
  );
};

export const ThreeQuestionsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 },
  });
  const titleY = interpolate(titleProgress, [0, 1], [-40, 0]);
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#080c16",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Grotesk', -apple-system, sans-serif",
        padding: "60px 80px",
        overflow: "hidden",
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 60% 50%, rgba(37, 99, 235, 0.25) 0%, rgba(8, 12, 22, 0.95) 80%)",
        }}
      />

      {/* Subtle animated cyber grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.6,
        }}
      />

      {/* Header Title */}
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          textAlign: "center",
          marginBottom: 36,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 20px",
            borderRadius: 30,
            backgroundColor: "rgba(245, 158, 11, 0.15)",
            border: "1px solid rgba(245, 158, 11, 0.4)",
            color: "#FBBF24",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          <span>⚡</span> RÉFLEXES DE CYBERSÉCURITÉ
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: -0.5,
          }}
        >
          Pose-toi <span style={{ color: "#38BDF8" }}>3 questions rapides</span>
        </div>
      </div>

      {/* 3 Interactive Cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <QuestionCard
          number={1}
          icon="❓"
          question="Qui t'écrit ?"
          explanation="Connais-tu vraiment l'expéditeur ? Vérifie le numéro ou l'adresse email réelle."
          tag="Vérification d'identité"
          tagColor="#38BDF8"
          startFrame={20}
        />
        <QuestionCard
          number={2}
          icon="⚡"
          question="Pourquoi cette urgence soudaine ?"
          explanation="« Cliquez immédiatement ! » : l'urgence artificielle est la marque numéro 1 des arnaqueurs."
          tag="Pression psychologique"
          tagColor="#F59E0B"
          startFrame={95}
        />
        <QuestionCard
          number={3}
          icon="🔒"
          question="Quelles données personnelles réclame-t-on ?"
          explanation="Identifiants, code secret SMS (OTP), numéro de compte : ne transmets JAMAIS rien !"
          tag="Protection des données"
          tagColor="#EF4444"
          startFrame={175}
        />
      </div>
    </AbsoluteFill>
  );
};

