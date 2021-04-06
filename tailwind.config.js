const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: "class",

  purge: [],

  theme: {
    extend: {
      fontFamily: {
        sans: ['SF Pro Display', ...defaultTheme.fontFamily.sans],
        serif: ["Times New Roman", ...defaultTheme.fontFamily.serif],
      },
    },

    nightwind: {
      colors: {
        white: "black",
        black: "white",
      },
      transitionDuration: "500ms", // default '300ms'
      transitionClasses: "full", // default ['text, 'bg', 'border']
    },
  },
  plugins: [require("nightwind")],
}
