import { motion } from "framer-motion";
import { JOURNAL } from "../data";

export default function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Journal
            </span>
          </div>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-4xl md:text-6xl font-display text-text-primary leading-tight">
                Recent <em className="font-display italic">thoughts</em>
              </h2>
              <p className="text-sm md:text-base text-muted mt-4 max-w-md">
                Essays, notes, and reflections on design, craft, and the
                process.
              </p>
            </div>
            <a
              href="#"
              className="group relative hidden md:inline-flex items-center gap-2 rounded-full text-sm px-5 py-2.5 bg-bg text-text-primary border border-stroke hover:border-transparent overflow-hidden"
            >
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity accent-gradient" />
              <span className="relative inline-flex items-center gap-2 bg-bg rounded-full px-5 py-2.5 m-[1px]">
                View all
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </a>
          </div>
        </motion.div>

        <div className="flex flex-col gap-3 md:gap-4">
          {JOURNAL.map((entry, i) => (
            <motion.a
              key={entry.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.06,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group flex items-center gap-4 sm:gap-6 p-3 sm:p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[32px] sm:rounded-full transition-colors"
            >
              <div className="shrink-0 h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden bg-stroke">
                <img
                  src={entry.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg md:text-xl text-text-primary font-medium truncate">
                  {entry.title}
                </h3>
                <div className="text-xs text-muted mt-1 flex items-center gap-2">
                  <span>{entry.readTime}</span>
                  <span className="w-1 h-1 rounded-full bg-muted" />
                  <span>{entry.date}</span>
                </div>
              </div>
              <div className="shrink-0 text-text-primary opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all hidden sm:block">
                →
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
