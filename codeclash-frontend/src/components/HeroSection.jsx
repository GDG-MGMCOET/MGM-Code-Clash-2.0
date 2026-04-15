import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiCalendarMonthOutline,
  mdiMapMarkerOutline,
  mdiChevronRight,
  mdiAtom,
  mdiTrophyOutline,
  mdiSprout,
  mdiRocketLaunchOutline,
} from "@mdi/js";

/* ── Countdown hook ── */
function useCountdown(targetDate) {
  const calc = () => {
    const diff = new Date(targetDate) - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const Pad = (n) => String(n).padStart(2, "0");

const CountdownBox = ({ value, label }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.1)",
      background: "rgba(0,0,0,0.4)",
      padding: "10px 14px",
      minWidth: "60px",
      backdropFilter: "blur(8px)",
    }}
  >
    <span style={{ fontFamily: "monospace", fontSize: "clamp(1.4rem,5vw,1.875rem)", fontWeight: "700", color: "#00FFC2", lineHeight: 1 }}>
      {Pad(value)}
    </span>
    <span style={{ marginTop: "6px", fontSize: "10px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9ca3af" }}>
      {label}
    </span>
  </div>
);

const REGISTRATION_DEADLINE = new Date("2026-04-15T10:00:00+05:30");
const CONTEST_START        = new Date("2026-04-15T11:00:00+05:30");
const CONTEST_OPEN         = new Date("2026-04-15T11:00:00+05:30");

