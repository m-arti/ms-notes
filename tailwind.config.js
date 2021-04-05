const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'media',

  purge: [],

  theme: {
    extend: {
      fontFamily: {
        sans: ['SF Pro Display', ...defaultTheme.fontFamily.sans],
        serif: ["Times New Roman", ...defaultTheme.fontFamily.serif],
      },
    },
  },

  variants: {
    backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
    borderColor: ['dark', 'dark-disabled', 'dark-focus', 'dark-focus-within'],
    textColor: ['dark', 'dark-hover', 'dark-active', 'dark-placeholder']
  },

  plugins: [require('tailwindcss-dark-mode')()],
}
