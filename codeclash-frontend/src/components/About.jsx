import React, { useEffect, useRef } from "react";

const keyboardImg = "https://res.cloudinary.com/dpr83w1ub/image/upload/v1775927937/keyboard1_plgkpn.png";
const mouseImg    = "https://res.cloudinary.com/dpr83w1ub/image/upload/v1775927938/mouse1_rl3z2c.png";
const earbudsImg  = "https://res.cloudinary.com/dpr83w1ub/image/upload/v1775927937/Adobe_Express_-_file_rdd3vi.png";
import kickrLogo from "../assets/prizes/kickr_logo.webp";
import gajoobaLogo from "../assets/prizes/Gajooba-PNG-1536x459.webp";

const H = ({ level = 2, children, className = "" }) => {
  const base = { color: "#00FFC2", fontFamily: "monospace", fontWeight: "700" };
  if (level === 1)
    return <h1 className={`mb-4 text-center text-3xl sm:text-4xl ${className}`} style={base}>{children}</h1>;
  return <h2 className={`mb-4 text-center text-3xl sm:text-4xl ${className}`} style={base}>{children}</h2>;
};

const G = ({ children }) => (
  <span style={{ backgroundImage: "linear-gradient(to right,#00FFC2,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    {children}
  </span>
);

const GlitterCanvas = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const COUNT = 120;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
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
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
};

const sponsors = [
  { name: "Kickr Technology", logo: kickrLogo, darkBg: true, url: "https://www.kickrtechnology.in" },
  { name: "Gajooba", logo: gajoobaLogo, darkBg: false, url: "https://www.gajooba.com" },
];
const REPEAT = 8;
const marqueeItems = Array.from({ length: REPEAT }, () => sponsors).flat();

function SponsorLogo({ sponsor }) {
  return (
    <div style={{
      display: "flex", flexShrink: 0, alignItems: "center", justifyContent: "center",
      borderRadius: "12px", padding: "12px 24px", margin: "0 24px", height: "64px", width: "176px",
      background: sponsor.darkBg ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.95)",
      border: sponsor.darkBg ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.3)",
    }}>
      <img src={sponsor.logo} alt={sponsor.name} style={{ height: "100%", width: "auto", maxWidth: "120px", objectFit: "contain" }} />
    </div>
  );
}

const Sponsors = () => (
  <section style={{ position: "relative", padding: "5rem 0 4rem" }}>
    <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "80%", height: "1px", background: "linear-gradient(to right, transparent, rgba(0,255,194,0.25), rgba(168,85,247,0.25), transparent)" }} />
    <div style={{ position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", marginBottom: "3rem", padding: "0 24px" }}>
        <p style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: "600", letterSpacing: "0.3em", color: "#00FFC2", textTransform: "uppercase", margin: 0 }}>Powered By</p>
        <h2 style={{ fontFamily: "monospace", fontSize: "2rem", fontWeight: "700", color: "#ffffff", margin: 0 }}>Our Sponsors</h2>
        <div style={{ marginTop: "8px", height: "1px", width: "96px", background: "linear-gradient(to right, transparent, #00FFC2, #a855f7, transparent)" }} />
      </div>
      <div className="flex flex-wrap justify-center md:hidden" style={{ gap: "2.5rem", padding: "0 24px", marginBottom: "3.5rem" }}>
        {sponsors.map((sponsor) => (
          <a key={sponsor.name} href={sponsor.url} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", width: "288px", borderRadius: "20px", border: "1px solid rgba(0,255,194,0.15)", background: "rgba(0,255,194,0.03)", padding: "2rem", textDecoration: "none", position: "relative", transition: "all 0.3s ease", boxSizing: "border-box" }}
            onMouseEnter={e => { e.currentTarget.style.border = "1px solid rgba(0,255,194,0.5)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(0,255,194,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.border = "1px solid rgba(0,255,194,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "80px", borderRadius: "12px", padding: "8px 16px", background: sponsor.darkBg ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.95)", boxSizing: "border-box" }}>
              <img src={sponsor.logo} alt={`${sponsor.name} logo`} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
            </div>
            <p style={{ fontFamily: "monospace", fontSize: "13px", fontWeight: "600", letterSpacing: "0.12em", color: "rgba(255,255,255,0.5)", margin: 0 }}>{sponsor.name}</p>
          </a>
        ))}
      </div>
      <div className="hidden md:block sponsor-marquee-wrapper relative rounded-2xl overflow-hidden border-y border-white/10 bg-white/5 py-4 backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
        <div className="sponsor-marquee-track flex items-center">
          <div className="flex shrink-0 items-center" aria-hidden="false">
            {marqueeItems.map((sponsor, i) => <SponsorLogo key={`a-${i}`} sponsor={sponsor} />)}
          </div>
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {marqueeItems.map((sponsor, i) => <SponsorLogo key={`b-${i}`} sponsor={sponsor} />)}
          </div>
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "80%", height: "1px", background: "linear-gradient(to right, transparent, rgba(168,85,247,0.25), rgba(0,255,194,0.25), transparent)" }} />
  </section>
);

