import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Original stylized 2.5D illustration of a DevOps engineer.
 * Built entirely from layered SVG primitives (no external art),
 * composited with a server/cloud environment behind the figure.
 */
export default function Character() {
  const reduced = useReducedMotion();

  const floatAnim = reduced
    ? {}
    : { y: [0, -10, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const } };

  const breathe = reduced
    ? {}
    : { scale: [1, 1.015, 1], transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <div className="relative w-full h-full flex items-end justify-center select-none">
      <motion.svg
        viewBox="0 0 640 720"
        className="w-full h-full max-w-[560px] mx-auto drop-shadow-[0_30px_60px_rgba(76,141,255,0.25)]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <defs>
          <radialGradient id="stageGlow" cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#4C8DFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4C8DFF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hoodie" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1D222E" />
            <stop offset="100%" stopColor="#10131A" />
          </linearGradient>
          <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a4256" />
            <stop offset="100%" stopColor="#262c3a" />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4C8DFF" />
            <stop offset="100%" stopColor="#4CE0E0" />
          </linearGradient>
          <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#161A23" />
            <stop offset="100%" stopColor="#0B0D12" />
          </linearGradient>
        </defs>

        {/* Ambient stage glow */}
        <ellipse cx="320" cy="560" rx="280" ry="90" fill="url(#stageGlow)" />

        {/* Floating server rack — left, background layer */}
        <motion.g animate={floatAnim} style={{ transformOrigin: "120px 300px" }} opacity={0.85}>
          <rect x="70" y="230" width="100" height="150" rx="10" fill="#10131A" stroke="#252b38" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="82" y={248 + i * 30} width="76" height="18" rx="3" fill="#161A23" stroke="#2a3040" />
          ))}
          <circle cx="94" cy="257" r="2.6" fill="#4CE0A0" />
          <circle cx="94" cy="287" r="2.6" fill="#4C8DFF" />
          <circle cx="94" cy="317" r="2.6" fill="#4CE0E0" />
          <circle cx="94" cy="347" r="2.6" fill="#F5A360" />
        </motion.g>

        {/* Floating cloud node — right, background layer */}
        <motion.g
          animate={
            reduced
              ? {}
              : { y: [0, 12, 0], transition: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }
          }
          opacity={0.85}
        >
          <path
            d="M470 300a34 34 0 0 1 66-10 26 26 0 0 1 22 25.5 26 26 0 0 1-26 26H478a30 30 0 0 1-8-41.5Z"
            fill="#10131A"
            stroke="#2a3040"
          />
          <circle cx="503" cy="311" r="3" fill="#4CE0E0" />
        </motion.g>

        {/* Desk */}
        <rect x="150" y="560" width="340" height="18" rx="4" fill="url(#deskGrad)" />
        <rect x="170" y="578" width="14" height="70" fill="#12151d" />
        <rect x="456" y="578" width="14" height="70" fill="#12151d" />

        {/* Character group — gentle breathing */}
        <motion.g animate={breathe} style={{ transformOrigin: "320px 470px" }}>
          {/* Chair */}
          <rect x="230" y="430" width="150" height="120" rx="18" fill="#161A23" stroke="#232838" />

          {/* Torso / hoodie */}
          <path
            d="M255 430c0-45 30-72 65-72s65 27 65 72v70H255v-70Z"
            fill="url(#hoodie)"
            stroke="#2b3140"
          />
          {/* Hoodie zipper */}
          <line x1="320" y1="372" x2="320" y2="500" stroke="#3a4256" strokeWidth="2" />
          {/* Hoodie pocket */}
          <rect x="292" y="470" width="56" height="24" rx="6" fill="#161A23" stroke="#2b3140" />

          {/* Arms toward laptop */}
          <path d="M262 440c-18 10-30 28-32 48" fill="none" stroke="url(#hoodie)" strokeWidth="26" strokeLinecap="round" />
          <path d="M378 440c18 10 30 28 32 48" fill="none" stroke="url(#hoodie)" strokeWidth="26" strokeLinecap="round" />
          {/* Hands */}
          <circle cx="284" cy="512" r="11" fill="url(#skin)" />
          <circle cx="358" cy="512" r="11" fill="url(#skin)" />

          {/* Neck + head */}
          <rect x="306" y="330" width="28" height="26" rx="8" fill="url(#skin)" />
          <circle cx="320" cy="300" r="42" fill="url(#skin)" />
          {/* Hair */}
          <path d="M280 292a40 40 0 0 1 80 0c0-4-6-30-40-30s-40 26-40 30Z" fill="#181c26" />
          {/* Glasses */}
          <rect x="292" y="296" width="24" height="14" rx="6" fill="none" stroke="#4CE0E0" strokeWidth="2" />
          <rect x="324" y="296" width="24" height="14" rx="6" fill="none" stroke="#4CE0E0" strokeWidth="2" />
          <line x1="316" y1="303" x2="324" y2="303" stroke="#4CE0E0" strokeWidth="2" />
        </motion.g>

        {/* Laptop */}
        <g>
          <rect x="270" y="500" width="100" height="66" rx="6" fill="#161A23" stroke="#2b3140" />
          <rect x="278" y="506" width="84" height="50" rx="3" fill="#0c0e13" />
          <rect x="278" y="506" width="84" height="50" rx="3" fill="url(#screenGrad)" opacity="0.12" />
          {/* code lines on screen */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x="284"
              y={512 + i * 8}
              width={26 + (i % 3) * 18}
              height="3"
              rx="1.5"
              fill={i % 2 === 0 ? "#4C8DFF" : "#4CE0E0"}
              opacity="0.85"
            />
          ))}
          <rect x="260" y="566" width="120" height="8" rx="3" fill="#10131A" stroke="#2b3140" />
        </g>

        {/* Terminal cursor blink accent */}
        <motion.rect
          x="284"
          y="548"
          width="10"
          height="3"
          rx="1.5"
          fill="#4CE0A0"
          animate={reduced ? {} : { opacity: [1, 0, 1] }}
          transition={reduced ? {} : { duration: 1.1, repeat: Infinity }}
        />

        {/* Ground reflection line */}
        <line x1="120" y1="640" x2="520" y2="640" stroke="#161A23" strokeWidth="1" />
      </motion.svg>
    </div>
  );
}
