import { profile } from "../../data/profile";

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-20 py-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-mist-500 text-xs font-mono">
        <p>© {new Date().getFullYear()} {profile.fullName}</p>
        <p className="tracking-[0.14em]">BUILT WITH REACT · FRAMER MOTION · TAILWIND</p>
      </div>
    </footer>
  );
}