/* ─────────────────────────────────────────────────────
   FLIP CARD
   KEY FIX: NO backdropFilter on face elements.
   backdropFilter creates a new stacking context that
   breaks backface-visibility in every browser.
   Use solid/opaque background colors instead.
───────────────────────────────────────────────────── */
const FlipCard = ({ accentColor, accentColorRgb, emoji, frontTitle, backTitle, backDesc, gradientFrom, gradientTo, frontBg, backBg }) => {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <div
      style={{
        perspective: "1000px",
        flex: "1 1 0",          /* side-by-side: each card takes equal width */
        minWidth: 0,
        height: "280px",
        cursor: "pointer",
      }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(f => !f)}
      role="button"
      aria-label={`${frontTitle} track card`}
    >
      <div style={{
        position: "relative",
        width: "100%",
        height: "100%",
        transformStyle: "preserve-3d",
        transition: "transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>

        {/* ── FRONT ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "18px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          /* NO backdropFilter here — it breaks backface-visibility */
          background: frontBg,
          border: `1px solid rgba(${accentColorRgb},0.35)`,
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          overflow: "hidden",
        }}>
          <span style={{ position: "absolute", top: "14px", left: "14px", width: "18px", height: "18px", borderTop: `1.5px solid rgba(${accentColorRgb},0.6)`, borderLeft: `1.5px solid rgba(${accentColorRgb},0.6)`, borderRadius: "4px 0 0 0" }} />
          <span style={{ position: "absolute", bottom: "14px", right: "14px", width: "18px", height: "18px", borderBottom: `1.5px solid rgba(${accentColorRgb},0.6)`, borderRight: `1.5px solid rgba(${accentColorRgb},0.6)`, borderRadius: "0 0 4px 0" }} />

          <span style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)", lineHeight: 1 }}>{emoji}</span>

          <p style={{
            margin: 0,
            fontFamily: "monospace",
            fontWeight: "800",
            fontSize: "clamp(1.3rem,3vw,1.8rem)",
            letterSpacing: "0.04em",
            backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            {frontTitle}
          </p>

          <p style={{
            position: "absolute", bottom: "14px",
            margin: 0, fontSize: "10px", fontFamily: "monospace",
            color: `rgba(${accentColorRgb},0.45)`, letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            hover / tap to reveal
          </p>
        </div>

        {/* ── BACK ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "18px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
          gap: "12px",
          textAlign: "center",
          /* NO backdropFilter — solid bg so front is 100% hidden */
          background: backBg,
          border: `1px solid rgba(${accentColorRgb},0.45)`,
          /* Pre-rotated 180° so it starts facing away */
          transform: "rotateY(180deg)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          overflow: "hidden",
        }}>
          {/* Glow orb — pointer-events none, doesn't affect layout */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "18px",
            background: `radial-gradient(ellipse at center, rgba(${accentColorRgb},0.18) 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />

          <p style={{
            margin: 0, fontFamily: "monospace", fontWeight: "800",
            fontSize: "clamp(1.1rem,2.5vw,1.4rem)", letterSpacing: "0.05em",
            backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            position: "relative", zIndex: 1,
          }}>
            {backTitle}
          </p>

          <p style={{
            margin: 0, fontSize: "clamp(0.88rem,2vw,1rem)",
            color: "rgba(255,255,255,0.85)", lineHeight: 1.65,
            position: "relative", zIndex: 1,
          }}>
            {backDesc}
          </p>

          <p style={{
            margin: 0, fontFamily: "monospace", fontWeight: "700",
            fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase",
            color: accentColor, position: "absolute", bottom: "14px",
            left: "50%", transform: "translateX(-50%)",
            whiteSpace: "nowrap", zIndex: 1,
          }}>
            {frontTitle}
          </p>
        </div>

      </div>
    </div>
  );
};

/* ── Main About Page ── */
const About = () => {
  return (
    <div
      className="min-h-screen p-6 text-white md:p-10"
      style={{ background: "linear-gradient(135deg,#020d14 0%,#050d1a 30%,#0c0818 60%,#080909 100%)", position: "relative" }}
    >
      <GlitterCanvas />
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse 60% 40% at 5% 20%,rgba(0,255,194,0.07) 0%,transparent 70%), radial-gradient(ellipse 50% 40% at 95% 80%,rgba(168,85,247,0.08) 0%,transparent 70%)" }} />

      <div className="container mx-auto flex max-w-[1200px] flex-col gap-14 px-6 text-justify text-lg font-medium" style={{ position: "relative", zIndex: 1 }}>

        <Sponsors />

        {/* ── ABOUT ── */}
        <section>
          <H level={1}>About Competition</H>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
            <p style={{ fontSize: "clamp(1rem,3vw,1.2rem)", lineHeight: 1.75, color: "#e5e7eb", margin: 0 }}>
              <G>MGM Code Clash 2.0</G> is back — bigger, sharper, and more competitive than ever.
            </p>
            <p style={{ fontSize: "clamp(0.95rem,2.5vw,1.1rem)", lineHeight: 1.75, color: "#9ca3af", margin: 0 }}>
              Organized by <G>GDG On Campus MGMCoET</G>, this flagship coding contest is built to test your problem-solving, logic, and speed under pressure.
            </p>
            <p style={{ fontSize: "clamp(0.95rem,2.5vw,1.1rem)", lineHeight: 1.75, color: "#9ca3af", margin: 0 }}>
              Hosted on <G>HackerRank</G>, the contest features curated DSA challenges designed for real competition.
            </p>
          </div>

          {/* ── TWO TRACKS — FLIP CARDS SIDE BY SIDE ── */}
          <div style={{ marginBottom: "2rem" }}>
            <p style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: "600", letterSpacing: "0.3em", color: "#00FFC2", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Two Tracks
            </p>

            {/*
              flex row = side by side.
              Each FlipCard has flex: "1 1 0" so they share space equally.
              On very small screens they can wrap to column.
            */}
            <div style={{
              display: "flex",
              flexDirection: "row",
              gap: "1.25rem",
              width: "100%",
              flexWrap: "wrap",   /* wraps to column on tiny screens */
            }}>
              <FlipCard
                accentColor="#00FFC2"
                accentColorRgb="0,255,194"
                emoji="🌱"
                frontTitle="Learner Track"
                backTitle="Who can join?"
                backDesc="Open to 1st & 2nd year students. Build your fundamentals and compete with your peers."
                gradientFrom="#00FFC2"
                gradientTo="#a855f7"
                frontBg="linear-gradient(145deg, #021a14 0%, #03120f 100%)"
                backBg="linear-gradient(145deg, #021a16 0%, #040e0b 100%)"
              />
              <FlipCard
                accentColor="#a855f7"
                accentColorRgb="168,85,247"
                emoji="⚡"
                frontTitle="Pro Track"
                backTitle="Who can join?"
                backDesc="Open for all competitive coders — any year, any branch. Bring your A-game."
                gradientFrom="#a855f7"
                gradientTo="#00FFC2"
                frontBg="linear-gradient(145deg, #120d1e 0%, #0c0818 100%)"
                backBg="linear-gradient(145deg, #140e20 0%, #0a0614 100%)"
              />
            </div>

            <p style={{ marginTop: "0.75rem", fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.22)", textAlign: "center", textTransform: "uppercase" }}>
              hover to reveal · tap on mobile
            </p>
          </div>

          {/* Date & Venue */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2rem", justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderRadius: "12px", border: "1px solid rgba(0,255,194,0.2)", background: "rgba(0,0,0,0.35)", padding: "10px 16px" }}>
              <span style={{ fontSize: "16px" }}>📅</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "clamp(0.8rem,2.5vw,0.9rem)", fontWeight: "700", color: "#e5e7eb" }}>15 April 2026</span>
                <span style={{ fontSize: "0.7rem", color: "#9ca3af" }}>Wednesday</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderRadius: "12px", border: "1px solid rgba(168,85,247,0.2)", background: "rgba(0,0,0,0.35)", padding: "10px 16px" }}>
              <span style={{ fontSize: "16px" }}>📍</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "clamp(0.8rem,2.5vw,0.9rem)", fontWeight: "700", color: "#e5e7eb" }}>Computer Labs</span>
                <span style={{ fontSize: "0.7rem", color: "#9ca3af" }}>MGMCoET Campus</span>
              </div>
            </div>
          </div>

          {/* Closing line */}
          <div style={{ borderRadius: "14px", border: "1px solid rgba(255,255,255,0.07)", background: "linear-gradient(135deg, rgba(0,255,194,0.04) 0%, rgba(168,85,247,0.04) 100%)", padding: "1.1rem 1.25rem", display: "flex", alignItems: "center", gap: "12px" }}>
            
            <p style={{ margin: 0, fontSize: "clamp(0.9rem,2.5vw,1rem)", lineHeight: 1.65, color: "#d1d5db", js: "center",}}>
              Win exciting prizes, goodies, and certificates — but more importantly,{" "}
              <span style={{ color: "#00FFC2", fontWeight: "600" }}>earn your spot on the leaderboard.</span>
            </p>
          </div>
        </section>

        {/* ── FORMAT ── */}
        <section>
          <H>Format</H>
          <p className="mb-4 text-xl">MGM Code Clash 2.0 is designed to challenge coders across all levels through a structured competitive format. The contest will be conducted on <G>HackerRank</G> and will consist of <G>6 problems</G>:</p>
          <div className="mb-6 flex flex-wrap gap-3">
            {[
              { label: "3 Easy",   bg: "rgba(0,255,194,0.12)",  border: "rgba(0,255,194,0.45)" },
              { label: "2 Medium", bg: "rgba(100,150,255,0.12)", border: "rgba(100,150,255,0.45)" },
              { label: "1 Hard",   bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.45)" },
            ].map(({ label, bg, border }) => (
              <span key={label} style={{ background: bg, border: `1px solid ${border}`, borderRadius: "999px", padding: "6px 20px", fontWeight: "600", fontSize: "0.95rem" }}>{label}</span>
            ))}
          </div>
          <p className="mb-5 text-xl">Participants will compete in two tracks:</p>
          <div className="space-y-5">
            <div style={{ borderRadius: "16px", border: "1px solid rgba(0,255,194,0.2)", background: "rgba(0,255,194,0.04)", padding: "1.5rem" }}>
              <h3 className="mb-2 text-2xl font-semibold"><G>Learner Track</G> <span className="text-base font-normal text-gray-400">(1st &amp; 2nd Year Only)</span></h3>
              <p className="mb-3 text-gray-300">Focused on building strong fundamentals, this track covers core topics like arrays, sorting, searching, recursion, basic data structures (stack &amp; queue), strings, bit manipulation, and standard problem-solving techniques such as Kadane's Algorithm, prefix sums, and binary search.</p>
              <p>Difficulty: <G>Beginner to Intermediate</G></p>
            </div>
            <div style={{ borderRadius: "16px", border: "1px solid rgba(168,85,247,0.2)", background: "rgba(168,85,247,0.04)", padding: "1.5rem" }}>
              <h3 className="mb-2 text-2xl font-semibold"><G>Pro Track</G> <span className="text-base font-normal text-gray-400">(Open for All)</span></h3>
              <p className="mb-3 text-gray-300">Designed for experienced coders, this track spans the full spectrum of Data Structures and Algorithms, including advanced problem-solving across trees, graphs, dynamic programming, greedy algorithms, and more.</p>
              <p>Difficulty: <G>Intermediate to Advanced</G></p>
            </div>
          </div>
          <p className="mt-4 text-lg">Each track will have its own leaderboard, and rankings will be based on <G>accuracy, efficiency, and problem-solving speed</G>.</p>
        </section>

        {/* ── RULES ── */}
        <section>
          <H>Rules</H>
          <ul className="list-inside list-decimal space-y-3 text-lg sm:text-xl">
            {[
              ["Eligibility:", "Open to students from MGMCOET, Noida."],
              ["Individual Participation:", "The contest is strictly individual; team participation is not allowed."],
              ["No Plagiarism:", "Sharing solutions or copying code will lead to immediate disqualification."],
              ["Allowed Resources:", "Participants can refer to official documentation for programming languages and concepts but must avoid any external help or tools like AI for problem-solving."],
              ["Ranking Criteria:", "Participants will be ranked based on the number of problems solved correctly. In case of a tie, the participant with the least total time taken will rank higher."],
              ["Code of Conduct:", "Maintain professionalism and adhere to the competition's ethical guidelines. Respect your fellow participants and the organizing team."],
            ].map(([label, text]) => (
              <li key={label}><span className="font-bold"><G>{label}</G></span> {text}</li>
            ))}
          </ul>
        </section>

        {/* ── PRIZES ── */}
        <section>
          <H>Rewards &amp; Recognition</H>
          <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { img: keyboardImg, alt: "Mechanical Keyboard", label: "Keyboard", anim: "animate-float" },
              { img: mouseImg,    alt: "Gaming Mouse",        label: "Mouse",    anim: "animate-float-delayed" },
              { img: earbudsImg,  alt: "TWS Earbuds",         label: "Earbuds",  anim: "animate-float-slow" },
            ].map(({ img, alt, label, anim }) => (
              <div key={label} className="group relative flex flex-col items-center justify-center p-8 backdrop-blur-md"
                style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.border = "1px solid rgba(0,255,194,0.35)"; e.currentTarget.style.background = "rgba(0,255,194,0.05)"; e.currentTarget.style.boxShadow = "0 0 32px rgba(0,255,194,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div className="mb-6 h-52 w-52 sm:h-64 sm:w-64">
                  <img src={img} alt={alt} className={`h-full w-full object-contain ${anim} drop-shadow-[0_0_20px_rgba(0,255,194,0.2)] transition-transform duration-300 group-hover:scale-110`} />
                </div>
                <h3 style={{ color: "#00FFC2", fontWeight: "700", fontSize: "1.1rem", textAlign: "center" }}>{label}</h3>
              </div>
            ))}
          </div>

          <div className="mb-8 space-y-5">
            <h3 style={{ color: "#00FFC2", fontSize: "1.4rem", fontWeight: "700" }}>Top Performers</h3>
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: "600", letterSpacing: "0.25em", color: "#a855f7", textTransform: "uppercase", marginBottom: "0.6rem" }}>⚡ Pro Track</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[{ rank: "🥇", label: "Winner" }, { rank: "🥈", label: "1st Runner-Up" }, { rank: "🥉", label: "2nd Runner-Up" }].map(({ rank, label }) => (
                  <div key={label + "-pro"} className="flex items-center gap-3" style={{ borderRadius: "10px", border: "1px solid rgba(168,85,247,0.2)", background: "rgba(168,85,247,0.04)", padding: "12px 20px" }}>
                    <span style={{ fontSize: "18px", flexShrink: 0 }}>{rank}</span>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "linear-gradient(to right,#a855f7,#00FFC2)", flexShrink: 0 }} />
                    <span className="text-gray-200">{label} – Pro Track</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: "600", letterSpacing: "0.25em", color: "#00FFC2", textTransform: "uppercase", marginBottom: "0.6rem" }}>🌱 Learner Track</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[{ rank: "🥇", label: "Winner" }, { rank: "🥈", label: "1st Runner-Up" }, { rank: "🥉", label: "2nd Runner-Up" }].map(({ rank, label }) => (
                  <div key={label + "-learner"} className="flex items-center gap-3" style={{ borderRadius: "10px", border: "1px solid rgba(0,255,194,0.2)", background: "rgba(0,255,194,0.04)", padding: "12px 20px" }}>
                    <span style={{ fontSize: "18px", flexShrink: 0 }}>{rank}</span>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "linear-gradient(to right,#00FFC2,#a855f7)", flexShrink: 0 }} />
                    <span className="text-gray-200">{label} – Learner Track</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="pt-2 text-gray-300">Winners will receive exciting prizes including keyboards, mouse, earpods, along with exclusive merchandise and swags.</p>
          </div>

          <div className="mb-8">
            <h3 style={{ color: "#00FFC2", fontSize: "1.4rem", fontWeight: "700", marginBottom: "0.75rem" }}>Perks</h3>
            <ul className="list-inside list-disc space-y-2 text-gray-300 text-lg sm:text-xl">
              <li>Certificates <span className="text-gray-400">(Online)</span> for all participants</li>
              <li>Hard Copy Certificates for winners</li>
              <li>Stickers &amp; Swags for all participants</li>
            </ul>
          </div>

          <div style={{ borderRadius: "16px", border: "1px solid rgba(168,85,247,0.2)", background: "rgba(168,85,247,0.04)", padding: "1.5rem" }}>
            <h3 style={{ color: "#00FFC2", fontSize: "1.4rem", fontWeight: "700", marginBottom: "0.5rem" }}>Code of Conduct</h3>
            <p className="text-gray-300">Participants are expected to compete with honesty and integrity. Any form of unfair means, plagiarism, or malpractice will lead to immediate disqualification.</p>
          </div>

          <p className="mt-10 font-mono text-xl text-center">Follow the rules, compete with integrity, and let your coding skills shine!</p>
        </section>

        {/* ── GLIMPSE ── */}
        <section className="pb-10">
          <H>Glimpse of Code Clash 1.0</H>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { url: "https://res.cloudinary.com/dpr83w1ub/image/upload/v1775900086/cftqedvrumgtyv3h93o9_jmtcor.webp", caption: "Winner" },
              { url: "https://res.cloudinary.com/dpr83w1ub/image/upload/v1775900086/n0fyvliw6nyt6fuqq7g3_boi6qh.webp", caption: "Organizers & Champions" },
              { url: "https://res.cloudinary.com/dpr83w1ub/image/upload/v1775900086/ijxqwdx2loat6fxvatnp_xtahdh.webp", caption: "Coding in Action" },
              { url: "https://res.cloudinary.com/dpr83w1ub/image/upload/v1775900086/byyokjiilcd76bhhjrsc_lefmum.webp", caption: "All Participants" },
              { url: "https://res.cloudinary.com/dpr83w1ub/image/upload/v1775900086/i7sfubqhit8bbmjnsysp_ehw19o.webp", caption: "Event Highlights" },
              { url: "https://res.cloudinary.com/dpr83w1ub/image/upload/v1775900905/cweosgvs3mqvtypv1kkg_jnr3ln.webp", caption: "Recognition" },
            ].map(({ url, caption }) => (
              <div key={caption} className="group relative cursor-pointer rounded-xl p-[2px]"
                style={{ background: "linear-gradient(120deg,#00FFC2,#a855f7)", boxShadow: "0 0 12px rgba(0,255,194,0.2)" }}>
                <div className="relative overflow-hidden rounded-xl bg-black">
                  <img src={url} alt={caption} className="h-64 w-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-75" />
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)", pointerEvents: "none" }} />
                  <div className="absolute inset-0 flex translate-y-4 items-center justify-center opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="elegant-text text-center text-lg font-bold text-white">{caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;