const HeroSection = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(() =>
    {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const registrationClosed = now >= REGISTRATION_DEADLINE.getTime();
  const contestOpen        = now >= CONTEST_OPEN.getTime();

  const countdownTarget = registrationClosed
    ? CONTEST_START.toISOString()
    : REGISTRATION_DEADLINE.toISOString();

  const { days, hours, minutes, seconds } = useCountdown(countdownTarget);

  return (
    <div className="hero-bg" style={{
      position: "relative",
      display: "flex",
      minHeight: "100dvh",
      width: "100%",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#080909",
      color: "white",
    }}>
      {/* Overlay — mobile: top-to-bottom, desktop: left-to-right via CSS classes */}
      <div className="hero-overlay-mobile hero-overlay-desktop" style={{ position: "absolute", inset: 0 }} />

      {/* Content grid */}
      <div style={{
        position: "relative",
        zIndex: 10,
        maxWidth: "1280px",
        margin: "0 auto",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "2rem",
        padding: "6rem 1.25rem 2.5rem",
        boxSizing: "border-box",
      }}
        className="lg:grid-cols-2"
      >
        {/* ── Left col ── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", gap: "1rem", minWidth: 0 }}>

          {/* Eyebrow */}
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(0.7rem,2.5vw,0.875rem)", fontWeight: "600", letterSpacing: "0.15em", color: "#00FFC2" }}>
            GDG MGMCoET PRESENTS
          </div>

          {/* Title */}
          <div style={{
            fontSize: "clamp(2rem, 7vw, 5rem)",
            lineHeight: 1.05,
            display: "flex",
            alignItems: "flex-end",
            gap: "0.25em",
            flexWrap: "nowrap",
            minWidth: 0,
          }}>
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "800",
              fontSize: "1em",
              letterSpacing: "-0.02em",
              color: "#ffffff",
              whiteSpace: "nowrap",
              lineHeight: 1.05,
            }}>
              CODECLASH
            </span>
            <span style={{
              fontFamily: "'Caveat', cursive",
              fontWeight: "700",
              fontStyle: "italic",
              fontSize: "1.35em",
              lineHeight: 1,
              backgroundImage: "linear-gradient(90deg, #00FFC2, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              paddingBottom: "0.06em",
              paddingRight: "0.3em",
              whiteSpace: "nowrap",
              transform: "translateY(0.08em)",
            }}>
              2.0
            </span>
          </div>

          {/* Tagline */}
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(0.7rem,2.5vw,1rem)", fontWeight: "700", letterSpacing: "0.2em", color: "#00FFC2" }}>
            CODE. COMPETE. CREATE IMPACT.
          </div>

          {/* Description */}
          <p style={{ maxWidth: "36rem", fontSize: "clamp(0.9rem,2.5vw,1.05rem)", fontWeight: "300", color: "#d1d5db", lineHeight: 1.7, margin: 0 }}>
            A coding showdown for builders,<br />
            problem solvers, and future tech leaders.
          </p>

          {/* Countdown */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.7rem", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: registrationClosed ? "#a78bfa" : "#00FFC2" }}>
              {registrationClosed ? "⚡ Contest begins in" : "⏳ Registration closes in"}
            </span>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              <CountdownBox value={days}    label="Days" />
              <CountdownBox value={hours}   label="Hours" />
              <CountdownBox value={minutes} label="Mins" />
              <CountdownBox value={seconds} label="Secs" />
            </div>
          </div>

          {/* Date & Venue chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.4)", padding: "10px 16px", backdropFilter: "blur(8px)" }}>
              <Icon path={mdiCalendarMonthOutline} size={1.1} color="#00FFC2" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "clamp(0.75rem,2.5vw,0.875rem)", fontWeight: "600" }}>15 APRIL 2026</span>
                <span style={{ fontSize: "0.7rem", color: "#9ca3af" }}>Wednesday</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.4)", padding: "10px 16px", backdropFilter: "blur(8px)" }}>
              <Icon path={mdiMapMarkerOutline} size={1.1} color="#00FFC2" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "clamp(0.75rem,2.5vw,0.875rem)", fontWeight: "600" }}>GDG COMMUNITY SPACE</span>
                <span style={{ fontSize: "0.7rem", color: "#9ca3af" }}>Computer Labs</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: "0.25rem" }}>
            {contestOpen ? (
              <Link to="/winners">
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    borderRadius: "9999px",
                    background: "linear-gradient(to right, #00FFC2, #a855f7)",
                    padding: "12px 28px",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "700",
                    fontSize: "clamp(0.85rem,2.5vw,1rem)",
                    color: "#000",
                    border: "none",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(0,255,194,0.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)";   e.currentTarget.style.boxShadow = "none"; }}
                >
                  <Icon path={mdiTrophyOutline} size={0.9} />
                  <span>WINNERS</span>
                  <Icon path={mdiChevronRight} size={1} />
                </button>
              </Link>
            ) : registrationClosed ? (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(167,139,250,0.4)",
                  background: "rgba(167,139,250,0.08)",
                  padding: "12px 28px",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "700",
                  fontSize: "clamp(0.85rem,2.5vw,1rem)",
                  color: "#a78bfa",
                  cursor: "default",
                }}
              >
                <span>REGISTRATION CLOSED</span>
              </div>
            ) : (
              <Link to="/register">
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    borderRadius: "9999px",
                    background: "linear-gradient(to right, #00FFC2, #a855f7)",
                    padding: "12px 28px",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "700",
                    fontSize: "clamp(0.85rem,2.5vw,1rem)",
                    color: "#000",
                    border: "none",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,194,0.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)";   e.currentTarget.style.boxShadow = "none"; }}
                >
                  <span>REGISTER NOW</span>
                  <Icon path={mdiChevronRight} size={1} />
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* ── Right — Feature pills (hidden on mobile) ── */}
        <div className="hidden lg:flex" style={{ flexDirection: "column", justifyContent: "flex-end", paddingBottom: "0.5rem", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-end", gap: "2rem" }}>
            {[
              { icon: mdiAtom,         color: "#c084fc", anim: "spinSlow 10s linear infinite",        top: "BUILD",   bot: "INNOVATE" },
              { icon: mdiTrophyOutline, color: "#60a5fa", anim: "trophyShake 1.6s ease-in-out infinite", top: "COMPETE", bot: "CHALLENGE" },
              { icon: mdiSprout,        color: "#4ade80", anim: "pulseGlow 2s ease-in-out infinite",     top: "INSPIRE", bot: "GROW" },
            ].map(({ icon, color, anim, top, bot }) => (
              <div key={top} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Icon path={icon} size={1.5} color={color} style={{ animation: anim }} />
                <div style={{ display: "flex", flexDirection: "column", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.1em" }}>
                  <span style={{ color: "#e5e7eb" }}>{top}</span>
                  <span style={{ color: "#9ca3af" }}>{bot}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&family=Caveat:wght@700&display=swap');

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes trophyShake {
          0%, 55%, 100% { transform: rotate(0deg); }
          60%  { transform: rotate(-14deg); }
          68%  { transform: rotate(14deg); }
          74%  { transform: rotate(-10deg); }
          80%  { transform: rotate(10deg); }
          86%  { transform: rotate(-5deg); }
          92%  { transform: rotate(5deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }

        /* Mobile background */
        @media (max-width: 767px) {
          .hero-bg {
            background-image: url('https://res.cloudinary.com/dpr83w1ub/image/upload/v1775930363/hero2-mobile_inumsm.jpg');
            background-size: cover;
            background-position: center top;
            background-repeat: no-repeat;
          }
          .hero-overlay-desktop {
            background: linear-gradient(
              to right,
              rgba(0,0,0,0.98) 0%,   /* darker left */
              rgba(0,0,0,0.85) 30%,  /* strong coverage */
              rgba(0,0,0,0.35) 65%,  /* smoother fade */
              rgba(0,0,0,0.01) 100%  /* almost clear right */
            ) !important;
          }
        }
        /* Tablet / Desktop background */
        @media (min-width: 768px) {
          .hero-bg {
            background-image: url('https://res.cloudinary.com/dpr83w1ub/image/upload/v1775928533/hero2_u2ewvs.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }
          .hero-overlay-mobile {
              background: linear-gradient(
              to right,
              rgba(0,0,0,0.98) 0%,   /* darker left */
              rgba(0,0,0,0.85) 30%,  /* strong coverage */
              rgba(0,0,0,0.35) 65%,  /* smoother fade */
              rgba(0,0,0,0.02) 100%  /* almost clear right */
            ) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;