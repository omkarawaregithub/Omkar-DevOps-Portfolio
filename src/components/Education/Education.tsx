import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import { education } from "../../data/education";
import { fadeUp, staggerContainer, viewportOnce } from "../../animations/scrollAnimations";

export default function Education() {
  return (
    <section id="education" className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="EDUCATION" title="Academic foundation." />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
          className="relative mt-16 pl-8 md:pl-12"
        >
          <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-signal-violet/60 via-white/10 to-transparent" />

          {education.map((ed) => (
            <motion.div key={ed.degree} variants={fadeUp} className="relative pb-12 last:pb-0">
              <span className="absolute -left-8 md:-left-12 top-1.5 w-[15px] h-[15px] rounded-full bg-void border-2 border-signal-violet" />
              <div className="glass-panel rounded-2xl p-6 md:p-7 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg md:text-xl text-mist-100">{ed.degree}</h3>
                  <p className="text-mist-500 text-sm mt-1.5">{ed.institute}</p>
                  <p className="section-eyebrow text-signal-violet/80 mt-3">{ed.period}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl text-signal-cyan">{ed.score}</p>
                  <p className="text-mist-500 text-[0.7rem] mt-1">AGGREGATE</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
