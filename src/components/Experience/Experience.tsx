import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import { experience } from "../../data/experience";
import { fadeUp, staggerContainer, viewportOnce } from "../../animations/scrollAnimations";

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="EXPERIENCE"
          title="The journey so far."
          description="Early, hands-on experience gained in a real DevOps environment — one role, building real skill."
        />

        <div className="relative mt-16 pl-8 md:pl-12">
          <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-signal-cyan/60 via-white/10 to-transparent" />

          {experience.map((role, idx) => (
            <motion.div
              key={role.role}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={staggerContainer(0.08)}
              className="relative pb-4"
            >
              <motion.span
                variants={fadeUp}
                className="absolute -left-8 md:-left-12 top-1.5 w-[15px] h-[15px] rounded-full bg-void border-2 border-signal-cyan"
              >
                {role.status === "current" && (
                  <span className="absolute inset-0 rounded-full bg-signal-cyan/60 animate-ping" />
                )}
              </motion.span>

              <motion.div variants={fadeUp} className="glass-panel rounded-2xl p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl text-mist-100">{role.role}</h3>
                    <p className="text-signal-cyan text-sm mt-1 font-medium">{role.company}</p>
                  </div>
                  <span className="section-eyebrow text-mist-500 rounded-full border border-white/10 px-3 py-1.5 whitespace-nowrap">
                    {role.period}
                  </span>
                </div>

                <ul className="mt-6 space-y-3">
                  {role.points.map((pt, i) => (
                    <motion.li
                      key={i}
                      variants={fadeUp}
                      className="flex gap-3 text-mist-300 text-sm md:text-[0.95rem] leading-relaxed"
                    >
                      <span className="text-signal-blue mt-1 shrink-0 font-mono text-xs">
                        {String(idx + 1).padStart(2, "0")}.{String(i + 1).padStart(2, "0")}
                      </span>
                      {pt}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
