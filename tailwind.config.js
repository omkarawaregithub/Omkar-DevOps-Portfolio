/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#07080B",
          100: "#0B0D12",
          200: "#10131A",
          300: "#161A23",
          400: "#1D222E",
        },
        signal: {
          blue: "#4C8DFF",
          cyan: "#4CE0E0",
          violet: "#9B7BFF",
          green: "#4CE0A0",
          amber: "#F5A360",
        },
        mist: {
          100: "#F5F6FA",
          300: "#C7CBDA",
          500: "#8A8FA3",
          700: "#565A6E",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(circle at 50% 0%, rgba(76,141,255,0.18), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(76,141,255,0.55)",
        "glow-cyan": "0 0 40px -8px rgba(76,224,224,0.5)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-slow": {
          "0%,100%": { opacity: 0.35 },
          "50%": { opacity: 0.75 },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        scan: "scan 3s linear infinite",
      },
    },
  },
  plugins: [],
};
