
import { useState, useEffect, useRef } from "react";
import bg from "../assets/prizes/bg.png";

/* ══════════════════════════════════════════════════════
   WINNER DATA — update names & classes after results
   ══════════════════════════════════════════════════════ */
const WINNERS = {
  learner: [
    { rank: 1, name: "Adnan",   studentClass: "" },
    { rank: 2, name: "Abrar",   studentClass: "" },
    { rank: 3, name: "Ritik",   studentClass: "" },
  ],
  pro: [
    { rank: 1, name: "Rohan",     studentClass: "STCS" },
    { rank: 2, name: "Princess",  studentClass: "TTCS" },
    { rank: 3, name: "Prateek",   studentClass: "STCS" },
  ],
};

const RANK_STYLE = {
  1: { medal: "🥇", color: "#FFD700", rgb: "255,215,0",   label: "Champion",       podiumH: 150 },
  2: { medal: "🥈", color: "#C0C0C0", rgb: "192,192,192", label: "Runner-up",       podiumH: 110 },
  3: { medal: "🥉", color: "#CD7F32", rgb: "205,127,50",  label: "2nd Runner-up",   podiumH: 80  },
};

/* ══════════════════════════════════════════════════════
   CONFETTI CANVAS
   ══════════════════════════════════════════════════════ */
const ConfettiCanvas = ({ trigger }) => {
  const ref = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const COLORS = ["#00FFC2", "#a855f7", "#FFD700", "#ef4444", "#3b82f6", "#f97316", "#ffffff", "#ec4899"];
    const particles = Array.from({ length: 220 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 120,
      vx: (Math.random() - 0.5) * 9,
      vy: Math.random() * 4 + 1.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      w: Math.random() * 11 + 5,
      h: Math.random() * 6 + 3,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 14,
      opacity: 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.07;
        p.vx *= 0.99;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.005;
        if (p.opacity <= 0 || p.y > canvas.height + 20) return;
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (alive) frameRef.current = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [trigger]);

  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100 }}
    />
  );
};

/* ══════════════════════════════════════════════════════
   SINGLE WINNER CARD + PODIUM BASE
   ══════════════════════════════════════════════════════ */
