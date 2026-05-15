import { useEffect, useState } from "react";

const LINKS = ["Home", "Work", "Resume"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (label: string) => {
    setActive(label);
    const map: Record<string, string> = {
      Home: "#hero",
      Work: "#works",
      Resume: "#stats",
    };
    const el = document.querySelector(map[label]);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <nav
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-2 py-2 transition-all duration-300 ${
          scrolled ? "shadow-md shadow-black/40" : ""
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("Home")}
          className="group relative h-9 w-9 rounded-full p-[2px] transition-all hover:scale-110"
        >
          <span className="absolute inset-0 rounded-full accent-gradient transition-opacity group-hover:opacity-0" />
          <span className="absolute inset-0 rounded-full accent-gradient-reverse opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="relative flex h-full w-full items-center justify-center rounded-full bg-bg">
            <span className="font-display italic text-[13px] text-text-primary">JA</span>
          </span>
        </button>

        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Nav links */}
        <div className="flex items-center">
          {LINKS.map((label) => (
            <button
              key={label}
              onClick={() => scrollTo(label)}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors ${
                active === label
                  ? "text-text-primary bg-stroke/50"
                  : "text-muted hover:text-text-primary hover:bg-stroke/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Say hi button */}
        <a
          href="mailto:hello@samuelfx.com"
          className="group relative inline-flex items-center rounded-full"
        >
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity accent-gradient" />
          <span className="relative inline-flex items-center gap-1.5 rounded-full bg-surface backdrop-blur-md text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary m-[2px]">
            Say hi
            <span className="inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
          </span>
        </a>
      </nav>
    </div>
  );
}
