import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import Glyph from "../shared/Glyph";
import { pipelineStages, projectHighlights, projectMeta } from "../../data/project";
import { fadeUp, staggerContainer, viewportOnce } from "../../animations/scrollAnimations";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function DevSecOpsProject() {
  const reduced = useReducedMotion();
  const stageCount = pipelineStages.length;
  const cycleDuration = stageCount * 0.9;

  return (
    <section id="project" className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-lines-bg opacity-25" />
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="FLAGSHIP PROJECT"
          title={projectMeta.title}
          description={projectMeta.description}
        />

        {/* Pipeline visualization */}
        <div className="relative mt-16 md:mt-20">
          {/* Desktop: horizontal flow */}
          <div className="hidden lg:block relative">
            <div className="absolute left-0 right-0 top-[38px] h-[2px] bg-white/8 rounded-full overflow-hidden">
              {!reduced && (
                <motion.div
                  className="h-full w-1/4 bg-gradient-to-r from-transparent via-signal-cyan to-transparent"
                  animate={{ x: ["-25%", "400%"] }}
                  transition={{ duration: cycleDuration, repeat: Infinity, ease: "linear" }}
                />
              )}
            </div>
            <div className="relative grid grid-cols-5 gap-x-6 gap-y-14">
              {pipelineStages.map((stage, i) => (
                <PipelineNode key={stage.id} stage={stage} index={i} reduced={reduced} total={stageCount} />
              ))}
            </div>
          </div>

          {/* Mobile / tablet: vertical flow */}
          <div className="lg:hidden relative pl-9">
            <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-white/8 overflow-hidden rounded-full">
              {!reduced && (
                <motion.div
                  className="w-full h-1/4 bg-gradient-to-b from-transparent via-signal-cyan to-transparent"
                  animate={{ y: ["-25%", "400%"] }}
                  transition={{ duration: cycleDuration, repeat: Infinity, ease: "linear" }}
                />
              )}
            </div>
            <div className="space-y-8">
              {pipelineStages.map((stage, i) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="relative flex items-center gap-4"
                >
                  <span className="absolute -left-9 w-8 h-8 rounded-full glass-panel flex items-center justify-center text-signal-cyan">
                    <Glyph name={stage.glyph} className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="font-display text-mist-100">{stage.label}</p>
                    <p className="text-mist-500 text-xs mt-0.5">{stage.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.06)}
          className="grid sm:grid-cols-2 gap-3.5 mt-20"
        >
          {projectHighlights.map((h) => (
            <motion.div
              key={h}
              variants={fadeUp}
              className="flex gap-3 glass-panel rounded-xl px-4 py-3.5 text-sm text-mist-300 leading-relaxed"
            >
              <span className="text-signal-green shrink-0 mt-0.5">✓</span>
              {h}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PipelineNode({
  stage,
  index,
  reduced,
  total,
}: {
  stage: (typeof pipelineStages)[number];
  index: number;
  reduced: boolean;
  total: number;
}) {
  const delay = (index / total) * (total * 0.9);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <motion.span
        className="relative w-[76px] h-[76px] rounded-2xl glass-panel flex items-center justify-center text-signal-cyan"
        animate={
          reduced
            ? {}
            : {
                boxShadow: [
                  "0 0 0px rgba(76,224,224,0)",
                  "0 0 26px rgba(76,224,224,0.55)",
                  "0 0 0px rgba(76,224,224,0)",
                ],
              }
        }
        transition={reduced ? {} : { duration: 1.6, repeat: Infinity, repeatDelay: total * 0.9 - 1.6, delay }}
      >
        <Glyph name={stage.glyph} className="w-7 h-7" />
      </motion.span>
      <p className="font-display text-sm text-mist-100 mt-3.5">{stage.label}</p>
      <p className="text-mist-500 text-[0.72rem] mt-1 max-w-[130px] leading-snug">{stage.sub}</p>
    </motion.div>
  );
}
