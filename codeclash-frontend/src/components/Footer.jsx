import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const CONTEST_OPEN = new Date("2026-04-15T11:20:00+05:30");

/* ── Canvas glitter particles ── */
const GlitterCanvas = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const COUNT = 60;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * 500,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.004 + 0.002,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.5 ? "0,255,194" : "168,85,247",
    }));
    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        const a = 0.15 + 0.6 * Math.abs(Math.sin(p.phase + t * p.speed));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue},${a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export default function Footer() {
  const [contestOpen, setContestOpen] = useState(Date.now() >= CONTEST_OPEN.getTime());

  useEffect(() => {
    if (contestOpen) return;
    const id = setInterval(() => {
      if (Date.now() >= CONTEST_OPEN.getTime()) {
        setContestOpen(true);
        clearInterval(id);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [contestOpen]);

  const codeText = " <code/> ";
  const mailtext = " <mail/> ";

  const gradientText = {
    backgroundImage: "linear-gradient(to right, #00FFC2, #a855f7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const gradientBtn = {
    background: "linear-gradient(to right, #00FFC2, #a855f7)",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "700",
    letterSpacing: "0.02em",
    transition: "opacity 0.2s ease",
  };

  return (
    <footer
      className="relative flex flex-col pb-8 text-center text-white shadow-md lg:gap-10"
      style={{
        background: "linear-gradient(135deg,#020d14 0%,#050d1a 30%,#0c0818 60%,#080909 100%)",
        overflow: "hidden",
      }}
    >
      <GlitterCanvas />

      {/* Radial glows */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(ellipse 60% 60% at 10% 50%,rgba(0,255,194,0.06) 0%,transparent 70%), radial-gradient(ellipse 50% 60% at 90% 50%,rgba(168,85,247,0.07) 0%,transparent 70%)",
        }}
      />

      {/* Top divider */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(0,255,194,0.3), rgba(168,85,247,0.3), transparent)",
          zIndex: 1,
        }}
      />

      <div className="relative flex flex-col lg:gap-10" style={{ zIndex: 1 }}>

        {/* Register CTA — anchored RIGHT, rounded on the LEFT */}
        <div
          className="flex w-full items-center justify-center self-end py-8 md:text-3xl lg:w-4/5 lg:rounded-l-full lg:py-16"
          style={{
            background: "rgba(0,255,194,0.03)",
            border: "1px solid rgba(0,255,194,0.45)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row lg:w-4/5 xl:w-3/5">
            <div className="flex flex-col gap-5">
              <h3 className="text-3xl font-semibold" style={gradientText}>
                {contestOpen ? "Join Contest" : "Register Now"}
              </h3>
              <p className="text-2xl sm:text-3xl">
                Learn,
                <span className="font-mono font-bold" style={gradientText}>
                  {codeText}
                </span>
                &amp; Compete
              </p>
            </div>
            <Link to={contestOpen ? "/tracks" : "/register"} className="rounded-full">
              <button
                className="rounded-full px-12 py-3 font-mono font-bold text-black md:text-lg"
                style={gradientBtn}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {contestOpen ? "Join Contest" : "Register Now"}
              </button>
            </Link>
          </div>
        </div>

        {/* Contact CTA — anchored LEFT, rounded on the RIGHT */}
        <div
          className="flex w-full items-center justify-center self-start py-8 md:text-3xl lg:w-4/5 lg:rounded-r-full lg:py-16"
          style={{
            background: "rgba(168,85,247,0.03)",
            border: "1px solid rgba(0,255,194,0.45)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row lg:w-4/5 xl:w-3/5">
            
            <div className="flex flex-col gap-5">
              
              <h3 className="text-3xl font-semibold" style={gradientText}>
                Contact Us
              </h3>

              
              <p className="text-2xl sm:text-3xl flex flex-wrap items-center justify-center gap-2 md:justify-start">
                
                <a
                  href="https://www.instagram.com/gdg_mgmcoet?igsh=ZGpqN2Y3ZW14YXlr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold"
                  style={{ color: "#ffffff" }}
                >
                  Follow
                </a>
                <span>,</span>

                <a
                  href="mailto:gdg@coet.in"
                  className="font-mono font-bold"
                  style={gradientText}
                >
                  {mailtext}
                </a>

                <span>&amp;</span>

                <a
                  href="https://gdg.community.dev/dashboard/gdg-on-campus-mahatma-gandhi-missions-college-of-engineering-and-technology-noida-india/events"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold"
                  style={{ color: "#ffffff" }}
                >
                  Assistance
                </a>
              </p>
            </div>

            <a
              href="https://www.instagram.com/gdg_mgmcoet?igsh=ZGpqN2Y3ZW14YXlr"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full"
            >
              <button
                className="rounded-full px-12 py-3 font-mono font-bold text-black md:text-lg"
                style={gradientBtn}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Contact Us
              </button>
            </a>

          </div>
        </div>
        {/* Developed by */}
        <p className="pb-1 pt-2 font-mono text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          Developed by{" "}
          {["Madhav", "Shambhavi", "Tushar", "Muskan", "Rishi", "Parineeta"].map((name, i, arr) => (
            <span key={name}>
              <span style={{ backgroundImage: "linear-gradient(to right,#00FFC2,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: "700" }}>
                {name}
              </span>
              {i < arr.length - 1 && <span style={{ color: "rgba(255,255,255,0.5)" }}> · </span>}
            </span>
          ))}
        </p>

        {/* Copyright */}
        <p
          className="pb-2 pt-1 font-mono text-sm"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          &copy; {new Date().getFullYear()} GDG On Campus MGMCOET. All rights reserved.
        </p>
      </div>
    </footer>
  );
}