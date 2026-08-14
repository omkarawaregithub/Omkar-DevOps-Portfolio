import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import Glyph from "../shared/Glyph";
import { fadeUp, staggerContainer, viewportOnce } from "../../animations/scrollAnimations";

interface TechItem {
  id: string;
  name: string;
  glyph: string;
  animation: "pipeline" | "containers" | "pods" | "cloud" | "scan" | "vuln" | "web" | "branches";
  blurb: string;
}

const TECH: TechItem[] = [
  { id: "jenkins", name: "Jenkins", glyph: "jenkins", animation: "pipeline", blurb: "Stages run in sequence, end to end." },
  { id: "docker", name: "Docker", glyph: "docker", animation: "containers", blurb: "Application packaged into a container." },
  { id: "kubernetes", name: "Kubernetes", glyph: "kubernetes", animation: "pods", blurb: "Basics of pod scheduling and orchestration." },
  { id: "aws", name: "AWS", glyph: "aws", animation: "cloud", blurb: "EC2 compute and ECR image storage." },
  { id: "sonarqube", name: "SonarQube", glyph: "sonarqube", animation: "scan", blurb: "Static analysis scans the codebase." },
  { id: "trivy", name: "Trivy", glyph: "trivy", animation: "vuln", blurb: "Image layers checked for vulnerabilities." },
  { id: "zap", name: "OWASP ZAP", glyph: "zap", animation: "web", blurb: "Running app probed for weaknesses." },
  { id: "github", name: "GitHub", glyph: "github", animation: "branches", blurb: "Source history and webhook triggers." },
];

export default function TechStack() {
  const [active, setActive] = useState<TechItem>(TECH[0]);

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="TECH STACK"
          title="Hover a tool to see it come alive."
          description="Every tool here plays a real part in the pipeline above — point at one to see what it actually does."
        />

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 mt-14 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.05)}
            className="grid grid-cols-4 sm:grid-cols-4 gap-3.5"
          >
            {TECH.map((t) => (
              <motion.button
                key={t.id}
                variants={fadeUp}
                onMouseEnter={() => setActive(t)}
                onFocus={() => setActive(t)}
                onClick={() => setActive(t)}
                className={`aspect-square rounded-2xl glass-panel flex flex-col items-center justify-center gap-2 transition-colors ${
                  active.id === t.id ? "border-signal-cyan/50 text-signal-cyan" : "text-mist-500 hover:text-mist-100"
                }`}
              >
                <Glyph name={t.glyph} className="w-6 h-6 sm:w-7 sm:h-7" />
                <span className="font-mono text-[0.6rem] tracking-wide">{t.name}</span>
              </motion.button>
            ))}
          </motion.div>

          <div className="glass-panel rounded-2xl h-[320px] md:h-[360px] relative overflow-hidden flex flex-col">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/5">
              <Glyph name={active.glyph} className="w-5 h-5 text-signal-cyan" />
              <p className="font-display text-mist-100">{active.name}</p>
            </div>
            <div className="relative flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 flex items-center justify-center p-8"
                >
                  <TechAnimation type={active.animation} />
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="px-5 py-3.5 text-mist-500 text-xs border-t border-white/5">{active.blurb}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechAnimation({ type }: { type: TechItem["animation"] }) {
  switch (type) {
    case "pipeline":
      return (
        <div className="flex items-center gap-2 w-full max-w-xs">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="flex-1 h-3 rounded-full bg-white/8 overflow-hidden"
              initial={{ opacity: 0.3 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-signal-blue to-signal-cyan rounded-full"
                animate={{ x: ["-100%", "0%"] }}
                transition={{ duration: 1.6, delay: i * 0.28, repeat: Infinity, repeatDelay: 1.4 }}
              />
            </motion.div>
          ))}
        </div>
      );
    case "containers":
      return (
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-14 h-14 rounded-lg border-2 border-signal-blue/60 bg-signal-blue/10"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
        </div>
      );
    case "pods":
      return (
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-8 h-8 rounded-full bg-signal-violet/20 border border-signal-violet/50"
              animate={{ scale: [0.85, 1, 0.85], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: (i % 3) * 0.25 + Math.floor(i / 3) * 0.15 }}
            />
          ))}
        </div>
      );
    case "cloud":
      return (
        <div className="relative w-40 h-24">
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-signal-amber"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Glyph name="cloud" className="w-20 h-20" />
          </motion.div>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-signal-amber"
              style={{ left: `${20 + i * 30}%`, top: "85%" }}
              animate={{ y: [0, -30], opacity: [1, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </div>
      );
    case "scan":
      return (
        <div className="relative w-48 h-28 rounded-lg border border-signal-green/30 overflow-hidden bg-signal-green/5">
          <div className="absolute inset-3 space-y-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-2 rounded-full bg-white/10" style={{ width: `${70 - i * 10}%` }} />
            ))}
          </div>
          <motion.div
            className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-signal-green/25 to-transparent"
            animate={{ y: ["-20%", "120%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      );
    case "vuln":
      return (
        <div className="grid grid-cols-4 gap-2.5">
          {Array.from({ length: 8 }).map((_, i) => {
            const flagged = i === 2 || i === 5;
            return (
              <motion.div
                key={i}
                className={`w-8 h-8 rounded-md border ${
                  flagged ? "border-signal-amber bg-signal-amber/15" : "border-white/10 bg-white/5"
                }`}
                animate={flagged ? { opacity: [1, 0.4, 1] } : {}}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            );
          })}
        </div>
      );
    case "web":
      return (
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 rounded-full border border-signal-violet/30" />
          <div className="absolute inset-6 rounded-full border border-signal-violet/30" />
          <div className="absolute inset-12 rounded-full border border-signal-violet/30" />
          <motion.span
            className="absolute w-2.5 h-2.5 rounded-full bg-signal-violet"
            style={{ left: "50%", top: "50%" }}
            animate={{
              x: [0, 55, 0, -55, 0],
              y: [-55, 0, 55, 0, -55],
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      );
    case "branches":
      return (
        <svg viewBox="0 0 160 100" className="w-48">
          <path d="M20 20 V80" stroke="#2b3140" strokeWidth="2" fill="none" />
          <path d="M20 45 C 60 45, 60 20, 100 20" stroke="#2b3140" strokeWidth="2" fill="none" />
          <motion.circle
            cx="20" cy="20" r="4" fill="#4CE0E0"
            animate={{ cy: [20, 80] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="20" cy="20" r="4" fill="#4C8DFF" />
          <circle cx="20" cy="80" r="4" fill="#4C8DFF" />
          <circle cx="100" cy="20" r="4" fill="#9B7BFF" />
        </svg>
      );
    default:
      return null;
  }
}
