import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../../data/profile";

const LINKS = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECT", href: "#project" },
  { label: "EDUCATION", href: "#education" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-6xl flex items-center justify-between rounded-full px-5 md:px-6 py-3 transition-all duration-300 ${
            scrolled ? "glass-panel shadow-lg" : "bg-transparent"
          }`}
        >
          <a
            href="#home"
            className="font-display font-medium tracking-tight text-mist-100 text-sm md:text-base"
          >
            OMKAR<span className="text-signal-cyan">.</span>AWARE
          </a>

          <ul className="hidden lg:flex items-center gap-7">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-xs tracking-[0.14em] font-mono text-mist-500 hover:text-signal-cyan transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={profile.resumePath}
            download
            className="hidden lg:inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-xs
                       font-mono tracking-[0.12em] text-mist-100 hover:border-signal-cyan/60 hover:text-signal-cyan transition-colors"
          >
            RESUME
          </a>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1.5px] bg-mist-100 block"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-[1.5px] bg-mist-100 block"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1.5px] bg-mist-100 block"
            />
          </button>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-void/98 grid-lines-bg flex flex-col items-center justify-center lg:hidden"
          >
            <ul className="flex flex-col items-center gap-6">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.4 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl text-mist-100 hover:text-signal-cyan transition-colors"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * LINKS.length, duration: 0.4 }}
              href={profile.resumePath}
              download
              className="mt-10 inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-xs
                         font-mono tracking-[0.12em] text-mist-100"
            >
              DOWNLOAD RESUME
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
