import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heroSkills } from "../../data/skills";
import { cardSlots, cardVariants, CARD_CYCLE_MS } from "../../animations/cardAnimations";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import Glyph from "../shared/Glyph";

export default function SkillCards() {
  const [offset, setOffset] = useState(0);
  const reduced = useReducedMotion();
  const total = heroSkills.length;

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setOffset((o) => (o + 1) % total);
    }, CARD_CYCLE_MS);
    return () => clearInterval(id);
  }, [reduced, total]);

  // Which skill occupies which slot right now.
  const activeCards = useMemo(
    () =>
      cardSlots.map((slot, i) => ({
        slot,
        skill: heroSkills[(offset + i) % total],
      })),
    [offset, total]
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden sm:block" aria-hidden={false}>
      {activeCards.map(({ slot, skill }) => (
        <div
          key={slot.id}
          className={`absolute w-[190px] md:w-[210px] ${slot.className}`}
          style={{ zIndex: 30 - Math.round(slot.depth * 10) }}
        >
          <AnimatePresence mode="wait" custom={slot.depth}>
            <motion.div
              key={skill.id + slot.id}
              custom={slot.depth}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ rotate: slot.rotate }}
              className="pointer-events-auto glass-panel rounded-2xl px-4 py-3.5 shadow-glow"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-signal-cyan">
                  <Glyph name={skill.glyph} className="w-4.5 h-4.5" />
                </span>
                <div>
                  <p className="font-mono text-[0.65rem] tracking-[0.18em] text-mist-500">
                    {skill.category.toUpperCase()}
                  </p>
                  <p className="font-display text-sm font-medium text-mist-100 tracking-wide">
                    {skill.name}
                  </p>
                </div>
              </div>
              <p className="text-[0.72rem] text-mist-500 mt-2 leading-snug">
                {skill.description}
              </p>
              <div className="mt-3 h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-signal-blue to-signal-cyan"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: CARD_CYCLE_MS / 1000, ease: "linear" }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
