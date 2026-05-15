import { motion } from "framer-motion";
import { PROJECTS } from "../data";

export default function SelectedWorks() {
  return (
    <section id="works" className="bg-bg py-12 md:py-16">
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
              Selected Work
            </span>
          </div>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-4xl md:text-6xl font-display text-text-primary leading-tight">
                Featured <em className="font-display italic">projects</em>
              </h2>
              <p className="text-sm md:text-base text-muted mt-4 max-w-md">
                A selection of projects I&apos;ve worked on, from concept to
                launch.
              </p>
            </div>
            <a
              href="#"
              className="group relative hidden md:inline-flex items-center gap-2 rounded-full text-sm px-5 py-2.5 bg-bg text-text-primary border border-stroke hover:border-transparent overflow-hidden"
            >
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity accent-gradient" />
              <span className="relative inline-flex items-center gap-2 bg-bg rounded-full px-5 py-2.5 m-[1px]">
                View all work
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`group relative ${project.span} ${project.aspect} bg-surface border border-stroke rounded-3xl overflow-hidden cursor-pointer`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 halftone-overlay opacity-20 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 bg-bg/70 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Category label */}
              <div className="absolute top-5 left-5 text-xs text-muted uppercase tracking-[0.2em]">
                {project.category}
              </div>

              {/* Hover label */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="relative rounded-full p-[2px] animate-gradient-shift bg-gradient-to-r from-[#89AACC] via-[#4E85BF] to-[#89AACC] bg-[length:200%_200%]">
                  <div className="bg-surface rounded-full px-5 py-2.5 flex items-center gap-2">
                    <span className="text-sm text-text-primary">View —</span>
                    <span className="text-sm text-text-primary font-display italic">
                      {project.title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom title on default */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between group-hover:opacity-0 transition-opacity">
                <h3 className="text-xl md:text-2xl font-display italic text-text-primary">
                  {project.title}
                </h3>
                <span className="text-xs text-muted uppercase tracking-[0.2em]">
                  0{i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
