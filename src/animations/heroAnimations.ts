import type { Variants } from "framer-motion";

export const heroTitleContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.15 },
  },
};

export const heroLetter: Variants = {
  hidden: { opacity: 0, y: "60%", rotateX: 40 },
  show: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const heroSubline: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.9 },
  },
};

export const heroCtaGroup: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 1.15 },
  },
};

export const characterEntrance: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 60 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};
