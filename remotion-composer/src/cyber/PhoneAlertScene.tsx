import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const PhoneAlertScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle camera zoom
  const cameraScale = interpolate(frame, [0, 150], [1, 1.08], {
    extrapolateRight: "clamp",
  });

  // Notification spring
  const notifProgress = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const notifY = interpolate(notifProgress, [0, 1], [-80, 0]);
  const notifOpacity = interpolate(notifProgress, [0, 1], [0, 1]);

  // Red STOP Stamp spring
  const stampProgress = spring({
    frame: frame - 72,
    fps,
    config: { damping: 12, stiffness: 220, mass: 0.8 },
  });
  const stampScale = interpolate(stampProgress, [0, 1], [3.2, 1]);
  const stampOpacity = interpolate(frame, [72, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse flash after stamp
  const stampFlash = interpolate(frame, [72, 78, 88], [0, 0.4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070b14",
        transform: `scale(${cameraScale})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Grotesk', -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Background Lighting & Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 40%, rgba(30, 58, 138, 0.35) 0%, rgba(7, 11, 20, 0.95) 75%)",
        }}
      />

      {/* Decorative cyber ambient circles */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "8%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(239, 68, 68, 0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "8%",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Red Alert Flash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#EF4444",
          opacity: stampFlash,
          pointerEvents: "none",
        }}
      />

      {/* Smartphone Container */}
      <div
        style={{
          position: "relative",
          width: 440,
          height: 820,
          borderRadius: 54,
          background: "linear-gradient(145deg, #2a3342, #111827)",
          padding: 14,
          boxShadow:
            "0 35px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(59, 130, 246, 0.25), inset 0 1px 3px rgba(255,255,255,0.3)",
          border: "2px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        {/* Smartphone Screen */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: 42,
            background: "linear-gradient(180deg, #090d16 0%, #111a2e 100%)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 18,
          }}
        >
          {/* Dynamic Island */}
          <div
            style={{
              width: 120,
              height: 28,
              borderRadius: 20,
              backgroundColor: "#000000",
              marginBottom: 35,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 10px",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#1e293b" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#065f46" }} />
          </div>

          {/* Lockscreen Time */}
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: "#F8FAFC",
              letterSpacing: -1,
              lineHeight: 1,
            }}
          >
            12:42
          </div>
          <div
            style={{
              fontSize: 16,
              color: "#94A3B8",
              marginTop: 6,
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            Vendredi 6 Novembre
          </div>

          {/* Urgent Notification Card */}
          {frame >= 18 && (
            <div
              style={{
                marginTop: 50,
                width: "90%",
                borderRadius: 24,
                background: "rgba(30, 41, 59, 0.92)",
                backdropFilter: "blur(20px)",
                border: "1.5px solid rgba(239, 68, 68, 0.4)",
                padding: "18px 20px",
                boxShadow:
                  "0 15px 35px rgba(0,0,0,0.5), 0 0 25px rgba(239, 68, 68, 0.2)",
                opacity: notifOpacity,
                transform: `translateY(${notifY}px)`,
              }}
            >
              {/* Notif Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      backgroundColor: "#10B981",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 15,
                    }}
                  >
                    💬
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#E2E8F0",
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                    }}
                  >
                    Message Urgent
                  </span>
                </div>
                <span style={{ fontSize: 12, color: "#94A3B8" }}>maintenant</span>
              </div>

              {/* Notif Title */}
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#FACC15",
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                🎉 Félicitations !
              </div>

              {/* Notif Body */}
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  lineHeight: 1.35,
                  marginBottom: 10,
                }}
              >
                Vous avez gagné{" "}
                <span style={{ color: "#4ADE80", fontWeight: 800 }}>
                  500 000 FCFA
                </span>
                . Cliquez ici pour récupérer votre gain immédiat :
              </div>

              {/* Suspicious URL */}
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#60A5FA",
                  textDecoration: "underline",
                  wordBreak: "break-all",
                  background: "rgba(15, 23, 42, 0.7)",
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: "1px dashed rgba(239, 68, 68, 0.5)",
                }}
              >
                🔗 http://gain500k-fcfa-retrait.biz/free
              </div>
            </div>
          )}

          {/* Bottom Swipe Bar */}
          <div
            style={{
              position: "absolute",
              bottom: 12,
              width: 140,
              height: 5,
              borderRadius: 4,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
            }}
          />
        </div>

        {/* STOP STAMP Overlay */}
        {frame >= 72 && (
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "-12%",
              width: "124%",
              transform: `scale(${stampScale}) rotate(-14deg)`,
              opacity: stampOpacity,
              zIndex: 50,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                border: "8px solid #EF4444",
                borderRadius: 20,
                backgroundColor: "rgba(153, 27, 27, 0.92)",
                boxShadow:
                  "0 0 50px rgba(239, 68, 68, 0.9), inset 0 0 30px rgba(239, 68, 68, 0.6)",
                padding: "16px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  textShadow: "0 4px 15px rgba(0,0,0,0.8)",
                  lineHeight: 1,
                }}
              >
                🛑 STOP !
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#FEE2E2",
                  letterSpacing: 3,
                  marginTop: 6,
                  textTransform: "uppercase",
                }}
              >
                NE CLIQUE PAS !
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Alert Badges in Background */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 24px",
          borderRadius: 30,
          background: "rgba(239, 68, 68, 0.15)",
          border: "1px solid rgba(239, 68, 68, 0.4)",
        }}
      >
        <span style={{ fontSize: 24 }}>🚨</span>
        <span
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#FCA5A5",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Alerte Escroquerie Phishing
        </span>
      </div>
    </AbsoluteFill>
  );
};

