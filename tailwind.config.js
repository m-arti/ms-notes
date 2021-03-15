const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  theme: {

    extend: {
      fontFamily: {
        sans: ['SF Pro Display', ...defaultTheme.fontFamily.sans],
        serif: ["Times New Roman", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  variants: {},
  plugins: [],
}
