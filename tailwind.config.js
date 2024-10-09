/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "bright-text": {
          light: "rgba(255,255,255,0.75)",
          dark: "rgba(0,0,0,0.75)",
        }
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('daisyui'),
  ],
  daisyui: {
    themes: ["garden", "night", "cupcake"],
    utils: true,
  },
}

