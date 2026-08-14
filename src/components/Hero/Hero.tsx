import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Character from "../Character/Character";
import SkillCards from "../SkillCards/SkillCards";
import MobileSkillTicker from "../SkillCards/MobileSkillTicker";
import Glyph from "../shared/Glyph";
import { profile } from "../../data/profile";
import {
  heroTitleContainer,
  heroLetter,
  heroSubline,
  heroCtaGroup,
} from "../../animations/heroAnimations";

const TITLE = "OMKAR AWARE";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const characterY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden bg-void flex flex-col justify-between"
    >
      {/* Layered background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines-bg opacity-60" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-signal-blue/10 blur-[120px]" />
      </motion.div>

      {/* Scanning accent line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-signal-cyan/50 to-transparent" />

      <div className="flex-1 flex flex-col pt-28 md:pt-32">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="px-6 md:px-12 lg:px-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="section-eyebrow text-signal-cyan/90 flex items-center gap-2 justify-center md:justify-start"
          >
            <span className="w-2 h-2 rounded-full bg-signal-green animate-pulse-slow" />
            AVAILABLE FOR ENTRY-LEVEL DEVOPS ROLES
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={heroTitleContainer}
            className="font-display font-medium leading-[0.92] mt-5 text-center md:text-left
                       text-[13vw] sm:text-[10vw] md:text-[6.4vw] lg:text-[6vw] text-mist-100 whitespace-nowrap"
            style={{ perspective: 800 }}
          >
            <span className="block overflow-hidden">
              {TITLE.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  variants={heroLetter}
                  className="inline-block"
                  style={{ display: ch === " " ? "inline-block" : undefined, width: ch === " " ? "0.35em" : undefined }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.h2
            initial="hidden"
            animate="show"
            variants={heroSubline}
            className="font-display text-xl sm:text-2xl md:text-3xl mt-3 md:mt-4 text-transparent bg-clip-text
                       bg-gradient-to-r from-signal-blue via-signal-cyan to-signal-violet
                       text-center md:text-left tracking-tight"
          >
            {profile.title.toUpperCase()}
          </motion.h2>

          <motion.p
            initial="hidden"
            animate="show"
            variants={heroSubline}
            className="section-eyebrow text-mist-500 mt-4 text-center md:text-left"
          >
            {profile.tagline}
          </motion.p>

          <motion.p
            initial="hidden"
            animate="show"
            variants={heroSubline}
            className="text-mist-300 text-base md:text-lg mt-6 max-w-md md:max-w-lg text-center md:text-left mx-auto md:mx-0"
          >
            {profile.positioning}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={heroCtaGroup}
            className="flex flex-wrap items-center gap-4 mt-9 justify-center md:justify-start"
          >
            <a
              href="#experience"
              className="group relative inline-flex items-center gap-2 rounded-full bg-mist-100 text-void px-6 py-3.5
                         font-medium text-sm tracking-wide overflow-hidden transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="relative z-10">VIEW MY JOURNEY</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={profile.resumePath}
              download
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5
                         font-medium text-sm tracking-wide text-mist-100 hover:border-signal-cyan/60
                         hover:text-signal-cyan transition-colors"
            >
              DOWNLOAD RESUME
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-mist-500 hover:text-mist-100 text-sm tracking-wide transition-colors px-2 py-3.5"
            >
              <Glyph name="github" className="w-4.5 h-4.5" />
              GITHUB
            </a>
          </motion.div>
        </motion.div>

        {/* Character + orbiting cards stage */}
        <div className="relative flex-1 mt-10 md:mt-4">
          <motion.div style={{ y: characterY }} className="relative h-[46vh] sm:h-[52vh] md:h-[60vh] max-h-[640px]">
            <Character />
            <SkillCards />
          </motion.div>
          <MobileSkillTicker />
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="hidden md:flex items-center justify-center gap-3 pb-8 text-mist-500"
      >
        <span className="section-eyebrow">SCROLL</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-mist-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}