const WinnerCard = ({ winner, revealed, delay }) => {
  const rs = RANK_STYLE[winner.rank];
  const isFirst = winner.rank === 1;

  const handleShare = () => {
    const text = `🏆 ${winner.name} secured Rank ${winner.rank} (${rs.label}) in MGM CodeClash 2.0!\n#MGMCodeClash #GDGMGMCoET #CodeClash2`;
    if (navigator.share) {
      navigator.share({ title: "MGM CodeClash 2.0 Winner!", text });
    } else {
      navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
    }
  };

  return (
    <div
      className={`podium-card podium-card-${winner.rank}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`,
      }}
    >
      {/* Crown above rank-1 */}
      {isFirst && (
        <span
          style={{
            fontSize: "2.2rem",
            display: "block",
            marginBottom: "4px",
            animation: "crownBounce 1.4s ease-in-out infinite",
            filter: "drop-shadow(0 0 14px rgba(255,215,0,0.9))",
          }}
        >
          👑
        </span>
      )}

      {/* Card */}
      <div
        style={{
          position: "relative",
          borderRadius: "18px",
          padding: isFirst ? "26px 22px 20px" : "18px 18px 14px",
          background: `rgba(${rs.rgb}, 0.07)`,
          border: `1px solid rgba(${rs.rgb}, ${isFirst ? "0.55" : "0.28"})`,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          textAlign: "center",
          width: isFirst ? "168px" : "142px",
          boxShadow: isFirst
            ? `0 0 48px rgba(${rs.rgb},0.28), 0 0 100px rgba(${rs.rgb},0.08)`
            : `0 0 18px rgba(${rs.rgb},0.12)`,
          transform: isFirst ? "scale(1.07)" : "scale(1)",
        }}
      >
        {/* Spotlight shimmer on rank-1 */}
        {isFirst && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "18px",
              background: `radial-gradient(ellipse at 50% 0%, rgba(${rs.rgb},0.22) 0%, transparent 65%)`,
              animation: "spotlightPulse 2.2s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Medal emoji */}
        <div style={{ fontSize: isFirst ? "2.8rem" : "2.1rem", lineHeight: 1, marginBottom: "10px" }}>
          {rs.medal}
        </div>

        {/* Rank label */}
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "0.58rem",
            fontWeight: "700",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: rs.color,
            marginBottom: "6px",
          }}
        >
          {rs.label}
        </div>

        {/* Name */}
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "700",
            fontSize: isFirst ? "1.05rem" : "0.9rem",
            lineHeight: 1.3,
            marginBottom: "6px",
            ...(isFirst
              ? {
                  backgroundImage: `linear-gradient(135deg, ${rs.color}, #fff)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }
              : { color: "#ffffff" }),
          }}
        >
          {winner.name}
        </div>

        {/* Class badge */}
        <div
          style={{
            display: "inline-block",
            fontFamily: "monospace",
            fontSize: "0.68rem",
            color: "rgba(255,255,255,0.5)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "6px",
            padding: "2px 10px",
            marginBottom: isFirst ? "10px" : "0",
          }}
        >
          {winner.studentClass}
        </div>

        {/* "You made it" — rank 1 only */}
        {isFirst && (
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "0.62rem",
              color: "#00FFC2",
              fontWeight: "700",
              letterSpacing: "0.04em",
            }}
          >
            You made it to the top 🚀
          </div>
        )}
      </div>

      {/* Podium base */}
      <div
        className="podium-base"
        style={{
          width: isFirst ? "168px" : "142px",
          height: `${rs.podiumH}px`,
          background: `linear-gradient(180deg, rgba(${rs.rgb},0.16) 0%, rgba(${rs.rgb},0.04) 100%)`,
          border: `1px solid rgba(${rs.rgb},0.18)`,
          borderTop: "none",
          borderRadius: "0 0 10px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "900",
            fontSize: isFirst ? "2.8rem" : "2.1rem",
            color: `rgba(${rs.rgb},0.28)`,
            userSelect: "none",
          }}
        >
          {winner.rank}
        </span>
      </div>

      {/* Share button */}
      <button
        onClick={handleShare}
        style={{
          marginTop: "12px",
          fontFamily: "monospace",
          fontSize: "0.65rem",
          fontWeight: "700",
          letterSpacing: "0.05em",
          color: rs.color,
          background: `rgba(${rs.rgb},0.08)`,
          border: `1px solid rgba(${rs.rgb},0.28)`,
          borderRadius: "999px",
          padding: "6px 16px",
          cursor: "pointer",
          transition: "background 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = `rgba(${rs.rgb},0.18)`; e.currentTarget.style.boxShadow = `0 0 12px rgba(${rs.rgb},0.3)`; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = `rgba(${rs.rgb},0.08)`; e.currentTarget.style.boxShadow = "none"; }}
      >
        🔗 Share
      </button>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   TRACK SECTION
   ══════════════════════════════════════════════════════ */
const TrackSection = ({ title, accentColor, accentRgb, winners, onReveal }) => {
  const [revealed, setRevealed] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  const handleReveal = () => {
    if (unlocking || revealed) return;
    setUnlocking(true);
    setTimeout(() => {
      setRevealed(true);
      onReveal();
    }, 900);
  };

  return (
    <div
      style={{
        position: "relative",
        marginBottom: "3.5rem",
        borderRadius: "26px",
        padding: "2.5rem 2rem",
        background: "rgba(255,255,255,0.025)",
        border: `1px solid rgba(${accentRgb},0.18)`,
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        boxShadow: `0 0 70px rgba(${accentRgb},0.05)`,
        overflow: "hidden",
      }}
    >
      {/* Corner accents */}
      <span style={{ position: "absolute", top: "14px", left: "14px", width: "20px", height: "20px", borderTop: `1.5px solid rgba(${accentRgb},0.5)`, borderLeft: `1.5px solid rgba(${accentRgb},0.5)`, borderRadius: "4px 0 0 0" }} />
      <span style={{ position: "absolute", bottom: "14px", right: "14px", width: "20px", height: "20px", borderBottom: `1.5px solid rgba(${accentRgb},0.5)`, borderRight: `1.5px solid rgba(${accentRgb},0.5)`, borderRadius: "0 0 4px 0" }} />

      {/* Section title */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "0.62rem",
            fontWeight: "700",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: accentColor,
            background: `rgba(${accentRgb},0.1)`,
            border: `1px solid rgba(${accentRgb},0.22)`,
            borderRadius: "999px",
            padding: "4px 18px",
          }}
        >
          Track
        </span>
        <h2
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "800",
            fontSize: "clamp(1.5rem,5vw,2.2rem)",
            marginTop: "0.6rem",
            marginBottom: 0,
            backgroundImage: `linear-gradient(to right, ${accentColor}, #ffffff)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {title}
        </h2>
      </div>

      {/* ── LOCKED STATE ── */}
      {!revealed && (
        <div style={{ textAlign: "center" }}>
          {/* Blurred mystery silhouettes */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: "1rem",
              marginBottom: "2rem",
              filter: "blur(8px)",
              opacity: 0.25,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {[
              { rank: 2, h: 240 },
              { rank: 1, h: 290 },
              { rank: 3, h: 210 },
            ].map(({ rank, h }) => (
              <div
                key={rank}
                style={{
                  width: rank === 1 ? "168px" : "142px",
                  height: `${h}px`,
                  borderRadius: "18px 18px 10px 10px",
                  background: `rgba(${accentRgb},0.12)`,
                  border: `1px solid rgba(${accentRgb},0.18)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                  color: `rgba(${accentRgb},0.5)`,
                  fontWeight: "900",
                }}
              >
                ?
              </div>
            ))}
          </div>

          {/* Reveal button */}
          <button
            onClick={handleReveal}
            disabled={unlocking}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "700",
              fontSize: "1rem",
              color: "#000",
              background: unlocking
                ? `rgba(${accentRgb},0.45)`
                : `linear-gradient(to right, ${accentColor}, #a855f7)`,
              border: "none",
              borderRadius: "9999px",
              padding: "14px 40px",
              cursor: unlocking ? "wait" : "pointer",
              boxShadow: `0 0 28px rgba(${accentRgb},0.35)`,
              animation: unlocking ? "none" : "pulseBtn 1.8s ease-in-out infinite",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => { if (!unlocking) e.currentTarget.style.transform = "scale(1.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            {unlocking ? "🔓 Unlocking..." : "🔐 Reveal Winners"}
          </button>
          <p
            style={{
              marginTop: "0.75rem",
              fontFamily: "monospace",
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.1em",
            }}
          >
            Click to unveil the champions
          </p>
        </div>
      )}

      {/* ── REVEALED PODIUM ── */}
      {revealed && (
        <div
          className="podium-wrap"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {/* Render in podium order: 2nd | 1st | 3rd */}
          {[
            winners.find((w) => w.rank === 2),
            winners.find((w) => w.rank === 1),
            winners.find((w) => w.rank === 3),
          ].map((w, i) =>
            w ? <WinnerCard key={w.rank} winner={w} revealed={revealed} delay={i * 0.14} /> : null
          )}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════ */
export default function Winners() {
  const [confettiKey, setConfettiKey] = useState(0);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100dvh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "linear-gradient(135deg,rgba(2,13,20,0.88) 0%,rgba(5,13,26,0.93) 30%,rgba(12,8,24,0.96) 60%,rgba(8,9,9,0.88) 100%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* Radial glows */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(ellipse 60% 40% at 10% 20%,rgba(0,255,194,0.07) 0%,transparent 70%), radial-gradient(ellipse 50% 40% at 90% 80%,rgba(168,85,247,0.08) 0%,transparent 70%)",
        }}
      />

      <ConfettiCanvas trigger={confettiKey} />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "920px",
          margin: "0 auto",
          padding: "7rem 1.25rem 3rem",
        }}
      >
        {/* ── Page header ── */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            style={{
              fontSize: "3.8rem",
              lineHeight: 1,
              marginBottom: "0.6rem",
              animation: "trophyRock 2.8s ease-in-out infinite",
              display: "inline-block",
              filter: "drop-shadow(0 0 20px rgba(255,215,0,0.6))",
            }}
          >
            🏆
          </div>
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "900",
              fontSize: "clamp(2.2rem,8vw,4rem)",
              backgroundImage: "linear-gradient(to right, #FFD700, #00FFC2, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: "0 0 0.3rem",
              lineHeight: 1.05,
            }}
          >
            Winners
          </h1>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "300",
              fontSize: "clamp(0.9rem,3vw,1.2rem)",
              color: "rgba(255,255,255,0.55)",
              margin: "0 0 0.75rem",
              letterSpacing: "0.06em",
            }}
          >
            MGM CodeClash 2.0
          </p>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            15 April 2026 · GDG on Campus MGMCoET
          </span>
        </div>

        {/* ── Track sections ── */}
        <TrackSection
          title="Learner Track"
          accentColor="#00FFC2"
          accentRgb="0,255,194"
          winners={WINNERS.learner}
          onReveal={() => setConfettiKey((k) => k + 1)}
        />
        <TrackSection
          title="Pro Track"
          accentColor="#a855f7"
          accentRgb="168,85,247"
          winners={WINNERS.pro}
          onReveal={() => setConfettiKey((k) => k + 1)}
        />
      </div>

      {/* ── Global animations ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700;800;900&display=swap');

        @keyframes crownBounce {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50%       { transform: translateY(-9px) rotate(6deg); }
        }
        @keyframes spotlightPulse {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 1; }
        }
        @keyframes pulseBtn {
          0%, 100% { transform: scale(1); box-shadow: 0 0 28px rgba(0,255,194,0.35); }
          50%       { transform: scale(1.03); box-shadow: 0 0 44px rgba(0,255,194,0.55); }
        }
        @keyframes trophyRock {
          0%,100% { transform: rotate(-8deg) scale(1);    }
          25%     { transform: rotate(0deg)  scale(1.12); }
          50%     { transform: rotate(8deg)  scale(1);    }
          75%     { transform: rotate(0deg)  scale(1.12); }
        }

        /* Mobile: stack podium vertically in rank order */
        @media (max-width: 600px) {
          .podium-wrap {
            flex-direction: column !important;
            align-items: center !important;
          }
          .podium-card-1 { order: 1; }
          .podium-card-2 { order: 2; }
          .podium-card-3 { order: 3; }
          .podium-base   { display: none !important; }
        }
      `}</style>
    </div>
  );
}
