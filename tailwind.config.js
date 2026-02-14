/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "cyber-bg": "#0a0e1a",
        "cyber-bg-secondary": "#151b2e",
        "cyber-cyan": "#00f5ff",
        "cyber-purple": "#b000ff",
        "cyber-green": "#00ff88",
        "cyber-wall": "#2d3748",
        "cyber-text": "#e8f4f8",
        "cyber-red": "#ff3366",
      },
      minHeight: { "touch": "44px" },
    },
  },
  plugins: [],
};
