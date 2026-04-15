import React from "react";
import Icon from "@mdi/react";
import { mdiSprout, mdiAtom, mdiChevronRight } from "@mdi/js";

const TRACKS = [
  {
    id: "learner",
    icon: mdiSprout,
    iconColor: "#4ade80",
    label: "LEARNER TRACK",
    tagline: "For beginners & intermediate coders",
    description:
      "Designed for students who are just getting started with competitive programming. Tackle beginner-friendly challenges and prove your potential.",
    gradient: "linear-gradient(135deg, rgba(74,222,128,0.12), rgba(0,255,194,0.06))",
    border: "rgba(74,222,128,0.35)",
    glow: "rgba(74,222,128,0.25)",
    btnGradient: "linear-gradient(to right, #4ade80, #00FFC2)",
    btnColor: "#000",
    link: "https://www.hackerrank.com/code-clash-2-0-1",
  },
  {
    id: "pro",
    icon: mdiAtom,
    iconColor: "#c084fc",
    label: "PRO TRACK",
    tagline: "For advanced competitive coders",
    description:
      "Take on complex algorithmic problems and data-structure challenges. Compete at the highest level and claim the top spot on the leaderboard.",
    gradient: "linear-gradient(135deg, rgba(192,132,252,0.12), rgba(167,85,247,0.06))",
    border: "rgba(192,132,252,0.35)",
    glow: "rgba(192,132,252,0.25)",
    btnGradient: "linear-gradient(to right, #c084fc, #a855f7)",
    btnColor: "#fff",
    link: "https://www.hackerrank.com/code-clash-2-0-pro-track",
  },
];

export default function Tracks() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#080909",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 1.25rem 3rem",
        boxSizing: "border-box",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        <p style={{ fontSize: "clamp(0.7rem,2.5vw,0.85rem)", fontWeight: "600", letterSpacing: "0.15em", color: "#00FFC2", marginBottom: "0.6rem" }}>
          CODECLASH 2.0 — SELECT YOUR TRACK
        </p>
        <h1
          style={{
            fontSize: "clamp(2rem,6vw,3.5rem)",
            fontWeight: "800",
            letterSpacing: "-0.02em",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Choose Your{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(90deg, #00FFC2, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Battle Ground
          </span>
        </h1>
        <p style={{ marginTop: "0.75rem", color: "#9ca3af", fontSize: "clamp(0.85rem,2.5vw,1rem)", fontWeight: "300" }}>
          Pick the track that matches your skill level and start competing.
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "1.75rem",
          width: "100%",
          maxWidth: "780px",
          marginTop: "2.5rem",
        }}
      >
        {TRACKS.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');
      `}</style>
    </div>
  );
}

function TrackCard({ track }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={{
        borderRadius: "20px",
        border: `1px solid ${track.border}`,
        background: track.gradient,
        backdropFilter: "blur(12px)",
        padding: "2rem 1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 16px 48px ${track.glow}` : "none",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon + label */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: "rgba(0,0,0,0.35)",
            border: `1px solid ${track.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon path={track.icon} size={1.3} color={track.iconColor} />
        </div>
        <div>
          <div style={{ fontSize: "clamp(0.95rem,3vw,1.15rem)", fontWeight: "800", letterSpacing: "0.05em" }}>
            {track.label}
          </div>
          <div style={{ fontSize: "0.78rem", color: "#9ca3af", fontWeight: "400", marginTop: "2px" }}>
            {track.tagline}
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{ margin: 0, color: "#d1d5db", fontSize: "clamp(0.82rem,2.5vw,0.93rem)", fontWeight: "300", lineHeight: 1.65 }}>
        {track.description}
      </p>

      {/* Join button */}
      <a
        href={track.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", marginTop: "0.5rem" }}
      >
        <button
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            borderRadius: "9999px",
            background: track.btnGradient,
            padding: "12px 24px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "700",
            fontSize: "clamp(0.85rem,2.5vw,0.95rem)",
            color: track.btnColor,
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.04em",
            transition: "opacity 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.03)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
        >
          <span>JOIN {track.label.split(" ")[0]} TRACK</span>
          <Icon path={mdiChevronRight} size={0.9} />
        </button>
      </a>
    </div>
  );
}
