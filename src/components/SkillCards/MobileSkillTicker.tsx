import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heroSkills } from "../../data/skills";
import { CARD_CYCLE_MS } from "../../animations/cardAnimations";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import Glyph from "../shared/Glyph";

export default function MobileSkillTicker() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSkills.length), CARD_CYCLE_MS);
    return () => clearInterval(id);
  }, [reduced]);

  const skill = heroSkills[index];

  return (
    <div className="sm:hidden w-full flex justify-center mt-6 px-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -14, scale: 0.96 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-2xl px-4 py-3 flex items-center gap-3 w-full max-w-xs"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 text-signal-cyan shrink-0">
            <Glyph name={skill.glyph} className="w-5 h-5" />
          </span>
          <div>
            <p className="font-mono text-[0.62rem] tracking-[0.18em] text-mist-500">
              {skill.category.toUpperCase()}
            </p>
            <p className="font-display text-sm font-medium text-mist-100">{skill.name}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
