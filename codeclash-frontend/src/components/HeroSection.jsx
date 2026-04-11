import React from "react";
import Countdown from "./Countdown ";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { 
  mdiCalendarMonthOutline, 
  mdiMapMarkerOutline, 
  mdiChevronRight,
  mdiAtom,
  mdiTrophyOutline,
  mdiSprout
} from "@mdi/js";

const HeroSection = () => {
  return (
    <div
      className="mt- relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-[#080909] bg-cover bg-center text-white"
      style={{ backgroundImage: "url('https://res.cloudinary.com/dpr83w1ub/image/upload/v1775912576/hero2_b5cwzj.png')" }}
    >

      <div className="container relative z-10 mx-auto grid gap-10 px-5 pb- pt-28 sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        {/* Left Content */}
        <div className="flex flex-col items-start justify-center gap-6">
          <div className="font-mono text-sm font-semibold tracking-wider text-[#00FFc2] sm:text-base">
            GDG PRESENTS
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-3xl md:text-4xl lg:text-7xl">
            CODECLASH <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic">2.0</span>
          </h1>

          <h2 className="mt-2 text-xl font-bold tracking-widest text-[#00FFc2] sm:text-2xl md:text-3xl">
            CODE. COMPETE. CREATE IMPACT.
          </h2>

          <p className="mt-2 max-w-xl text-lg font-light text-gray-300">
            A coding showdown for builders,<br />
            problem solvers, and future tech leaders.
          </p>

          <div className="mt-2">
            <Countdown />
          </div>

          {/* Date and Location */}
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-5 py-3 backdrop-blur-sm">
              <Icon path={mdiCalendarMonthOutline} size={1.2} className="text-[#00FFc2]" />
              <span className="font-semibold tracking-wide">15 APRIL 26</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-5 py-3 backdrop-blur-sm">
              <Icon path={mdiMapMarkerOutline} size={1.2} className="text-[#00FFc2]" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">GDG COMMUNITY SPACE</span>
                <span className="text-xs text-gray-400">(VENUE TBA)</span>
              </div>
            </div>
          </div>

          {/* Buttons and Link */}
          <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link to="/register">
              <button className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#00FFC2] to-purple-500 px-8 py-4 font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,194,0.4)]">
                <span>REGISTER NOW</span>
                <Icon path={mdiChevronRight} size={1} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <a href="https://codeclash.dev" className="font-mono text-[#00FFc2] hover:text-cyan-300 transition-colors">
              codeclash.dev
            </a>
          </div>
        </div>

        {/* Right Content - Features */}
        <div className="relative mt-12 flex flex-col justify-end pb-2 lg:mt-0 lg:items-end">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 lg:justify-end xl:gap-x-12">
            <div className="flex items-center gap-3">
              <Icon path={mdiAtom} size={1.5} className="text-purple-400 animate-[spin_10s_linear_infinite]" />
              <div className="flex flex-col text-xs sm:text-sm font-bold tracking-widest text-gray-200">
                <span>BUILD</span>
                <span className="text-gray-400">INNOVATE</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Icon path={mdiTrophyOutline} size={1.5} className="text-blue-400" />
              <div className="flex flex-col text-xs sm:text-sm font-bold tracking-widest text-gray-200">
                <span>COMPETE</span>
                <span className="text-gray-400">CHALLENGE</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Icon path={mdiSprout} size={1.5} className="text-green-400 animate-pulse" />
              <div className="flex flex-col text-xs sm:text-sm font-bold tracking-widest text-gray-200">
                <span>INSPIRE</span>
                <span className="text-gray-400">GROW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
