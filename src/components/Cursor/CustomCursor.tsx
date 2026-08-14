import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouch } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function CustomCursor() {
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const enabled = !isTouch && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 10);
      y.set(e.clientY - 10);
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement;
      setActive(!!target.closest("a, button, [role='button']"));
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("cursor-active");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      ref={ref}
      className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        width: 20,
        height: 20,
        opacity: visible ? 1 : 0,
      }}
      animate={{
        scale: active ? 2.1 : 1,
        backgroundColor: active ? "#4CE0E0" : "#F5F6FA",
      }}
      transition={{ duration: 0.2 }}
    />
  );
}
