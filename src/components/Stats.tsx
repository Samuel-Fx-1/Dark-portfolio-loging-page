import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const STATS = [
  { value: 20, suffix: "+", label: "Years Experience", desc: "Crafting interfaces across industries" },
  { value: 95, suffix: "+", label: "Projects Done", desc: "From small studios to global brands" },
  { value: 200, suffix: "%", label: "Satisfied Clients", desc: "Because 100% felt too modest" },
];

function Counter({ to, suffix, active }: { to: number; suffix: string; active: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const start = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to]);
  return (
    <span className="tabular-nums">
      {val}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stats" ref={ref} className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="relative group p-8 md:p-10 rounded-3xl bg-surface/40 border border-stroke hover:border-white/20 transition-colors"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-5xl md:text-7xl font-display text-text-primary leading-none mb-4">
                <Counter to={s.value} suffix={s.suffix} active={inView} />
              </div>
              <div className="text-sm text-text-primary uppercase tracking-[0.2em] mb-2">
                {s.label}
              </div>
              <p className="text-sm text-muted">{s.desc}</p>
              <div
                className="absolute bottom-0 left-8 right-8 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 accent-gradient"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
