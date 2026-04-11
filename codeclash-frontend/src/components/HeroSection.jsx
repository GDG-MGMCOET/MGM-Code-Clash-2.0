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
      padding: "12px 16px",
      minWidth: "68px",
      backdropFilter: "blur(8px)",
    }}
  >
    <span style={{ fontFamily: "monospace", fontSize: "1.875rem", fontWeight: "700", color: "#00FFC2", lineHeight: 1 }}>
      {Pad(value)}
    </span>
    <span style={{ marginTop: "6px", fontSize: "10px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9ca3af" }}>
      {label}
    </span>
  </div>
);

const HeroSection = () => {
  const { days, hours, minutes, seconds } = useCountdown("2026-04-15T00:00:00+05:30");

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        minHeight: "100dvh",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#080909",
        backgroundImage: "url('https://res.cloudinary.com/dpr83w1ub/image/upload/v1775912576/hero2_b5cwzj.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        /* No overflow hidden here — nothing to clip, bg-size:cover handles the image */
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.09) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gap: "2.5rem",
          padding: "7rem 0.5rem 2.5rem",
          boxSizing: "border-box",
        }}
        className="lg:grid-cols-2"
      >
        {/* ── Left ── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", gap: "1rem", minWidth: 0 }}>

          {/* Eyebrow */}
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.875rem", fontWeight: "600", letterSpacing: "0.15em", color: "#00FFC2" }}>
            GDG MGMCoET PRESENTS
          </div>

          {/* ── TITLE: one line, shared clamp so they always fit together ── */}
          <div
            style={{
              fontSize: "clamp(1.4rem, 5.5vw, 5rem)",
              lineHeight: 1.05,
              display: "flex",
              alignItems: "flex-end",
              gap: "0.25em",
              overflow: "visible",
              paddingBottom: "0.15em",
              /* Allow the flex row to shrink on tiny screens */
              flexWrap: "nowrap",
              minWidth: 0,
            }}
          >
            {/* CODECLASH */}
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "800",
                fontSize: "1em",
                letterSpacing: "-0.02em",
                color: "#ffffff",
                whiteSpace: "nowrap",
                lineHeight: 1.05,
              }}
            >
              CODECLASH
            </span>

            {/* 2.0 — Caveat is visually shorter so we bump it up with em */}
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontWeight: "700",
                fontStyle: "italic",
                /* 1.35em relative to parent — makes it visually match Poppins */
                fontSize: "1.35em",
                lineHeight: 1,
                backgroundImage: "linear-gradient(90deg, #00FFC2, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                /* inline-block stops webkit clipping the gradient at line-box edges */
                display: "inline-block",
                paddingBottom: "0.15em",
                paddingRight: "0.3em",
                whiteSpace: "nowrap",
                transform: "translateY(0.08em)",
              }}
            >
              2.0
            </span>
          </div>

          {/* Tagline */}
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1rem", fontWeight: "700", letterSpacing: "0.2em", color: "#00FFC2" }}>
            CODE. COMPETE. CREATE IMPACT.
          </div>

          {/* Description */}
          <p style={{ maxWidth: "36rem", fontSize: "1.05rem", fontWeight: "300", color: "#d1d5db", lineHeight: 1.7, margin: 0 }}>
            A coding showdown for builders,<br />
            problem solvers, and future tech leaders.
          </p>

          {/* Countdown */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <CountdownBox value={days} label="Days" />
            <CountdownBox value={hours} label="Hours" />
            <CountdownBox value={minutes} label="Mins" />
            <CountdownBox value={seconds} label="Secs" />
          </div>

          {/* Date & Venue chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.4)", padding: "12px 20px", backdropFilter: "blur(8px)" }}>
              <Icon path={mdiCalendarMonthOutline} size={1.2} color="#00FFC2" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.875rem", fontWeight: "600" }}>15 APRIL 2026</span>
                <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Wednesday</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.4)", padding: "12px 20px", backdropFilter: "blur(8px)" }}>
              <Icon path={mdiMapMarkerOutline} size={1.2} color="#00FFC2" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.875rem", fontWeight: "600" }}>GDG COMMUNITY SPACE</span>
                <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Computer Labs</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: "0.5rem" }}>
            <Link to="/register">
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "9999px",
                  background: "linear-gradient(to right, #00FFC2, #a855f7)",
                  padding: "14px 32px",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "700",
                  fontSize: "1rem",
                  color: "#000",
                  border: "none",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,194,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <span>REGISTER NOW</span>
                <Icon path={mdiChevronRight} size={1} />
              </button>
            </Link>
          </div>
        </div>

        {/* ── Right — Feature pills ── */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "0.5rem", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-end", gap: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Icon path={mdiAtom} size={1.5} color="#c084fc" style={{ animation: "spinSlow 10s linear infinite" }} />
              <div style={{ display: "flex", flexDirection: "column", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.1em" }}>
                <span style={{ color: "#e5e7eb" }}>BUILD</span>
                <span style={{ color: "#9ca3af" }}>INNOVATE</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Icon path={mdiTrophyOutline} size={1.5} color="#60a5fa" style={{ animation: "trophyShake 1.6s ease-in-out infinite" }} />
              <div style={{ display: "flex", flexDirection: "column", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.1em" }}>
                <span style={{ color: "#e5e7eb" }}>COMPETE</span>
                <span style={{ color: "#9ca3af" }}>CHALLENGE</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Icon path={mdiSprout} size={1.5} color="#4ade80" style={{ animation: "pulseGlow 2s ease-in-out infinite" }} />
              <div style={{ display: "flex", flexDirection: "column", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.1em" }}>
                <span style={{ color: "#e5e7eb" }}>INSPIRE</span>
                <span style={{ color: "#9ca3af" }}>GROW</span>
              </div>
            </div>
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
      `}</style>
    </div>
  );
};

export default HeroSection;