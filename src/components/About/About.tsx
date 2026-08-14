import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import Glyph from "../shared/Glyph";
import { profile, summaryPillars } from "../../data/profile";
import {
  fadeUp,
  slideFromLeft,
  staggerContainer,
  viewportOnce,
} from "../../animations/scrollAnimations";

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-lines-bg opacity-30" />
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
        <div>
          <SectionHeading
            eyebrow="WHO AM I?"
            title="Learning the systems that ship software reliably."
          />

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="text-mist-300 text-base md:text-lg leading-relaxed mt-8 max-w-xl"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="grid sm:grid-cols-2 gap-4 mt-10"
          >
            {summaryPillars.map((p) => (
              <motion.div
                key={p.label}
                variants={fadeUp}
                className="glass-panel rounded-2xl p-5 hover:border-signal-cyan/30 transition-colors"
              >
                <p className="section-eyebrow text-signal-blue">{p.label}</p>
                <p className="text-mist-300 text-sm mt-2.5 leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Terminal-style visual */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={slideFromLeft}
          className="relative"
        >
          <div className="glass-panel rounded-2xl overflow-hidden shadow-glow">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5A360]/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-signal-green/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-signal-blue/70" />
              <span className="ml-2 font-mono text-[0.7rem] text-mist-500">~/omkar/about.sh</span>
            </div>
            <div className="p-5 font-mono text-[0.78rem] leading-relaxed">
              <p className="text-mist-500">
                <span className="text-signal-green">$</span> whoami
              </p>
              <p className="text-mist-100 mt-1">aspiring-devops-engineer</p>
              <p className="text-mist-500 mt-4">
                <span className="text-signal-green">$</span> cat focus.txt
              </p>
              <ul className="mt-2 space-y-1.5">
                {[
                  "automation of build & release",
                  "CI/CD pipeline design",
                  "containerization with Docker",
                  "cloud fundamentals on AWS",
                  "application security basics",
                  "continuous learning",
                ].map((t, i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.08 * i, duration: 0.4 }}
                    className="text-mist-300"
                  >
                    <span className="text-signal-cyan">→</span> {t}
                  </motion.li>
                ))}
              </ul>
              <p className="text-mist-500 mt-4">
                <span className="text-signal-green">$</span>{" "}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                  className="inline-block w-2 h-3.5 bg-signal-cyan align-middle ml-1"
                />
              </p>
            </div>
          </div>

          {/* floating environment icons */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-5 w-14 h-14 rounded-2xl glass-panel flex items-center justify-center text-signal-cyan"
          >
            <Glyph name="cloud" className="w-6 h-6" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="absolute -bottom-6 -left-5 w-14 h-14 rounded-2xl glass-panel flex items-center justify-center text-signal-blue"
          >
            <Glyph name="docker" className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
