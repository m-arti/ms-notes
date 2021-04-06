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
        // primary: {
        //   50: "#caf0f8", // becomes primary-900 in dark mode
        //   300: "#90e0ef", // becomes primary-600 in dark mode
        //   600: "#0077b6", // becomes primary-300 in dark mode
        //   900: "#03045e", // becomes primary-50 in dark mode
        // },
        white: "black",
        black: "white",
        red: "green.500",
      },
      transitionDuration: "500ms", // default '300ms'
      transitionClasses: "full", // default ['text, 'bg', 'border']
    },
  },
  plugins: [require("nightwind")],
}
