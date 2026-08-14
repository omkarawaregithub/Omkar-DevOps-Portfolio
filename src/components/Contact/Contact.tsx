import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import Glyph from "../shared/Glyph";
import { profile } from "../../data/profile";
import { fadeUp, staggerContainer, viewportOnce } from "../../animations/scrollAnimations";

const CHANNELS = [
  { label: "EMAIL", value: profile.email, href: `mailto:${profile.email}`, glyph: "code" },
  { label: "LINKEDIN", value: profile.linkedin, href: profile.linkedinUrl, glyph: "network" },
  { label: "GITHUB", value: profile.github, href: profile.githubUrl, glyph: "github" },
  { label: "PHONE", value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}`, glyph: "terminal" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-radial-fade opacity-50" />
      <div className="absolute inset-0 -z-10 grid-lines-bg opacity-25" />

      <div className="max-w-4xl mx-auto text-center">
        <SectionHeading
          eyebrow="GET IN TOUCH"
          title="LET'S BUILD SOMETHING RELIABLE."
          description="Open to entry-level DevOps opportunities and opportunities to learn, automate and build reliable delivery systems."
          align="center"
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
        className="max-w-2xl mx-auto mt-14 glass-panel rounded-2xl overflow-hidden shadow-glow"
      >
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F5A360]/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-signal-green/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-signal-blue/70" />
          <span className="ml-2 font-mono text-[0.7rem] text-mist-500">bash — ./connect-with-omkar</span>
        </div>

        <div className="p-6 md:p-8 font-mono text-sm">
          <p className="text-mist-500">
            <span className="text-signal-green">$</span> ./connect-with-omkar
          </p>
          <p className="mt-3 flex items-center gap-2">
            <span className="text-mist-500">STATUS:</span>
            <span className="text-signal-green">AVAILABLE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse-slow" />
          </p>
          <p className="text-mist-500 mt-1">LOCATION: {profile.location}</p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.07)}
            className="mt-6 space-y-2.5"
          >
            {CHANNELS.map((c) => (
              <motion.a
                key={c.label}
                variants={fadeUp}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-signal-cyan">
                    <Glyph name={c.glyph} className="w-4 h-4" />
                  </span>
                  <span className="text-mist-500 tracking-[0.14em] text-xs">{c.label}</span>
                </span>
                <span className="text-mist-100 group-hover:text-signal-cyan transition-colors text-xs sm:text-sm truncate">
                  {c.value}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
        className="flex justify-center mt-10"
      >
        <a
          href={profile.resumePath}
          download
          className="inline-flex items-center gap-2 rounded-full bg-mist-100 text-void px-7 py-3.5 font-medium text-sm hover:scale-[1.03] transition-transform"
        >
          DOWNLOAD RESUME
        </a>
      </motion.div>
    </section>
  );
}
