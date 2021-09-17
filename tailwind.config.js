// tailwind.config.js controls finer details in TailwindCSS
// See https://tailwindcss.com/docs/configuration

const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      gray: {
        100: '#fcfcfd',
        200: '#e6e8ec',
        300: '#bcc2cc',
        400: '#777e90',
        500: '#353945',
        600: '#1e1e21',
        700: '#141416',
      },
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: {
        ...colors.blue,
        550: '#3e73ea',
      },
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      height: {
        108: '400px',
        editor: 'calc(100vh - 72px)',
      },
      spacing: {
        18: '72px',
      },
      animation: {
        tilt: 'tilt 5s infinite linear',
      },
      keyframes: {
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(1deg)',
          },
          '75%': {
            transform: 'rotate(-1deg)',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
