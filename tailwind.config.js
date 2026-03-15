/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        quadrant: {
          leaders: "#dcfce7",
          challengers: "#fef9c3",
          visionaries: "#dbeafe",
          niche: "#f3f4f6",
          "leaders-dark": "#052e16",
          "challengers-dark": "#422006",
          "visionaries-dark": "#172554",
          "niche-dark": "#1f2937",
        },
      },
    },
  },
  plugins: [],
};
