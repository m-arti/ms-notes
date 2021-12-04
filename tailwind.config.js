const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: "class",

  purge: [],

  theme: {
    extend: {
      colors: {
        'link': '#dd5511',
        'link2': '#f28500',
        'cream': '#fcfbf9',
        'beige': '#f4f0e8',
        'beigeDarker': '#ebe4d7',
      },
      fontFamily: {
        sans: ['SF Pro Display', ...defaultTheme.fontFamily.sans],
        serif: ["Georgia", ...defaultTheme.fontFamily.serif],
      },
      gradientColorStops: theme => ({
       ...theme('colors'),
      })
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
