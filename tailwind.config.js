/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#a100ff",
          blue: "#225dc9",
          magenta: "#ff00ff",
          green: "#16a34a",
          ink: "#08292a",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "Inter", "Roboto", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Montserrat", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        purple: "12px 12px 4px rgba(161, 0, 255, 0.45)",
        pink: "12px 12px 4px rgba(255, 0, 255, 0.38)",
        cta: "-2px -2px 0 rgba(0, 128, 255, 0.44), inset 0 12px 24px rgba(0, 0, 0, 0.45)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        softPulse: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        fadeUp: "fadeUp 650ms ease-out both",
        softPulse: "softPulse 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
