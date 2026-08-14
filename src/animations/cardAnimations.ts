import type { Variants } from "framer-motion";

// Each slot defines where a card sits relative to the character stage,
// and the depth (z) it reads at. Cards cycle through slots to create a
// sense of orbiting/drifting motion rather than a flat carousel swap.
export interface CardSlot {
  id: string;
  className: string; // tailwind positioning classes
  depth: number; // 0 = closest/largest, 1 = farthest/smallest
  rotate: number;
}

export const cardSlots: CardSlot[] = [
  {
    id: "slot-primary",
    className: "right-[2%] top-[14%] md:right-[4%] md:top-[12%]",
    depth: 0,
    rotate: -4,
  },
  {
    id: "slot-secondary",
    className: "right-[-2%] top-[46%] md:right-[-3%] md:top-[46%]",
    depth: 0.5,
    rotate: 3,
  },
  {
    id: "slot-tertiary",
    className: "right-[6%] top-[76%] md:right-[9%] md:top-[78%]",
    depth: 1,
    rotate: -2,
  },
];

export const CARD_CYCLE_MS = 2600;

export const cardVariants: Variants = {
  enter: (depth: number) => ({
    opacity: 0,
    scale: 0.82 - depth * 0.08,
    x: 90,
    y: -20,
    rotate: 8,
    filter: "blur(10px)",
  }),
  center: (depth: number) => ({
    opacity: 1 - depth * 0.18,
    scale: 1 - depth * 0.14,
    x: 0,
    y: 0,
    rotate: 0,
    filter: `blur(${depth * 1.5}px)`,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  exit: (depth: number) => ({
    opacity: 0,
    scale: 0.9 - depth * 0.08,
    x: -70,
    y: 20,
    rotate: -8,
    filter: "blur(10px)",
    transition: { duration: 0.55, ease: "easeIn" },
  }),
};
