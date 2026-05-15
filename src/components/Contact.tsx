import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { gsap } from "gsap";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const SOCIALS = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "GitHub", href: "#" },
];

const MARQUEE_TEXT = Array(10).fill("BUILDING THE FUTURE •").join("  ");

export default function Contact() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
    }
  }, []);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      {/* Background video (flipped) */}
      <div className="absolute inset-0 -z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1] opacity-60"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Marquee */}
        <div className="overflow-hidden mb-16 md:mb-24">
          <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
            <div className="text-6xl md:text-8xl lg:text-[10rem] font-display text-text-primary/20 italic pr-8">
              {MARQUEE_TEXT}
            </div>
            <div className="text-6xl md:text-8xl lg:text-[10rem] font-display text-text-primary/20 italic pr-8">
              {MARQUEE_TEXT}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-20 md:mb-28">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Let&apos;s talk
            </span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display text-text-primary leading-tight mb-10">
            Have a project <br />
            <em className="font-display italic">in mind?</em>
          </h2>
          <a
            href="mailto:hello@samuelfx.com"
            className="group relative inline-flex items-center gap-2 rounded-full text-base md:text-lg px-8 py-4 bg-bg text-text-primary border border-stroke hover:border-transparent overflow-hidden"
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity accent-gradient" />
            <span className="relative inline-flex items-center gap-3 bg-bg rounded-full px-8 py-4 m-[1px]">
              hello@samuelfx.com
              <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </span>
          </a>
        </div>

        {/* Footer bar */}
        <div className="border-t border-stroke pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5 text-sm">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-muted hover:text-text-primary transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 text-sm text-muted">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            Available for projects
          </div>
          <div className="text-xs text-muted">
            © 2026 Samuel Fx — Built with care in Rwanda
          </div>
        </div>
      </div>
    </section>
  );
}
