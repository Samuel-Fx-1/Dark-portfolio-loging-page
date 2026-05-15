import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { EXPLORATIONS } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: contentRef.current,
          pinSpacing: false,
        });
      }
      if (col1Ref.current) {
        gsap.fromTo(
          col1Ref.current,
          { y: 200 },
          {
            y: -200,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
      if (col2Ref.current) {
        gsap.fromTo(
          col2Ref.current,
          { y: -150 },
          {
            y: 150,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const col1 = EXPLORATIONS.filter((_, i) => i % 2 === 0);
  const col2 = EXPLORATIONS.filter((_, i) => i % 2 === 1);

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg"
      style={{ minHeight: "300vh" }}
    >
      {/* Pinned center content */}
      <div
        ref={contentRef}
        className="absolute top-0 left-0 right-0 h-screen flex items-center justify-center pointer-events-none z-10"
      >
        <div className="text-center px-6 max-w-2xl">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Explorations
            </span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-5xl md:text-7xl font-display text-text-primary leading-tight mb-6">
            Visual <em className="font-display italic">playground</em>
          </h2>
          <p className="text-sm md:text-base text-muted max-w-md mx-auto mb-8">
            A loose collection of sketches, studies, and side quests — things
            that didn&apos;t quite fit anywhere else.
          </p>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noreferrer"
            className="pointer-events-auto group relative inline-flex items-center gap-2 rounded-full text-sm px-5 py-2.5 bg-bg text-text-primary border border-stroke hover:border-transparent overflow-hidden"
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity accent-gradient" />
            <span className="relative inline-flex items-center gap-2 bg-bg rounded-full px-5 py-2.5 m-[1px]">
              View on Dribbble
              <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </span>
          </a>
        </div>
      </div>

      {/* Parallax columns */}
      <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-16 grid grid-cols-2 gap-12 md:gap-40">
          <div ref={col1Ref} className="flex flex-col gap-12 md:gap-20 pt-40">
            {col1.map((item, i) => {
              const idx = i * 2;
              return (
                <div
                  key={item.title}
                  onClick={() => setLightbox(idx)}
                  className="pointer-events-auto group relative aspect-square max-w-[320px] mx-auto w-full rounded-3xl overflow-hidden bg-surface border border-stroke cursor-pointer transition-transform hover:scale-[1.02]"
                  style={{ transform: `rotate(${item.rotation}deg)` }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 halftone-overlay opacity-20 mix-blend-multiply pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-bg/70 backdrop-blur-sm rounded-full px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-text-primary font-display italic">
                      {item.title}
                    </span>
                    <span className="text-xs text-muted">↗</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div ref={col2Ref} className="flex flex-col gap-12 md:gap-20 pt-80">
            {col2.map((item, i) => {
              const idx = i * 2 + 1;
              return (
                <div
                  key={item.title}
                  onClick={() => setLightbox(idx)}
                  className="pointer-events-auto group relative aspect-square max-w-[320px] mx-auto w-full rounded-3xl overflow-hidden bg-surface border border-stroke cursor-pointer transition-transform hover:scale-[1.02]"
                  style={{ transform: `rotate(${item.rotation}deg)` }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 halftone-overlay opacity-20 mix-blend-multiply pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-bg/70 backdrop-blur-sm rounded-full px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-text-primary font-display italic">
                      {item.title}
                    </span>
                    <span className="text-xs text-muted">↗</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-bg/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={EXPLORATIONS[lightbox].image}
              alt=""
              className="max-w-full max-h-full rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
