import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../animations/scrollAnimations";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
      className={align === "center" ? "text-center mx-auto" : ""}
    >
      <span className="section-eyebrow text-signal-cyan/80 inline-flex items-center gap-2">
        <span className="w-6 h-px bg-signal-cyan/60" />
        {eyebrow}
      </span>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium mt-4 text-mist-100 text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-mist-500 text-base md:text-lg mt-5 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
