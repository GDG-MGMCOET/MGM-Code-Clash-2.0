import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CONTEST_OPEN = new Date("2026-04-15T11:00:00+05:30");

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [contestOpen, setContestOpen] = useState(Date.now() >= CONTEST_OPEN.getTime());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <header
      className={`fixed top-0 z-50 bg-[#00000095] px-6 py-2 font-body font-bold shadow-xl transition-all duration-300 ${
        isScrolled
          ? "left-2 right-2 rounded-full"
          : "left-0 right-0 rounded-none"
      }`}
      style={{ color: "rgb(0, 255, 194)" }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/">
          <img
            src="/Logo dark.png"
            alt="GDG MGM COET Logo"
            className="h-8 rounded-full transition-all duration-300 sm:h-10 md:h-12 lg:h-14"
          />
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="text-3xl focus:outline-none lg:hidden"
          style={{ color: "rgb(0, 255, 194)" }}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen ? "true" : "false"}
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } absolute left-0 top-full w-full bg-[#00000077] p-6 font-mono lg:relative lg:flex lg:w-auto lg:items-center lg:bg-transparent lg:p-0`}
        >
          <ul className="flex flex-col items-center gap-4 text-base font-medium sm:text-lg lg:flex-row lg:gap-8"
            style={{ color: "rgb(0, 255, 194)" }}
          >
            <li>
              <Link
                to="/"
                className="cursor-pointer transition-colors duration-200"
                style={{ color: "rgb(0, 255, 194)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(0,255,194,0.6)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgb(0,255,194)")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/winners"
                className="cursor-pointer transition-colors duration-200"
                style={{ color: "rgb(0, 255, 194)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(0,255,194,0.6)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgb(0,255,194)")}
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <a
                href="https://chat.whatsapp.com/KRWeftwCWgN633y9JRS8eg"
                className="cursor-pointer transition-colors duration-200"
                style={{ color: "rgb(0, 255, 194)" }}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(0,255,194,0.6)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgb(0,255,194)")}
              >
                Join Us
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}