/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#07060c", 2: "#0d0b16", 3: "#15121f" },
        paper: { DEFAULT: "#efeae0", 2: "#e2dccf" },
        fg: "#f4f1ff",
        accent: {
          DEFAULT: "#22d3ee",
          soft: "#67e8f9",
          blue: "#3b82f6",
          deep: "#0891b2",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      screens: {
        tall: { raw: "(min-height: 700px)" },
      },
    },
  },
  plugins: [],
};
