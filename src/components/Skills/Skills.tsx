import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import Glyph from "../shared/Glyph";
import { skillCategories, additionalConcepts } from "../../data/skills";
import { fadeUp, staggerContainer, viewportOnce } from "../../animations/scrollAnimations";

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20">
      <div className="absolute inset-0 -z-10 bg-radial-fade opacity-40" />
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="CAPABILITIES"
          title="Skills, grouped by what they're for."
          description="Tools and concepts I use to build, automate and secure a delivery pipeline — organized the way a real DevOps workflow is."
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-14">
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.index}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="glass-panel rounded-2xl p-6 hover:border-signal-blue/30 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-signal-blue/80 text-sm">{cat.index}</span>
                <span className="font-display tracking-wide text-mist-100">{cat.title}</span>
              </div>

              <motion.ul
                variants={staggerContainer(0.05)}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="mt-5 space-y-2.5"
              >
                {cat.items.map((skill) => (
                  <motion.li
                    key={skill.id}
                    variants={fadeUp}
                    className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 bg-white/[0.02] group-hover:bg-white/[0.03] transition-colors"
                  >
                    <span className="flex items-center gap-2.5 text-mist-300 text-sm">
                      <Glyph name={skill.glyph} className="w-4 h-4 text-signal-cyan/80" />
                      {skill.name}
                    </span>
                    <span
                      className={`font-mono text-[0.62rem] tracking-wide px-2 py-0.5 rounded-full border ${
                        skill.level === "Basics"
                          ? "text-signal-amber/90 border-signal-amber/30"
                          : "text-signal-green/90 border-signal-green/30"
                      }`}
                    >
                      {skill.level === "Basics" ? "BASICS" : "HANDS-ON"}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.04)}
          className="flex flex-wrap gap-2.5 mt-10"
        >
          {additionalConcepts.map((c) => (
            <motion.span
              key={c}
              variants={fadeUp}
              className="font-mono text-xs text-mist-500 border border-white/10 rounded-full px-3.5 py-1.5 hover:text-mist-100 hover:border-white/25 transition-colors"
            >
              {c}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
