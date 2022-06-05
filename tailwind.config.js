const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

// for moving blur animation
// <div>
//   <div class='absolute rotate-45 top-44 left-52 w-80 h-80 max-w-screen-lg bg-gradient-to-r from-yellow-300 rounded-full mix-blend-burn filter blur-xl opacity-24 animate-blob'></div>
//   <div class='rotate-90 absolute top-44 left-64 w-72 h-72 bg-gradient-to-l from-yellow-300 rounded-full mix-blend-multiply filter blur-lg opacity-40 animate-blob'></div>
//   <div class='absolute top-52 left-80 w-72 h-72 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000'></div>
//   <div class='rotate-180 absolute top-52 left-72 w-40 h-40 bg-gradient-to-r from-yellow-400 to-orange-200  rounded-full mix-blend-color-burn filter blur-2xl opacity-50 animate-blob animation-delay-4000'></div>
// </div>

module.exports = {
  purge: ['./src/**/*.{md,mdx,js,jsx,ts,tsx}'],
  darkMode: "class",

  purge: [],

  theme: {
    extend: {

      animation: {
        blob: "blob 7s infinite"
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 5px) scale(1) rotate(5deg)"
          },
          "33%": {
            transform: "translate(10px, -5px) scale(0.9) rotate(30deg)"
          },
          "66%": {
            transform: "translate(25px, 5px) scale(1.2) rotate(-20deg)"
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1) rotate(15deg)"
          },
        }
      },

      colors: {
        orange: colors.orange,
        coolGray: colors.coolGray,
        emerald: colors.emerald,
        'link': '#dd5511',
        'link2': '#f28500',
        'cream': '#fcfbf9',
        'beige': '#f4f0e8',
        'beigeDarker': '#ebe4d7',
        'night': 'rgb(8 , 8, 10)',
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
      transitionDuration: "100ms", // default '300ms'
      transitionClasses: "full", // default ['text, 'bg', 'border']
    },
  },
  plugins: [require("nightwind")],
}
